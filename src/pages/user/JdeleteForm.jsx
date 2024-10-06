//import 라이브러리
import React from 'react';
import { Link } from 'react-router-dom';


//import 컴포넌트


//import css
import '../../assets/css/jjinDeleteForm.css';





const JdeleteForm = () => {

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
                    </div>
                    <div id="wrap-main">
                        <div id="top-title">
                            <h2>이용권 내역</h2>
                            <p>홈 | 마이뮤직 | 이용권내역 | <strong>이용권 상세내역</strong></p>
                        </div>
                        <div id="top-ct-list">
                            <ul>
                                <li><Link to="#">이용권 상세내역</Link></li>
                                <li><Link to="#">이용권 해지/취소 신청</Link></li>
                            </ul>
                        </div>
                        <div id="delete-list-table">
                            <table>
                                <colgroup>
                                    <col style={{ width: '400px'}} />
                                    <col style={{ width: '100px'}} />
                                    <col style={{ width: '100px'}} />
                                    <col style={{ width: '100px'}} />
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th>이용권명</th>
                                        <th>결제일</th>
                                        <th>종료예정일</th>
                                        <th>이용여부</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="table-line">
                                        <td>1일권</td>
                                        <td>2024-10-03</td>
                                        <td>2024-10-04</td>
                                        <td>사용중</td>
                                        <td class="not-background">
                                            <button className="sy-btn-delete" type="button" >해지신청</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="5">해지/취소 가능한 이용권이 없습니다</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        {/* <!--안내사항--> */}
                        <div id="guidelines-box">
                            <h3>안내사항</h3><br/>
                            <p>안내사항</p>
                            <ul>
                                <li>자동 결제 해지는 [지니 앱 또는 웹사이트 : 우측 상단 사람 아이콘 : 이용권 정보]에서 할 수 있습니다. 자동 결제를 해지하더라도 이용권 만료일까지 사용할 수 있습니다.</li>
                                <li>사용하지 않은 이용권은 결제 후 7일 이내에 전액을 환불 받을 수 있습니다.</li>
                                <li>사용 중인 이용권을 해지하는 경우, 이용량을 기준으로 차감된 금액을 환불 받을 수 있습니다.</li>
                                <li>전액 또는 일부 금액의 환불은 지니 고객센터(1577-5337)로 전화하거나, [지니 앱 : 전체메뉴 : 고객센터 : 1:1 문의], [지니 웹사이트 : (하단)고객센터 : 서비스 문의]에서 할 수 있습니다.</li>
                                <br />
                            </ul>
                            <p>Google Play</p>
                            <ul>
                                <li>Google Play 정기 결제 해지는 [Google Play 스토어 : 계정]에서 할 수 있습니다.</li>
                                <br />
                            </ul>
                            <p>원스토어</p>
                            <ul>
                                <li>원스토어 정기 결제 해지 및 결제 수단 변경은 [원스토어 : 마이 : 결제·정기결제]에서 할 수 있습니다.</li>
                                <br />
                            </ul>
                            <p>통신사 부가서비스</p>
                            <ul>
                                <li>통신사 부가서비스 및 멤버십 관련 사항은 통신사의 정책을 따릅니다.</li>
                                <li>통신사 부가서비스의 해지 및 환불은 통신사 고객센터 및 홈페이지에서 신청할 수 있습니다.</li>
                            </ul>
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

export default JdeleteForm;