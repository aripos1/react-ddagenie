//import 라이브러리
import React from 'react';
import { Link } from 'react-router-dom';

//import 컴포넌트


//import css
import '../../assets/css/payment-admin.css';





const AdminPayment = () => {

    /* ---라우터 관련 ------ */

    /*---상태관리 변수들(값이 변화면 화면 랜더링)  ----------*/
    


    /*---일반 메소드 --------------------------------------------*/


    /*---생명주기 + 이벤트 관련 메소드 ----------------------*/
    

        //문법임. 여기안에 담겨진다.

    


    // 1.이벤트 잡기

    //2. 데이터 잡기 + 묶기(배열)

    //3. 전송 (ajax 사용)

    return (
        <>
            <div id="wrap-main">
        
            <div id="wrap-head">
                    <div id="wrap-header">
                        <div id="purchase-button">
                            <img src="../../assets/images/wallet.png" />
                            <Link to="" className="headBuy">이용권구매</Link>
                        </div>
                        <div className="header-main">
                            <div className="header-left">
                                <span className="logo">
                                    <img src="" alt="로고" />
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
                                <li><Link to="#" className="gnb-menu">따지니차트</Link></li>
                                <li><Link to="#" className="gnb-menu">최신음악</Link></li>
                                <li><Link to="#" className="gnb-menu">장르음악</Link></li>
                            </ul>
                            <ul className="gnb-my">
                                <li><Link to="" className="btn login-join-btn">로그인</Link></li>
                                <li><Link to="" className="btn login-join-btn">회원가입</Link></li>
                            </ul>
                            <ul className="gnb-my">
                                <li><Link to="" className="btn login-join-btn">jji***님</Link></li>
                                <li><Link to="" className="btn login-join-btn">마이뮤직</Link></li>
                            </ul>
                        </div>
                    </div>

                </div>
                <div id="wrap-body" className="clearfix">
                    <div id="wrap-side">

                    <div id="profile-box" >
                            <div className="profile-name" >
                                <span>
                                    <img src="../../assets/images/cuteddagenie.png" alt='' />
                                </span>
                                <div className="profile-name-one">
                                    <p><Link to="#"><strong>진소영</strong> 님</Link></p>
                                    <Link to="#">프로필수정</Link>
                                </div>
                            </div>
                            <div className="profile-edit">
                                <Link to="#" className="button-left"><span>내정보</span></Link>
                                <Link to="#" className="button-right"><span>이용권내역</span></Link>
                            </div>
                        </div>
                        {/* <!-- /프로필 --> */}
                        {/* <!-- 마이뮤직 리스트--> */}
                        <div id="profile-list">
                            <a>
                                <span>마이뮤직</span>
                            </a>
                            <div>
                                <ul>
                                    <li><Link to="#"><img src="../../assets/images/search.png" /> 플레이 리스트</Link></li>
                                    <li><Link to="#"><img src="../../assets/images/search.png" /> 좋아요♥</Link></li>
                                </ul>
                            </div>
                        </div>
                        {/* <!-- /마이뮤직 리스트--> */}
                    </div>
                    <div id="wrap-main">
                    <div id="top-title">
                            <h2>이용권 내역</h2>
                            <p>홈 | 마이뮤직 | 이용권내역 | <strong>이용권 상세내역</strong></p>
                        </div>
                        <p id="admin-all-list-title">고객 결제 및 해지 처리</p>
                        <div>
                            <table id="admin-table-delete-list">
                                <thead>
                                    <colgroup>
                                        <col style={{ width: '135px'}} />
                                        <col style={{ width: '135px'}} />
                                        <col style={{ width: '135px'}} />
                                        <col style={{ width: '135px'}} />
                                        <col style={{ width: '135px'}} />
                                    </colgroup>
                                    <tr>
                                        <th>고객 ID</th>
                                        <th>구매기간</th>
                                        <th>결제일</th>
                                        <th>상태</th>
                                        <th>해지처리</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>wls</td>
                                        <td>1일</td>
                                        <td>2024-10-03</td>
                                        <td>정상결제</td>
                                        <td><button type="button">해지승인</button></td>
                                    </tr>
                                    <tr>
                                        <td>wls</td>
                                        <td>7일</td>
                                        <td>2024-10-03</td>
                                        <td>정상결제</td>
                                        <td><button type="button">해지승인</button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div id="wrap-foot" className="footer">
                    <div className="ft-head clearfix">
                        <ul>
                            <li><Link to="#">회사소개</Link></li>
                            <li><Link to="#">이용약관</Link></li>
                            <li><Link to="#">개인정보처리방침</Link></li>
                            <li><Link to="#">청소년보호정책</Link></li>
                            <li><Link to="#">위치기반서비스</Link></li>
                        </ul>
                    </div>
                    <div className="ft-main clearfix">
                        <div className="ft-logo">
                            <img src="../../assets/images/logo.webp" alt="지니뮤직 로고" />
                        </div>
                        {/* <!-- 회사 정보 텍스트 --> */}
                        <div className="ft-info">
                            <p>(주) 따지니뮤직</p>
                            <p>대표이사 황일영 | 서울 서초구 강남대로 405 통영빌딩 8층 </p>
                            <p>사업자등록번호: 777-77-01234 | 통신판매업신고 2013-서울강남-01302</p>
                            <p>개인정보보호책임자: 임현성 | 서비스문의: 1577-5337 | 이메일: molddajini@hwak.ma</p>
                            <p>COPYRIGHT©DDAGENIE MUSIC CORP ALL RIGHTS RESERVED.</p>
                        </div>
                    </div>
                    {/* <!-- sns 아이콘 빼두됨 --> */}
                    <div className="ft-sns">
                        <Link to="#"><img src="../../assets/images/kakao.png" alt="카카오톡" /></Link>
                        <Link to="#"><img src="../../assets/images/facebook.png" alt="페이스북" /></Link>
                        <Link to="#"><img src="../../assets/images/insta.png" alt="인스타그램" /></Link>
                    </div>
                </div>

            </div>
        </>
    );
}

export default AdminPayment;