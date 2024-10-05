//import 라이브러리

import React from 'react';
import { Link } from 'react-router-dom';

import '../../assets/css/musicAdmin.css';

const MusicAdmin = () => {

    /*---라우터 관련-------------------------------*/

    /*---상태관리 변수들(값이 변화면 화면 랜더링 )---*/

    /*---일반 변수--------------------------------*/

    /*---일반 메소드 -----------------------------*/

    /*---훅(useEffect)+이벤트(handle)메소드-------*/

    return (

        <>

            <div id="wrap-main">
                


                {/* <!-- header --> */}
                <div id="wrap-head">
                    <div id="wrap-header">
                        <div id="purchase-button">
                            <img src="../../assets/images/wallet.png" />
                            <Link to="" className="headBuy" rel="noreferrer noopener">이용권구매</Link>
                        </div>
                        <div className="header-main">
                            <div className="header-left">
                                <span className="logo">
                                    <img src="../../assets/images/cuteddagenie.png" alt="로고" />
                                </span>
                                <div id="search-wrap">
                                    <input type="search" id="sc-fd" className="ipt-search" maxlength="200" autocomplete="off"
                                        placeholder="가을에 듣기 좋은 감성 발라드" />
                                    <input type="submit" className="btn-submit" value="검색" />
                                </div>
                            </div>
                        </div>

                        <div className="gnb" id="gnb">
                            <ul className="menu clearfix">
                                <li><Link to="" className="gnb-menu" rel="noreferrer noopener">따지니차트</Link></li>
                                <li><Link to="" className="gnb-menu" rel="noreferrer noopener">최신음악</Link></li>
                                <li><Link to="" className="gnb-menu" rel="noreferrer noopener">장르음악</Link></li>
                            </ul>
                            {/* <!-- <ul className="gnb-my"> 로그인 안한거
                                <li><a href="" className="btn login-join-btn">로그인</a></li>
                                <li><a href="" className="btn login-join-btn">회원가입</a></li>
                            </ul> --> */}
                            <ul className="gnb-my"> {/* <!-- 로그인 한거 -->  */}
                                <li><Link to="" className="btn login-join-btn" rel="noreferrer noopener">jji***님</Link></li>
                                <li><Link to="" className="btn login-join-btn" rel="noreferrer noopener">마이뮤직</Link></li>
                            </ul>
                        </div>
                    </div>

                </div>
                {/* <!-- //header --> */}


                {/* <!-- body --> */}
                <div id="wrap-body" className="clearfix">
                    <div id="wrap-side">

                        <div id="profile-box" >
                            <div className="profile-name" >
                                <span>
                                    <img src="../../assets/images/cuteddagenie.png" />
                                </span>
                                <div className="profile-name-one">
                                    <p><Link to="" rel="noreferrer noopener"><strong>진소영</strong> 님</Link></p>
                                    <Link to="" rel="noreferrer noopener">프로필수정</Link>
                                </div>
                            </div>
                            <div className="profile-edit">
                                <Link to="" className="button-left" rel="noreferrer noopener"><span>내정보</span></Link>
                                <Link to="" className="button-right" rel="noreferrer noopener"><span>이용권내역</span></Link>
                            </div>
                        </div>
                        {/* <!-- /프로필 --> */}

                        {/* <!-- 마이뮤직 리스트--> */}
                        <div id="profile-list">
                            <a>
                                <span>관리자 페이지</span>
                            </a>
                            <div>
                                <ul>
                                    <li><Link to="" rel="noreferrer noopener"><img src="../../assets/images/search.png" /> 음원 관리</Link></li>
                                    <li><Link to="" rel="noreferrer noopener"><img src="../../assets/images/search.png" /> 결제 관리</Link></li>
                                </ul>
                            </div>
                        </div>
                        {/* <!-- /마이뮤직 리스트--> */}
                    </div>
                    <div id="wrap-main">
                        <div id="top-title">
                            <h2>음원리스트</h2>
                        </div>

                        <div id="musicAdmin">

                            <div className="container">
                                <div className="header">
                                    <input type="text" id="search" placeholder="검색할 내용을 입력하세요" />
                                    <button type="submit" id="btn_search">검색</button>

                                    <Link to='' ><input type="button" id="btn_insert" value="음원등록" /></Link>
                                </div>
                        
                                <table>
                                    <thead>
                                        <tr>
                                            <th>제목</th>
                                            <th>아티스트(가수)</th>
                                            <th>장르</th>
                                            <th>발매일</th>
                                            <th>곡 내용</th>
                                            <th>수정</th>
                                            <th>삭제</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Example Song 1</td>
                                            <td>Artist 1</td>
                                            <td>Pop</td>
                                            <td>2024-09-20</td>
                                            <td>Content 1</td>
                                            <td><Link to="" className="action-btn" rel="noreferrer noopener">수정</Link></td>
                                            <td><Link to="" className="action-btn delete-btn" rel="noreferrer noopener">삭제</Link></td>
                                        </tr>
                                        <tr>
                                            <td>Example Song 2</td>
                                            <td>Artist 2</td>
                                            <td>Rock</td>
                                            <td>2024-08-15</td>
                                            <td>Content 2</td>
                                            <td><a href="/edit-song/2" class="action-btn">수정</a></td>
                                            <td><a href="/delete-song/2" class="action-btn delete-btn">삭제</a></td>
                                        </tr>
                                        <tr>
                                            <td>Example Song 3</td>
                                            <td>Artist 3</td>
                                            <td>Jazz</td>
                                            <td>2024-10-01</td>
                                            <td>Content 3</td>
                                            <td><a href="/edit-song/3" class="action-btn">수정</a></td>
                                            <td><a href="/delete-song/3" class="action-btn delete-btn">삭제</a></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>

                    </div>
                </div>
                {/* <!-- //body --> */}


                {/* <!-- footer --> */}
                

            </div>

        </>

    );

}

export default MusicAdmin;