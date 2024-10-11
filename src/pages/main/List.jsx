import React, { useEffect, useState } from 'react';
import { Link, useLocation  } from 'react-router-dom';
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
    const [allChecked, setAllChecked] = useState(false); // 전체 선택 체크 상태 추가
    const [checkedItems, setCheckedItems] = useState([]); // 개별 체크 상태 추가
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 추가

    const location = useLocation(); // URL의 query string을 가져오기 위해 useLocation 사용

    const itemsPerPage = 50; // 페이지당 곡 수


    // 검색어를 URL에서 가져오기
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('query'); // ?query=searchTerm 형태로 검색어 받기

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
    
    // 컴포넌트 마운트 시 API를 통해 데이터 가져오기
    useEffect(() => {
        setLoading(true);

        const apiUrl = searchQuery 
            ? `${process.env.REACT_APP_API_URL}/api/search?query=${searchQuery}`  // 검색어가 있을 때
            : `${process.env.REACT_APP_API_URL}/api/musiclist`;  // 검색어가 없을 때 전체 목록

        axios({
                method: 'get',
                url: apiUrl,
                headers: { "Content-Type": "application/json" },
                responseType: 'json'
            }).then(response => {
                console.log(response.data);
                console.log(response.data.apiData);

                if (response.data.result === 'success') {
                    setSongData(response.data.apiData); // API로부터 데이터를 가져와 상태에 저장
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
        }, [searchQuery]); //searchQuery가 변경될 때마다 실행
    

    

    // 페이지 변경 핸들러
    const handlePageChange = (pageNumber) => {
        console.log(`Changing to page: ${pageNumber}`); // 페이지 번호 확인 로그
        setCurrentPage(pageNumber);
        setAllChecked(false); // 페이지 변경 시 전체 체크 해제
        setCheckedItems([]);  // 선택된 항목도 리셋
    };

    // 현재 페이지에 해당하는 곡 데이터를 필터링
    const currentSongs = songData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    console.log(`Current Page: ${currentPage}, Showing songs:`, currentSongs); // 현재 페이지와 필터링된 곡 데이터 확인

    // 모든 곡의 ID 리스트를 생성하는 함수
    const fnAllSongID = () => {
        return songData.map(song => song.musicNo); // songData에서 각 곡의 musicNo를 리스트로 반환
    };

    const fnPlayArrSong = (type) => {
        console.log(`Play array song of type: ${type}`);
    };

    const fnViewAlbumLayer = (albumImage) => {
        console.log(`Album layer for ${albumImage}`);
    };

    const fnViewSongInfo = (songId) => {
        console.log(`Viewing info for song ID: ${songId}`);
    };

    const fnPlaySong = (songId, action) => {
        console.log(`Playing song ID: ${songId}, action: ${action}`);
    };

    const fnViewArtist = (artistId) => {
        console.log(`Viewing artist with ID: ${artistId}`);
    };

    const fnAddMyAlbumForm = (elementId, songId, param1, param2) => {
        console.log(`Adding song ID: ${songId} to playlist. Element: ${elementId}`);
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
            prev.includes(musicNo) ? prev.filter(id => id !== musicNo) : [...prev, musicNo]
        );
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
                            <li><Link to="#">TOP200</Link></li>
                            <li><Link to="#" id="deleteAccountButton">장르별 차트</Link></li>
                        </ul>
                    </div>
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
                        <Link to="#" className="btn btn-listen" title="재생" onClick={() => fnPlayArrSong(1)}>듣기</Link>
                        <Link to="#" className="btn btn-add" title="추가" onClick={() => fnPlayArrSong(3)}>
                            <span className="hide">재생목록에 </span>추가
                        </Link>
                        <div className="btns">
                            <Link to="#" className="btn btn-listen" title="TOP200 듣기" onClick={() => fnPlaySong(fnAllSongID(), 1)}>
                                TOP200 듣기
                            </Link>
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
                            {Array.isArray(currentSongs) && currentSongs.length > 0 ? (
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
                                        <Link to={`/main/detail/${song.musicNo}`} className="cover" onClick={() => fnViewAlbumLayer(song.imageName)}>
                                                <span className="mask"></span>
                                                <img
                                                    src={getImageUrl(song)}
                                                    onError={(e) => { e.target.src = '/default-image.png'; }} // 이미지 로드 실패 시 대체 이미지 사용
                                                    alt={song.albumTitle}
                                                />
                                            </Link>
                                        </td>
                                        <td className="link">
                                            <Link to="#" className="btn-basic btn-info" onClick={() => fnViewSongInfo(song.musicNo)}>
                                                곡 제목 정보 페이지
                                            </Link>
                                        </td>
                                        <td className="info">
                                            <Link to="#" className="title ellipsis" title="재생" onClick={() => fnPlaySong(song.musicNo, '1')}>
                                                {song.title}
                                            </Link>
                                            <Link to="#" className="artist ellipsis" onClick={() => fnViewArtist(song.artistNo)}>
                                                {song.artistName}
                                            </Link>
                                            <i className="bar">|</i>
                                            <Link to="#" className="albumtitle ellipsis" onClick={() => fnViewAlbumLayer(song.imageName)}>
                                                {song.albumTitle}
                                            </Link>
                                        </td>
                                        <td className="btns">
                                            <Link to="#" className="btn-basic btn-listen" title="재생" onClick={() => fnPlaySong(song.musicNo, '1')}>
                                                듣기
                                            </Link>
                                        </td>
                                        <td className="btns">
                                            <button
                                                type="button"
                                                className="btn-basic btn-album"
                                                title='담기'
                                                songid={song.musicNo}
                                                id={`add_my_album_${song.musicNo}`}
                                                onClick={() => fnAddMyAlbumForm(`#add_my_album_${song.musicNo}`, song.musicNo, 10, 10)}
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
                            )}
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
                        <Link to="#" className="btn btn-listen" title="재생" onClick={() => fnPlayArrSong(1)}>듣기</Link>
                        <Link to="#" className="btn btn-add" title="추가" onClick={() => fnPlayArrSong(3)}>
                            <span className="hide">재생목록에 </span>추가
                        </Link>
                        <div className="btns">
                            <Link to="#" className="btn btn-listen" title="TOP200 듣기" onClick={() => fnPlaySong(fnAllSongID(), 1)}>
                                TOP200 듣기
                            </Link>
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
