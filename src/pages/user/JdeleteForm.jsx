//import 라이브러리
import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


//import 컴포넌트
import Header from '../include/Header';
import Footer from '../include/Footer';

import Sidebar from '../include/Aside'; // Sidebar 컴포넌트 import

//import css
import '../../assets/css/jjinDeleteForm.css';

/*===== 프로필 이미지 설정 ===== : 사이드 바 프로필 사진 출력용 : */ 
// 기본 프로필 이미지 import
import profileImage from '../../assets/images/default_img2.png';






const JdeleteForm = () => {

    /* ---라우터 관련 ------ */
    const { userNo } = useParams();

    // 가져온 값들 넣기
    const [paymentStart, setPaymentStart] = useState('');
    const [paymentFinish, setPaymentFinish] = useState('');
    const [ticketStatus, setTicketStatus] = useState('');
    const [goodsName, setGoodsName] = useState('');
    const [terminationStatus, setTerminationStatus] = useState('');
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem('authUser')));
    const navigate = useNavigate();

    //const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem('authUser')));
    //const [ticketStatus, setTicketStatus] = useState('');

    /*---상태관리 변수들(값이 변화면 화면 랜더링)  ----------*/

    /*===== 프로필 이미지 설정 ===== : 사이드 바 프로필 사진 출력용 : */
    const profile = authUser?.saveName ? `${process.env.REACT_APP_API_URL}/upload/${authUser.saveName}` : profileImage;


    /*---일반 메소드 --------------------------------------------*/


    /*---생명주기 + 이벤트 관련 메소드 ----------------------*/

    //setTicketStatus(authUser.ticketStatus);
    //console.log(ticketStatus);

    //해지 가능한 리스트 가져오기
    const getDeleteList = () => {
        console.log(userNo);

        //서버로 전송
        axios({

            method: 'get', // put, post, delete

            url: `${process.env.REACT_APP_API_URL}/api/delete/${userNo}`,//get delete

            //headers: { "Content-Type": "application/json; charset=utf-8" }, // post put
            //headers: { "Content-Type": "multipart/form-data" }, //첨부파일

            //params: guestbookVo, // get delete 쿼리스트링(파라미터)
            //data: guestbookVo, // put, post, JSON(자동변환됨)
            //data: formData, // 첨부파일 multipart방식   //파라미터 처럼 받음 !!json아님!!

            responseType: 'json' //수신타입

        }).then(response => {

            console.log(response); //수신데이타
            //console.log(response.data.apiData);
            if (response.data.result === 'success') {

                console.log("성공")
                setPaymentStart(response.data.apiData.paymentStart);
                setPaymentFinish(response.data.apiData.paymentFinish);
                setTicketStatus(response.data.apiData.ticketStatus);
                setGoodsName(response.data.apiData.goodsName);

                console.log("티켓스테터스")

            } else {
                console.log("실패")
            }


        }).catch(error => {

            console.log(error);

        });

    }; console.log(ticketStatus);

    //해지신청
    const handleDelete = () => {

        // setTerminationStatus('해지요청');

        //서버로 전송
        axios({

            method: 'put', // put, post, delete

            url: `${process.env.REACT_APP_API_URL}/api/user/${userNo}`,//get delete

            //headers: { "Content-Type": "application/json; charset=utf-8" }, // post put
            //headers: { "Content-Type": "multipart/form-data" }, //첨부파일

            //params: guestbookVo, // get delete 쿼리스트링(파라미터)
            //data: terminationStatus, // put, post, JSON(자동변환됨)
            //data: formData, // 첨부파일 multipart방식   //파라미터 처럼 받음 !!json아님!!

            responseType: 'json' //수신타입

        }).then(response => {

            console.log(response); //수신데이타
            console.log(response.data.apiData);

            if (response.data.apiData > 0) {
                console.log('해지요청완료')

                authUser.ticket_status = '해지요청'

                localStorage.setItem('authUser', JSON.stringify(authUser));



            }



        }).catch(error => {

            console.log(error);

        });

    };


    // setAuthUser(JSON.parse(localStorage.getItem('authUser')))



    // 1.이벤트 잡기

    //2. 데이터 잡기 + 묶기(배열)

    //3. 전송 (ajax 사용)

    useEffect(() => {
        getDeleteList();
    }, []);


    return (
        <>
            <div id="wrap-main">

                <Header />
                <div id="wrap-body" className="clearfix ham">
                    {/* Sidebar 컴포넌트 호출 */}
                    <Sidebar name={authUser?.name} profile={profile} />

                    <div id="wrap-main">
                        <div id="top-title">
                            <h2>이용권 내역</h2>
                            <p>홈 | 마이뮤직 | 이용권내역 | <strong>이용권 상세내역</strong></p>
                        </div>
                        <div id="top-ct-list">
                            <ul>
                                <li><Link to="/user/utilize">이용권 상세내역</Link></li>
                                <li><Link to="#">이용권 해지/취소 신청</Link></li>
                            </ul>
                        </div>
                        <div id="delete-list-table">
                            <table>
                                <colgroup>
                                    <col style={{ width: '400px' }} />
                                    <col style={{ width: '100px' }} />
                                    <col style={{ width: '100px' }} />
                                    <col style={{ width: '100px' }} />
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

                                    {(ticketStatus === '이용중' || ticketStatus === '해지요청') ? (
                                        <tr className="table-line">
                                            <td>{goodsName}</td>
                                            <td>{paymentStart}</td>
                                            <td>{paymentFinish}</td>
                                            <td>{ticketStatus}</td>
                                            <td className="not-background">
                                                {ticketStatus !== '해지요청' ? (
                                                    <button className="sy-btn-delete" type="submin" onClick={handleDelete} >해지신청</button>
                                                ) : (
                                                    <span></span>
                                                )}

                                            </td>

                                        </tr>
                                    ) : (
                                        <tr>
                                            <td colSpan="5">해지/취소 가능한 이용권이 없습니다</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        {/* <!--안내사항--> */}
                        <div id="guidelines-box">
                            <h3>안내사항</h3><br />
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