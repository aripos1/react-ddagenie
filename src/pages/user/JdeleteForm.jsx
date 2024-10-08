//import 라이브러리
import React,{useEffect} from 'react';
import { Link } from 'react-router-dom';


//import 컴포넌트


//import css
import '../../assets/css/jjinDeleteForm.css';
import Header from '../include/Header';
import Footer from '../include/Footer';





const JdeleteForm = () => {

    /* ---라우터 관련 ------ */

    /*---상태관리 변수들(값이 변화면 화면 랜더링)  ----------*/
    


    /*---일반 메소드 --------------------------------------------*/


    /*---생명주기 + 이벤트 관련 메소드 ----------------------*/
    

        //문법임. 여기안에 담겨진다.
        
            

    


    // 1.이벤트 잡기

    //2. 데이터 잡기 + 묶기(배열)

    //3. 전송 (ajax 사용)

    useEffect(()=>{

    },[]);


    return (
        <>
            <div id="wrap-main">
        
                <Header />
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
                
                <Footer />

            </div>
        </>
    );
}

export default JdeleteForm;