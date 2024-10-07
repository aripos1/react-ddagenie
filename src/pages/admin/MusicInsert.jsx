import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


import Header from '../include/Header';
import Footer from '../include/Footer';


import '../../assets/css/musicAdmin.css';

const MusicInsert = () => {

    /*---라우터 관련-------------------------------*/

    /*---상태관리 변수들(값이 변화면 화면 랜더링 )---*/
    const navigate = useNavigate();

    const [artists, setArtists] = useState([]); // 아티스트 목록 상태

    const [title, setTitle] = useState('');
    const [artistNo, setArtistNo] = useState(''); // 아티스트 번호 상태
    const [genre, setGenre] = useState('');
    const [releasedDate, setReleasedDate] = useState('');
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState(null);
    const [fileUrl, setFileUrl] = useState(null);
    
<<<<<<< HEAD

    /*---일반 변수--------------------------------*/

    /*---일반 메소드 -----------------------------*/ 
    

    /*---훅(useEffect)+이벤트(handle)메소드-------*/
=======
>>>>>>> 0c179d65e32e0939948c172e041d2905bc0abf84
    // 아티스트 목록 불러오기
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/artists`)
            .then(response => {
                console.log('API Response:', response.data);
                if (response.data && Array.isArray(response.data.apiData)) {
                    setArtists(response.data.apiData);
                } else {
                    console.error('Error: Expected array but got', typeof response.data.apiData);
                    setArtists([]);
                }
            })
            .catch(error => {
                console.error('Error fetching artists:', error);
                setArtists([]);
            });
    }, []);



    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleArtistChange = (e) => setArtistNo(e.target.value); // 아티스트 선택 시 번호로 업데이트
    const handleGenreChange = (e) => setGenre(e.target.value);
    const handleReleasedDateChange = (e) => setReleasedDate(e.target.value);
    const handleContentChange = (e) => setContent(e.target.value);
    const handleImageChange = (e) => setImageUrl(e.target.files[0]);
    const handleFileChange = (e) => setFileUrl(e.target.files[0]);



    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('artistNo', artistNo); // 아티스트 번호 전송
        formData.append('genre', genre);
        formData.append('releasedDate', releasedDate);
        formData.append('musicContent', content);
        formData.append('imageUrl', imageUrl);
        formData.append('fileUrl', fileUrl);

        axios.post(`${process.env.REACT_APP_API_URL}/api/musicAdmins`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then(response => {
            console.log(response);
            alert('음원이 성공적으로 등록되었습니다.');
            navigate('/admin/musicadmin');
        })
        .catch(error => {
            console.error(error);
            alert('음원 등록 중 오류가 발생했습니다.');
        });

    };







    return (

<<<<<<< HEAD
=======
                <label htmlFor="artist">아티스트(가수)</label>
                <select
                    id="artist"
                    value={artistNo} // 선택된 아티스트 번호를 상태로 설정
                    onChange={handleArtistChange} // 아티스트 선택 시 번호 업데이트
                    required
                >
                    <option value="">아티스트를 선택하세요</option>
                    {artists.map(artist => (
                        <option key={artist.artistNo} value={artist.artistNo}>
                            {artist.artistName}
                        </option>
                    ))}
                </select>
>>>>>>> 0c179d65e32e0939948c172e041d2905bc0abf84

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
                            <h2>음원 등록</h2>
                        </div>

                        <div id="musicInsert">

                            <div className="container">

                                <form onSubmit={handleSubmit} encType="multipart/form-data">
                                    <label htmlFor="title">음원 제목</label>
                                    <input
                                        type="text"
                                        id="title"
                                        value={title}
                                        onChange={handleTitleChange}
                                        placeholder="음원 제목을 입력하세요"
                                        required
                                    />

                                    <label htmlFor="artist">아티스트(가수)</label>
                                    <select
                                        id="artist"
                                        value={artistName} // 선택된 아티스트 이름을 상태로 설정
                                        onChange={handleArtistChange} // 아티스트 선택 시 상태 업데이트
                                        required
                                    >
                                        <option value="">아티스트를 선택하세요</option>
                                        {artists.map(artist => (
                                            <option key={artist.artistNo} value={artist.artistName}>
                                                {artist.artistName}
                                            </option>
                                        ))}
                                    </select>

                                    <label htmlFor="genre">장르</label>
                                    <select id="genre" value={genre} onChange={handleGenreChange} required>
                                        <option value="">장르를 선택하세요</option>
                                        <option value="Pop">Pop</option>
                                        <option value="Rock">Rock</option>
                                        <option value="HipHop">HipHop</option>
                                        <option value="Kizz">Kizz</option>
                                        <option value="Classical">Classical</option>
                                    </select>

                                    <label htmlFor="releasedDate">발매일</label>
                                    <input type="date" id="releasedDate" value={releasedDate} onChange={handleReleasedDateChange} required />

                                    <label htmlFor="content">음원 소개</label>
                                    <input
                                        type="text"
                                        id="content"
                                        value={content}
                                        onChange={handleContentChange}
                                        placeholder="음원 소개를 입력하세요 (옵션)"
                                    />

                                    <label htmlFor="musicImage">음원 이미지</label>
                                    <input type="file" id="musicImage" name="musicImage" onChange={handleImageChange} required />

                                    <label htmlFor="musicFile">음원 파일 업로드</label>
                                    <input type="file" id="musicFile" name="musicFile" onChange={handleFileChange} accept=".mp3,.wav,.flac" required />

                                    <button type="submit">음원 등록</button>
                                    <button type="button" className="back-btn" onclick="history.back()">뒤로 가기</button>
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
};

export default MusicInsert;
