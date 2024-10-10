import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/all.css';
import '../../assets/css/index.css';
import chartimage from '../../assets/images/cuteddagenie.png';
import banner from '../../assets/images/music-festival.png';
import Footer from '../include/Footer';
import Header from '../include/Header';

const Index = () => {
    const navigate = useNavigate();
    const [topLikedSongs, setTopLikedSongs] = useState([]);
    const [bannerImages, setBannerImages] = useState([]); // 배너 이미지 상태 추가
    const [authUser, setAuthUser] = useState(null); // 로그인된 유저 상태 추가

    // 로그인 유저 정보 가져오기 (localStorage)
    useEffect(() => {
        const storedUser = localStorage.getItem('authUser');
        if (storedUser) {
            setAuthUser(JSON.parse(storedUser));
        }
    }, []);

    // API에서 인기순위(좋아요 순위) 곡을 가져오는 함수
    const fetchTopLikedSongs = async () => {
        try {
            const response = await axios.get('http://localhost:8888/api/top-liked-songs');
            setTopLikedSongs(response.data);
        } catch (error) {
            console.error("Error fetching top liked songs:", error);
        }
    };


    //배너에 10개씩 띄우는 함수
    const fetchBannerImages = async () => {
        try {
            const response = await axios.get('http://localhost:8888/api/main');
            if (response.data.result === 'success') {
                setBannerImages(response.data.apiData.slice(0, 10)); // 최대 10개의 배너 이미지
                
            } else {
                console.error('Error fetching banner images');
            }
        } catch (error) {
            console.error("Error fetching banner images:", error);
        }
    };
    
    useEffect(() => {
        fetchTopLikedSongs(); // 인기 순위 곡 API 호출
        fetchBannerImages(); // 배너 이미지 API 호출
    }, []);

    const getImageUrl = (song) => {
        let imagePath = song.imageName || song.imagePath;

        if (!imagePath || typeof imagePath !== 'string') {
            console.error('imagePath is null, undefined, or not a string:', imagePath);
            return chartimage; // 기본 이미지 경로로 변경
        }

        if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
            console.log('Using S3 image URL:', imagePath);
            return imagePath;
        } else {
            const fileName = imagePath.split('\\').pop();
            imagePath = `${process.env.REACT_APP_API_URL}/upload/${fileName}`;
            console.log('Using local image file:', imagePath);
            return imagePath;
        }
    };

    // 팝업 창 열기 함수 (곡 정보 전달)
    const openPlayerPopup = (title, artist, fileUrl) => {
        const popupWidth = 735;
        const popupHeight = 460;
        const popupOptions = `width=${popupWidth},height=${popupHeight},resizable=yes,scrollbars=no`;

        // 팝업 창에 곡 정보 전달
        const popupUrl = `/music/musicplayer?title=${encodeURIComponent(title)}&artist=${encodeURIComponent(artist)}&fileUrl=${encodeURIComponent(fileUrl)}`;
        window.open(popupUrl, 'Music Player', popupOptions);
    };

    // 노래 재생 + 재생목록에 추가
    const handlePlayAndAddToPlaylist = async (musicNo, title, artist, fileUrl) => {
        if (!authUser) {
            alert("로그인 해주세요.");
            return;
        }

        try {
            // 재생목록에 곡 추가
            const response = await axios.post('http://localhost:8888/api/playlist/add', {
                userNo: authUser.no, // 로그인된 유저의 사용자 번호
                musicNo: musicNo,
                title: title,
                artist: artist,
                fileUrl: fileUrl
            });

            if (response.status === 200) {
                console.log('곡이 재생목록에 추가되었습니다:', response.data);

                // 곡 추가 후 팝업을 열어 곡을 재생
                openPlayerPopup(title, artist, fileUrl);
            } else {
                console.error('재생목록에 곡 추가 실패');
            }
        } catch (error) {
            console.error('Error adding song to playlist:', error);
        }
    };

    // 마이뮤직에 곡 추가 함수
    const handleAddToMyMusic = async (musicNo, title, artist) => {
        if (!authUser) {
            alert("로그인 해주세요.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8888/api/mymusic/add', {
                userNo: authUser.no, // 로그인된 유저의 사용자 번호
                musicNo: musicNo,
                title: title,
                artist: artist
            });

            if (response.status === 200) {
                console.log('곡이 마이뮤직에 추가되었습니다:', response.data);
            } else {
                console.error('마이뮤직에 곡 추가 실패');
            }
        } catch (error) {
            console.error('Error adding song to MyMusic:', error);
        }
    };

     // 이미지 클릭 시 음악 상세 페이지로 이동
     const handleImageClick = (musicNo) => {
        navigate(`/main/detail/${musicNo}`); // 해당 음악 번호에 맞는 상세 페이지로 이동
    };

    return (
        <div id="wrap-main">
            {/* Header 컴포넌트 삽입 */}
            <Header />

            <div className="container">
                {/* 최신 음악 배너 */}
                <div className="banner-section">
                <h2>최신음악</h2>
                    <div className="banner-container">
                        {bannerImages.map((music, index) => (
                            <div className="banner-item" key={music.musicNo} onClick={() => handleImageClick(music.musicNo)}>
                                <img src={music.imageName} alt={`배너 이미지 ${index + 1}`} />
                                <div>
                                    <span>{music.title}</span>  {/* 곡 제목 표시 */}
                                    <span>{music.releasedDate}</span>  {/* 릴리즈 날짜 표시 */}
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* 페이지네이션 */}
                    <div className="pagination">
                        <span>&#60;</span>
                        <span>1 / 6</span>
                        <span>&#62;</span>
                    </div>
                </div>

                {/* 광고 배너 섹션 */}
                <div className="ad-banner" >
                    <img src={banner} style={{ width: '1000px' }} alt="광고 배너 이미지" />
                </div>

                {/* 인기 순위 리스트 */}
                <div className="ranking-section">
                    <div className="ranking-header">
                        <h2>인기순위</h2>
                        <button
                            className="icon-btn player-btn"
                            onClick={() => openPlayerPopup()}
                        >
                        </button>
                    </div>
                    <table className="playlist">
                        <colgroup>
                            <col style={{ width: '40px' }} />
                            <col style={{ width: '200px' }} />
                            <col style={{ width: '80px' }} />
                        </colgroup>
                        <thead>
                            <tr>
                                <th>순위</th>
                                <th>곡 정보</th>
                                <th>재생/추가</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topLikedSongs.slice(0, 10).map((song, index) => (
                                <tr key={song.musicNo}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className="song-info">
                                            <img
                                                src={getImageUrl(song)}
                                                alt={song.title}
                                                className="song-cover"
                                                onError={(e) => { e.target.src = chartimage; }} // 이미지 로드 실패 시 대체 이미지 사용
                                            />
                                            <div className="song-details">
                                                <span className="song-title">{song.title}</span>
                                                <span className="artist">{song.artistName}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <button
                                            className="icon-btn play-btn"
                                            onClick={() => handlePlayAndAddToPlaylist(
                                                song.musicNo,
                                                song.title,
                                                song.artistName,
                                                song.fileUrl
                                            )}
                                        >
                                            ▶
                                        </button>
                                        <button
                                            className="icon-btn plus-btn"
                                            onClick={() => handleAddToMyMusic(
                                                song.musicNo,
                                                song.title,
                                                song.artistName
                                            )}
                                        >
                                            +
                                        </button>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Footer 컴포넌트 삽입 */}
            <Footer />
        </div>
    );
};

export default Index;
