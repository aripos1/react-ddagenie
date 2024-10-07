import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // 예시로 Axios 사용

import Header from '../include/Header';
import Footer from '../include/Footer';

import '../../assets/css/all.css';
import '../../assets/css/index.css';
import '../../assets/css/hammusiclist.css';

const MusicList = () => {
    // 상태 변수 설정
    const [songData, setSongData] = useState([]);

    // 컴포넌트 마운트 시 API를 통해 데이터 가져오기
    useEffect(() => {
        axios.get('/api/songs') // 예시 API URL
            .then(response => {
                setSongData(response.data);
            })
            .catch(error => {
                console.error("데이터 불러오기 실패:", error);
            });
    }, []);

    // 아래에서 사용한 함수들은 그대로 유지하면서 필요한 로직을 추가합니다.

    const fnPlayArrSong = (type) => {
        console.log(`Play array song of type: ${type}`);
    };

    const fnAllSongID = () => {
        return [1, 2, 3];  // 예시로 임의의 곡 ID 리스트
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

    const fnDownSong = (songId) => {
        console.log(`Downloading song ID: ${songId}`);
    };

    const shareDo = (songId) => {
        console.log(`Sharing song ID: ${songId}`);
    };

    const fnGiftSong = (songId) => {
        console.log(`Gifting song ID: ${songId}`);
    };

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
                                <th scope="col" class="hd-check"><span class="hide">선택</span></th>
                                <th scope="col" class="hd-number">순위</th>
                                <th scope="col" class="hd-album"><span class="hide">앨범이미지</span></th>
                                <th scope="col" class="hd-link"><span class="hide">곡정보 이동 링크</span></th>
                                <th scope="col" class="hd-info">곡정보</th>
                                <th scope="col" class="hd-btns">듣기</th>
                                <th scope="col" class="hd-btns">추가</th>
                                <th scope="col" class="hd-btns">담기</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* 리스트 반복부분 */}
                            <tr className="list" songid={songData.songId}>
                                <td className="check">
                                    <input type="checkbox" className="select-check" title={songData.songTitle} />
                                </td>
                                <td className="number">
                                    {songData.number}
                                    <span className="rank">
                                        <span className="rank-up">
                                            {songData.rank}
                                            <span className="hide">상승</span>
                                        </span>
                                    </span>
                                </td>
                                <td>
                                    <Link to="#" className="cover" onClick={() => fnViewAlbumLayer(songData.albumImage)}>
                                        <span className="mask"></span>
                                        <img
                                            src={`//image.genie.co.kr/Y/IMAGE/IMG_ALBUM/085/111/408/${songData.albumImage}_1714717028079_1_140x140.JPG/dims/resize/Q_80,0`}
                                            onError={(e) => { e.target.src = '//image.genie.co.kr/imageg/web/common/blank_68.gif'; }}
                                            alt={songData.album}
                                        />
                                    </Link>
                                </td>
                                <td className="link">
                                    <Link to="#" className="btn-basic btn-info" onClick={() => fnViewSongInfo(songData.songId)}>
                                        곡 제목 정보 페이지
                                    </Link>
                                </td>
                                <td className="info">
                                    <Link to="#" className="title ellipsis" title="재생" onClick={() => fnPlaySong(songData.songId, '1')}>
                                        {songData.songTitle}
                                    </Link>
                                    <Link to="#" className="artist ellipsis" onClick={() => fnViewArtist(songData.artistId)}>
                                        {songData.artist}
                                    </Link>
                                    <i className="bar">|</i>
                                    <Link to="#" className="albumtitle ellipsis" onClick={() => fnViewAlbumLayer(songData.albumImage)}>
                                        {songData.album}
                                    </Link>
                                </td>
                                <td className="btns">
                                    <Link to="#" className="btn-basic btn-listen" title="재생" onClick={() => fnPlaySong(songData.songId, '1')}>
                                        듣기
                                    </Link>
                                </td>
                                <td className="btns">
                                    <Link to="#" className="btn-basic btn-add" title="추가" onClick={() => fnPlaySong(songData.songId, '3')}>
                                        재생목록에 추가
                                    </Link>
                                </td>
                                <td className="btns">
                                    <button
                                        type="button"
                                        className="btn-basic btn-album"
                                        songid={songData.songId}
                                        id={`add_my_album_${songData.songId}`}
                                        onClick={() => fnAddMyAlbumForm(`#add_my_album_${songData.songId}`, songData.songId, 10, 10)}
                                    >
                                        플레이리스트에 담기
                                    </button>
                                </td>
                                
                            </tr>
                            {/* 리스트 반복부분 끝 */}
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
                <div class="page-nav rank-page-nav">
                    <Link to="pg=1" class="current">1 ~ 50 위</Link>
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
