//import 라이브러리
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation  } from 'react-router-dom';

//css
import '../../assets/css/hamJoinForm.css';
import '../../assets/css/all.css';

//images
import logo from '../../assets/images/cuteddagenie.png';

const JoinComplete = () => {
    /*---라우터 관련-------------------------------*/

    /*---상태관리 변수들(값이 변화면 화면 랜더링 )---*/
    // 상태 변수로 사용자 이름 관리
    const [name, setName] = useState('');
    const navigate = useNavigate();
    const location = useLocation();  // 회원 가입 후 전달된 state 받기

    /*---일반 변수--------------------------------*/
    
    /*---일반 메소드 -----------------------------*/

    /*---훅(useEffect)+이벤트(handle)메소드-------*/
    // JoinForm에서 전달된 이름 설정
    useEffect(() => {
        if (location.state && location.state.name) {
            setName(location.state.name);  
        }
    }, [location]);
    
    const handleStart = () => {
        navigate('/login');  // 로그인 페이지로 이동
    };


    return (
        <div id="wrap-main" className="ham">
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
            <main className="joinForm">
                <div className="intro-text">
                    <h2>가입 완료</h2>
                </div>
                <div className="joinform-container">
                    <form action="#">
                        {/* 환영 인사 */}
                        <div className="joinform-group">
                            <h3 className="title-welcome">{name}님, 반갑습니다.</h3>
                        </div>
                        <div className="joinform-group">
                            <p className="desc">이제부터 따지니의 따듯하지만 까칠한 매력에 빠져보세요.</p>
                        </div>

                        {/* 시작하기 버튼 */}
                        <div className="joinform-group">
                        <button type="button" className="joinresult-btn" onClick={handleStart}>시작하기</button>
                        </div>
                    </form>
                </div>
                <div id='foot-bar'>
                    <ul>
                        <li><Link to="/terms">이용약관</Link></li>
                        <li><Link to="/privacy">개인정보처리방침</Link></li>
                        <li><Link to="/no-collect-email">이메일주소무단수집거부</Link></li>
                        <li><Link to="/customer-center">고객센터</Link></li>
                    </ul>
                    <p>Copyright © Ddagenie Music Corp. All rights reserved.</p>
                </div>
            </main>

            {/* 푸터 */}
            <footer></footer>
        </div>
    );
};

export default JoinComplete;
