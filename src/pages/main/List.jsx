import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../include/Header';
import Footer from '../include/Footer';

import '../../assets/css/all.css';
import '../../assets/css/index.css';
import '../../assets/css/hammusiclist.css';


const MusicList = () => {
    const fnPlayArrSong = (type) => {
        console.log(`Play array song of type: ${type}`);
    };

    const fnPlaySong = (songIds, type) => {
        console.log(`Play songs with IDs: ${songIds} and type: ${type}`);
    };

    const fnAllSongID = () => {
        return [1, 2, 3];  // 예시로 임의의 곡 ID 리스트
    };

    const openPlayerPopup = (title, artist, cover, song) => {
        console.log(`Now playing: ${title} by ${artist}, Cover: ${cover}, Song: ${song}`);
        // 팝업 창을 열거나 플레이어 실행 로직을 추가할 수 있습니다.
    };

    return (
        <div id="wrap-main">
            <Header />
            <div id="wrap-body" className="musiclist">
                <div id="top-title" className="listTitle">
                    <h2 id="headtitle">인기차트</h2>
                    <ul className="Breadcrumbs">
                        <li><Link to="#">지니차트</Link> {'>'}</li>
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

                    <table id="list-table">
                        <thead id="list-table-head">
                            <tr>
                                <th>번호</th>
                                <th>곡 정보</th>
                                <th>재생/추가/담기/다운</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* 예시로 번호가 1부터 5까지의 곡 정보 표시 */}
                            {[1, 2, 3, 4, 5].map((num) => (
                                <tr className="mainplay" key={num}>
                                    <td>{num}</td>
                                    <td>
                                        <div className="song-info">
                                            <img src="../../assets/images/default_img2.png" alt="BOOMERANG" className="song-cover" />
                                            <div>
                                                <div className="song-title">BOOMERANG</div>
                                                <div>20WAVE | BOOMERANG</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="buttons">
                                            <button className="btn play-btn" onClick={() => openPlayerPopup('BOOMERANG', '20WAVE', 'cover1.jpg', 'song1.mp3')}>
                                                ▶재생
                                            </button>
                                            <button className="btn">+ 추가</button>
                                            <button className="btn">담기</button>
                                            <button className="btn">⬇ 다운</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default MusicList;
