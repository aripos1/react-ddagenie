//import 라이브러리

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


import Footer from '../include/Footer';
import Header from '../include/Header';

import ItemMusic from './ItemMusic';
import '../../assets/css/musicAdmin.css';



const MusicAdmin = () => {

    /*---라우터 관련-------------------------------*/
    const [musicList, setMusicList] = useState([]);

    /*---상태관리 변수들(값이 변화면 화면 랜더링 )---*/

    /*---일반 변수--------------------------------*/

    /*---일반 메소드 -----------------------------*/
    const getMusicList = ()=>{

        axios({

            method: 'get',
            url: `${process.env.REACT_APP_API_URL}/api/musicAdmins`,

            responseType: 'json' //수신타입
        }).then(response => {
            console.log(response.data); //수신데이타
            
            setMusicList(response.data.apiData);


        }).catch(error => {
            console.log(error);

        });


    }

    /*---훅(useEffect)+이벤트(handle)메소드-------*/
    useEffect( ()=>{

        console.log("마운트 온");

        getMusicList();


    }, [] );









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
                                    <img src="../../assets/images/cuteddagenie.png" />
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
                                    <li><Link to="/admin/artistinsert" rel="noreferrer noopener"><img src="../../assets/images/search.png" /> 아티스트 관리</Link></li>
                                    <li><Link to="/admin/musicadmin" rel="noreferrer noopener"><img src="../../assets/images/search.png" /> 음원 관리</Link></li>
                                    <li><Link to="/admin/adminPayment" rel="noreferrer noopener"><img src="../../assets/images/search.png" /> 결제 관리</Link></li>
                                </ul>
                            </div>
                        </div>
                        {/* <!-- /마이뮤직 리스트--> */}
                    </div>
                    <div id="wrap-main">
                        <div id="top-title">
                            <h2>음원리스트</h2>
                        </div>

                        <div id="musicAdmin">

                            <div className="container">
                                <div className="header">
                                    <input type="text" id="search" placeholder="검색할 내용을 입력하세요" />
                                    <button type="submit" id="btn_search">검색</button>

                                    <Link to='/admin/musicinsert' ><input type="button" id="btn_insert" value="음원등록" /></Link>
                                </div>
                        
                                <table>
                                    <thead>
                                        <tr>
                                            <th>제목</th>
                                            <th>아티스트(가수)</th>
                                            <th>장르</th>
                                            <th>발매일</th>
                                            <th>음원내용</th>
                                            <th>수정</th>
                                            <th>삭제</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        

                                        { musicList.map( ( musicVo ) => { 

                                            return(
                                                <ItemMusic key={musicVo.musicNo}
                                                music = {musicVo} 
                                                musicList = {getMusicList}
                                                
                                                />                                            

                                        ) } ) } 


                                    </tbody>
                                </table>
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