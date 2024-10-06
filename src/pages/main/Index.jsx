import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../include/header';  // Header 컴포넌트 import
import Footer from '../include/footer';  // Footer 컴포넌트 import
import '../../assets/css/all.css';
import '../../assets/css/header.css';
import '../../assets/css/footer.css';
import '../../assets/css/index.css';
import coverimage from '../../assets/images/logo.webp';
import banner from '../../assets/images/캡처.PNG';
import chartimage from '../../assets/images/cuteddagenie.png';
import axios from 'axios'; 

const Index = () => {
    const navigate = useNavigate();
    const [topLikedSongs, setTopLikedSongs] = useState([]);

    // API에서 인기순위(좋아요 순위) 곡을 가져오는 함수
    const fetchTopLikedSongs = async () => {
        try {
            const response = await axios.get('http://localhost:8888/api/top-liked-songs');
            setTopLikedSongs(response.data);
        } catch (error) {
            console.error("Error fetching top liked songs:", error);
        }
    };

    useEffect(() => {
        fetchTopLikedSongs(); // 컴포넌트가 로드될 때 API 호출
    }, []);

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
        try {
            // 재생목록에 곡 추가
            const response = await axios.post('http://localhost:8888/api/playlist/add', {
                userNo: 1, // 사용자 번호
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
        try {
            const response = await axios.post('http://localhost:8888/api/mymusic/add', {
                userNo: 1, // 사용자 번호
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
    
    return (
        <div id="wrap-main">
            {/* Header 컴포넌트 삽입 */}
            <Header />

            <div className="container">
                {/* 최신 음악 배너 */}
                <div className="banner-section">
                    <h2>최신음악</h2>
                    <div className="banner-container">
                        <div className="banner-item">
                            <a href="hdrDetail.html">
                                <img src={coverimage} alt="이미지 1" />
                            </a>
                        </div>
                        <div className="banner-item">
                            <img src={coverimage} alt="이미지 2" />
                        </div>
                        <div className="banner-item">
                            <img src={coverimage} alt="이미지 3" />
                        </div>
                        <div className="banner-item">
                            <img src={coverimage} alt="이미지 4" />
                        </div>
                        <div className="banner-item">
                            <img src={coverimage} alt="이미지 5" />
                        </div>
                        <div className="banner-item">
                            <img src={coverimage} alt="이미지 6" />
                        </div>
                        <div className="banner-item">
                            <img src={coverimage} alt="이미지 7" />
                        </div>
                        <div className="banner-item">
                            <img src={coverimage} alt="이미지 8" />
                        </div>
                        <div className="banner-item">
                            <img src={coverimage} alt="이미지 9" />
                        </div>
                        <div className="banner-item">
                            <img src={coverimage} alt="이미지 10" />
                        </div>
                    </div>
                    {/* 페이지네이션 */}
                    <div className="pagination">
                        <span>&#60;</span>
                        <span>1 / 5</span>
                        <span>&#62;</span>
                    </div>
                </div>

                {/* 광고 배너 섹션 */}
                <div className="ad-banner">
                    <img src={banner} alt="광고 배너 이미지" />
                </div>

                {/* 인기 순위 리스트 */}
                <div className="ranking-section">
                    <h2>인기순위</h2>
                    <table className="playlist">
                        <thead>
                            <tr>
                                <th>순위</th>
                                <th>곡 정보</th>
                                <th>재생/추가</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topLikedSongs.map((song, index) => (
                                <tr key={song.musicNo}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className="song-info">
                                            <img src={chartimage} alt="곡 커버" className="song-cover" />
                                            <div className="song-details">
                                                <span className="song-title">{song.title}</span>
                                                <span className="artist">{song.artistName}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {/* 재생 버튼 */}
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
                                        {/* 마이뮤직 추가 버튼 */}
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
