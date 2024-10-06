import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../../assets/css/all.css';
import '../../assets/css/player.css';
import logo from '../../assets/images/cuteddagenie.png';
import albumCover from '../../assets/images/logo.webp';
import musicFile from '../../assets/musicfile/Color_Out_-_Host.mp3';

const MusicPlayer = () => {
    const [activeTab, setActiveTab] = useState('playlist');
    const [playlist, setPlaylist] = useState([]);
    const [myMusic, setMyMusic] = useState([]);
    const [liked, setLiked] = useState(false);
    const audioRef = useRef(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (activeTab === 'playlist') {
            loadPlaylist(1);
        } else if (activeTab === 'myMusic') {
            loadMyMusic(1);
        }
    }, [activeTab]);

    // API에서 MyMusic 목록 로드
    const loadMyMusic = async (userNo) => {
        try {
            const response = await axios.get(`http://localhost:8888/api/mymusiclist/${userNo}`);
            console.log('API Response Data:', response.data);

            if (response.status === 200) {
                const data = Array.isArray(response.data) ? response.data : [response.data];

                const updatedMyMusic = data.map((song, index) => ({
                    ...song,
                    mymusicNo: song.mymusicNo || `mymusic-${index}`, // mymusicNo 필드 설정
                    selected: false
                }));

                console.log('Updated MyMusic with IDs:', updatedMyMusic);
                setMyMusic(updatedMyMusic);
            } else {
                setError('Failed to fetch MyMusic list.');
            }
        } catch (error) {
            setError('Error fetching MyMusic list.');
        }
    };

    // API에서 재생목록 로드
    const loadPlaylist = (userNo) => {
        axios.get(`http://localhost:8888/api/playlist/${userNo}`)
            .then(response => {
                console.log('Loaded Playlist:', response.data);
                const updatedPlaylist = response.data.map(song => ({
                    ...song,
                    selected: false  // 초기 선택 상태 설정
                }));
                setPlaylist(updatedPlaylist);
            })
            .catch(error => {
                setError('Error fetching playlist.');
            });
    };

    // 탭 전환 핸들러
    const handleTabClick = (tab) => {
        setActiveTab(tab);
        setError(null);
    };

    // 체크박스 변경 핸들러 (playlist 또는 myMusic)
    const handleCheckboxChange = (id, listType) => {
        console.log(`Checkbox clicked - ID: ${id}, List: ${listType}`);

        if (listType === 'playlist') {
            setPlaylist(prevPlaylist => prevPlaylist.map(song =>
                song.musicNo === id ? { ...song, selected: !song.selected } : song
            ));
        } else if (listType === 'myMusic') {
            setMyMusic(prevMyMusic => prevMyMusic.map(song =>
                song.mymusicNo === id ? { ...song, selected: !song.selected } : song
            ));
        }
    };

    // 선택된 곡 MyMusic에 추가
    const addToMyMusic = () => {
        const selectedSongs = playlist.filter(song => song.selected);

        if (selectedSongs.length > 0) {
            console.log('Selected Songs:', selectedSongs.map(song => song.musicNo));

            axios.post('http://localhost:8888/api/mymusic/add', {
                musicNos: selectedSongs.map(song => song.musicNo),
                userNo: 1
            })
                .then(response => {
                    const updatedMyMusic = [...myMusic, ...selectedSongs.map(song => ({ ...song, selected: false }))];
                    setMyMusic(updatedMyMusic);
                    setPlaylist(playlist.map(song => ({ ...song, selected: false })));  // 선택 상태 초기화
                })
                .catch(error => {
                    setError('Error adding songs to MyMusic.');
                });
        }
    };

    // 재생목록에서 선택된 곡 삭제
    const deleteSelectedSongsFromPlaylist = () => {
        const selectedSongs = playlist.filter(song => song.selected);
        const musicNos = selectedSongs.map(song => song.musicNo);  // 선택된 곡들의 musicNo 목록
    
        console.log('전송할 musicNos:', musicNos); // 전송할 musicNos 로그 출력
        console.log('전송할 userNo: 1');  // 전송할 userNo 로그 출력
    
        if (musicNos.length > 0) {
            axios.post('http://localhost:8888/api/playlist/delete', {
                musicNos: musicNos,
                userNo: 1
            })
            .then(response => {
                console.log('삭제 성공:', response.data);
                setPlaylist(playlist.filter(song => !song.selected)); // 클라이언트 측 상태 업데이트
            })
            .catch(error => {
                console.error('Error deleting songs:', error.response ? error.response.data : error.message);
            });
        } else {
            console.log('삭제할 곡이 없습니다.');
        }
    };
    

// MyMusic에서 선택된 곡 삭제
const deleteSelectedSongsFromMyMusic = () => {
    const selectedSongs = myMusic.filter(song => song.selected);
    const musicNos = selectedSongs.map(song => song.musicNo);  // 선택된 곡들의 musicNo 목록

    console.log('전송할 musicNos:', musicNos); // 전송할 musicNos 로그 출력
    console.log('전송할 userNo: 1');  // 전송할 userNo 로그 출력

    if (musicNos.length > 0) {
        axios.post('http://localhost:8888/api/mymusic/delete', {
            musicNos: musicNos,
            userNo: 1
        })
        .then(response => {
            console.log('삭제 성공:', response.data);
            setMyMusic(myMusic.filter(song => !song.selected)); // 클라이언트 측 상태 업데이트
        })
        .catch(error => {
            console.error('Error deleting songs:', error.response ? error.response.data : error.message);
        });
    } else {
        console.log('삭제할 곡이 없습니다.');
    }
};


    // 좋아요 상태 토글
    const toggleLike = () => {
        setLiked(!liked);
    };

    // 재생목록에서 중복된 곡 삭제
    const removeDuplicateSongs = () => {
        const uniqueSongs = playlist.filter(
            (song, index, self) => index === self.findIndex((t) => t.title === song.title)
        );
        setPlaylist(uniqueSongs);
    };

    return (
        <div className="popup-player">
            <div className="player-left">
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
                <audio ref={audioRef} id="audio-player" controls>
                    <source src={musicFile} type="audio/mp3" />
                </audio>
            </div>

            <div className="playlist-right">
                <div className="user-info">
                    <span className="user-id">1번 유저님 환영합니다!</span>
                    <button>로그아웃</button>
                </div>

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

                {activeTab === 'playlist' && (
                    <div className="tab-content active">
                        <div className="playlist-controls">
                            <button onClick={removeDuplicateSongs}>중복곡 삭제</button>
                        </div>
                        <ul className="playlist">
                            {playlist.map(song => (
                                <li key={song.playlistNo}>
                                    <input
                                        type="checkbox"
                                        checked={!!song.selected}
                                        onChange={() => handleCheckboxChange(song.musicNo, 'playlist')}  // musicNo 사용
                                    />
                                    <div>
                                        <p>{song.title}</p>
                                        <p>{song.artistName}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div className="playlist-footer">
                            <button onClick={addToMyMusic}>담기</button>
                            <button onClick={deleteSelectedSongsFromPlaylist}>삭제</button>
                            <div className="footer-pagination">
                                <p>{playlist.length}곡</p>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'myMusic' && (
                    <div className="tab-content active">
                        <ul className="playlist">
                            {myMusic.map(song => (
                                <li key={song.mymusicNo}>  {/* mymusicNo 사용 */}
                                    <input
                                        type="checkbox"
                                        checked={!!song.selected}
                                        onChange={() => handleCheckboxChange(song.mymusicNo, 'myMusic')}
                                    />
                                    <div>
                                        <p>{song.title}</p>
                                        <p>{song.artistName}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div className="playlist-footer">
                            <button onClick={deleteSelectedSongsFromMyMusic}>삭제</button>
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
