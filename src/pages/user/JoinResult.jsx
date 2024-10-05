import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/hamJoinForm.css';
import '../../assets/css/all.css';
import logo from '../../assets/images/cuteddagenie.png';

const JoinComplete = () => {
    return (
        <div id="wrap-main">
            {/* 헤더 */}
            <header id="headerbar">
                <div className="logo">
                    <img src={logo} alt="Ddagenie 로고" />
                </div>
                <nav className="join-nav">
                    <ul>
                        <li><Link to="/join">회원가입</Link></li>
                        <li><Link to="/login">로그인</Link></li>
                    </ul>
                </nav>
            </header>

            {/* 본문 */}
            <main className="joinForm">
                <div className="intro-text">
                    <h2>가입 완료</h2>
                </div>
                <div className="joinform-container">
                    <form action="#">
                        {/* 환영 인사 */}
                        <div className="joinform-group">
                            <h3 className="title-welcome">홍길동님, 반갑습니다.</h3>
                        </div>
                        <div className="joinform-group">
                            <p className="desc">이제부터 따지니의 단조로운 서비스를 조금 이용하실 수 있습니다.</p>
                        </div>

                        {/* 시작하기 버튼 */}
                        <div className="joinform-group">
                            <button type="button" className="joinresult-btn">시작하기</button>
                        </div>
                    </form>
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

export default JoinComplete;
