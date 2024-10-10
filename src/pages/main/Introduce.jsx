// import 라이브러리
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../include/Header';
import Footer from '../include/Footer';
import { Link } from 'react-router-dom';
import welcomeImg from '../../assets/images/logo.webp';


//import 컴포넌트

//import css
import '../../assets/css/all.css';
import '../../assets/css/Introduce.css';
const Introduce = () => {
    /*---상태관리 변수들(값이 변화면 화면 랜더링) ----------*/
    

    /*---일반 메소드 --------------------------------------------*/

    /*---생명주기 + 이벤트 관련 메소드 ----------------------*/
   
    return (
        <>
<div id="wrap">
                <Header/>

                

                <div id="container" className="clearfix">
                    <div id="main">
                        <img id="profile-img" src={welcomeImg} alt="프로필 이미지" />

                        <div id="greetings">
                            <p className="text-xlarge">
                                <span className="bold">
                                    <h1>아무거나 듣지 않아! 이제 따지면서 들어!</h1><br/>
                                    따지니 뮤직을 방문해주셔서 감사합니다.<br/> 
                                    우리 회사는 여러분들에게 양질의 음악과 신선한 경험을 제공해 드리기 위해<br/>
                                    항상 노력하고 있습니다.<br/>
                                    <br/>
                                    우리 회사의 신조는 "음악도 따지면서 듣자" 입니다. 피곤해 보일 수 있는 말이지만<br/>
                                    여러분들의 즐거움을 위해서라면 피곤함도 감수할 각오가 되어있습니다.<br/><br/>

                                    본 사이트는 최신 음악을 제공해드리는 서비스는 물론이고, 좋아요 시스템을 통해<br/>
                                    여러분들이 듣고 싶은 음악을 취향 것 선택하실 수 있도록 준비해두었습니다.<br/><br/>

                                    직접 나만의 플레이리스트를 만드는 짜릿한 경험! 어때요? 기대되지 않아요?<br/>
                                    지금 바로 우리와 함께 음악 따지면서 들어봐요!<br/>
                                </span>
                            </p>
                        </div>
                        {/* greetings */}
                    </div>
                    {/* main */}

                    <div className="clear"></div>
                    {/*footer*/}
                     <Footer/>
                </div>
                {/* container */}
            </div>
            {/* wrap */}
        </>
    );
}

export default Introduce;