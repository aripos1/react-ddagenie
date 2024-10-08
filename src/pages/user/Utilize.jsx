//import 라이브러리
import React, {useEffect, useState} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import {  differenceInDays } from 'date-fns';


//import 컴포넌트
import Header from '../include/Header';

//import css
import '../../assets/css/jjinUtilize.css'





const Utilize = () => {

    /* ---라우터 관련 ------ */
    const [payList, setPayList] = useState([]);
    const navigate = useNavigate();
    const [dayDifference, setDayDifference] = useState(null);

    /*---상태관리 변수들(값이 변화면 화면 랜더링)  ----------*/
    
    const token = localStorage.getItem('token');
    
    const authUser = JSON.parse(localStorage.getItem('authUser'));
    const userNo = authUser.no;
    const ticketStatus = authUser.ticket_status;
    
    
    

    /*---일반 메소드 --------------------------------------------*/

    const getUserPayList = ()=>{
        if(token == null){
            alert("로그인후 이용해주세요.");
            navigate("/login");
        }

        axios({
            method: 'get', 			// put, post, delete                   
            url: `${process.env.REACT_APP_API_URL}/api/pay/${userNo}`,
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

            setPayList(response.data.apiData);
            
            
        }).catch(error => {
            console.log(error);
        });

    };

    //이용권 시간 계산

    

    const dateReckoding = ()=>{
        // console.log("시작")
        if(authUser !== null && authUser.paymentFinish !== null){
            // console.log('계산시작')
            //디비시간 가져오기
            // const paymentFinishDate = authUser.paymentFinish;
            // console.log(paymentFinishDate);
            const finishTime = authUser.paymentFinish;

            //iso형으로 변환
            const repaymentFinish = finishTime.replace(' ', 'T') + 'Z';

            //최종적으로 값 넣어주기
            const paymentFinish = new Date(repaymentFinish);
            const currentDate = new Date();

            const difference = differenceInDays(paymentFinish,currentDate)+1;
            console.log(difference)
            setDayDifference(difference);
            
            
            console.log(paymentFinish)
            console.log(currentDate)
            console.log(dayDifference)
    }else{
        console.log('11');
        setDayDifference(-1);
    }
    
}
console.log(dayDifference)


    // console.log(dayDifference)
    /*---생명주기 + 이벤트 관련 메소드 ----------------------*/
    
    const check_ticketState = ()=>{
        
            alert('사용중인 이용권이 있습니다.')
            navigate('/user/utilize')
        
    };
    
        
            

    


    // 1.이벤트 잡기

    //2. 데이터 잡기 + 묶기(배열)

    //3. 전송 (ajax 사용)
    useEffect(()=>{
        getUserPayList();
        dateReckoding();
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
                                <li><Link to={`/user/deleteForm/${userNo}`}>이용권 해지/취소 신청</Link></li>
                            </ul>
                        </div>
                        
                        <div id="date-box">
                            <div id="date-coupon">
                                <div id="coupon-title">음악감상 잔여일</div>
                                <div id="coupon-count">
                                {ticketStatus !== '해지요청' ? (
                                    dayDifference >= 0 ? (
                                        <span>{dayDifference} 일</span>
                                        
                                        ) : (
                                        <span>이용권이 없습니다</span>)
                                ) : (
                                    <span>해지 진행중입니다.</span>
                                )}

                                    
                                    
                                    {dayDifference >= 0  ? (
                                        <button onClick={check_ticketState}>음악감상 이용권구매</button>
                                ) : (
                                    <Link to='/user/payment'><button>음악감상 이용권구매</button></Link>)}
                                </div>
                            </div>
                        </div>
                        <div id="sy-goods-list-box">
                            <h3>이용권 구매내역</h3>
                            
                        </div>
                        <div id="sy-goods-list-table">
                            <table id="list-table">
                                <colgroup>
                                    <col style={{ width: '30px'}} />
                                    <col style={{ width: '130px'}} />
                                    <col style={{ width: '160px'}} />
                                    <col style={{ width: '130px'}} />
                                    <col style={{ width: '85px'}} />
                                    <col style={{ width: '85px'}} />
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th>결제번호</th>
                                        <th>이용권명</th>
                                        <th>이용기간</th>
                                        <th>결제일/등록일</th>
                                        <th>결제방법</th>
                                        <th>이용여부</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {payList.length > 0 ? (
                                    
                                    payList.map((payVo) => {
                                        return (
                                            
                                            <tr> {/* 각 요소에 고유한 key 추가 */}
                                                <td>{payVo.payNo}</td>
                                                <td>{payVo.goodsName}</td>
                                                <td>~ {payVo.paymentFinish}</td>
                                                <td>{payVo.paymentStart}</td>
                                                <td>{payVo.paymentMethod}</td>
                                                <td>{payVo.terminationStatus}</td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="6">이용권 구매내역이 없습니다</td>
                                    </tr>
                                )}
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