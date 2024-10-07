import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; 

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

    // 컴포넌트 마운트 시 API를 통해 데이터 가져오기
    useEffect(() => {
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}/api/musiclist`,
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
    }, []);

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
                        <input type="checkbox" className="all-check" title="전체 선택" />
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
                            <em>0</em>곡 선택
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
                            {Array.isArray(songData) && songData.length > 0 ? (
                                songData.map(song => (
                                    <tr key={song.musicNo} className="list" songid={song.musicNo}>
                                        <td className="check">
                                            <input type="checkbox" className="select-check" title={song.title} />
                                        </td>
                                        <td className="number">
                                            {song.rank}
                                            <span className="rank">
                                                <span className="rank-up">
                                                    {song.rankChange}
                                                    <span className="hide">상승</span>
                                                </span>
                                            </span>
                                        </td>
                                        <td>
                                            <Link to="#" className="cover" onClick={() => fnViewAlbumLayer(song.imageName)}>
                                                <span className="mask"></span>
                                                <img
                                                    src={`${process.env.REACT_APP_API_URL}/upload/${song.imageName}`}
                                                    onError={(e) => { e.target.src = 'default_image_url'; }} // 이미지 로드 실패 시 대체 이미지 사용
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
                        <input type="checkbox" className="all-check" title="전체 선택" />
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
                            <em>0</em>곡 선택
                        </div>
                    </div>
                </div>
                <div className="page-nav rank-page-nav">
                    <Link to="pg=1" className="current">1 ~ 50 위</Link>
                    <Link to="pg=2">51 ~ 100 위</Link>
                    <Link to="pg=3">101 ~ 150 위</Link>
                    <Link to="pg=4">151 ~ 200 위</Link>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default MusicList;
