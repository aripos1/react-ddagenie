//import 라이브러리
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { differenceInDays } from 'date-fns';
import axios from 'axios';

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

    const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태

    //소영 : 이용권 잔여시간 계산용
    const [dayDifference, setDayDifference] = useState(null);
    /*---일반 변수--------------------------------*/

    /*---일반 메소드 -----------------------------*/
    const dateReckoding = () => {

        if (authUser !== null) {

            //디비시간 가져오기
            const paymentFinishDate = authUser.paymentFinish;
            // console.log(paymentFinishDate);
            //iso형으로 변환
            // const repaymentFinish = paymentFinishDate.replace(' ', 'T') + 'Z';

            //최종적으로 값 넣어주기
            // const paymentFinish = new Date(repaymentFinish);
            const currentDate = new Date();

            // const difference = differenceInDays(paymentFinish, currentDate) + 1;
            // setDayDifference(difference);

            // console.log(paymentFinish);
            // console.log(currentDate);

            //로그인한회원 >> 이용권 사용여부체크
            if (dayDifference >= 0) {
                // console.log('dd');
                console.log('사용가능한 이용권입니다.');
                authUser.ticket_status = '이용중'
                localStorage.setItem('authUser', JSON.stringify(authUser));

            } else {
                // console.log('mm');
                authUser.ticket_status = '이용완료'
                console.log('사용기한이 끝난 이용권입니다.')

                localStorage.setItem('authUser', JSON.stringify(authUser));
                const userNo = authUser.no;
                console.log(userNo);

                //디비에 상태값 보내주기
                axios({
                    method: 'put', 			// put, post, delete                   
                    url: 'http://localhost:8888/api/state/' + userNo,
                    //headers: { "Authorization": `Bearer ${token}`}, // token
                    //get delete
                    //headers: { "Content-Type": "application/json; charset=utf-8" },  // post put
                    //headers: { "Content-Type": "multipart/form-data" }, //첨부파일

                    //params: guestbookVo, // get delete 쿼리스트링(파라미터)
                    //data: '',     // put, post,  JSON(자동변환됨)
                    //data: formData,           // 첨부파일  multipart방식

                    responseType: 'json' //수신타입
                }).then(response => {
                    console.log(response); //수신데이타
                    console.log(response.data.apiData);

                    if (response.data.apiData > 0) {
                        alert('이용권 사용기한이 만료되었습니다.\n \n새로운 이용권 구매후 이용해주세요')
                    }


                }).catch(error => {
                    console.log(error);
                });


            }

        } else {
            console.log('aadd')
        }

    }

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

    // 검색어 입력 시 상태 업데이트
    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // 검색 버튼 클릭 또는 엔터 입력 시 검색 처리
    const handleSearch = () => {
        // 검색어를 리스트 페이지로 전달
        navigate(`/musiclist?query=${searchQuery}`);
    };

    // 엔터 키로 검색 실행
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

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


    return (
        <div id="wrap-head" className='ham'>
            <div id="wrap-header">
                <div id="purchase-button">
                    <img src={walletIcon} alt="지갑 아이콘" />
                    <Link to={"/user/payment"} className="headBuy">이용권구매</Link>
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
