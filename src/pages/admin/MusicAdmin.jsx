//import 라이브러리

import React, { useEffect, useState } from 'react';
import { Link, useSearchParams  } from 'react-router-dom';
import axios from 'axios';


import Footer from '../include/Footer';
import Header from '../include/Header';

import ItemMusic from './ItemMusic';
import '../../assets/css/musicAdmin.css';

import searchLogo from '../../assets/images/search.png';
import profileImg from '../../assets/images/cuteddagenie.png';



const MusicAdmin = () => {

    
    const [musicList, setMusicList] = useState([]);
    
    const [searchParams, setSearchParams] = useSearchParams();

    const p = parseInt(searchParams.get('p')) || 1; // 페이지를 정수로 변환
    const k = searchParams.get('k') || ''; // 키워드

    const [keyword, setKeyword] = useState(k);
    const [prev, setPrev] = useState(false);
    const [next, setNext] = useState(false);

    const [totalCount, setTotalCount] = useState(0); // 전체 음악 개수 추가
    const [pageSize] = useState(10); // 페이지당 음악 개수

    
    // 페이지 클릭 시 startPageBtnNo와 endPageBtnNo 계산
    const calculatePageButtons = () => {
        const totalPages = Math.ceil(totalCount / pageSize); // 총 페이지 수 계산

        return {
            startPage: Math.max(1, p - 2), // 현재 페이지를 중심으로 2개 버튼 표시
            endPage: Math.min(totalPages, p + 2), // 총 페이지 수를 넘지 않도록 설정
        };
    };

    // 페이징 숫자 반복
    const arrLoop = () => {

        const { startPage, endPage } = calculatePageButtons();
        const newArray = [];
        for (let i = startPage; i <= endPage; i++) {
            newArray.push(
                <li key={i}>
                    <Link id="btn_page" to={`/admin/musicadmin?p=${i}&k=${keyword}`} className={p === i ? 'active' : ''}>
                        {i}
                    </Link>
                </li>
            );
        }

        return newArray;
    };



    // 검색 키워드 입력
    const handleKeyword = (e) => {
        setKeyword(e.target.value);
    }

    // 검색 버튼 클릭
    const handleSearch = (e) => {
        e.preventDefault();
        setSearchParams({ p: 1, k: keyword }); // 검색 시 페이지를 1로 설정
        //getMusicList();	

    }




    const getMusicList = () => {
        const criteria = { crtpage: p, keyword: keyword };
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

        console.log("마운트 온");

        getMusicList();


    }, [p, keyword] ); // p와 keyword가 변경될 때마다 데이터 로드









    return (

        <>

            <div id="wrap-main">
                


                {/* <!-- header --> */}
                <Header />
                {/* <!-- //header --> */}


                {/* <!-- body --> */}
                <div id="wrap-body" className="clearfix">
                    <div id="wrap-side">

                        <div id="profile-box" >
                            <div className="profile-name" >
                                <span>
                                    <img src={profileImg} />
                                </span>
                                <div className="profile-name-one">
                                    <p><Link to="" rel="noreferrer noopener"><strong>진소영</strong> 님</Link></p>
                                    <Link to="" rel="noreferrer noopener">프로필수정</Link>
                                </div>
                            </div>
                            <div className="profile-edit">
                                <Link to="" className="button-left" rel="noreferrer noopener"><span>내정보</span></Link>
                                <Link to="" className="button-right" rel="noreferrer noopener"><span>이용권내역</span></Link>
                            </div>
                        </div>
                        {/* <!-- /프로필 --> */}

                        {/* <!-- 마이뮤직 리스트--> */}
                        <div id="profile-list">
                            <a>
                                <span>관리자 페이지</span>
                            </a>
                            <div>
                                <ul>
                                    <li><Link to="/admin/artistinsert" rel="noreferrer noopener"><img src={searchLogo} /> 아티스트 관리</Link></li>
                                    <li><Link to="/admin/musicadmin" rel="noreferrer noopener"><img src={searchLogo} /> 음원 관리</Link></li>
                                    <li><Link to="/admin/adminPayment" rel="noreferrer noopener"><img src={searchLogo} /> 결제 관리</Link></li>
                                </ul>
                            </div>
                        </div>
                        {/* <!-- /마이뮤직 리스트--> */}
                    </div>
                    <div id="wrap-main">

                        <div id="musicAdmin">


                            <div id="top-title">
                                <h2>음원리스트</h2>
                                <h4>관리자님 어서오세요*^^*</h4>
                            </div>

                            <div className="container">

                                <div className="header">
                                    <form onSubmit={handleSearch}>
                                        <input type="text" id="search" value={keyword} onChange={handleKeyword} placeholder="검색할 내용을 입력하세요" />
                                    </form>

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
                                            <th >음원내용</th>
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

                                    <span>{prev && <Link id="direction1" to={`/admin/musicadmin?p=${p - 1}&k=${keyword}`}>◀</Link>}</span>
                                    <span><ul>{arrLoop()}</ul></span>
                                    <span>{next && <Link id="direction2" to={`/admin/musicadmin?p=${p + 1}&k=${keyword}`}>▶</Link>}</span>
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