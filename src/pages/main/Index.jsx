// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';

// //배너,헤더,푸터, css
// import chartimage from '../../assets/images/cuteddagenie.png';
// import banner from '../../assets/images/music-festival.png';
// import Footer from '../include/Footer';
// import Header from '../include/Header';

// // import Modal from '../music/Modal'; // 모달 컴포넌트 import
// // import MusicPlayer from '../music/MusicPlayer'; // MusicPlayer 컴포넌트 import

// const Index = () => {
//     const navigate = useNavigate();
//     const [topLikedSongs, setTopLikedSongs] = useState([]);
//     const [bannerImages, setBannerImages] = useState([]); // 배너 이미지 상태 추가
//     const [authUser, setAuthUser] = useState(null); // 로그인된 유저 상태 추가
//     // const [isModalOpen, setIsModalOpen] = useState(false);
//     // const [selectedSong, setSelectedSong] = useState(null);
//     // const [myMusic, setMyMusic] = useState([]);
//     // const [playlist, setPlaylist] = useState([]); // MusicPlayer에 전달할 재생목록
//     // 로그인 유저 정보 가져오기 (localStorage)
//     useEffect(() => {
//         const storedUser = localStorage.getItem('authUser');
//         if (storedUser) {
//             setAuthUser(JSON.parse(storedUser));
//         }
//     }, []);

//     // API에서 인기순위(좋아요 순위) 곡을 가져오는 함수
//     const fetchTopLikedSongs = async () => {
//         try {
//             const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/top-liked-songs`);
//             setTopLikedSongs(response.data);
//         } catch (error) {
//             console.error("Error fetching top liked songs:", error);
//         }
//     };


//     //배너에 10개씩 띄우는 함수
//     const fetchBannerImages = async () => {
//         try {
//             const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/main`);
//             if (response.data.result === 'success') {
//                 setBannerImages(response.data.apiData.slice(0, 10)); // 최대 10개의 배너 이미지

//             } else {
//                 console.error('Error fetching banner images');
//             }
//         } catch (error) {
//             console.error("Error fetching banner images:", error);
//         }
//     };

//     useEffect(() => {
//         fetchTopLikedSongs(); // 인기 순위 곡 API 호출
//         fetchBannerImages(); // 배너 이미지 API 호출
//     }, []);

//     const getImageUrl = (song) => {
//         let imagePath = song.imageName || song.imagePath;

//         if (!imagePath || typeof imagePath !== 'string') {
//             console.error('imagePath is null, undefined, or not a string:', imagePath);
//             return chartimage; // 기본 이미지 경로로 변경
//         }

//         if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
//             console.log('Using S3 image URL:', imagePath);
//             return imagePath;
//         } else {
//             const fileName = imagePath.split('\\').pop();
//             imagePath = `${process.env.REACT_APP_API_URL}/upload/${fileName}`;
//             console.log('Using local image file:', imagePath);
//             return imagePath;
//         }
//     };



//     // // 곡 재생 및 플레이리스트에 추가하는 함수
//     // const handlePlayAndAddToPlaylist = async (musicNo, title, artistName, fileUrl) => {
//     //     if (!authUser) {
//     //         alert("로그인 해주세요.");
//     //         return;
//     //     }

//     //     const newSong = {
//     //         musicNo,
//     //         title,
//     //         artist: artistName,
//     //         fileUrl,
//     //     };

//     //     setPlaylist((prevPlaylist) => [...prevPlaylist, newSong]);
//     //     setSelectedSong(newSong);
//     //     setIsModalOpen(true);

//     //     try {
//     //         const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/playlist/add`, {
//     //             userNo: authUser.no,
//     //             musicNo,
//     //             title,
//     //             artist: artistName,
//     //             fileUrl,
//     //         });

//     //         if (response.status === 200) {
//     //             console.log('곡이 재생목록에 추가되었습니다:', response.data);
//     //         } else {
//     //             console.error('Failed to add song to playlist on the server.');
//     //         }
//     //     } catch (error) {
//     //         console.error('Error adding song to playlist on the server:', error);
//     //     }
//     // };

//     // // 모달 닫기
//     // const closeModal = () => {
//     //     setIsModalOpen(false);
//     //     setSelectedSong(null);
//     // };
//     // 재생 + 재생목록에 추가
//     const handlePlayAndAddToPlaylist = async (musicNo) => {
//         if (!authUser) {
//             alert('로그인 해주세요.');
//             return;
//         }

//         try {
//             const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/playlist/add`, {
//                 userNo: authUser.no,
//                 musicNo,
//             });

//             if (response.status === 200) {
//                 openPlayerPopup(authUser.no);
//             } else {
//                 console.error('재생목록에 곡 추가 실패');
//             }
//         } catch (error) {
//             console.error('Error adding song to playlist:', error);
//         }
//     };

//     // 팝업 열기 (유저 넘버만 전달)
//     const openPlayerPopup = (userNo) => {
//         const popupOptions = `width=735,height=460,resizable=yes,scrollbars=no`;
//         const popupUrl = `/music/musicplayer?userNo=${encodeURIComponent(userNo)}`;
//         window.open(popupUrl, 'Music Player', popupOptions);
//     };
//     // 마이뮤직에 곡 추가 함수
//     const handleAddToMyMusic = async (musicNo) => {
//         if (!authUser) {
//             alert("로그인 해주세요.");
//             return;
//         }

//         try {
//             const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/mymusic/add`, {
//                 userNo: authUser.no,
//                 musicNos: [musicNo], // 배열 형태로 전송
//             });

//             if (response.status === 200) {
//                 console.log('곡이 마이뮤직에 추가되었습니다:', response.data);
//             } else {
//                 console.error('마이뮤직에 곡 추가 실패');
//             }
//         } catch (error) {
//             console.error('Error adding song to MyMusic:', error);
//         }
//     };



//     // 이미지 클릭 시 음악 상세 페이지로 이동
//     const handleImageClick = (musicNo) => {
//         navigate(`/main/detail/${musicNo}`); // 해당 음악 번호에 맞는 상세 페이지로 이동
//     };

//     return (
//         <div id="wrap-main">
//             {/* Header 컴포넌트 삽입 */}
//             <Header />

//             <div className="container">
//                 {/* 최신 음악 배너 */}
//                 <div className="banner-section">
//                     <h2>최신음악</h2>
//                     <div className="banner-container">
//                         {bannerImages.map((music, index) => (
//                             <div className="banner-item" key={music.musicNo} onClick={() => handleImageClick(music.musicNo)}>
//                                 <img src={music.imageName} alt={`배너 이미지 ${index + 1}`} />
//                                 <div>
//                                     <span>{music.title}</span>  {/* 곡 제목 표시 */}
//                                     <span>{music.releasedDate}</span>  {/* 릴리즈 날짜 표시 */}
//                                 </div>
//                             </div>
//                         ))}
//                     </div>

//                 </div>

//                 {/* 광고 배너 섹션 */}
//                 <div className="ad-banner" >
//                     <Link to="/">
//                         <img src={banner} style={{ width: '1000px' }} alt="광고 배너 이미지" />
//                     </Link>
//                 </div>

//                 {/* 인기 순위 리스트 */}
//                 <div className="ranking-section">
//                     <div className="ranking-header">
//                         <h2>인기순위</h2>
//                     </div>
//                     <table className="playlist">
//                         <colgroup>
//                             <col style={{ width: '40px' }} />
//                             <col style={{ width: '200px' }} />
//                             <col style={{ width: '80px' }} />
//                         </colgroup>
//                         <thead>
//                             <tr>
//                                 <th>순위</th>
//                                 <th>곡 정보</th>
//                                 <th>재생/추가</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {topLikedSongs.slice(0, 10).map((song, index) => (
//                                 <tr key={song.musicNo}>
//                                     <td>{index + 1}</td>
//                                     <td>
//                                         <div className="song-info">
//                                             <Link to={`/main/detail/${song.musicNo}`}>
//                                                 <img src={getImageUrl(song)} alt={song.title} className="song-cover" onError={(e) => { e.target.src = chartimage; }} />
//                                             </Link>

//                                             <div className="song-details">
//                                                 <span className="song-title">{song.title}</span>
//                                                 <span className="artist">{song.artistName}</span>
//                                             </div>
//                                         </div>
//                                     </td>
//                                     <td>
//                                         <button
//                                             className="icon-btn play-btn"
//                                             onClick={() => handlePlayAndAddToPlaylist(
//                                                 song.musicNo,
//                                                 song.title,
//                                                 song.artistName,
//                                                 song.fileUrl
//                                             )}
//                                         >
//                                             ▶
//                                         </button>
//                                         <button
//                                             className="icon-btn plus-btn"
//                                             onClick={() => handleAddToMyMusic(
//                                                 song.musicNo,
//                                                 song.title,
//                                                 song.artistName
//                                             )}
//                                         >
//                                             +
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>

//             {/* <Modal isOpen={isModalOpen} onClose={closeModal}>
//                 <MusicPlayer
//                     isOpen={isModalOpen}
//                     onClose={closeModal}
//                     playlist={playlist}
//                     initialSong={selectedSong}
//                     myMusic={myMusic}
//                     setMyMusic={setMyMusic}
//                 />
//             </Modal> */}
//             {/* Footer 컴포넌트 삽입 */}
//             <Footer />
//         </div >
//     );
// };

// export default Index;
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

// 배너, 헤더, 푸터, css
import chartimage from '../../assets/images/cuteddagenie.png';
import banner from '../../assets/images/music-festival.png';
import Footer from '../include/Footer';
import Header from '../include/Header';

const Index = () => {
    const navigate = useNavigate();
    const [topLikedSongs, setTopLikedSongs] = useState([]);
    const [bannerImages, setBannerImages] = useState([]);
    const [authUser, setAuthUser] = useState(null);

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
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/top-liked-songs`);
            setTopLikedSongs(response.data);
        } catch (error) {
            console.error("Error fetching top liked songs:", error);
        }
    };

    // 배너에 10개씩 띄우는 함수
    const fetchBannerImages = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/main`);
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
            return imagePath;
        } else {
            const fileName = imagePath.split('\\').pop();
            return `${process.env.REACT_APP_API_URL}/upload/${fileName}`;
        }
    };

    // 재생 + 재생목록에 추가 (이용권 상태 체크 추가)
    const handlePlayAndAddToPlaylist = async (musicNo) => {
        if (!authUser) {
            alert('로그인 해주세요.');
            return;
        }

        // 이용권 상태 확인
        if (authUser.ticket_status !== "이용중" && authUser.ticket_status !== "해지중") {
            alert('이용권이 필요합니다.');
            return;
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/playlist/add`, {
                userNo: authUser.no,
                musicNo,
            });

            if (response.status === 200) {
                openPlayerPopup(authUser.no);
            } else {
                console.error('재생목록에 곡 추가 실패');
            }
        } catch (error) {
            console.error('Error adding song to playlist:', error);
        }
    };

    const openPlayerPopup = (userNo) => {
        const width = window.innerWidth > 735 ? 735 : window.innerWidth - 20;
        const height = window.innerHeight > 460 ? 460 : window.innerHeight - 20;
        const popupOptions = `width=${width},height=${height},resizable=yes,scrollbars=no`;
        const popupUrl = `/music/musicplayer?userNo=${encodeURIComponent(userNo)}`;
        window.open(popupUrl, 'Music Player', popupOptions);
    };

    // 마이뮤직에 추가 (이용권 상태 체크 추가)
    const handleAddToMyMusic = async (musicNo, title, artistName) => {
        if (!authUser) {
            alert("로그인 해주세요.");
            return;
        }

        // 이용권 상태 확인
        if (authUser.ticket_status !== "이용중" && authUser.ticket_status !== "해지중") {
            alert('이용권이 필요합니다.');
            return;
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/mymusic/add`, {
                userNo: authUser.no,
                musicNos: [musicNo],
            });

            if (response.status === 200) {
                // 곡 정보 포함 알림창 표시
                alert(`🎉 "${title}" - ${artistName} 곡이 내 MY MUSIC에 추가됐어! 🚀`);
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
        navigate(`/main/detail/${musicNo}`);
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
                                    <span>{music.title}</span>
                                    <span>{music.releasedDate}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 광고 배너 섹션 */}
                <div className="ad-banner">
                    <Link to="/">
                        <img src={banner} style={{ width: '1000px' }} alt="광고 배너 이미지" />
                    </Link>
                </div>

                {/* 인기 순위 리스트 */}
                <div className="ranking-section">
                    <div className="ranking-header">
                        <h2>인기순위</h2>
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
                                            <Link to={`/main/detail/${song.musicNo}`}>
                                                <img src={getImageUrl(song)} alt={song.title} className="song-cover" onError={(e) => { e.target.src = chartimage; }} />
                                            </Link>
                                            <div className="song-details">
                                                <span className="song-title">{song.title}</span>
                                                <span className="artist">{song.artistName}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <button
                                            className="icon-btn play-btn"
                                            onClick={() => handlePlayAndAddToPlaylist(song.musicNo)}
                                      
                                        >
                                            ▶
                                        </button>
                                        <button
                                            className="icon-btn plus-btn"
                                            onClick={() => handleAddToMyMusic(song.musicNo, song.title, song.artistName)}  // 곡 정보 전달
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
