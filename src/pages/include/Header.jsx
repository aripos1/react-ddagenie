// //import 라이브러리
// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { differenceInDays } from 'date-fns';
// import axios from 'axios';

// //css
// import '../../assets/css/all.css';
// import '../../assets/css/header.css';

// //images
// import walletIcon from '../../assets/images/wallet.png';
// import logo from '../../assets/images/cuteddagenie.png';

// const Header = () => {
//     /*---라우터 관련-------------------------------*/
//     const navigate = useNavigate();

//     /*---상태관리 변수들(값이 변화면 화면 랜더링 )---*/
//     // 로그인 상태 관리
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     // 로그인한 사용자 이름
//     const [username, setUsername] = useState('');

//     /*리액트 warning 메시지 무시*/
//     // eslint-disable-next-line no-unused-vars
//     const [token, setToken] = useState(localStorage.getItem('token'));
//     // eslint-disable-next-line no-unused-vars
//     const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem('authUser')));
//     /* //리액트 warning 메시지 무시*/

//     // 검색창 관련 : 검색어 상태
//     const [searchQuery, setSearchQuery] = useState("");

//     //소영 : 이용권 잔여시간 계산용
//     const [dayDifference, setDayDifference] = useState(null);
//     const [finishTime, setFinishTime] = useState('');



//     /*---일반 변수--------------------------------*/
//     //디비시간 가져오기


//     /*---일반 메소드 -----------------------------*/
//     const openPlayerPopup = (userNo) => {
//         if (!userNo) {
//             alert('로그인 해주세요.');
//             return;
//         }

//         const popupOptions = 'width=735,height=460,resizable=yes,scrollbars=no';
//         const popupUrl = `/music/musicplayer?userNo=${encodeURIComponent(userNo)}`;
//         window.open(popupUrl, 'Music Player', popupOptions);
//     };

//     const dateReckoding = ()=>{
//         console.log('123456789')



//         if (authUser !== null && authUser.paymentFinish !== null) {
//             //디비시간 가져오기
//             setFinishTime(authUser.paymentFinish);
//             //디비시간 가져오기 
//             const paymentFinishDate = authUser.paymentFinish;
//             // console.log(paymentFinishDate);
//             //iso형으로 변환
//             const repaymentFinish = paymentFinishDate.replace(' ', 'T') + 'Z';

//             //최종적으로 값 넣어주기
//             const paymentFinish = new Date(repaymentFinish);
//             const currentDate = new Date();

//             const difference = differenceInDays(paymentFinish, currentDate) + 1;
//             setDayDifference(difference);
//             console.log(dayDifference)
//             // console.log(paymentFinish);
//             // console.log(currentDate);

//             //로그인한회원 >> 이용권 사용여부체크
//             if (dayDifference >= 0) {
//                 setAuthUser(JSON.parse(localStorage.getItem('authUser')))
//                 console.log('5465531531531351616~~~~~~~~~~~~~~')

//                 console.log(authUser.ticket_status)

//                 if( authUser.ticket_status === "해지요청"){
//                     console.log('해지요청 if문');
//                     console.log('해지요청중인 이용권 입니다.');
//                 }

//                 if( authUser.ticket_status === "해지완료"){
//                     console.log('해지완료 if문');
//                     console.log('해지완료된 이용권입니다.');

//                     setDayDifference(-1);
//                     // authUser.ticket_status = '이용중'

//                     // localStorage.setItem('authUser', JSON.stringify(authUser));

//                 }



//             } else {
//                 // console.log('mm');
//                 authUser.ticket_status = '이용완료'

//                 console.log('사용기한이 끝난 이용권입니다.')

//                 localStorage.setItem('authUser', JSON.stringify(authUser));
//                 const userNo = authUser.no;
//                 console.log(userNo);

//                 //디비에 상태값 보내주기
//                 axios({
//                     method: 'put', 			// put, post, delete                   
//                     url: `${process.env.REACT_APP_API_URL}/api/state/${userNo}`,
//                     //headers: { "Authorization": `Bearer ${token}`}, // token
//                     //get delete
//                     //headers: { "Content-Type": "application/json; charset=utf-8" },  // post put
//                     //headers: { "Content-Type": "multipart/form-data" }, //첨부파일

//                     //params: guestbookVo, // get delete 쿼리스트링(파라미터)
//                     //data: '',     // put, post,  JSON(자동변환됨)
//                     //data: formData,           // 첨부파일  multipart방식

//                     responseType: 'json' //수신타입
//                 }).then(response => {
//                     console.log(response); //수신데이타
//                     console.log(response.data.apiData);

//                     if (response.data.apiData > 0) {
//                         alert('이용권 사용기한이 만료되었습니다.\n \n새로운 이용권 구매후 이용해주세요')
//                     }


//                 }).catch(error => {
//                     console.log(error);
//                 });


//             }

//         } else {
//             console.log('종료일자 없음');
//             setFinishTime(null);
//         }

//     }



//     /*---훅(useEffect)+이벤트(handle)메소드-------*/

//     // 로그인 상태 확인 (로컬스토리지에 저장된 authUser 확인)
//     useEffect(() => {

//         const storedUser = localStorage.getItem('authUser');

//         if (storedUser) {
//             const user = JSON.parse(storedUser);
//             setIsLoggedIn(true);
//             setUsername(user.name); // 사용자 이름 설정
//             // 파일 경로와 파일 이름을 조합하여 프로필 이미지 경로 설정
//         } else {
//             setIsLoggedIn(false);
//         }





//         //소영 : 이용권 잔여시간 계산용
//         dateReckoding();

//     }, []);

//     // 구매 버튼 클릭 시 처리
//     const handlePurchaseClick = (e) => {
//         if (!authUser || !authUser.no) {
//             e.preventDefault(); // 링크 기본 동작 막기
//             alert('로그인부터 해주세요');
//             navigate('/login'); // 로그인 페이지로 이동
//         } else {
//             navigate('/user/payment'); // 이용권 구매 페이지로 이동
//         }
//     };

//     const handleLogout = () => {
//         console.log('로그아웃');
//         // 로그아웃 로직
//         // 로컬스토리지에 토큰 삭제
//         localStorage.removeItem('token');
//         // 로컬스토리지에 authUser 삭제
//         localStorage.removeItem('authUser');
//         //화면 반영을 위한 상태값 변경
//         setToken(null);
//         setAuthUser(null);
//         navigate('/login');
//     };

//     /* 검색창 관련 */
//     // 검색어 입력 시 상태 업데이트
//     const handleSearchInputChange = (e) => {
//         setSearchQuery(e.target.value);
//     };

//     // 검색 버튼 클릭 또는 엔터 입력 시 검색 처리
//     const handleSearch = () => {
//         // 검색어를 리스트 페이지로 전달
//         navigate(`/musiclist?query=${searchQuery}`);
//     };

//     // 엔터 키로 검색 실행
//     const handleKeyDown = (e) => {
//         if (e.key === 'Enter') {
//             handleSearch();
//         }
//     };

//     return (
//         <div id="wrap-head" className='ham'>
//             <div id="wrap-header">
//                 <div id="purchase-button">
//                     <img src={walletIcon} alt="지갑 아이콘" />
//                     <Link to={"/user/payment"} className="headBuy"  onClick={handlePurchaseClick}>이용권구매</Link>
//                 </div>
//                 <div className="header-main">
//                     <div className="header-left">
//                         <span className="logo">
//                             <Link to={"/"}><img src={logo} alt="로고" /></Link>
//                         </span>
//                         <div id="search-wrap">
//                             <input
//                                 id='sc-fd'
//                                 type="search"
//                                 value={searchQuery}
//                                 onChange={handleSearchInputChange}
//                                 onKeyDown={handleKeyDown}
//                                 className="ipt-search"
//                                 maxLength="200"
//                                 autoComplete="off"
//                                 placeholder="아티스트 또는 곡 제목을 검색하세요"
//                             />
//                             <button onClick={handleSearch} className="btn-submit"></button>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="gnb" id="gnb">
//                     <ul className="menu clearfix">
//                         <li><Link to="/musiclist" className="gnb-menu">따지니차트</Link></li>
//                     </ul>

//                     <ul className="gnb-my">
//                         {isLoggedIn ? (
//                             // 로그인한 상태
//                             <>
//                                 <li> 
//                                     {authUser.roll === 0 && (
//                                         <Link to="/admin/musicadmin" className="btn login-join-btn">관리자 페이지</Link>
//                                     )}
//                                 </li>
//                                 <li><Link to="/user/info" className="btn login-join-btn">{username}님</Link></li>
//                                 <li><Link to="/user/mymusic" className="btn login-join-btn">마이뮤직</Link></li>
//                                 <li className='logout'><button className="btn login-join-btn logout" onClick={handleLogout}>로그아웃</button></li>

//                             </>
//                         ) : (
//                             // 로그아웃 상태
//                             <>
//                                 <li><Link to="/login" className="btn login-join-btn">로그인</Link></li>
//                                 <li><Link to="/signup" className="btn login-join-btn">회원가입</Link></li>
//                             </>
//                         )}
//                     </ul>
//                 </div>
//             </div>
//             {/* 플로팅 뮤직 플레이어 버튼 */}
//             {isLoggedIn && (
//                 <button
//                     className="floating-music-player-btn"
//                     onClick={() => openPlayerPopup(authUser.no)}
//                 >
//                     <span className="icon">▶</span>
//                     <span className="text">따지니 플레이어</span>
//                 </button>
//             )}
//         </div>
//     );
// };
// export default Header;



// //import 라이브러리
// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { differenceInDays } from 'date-fns';
// import axios from 'axios';

// //css
// import '../../assets/css/all.css';
// import '../../assets/css/header.css';

// //images
// import walletIcon from '../../assets/images/wallet.png';
// import logo from '../../assets/images/cuteddagenie.png';

// const Header = () => {
//     /*---라우터 관련-------------------------------*/
//     const navigate = useNavigate();

//     /*---상태관리 변수들(값이 변화면 화면 랜더링 )---*/
//     // 로그인 상태 관리
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     // 로그인한 사용자 이름
//     const [username, setUsername] = useState('');

//     /*리액트 warning 메시지 무시*/
//     // eslint-disable-next-line no-unused-vars
//     const [token, setToken] = useState(localStorage.getItem('token'));
//     // eslint-disable-next-line no-unused-vars
//     const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem('authUser')));
//     /* //리액트 warning 메시지 무시*/

//     // 검색창 관련 : 검색어 상태
//     const [searchQuery, setSearchQuery] = useState("");

//     //소영 : 이용권 잔여시간 계산용
//     const [dayDifference, setDayDifference] = useState(null);
//     const [finishTime, setFinishTime] = useState('');



//     /*---일반 변수--------------------------------*/
//     //디비시간 가져오기


//     /*---일반 메소드 -----------------------------*/
//     const openPlayerPopup = (userNo) => {
//         if (!userNo) {
//             alert('로그인 해주세요.');
//             return;
//         }

//         const popupOptions = 'width=735,height=460,resizable=yes,scrollbars=no';
//         const popupUrl = `/music/musicplayer?userNo=${encodeURIComponent(userNo)}`;
//         window.open(popupUrl, 'Music Player', popupOptions);
//     };

//     const dateReckoding = ()=>{
//         console.log('123456789')



//         if (authUser !== null && authUser.paymentFinish !== null) {
//             //디비시간 가져오기
//             setFinishTime(authUser.paymentFinish);
//             //디비시간 가져오기 
//             const paymentFinishDate = authUser.paymentFinish;
//             // console.log(paymentFinishDate);
//             //iso형으로 변환
//             const repaymentFinish = paymentFinishDate.replace(' ', 'T') + 'Z';

//             //최종적으로 값 넣어주기
//             const paymentFinish = new Date(repaymentFinish);
//             const currentDate = new Date();

//             const difference = differenceInDays(paymentFinish, currentDate) + 1;
//             setDayDifference(difference);
//             console.log(dayDifference)
//             // console.log(paymentFinish);
//             // console.log(currentDate);

//             //로그인한회원 >> 이용권 사용여부체크
//             if (dayDifference >= 0) {
//                 setAuthUser(JSON.parse(localStorage.getItem('authUser')))
//                 console.log('5465531531531351616~~~~~~~~~~~~~~')

//                 console.log(authUser.ticket_status)

//                 if( authUser.ticket_status === "해지요청"){
//                     console.log('해지요청 if문');
//                     console.log('해지요청중인 이용권 입니다.');
//                 }
                
//                 if( authUser.ticket_status === "해지완료"){
//                     console.log('해지완료 if문');
//                     console.log('해지완료된 이용권입니다.');

//                     setDayDifference(-1);
//                     // authUser.ticket_status = '이용중'
                    
//                     // localStorage.setItem('authUser', JSON.stringify(authUser));
                
//                 }



//             } else {
//                 // console.log('mm');
//                 authUser.ticket_status = '이용완료'

//                 console.log('사용기한이 끝난 이용권입니다.')

//                 localStorage.setItem('authUser', JSON.stringify(authUser));
//                 const userNo = authUser.no;
//                 console.log(userNo);

//                 //디비에 상태값 보내주기
//                 axios({
//                     method: 'put', 			// put, post, delete                   
//                     url: `${process.env.REACT_APP_API_URL}/api/state/${userNo}`,
//                     //headers: { "Authorization": `Bearer ${token}`}, // token
//                     //get delete
//                     //headers: { "Content-Type": "application/json; charset=utf-8" },  // post put
//                     //headers: { "Content-Type": "multipart/form-data" }, //첨부파일

//                     //params: guestbookVo, // get delete 쿼리스트링(파라미터)
//                     //data: '',     // put, post,  JSON(자동변환됨)
//                     //data: formData,           // 첨부파일  multipart방식

//                     responseType: 'json' //수신타입
//                 }).then(response => {
//                     console.log(response); //수신데이타
//                     console.log(response.data.apiData);

//                     if (response.data.apiData > 0) {
//                         alert('이용권 사용기한이 만료되었습니다.\n \n새로운 이용권 구매후 이용해주세요')
//                     }


//                 }).catch(error => {
//                     console.log(error);
//                 });


//             }

//         } else {
//             console.log('종료일자 없음');
//             setFinishTime(null);
//         }

//     }

   

//     /*---훅(useEffect)+이벤트(handle)메소드-------*/

//     // 로그인 상태 확인 (로컬스토리지에 저장된 authUser 확인)
//     useEffect(() => {

//         const storedUser = localStorage.getItem('authUser');

//         if (storedUser) {
//             const user = JSON.parse(storedUser);
//             setIsLoggedIn(true);
//             setUsername(user.name); // 사용자 이름 설정
//             // 파일 경로와 파일 이름을 조합하여 프로필 이미지 경로 설정
//         } else {
//             setIsLoggedIn(false);
//         }





//         //소영 : 이용권 잔여시간 계산용
//         dateReckoding();

//     }, []);

//     // 구매 버튼 클릭 시 처리
//     const handlePurchaseClick = (e) => {
//         if (!authUser || !authUser.no) {
//             e.preventDefault(); // 링크 기본 동작 막기
//             alert('로그인부터 해주세요');
//             navigate('/login'); // 로그인 페이지로 이동
//         } else {
//             navigate('/user/payment'); // 이용권 구매 페이지로 이동
//         }
//     };

//     const handleLogout = () => {
//         console.log('로그아웃');
//         // 로그아웃 로직
//         // 로컬스토리지에 토큰 삭제
//         localStorage.removeItem('token');
//         // 로컬스토리지에 authUser 삭제
//         localStorage.removeItem('authUser');
//         //화면 반영을 위한 상태값 변경
//         setToken(null);
//         setAuthUser(null);
//         navigate('/login');
//     };

//     /* 검색창 관련 */
//     // 검색어 입력 시 상태 업데이트
//     const handleSearchInputChange = (e) => {
//         setSearchQuery(e.target.value);
//     };

//     // 검색 버튼 클릭 또는 엔터 입력 시 검색 처리
//     const handleSearch = () => {
//         // 검색어를 리스트 페이지로 전달
//         navigate(`/musiclist?query=${searchQuery}`);
//     };

//     // 엔터 키로 검색 실행
//     const handleKeyDown = (e) => {
//         if (e.key === 'Enter') {
//             handleSearch();
//         }
//     };

//     return (
//         <div id="wrap-head" className='ham'>
//             <div id="wrap-header">
//                 <div id="purchase-button">
//                     <img src={walletIcon} alt="지갑 아이콘" />
//                     <Link to={"/user/payment"} className="headBuy"  onClick={handlePurchaseClick}>이용권구매</Link>
//                 </div>
//                 <div className="header-main">
//                     <div className="header-left">
//                         <span className="logo">
//                             <Link to={"/"}><img src={logo} alt="로고" /></Link>
//                         </span>
//                         <div id="search-wrap">
//                             <input
//                                 id='sc-fd'
//                                 type="search"
//                                 value={searchQuery}
//                                 onChange={handleSearchInputChange}
//                                 onKeyDown={handleKeyDown}
//                                 className="ipt-search"
//                                 maxLength="200"
//                                 autoComplete="off"
//                                 placeholder="아티스트 또는 곡 제목을 검색하세요"
//                             />
//                             <button onClick={handleSearch} className="btn-submit"></button>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="gnb" id="gnb">
//                     <ul className="menu clearfix">
//                         <li><Link to="/musiclist" className="gnb-menu">따지니차트</Link></li>
//                     </ul>

//                     <ul className="gnb-my">
//                         {isLoggedIn ? (
//                             // 로그인한 상태
//                             <>
//                                 <li> 
//                                     {authUser.roll === 0 && (
//                                         <Link to="/admin/musicadmin" className="btn login-join-btn">관리자 페이지</Link>
//                                     )}
//                                 </li>
//                                 <li><Link to="/user/info" className="btn login-join-btn">{username}님</Link></li>
//                                 <li><Link to="/user/mymusic" className="btn login-join-btn">마이뮤직</Link></li>
//                                 <li className='logout'><button className="btn login-join-btn logout" onClick={handleLogout}>로그아웃</button></li>

//                             </>
//                         ) : (
//                             // 로그아웃 상태
//                             <>
//                                 <li><Link to="/login" className="btn login-join-btn">로그인</Link></li>
//                                 <li><Link to="/signup" className="btn login-join-btn">회원가입</Link></li>
//                             </>
//                         )}
//                     </ul>
//                 </div>
//             </div>
//             {/* 플로팅 뮤직 플레이어 버튼 */}
//             {isLoggedIn && (
//                 <button
//                     className="floating-music-player-btn"
//                     onClick={() => openPlayerPopup(authUser.no)}
//                 >
//                     <span className="icon">▶</span>
//                     <span className="text">따지니 플레이어</span>
//                 </button>
//             )}
//         </div>
//     );
// };

// export default Header;
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

    return (
        <div id="wrap-head" className='ham'>
            <div id="wrap-header">
                <div id="purchase-button">
                    <img src={walletIcon} alt="지갑 아이콘" />
                    <Link to={"/user/payment"} className="headBuy" onClick={handlePurchaseClick}>이용권구매</Link>
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
                >
                    <span className="icon">▶</span>
                    <span className="text">따지니 플레이어</span>
                </button>
            )}
        </div>
    );
};

export default Header;
