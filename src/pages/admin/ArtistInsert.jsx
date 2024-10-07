// ArtistInsert.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Header from '../include/Header';
import Footer from '../include/Footer';


import '../../assets/css/musicAdmin.css';

const ArtistInsert = () => {
    const [artistName, setArtistName] = useState('');
    const navigate = useNavigate();

    const handleArtistNameChange = (e) => {
        setArtistName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`${process.env.REACT_APP_API_URL}/api/artists`, { artistName })
            .then(response => {
                console.log(response);
                alert('아티스트가 성공적으로 등록되었습니다.');
                navigate('/api/artists'); // 아티스트 목록 페이지로 리다이렉트
            })
            .catch(error => {
                console.error(error);
                alert('아티스트 등록 중 오류가 발생했습니다.');
            });
    };

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
                                    <li><Link to="" rel="noreferrer noopener"><img src="../../assets/images/search.png" /> 음원 관리</Link></li>
                                    <li><Link to="" rel="noreferrer noopener"><img src="../../assets/images/search.png" /> 결제 관리</Link></li>
                                </ul>
                            </div>
                        </div>
                        {/* <!-- /마이뮤직 리스트--> */}
                    </div>
                    <div id="wrap-main">

                        <div id="top-title">
                            <h2>아티스트 등록</h2>
                        </div>

                        <div id="artistInsert">

                            <div className="container">

                                <form onSubmit={handleSubmit}>

                                    <label htmlFor="artistName">아티스트 이름</label>
                                    <input
                                        type="text"
                                        id="artistName"
                                        name="artistName"
                                        value={artistName}
                                        onChange={handleArtistNameChange}
                                        placeholder="아티스트 이름을 입력하세요"
                                        required
                                    />
                                    <button type="submit">등록</button>

                                </form>



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
