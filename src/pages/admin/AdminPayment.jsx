//import 라이브러리
import React,{useEffect, useState} from 'react';
import { Link, useAsyncError } from 'react-router-dom';
import axios from 'axios';

//import 컴포넌트
import Header from '../include/Header';
import Footer from '../include/Footer';

//import css
import '../../assets/css/payment-admin.css';






const AdminPayment = () => {

    /* ---라우터 관련 ------ */
    const [deleteUserList, setDeleteUserList] = useState([]);
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem('authUser')));

    const [ticketStatus, setTicketStatus] = useState('');

    /*---상태관리 변수들(값이 변화면 화면 랜더링)  ----------*/
    


    /*---일반 메소드 --------------------------------------------*/
    const getDeleteList = ()=>{

        axios({
            method: 'get', 			// put, post, delete                   
            url: `${process.env.REACT_APP_API_URL}/api/user/deleteUserList`,
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

            setDeleteUserList(response.data.apiData);
            console.log("값 들어감??")
            // console.log(deleteUserList)
            
        }).catch(error => {
            console.log(error);
        });

    };

    

    /*---생명주기 + 이벤트 관련 메소드 ----------------------*/
    
    const handleDelOk = (payNo,userNo)=>{
        // console.log("kk")
        //console.log(payNo)
        //console.log(userNo)

        axios({
            
            method: 'put', 			// put, post, delete                   
            url: `${process.env.REACT_APP_API_URL}/api/user/deleteOk/${payNo}/${userNo}`,
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

            if(response.data.result === 'success'){
            
            // authUser 업데이트
                // authUser.ticket_status = '해지완료';
                // authUser.paymentFinish = null;
                // localStorage.setItem('authUser', JSON.stringify(authUser));
                alert('해지가 완료되었습니다')
                
                
            }
            // console.log('바뀐값 가져옴??')
            // console.log(ticketStatus)
            
            
            
        }).catch(error => {
            console.log(error);
        });

        //authUser.ticketStatus = '해지완료'
        //localStorage.setItem('authUser', JSON.stringify(authUser));
        getDeleteList();
    }

        //문법임. 여기안에 담겨진다.

    


    // 1.이벤트 잡기

    //2. 데이터 잡기 + 묶기(배열)

    //3. 전송 (ajax 사용)

    useEffect(()=>{
        getDeleteList();
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
                                    {deleteUserList.map((delUserVo)=>{
                                        return (
                                            <tr>
                                                <td>{delUserVo.id}</td>
                                                <td>{delUserVo.goodsName}</td>
                                                <td>{delUserVo.paymentStart}</td>
                                                <td>{delUserVo.ticketStatus}</td>
                                                {(delUserVo.ticketStatus === '해지요청') ? (
                                                    <td><button type="button" onClick={()=>{handleDelOk(delUserVo.payNo,delUserVo.userNo)}}>해지승인</button></td>
                                                ) : (
                                                    <td>처리완료</td>
                                                ) }
                                                
                                                    
                                                
                                                    
                                                    
                                            </tr>
                                        )
                                    })}
                                    
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <Footer />

            </div>
        </>
    );
}

export default AdminPayment;