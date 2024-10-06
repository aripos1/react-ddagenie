import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../include/header';  // Header 컴포넌트 import
import Footer from '../include/footer';  // Footer 컴포넌트 import
import '../../assets/css/all.css';
import '../../assets/css/header.css';
import '../../assets/css/footer.css';
import '../../assets/css/index.css';

const Index = () => {
    const navigate = useNavigate();

    // 팝업 창 열기 함수
    const openPlayerPopup = (title, artist, cover, songUrl) => {
        const popupWidth = 735;
        const popupHeight = 460;
        const popupOptions = `width=${popupWidth},height=${popupHeight},resizable=yes,scrollbars=no`;
        const popupUrl = ``;
        window.open(popupUrl, 'Music Player', popupOptions);
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
                                <img src="../../assets/images/logo.webp" alt="이미지 1" />
                            </a>
                        </div>
                        <div className="banner-item">
                            <img src="../../assets/images/logo.webp" alt="이미지 2" />
                        </div>
                        <div className="banner-item">
                            <img src="../../assets/images/logo.webp" alt="이미지 3" />
                        </div>
                        <div className="banner-item">
                            <img src="../../assets/images/logo.webp" alt="이미지 4" />
                        </div>
                        <div className="banner-item">
                            <img src="../../assets/images/logo.webp" alt="이미지 5" />
                        </div>
                        <div className="banner-item">
                            <img src="../../assets/images/logo.webp" alt="이미지 6" />
                        </div>
                        <div className="banner-item">
                            <img src="../../assets/images/logo.webp" alt="이미지 7" />
                        </div>
                        <div className="banner-item">
                            <img src="../../assets/images/logo.webp" alt="이미지 8" />
                        </div>
                        <div className="banner-item">
                            <img src="../../assets/images/logo.webp" alt="이미지 9" />
                        </div>
                        <div className="banner-item">
                            <img src="../../assets/images/logo.webp" alt="이미지 10" />
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
                    <img src="../../assets/images/캡처.PNG" alt="광고 배너 이미지" />
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
                            <tr>
                                <td>1</td>
                                <td>
                                    <div className="song-info">
                                        <img src="../../assets/images/cuteddagenie.png" alt="곡 커버" className="song-cover" />
                                        <div className="song-details">
                                            <span className="song-title">HAPPY</span>
                                            <span className="artist">DAY6 (데이식스)</span>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="icon-container">
                                        <button className="icon-btn play-btn" onClick={() => openPlayerPopup('HAPPY', 'DAY6 (데이식스)', '../../assets/images/cuteddagenie.png', 'songUrl.mp3')}>▶</button>
                                        <button className="icon-btn plus-btn">+</button>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>
                                    <div className="song-info">
                                        <img src="../../assets/images/cuteddagenie.png" alt="곡 커버" className="song-cover" />
                                        <div className="song-details">
                                            <span className="song-title">Welcome to the Show</span>
                                            <span className="artist">DAY6 (데이식스)</span>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="icon-container">
                                        <button className="icon-btn play-btn" onClick={() => openPlayerPopup('Welcome to the Show', 'DAY6 (데이식스)', '../../assets/images/cuteddagenie.png', 'songUrl.mp3')}>▶</button>
                                        <button className="icon-btn plus-btn">+</button>
                                    </div>
                                </td>
                            </tr>
                            {/* 추가 곡들 */}
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
