//import 라이브러리
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {  differenceInDays } from 'date-fns';

//css
import '../../assets/css/all.css';
import '../../assets/css/header.css';

//images
import walletIcon from '../../assets/images/wallet.png';
import logo from '../../assets/images/cuteddagenie.png';
import defaultProfile from '../../assets/images/default_img2.png'; // 기본 프로필 이미지

const Header = () => {
    /*---라우터 관련-------------------------------*/
    const navigate = useNavigate();

    /*---상태관리 변수들(값이 변화면 화면 랜더링 )---*/

    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리
    const [username, setUsername] = useState(''); // 로그인한 사용자 이름
    const [profileImage, setProfileImage] = useState(defaultProfile); // 프로필 이미지
    // eslint-disable-next-line no-unused-vars
    const [token, setToken] = useState(localStorage.getItem('token'));
    // eslint-disable-next-line no-unused-vars
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem('authUser')));

    //소영 : 이용권 잔여시간 계산용
    const [dayDifference, setDayDifference] = useState(null);
    /*---일반 변수--------------------------------*/

    /*---일반 메소드 -----------------------------*/

    const dateReckoding = ()=>{
        console.log(authUser);
        //디비시간 가져오기
        const paymentFinishDate = authUser.paymentFinish;
        // console.log(paymentFinishDate);
        //iso형으로 변환
        const repaymentFinish = paymentFinishDate.replace(' ', 'T') + 'Z';

        //최종적으로 값 넣어주기
        const paymentFinish = new Date(repaymentFinish);
        const currentDate = new Date();

        const difference = differenceInDays(paymentFinish,currentDate)+1;
        setDayDifference(difference);

        console.log(paymentFinish)
        console.log(currentDate)
        
    }
    // if(difference )
    
    /*---훅(useEffect)+이벤트(handle)메소드-------*/

    // 로그인 상태 확인 (로컬스토리지에 저장된 authUser 확인)
    useEffect(() => {
        const storedUser = localStorage.getItem('authUser');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setIsLoggedIn(true);
            setUsername(user.name); // 사용자 이름 설정
            // 파일 경로와 파일 이름을 조합하여 프로필 이미지 경로 설정
            const profileImageUrl = user.saveName 
                ? `${process.env.REACT_APP_API_URL}/upload/${user.saveName}` 
                : defaultProfile;
            setProfileImage(profileImageUrl);
        } else {
            setIsLoggedIn(false);
        }

        //소영 : 이용권 잔여시간 계산용
        dateReckoding();
    }, []);

    const handleLogout = () => {
        console.log('로그아웃');
        // 로그아웃 로직
        // 로컬스토리지에 토큰 삭제
        localStorage.removeItem('token');
        // 로컬스토리지에 authUser 삭제
        localStorage.removeItem('authUser');
        //화면 반영을 위한 상태값 변경
        setToken(null);
        setAuthUser(null);
        navigate('/login');
    };

    return (
        <div id="wrap-head" className='ham'>
            <div id="wrap-header">
                <div id="purchase-button">
                    <img src={walletIcon} alt="지갑 아이콘" />
                    <Link to={""} className="headBuy">이용권구매</Link>
                </div>
                <div className="header-main">
                    <div className="header-left">
                        <span className="logo">
                            <Link to={"/"}><img src={logo} alt="로고" /></Link>
                        </span>
                        <div id="search-wrap">
                            <input
                                type="search"
                                id="sc-fd"
                                className="ipt-search"
                                maxLength="200"
                                autoComplete="off"
                                placeholder="가을에 듣기 좋은 감성 발라드"
                            />
                            <input type="submit" className="btn-submit" value="" />
                        </div>
                    </div>
                </div>

                <div className="gnb" id="gnb">
                    <ul className="menu clearfix">
                        <li><Link to="/musiclist" className="gnb-menu">따지니차트</Link></li>
                        <li><Link to="#" className="gnb-menu">최신음악</Link></li>
                        <li><Link to="#" className="gnb-menu">장르음악</Link></li>
                    </ul>

                    <ul className="gnb-my">
                        {isLoggedIn ? (
                            // 로그인한 상태
                            <>
                                <li><Link to="/user/info" className="btn login-join-btn">{username}님</Link></li>
                                <li><Link to="/user/mymusic" className="btn login-join-btn">마이뮤직</Link></li>
                                <li className='logout'><button className="btn login-join-btn logout" onClick={handleLogout}>로그아웃</button></li>
                                <li>
                                    <Link to="/user/info" className="btn-profile">
                                        <img src={profileImage} alt={`${username}님`} onError={(e) => { e.target.src = defaultProfile; }} />
                                    </Link>
                                </li>
                            </>
                        ) : (
                            // 로그아웃 상태
                            <>
                                <li><Link to="/login" className="btn login-join-btn">로그인</Link></li>
                                <li><Link to="/signup" className="btn login-join-btn">회원가입</Link></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Header;
