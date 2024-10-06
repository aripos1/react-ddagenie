//import 라이브러리
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

//css
import '../../assets/css/all.css';
import '../../assets/css/header.css';

//images
import walletIcon from '../../assets/images/wallet.png';
import logo from '../../assets/images/cuteddagenie.png';

const Header = () => {
    /*---라우터 관련-------------------------------*/

    /*---상태관리 변수들(값이 변화면 화면 랜더링 )---*/

    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리
    const [username, setUsername] = useState(''); // 로그인한 사용자 이름
    
    /*---일반 변수--------------------------------*/

    /*---일반 메소드 -----------------------------*/

    /*---훅(useEffect)+이벤트(handle)메소드-------*/

    // 로그인 상태 확인 (로컬스토리지에 저장된 authUser 확인)
    useEffect(() => {
        const storedUser = localStorage.getItem('authUser');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setIsLoggedIn(true);
            setUsername(user.name); // 사용자 이름 설정
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    return (
            <div id="wrap-head">
                <div id="wrap-header">
                    <div id="purchase-button">
                        <img src={walletIcon} alt="지갑 아이콘" />
                        <a href="#" className="headBuy">이용권구매</a>
                    </div>
                    <div className="header-main">
                        <div className="header-left">
                            <span className="logo">
                                <img src={logo} alt="로고" />
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
                            <li><Link to="#" className="gnb-menu">따지니차트</Link></li>
                            <li><Link to="#" className="gnb-menu">최신음악</Link></li>
                            <li><Link to="#" className="gnb-menu">장르음악</Link></li>
                        </ul>

                        <ul className="gnb-my">
                            {isLoggedIn ? (
                                // 로그인한 상태
                                <>
                                    <li><Link to="/user/info" className="btn login-join-btn">{username}님</Link></li>
                                    <li><Link to="/user/mymusic" className="btn login-join-btn">마이뮤직</Link></li>
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
