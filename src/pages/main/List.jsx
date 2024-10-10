import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

// import Header from '../include/Header';
import Header from '../include/Header';
import Footer from '../include/Footer';

import '../../assets/css/all.css';
import '../../assets/css/index.css';
import '../../assets/css/hammusiclist.css';


const MusicList = () => {
    // 상태 변수 설정
    const [songData, setSongData] = useState([]);
    const [loading, setLoading] = useState(true); // 로딩 상태 추가
    const [error, setError] = useState(null); // 에러 상태 추가

    /* 체크박스 관련 설정 */
    const [allChecked, setAllChecked] = useState(false); // 전체 선택 체크 상태 추가
    const [checkedItems, setCheckedItems] = useState([]); // 개별 체크 상태 추가

    /* 페이징 관련 설정 */
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 추가
    const itemsPerPage = 50; // 페이지당 곡 수

    /* 차트 버튼 토글 설정 */
    const [activeTab, setActiveTab] = useState('top200'); // 기본적으로 'top200'이 활성화
    const [genre, setGenre] = useState(''); // 선택된 장르

    /* 로그인 유저 상태 설정 */
    const [authUser, setAuthUser] = useState(null); // 로그인된 유저 상태 추가

    /* 탐색창 관련 설정 */
    const location = useLocation(); // URL의 query string을 가져오기 위해 useLocation 사용
    // 검색어를 URL에서 가져오기
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('query'); // ?query=searchTerm 형태로 검색어 받기

    // 현재 페이지에 해당하는 곡 데이터를 필터링
    const currentSongs = songData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    console.log(`Current Page: ${currentPage}, Showing songs:`, currentSongs); // 현재 페이지와 필터링된 곡 데이터 확인

    // 페이지 변경 핸들러
    const handlePageChange = (pageNumber) => {
        console.log(`Changing to page: ${pageNumber}`); // 페이지 번호 확인 로그
        setCurrentPage(pageNumber);
        setAllChecked(false); // 페이지 변경 시 전체 체크 해제
        setCheckedItems([]);  // 선택된 항목도 리셋
    };

    // 이미지 URL을 가져오는 함수
    const getImageUrl = (song) => {
        let imagePath = song.imageName || song.imagePath;
        if (!imagePath || typeof imagePath !== 'string') {
            console.error('imagePath is null, undefined, or not a string:', imagePath);
            return '/default-image.png';
        }
        if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
            // S3 URL일 경우 제대로된 URL 반환
            console.log('Using S3 image URL:', imagePath);
            return imagePath;
        } else {
            // 로컬 경로를 웹에서 접근 가능한 URL로 변환
            const fileName = imagePath.split('\\').pop();
            imagePath = `${process.env.REACT_APP_API_URL}/upload/${fileName}`;
            console.log('Using local image file:', imagePath);
            return imagePath;
        }
    };

    /* API 호출을 공통화한 함수(top200 <-> 장르차트 토글용) */
    const fetchData = (url) => {
        setLoading(true);
        axios({
            method: 'get',
            url: url,
            headers: { "Content-Type": "application/json" },
            responseType: 'json'
        }).then(response => {
            console.log(response.data);
            console.log(response.data.apiData);
            if (response.data.result === 'success') {
                setSongData(response.data.apiData); // API로부터 데이터를 가져와 상태에 저장
                console.log("api 불러오기 링크 확인:  ", response.data.apiData);
            } else {
                console.error('음악 목록 조회 실패');
                setSongData([]); // 실패 시 빈 배열로 설정
            }
        }).catch(error => {
            setError("데이터를 불러오는 중 오류가 발생했습니다."); // 에러 상태 설정
            console.error("데이터 불러오기 실패:", error);
            setSongData([]); // 에러 발생 시 빈 배열로 설정
        }).finally(() => {
            setLoading(false); // 로딩이 끝나면 false로 설정
        });
    };

    // TOP200 클릭 시 데이터 가져오는 함수
    const handleTop200Click = () => {
        const apiUrl = `${process.env.REACT_APP_API_URL}/api/musiclist`;
        fetchData(apiUrl);  // 공통 API 호출 함수 사용
        setActiveTab('top200');
    };

    // 장르별 차트 불러오는 함수
    const handleGenreClick = (selectedGenre) => {
        setLoading(true);
        setGenre(selectedGenre); // 선택된 장르 설정
        setActiveTab('genre'); // 장르별 차트 탭 활성화

        // 장르별 음악 데이터를 백엔드에서 가져오기
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}/api/musiclist/genre`, // URL 설정
            headers: { "Content-Type": "application/json; charset=utf-8" }, // JSON 데이터 전송 방식
            params: { genre: selectedGenre }, // 장르를 쿼리스트링으로 전달
            responseType: 'json' // 수신 타입 지정
        })
            .then(response => {
                setSongData(response.data.apiData); // 가져온 장르별 음악 데이터 저장
                console.log("장르별 선택시 불러오는 데이터: ", response.data.apiData);
            })
            .catch(error => {
                console.error('장르별 음악 목록 불러오기 실패:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    // 모든 곡의 ID 리스트를 생성하는 함수
    const getTop200Songs = () => {
        return songData.slice(0, 200); // songData에서 상위 200곡을 가져옴
    };

    const handlePlayTop200Songs = async () => {
        const top200Songs = getTop200Songs();

        if (top200Songs.length === 0) {
            alert('재생할 곡이 없습니다.');
            return;
        }

        // 재생 목록에 추가 후 첫 곡 재생
        await handleAddTop200ToPlaylist();

        // 첫 번째 곡을 재생하는 로직
        const firstSong = top200Songs[0];
        openPlayerPopup(firstSong.title, firstSong.artistName, firstSong.fileUrl);
    };




    // 컴포넌트 마운트 시 데이터와 로그인 유저 정보를 가져오기
    useEffect(() => {
        // 1. 검색어에 따라 API URL 설정
        const apiUrl = searchQuery
            ? `${process.env.REACT_APP_API_URL}/api/search?query=${searchQuery}`  // 검색어가 있을 때
            : `${process.env.REACT_APP_API_URL}/api/musiclist`;  // 검색어가 없을 때 전체 목록

        // 2. 공통 API 호출 함수 사용
        fetchData(apiUrl);

        // 3. 로그인 유저 정보 가져오기 (localStorage에서)
        const storedUser = localStorage.getItem('authUser');
        if (storedUser) {
            setAuthUser(JSON.parse(storedUser));
        }
    }, [searchQuery]);


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
    const handlePlayAndAddToPlaylist = (musicNo, title, artist, fileUrl) => {
        if (!authUser) {
            alert("로그인 해주세요.");
            return;
        }
        // 비동기 작업을 처리할 때 axios 요청에 대한 Promise를 처리
        axios({
            method: 'post',
            url: `${process.env.REACT_APP_API_URL}/api/playlist/add`,
            headers: { "Content-Type": "application/json" },
            data: {
                userNo: authUser.no, // 로그인된 유저의 사용자 번호
                musicNo: musicNo,
                title: title,
                artist: artist,
                fileUrl: fileUrl
            },
            responseType: 'json'
        })
            .then(response => {
                if (response.status === 200) {
                    console.log('곡이 재생목록에 추가되었습니다:', response.data);

                    // 곡 추가 후 팝업을 열어 곡을 재생
                    openPlayerPopup(title, artist, fileUrl);
                } else {
                    console.error('재생목록에 곡 추가 실패');
                }
            })
            .catch(error => {
                console.error('Error adding song to playlist:', error);
            });
    };

    // 전체 선택/해제 핸들러 함수
    const fnHandleAllCheck = (e) => {
        const isChecked = e.target.checked;
        setAllChecked(isChecked);

        if (isChecked) {
            // 모든 곡의 ID를 선택
            const allSongIds = songData.map(song => song.musicNo);
            setCheckedItems(allSongIds);
        } else {
            // 선택 해제
            setCheckedItems([]);
        }
    };

    // 개별 체크 핸들러
    const fnHandleCheck = (musicNo) => {
        setCheckedItems(prev =>
            prev.includes(musicNo)
                ? prev.filter(id => id !== musicNo)
                : [...prev, musicNo]
        );
    };

    //체크된 곡을 가져오기
    const getCheckedSongs = () => {
        return songData.filter(song => checkedItems.includes(song.musicNo));
    };

    // 체크한 곡을 팝업 플레이 리스트에 추가 후 재생
    const handlePlaySelectedSongs = () => {
        const selectedSongs = getCheckedSongs(); // 체크된 곡 가져오기
        if (selectedSongs.length === 0) {
            alert('재생할 곡을 선택하세요.');
            return;
        }

        let successCount = 0;  // 성공한 곡 수를 추적하는 변수
        let failedCount = 0;   // 실패한 곡 수를 추적하는 변수

        // 선택한 곡들을 재생 목록에 추가하는 작업
        selectedSongs.forEach((song, index) => {
            axios({
                method: 'post',
                url: `${process.env.REACT_APP_API_URL}/api/playlist/add`,
                headers: { "Content-Type": "application/json" },
                data: {
                    userNo: authUser.no,
                    musicNo: song.musicNo,
                    title: song.title,
                    artist: song.artistName,
                    fileUrl: song.fileUrl
                },
                responseType: 'json'
            })
                .then(response => {
                    console.log(`곡이 재생 목록에 추가되었습니다: ${song.title}`);
                    successCount++;  // 성공한 경우 카운트 증가

                    // 모든 곡이 처리된 경우 알림 표시 후 재생
                    if (successCount + failedCount === selectedSongs.length) {
                        alert(`${successCount}곡이 재생 목록에 추가되었습니다.`);

                        // 첫 번째 곡으로 팝업을 열고 재생 (재생은 마지막 곡이 추가된 이후)
                        const firstSong = selectedSongs[0];
                        openPlayerPopup(firstSong.title, firstSong.artistName, firstSong.fileUrl);
                    }
                })
                .catch(error => {
                    console.error(`곡 추가 실패: ${song.title}`, error);
                    failedCount++;  // 실패한 경우 카운트 증가

                    // 모든 곡이 처리된 경우 실패한 곡을 포함한 알림 표시
                    if (successCount + failedCount === selectedSongs.length) {
                        alert(`총 ${selectedSongs.length}곡 중 ${successCount}곡이 재생 목록에 성공적으로 추가되었습니다.`);

                        // 재생 실패에도 첫 번째 곡을 재생 시도
                        const firstSong = selectedSongs[0];
                        openPlayerPopup(firstSong.title, firstSong.artistName, firstSong.fileUrl);
                    }
                });
        });
    };

    // 재생 목록에 선택된 곡 추가
    const handleAddSelectedSongsToPlaylist = () => {
        const selectedSongs = getCheckedSongs();
        if (selectedSongs.length === 0) {
            alert('추가할 곡을 선택하세요.');
            return;
        }

        let successCount = 0;  // 성공한 곡 수를 추적하는 변수
        let failedCount = 0;   // 실패한 곡 수를 추적하는 변수

        selectedSongs.forEach(song => {
            axios({
                method: 'post',
                url: `${process.env.REACT_APP_API_URL}/api/playlist/add`,
                headers: { "Content-Type": "application/json" },
                data: {
                    userNo: authUser.no,
                    musicNo: song.musicNo,
                    title: song.title,
                    artist: song.artistName,
                    fileUrl: song.fileUrl
                },
                responseType: 'json'
            }).then(response => {
                console.log(`곡이 재생 목록에 추가되었습니다: ${song.title}`);
                successCount++;  // 성공한 경우 카운트 증가
                if (successCount + failedCount === selectedSongs.length) {
                    // 모든 곡이 처리된 경우 알림 표시
                    alert(`${successCount}곡이 재생 목록에 추가되었습니다.`);
                }
            }).catch(error => {
                console.error(`곡 추가 실패: ${song.title}`, error);
                failedCount++;  // 실패한 경우 카운트 증가
                if (successCount + failedCount === selectedSongs.length) {
                    // 모든 곡이 처리된 경우 알림 표시
                    alert(`총 ${selectedSongs.length}곡 중 ${successCount}곡이 재생 목록에 성공적으로 추가되었습니다.`);
                }
            });
        });
    };

    // TOP 200 곡을 가져와 재생 목록에 추가
    const handleAddTop200ToPlaylist = async () => {
        const top200Songs = getTop200Songs(); // 상위 200곡을 가져옴

        if (top200Songs.length === 0) {
            alert('추가할 곡이 없습니다.');
            return;
        }

        try {
            for (const song of top200Songs) {
                await axios.post(`${process.env.REACT_APP_API_URL}/api/playlist/add`, {
                    userNo: authUser.no, // 현재 로그인된 사용자 번호
                    musicNo: song.musicNo,
                    title: song.title,
                    artist: song.artistName,
                    fileUrl: song.fileUrl
                });
            }
            alert('TOP 200곡이 재생 목록에 추가되었습니다.');
        } catch (error) {
            console.error('TOP 200곡 추가 실패:', error);
        }
    };

    // 로딩 상태 처리
    if (loading) {
        return <div>데이터를 불러오는 중입니다...</div>;
    }

    // 에러 상태 처리
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div id="wrap-main" className='ham'>
            <Header />
            <div id="wrap-body" className="musiclist">
                <div id="top-title" className="listTitle">
                    <h2 id="headtitle">인기차트</h2>
                    <ul className="Breadcrumbs">
                        <li><Link to="#">따지니차트</Link> {'>'}</li>
                        <li><Link to="#">TOP200</Link> {'>'}</li>
                        <li><Link to="#">실시간</Link> </li>
                    </ul>
                </div>
                <div>
                    <div id="top-ct-list">
                        <ul>
                            <li>
                                <button onClick={handleTop200Click}>
                                    TOP200
                                </button>
                            </li>
                            <li>
                                <button onClick={() => setActiveTab('genre')}>
                                    장르별 차트
                                </button>
                            </li>
                        </ul>
                    </div>
                    {activeTab === 'genre' && (
                        <div id="genre-buttons">
                            {/* 장르 선택 버튼들 */}
                            <button onClick={() => handleGenreClick('pop')}>Pop</button>
                            <button onClick={() => handleGenreClick('rock')}>Rock</button>
                            <button onClick={() => handleGenreClick('hiphop')}>HipHop</button>
                            <button onClick={() => handleGenreClick('kizz')}>Kizz</button>
                            <button onClick={() => handleGenreClick('classical')}>Classical</button>
                        </div>
                    )}

                </div>
                <div className="music-list-wrap">
                    <div className="option-toolbar">
                        <input
                            type="checkbox"
                            className="all-check"
                            title="전체 선택"
                            onChange={fnHandleAllCheck} // 전체 선택 핸들러 추가
                            checked={allChecked}
                        />
                        <button className="btn btn-listen" title="재생" onClick={handlePlaySelectedSongs}>
                            듣기
                        </button>
                        <button className="btn btn-add" title="추가" onClick={handleAddSelectedSongsToPlaylist}>
                            <span className="hide">재생목록에 </span>추가
                        </button>
                        <div className="btns">
                            <button className="btn btn-listen" title="TOP200 듣기" onClick={handlePlayTop200Songs}>
                                TOP200 듣기
                            </button>
                        </div>
                        <div className="check-length" style={{ display: 'none' }}>
                            <em>{checkedItems.length}</em>곡 선택
                        </div>
                    </div>

                    <table className="list-wrap">
                        <thead>
                            <tr>
                                <th scope="col" className="hd-check"><span className="hide">선택</span></th>
                                <th scope="col" className="hd-number">순위</th>
                                <th scope="col" className="hd-album"><span className="hide">앨범이미지</span></th>
                                <th scope="col" className="hd-link"><span className="hide">곡정보 이동 링크</span></th>
                                <th scope="col" className="hd-info">곡정보</th>
                                <th scope="col" className="hd-btns">듣기</th>
                                <th scope="col" className="hd-btns">담기</th>
                            </tr>
                        </thead>
                        <tbody>

                            {/* 리스트 반복부분 */}

                            {activeTab === 'top200' ? (
                                Array.isArray(currentSongs) && currentSongs.length > 0 ? (
                                    currentSongs.map((song, index) => (
                                        <tr key={song.musicNo} className="list" songid={song.musicNo}>
                                            <td className="check">
                                                <input
                                                    type="checkbox"
                                                    className="select-check"
                                                    title={song.title}
                                                    onChange={() => fnHandleCheck(song.musicNo)} // 개별 체크 핸들러
                                                    checked={checkedItems.includes(song.musicNo)}
                                                />
                                            </td>
                                            <td className="number">
                                                {/* 페이지 넘버링을 맞추기 위해 currentPage와 itemsPerPage를 활용 */}
                                                {(currentPage - 1) * itemsPerPage + index + 1}
                                                <span className="likes">
                                                    <span className="likes-none">
                                                        <span className="likeicon">{song.likeCount}</span>
                                                    </span>
                                                </span>
                                            </td>
                                            <td>
                                                <Link to={`/main/detail/${song.musicNo}`} className="cover">
                                                    <span className="mask"></span>
                                                    <img src={getImageUrl(song)} alt={song.albumTitle} />
                                                </Link>
                                            </td>
                                            <td className="link">
                                                <Link to={`/main/detail/${song.musicNo}`} className="btn-basic btn-info" >
                                                    곡 제목 정보 페이지
                                                </Link>
                                            </td>
                                            <td className="info">
                                                <Link to="#" className="title ellipsis" title="재생" onClick={() => handlePlayAndAddToPlaylist(
                                                    song.musicNo,
                                                    song.title,
                                                    song.artistName,
                                                    song.fileUrl
                                                )}>
                                                    {song.title}
                                                </Link>
                                                <Link to="#" className="artist ellipsis" >
                                                    {song.artistName}
                                                </Link>
                                            </td>
                                            <td className="btns">
                                                <button
                                                    className="btn-basic btn-listen" title="재생"
                                                    onClick={() => handlePlayAndAddToPlaylist(
                                                        song.musicNo,
                                                        song.title,
                                                        song.artistName,
                                                        song.fileUrl
                                                    )}
                                                >
                                                    듣기
                                                </button>
                                            </td>
                                            <td className="btns">
                                                <button
                                                    type="button"
                                                    className="btn-basic btn-album"
                                                    title='담기'
                                                    songid={song.musicNo}
                                                    id={`add_my_album_${song.musicNo}`}
                                                >
                                                    플레이리스트에 담기
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7">노래 목록이 없습니다.</td>
                                    </tr>
                                )
                            ) : activeTab === 'genre' ? (
                                Array.isArray(currentSongs) && currentSongs.length > 0 ? (
                                    currentSongs.map((song, index) => (
                                        <tr key={song.musicNo} className="list" songid={song.musicNo}>
                                            <td className="check">
                                                <input
                                                    type="checkbox"
                                                    className="select-check"
                                                    title={song.title}
                                                    onChange={() => fnHandleCheck(song.musicNo)} // 개별 체크 핸들러
                                                    checked={checkedItems.includes(song.musicNo)}
                                                />
                                            </td>
                                            <td className="number">
                                                {/* 페이지 넘버링을 맞추기 위해 currentPage와 itemsPerPage를 활용 */}
                                                {(currentPage - 1) * itemsPerPage + index + 1}
                                                <span className="likes">
                                                    <span className="likes-none">
                                                        <span className="likeicon">{song.likeCount}</span>
                                                    </span>
                                                </span>
                                            </td>
                                            <td>
                                                <Link to={`/main/detail/${song.musicNo}`} className="cover" >
                                                    <span className="mask"></span>
                                                    <img src={getImageUrl(song)} alt={song.albumTitle} />
                                                </Link>
                                            </td>
                                            <td className="link">
                                                <Link to={`/main/detail/${song.musicNo}`} className="btn-basic btn-info" >
                                                    곡 제목 정보 페이지
                                                </Link>
                                            </td>
                                            <td className="info">
                                                <Link to="#" className="title ellipsis" title="재생" onClick={() => handlePlayAndAddToPlaylist(
                                                    song.musicNo,
                                                    song.title,
                                                    song.artistName,
                                                    song.fileUrl
                                                )}>
                                                    {song.title}
                                                </Link>
                                                <Link to="#" className="artist ellipsis" >
                                                    {song.artistName}
                                                </Link>
                                            </td>
                                            <td className="btns">
                                                <button
                                                    className="btn-basic btn-listen" title="재생"
                                                    onClick={() => handlePlayAndAddToPlaylist(
                                                        song.musicNo,
                                                        song.title,
                                                        song.artistName,
                                                        song.fileUrl
                                                    )}
                                                >
                                                    듣기
                                                </button>
                                            </td>
                                            <td className="btns">
                                                <button
                                                    type="button"
                                                    className="btn-basic btn-album"
                                                    title='담기'
                                                    songid={song.musicNo}
                                                    id={`add_my_album_${song.musicNo}`}
                                                >
                                                    플레이리스트에 담기
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7">노래 목록이 없습니다.</td>
                                    </tr>
                                )
                            ) : null}
                        </tbody>
                    </table>
                    <div className="option-toolbar">
                        <input
                            type="checkbox"
                            className="all-check"
                            title="전체 선택"
                            onChange={fnHandleAllCheck} // 전체 선택 핸들러 추가
                            checked={allChecked}
                        />
                        <button className="btn btn-listen" title="재생" onClick={handlePlaySelectedSongs}>
                            듣기
                        </button>
                        <button className="btn btn-add" title="추가" onClick={handleAddSelectedSongsToPlaylist}>
                            <span className="hide">재생목록에 </span>추가
                        </button>
                        <div className="btns">
                            <button className="btn btn-listen" title="TOP200 듣기" onClick={handlePlayTop200Songs}>
                                TOP200 듣기
                            </button>
                        </div>
                        <div className="check-length" style={{ display: 'none' }}>
                            <em>{checkedItems.length}</em>곡 선택
                        </div>
                    </div>
                </div>
                {/* 페이지 네비게이션 */}
                <div className="page-nav rank-page-nav">
                    <Link to="#" onClick={() => handlePageChange(1)} className={currentPage === 1 ? "current" : ""}>1 ~ 50 위</Link>
                    <Link to="#" onClick={() => handlePageChange(2)} className={currentPage === 2 ? "current" : ""}>51 ~ 100 위</Link>
                    <Link to="#" onClick={() => handlePageChange(3)} className={currentPage === 3 ? "current" : ""}>101 ~ 150 위</Link>
                    <Link to="#" onClick={() => handlePageChange(4)} className={currentPage === 4 ? "current" : ""}>151 ~ 200 위</Link>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default MusicList;