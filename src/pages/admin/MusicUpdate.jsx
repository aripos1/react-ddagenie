//import 라이브러리

import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Header from '../include/Header';
import Footer from '../include/Footer';



import '../../assets/css/musicAdmin.css';





const MusicUpdate = () => {

    /*---라우터 관련-------------------------------*/

    /*---상태관리 변수들(값이 변화면 화면 랜더링 )---*/
    const { no } = useParams(); 

    const [musicVo, setMusicVo] = useState([]);

    /*---일반 변수--------------------------------*/

    /*---일반 메소드 -----------------------------*/    
    const getMusicVo = ()=>{
        axios({

            method: 'get',
            url: `${process.env.REACT_APP_API_URL}/api/musicAdmins/${no}`,

            responseType: 'json' //수신타입
        }).then(response => {
            console.log(response.data); //수신데이타
            
            setMusicVo(response.data.apiData);


        }).catch(error => {
            console.log(error);

        });


    }




    /*---훅(useEffect)+이벤트(handle)메소드-------*/

    //마운트 되었을때 
    useEffect( ()=>{

        console.log("read");
        getMusicVo();
        


    }, [] );





    return (

        <>

            <div id="wrap-main">
                


                {/* <!-- header --> */}
                <Header />
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
                            <h2>음원 수정</h2>
                        </div>

                        <div id="musicUpdate">

                            <div className="container">
                                <form action="/submit-song" method="POST" enctype="multipart/form-data">

                                    <label htmlFor="title">음원 제목</label>
                                    <input type="text" id="title" name="title" placeholder="음원 제목을 입력하세요" required />
                                    
                                    <label htmlFor="artist">아티스트(가수)</label>
                                    <input type="text" id="artist" name="artist" placeholder="아티스트(가수) 이름을 입력하세요" required />
                                    
                                    <label htmlFor="genre">장르</label>
                                    <select id="genre" name="genre" required>
                                        <option value="">장르를 선택하세요</option>
                                        <option value="Pop">Pop</option>
                                        <option value="Rock">Rock</option>
                                        <option value="HipHop">HipHop</option>
                                        <option value="Jazz">Jazz</option>
                                        <option value="Classical">Classical</option>
                                    </select>
                                    
                                    <label htmlFor="song_">음원 소개</label>
                                    <input type="text" id="song_link" name="song_link" placeholder="음원 링크를 입력하세요 (옵션)" />
                        
                                    <label htmlFor="song_link">음원 이미지</label>
                                    <input type="file" id="song_file" name="song_file" accept=".mp3,.wav,.flac" required />
            
                                    <label htmlFor="song_file">음원 파일 업로드</label>
                                    <input type="file" id="song_file" name="song_file" accept=".mp3,.wav,.flac" required />
                        
                                    <button type="submit">음원 수정</button>
                                    <button type="button" class="back-btn" onclick="history.back()">뒤로 가기</button>
                                </form>
                            </div>


                        </div>


                    </div>
                </div>

                
                {/* <!-- //body --> */}

                <Footer />
                {/* <!-- footer --> */}
                

            </div>

        </>

    );

}

export default MusicUpdate;