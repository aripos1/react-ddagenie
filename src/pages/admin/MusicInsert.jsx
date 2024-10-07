//import 라이브러리

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../../assets/css/musicAdmin.css';

const MusicInsert = () => {

    /*---라우터 관련-------------------------------*/
    const navigate = useNavigate();

    /*---상태관리 변수들(값이 변화면 화면 랜더링 )---*/
    const [title, setTitle] = useState();
    const [artist, setArtist] = useState();
    const [genre, setGenre] = useState();
    const [releasedDate, setReleasdDate] = useState();
    const [content, setContent] = useState();
    const [imageUrl, setImageUrl] = useState();
    const [fileUrl, setFileUrl] = useState();

    /*---일반 변수--------------------------------*/

    /*---일반 메소드 -----------------------------*/

    /*---훅(useEffect)+이벤트(handle)메소드-------*/

    const handleTitle = (e) => {
        console.log('타이틀');
        setTitle(e.target.value);
    };

    const handleArtist = (e) => {
        console.log('아티스트 이름');
        setArtist(e.target.value);
    };

    const handleGenre = (e) => {
        console.log('장르');
        setGenre(e.target.value);
    };

    const handleReleasedDate = (e) => {
        console.log('발매일');
        setReleasdDate(e.target.value);
    };

    const handleContent = (e) => {
        console.log('컨텐트');
        setContent(e.target.value);
    };

    const handleImg = (e) => {
        console.log('이미지');
        setImageUrl(e.target.files[0]);
    };

    const handleFile = (e) => {
        console.log('음원');
        setFileUrl(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        //이벤트 잡고
        e.preventDefault();
        console.log('전송');

        //데이타모으고 (묶고)
        const formData = new FormData(); 
        formData.append('title', title);
        formData.append('artistName', artist);
        formData.append('genre', genre);
        formData.append('releasedDate', releasedDate);
        formData.append('musicContent', content);
        formData.append('imageUrl', imageUrl);
        formData.append('fileUrl', fileUrl);

        console.log(formData.get('title'));

        //서버로 전송
        axios({

            method: 'post', // put, post, delete

            url: `${process.env.REACT_APP_API_URL}/api/musicAdmins`,//get delete

            //headers: { "Content-Type": "application/json; charset=utf-8" }, // post put
            headers: { "Content-Type": "multipart/form-data" }, //첨부파일

            //params: guestbookVo, // get delete 쿼리스트링(파라미터)
            //data: guestbookVo, // put, post, JSON(자동변환됨)
            data: formData, // 첨부파일 multipart방식   //파라미터 처럼 받음 !!json아님!!

            responseType: 'json' //수신타입

        }).then(response => {

            console.log(response); //수신데이타

            //리다이렉트
            alert('등록되었습니다');
            navigate('/api/musicAdmins');


        }).catch(error => {

            console.log(error);

        });



    };




    return (

        <>

            <div id="wrap-main">
                


                {/* <!-- header --> */}
                <div id="wrap-head">
                    <div id="wrap-header">
                        <div id="purchase-button">
                            <img src="../../assets/images/wallet.png" />
                            <Link to="" className="headBuy" rel="noreferrer noopener">이용권구매</Link>
                        </div>
                        <div className="header-main">
                            <div className="header-left">
                                <span className="logo">
                                    <img src="../../assets/images/cuteddagenie.png" alt="로고" />
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
                                <li><Link to="" className="gnb-menu" rel="noreferrer noopener">따지니차트</Link></li>
                                <li><Link to="" className="gnb-menu" rel="noreferrer noopener">최신음악</Link></li>
                                <li><Link to="" className="gnb-menu" rel="noreferrer noopener">장르음악</Link></li>
                            </ul>
                            {/* <!-- <ul className="gnb-my"> 로그인 안한거
                                <li><a href="" className="btn login-join-btn">로그인</a></li>
                                <li><a href="" className="btn login-join-btn">회원가입</a></li>
                            </ul> --> */}
                            <ul className="gnb-my"> {/* <!-- 로그인 한거 -->  */}
                                <li><Link to="" className="btn login-join-btn" rel="noreferrer noopener">jji***님</Link></li>
                                <li><Link to="" className="btn login-join-btn" rel="noreferrer noopener">마이뮤직</Link></li>
                            </ul>
                        </div>
                    </div>

                </div>
                {/* <!-- //header --> */}


                {/* <!-- body --> */}
                <div id="wrap-body" className="clearfix">
                    <div id="wrap-side">

                        <div id="profile-box" >
                            <div className="profile-name" >
                                <span>
                                    <img src="../../assets/images/cuteddagenie.png" />
                                </span>
                                <div className="profile-name-one">
                                    <p><Link to="" rel="noreferrer noopener"><strong>진소영</strong> 님</Link></p>
                                    <Link to="" rel="noreferrer noopener">프로필수정</Link>
                                </div>
                            </div>
                            <div className="profile-edit">
                                <Link to="" className="button-left" rel="noreferrer noopener"><span>내정보</span></Link>
                                <Link to="" className="button-right" rel="noreferrer noopener"><span>이용권내역</span></Link>
                            </div>
                        </div>
                        {/* <!-- /프로필 --> */}
                        {/* <!-- 마이뮤직 리스트--> */}
                        <div id="profile-list">
                            <a>
                                <span>관리자 페이지</span>
                            </a>
                            <div>
                                <ul>
                                    <li><Link to="" rel="noreferrer noopener"><img src="../../assets/images/search.png" /> 음원 관리</Link></li>
                                    <li><Link to="" rel="noreferrer noopener"><img src="../../assets/images/search.png" /> 결제 관리</Link></li>
                                </ul>
                            </div>
                        </div>
                        {/* <!-- /마이뮤직 리스트--> */}
                    </div>
                    <div id="wrap-main">

                        <div id="top-title">
                            <h2>음원 등록</h2>
                        </div>

                        <div id="musicInsert">

                            <div className="container">


                                <form action="/submit-song" method="POST" onSubmit={handleSubmit} enctype="multipart/form-data">

                                    <label htmlFor="title">음원 제목</label>
                                    <input type="text" id="title" name="title" value={title} onChange={handleTitle} placeholder="음원 제목을 입력하세요" required />
                                    
                                    <label htmlFor="artist">아티스트(가수)</label>
                                    <input type="text" id="artist" name="artist" value={artist} onChange={handleArtist} placeholder="아티스트(가수) 이름을 입력하세요" required />
                                    
                                    <label htmlFor="genre">장르</label>
                                    <select id="genre" name="genre" value={genre} onChange={handleGenre} required>
                                        <option value="">장르를 선택하세요</option>
                                        <option value="Pop">Pop</option>
                                        <option value="Rock">Rock</option>
                                        <option value="HipHop">HipHop</option>
                                        <option value="Kizz">Kizz</option>
                                        <option value="Classical">Classical</option>
                                    </select>
                                    
                                    <label htmlFor="released_date">발매일</label>
                                    <input type="date" id="releasedDate" name="releasedDate" onChange={handleReleasedDate} required />
            
                                    <label htmlFor="content">음원 소개</label>
                                    <input type="text" id="content" name="content" value={content} onChange={handleContent} placeholder="음원 소개를 입력하세요 (옵션)" />
                        
                                    <label htmlFor="musicImage">음원 이미지</label>
                                    <input type="file" id="musicImage" name="musicImage" onChange={handleImg} required />
            
                                    <label htmlFor="musicFile">음원 파일 업로드</label>
                                    <input type="file" id="musicFile" name="musicFile" onChange={handleFile} accept=".mp3,.wav,.flac" required />
                        
                                    <button type="submit">음원 등록</button>
                                    <button type="button" className="back-btn" onclick="history.back()">뒤로 가기</button>
                                </form>
                            </div>
                            
                        </div>


                    </div>
                </div>

                
                {/* <!-- //body --> */}


                {/* <!-- footer --> */}
                

            </div>

        </>

    );

}

export default MusicInsert;