//import 라이브러리
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
    const [confirmPw, setConfirmPw] = useState(""); // 비밀번호 확인용 상태 추가
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지 상태

    const navigate = useNavigate();

    /*---일반 변수--------------------------------*/

    /*---일반 메소드 -----------------------------*/

    /*---훅(useEffect)+이벤트(handle)메소드-------*/

    const handleId = (e) => {
        console.log("아이디 입력");
        setId(e.target.value);
    };

    const handlePw = (e) => {
        console.log("패스워드 입력");
        setPw(e.target.value);
    };

    const handleConfirmPw = (e) => {
        console.log("패스워드 확인 입력");
        setConfirmPw(e.target.value);
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

    /* 회원가입 버튼 클릭 */
    const handleJoin = (e) => {
        e.preventDefault();

        // 비밀번호와 비밀번호 확인 값이 일치하는지 확인
        if (pw !== confirmPw) {
            setErrorMessage("비밀번호가 일치하지 않습니다.");
            return;
        }

        const userVo = {
            id: id,
            password: pw,
            name: name,
            address: address,
            phone: phone
        };

        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API_URL}/api/users`,

            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            data: userVo,

            responseType: 'json'
        }).then(response => {
            if (response.data.result === 'success') {
                console.log("가입성공!!!");
                navigate('/joinok', { state: { name: name } });
            } else {
                alert(response.data.message);
            }
        }).catch(error => {
            console.error(error);
        });
    };

    // 아이디 중복 체크
    const handleCheckId = () => {
        axios({
            method: 'post',
            url: `${process.env.REACT_APP_API_URL}/api/users/checkid?id=${id}`,
        })
        .then(response => {
            console.log(response);
            console.log(response.data);
            console.log(response.data.result);

            if (response.data.result === 'success') {
                alert('사용할 수 있는 ID입니다.');
            } else {
                alert(response.data.message);
                setId('');
            }
        })
        .catch(error => {
            console.error(error);
        });
    };

    return (
        <>
            <div id="wrap-main" className="ham">
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

                <main className="joinForm">
                    <div className="intro-text">
                        <h2>정보 입력</h2>
                    </div>
                    <div className="joinform-container">
                        <form onSubmit={handleJoin}>
                            {/* 이름 입력 */}
                            <div className="joinform-group">
                                <label htmlFor="name"></label>
                                <input type="text" id="name" value={name} onChange={handleName} placeholder="이름" required />
                            </div>

                            {/* 아이디 입력 */}
                            <div className="joinform-group">
                                <label htmlFor="username"></label>
                                <div className="input-group">
                                    <input type="text" id="username" value={id} onChange={handleId} placeholder="아이디" required />
                                    <button type="button" className="joinchk-btn" onClick={handleCheckId}>중복확인</button>
                                </div>
                            </div>

                            {/* 비밀번호 입력 */}
                            <div className="joinform-group">
                                <label htmlFor="password"></label>
                                <input type="password" id="password" value={pw} onChange={handlePw} placeholder="비밀번호" required />
                            </div>

                            {/* 비밀번호 확인 입력 */}
                            <div className="joinform-group">
                                <label htmlFor="password-confirm"></label>
                                <input type="password" id="password-confirm" value={confirmPw} onChange={handleConfirmPw} placeholder="비밀번호 확인" required />
                            </div>

                            {/* 오류 메시지 출력 */}
                            {errorMessage && <p className="error-message">{errorMessage}</p>}

                            {/* 주소 입력 */}
                            <div className="joinform-group">
                                <label htmlFor="address"></label>
                                <input type="text" id="address" value={address} onChange={handleAddress} placeholder="주소" />
                            </div>

                            {/* 휴대폰 번호 입력 */}
                            <div className="joinform-group">
                                <label htmlFor="phone"></label>
                                <div className="input-group">
                                    <input type="text" id="phone" value={phone} onChange={handlePhone} placeholder="휴대폰 번호" required />
                                </div>
                            </div>

                            {/* 약관 동의 */}
                            <div className="joinform-group">
                                <li id="agree">
                                    <input id="tos" type="checkbox" name="agree" required />
                                    <label htmlFor="tos">서비스 약관에 동의합니다.</label>
                                </li>
                            </div>

                            {/* 가입하기 버튼 */}
                            <div className="joinform-group">
                                <button type="submit" className="joinsubmit-btn">가입하기</button>
                            </div>
                        </form>
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

                <footer></footer>
            </div>
        </>
    );
};

export default JoinForm;
