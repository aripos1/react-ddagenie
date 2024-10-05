//import 라이브러리
import React from 'react';
import { Link } from 'react-router-dom';


//import 컴포넌트


//import css
import '../../assets/css/payment.css'





const Payment = () => {

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
                    <div id="">
                        <div id="top-title">
                            <h2>이용권 구매</h2>
                            <p>홈 | 마이뮤직 | 이용권구매 | <strong>BEST 이용권</strong></p>
                        </div>
                        <div id="select-usePayment">
                            <Link to='#' id="use-payment-my">사용중인 이용권</Link>
                            <span>사용중인 이용권이 없습니다.</span>
                            <p>이용권을 구매하고 다양한 혜택을 누리세요!</p>
                            <span>1일 이용권 사용중입니다.</span>
                            <p>지금바로 다양한 음악들을 만나보세요!</p>
                            <Link to="#"><button id="delete-move-button">이용권 해지/설정</button></Link>
                        </div>
                        <div id="all-product-area">    
                            <p className="product-title">무제한 듣기 + 오프라인 재생</p>
                            <div className="product-back-div clearfix">
                                <p className="product-name-date">스트리밍 플러스 티켓 1일</p>
                                <p className="product-name-date">무제한 듣기 + 오프라인 재생</p>
                                <Link to="#"><button claclassNamess="product-float">구매</button></Link>
                                <p className="float-p">10,000 원</p>
                            </div>
                        </div>
                        <div id="all-product-area">    
                            <p className="product-title">무제한 듣기 + 오프라인 재생</p>
                            <div className="product-back-div clearfix">
                                <p className="product-name-date">스트리밍 플러스 티켓 7일</p>
                                <p className="product-name-date">무제한 듣기 + 오프라인 재생</p>
                                <Link to="#"><button className="product-float">구매</button></Link>
                                <p className="float-p">30,000 원</p>
                            </div>
                        </div>
                        <div id="all-product-area">    
                            <p className="product-title">무제한 듣기 + 오프라인 재생</p>
                            <div className="product-back-div clearfix">
                                <p className="product-name-date">스트리밍 플러스 티켓 30일</p>
                                <p className="product-name-date">무제한 듣기 + 오프라인 재생</p>
                                <Link to="#"><button className="product-float">구매</button></Link>
                                <p className="float-p">70,000 원</p>
                            </div>
                        </div>
                    </div>
                    {/* footer */}
                </div>
                

            </div>
        </>
    );
}

export default Payment;