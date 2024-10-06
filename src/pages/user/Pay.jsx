//import 라이브러리
import React from 'react';
import {Link} from 'react-router-dom';


//import 컴포넌트


//import css
import '../../assets/css/jjinpayForm.css';





const Pay = () => {

    /* ---라우터 관련 ------ */

    /*---상태관리 변수들(값이 변화면 화면 랜더링)  ----------*/
    


    /*---일반 메소드 --------------------------------------------*/
    
        

    

    /*---생명주기 + 이벤트 관련 메소드 ----------------------*/
    

        
        

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
                                    <input type="search" id="sc-fd" className="ipt-search" maxLength="200" autocomplete="off"
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
                                <li><Link to="http://localhost:3000/login" className="btn login-join-btn">로그인</Link></li>
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
                            <h2>이용권 정보</h2>
                            <p>홈 | <strong>이용권구매</strong></p>
                        </div>

                        <div id="smart-music-listen">
                            <table className="pay-total-list">
                            <colgroup>
                                <col style={{ width: '250px'}} />
                                <col style={{ width: '150px'}} />
                            </colgroup>

                                <tbody>
                                    <tr>
                                        <td colSpan="2" className="tb-total">구매정보</td>
                                    </tr>
                                    <tr className="tb-one">
                                        <td className="pay-one-one">구매자</td>
                                        <td className="pay-one-two a">진소영</td>
                                    </tr>
                                    <tr className="tb-one">
                                        <td className="pay-one-one">아이디</td>
                                        <td className="pay-one-two a">wls</td>
                                    </tr>
                                    <tr className="tb-one">
                                        <td className="pay-one-one">이용권</td>
                                        <td className="pay-one-two a">30일권</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <button className="lll">
                                                <img className="kkk" src="../../assets/images/—Pngtree—down direction arrow icon_4243686.png" />
                                            </button>
                                            
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="box">
                                <table className="pay-total-list">
                                    <colgroup>
                                        <col style={{ width: '300px'}} />
                                        <col style={{ width: '100px'}} />
                                    </colgroup>
                                    <tbody>
                                        <tr>
                                            <td colSpan="2" class="tb-total">최종 결제정보</td>
                                        </tr>
                                        <tr className="tb-one">
                                            <td className="pay-one-one">상품 금액</td>
                                            <td className="pay-one-two">10000원</td>
                                        </tr>
                                        <tr className="tb-two">
                                            <td className="pay-two-one">할인 금액</td>
                                            <td className="pay-two-two">-0원</td>
                                        </tr>
                                        <tr className="tb-three">
                                            <td className="pay-three-one">총 결제 금액</td>
                                            <td className="pay-three-two">10000원</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <button className="lll">
                                                    <img className="kkk" src="../../assets/images/—Pngtree—down direction arrow icon_4243686.png" />
                                                </button>
                                                
                                            </td>
                                        </tr>
                                        
                                    </tbody>
                                </table>
                            </div>
                            <div id="pay-all-box">
                                <div id="pay-choose-box" className="box">
                                    <form>
                                        <p>결제수단 선택</p>
                                        <div id="pay-choose-radio-box">
                                            <label htmlFor="c" name="pay" >신용카드</label>
                                            <input type="radio" id="c" name="pay" value="" />

                                            <label htmlFor="s" name="pay" >무통장입금</label>
                                            <input type="radio" id="s" name="pay" value="" />

                                            <label htmlFor="p" name="pay" >휴대폰 소액결제</label>
                                            <input type="radio" id="p" name="pay" value="" />
                                        </div>
                                    </form>
                                </div>

                            </div>
                            <button id="total-price-btn" type="button">결제하기</button>
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
                        
                        <div className="ft-info">
                            <p>(주) 따지니뮤직</p>
                            <p>대표이사 황일영 | 서울 서초구 강남대로 405 통영빌딩 8층 </p>
                            <p>사업자등록번호: 777-77-01234 | 통신판매업신고 2013-서울강남-01302</p>
                            <p>개인정보보호책임자: 임현성 | 서비스문의: 1577-5337 | 이메일: molddajini@hwak.ma</p>
                            <p>COPYRIGHT©DDAGENIE MUSIC CORP ALL RIGHTS RESERVED.</p>
                        </div>
                    </div>
                    
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

export default Pay;