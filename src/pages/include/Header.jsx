import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { differenceInDays } from 'date-fns';
import axios from 'axios';

import '../../assets/css/all.css';

import '../../assets/css/header.css';

import walletIcon from '../../assets/images/wallet.png';
import logo from '../../assets/images/cuteddagenie.png';

const Header = () => {
    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem('authUser')));
    const [searchQuery, setSearchQuery] = useState("");
    const [dayDifference, setDayDifference] = useState(null);
    const [finishTime, setFinishTime] = useState('');

    /* 따지니 플레이어 위치이동 관련 변수 */
    const [floatingBtnPos, setFloatingBtnPos] = useState({ x: 450, y: 170 });
    const [isDragging, setIsDragging] = useState(false);
    // 드래그 시작 위치 추적
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    // 마우스 다운 이벤트 (드래그 시작)
    const handleMouseDown = (e) => {
        setIsDragging(true);
        setDragStart({ x: e.clientX - floatingBtnPos.x, y: e.clientY - floatingBtnPos.y });
    };

    // 마우스 이동 이벤트 (드래그 중)
    const handleMouseMove = (e) => {
        if (isDragging) {
            setFloatingBtnPos({
                x: e.clientX - dragStart.x,
                y: e.clientY - dragStart.y
            });
        }
    };

    // 마우스 업 이벤트 (드래그 끝)
    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, dragStart]);
    /* //따지니 플레이어 위치이동 관련 변수 */

    /* //따지니 플레이어 위치이동 관련 변수 */
    const openPlayerPopup = (userNo) => {
        if (!userNo) {
            alert('로그인 해주세요.');
            return;
        }

        const popupOptions = 'width=735,height=460,resizable=yes,scrollbars=no';
        const popupUrl = `/music/musicplayer?userNo=${encodeURIComponent(userNo)}`;
        window.open(popupUrl, 'Music Player', popupOptions);
    };


    const dateReckoding = () => {
        if (authUser !== null && authUser.paymentFinish !== null && authUser.paymentFinish !== undefined) {
            setFinishTime(authUser.paymentFinish);
            const paymentFinishDate = authUser.paymentFinish;

            console.log('Payment Finish Date:', paymentFinishDate); // paymentFinishDate 값 확인

            // paymentFinishDate가 유효한지 확인한 후 replace 호출
            if (typeof paymentFinishDate === 'string') {
                const repaymentFinish = paymentFinishDate.replace(' ', 'T') + 'Z';
                console.log('Formatted Payment Finish Date:', repaymentFinish); // 변환된 날짜 확인

                const paymentFinish = new Date(repaymentFinish);
                const currentDate = new Date();

                console.log('Payment Finish Date (Date object):', paymentFinish); // Date 객체로 변환된 값 확인
                console.log('Current Date:', currentDate); // 현재 날짜 확인

                // 차이 계산
                const difference = differenceInDays(paymentFinish, currentDate) + 1;
                console.log('Days Difference:', difference); // 날짜 차이 확인

                setDayDifference(difference); // 상태 업데이트

                // dayDifference 대신 difference 사용
                if (difference >= 0) {
                    const updatedAuthUser = JSON.parse(localStorage.getItem('authUser'));
                    console.log('Updated AuthUser:', updatedAuthUser); // 여기서 최신 상태 확인

                    if (updatedAuthUser?.ticket_status === "해지요청") {
                        console.log('해지요청중인 이용권입니다.');
                    }

                    if (updatedAuthUser?.ticket_status === "해지완료") {
                        console.log('해지완료된 이용권입니다.');
                        setDayDifference(-1);
                    }
                } else {
                    // 이용권 만료 처리
                    authUser.ticket_status = '이용완료';
                    localStorage.setItem('authUser', JSON.stringify(authUser));

                    console.log('Ticket Status Set to "이용완료" for user:', authUser.no); // 상태 변경 확인

                    const userNo = authUser.no;
                    axios.put(`${process.env.REACT_APP_API_URL}/api/state/${userNo}`)
                        .then(response => {
                            console.log('API Response:', response.data); // API 응답 확인
                            if (response.data.apiData > 0) {
                                alert('이용권 사용기한이 만료되었습니다. 새로운 이용권 구매 후 이용해주세요.');
                            }
                        })
                        .catch(error => {
                            console.log('API Error:', error); // API 에러 확인
                        });
                }
            } else {
                console.log('유효하지 않은 종료일자입니다.');
                setFinishTime(null);
            }
        } else {
            console.log('종료일자 없음');
            setFinishTime(null);
        }
    };
    console.log("AuthUser from LocalStorage: ", authUser);

    // 로그인 상태 확인 (로컬스토리지에 저장된 authUser 확인)
    useEffect(() => {

        const storedUser = localStorage.getItem('authUser');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setIsLoggedIn(true);
            setUsername(user.name); // 사용자 이름 설정
            // 파일 경로와 파일 이름을 조합하여 프로필 이미지 경로 설정
        } else {
            setIsLoggedIn(false);
        }
        //소영 : 이용권 잔여시간 계산용
        dateReckoding();

    }, []);



    console.log("AuthUser from LocalStorage: ", authUser);
    console.log("Day Difference:", dayDifference);
    console.log("Ticket Status:", authUser ? authUser.ticket_status : 'N/A');

    const handlePurchaseClick = (e) => {
        if (!authUser || !authUser.no) {
            e.preventDefault();
            alert('로그인부터 해주세요');
            navigate('/login');
        } else {
            navigate('/user/payment');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('authUser');
        setToken(null);
        setAuthUser(null);
        navigate('/login');
    };

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearch = () => {
        navigate(`/musiclist?query=${searchQuery}`);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const check_ticketState = () => {

        alert('사용중인 이용권이 있습니다.')
        navigate('/user/utilize')

    };

    return (
        <div id="wrap-head" className='ham'>
            <div id="wrap-header">
                <div id="purchase-button">
                    <img src={walletIcon} alt="지갑 아이콘" />
                    {/* <Link to={"/user/payment"} className="headBuy" onClick={handlePurchaseClick}>이용권구매</Link> */}
                    {dayDifference >= 0 ? (
                        <Link to="" className='headBuy' onClick={check_ticketState}>이용권구매</Link>
                    ) : (
                        <Link to='/user/payment' className='headBuy'>이용권구매</Link>)}

                </div>
                <div className="header-main">
                    <div className="header-left">
                        <span className="logo">
                            <Link to={"/"}><img src={logo} alt="로고" /></Link>
                        </span>
                        <div id="search-wrap">
                            <input
                                id='sc-fd'
                                type="search"
                                value={searchQuery}
                                onChange={handleSearchInputChange}
                                onKeyDown={handleKeyDown}
                                className="ipt-search"
                                maxLength="200"
                                autoComplete="off"
                                placeholder="아티스트 또는 곡 제목을 검색하세요"
                            />
                            <button onClick={handleSearch} className="btn-submit"></button>
                        </div>
                    </div>
                </div>

                <div className="gnb" id="gnb">
                    <ul className="menu clearfix">
                        <li><Link to="/musiclist" className="gnb-menu">따지니차트</Link></li>
                    </ul>

                    <ul className="gnb-my">
                        {isLoggedIn ? (
                            <>
                                <li>
                                    {authUser.roll === 0 && (
                                        <Link to="/admin/musicadmin" className="btn login-join-btn">관리자 페이지</Link>
                                    )}
                                </li>
                                <li><Link to="/user/info" className="btn login-join-btn">{username}님</Link></li>
                                <li><Link to="/user/mymusic" className="btn login-join-btn">마이뮤직</Link></li>
                                <li className='logout'><button className="btn login-join-btn logout" onClick={handleLogout}>로그아웃</button></li>
                            </>
                        ) : (
                            <>
                                <li><Link to="/login" className="btn login-join-btn">로그인</Link></li>
                                <li><Link to="/signup" className="btn login-join-btn">회원가입</Link></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
            {isLoggedIn && (authUser.ticket_status === "이용중" || authUser.ticket_status === "해지요청") && (
                <button
                    className="floating-music-player-btn"
                    onClick={() => openPlayerPopup(authUser.no)}
                    /* 따지니플레이어 자리 이동 옵션 */
                    onMouseDown={handleMouseDown}
                    style={{
                        left: `${floatingBtnPos.x}px`,
                        top: `${floatingBtnPos.y}px`
                    }}
                >
                    <span className="icon">▶</span>
                    <span className="text">따지니 플레이어</span>
                </button>
            )}
        </div>
    );
};

export default Header;
