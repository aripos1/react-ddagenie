import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../../assets/css/all.css';
import '../../assets/css/player.css';
import logo from '../../assets/images/cuteddagenie.png';
import albumCover from '../../assets/images/logo.webp';

const MusicPlayer = () => {
    const [activeTab, setActiveTab] = useState('playlist');
    const [playlist, setPlaylist] = useState([]);
    const [myMusic, setMyMusic] = useState([]);
    const [liked, setLiked] = useState(false);
    const audioRef = useRef(null);
    const [error, setError] = useState(null);
    const [currentSong, setCurrentSong] = useState(null); // 현재 재생 중인 곡
    const [currentSongIndex, setCurrentSongIndex] = useState(null); // 현재 재생 중인 곡의 인덱스

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
            if (response.status === 200) {
                const data = Array.isArray(response.data) ? response.data : [response.data];
                const updatedMyMusic = data.map((song, index) => ({
                    ...song,
                    mymusicNo: song.mymusicNo || `mymusic-${index}`,
                    selected: false
                }));
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
                const updatedPlaylist = response.data.map((song, index) => ({
                    ...song,
                    selected: false,  // 초기 선택 상태 설정
                    index: index      // 인덱스를 명시적으로 추가
                }));
                console.log('Playlist loaded with indices:', updatedPlaylist); // 디버깅 로그 추가
                setPlaylist(updatedPlaylist);
            })
            .catch(error => {
                setError('Error fetching playlist.');
            });
    };
    // 곡 선택 시 재생
    const playSong = (fileUrl, index) => {
        console.log('Clicked song index:', index); // 인덱스 확인용 로그 추가
        const songPath = `/assets/musicfile/${encodeURIComponent(fileUrl)}`;  // 파일 경로 설정
        setCurrentSong(songPath); // 현재 재생 중인 곡 설정
        setCurrentSongIndex(index); // 현재 재생 중인 곡 인덱스 설정
        audioRef.current.src = songPath; // 오디오 태그의 소스 설정
        audioRef.current.play(); // 재생

        // 로그 추가 - 현재 재생 중인 곡 인덱스와 파일 URL
        console.log(`재생 중인 곡 인덱스: ${index}, 파일: ${fileUrl}`);
    };
    // 현재 곡이 종료되면 자동으로 다음 곡 재생 (무한 반복 재생)
    const handleSongEnd = () => {
        if (currentSongIndex !== null && currentSongIndex !== undefined) {
            let nextIndex = currentSongIndex + 1;
            if (nextIndex >= playlist.length) {
                nextIndex = 0; // 마지막 곡 이후면 첫 번째 곡으로 돌아감
            }

            console.log(`현재 재생 중인 곡 인덱스: ${currentSongIndex}, 다음 곡 인덱스: ${nextIndex}`);
            console.log(`전체 곡 수: ${playlist.length}`);

            const nextSong = playlist[nextIndex];
            playSong(nextSong.fileUrl, nextIndex); // 다음 곡 재생
        } else {
            console.error('현재 재생 중인 곡 인덱스가 유효하지 않습니다.');
        }
    };

    // 마이뮤직 리스트에서 클릭 시 플레이리스트에 저장
    const addToPlaylistFromMyMusic = (song) => {
        axios.post('http://localhost:8888/api/playlist/add', {
            userNo: 1, // 현재 사용자 번호
            musicNo: song.musicNo // 추가할 곡의 musicNo
        })
            .then(response => {
                // 서버에 곡 추가 성공 시, 재생목록에 곡 추가
                setPlaylist(prevPlaylist => [...prevPlaylist, { ...song, selected: false }]);
            })
            .catch(error => {
                console.error('Error adding song to playlist:', error.response ? error.response.data : error.message);
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
    const removeDuplicateSongsFromDB = () => {
        axios.post('http://localhost:8888/api/playlist/remove-duplicates', {
            userNo: 1  // 현재 사용자 번호
        })
            .then(response => {
                console.log('중복 삭제 성공:', response.data);
                loadPlaylist(1);  // 재생목록을 다시 불러와 업데이트
            })
            .catch(error => {
                console.error('중복 삭제 중 오류 발생:', error.response ? error.response.data : error.message);
            });
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
                <audio ref={audioRef} id="audio-player" controls onEnded={handleSongEnd}>
                    <source src={currentSong} type="audio/mp3" />
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
                            <button onClick={removeDuplicateSongsFromDB}>중복곡 삭제</button>
                        </div>
                        <ul className="playlist">
                            {playlist.map((song, index) => (
                                <li key={song.playlistNo}>
                                    <input
                                        type="checkbox"
                                        checked={!!song.selected}
                                        onChange={() => handleCheckboxChange(song.musicNo, 'playlist')}  // musicNo 사용
                                    />
                                    <div onClick={() => playSong(song.fileUrl, index)}>
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
