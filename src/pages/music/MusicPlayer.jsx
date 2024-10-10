import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../../assets/css/all.css';
import '../../assets/css/player.css';
import profileImage from '../../assets/images/default_img2.png';

const MusicPlayer = ({ isOpen, onClose, modalTitle, modalArtist, modalFileUrl, useModal = false }) => {
    const [activeTab, setActiveTab] = useState('playlist');
    const [playlist, setPlaylist] = useState([]);
    const [myMusic, setMyMusic] = useState([]);
    const [liked, setLiked] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [authUser, setAuthUser] = useState(null);
    const audioRef = useRef(null);
    const [error, setError] = useState(null);
    const [currentSong, setCurrentSong] = useState(null);
    const [currentSongIndex, setCurrentSongIndex] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const title = query.get('title') || 'Unknown Title';
    const artist = query.get('artist') || 'Unknown Artist';
    const filePath = query.get('filePath') || null;
    const [currentTitle, setCurrentTitle] = useState('');
    const [currentArtist, setCurrentArtist] = useState('');
    const [currentImage, setCurrentImage] = useState(profileImage);
    const fileUrl = query.get('fileUrl') || null;
    const queryTitle = query.get('title') || 'Unknown Title';
    const queryArtist = query.get('artist') || 'Unknown Artist';
    const queryFileUrl = query.get('fileUrl') || null;

    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });


    const resolvedTitle = useModal ? modalTitle : queryTitle;
    const resolvedArtist = useModal ? modalArtist : queryArtist;
    const resolvedFileUrl = useModal ? modalFileUrl : queryFileUrl;

    // 모달의 드래그 시작
    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartPosition({
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        });
    };

    // 드래그 시 위치 업데이트
    const handleMouseMove = (e) => {
        if (isDragging) {
            const newX = e.clientX - startPosition.x;
            const newY = e.clientY - startPosition.y;
            setPosition({ x: newX, y: newY });
        }
    };

    // 드래그 종료
    const handleMouseUp = () => {
        setIsDragging(false);
    };
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

    useEffect(() => {
        const storedUser = localStorage.getItem('authUser');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setIsLoggedIn(true);
            setAuthUser(parsedUser);
        } else {
            setIsLoggedIn(false);
            setAuthUser(null);
        }
    }, []);
    useEffect(() => {
        if (audioRef.current && modalFileUrl) {
            audioRef.current.src = modalFileUrl;
            audioRef.current.play();
        }
    }, [modalFileUrl]);

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
        const songPath = fileUrl || (filePath ? `${process.env.REACT_APP_API_URL}/assets/musicfile/${encodeURIComponent(filePath)}` : null);

        if (songPath) {
            setCurrentSong(songPath); // 현재 재생 중인 곡 설정
            if (audioRef.current) {
                audioRef.current.src = songPath; // 오디오 태그에 파일 경로 설정
                audioRef.current.play(); // 곡 자동 재생
            }
        }
    }, [fileUrl, filePath]);

    // 좋아요 상태 및 개수 로드
    useEffect(() => {
        if (currentSong?.musicNo && authUser) {
            loadLikeStatus(authUser.no, currentSong.musicNo);
        }
    }, [currentSong, authUser]);
    useEffect(() => {
        console.log('Liked state changed:', liked);
    }, [liked]);
    // 좋아요 상태 조회
    const loadLikeStatus = (userNo, musicNo) => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/like/status/${userNo}/${musicNo}`)
            .then(response => {
                // 서버에서 liked 상태를 반환했다고 가정하고, 그 상태를 기반으로 liked 상태 업데이트
                setLiked(response.data.liked); // liked가 true/false 값이어야 함
            })
            .catch(error => {
                console.error('Error fetching like status', error);
                setLiked(false); // 오류 발생 시 기본 상태를 false로 설정
            });
    };


    const toggleLike = () => {
        if (!currentSong || !currentSong.musicNo || !authUser) {
            console.error('currentSong or musicNo or authUser is missing.');
            return;
        }

        axios.post(`${process.env.REACT_APP_API_URL}/api/like/toggle`, {
            userNo: authUser.no,
            musicNo: currentSong.musicNo
        })
            .then(response => {
                // 서버에서 "좋아요 추가됨" 또는 "좋아요 취소됨" 응답을 받아 liked 상태 변경
                const newLikedStatus = response.data === '좋아요 추가됨';
                setLiked(newLikedStatus);
                console.log('Liked status updated:', newLikedStatus);
            })
            .catch(error => {
                console.error('Error toggling like', error);
            });
    };

    // API에서 MyMusic 목록 로드
    const loadMyMusic = (userNo) => {
        if (!userNo) {
            console.error('User number is undefined in loadMyMusic');
            return; // userNo가 없는 경우 API 요청을 하지 않음
        }
        console.log('Loading MyMusic for userNo:', userNo);

        axios.get(`${process.env.REACT_APP_API_URL}/api/mymusiclist/${userNo}`)
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

        axios.get(`${process.env.REACT_APP_API_URL}/api/playlist/${userNo}`)
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

    const getImageUrl = (song) => {
        let imagePath = song.imageName || song.imagePath;

        if (!imagePath || typeof imagePath !== 'string') {
            console.error('imagePath is null, undefined, or not a string:', imagePath);
            return profileImage;
        }

        // S3 경로가 있으면 그대로 사용
        if (imagePath.startsWith('http')) {
            return imagePath;
        } else {
            // 로컬 경로를 웹 URL로 변환
            const fileName = imagePath.split('\\').pop();
            return `${process.env.REACT_APP_API_URL}/upload/${fileName}`;
        }
    };


    // s3 곡 재생
    const playSong = (song, index) => {
        let songPath = song.fileName || song.filePath;

        if (!songPath || typeof songPath !== 'string') {
            console.error('songPath is null, undefined, or not a string:', songPath);
            return;
        }

        // 파일 경로가 S3 URL이 아니라면, API URL로 변환
        if (!songPath.startsWith('http')) {
            const fileName = songPath.split('\\').pop();
            songPath = `${process.env.REACT_APP_API_URL}/assets/musicfile/${fileName}`;
        }

        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            audioRef.current.src = songPath;
            audioRef.current.play();
        }

        setCurrentSong({ ...song, path: songPath }); // 곡 객체로 설정
        setCurrentTitle(song.title);
        setCurrentArtist(song.artistName);
        setCurrentImage(getImageUrl(song));
        setCurrentSongIndex(index); // 현재 곡 인덱스 설정
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
        axios.post(`${process.env.REACT_APP_API_URL}/api/playlist/add`, {
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
            axios.post(`${process.env.REACT_APP_API_URL}/api/mymusic/add`, {
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
            axios.post(`${process.env.REACT_APP_API_URL}/api/playlist/delete`, {
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
            axios.post(`${process.env.REACT_APP_API_URL}/api/mymusic/delete`, {
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

    // 재생목록에서 중복된 곡 삭제
    const removeDuplicateSongsFromDB = () => {
        if (!authUser || !authUser.no) {
            console.error('User not logged in or userNo is missing.');
            return;
        }

        console.log('Removing duplicates for userNo:', authUser.no); // 로그 추가

        axios.post(`${process.env.REACT_APP_API_URL}/api/playlist/remove-duplicates`, {
            userNo: authUser.no  // userNo를 JSON 형식으로 전송
        })
            .then(response => {
                console.log('중복 삭제 성공:', response.data);
                loadPlaylist(authUser.no);  // 중복 제거 후 재생 목록 다시 불러오기
            })
            .catch(error => {
                if (error.response) {
                    console.error('중복 삭제 중 오류 발생:', error.response.data);
                } else {
                    console.error('네트워크 오류 또는 서버에 도달하지 못함:', error.message);
                }
            });
    };


    // 로그인 상태가 아니면 로그인 메시지 표시
    if (!isLoggedIn) {
        return (
            <div className="popup-player">
                <div className="player-left">
                    <div className="logo">
                        <img src={profileImage} alt="logo" style={{ height: '50px' }} />
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

    if (useModal) {
        return (
            <div className="modal-overlay" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
                <div
                    className="modal-content draggable"
                    style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
                    onMouseDown={handleMouseDown}
                >
                    <button className="modal-close" onClick={onClose}>
                        &times;
                    </button>
                    <div className="player">
                        <h2>{modalTitle}</h2>
                        <p>{modalArtist}</p>
                        <audio ref={audioRef} controls>
                            <source src={modalFileUrl} type="audio/mp3" />
                        </audio>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className="popup-player">
            <div className="player-left">
                <div className="logo">
                    <img src={profileImage} alt="logo" style={{ height: '50px' }} />
                </div>
                <div className="album-info">
                    <div className="info-container">
                        <div className="track-details">
                            <h2>{currentTitle}</h2> {/* 현재 재생 중인 곡의 타이틀 */}
                            <p>{currentArtist}</p> {/* 현재 재생 중인 곡의 가수 이름 */}
                            <div className={`like-icon ${liked ? 'liked' : ''}`} onClick={toggleLike}>
                                <span>&hearts;</span>
                            </div>
                        </div>
                        <img
                            src={currentImage}  // 현재 재생 중인 곡의 이미지
                            alt={currentTitle}
                            className="album-art"
                            onError={(e) => { e.target.src = profileImage; }} // 이미지 로드 실패 시 로고 이미지로 대체
                        />
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
                                <li key={song.playlistNo} onClick={() => playSong(song, index)}>
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
