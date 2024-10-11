import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

//css
import '../../assets/css/hamJoinForm.css';
import '../../assets/css/all.css';
import '../../assets/css/header.css';

//images
import logo from '../../assets/images/cuteddagenie.png';
import naverIcon from '../../assets/images/iconImg/icon_naver@3x.png';
import kakaoIcon from '../../assets/images/iconImg/icon_kakao@3x.png';
import facebookIcon from '../../assets/images/iconImg/icon_facebook@3x.png';
import twitterIcon from '../../assets/images/iconImg/icon_twitter@3x.png';
import appleIcon from '../../assets/images/iconImg/icon_apple@3x.png';
import adBanner from '../../assets/images/ban_18989_202442213563.jpg';

const JoinForm = () => {
    /*---라우터 관련-------------------------------*/
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");

    const navigate = useNavigate("");

    /*---상태관리 변수들(값이 변하면 화면 랜더링 )---*/

    /*---일반 변수--------------------------------*/

    /*---일반 메소드 -----------------------------*/

    /*---훅(useEffect)+이벤트(handle)메소드-------*/
    const handleId = (e) => {
        console.log('id입력');
        setId(e.target.value);
    };
    const handlePw = (e) => {
        console.log('비밀번호입력');
        setPw(e.target.value);
    };

    //로그인버튼 클릭했을 때(전송)
    const handleLogin = (e) => {
        //이벤트잡고
        e.preventDefault();
        console.log('로그인버튼 클릭');

        //데이터모으고 묶고
        const userVo = {
            id: id,
            password: pw // 자바 Vo에 필드 변수 확인. ※vo에는 password로 선언.
        };

        //전송
        axios({
            method: 'post',
            url: `${process.env.REACT_APP_API_URL}/api/users/login`,
            //요청시 header, data, responseType
            headers: { 'Content-Type': 'application/json; charset=utf-8' }, // post, put
            data: userVo,

            responseType: 'json' //수신타입
        }).then(response => {
            if (response.data.result === 'success') {
                const token = response.headers['authorization'].split(' ')[1];
                // if (document.querySelector('.inp_check').checked) {
                //     localStorage.setItem("token", token);
                // } else {
                //     sessionStorage.setItem("token", token);
                // }
                localStorage.setItem("token", token);
                localStorage.setItem("authUser", JSON.stringify(response.data.apiData));
                console.log(response.data.apiData)
                navigate('/');
            } else if (response.data.message === "탈퇴 회원") {
                alert("탈퇴한 회원입니다.");  // 경고창 출력
            } else {
                alert('아이디와 비밀번호를 확인하세요!!!');
            }
        }).catch(error => {
            console.error(error);
            alert('로그인 중 오류가 발생했습니다.');
        });
    };

    return (
        <div id="wrap-main" className="ham">
            {/* 헤더 */}
            <header id="headerbar">
                <div className="logo">
                    <Link to="/"><img src={logo} alt="Ddagenie 로고" /></Link>
                </div>
                <nav className="join-nav">
                    <ul>
                        <li><Link to="/signup">회원가입</Link></li>
                        <li><Link to="/login">로그인</Link></li>
                    </ul>
                </nav>
            </header>

            {/* 본문 */}
            <main className="loginForm">
                <div className="intro-text">
                    <h2>로그인</h2>
                </div>
                <div className="login-wrapper">
                    <div className="login-container-wrapper">
                        {/* 로그인 폼 */}
                        <div className="login-container">
                            <form action="" method='' onSubmit={handleLogin}>
                                {/* 아이디 입력 */}
                                <div className="login-group">
                                    <input type="text" id="userid" value={id} placeholder="아이디" onChange={handleId} required />
                                </div>

                                {/* 비밀번호 입력 */}
                                <div className="login-group">
                                    <input type="password" id="password" value={pw} placeholder="비밀번호" onChange={handlePw} required />
                                </div>

                                {/* 로그인 상태 유지 체크박스 */}
                                {/* <div className="login-group">
                                    <label className="checkbox-container">
                                        <input type="checkbox" className="inp_check" name="" value="" />
                                        <span className="checkmark">로그인 상태 유지</span>
                                    </label>
                                </div> */}

                                {/* 로그인 버튼 */}
                                <div className="login-group">
                                    <button type="submit" className="login-btn">로그인</button>
                                </div>

                                {/* 소셜 로그인 아이콘 */}
                                <div className="social-login">
                                    <Link to="https://www.naver.com"><img src={naverIcon} alt="네이버 로그인" /></Link>
                                    <Link to="https://www.kakaocorp.com/page"><img src={kakaoIcon} alt="카카오 로그인" /></Link>
                                    <Link to="https://www.facebook.com"><img src={facebookIcon} alt="페이스북 로그인" /></Link>
                                    <Link to="https://x.com"><img src={twitterIcon} alt="트위터 로그인" /></Link>
                                    <Link to="https://www.apple.com"><img src={appleIcon} alt="애플 로그인" /></Link>
                                </div>
                            </form>
                        </div>

                        {/* 광고 배너 */}
                        <div className="ad-banner">
                            <Link to={"/user/payment"} className="headBuy"><img src={adBanner} alt="광고 배너" /></Link>
                        </div>
                    </div>
                </div>
                <div id="foot-bar">
                    <ul>
                        <li><Link to="/terms">이용약관</Link></li>
                        <li><Link to="/privacy">개인정보처리방침</Link></li>
                        <li><Link to="/no-collect-email">이메일주소무단수집거부</Link></li>
                        <li><Link to="/customer-center">고객센터</Link></li>
                    </ul>
                    <p>Copyright © Ddagenie Music Corp. All rights reserved.</p>
                </div>
            </main>
        </div>
    );
};

export default JoinForm;
