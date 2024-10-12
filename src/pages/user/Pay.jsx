//import 라이브러리
import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


//import 컴포넌트
import Header from '../include/Header';
import Footer from '../include/Footer';

//import css
import '../../assets/css/pay.css';
import arrow from '../../assets/images/arrow_bottom_chevron_icon_176226.png';





const Pay = () => {

    /* ---라우터 관련 ------ */
    const [goodsOne, setGoodsOne] = useState('');

    const [paymentMethod, setPaymentMethod] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        console.log('authUser:', authUser);
    }, []);

    /*---상태관리 변수들(값이 변화면 화면 랜더링)  ----------*/
    const authUser = JSON.parse(localStorage.getItem('authUser'));
    console.log('authUser:', authUser);

    /*---일반 메소드 --------------------------------------------*/

    const { no } = useParams();
    console.log(no)
    const getPersonOne = () => {

        axios({
            method: 'get', 			// put, post, delete                   
            url: `${process.env.REACT_APP_API_URL}/api/product/${no}`,
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

            setGoodsOne(response.data.apiData)

        }).catch(error => {
            console.log(error);
        });
    }




    /*---생명주기 + 이벤트 관련 메소드 ----------------------*/
    const userNo = authUser.no;
    // console.log(userNo)
    // const ticketStatus = authUser.tick
    const handleP = (e) => {
        setPaymentMethod(e.target.value)
        console.log(paymentMethod)
    }



    const handlePay = (e) => {
        e.preventDefault();

        const payVo = {
            userNo: userNo,
            paymentMethod: paymentMethod,
            goodsNo: no
        }
        console.log(payVo);

        axios({
            method: 'post', 			// put, post, delete                   
            url: `${process.env.REACT_APP_API_URL}/api/product`,
            //headers: { "Authorization": `Bearer ${token}`}, // token
            //get delete
            //headers: { "Content-Type": "application/json; charset=utf-8" },  // post put
            //headers: { "Content-Type": "multipart/form-data" }, //첨부파일

            //params: guestbookVo, // get delete 쿼리스트링(파라미터)
            data: payVo,     // put, post,  JSON(자동변환됨)
            //data: formData,           // 첨부파일  multipart방식

            responseType: 'json' //수신타입
        }).then(response => {
            console.log(response); //수신데이타
            console.log(response.data.apiData.updateCount);

            if (response.data.apiData.updateCount === 1) {
                alert("이용권 구매가 완료되었습니다.")

                authUser.ticket_status = "이용중"
                authUser.paymentFinish = response.data.apiData.paymentFinish;
                console.log(authUser)

                localStorage.setItem('authUser', JSON.stringify(authUser));
                navigate("/");
            } else {
                alert("구매 실패");
            }




        }).catch(error => {
            console.log(error);
        });

    }




    // 1.이벤트 잡기

    //2. 데이터 잡기 + 묶기(배열)

    //3. 전송 (ajax 사용)

    useEffect(() => {
        getPersonOne();
    }, [])

    return (
        <>
            <div id="wrap-main" className='pay-wrap'>

                <Header />


                <div id="wrap-body" className="clearfix pay">
                    <div id="user-pay">
                        <div id="top-title">
                            <h2>이용권 정보</h2>
                            <p>홈 | <strong>이용권구매</strong></p>
                        </div>

                        <div id="smart-music-listen">
                            <table className="pay-total-list">
                                <tbody className="pay-table">
                                    <tr>
                                        <td colSpan="2" className="tb-total">구매정보</td>
                                    </tr>
                                    <tr className="tb-one">
                                        <td className="pay-one-one">구매자</td>
                                        <td className="pay-one-two a">{authUser.name}</td>
                                    </tr>
                                    <tr className="tb-one">
                                        <td className="pay-one-one">아이디</td>
                                        <td className="pay-one-two a">{authUser.id}</td>
                                    </tr>
                                    <tr className="tb-one">
                                        <td className="pay-one-one">이용권</td>
                                        <td className="pay-one-two a">{goodsOne.goodsName}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2" className='down-arrow'>
                                            <img className="kkk" src={arrow} />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="box">
                                <table className="pay-total-list">
                                    <tbody id='total'>
                                        <tr>
                                            <td colSpan="2" class="tb-total">최종 결제정보</td>
                                        </tr>
                                        <tr className="tb-one">
                                            <td className="pay-one-one">상품 금액</td>
                                            <td className="pay-one-two">{goodsOne.goodsPrice}원</td>
                                        </tr>
                                        <tr className="tb-two">
                                            <td className="pay-two-one">할인 금액</td>
                                            <td className="pay-two-two">-0원</td>
                                        </tr>
                                        <tr className="tb-three">
                                            <td className="pay-three-one">총 결제 금액</td>
                                            <td className="pay-three-two">{goodsOne.goodsPrice}원</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="down-arrow">
                                <img className="kkk" src={arrow} />
                            </div>
                            <form onSubmit={handlePay}>
                                <div id="pay-all-box">
                                    <div id="pay-choose-box" className="box">
                                        <p>결제수단 선택</p>
                                        <div id="pay-choose-radio-box">
                                            
                                            <input type="radio" id="c" name="pay" value="신용카드" onChange={handleP} />
                                            <label htmlFor="c" name="pay" >신용카드</label>
                                            
                                            <input type="radio" id="s" name="pay" value="무통장입금" onChange={handleP} />
                                            <label htmlFor="s" name="pay" >무통장입금</label>
                                            
                                            <input type="radio" id="p" name="pay" value="휴대폰소액결제" onChange={handleP} />
                                            <label htmlFor="p" name="pay" >휴대폰 소액결제</label>
                                        </div>
                                    </div>
                                </div>
                                <button id="total-price-btn" type="submit">결제하기</button>
                            </form>
                        </div>
                    </div>

                </div>
                <Footer />

            </div>


        </>
    );
}

export default Pay;