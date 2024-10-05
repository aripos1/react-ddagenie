import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/hamJoinForm.css';
import '../../assets/css/all.css';
import '../../assets/css/header.css';
import logo from '../../assets/images/cuteddagenie.png';
import naverIcon from '../../assets/images/iconImg/icon_naver@3x.png';
import kakaoIcon from '../../assets/images/iconImg/icon_kakao@3x.png';
import facebookIcon from '../../assets/images/iconImg/icon_facebook@3x.png';
import twitterIcon from '../../assets/images/iconImg/icon_twitter@3x.png';
import appleIcon from '../../assets/images/iconImg/icon_apple@3x.png';
import adBanner from '../../assets/images/ban_18989_202442213563.jpg';

const JoinForm = () => {
    return (
        <div id="wrap-main">
            {/* 헤더 */}
            <header id="headerbar">
                <div className="logo">
                    <img src={logo} alt="Ddagenie 로고" />
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
                            <form action="#">
                                {/* 아이디 입력 */}
                                <div className="login-group">
                                    <input type="text" id="username" placeholder="아이디" required />
                                </div>

                                {/* 비밀번호 입력 */}
                                <div className="login-group">
                                    <input type="password" id="password" placeholder="비밀번호" required />
                                </div>

                                {/* 로그인 상태 유지 체크박스 */}
                                <div className="login-group">
                                    <label className="checkbox-container">
                                        <input type="checkbox" className="inp_check" name="" value="" />
                                        <span className="checkmark">로그인 상태 유지</span>
                                    </label>
                                </div>

                                {/* 로그인 버튼 */}
                                <div className="login-group">
                                    <button type="submit" className="login-btn">로그인</button>
                                </div>

                                {/* 소셜 로그인 아이콘 */}
                                <div className="social-login">
                                    <Link to="#"><img src={naverIcon} alt="네이버 로그인" /></Link>
                                    <Link to="#"><img src={kakaoIcon} alt="카카오 로그인" /></Link>
                                    <Link to="#"><img src={facebookIcon} alt="페이스북 로그인" /></Link>
                                    <Link to="#"><img src={twitterIcon} alt="트위터 로그인" /></Link>
                                    <Link to="#"><img src={appleIcon} alt="애플 로그인" /></Link>
                                </div>
                            </form>
                        </div>

                        {/* 광고 배너 */}
                        <div className="ad-banner">
                            <img src={adBanner} alt="광고 배너" />
                        </div>
                    </div>
                </div>
                <footbar>
                    <ul>
                        <li><Link to="/terms">이용약관</Link></li>
                        <li><Link to="/privacy">개인정보처리방침</Link></li>
                        <li><Link to="/no-collect-email">이메일주소무단수집거부</Link></li>
                        <li><Link to="/customer-center">고객센터</Link></li>
                    </ul>
                    <p>Copyright © Ddagenie Music Corp. All rights reserved.</p>
                </footbar>
            </main>

            {/* 푸터 */}
            <footer></footer>
        </div>
    );
};

export default JoinForm;
