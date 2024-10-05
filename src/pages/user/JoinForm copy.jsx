import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

//css
import '../../assets/css/hamJoinForm.css';
import '../../assets/css/all.css';

//images
import logo from '../../assets/images/cuteddagenie.png';


const JoinForm = () => {
    /*---라우터 관련-------------------------------*/

    /*---상태관리 변수들(값이 변화면 화면 랜더링 )---*/
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");

    const navigate = useNavigate();

    /*---일반 변수--------------------------------*/

    /*---일반 메소드 -----------------------------*/

    /*---훅(useEffect)+이벤트(handle)메소드-------*/

    const handleId = (e) => {
        console.log("id입력");
        setId(e.target.value);
    };
    
    const handlePw = (e) => {
        console.log("비밀번호 입력");
        setPw(e.target.value);
    };
    
    const handleName = (e) => {
        console.log("이름 입력");
        setName(e.target.value);
    };
    
    const handleAddress = (e) => {
        console.log("주소 입력");
        setAddress(e.target.value);
    };
    
    const handlePhone = (e) => {
        console.log("전화번호 입력");
        setPhone(e.target.value);
    };

    // 회원 가입버튼 클릭





    return (
        <>
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
                <main className="joinForm">
                    <div className="intro-text">
                        <h2>정보 입력</h2>
                    </div>
                    <div className="joinform-container">
                        <form action="#">
                            {/* 이름 입력 */}
                            <div className="joinform-group">
                                <label htmlFor="name">이름</label>
                                <input type="text" id="name" placeholder="이름" required />
                            </div>

                            {/* 아이디 입력 */}
                            <div className="joinform-group">
                                <label htmlFor="username">아이디</label>
                                <div className="input-group">
                                    <input type="text" id="username" placeholder="아이디" required />
                                    <button type="button" className="joinchk-btn">중복확인</button>
                                </div>
                            </div>

                            {/* 비밀번호 입력 */}
                            <div className="joinform-group">
                                <label htmlFor="password">비밀번호</label>
                                <input type="password" id="password" placeholder="비밀번호" required />
                            </div>

                            {/* 비밀번호 확인 */}
                            <div className="joinform-group">
                                <input type="password" id="password-confirm" placeholder="비밀번호 확인" required />
                            </div>

                            {/* 주소 입력 */}
                            <div className="joinform-group">
                                <label htmlFor="address">주소</label>
                                <input type="text" id="address" placeholder="주소" />
                            </div>

                            {/* 휴대폰 번호 입력 */}
                            <div className="joinform-group">
                                <label htmlFor="phone">휴대폰 번호</label>
                                <div className="input-group">
                                    <input type="text" id="phone" placeholder="휴대폰 번호" required />
                                </div>
                            </div>

                            {/* 약관 동의 */}
                            <div className="joinform-group">
                                <li id="agree">
                                    <input id="tos" type="checkbox" name="agree" />
                                    <label htmlFor="tos">서비스 약관에 동의합니다.</label>
                                </li>
                            </div>

                            {/* 가입하기 버튼 */}
                            <div className="joinform-group">
                                <button type="submit" className="joinsubmit-btn">가입하기</button>
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
        </>
    );
};

export default JoinForm;
