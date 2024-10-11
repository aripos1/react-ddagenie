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

    useEffect( ()=>{

        if (authUser.roll == 0) {


        } else {
            alert('접근 권한이 없습니다');
            navigate('/');
        }


    }, [] );






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

                                <form onSubmit={handleSubmit}>

                                    <label htmlFor="artistName" >아티스트 이름</label>
                                    <input
                                        type="text"
                                        id="artistName"
                                        name="artistName"
                                        value={artistName}
                                        onChange={handleArtistNameChange}
                                        placeholder="아티스트 이름을 입력하세요"
                                        required
                                    />
                                    <div>
                                        <button className="bts-artistname" type="submit">등록</button>
                                        <button type="button" className="back-btn" onClick={backAdmin}>뒤로 가기</button>
                                    </div>
                                    

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
