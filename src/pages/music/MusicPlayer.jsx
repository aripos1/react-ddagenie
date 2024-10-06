import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../../assets/css/all.css';
import '../../assets/css/player.css';
import logo from '../../assets/images/cuteddagenie.png';
import albumCover from '../../assets/images/logo.webp'; // 앨범 커버 이미지 경로를 import
import musicFile from '../../assets/musicfile/Color_Out_-_Host.mp3'; // 음악 파일 경로를 import

const MusicPlayer = () => {
    const [activeTab, setActiveTab] = useState('playlist');
    const [playlist, setPlaylist] = useState([]); // 재생목록 상태
    const [myMusic, setMyMusic] = useState([]);  // 마이뮤직 상태
    const [liked, setLiked] = useState(false);
    const audioRef = useRef(null); // audio 요소 참조
    const [error, setError] = useState(null); // 에러 상태

    // 탭 변경 시 필요한 데이터를 가져옴
    useEffect(() => {
        if (activeTab === 'playlist') {
            loadPlaylist(1);  // 1번 유저의 재생목록
        } else if (activeTab === 'myMusic') {
            loadMyMusic(1);  // 1번 유저의 마이뮤직
        }
    }, [activeTab]);  // activeTab이 변경될 때마다 실행

    // 마이뮤직 API 호출
    const loadMyMusic = async (userNo) => {
        try {
            const response = await axios.get(`http://localhost:8888/api/mymusiclist/${userNo}`);
            if (response.status === 200) {
                console.log(response.data);  // 데이터가 제대로 배열로 출력되는지 확인
                setMyMusic(response.data);   // 여러 곡이 담긴 배열을 상태로 설정
            } else {
                setError('Failed to fetch MyMusic list.');
            }
        } catch (error) {
            console.error('Error fetching MyMusic list:', error);
            setError('Error fetching MyMusic list.');
        }
    };
    
    // 재생목록 API 호출
    const loadPlaylist = (userNo) => {
        axios.get(`http://localhost:8888/api/playlist/${userNo}`)
            .then(response => {
                const updatedPlaylist = response.data.map(song => ({
                    ...song,
                    selected: false // 초기에는 선택되지 않도록 설정
                }));
                setPlaylist(updatedPlaylist);  // 재생목록 데이터를 상태로 설정
            })
            .catch(error => {
                console.error('Error fetching playlist:', error);
                setError('Error fetching playlist.');
            });
    };

    // 탭 변경 처리
    const handleTabClick = (tab) => {
        setActiveTab(tab);
        setError(null);  // 에러 초기화
    };

    // 체크박스 상태 변경 처리
    const handleCheckboxChange = (songId, listType) => {
        if (listType === 'playlist') {
            setPlaylist(prevPlaylist =>
                prevPlaylist.map(song =>
                    song.id === songId ? { ...song, selected: !song.selected } : song
                )
            );
        } else if (listType === 'myMusic') {
            setMyMusic(prevMyMusic =>
                prevMyMusic.map(song =>
                    song.id === songId ? { ...song, selected: !song.selected } : song
                )
            );
        }
    };

    // 마이뮤직에 추가
    const addToMyMusic = () => {
        const selectedSongs = playlist.filter(song => song.selected); // 선택된 곡 필터링
        if (selectedSongs.length > 0) {
            selectedSongs.forEach(song => {
                axios.post('http://localhost:8888/api/mymusic/add', {
                    musicNo: song.id,    // 곡 번호
                    userNo: 1            // 유저 번호
                })
                    .then(response => {
                        console.log('곡이 마이뮤직에 추가되었습니다:', response.data);
                        // 마이뮤직 상태 업데이트
                        setMyMusic([...myMusic, { ...song, selected: false }]);
                    })
                    .catch(error => {
                        console.error('Error adding song to MyMusic:', error);
                    });
            });
        }
    };

    // 재생목록에서 선택된 곡 삭제
    const deleteFromPlaylist = () => {
        setPlaylist(playlist.filter(song => !song.selected));
    };

    // 마이뮤직에서 선택된 곡 삭제
    const deleteFromMyMusic = () => {
        setMyMusic(myMusic.filter(song => !song.selected));
    };

    // 좋아요 토글 처리
    const toggleLike = () => {
        setLiked(!liked);
    };

    // 중복된 곡 제거
    const removeDuplicateSongs = () => {
        const uniqueSongs = playlist.filter(
            (song, index, self) => index === self.findIndex((t) => t.title === song.title)
        );
        setPlaylist(uniqueSongs);
    };

    return (
        <div className="popup-player">
            <div className="player-left">
                {/* 로고 및 음악 정보 */}
                <div className="logo">
                    <img src={logo} alt="logo" style={{ height: '50px' }} />
                </div>
                <div className="album-info">
                    <div className="info-container">
                        <div className="track-details">
                            <h2>곡 제목</h2>
                            <p>가수 이름</p>
                        </div>
                        <div className={`like-icon ${liked ? 'liked' : ''}`} onClick={toggleLike}>
                            <span>&hearts;</span>
                        </div>
                    </div>
                    <img src={albumCover} alt="Album Cover" className="album-cover" />
                </div>

                {/* 음악 컨트롤러 */}
                <audio ref={audioRef} id="audio-player" controls>
                    <source src={musicFile} type="audio/mp3" />
                </audio>
            </div>

            <div className="playlist-right">
                <div className="user-info">
                    <span className="user-id">1번 유저님 환영합니다!</span>
                    <button>로그아웃</button>
                </div>

                {/* 탭 버튼들 */}
                <div className="tab-header">
                    <button
                        className={`tab-button ${activeTab === 'playlist' ? 'active' : ''}`}
                        onClick={() => handleTabClick('playlist')}
                    >
                        재생목록 ({playlist.length})
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'myMusic' ? 'active' : ''}`}
                        onClick={() => handleTabClick('myMusic')}
                    >
                        마이뮤직
                    </button>
                </div>

                {/* 재생목록 탭 콘텐츠 */}
                {activeTab === 'playlist' && (
                    <div className="tab-content active">
                        <div className="playlist-controls">
                            <button onClick={removeDuplicateSongs}>중복곡 삭제</button>
                        </div>
                        <ul className="playlist">
                            {playlist.map(song => (
                                <li key={song.id}>
                                    <input
                                        type="checkbox"
                                        checked={song.selected || false}
                                        onChange={() => handleCheckboxChange(song.id, 'playlist')}
                                    />
                                    <div>
                                        <p>{song.title}</p>
                                        <p>{song.artist}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        {/* 재생목록 푸터 */}
                        <div className="playlist-footer">
                            <button onClick={addToMyMusic}>담기</button>
                            <button onClick={deleteFromPlaylist}>삭제</button>
                            <div className="footer-pagination">
                                <p>{playlist.length}곡</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* 마이뮤직 탭 콘텐츠 */}
                {activeTab === 'myMusic' && (
                    <div className="tab-content active">
                        <ul className="playlist">
                            {myMusic.map(song => (
                                <li key={song.id}>
                                    <input
                                        type="checkbox"
                                        checked={song.selected || false}
                                        onChange={() => handleCheckboxChange(song.id, 'myMusic')}
                                    />
                                    <div>
                                        <p>{song.title}</p>
                                        <p>{song.artist}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        {/* 마이뮤직 푸터 */}
                        <div className="playlist-footer">
                            <button onClick={deleteFromMyMusic}>삭제</button>
                            <div className="footer-pagination">
                                <p>{myMusic.length}곡</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MusicPlayer;
