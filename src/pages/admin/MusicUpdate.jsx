//import 라이브러리

import React from 'react';
import { Link } from 'react-router-dom';

import '../../assets/css/musicAdmin.css';

const MusicUpdate = () => {

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
                            <h2>음원 수정</h2>
                        </div>

                        <div id="musicUpdate">

                            <div className="container">
                                <form action="/submit-song" method="POST" enctype="multipart/form-data">

                                    <label htmlFor="title">음원 제목</label>
                                    <input type="text" id="title" name="title" placeholder="음원 제목을 입력하세요" required />
                                    
                                    <label htmlFor="artist">아티스트(가수)</label>
                                    <input type="text" id="artist" name="artist" placeholder="아티스트(가수) 이름을 입력하세요" required />
                                    
                                    <label htmlFor="genre">장르</label>
                                    <select id="genre" name="genre" required>
                                        <option value="">장르를 선택하세요</option>
                                        <option value="Pop">Pop</option>
                                        <option value="Rock">Rock</option>
                                        <option value="HipHop">HipHop</option>
                                        <option value="Jazz">Jazz</option>
                                        <option value="Classical">Classical</option>
                                    </select>
                                    
                                    <label htmlFor="song_">음원 소개</label>
                                    <input type="text" id="song_link" name="song_link" placeholder="음원 링크를 입력하세요 (옵션)" />
                        
                                    <label htmlFor="song_link">음원 이미지</label>
                                    <input type="file" id="song_file" name="song_file" accept=".mp3,.wav,.flac" required />
            
                                    <label htmlFor="song_file">음원 파일 업로드</label>
                                    <input type="file" id="song_file" name="song_file" accept=".mp3,.wav,.flac" required />
                        
                                    <button type="submit">음원 수정</button>
                                    <button type="button" class="back-btn" onclick="history.back()">뒤로 가기</button>
                                </form>
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

export default MusicUpdate;