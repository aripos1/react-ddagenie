//import 라이브러리

import React, { useEffect, useState } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import axios from 'axios';


import Footer from '../include/Footer';
import Header from '../include/Header';

import ItemMusic from './ItemMusic';
import '../../assets/css/musicAdmin.css';

// import searchLogo from '../../assets/images/search.png';
// import profileImg from '../../assets/images/cuteddagenie.png';

import Sidebar from '../include/AsideAdmin'; // Sidebar 컴포넌트 import
/*===== 프로필 이미지 설정 ===== : 사이드 바 프로필 사진 출력용 : */
// 기본 프로필 이미지 import
import profileImage from '../../assets/images/default_img2.png';



const MusicAdmin = () => {

    /*===== 프로필 이미지 설정 ===== : 사이드 바 프로필 사진 출력용 : */
    const authUser = JSON.parse(localStorage.getItem('authUser'));
    const profile = authUser?.saveName ? `${process.env.REACT_APP_API_URL}/upload/${authUser.saveName}` : profileImage;


    const navigate = useNavigate();
    
    const [musicList, setMusicList] = useState([]);

    const [keyword, setKeyword] = useState("");
    const [page, setPage] = useState(1);
    const [prev, setPrev] = useState(false);
    const [next, setNext] = useState(false);

    const [totalCount, setTotalCount] = useState(0); // 전체 음악 개수 추가
    const [pageSize] = useState(10); // 페이지당 음악 개수



    
    // 페이지 클릭 시 startPageBtnNo와 endPageBtnNo 계산
    const calculatePageButtons = () => {
        const totalPages = Math.ceil(totalCount / pageSize); // 총 페이지 수 계산

        return {
            startPage: Math.max(1, page - 2), // 현재 페이지를 중심으로 2개 버튼 표시
            endPage: Math.min(totalPages, page + 2), // 총 페이지 수를 넘지 않도록 설정
        };
    };

    // 페이징 숫자 반복
    const arrLoop = () => {
        
        const { startPage, endPage } = calculatePageButtons();
        const newArray = [];
        for (let i = startPage; i <= endPage; i++) {
            newArray.push(
                <li key={i}>
                    <button type="button" id="btn_page" onClick={() => setPage(i)}  className={page === i ? 'active' : ''}>
                        {i}
                    </button>
                </li>
            );
        }
        return newArray;
    };



    // 검색 키워드 입력
    const handleKeyword = (e) => {
        setKeyword(e.target.value);
    }





    const getMusicList = () => {
        const criteria = { crtpage: page, keyword: keyword };
        //console.log(criteria);
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}/api/musicAdmins`,
            params: criteria,
            responseType: 'json',
        }).then(response => {

            const apiData = response.data.apiData || {};
            setMusicList(apiData.musicList || []);
            setTotalCount(apiData.totalCount || 0); // 전체 음악 개수 업데이트
            setPrev(apiData.prev || false);
            setNext(apiData.next || false);

        }).catch(error => {
            console.log(error);
        });
    };

    useEffect( ()=>{

        //console.log("마운트 온 하고 있는거 맞아?");

        if (authUser.roll == 0) {
            getMusicList();

        } else {
            alert('접근 권한이 없습니다');
            navigate('/');
        }


    }, [page, keyword] ); // p와 keyword가 변경될 때마다 데이터 로드









    return (

        <>

            <div id="wrap-main">
                


                {/* <!-- header --> */}
                <Header />
                {/* <!-- //header --> */}


                {/* <!-- body --> */}
                <div id="wrap-body" className="clearfix ham">



                    {/* Admin Sidebar 컴포넌트 호출 */}
                    <Sidebar name={authUser?.name} profile={profile} />
                    {/* Admin Sidebar 컴포넌트 호출 */}




                    <div id="wrap-main">

                        <div id="musicAdmin">

                        <div className="container">
                            <div id="top-title">
                                <h2>음원리스트</h2>
                            </div>

                        
                                <div className="header">
                                    <input type="text" id="search" value={keyword} onChange={handleKeyword} placeholder="검색할 내용을 입력하세요" />
                                    

                                    <Link to='/admin/musicinsert' ><input type="button" id="btn_insert" value="음원등록" /></Link>
                                </div>
                        
                                <table>
                                    <thead>     
                                        <tr>
                                            <th >No</th>
                                            <th >제목</th>
                                            <th >아티스트</th>
                                            <th >장르</th>
                                            <th >발매일</th>
                                            <th >수정</th>
                                            <th >삭제</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        

                                        { Array.isArray(musicList) && musicList.map( ( musicVo ) => { 

                                            return(
                                                <ItemMusic key={musicVo.musicNo}
                                                music = {musicVo} 
                                                musicList = {getMusicList}
                                                
                                                />                                            

                                        ) } ) } 


                                    </tbody>
                                </table>



                                <div id="paging">

                                    <span>{prev && <button type="button" id="direction1"  onClick={() => setPage(page-1)}>◀</button>}</span>
                                    <span><ul>{arrLoop()}</ul></span>
                                    <span>{next && <button type="button" id="direction2"  onClick={() => setPage(page+1)}>▶</button>}</span>
                                    <div className="clear"></div>
                                </div>


                            </div>

                        </div>

                    </div>
                </div>
                {/* <!-- //body --> */}

                <Footer />
                {/* <!-- footer --> */}
                

            </div>

        </>

    );

}

export default MusicAdmin;