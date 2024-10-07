import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../../assets/css/all.css';
import '../../assets/css/player.css';
import logo from '../../assets/images/cuteddagenie.png';

const MusicPlayer = () => {
    const [activeTab, setActiveTab] = useState('playlist');
    const [playlist, setPlaylist] = useState([]);
    const [myMusic, setMyMusic] = useState([]); // 마이뮤직 리스트 상태
    const [liked, setLiked] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리
    const [authUser, setAuthUser] = useState(null); // 로그인한 유저 정보 저장
    const audioRef = useRef(null);
    const [error, setError] = useState(null);
    const [currentSong, setCurrentSong] = useState(null);
    const [currentSongIndex, setCurrentSongIndex] = useState(null);
    const navigate = useNavigate();
    const location = useLocation(); // useLocation 훅 사용
    const query = new URLSearchParams(location.search);
    const title = query.get('title');
    const artist = query.get('artist');
    const filePath = query.get('filePath');

    // 로그인 상태 확인 및 유저 정보 설정
    useEffect(() => {
        const storedUser = localStorage.getItem('authUser');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            console.log("User information from localStorage:", parsedUser); // 로그인 유저 정보 확인
            setIsLoggedIn(true);  // 로그인 상태 설정
            setAuthUser(parsedUser);  // authUser 정보 설정
        } else {
            console.log("No user found in localStorage");
            setIsLoggedIn(false); // 로그인 상태 해제
            setAuthUser(null);
        }
    }, []);

    // 재생 목록 및 마이뮤직 리스트 로드
    useEffect(() => {
        if (isLoggedIn && authUser && authUser.no) {
            console.log('authUser.no:', authUser.no);  // userNo 확인
            loadPlaylist(authUser.no); // 유저 번호로 재생목록 로드
            loadMyMusic(authUser.no);  // 유저 번호로 마이뮤직 로드
        } else {
            console.log("authUser or no is undefined");
        }
    }, [isLoggedIn, authUser]);

    useEffect(() => {
        if (filePath) {
            const songPath = `${process.env.REACT_APP_API_URL}/assets/musicfile/${encodeURIComponent(filePath)}`;
            setCurrentSong(songPath); // 현재 재생 중인 곡 설정
        }
    }, [filePath]);

    // API에서 MyMusic 목록 로드
    const loadMyMusic = (userNo) => {
        if (!userNo) {
            console.error('User number is undefined in loadMyMusic');
            return; // userNo가 없는 경우 API 요청을 하지 않음
        }
        console.log('Loading MyMusic for userNo:', userNo);

        axios.get(`http://localhost:8888/api/mymusiclist/${userNo}`)
            .then(response => {
                const data = Array.isArray(response.data) ? response.data : [response.data];
                const updatedMyMusic = data.map((song, index) => ({
                    ...song,
                    mymusicNo: song.mymusicNo || `mymusic-${index}`,
                    selected: false
                }));
                setMyMusic(updatedMyMusic);
            })
            .catch(error => {
                setError('Error fetching MyMusic list.');
            });
    };

    // API에서 재생목록 로드
    const loadPlaylist = (userNo) => {
        if (!userNo) {
            console.error('User number is undefined in loadPlaylist');
            return; // userNo가 없는 경우 API 요청을 하지 않음
        }
        console.log('Loading playlist for userNo:', userNo);

        axios.get(`http://localhost:8888/api/playlist/${userNo}`)
            .then(response => {
                const updatedPlaylist = response.data.map((song, index) => ({
                    ...song,
                    selected: false,  // 초기 선택 상태 설정
                    index: index      // 인덱스를 명시적으로 추가
                }));
                setPlaylist(updatedPlaylist);
            })
            .catch(error => {
                setError('Error fetching playlist.');
            });
    };
    console.log('Playlist:', playlist);

    // 곡 선택 시 재생
    const playSong = (filePath, index) => {
        console.log('Clicked song index:', index); // 인덱스 확인용 로그 추가

        if (!filePath) { // filePath가 null 또는 undefined인 경우 처리
            console.error('filePath is null or undefined');
            return;
        }

        const fileName = filePath.split('\\').pop(); // 윈도우 경로에서 파일명만 추출
        console.log('File path:', filePath);
        const songPath = `${process.env.REACT_APP_API_URL}/upload/${fileName}`;  // 파일 경로 설정

        if (audioRef.current) {
            audioRef.current.pause();  // 이전 재생 중인 파일 중지
            audioRef.current.currentTime = 0;  // 재생 시작 위치를 처음으로 설정
            audioRef.current.src = songPath; // 오디오 태그의 소스 설정
            audioRef.current.play(); // 자동 재생
        }

        setCurrentSong(songPath); // 현재 재생 중인 곡 설정
        setCurrentSongIndex(index); // 현재 재생 중인 곡 인덱스 설정
    };


    // 현재 곡이 종료되면 자동으로 다음 곡 재생
    const handleSongEnd = () => {
        if (currentSongIndex !== null && currentSongIndex !== undefined) {
            let nextIndex = currentSongIndex + 1;
            if (nextIndex >= playlist.length) {
                nextIndex = 0; // 마지막 곡 이후면 첫 번째 곡으로 돌아감
            }
            const nextSong = playlist[nextIndex];
            playSong(nextSong.filePath, nextIndex); // 다음 곡 재생
        }
    };

    // 마이뮤직 리스트에서 클릭 시 플레이리스트에 저장
    const addToPlaylistFromMyMusic = (song) => {
        axios.post('http://localhost:8888/api/playlist/add', {
            userNo: authUser.no, // 현재 사용자 번호
            musicNo: song.musicNo // 추가할 곡의 musicNo
        })
            .then(response => {
                // 서버에 곡 추가 성공 시, 재생목록에 곡 추가
                setPlaylist(prevPlaylist => [...prevPlaylist, { ...song, selected: false }]);
            })
            .catch(error => {
                setError('Error adding song to playlist.');
            });
    };

    // 탭 전환 핸들러
    const handleTabClick = (tab) => {
        setActiveTab(tab);
        setError(null);
    };

    // 체크박스 변경 핸들러 (playlist 또는 myMusic)
    const handleCheckboxChange = (id, listType) => {
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
            axios.post('http://localhost:8888/api/mymusic/add', {
                musicNos: selectedSongs.map(song => song.musicNo),
                userNo: authUser.no
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
        const musicNos = selectedSongs.map(song => song.musicNo);
        if (musicNos.length > 0) {
            axios.post('http://localhost:8888/api/playlist/delete', {
                musicNos: musicNos,
                userNo: authUser.no
            })
                .then(response => {
                    setPlaylist(playlist.filter(song => !song.selected)); // 클라이언트 측 상태 업데이트
                })
                .catch(error => {
                    setError('Error deleting songs from playlist.');
                });
        }
    };

    // MyMusic에서 선택된 곡 삭제
    const deleteSelectedSongsFromMyMusic = () => {
        const selectedSongs = myMusic.filter(song => song.selected);
        const musicNos = selectedSongs.map(song => song.musicNo);
        if (musicNos.length > 0) {
            axios.post('http://localhost:8888/api/mymusic/delete', {
                musicNos: musicNos,
                userNo: authUser.no
            })
                .then(response => {
                    setMyMusic(myMusic.filter(song => !song.selected)); // 클라이언트 측 상태 업데이트
                })
                .catch(error => {
                    setError('Error deleting songs from MyMusic.');
                });
        }
    };

    // 좋아요 상태 토글
    const toggleLike = () => {
        setLiked(!liked);
    };
    // 재생목록에서 중복된 곡 삭제
    const removeDuplicateSongsFromDB = () => {
        if (!authUser || !authUser.no) {
            console.error('User not logged in or userNo is missing.');
            return;
        }

        axios.post('http://localhost:8888/api/playlist/remove-duplicates', {
            userNo: authUser.no  // 현재 로그인한 사용자 번호 사용
        })
            .then(response => {
                console.log('중복 삭제 성공:', response.data);
                loadPlaylist(authUser.no);  // 재생목록을 다시 불러와 업데이트
            })
            .catch(error => {
                console.error('중복 삭제 중 오류 발생:', error.response ? error.response.data : error.message);
            });
    };
    // 로그인 상태가 아니면 로그인 메시지 표시
    if (!isLoggedIn) {
        return (
            <div className="popup-player">
                <div className="player-left">
                    <div className="logo">
                        <img src={logo} alt="logo" style={{ height: '50px' }} />
                    </div>
                    <div className="album-info">
                        <div className="info-container">
                            <div className="track-details">
                                <h2>로그인 해주세요</h2>
                                <p>음악을 재생하려면 로그인이 필요합니다.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="playlist-right">
                    <div className="user-info">
                        <button onClick={() => navigate('/login')}>로그인</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="popup-player">
            <div className="player-left">
                <div className="logo">
                    <img src={logo} alt="logo" style={{ height: '50px' }} />
                </div>
                <div className="album-info">
                    <div className="info-container">
                        <div className="track-details">
                            <h2>{title}</h2>
                            <p>{artist}</p>
                        </div>
                        <div className={`like-icon ${liked ? 'liked' : ''}`} onClick={toggleLike}>
                            <span>&hearts;</span>
                        </div>
                     
                     
                    </div>
                </div>
                <audio ref={audioRef} id="audio-player" controls onEnded={handleSongEnd}>
                    <source src={currentSong} type="audio/mp3" />
                </audio>
            </div>

            <div className="playlist-right">
                <div className="user-info">
                    <span className="user-id">{authUser?.name}님 환영합니다!</span>
                    <button onClick={() => navigate('/logout')}>로그아웃</button>
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
                            <button onClick={removeDuplicateSongsFromDB}>중복곡 삭제</button>
                        </div>
                        <ul className="playlist">
                            {playlist.map((song, index) => (
                                <li key={song.playlistNo} onClick={() => playSong(song.filePath, index)}>
                                    <input
                                        type="checkbox"
                                        checked={!!song.selected}
                                        onChange={() => handleCheckboxChange(song.musicNo, 'playlist')}
                                        onClick={(e) => e.stopPropagation()}  // 이벤트 전파 방지
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
                                <li key={song.mymusicNo}>
                                    <input
                                        type="checkbox"
                                        checked={!!song.selected}
                                        onChange={() => handleCheckboxChange(song.mymusicNo, 'myMusic')}
                                    />
                                    <div onClick={() => addToPlaylistFromMyMusic(song)}>
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
