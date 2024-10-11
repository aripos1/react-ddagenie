// ArtistInsert.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Header from '../include/Header';
import Footer from '../include/Footer';


import '../../assets/css/musicAdmin.css';

// import searchLogo from '../../assets/images/search.png';
// import profileImg from '../../assets/images/cuteddagenie.png';


import Sidebar from '../include/AsideAdmin'; // Sidebar 컴포넌트 import
/*===== 프로필 이미지 설정 ===== : 사이드 바 프로필 사진 출력용 : */
// 기본 프로필 이미지 import
import profileImage from '../../assets/images/default_img2.png';





const ArtistInsert = () => {



    /*===== 프로필 이미지 설정 ===== : 사이드 바 프로필 사진 출력용 : */
    const authUser = JSON.parse(localStorage.getItem('authUser'));
    const profile = authUser?.saveName ? `${process.env.REACT_APP_API_URL}/upload/${authUser.saveName}` : profileImage;


    const navigate = useNavigate();

    const [artistList, setArtistList] = useState([]);
    const [artistName, setArtistName] = useState('');

    const [keyword, setKeyword] = useState("");
    const [page, setPage] = useState(1);
    const [prev, setPrev] = useState(false);
    const [next, setNext] = useState(false);

    const [totalCount, setTotalCount] = useState(0); 
    const [pageSize] = useState(5); 
    

    const handleArtistNameChange = (e) => {
        setArtistName(e.target.value);
    };


    // 페이지 클릭 시 startPageBtnNo와 endPageBtnNo 계산
    const calculatePageButtons = () => {
        const totalPages = Math.ceil(totalCount / pageSize); // 총 페이지 수 계산
        console.log('totalPages'+totalPages);

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



    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`${process.env.REACT_APP_API_URL}/api/artists`, { artistName })
            .then(response => {
                console.log(response);
                alert('아티스트가 성공적으로 등록되었습니다.');
                navigate('/admin/artistinsert'); // 아티스트 목록 페이지로 리다이렉트
            })
            .catch(error => {
                console.error(error);
                alert('아티스트 등록 중 오류가 발생했습니다.');
            });
    };



    const backAdmin = () => {
        navigate('/admin/musicadmin');
    }


    const getArtistList = () => {
        const criteria = { crtpage: page, keyword: keyword };

        axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}/api/artists/list`,
            params: criteria,
            responseType: 'json',
        }).then(response => {
            //setArtistList(response.data.apiData);

            const apiData = response.data.apiData || {};
            setArtistList(apiData.musicList || []);
            setTotalCount(apiData.totalCount || 0); 
            setPrev(apiData.prev || false);
            setNext(apiData.next || false);

        }).catch(error => {
            console.log(error);
        });
    };



    useEffect( ()=>{

        if (authUser.roll == 0) {
            getArtistList();

        } else {
            alert('접근 권한이 없습니다');
            navigate('/');
        }


    }, [page, keyword] );






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

                        <div id="artistInsert">

                            <div id="top-title">
                                <h2>아티스트 등록</h2>
                                <h4>관리자님 어서오세요*^^*</h4>
                            </div>


                            <div className="container">

                                <div className="inner-container1">
                                    <form onSubmit={handleSubmit}>

                                        <label htmlFor="artistName" >아티스트 등록</label>
                                        <input
                                            type="text"
                                            id="artistName"
                                            name="artistName"
                                            value={artistName}
                                            onChange={handleArtistNameChange}
                                            placeholder="등록할 아티스트 이름을 입력하세요"
                                            required
                                        />
                                        <div>
                                            <button className="bts-artistname" type="submit">등록</button>
                                            <button type="button" className="back-btn" onClick={backAdmin}>뒤로 가기</button>
                                        </div>

                                    </form>
                                </div>


                                <div className="inner-container2">

                                    <label htmlFor="artistName" >등록된 아티스트 목록</label>
                                    <input type="text" id="search" value={keyword} onChange={handleKeyword} placeholder="검색할 아티스트 이름을 입력하세요" />
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>번호</th>
                                                <th>아티스트이름</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            { artistList.map ( ( artist ) => { 

                                                return(
                                                    
                                                    <tr key={artist.artistNo}>
                                                        <td>{artist.artistNo}</td>
                                                        <td>{artist.artistName}</td>
                                                    </tr>

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
                </div>

                
                {/* <!-- //body --> */}

                <Footer />
                {/* <!-- footer --> */}
                

            </div>

        </>

    );
};

export default ArtistInsert;
