//import 라이브러리
import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


//import 컴포넌트


//import css
import '../../assets/css/jjinUtilize.css'





const Utilize = () => {

    /* ---라우터 관련 ------ */
    const [payList, setPayList] = useState([]);

    /*---상태관리 변수들(값이 변화면 화면 랜더링)  ----------*/
    


    /*---일반 메소드 --------------------------------------------*/

    const getUserPayList = ()=>{

        axios({
            method: 'get', 			// put, post, delete                   
            url: 'http://localhost:8888/api/pay/user',
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

            
        }).catch(error => {
            console.log(error);
        });

    };

    /*---생명주기 + 이벤트 관련 메소드 ----------------------*/
    

    
        
            

    


    // 1.이벤트 잡기

    //2. 데이터 잡기 + 묶기(배열)

    //3. 전송 (ajax 사용)
    useEffect(()=>{
        getUserPayList();
    },[]);



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
                        
                        <div id="date-box">
                            <div id="date-coupon">
                                <div id="coupon-title">음악감상 잔여일</div>
                                <div id="coupon-count">
                                    <span>0</span> 일
                                    <Link to="#"><p>음악감상 이용권구매</p></Link>
                                </div>
                            </div>
                        </div>
                        <div id="sy-goods-list-box">
                            <h3>이용권 구매내역</h3>
                            
                        </div>
                        <div id="sy-goods-list-table">
                            <table id="list-table">
                                <colgroup>
                                    <col style={{ width: '50px'}} />
                                    <col style={{ width: '190px'}} />
                                    <col style={{ width: '160px'}} />
                                    <col style={{ width: '130px'}} />
                                    <col style={{ width: '85px'}} />
                                    <col style={{ width: '85px'}} />
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th>순번</th>
                                        <th>이용권명</th>
                                        <th>이용기간</th>
                                        <th>결제일/등록일</th>
                                        <th>결제방법</th>
                                        <th>이용여부</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>1일권</td>
                                        <td>~ 2024-10-04</td>
                                        <td>2024-10-03</td>
                                        <td>카드결제</td>
                                        <td>사용중</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>30일권</td>
                                        <td>~ 2024-11-04</td>
                                        <td>2024-10-03</td>
                                        <td>카드결제</td>
                                        <td>사용중</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="6">이용권 구매내역이 없습니다</td>
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

export default Utilize;