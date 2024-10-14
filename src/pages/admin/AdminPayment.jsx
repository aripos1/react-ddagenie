//import 라이브러리
import React,{useEffect, useState} from 'react';
import { Link, useAsyncError, useNavigate } from 'react-router-dom';
import axios from 'axios';

//import 컴포넌트
import Header from '../include/Header';
import Footer from '../include/Footer';

//import css
import '../../assets/css/payment-admin.css';


import Sidebar from '../include/AsideAdmin'; // Sidebar 컴포넌트 import
/*===== 프로필 이미지 설정 ===== : 사이드 바 프로필 사진 출력용 : */
// 기본 프로필 이미지 import
import profileImage from '../../assets/images/default_img2.png';







const AdminPayment = () => {

    /* ---라우터 관련 ------ */
    const [deleteUserList, setDeleteUserList] = useState([]);
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem('authUser')));

    const [ticketStatus, setTicketStatus] = useState('');

    /*---상태관리 변수들(값이 변화면 화면 랜더링)  ----------*/
    
    /*===== 프로필 이미지 설정 ===== : 사이드 바 프로필 사진 출력용 : */
    const profile = authUser?.saveName ? `${process.env.REACT_APP_API_URL}/upload/${authUser.saveName}` : profileImage;

    const navigate = useNavigate();


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
                getDeleteList();
                
                
            }
            // console.log('바뀐값 가져옴??')
            // console.log(ticketStatus)
            
            
            
        }).catch(error => {
            console.log(error);
        });

        //authUser.ticketStatus = '해지완료'
        //localStorage.setItem('authUser', JSON.stringify(authUser));
        
    }

        //문법임. 여기안에 담겨진다.

    


    // 1.이벤트 잡기

    //2. 데이터 잡기 + 묶기(배열)

    //3. 전송 (ajax 사용)

    useEffect(()=>{

        if (authUser.roll == 0) {
            getDeleteList();

        } else {
            alert('접근 권한이 없습니다');
            navigate('/');
        }


    },[]);

    return (
        <>
            <div id="wrap-main">
        
                
                    <Header />

                
                <div id="wrap-body" className="clearfix ham">



                    {/* Admin Sidebar 컴포넌트 호출 */}
                    <Sidebar name={authUser?.name} profile={profile} />
                    {/* Admin Sidebar 컴포넌트 호출 */}

                    <div id="wrap-main">
                        <div id="top-title">
                            <h2>이용권 내역</h2>
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
                                                <td>{delUserVo.terminationStatus}</td>
                                                {(delUserVo.terminationStatus === '해지요청') ? (
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