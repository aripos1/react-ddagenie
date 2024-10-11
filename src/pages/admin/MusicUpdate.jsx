//import 라이브러리

import React, {useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Header from '../include/Header';
import Footer from '../include/Footer';



import '../../assets/css/musicAdmin.css';

// import searchLogo from '../../assets/images/search.png';
// import profileImg from '../../assets/images/cuteddagenie.png';

import Sidebar from '../include/AsideAdmin'; // Sidebar 컴포넌트 import
/*===== 프로필 이미지 설정 ===== : 사이드 바 프로필 사진 출력용 : */
// 기본 프로필 이미지 import
import profileImage from '../../assets/images/default_img2.png';





const MusicUpdate = () => {


    /*===== 프로필 이미지 설정 ===== : 사이드 바 프로필 사진 출력용 : */
    const authUser = JSON.parse(localStorage.getItem('authUser'));
    const profile = authUser?.saveName ? `${process.env.REACT_APP_API_URL}/upload/${authUser.saveName}` : profileImage;


    /*---라우터 관련-------------------------------*/

    /*---상태관리 변수들(값이 변화면 화면 랜더링 )---*/
    const { no } = useParams(); 

    const navigate = useNavigate();

    const [musicVo, setMusicVo] = useState([]);

    const [artists, setArtists] = useState([]); // 아티스트 목록 상태

    const [musicNo, setMusicNo] = useState('');
    const [title, setTitle] = useState('');
    const [artistNo, setArtistNo] = useState('');
    const [artistName, setArtistName] = useState(''); // 아티스트 이름 상태
    const [genre, setGenre] = useState('');
    const [releasedDate, setReleasedDate] = useState('');
    const [content, setContent] = useState('');
    const [imageName, setImageName] = useState(null);
    const [fileName, setFileName] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [fileUrl, setFileUrl] = useState(null);

    /*---일반 변수--------------------------------*/

    /*---일반 메소드 -----------------------------*/    
    const getMusicVo = ()=>{
        axios({

            method: 'get',
            url: `${process.env.REACT_APP_API_URL}/api/musicAdmins/${no}`,

            responseType: 'json' //수신타입
        }).then(response => {
            console.log(response.data); //수신데이타

            setMusicNo(response.data.apiData.musicNo);
            setTitle(response.data.apiData.title);
            setArtistNo(response.data.apiData.artistNo);
            setGenre(response.data.apiData.genre);
            setReleasedDate(response.data.apiData.releasedDate);
            setContent(response.data.apiData.musicContent);
            setImageName(response.data.apiData.imageName);
            setFileName(response.data.apiData.fileName);


        }).catch(error => {
            console.log(error);

        });


    }




    /*---훅(useEffect)+이벤트(handle)메소드-------*/

    //마운트 되었을때 
    useEffect( ()=>{

        if (authUser.roll == 0) {
            
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
    
            console.log("read");
            getMusicVo();


        } else {
            alert('접근 권한이 없습니다');
            navigate('/');
        }


    }, [] );



    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleArtistChange = (e) => setArtistNo(e.target.value); // 아티스트 선택 시 업데이트
    const handleGenreChange = (e) => setGenre(e.target.value);
    const handleReleasedDateChange = (e) => setReleasedDate(e.target.value);
    const handleContentChange = (e) => setContent(e.target.value);
    const handleImageChange = (e) => setImageUrl(e.target.files[0]);
    const handleFileChange = (e) => setFileUrl(e.target.files[0]);


    
    const handleUpdate = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('musicNo', musicNo);
        formData.append('title', title);
        formData.append('artistNo', artistNo); // 아티스트 이름 전송
        formData.append('genre', genre);
        formData.append('releasedDate', releasedDate);
        formData.append('musicContent', content);
        formData.append('imageUrl', imageUrl);
        formData.append('fileUrl', fileUrl);

        axios.put(`${process.env.REACT_APP_API_URL}/api/musicAdmins`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            //responseType: 'json' //수신타입
        })
        .then(response => {
            console.log(response);

            if (response.data && response.data.apiData) {
                alert('음원이 수정되었습니다.');
                navigate('/admin/musicadmin');
            } else {
                alert('음원 수정 중 오류가 발생했습니다.');
            }
            
        })
        .catch(error => {
            console.error(error);
            alert('음원 수정 중 오류가 발생했습니다.');
        });

    };

    const backAdmin = () => {
        navigate('/admin/musicadmin');
    }





    return (

        <>

            <div id="wrap-main">
                


                {/* <!-- header --> */}
                <Header />
                {/* <!-- //header --> */}


                {/* <!-- body --> */}
                <div id="wrap-body" className="clearfix ham">



                    {/* Admin Sidebar 컴포넌트 호출 */}
                    <Sidebar name={authUser?.name} profile={profile} />
                    {/* Admin Sidebar 컴포넌트 호출 */}




                    <div id="wrap-main">

                        <div id="musicUpdate">
                        
                            <div id="top-title">
                                <h2>음원 수정</h2>
                                <h4>관리자님 어서오세요*^^*</h4>
                            </div>
                        

                            <div className="container">
                                <form onSubmit={handleUpdate} encType="multipart/form-data">
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
                                        value={artistNo} // 선택된 아티스트 이름을 상태로 설정
                                        onChange={handleArtistChange} // 아티스트 선택 시 상태 업데이트
                                        required
                                    >
                                        <option value="">아티스트를 선택하세요</option>
                                        {artists.map(artist => (
                                            <option key={artist.artistNo} value={artist.artistNo}>
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

                                    <button type="submit">음원 수정</button>
                                    <button type="button" className="back-btn" onClick={backAdmin }>뒤로 가기</button>

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