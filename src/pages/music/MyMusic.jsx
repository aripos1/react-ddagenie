import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'; // useLocation 추가
import axios from 'axios';
import '../../assets/css/all.css';
import '../../assets/css/mymusic.css';
import '../../assets/css/jjinUtilize.css';
import '../../assets/css/userinfo.css';

import Header from '../include/Header';
import Footer from '../include/Footer';
import Sidebar from '../include/Aside'; // 사이드바

import profileImage from '../../assets/images/default_img2.png';

const MyMusic = () => {
  const [activeTab, setActiveTab] = useState('playlist');
  const [myMusicList, setMyMusicList] = useState([]);
  const [likedSongs, setLikedSongs] = useState([]);
  const [error, setError] = useState(null);
  const [authUser, setAuthUser] = useState(null);
  const [profile, setProfile] = useState(profileImage); // 기본 이미지를 profile로 설정
  const [loading, setLoading] = useState(false);
  const location = useLocation(); // useLocation 훅 사용


  // 사용자 정보 로드
  useEffect(() => {
    const storedUser = localStorage.getItem('authUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setAuthUser(parsedUser);
      // 프로필 이미지 설정 (saveName 사용)
      if (parsedUser.saveName) {
        setProfile(parsedUser.saveName);
      } else {
        setProfile(profileImage); // 기본 이미지로 설정
      }
    }
  }, []);


  // URL 쿼리 매개변수에 따라 탭 설정
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [location.search]);


  // 사용자 정보에 따라 마이뮤직과 좋아요 리스트 불러오기
  useEffect(() => {
    if (authUser && authUser.no) {
      setLoading(true);
      Promise.all([loadMyMusicList(authUser.no), loadLikedSongs(authUser.no)])
        .then(() => setLoading(false))
        .catch(() => {
          setLoading(false);
          setError('데이터를 불러오는 중 오류가 발생했습니다.');
        });
    }
  }, [authUser]);

  // 마이뮤직 리스트 API 호출
  const loadMyMusicList = async (userNo) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/mymusiclist/${userNo}`);
      if (response.status === 200) {
        setMyMusicList(response.data.map(song => ({ ...song, selected: false })));
      } else {
        setError('마이뮤직 리스트를 불러오지 못했습니다.');
      }
    } catch {
      setError('마이뮤직 리스트를 불러오는 중 오류가 발생했습니다.');
    }
  };

  // 좋아요한 곡 리스트 API 호출
  const loadLikedSongs = async (userNo) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/like/list/${userNo}`);
      if (response.status === 200) {
        setLikedSongs(response.data);
      } else {
        setError('Failed to fetch liked songs.');
      }
    } catch (error) {
      console.error('Error fetching liked songs:', error);
      setError('Error fetching liked songs.');
    }
  };

  // 재생 + 재생목록에 추가
  // 듣기 버튼 클릭 핸들러
  const handlePlayAndAddToPlaylist = async (musicNo) => {
    if (!authUser) {
      alert('로그인 해주세요.');
      return;
    }

    // 이용권 상태 확인
    if (authUser.ticket_status !== "이용중" && authUser.ticket_status !== "해지중") {
      alert('이용권이 필요합니다.');
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/playlist/add`, {
        userNo: authUser.no,
        musicNo,
      });

      if (response.status === 200) {
        openPlayerPopup(authUser.no);
      } else {
        console.error('재생목록에 곡 추가 실패');
      }
    } catch (error) {
      console.error('Error adding song to playlist:', error);
    }
  };

  // 팝업 열기 (유저 넘버만 전달)
  const openPlayerPopup = (userNo) => {
    const popupOptions = `width=735,height=460,resizable=yes,scrollbars=no`;
    const popupUrl = `/music/musicplayer?userNo=${encodeURIComponent(userNo)}`;
    window.open(popupUrl, 'Music Player', popupOptions);
  };

  // 탭 전환 핸들러
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // 곡 이미지 URL 설정
  const getImageUrl = (song) => {
    return song.imageName || profileImage;
  };

  // 체크박스 변경 핸들러
  const handleCheckboxChange = (mymusicNo) => {
    setMyMusicList(prevList =>
      prevList.map(song =>
        song.mymusicNo === mymusicNo ? { ...song, selected: !song.selected } : song
      )
    );
  };

  // 선택된 곡 삭제
  const deleteSelectedSongsFromMyMusic = () => {
    const selectedSongs = myMusicList.filter(song => song.selected);
    const musicNos = selectedSongs.map(song => song.musicNo);
    if (musicNos.length > 0) {
      axios.post(`${process.env.REACT_APP_API_URL}/api/mymusic/delete`, {
        musicNos: musicNos,
        userNo: authUser.no
      })
        .then(response => {
          setMyMusicList(myMusicList.filter(song => !song.selected));
        })
        .catch(error => {
          setError('Error deleting songs from MyMusic.');
        });
    }
  };

  return (
    <div id="wrap-main">
      <Header />
      <div id="wrap-body" className="clearfix ham">
        {/* 사이드바 */}
        {/* Sidebar 컴포넌트 호출 */}
        <Sidebar name={authUser?.name} profile={profile} />

        <div id="wrap-main">
          <div id="top-title" className="userinfotitle">
            <h2>내 정보</h2>
            <ul className="Breadcrumbs">
              <li><Link to="/">홈</Link> {'>'}</li>
              <li><Link to="#">마이뮤직</Link> {'>'}</li>
              <li><Link to="/user/info">내정보</Link> {'>'}</li>
              <li><strong><Link to="/user/info">기본정보 변경</Link></strong></li>
            </ul>
          </div>
          <div id="top-ct-list" className="clearfix">
            <ul>
              <li><a href="#" className="top-menu-item" onClick={() => handleTabClick('playlist')}>마이뮤직리스트</a></li>
              <li><a href="#" className="top-menu-item" onClick={() => handleTabClick('likes')}>좋아요♥</a></li>
            </ul>
          </div>

          <div id="wrap-main-content">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
                {activeTab === 'playlist' && (
                  <div className="my-music-playlist">
                    <table className="my-music-table">
                      <colgroup>
                        <col style={{ width: '10%' }} />
                        <col style={{ width: '60%' }} />
                        <col style={{ width: '30%' }} />
                      </colgroup>
                      <tbody>
                        {myMusicList.length > 0 ? (
                          myMusicList.map((song, index) => (
                            <tr key={song.mymusicNo || `playlist-${index}`}>
                              <td>
                                <input
                                  type="checkbox"
                                  checked={!!song.selected}
                                  onChange={() => handleCheckboxChange(song.mymusicNo)}
                                />
                              </td>
                              <td>
                                <div className="song-info">
                                  <img
                                    src={getImageUrl(song)}
                                    alt="앨범 커버"
                                    className="song-album-image"
                                  />
                                  <div className="song-details">
                                    <p>{song.title}</p>
                                    <p>{song.artistName} | {song.genre}</p>
                                  </div>
                                </div>
                              </td>
                              <td>
                                {authUser?.ticket_status === "이용중" || authUser?.ticket_status === "해지중" ? (
                                  <button
                                    onClick={() => handlePlayAndAddToPlaylist(song.musicNo)}
                                    className="jelly-button"
                                  >
                                    듣기
                                  </button>
                                ) : (
                                  <button
                                    className="jelly-button disabled"
                                    onClick={() => alert('이용권이 필요합니다.')}
                                    disabled
                                  >
                                    듣기
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr className='mymusiclist-stutus'>
                            <td colSpan="4">마이뮤직 리스트가 없습니다.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                    <div className="my-music-footer">
                      <button className="jelly-delete-button" onClick={deleteSelectedSongsFromMyMusic}>
                        선택 삭제
                      </button>
                    </div>
                  </div>
                )}
                {activeTab === 'likes' && (
                  <div className="my-music-likes">
                    <table className="my-music-table">
                      <colgroup>
                        <col style={{ width: '10%' }} />
                        <col style={{ width: '60%' }} />
                        <col style={{ width: '30%' }} />
                      </colgroup>
                      <tbody>
                        {likedSongs.length > 0 ? (
                          likedSongs.map((song, index) => (
                            <tr key={song.musicNo || `liked-${index}`}>
                              <td>{index + 1}</td>
                              <td>
                                <div className="song-info">
                                  <img src={getImageUrl(song)} alt="앨범 커버" className="song-album-image" />
                                  <div className="song-details">
                                    <p>{song.title}</p>
                                    <p>{song.artistName} | {song.genre}</p>
                                  </div>
                                </div>
                              </td>
                              <td>
                                {authUser?.ticket_status === "이용중" || authUser?.ticket_status === "해지중" ? (
                                  <button
                                    onClick={() => handlePlayAndAddToPlaylist(song.musicNo)}
                                    className="jelly-button"
                                  >
                                    듣기
                                  </button>
                                ) : (
                                  <button
                                    className="jelly-button disabled"
                                    onClick={() => alert('이용권이 필요합니다.')}
                                    disabled
                                  >
                                    듣기
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr  className='mymusiclist-stutus'>
                            <td colSpan="3">좋아요 한 곡이 없습니다.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyMusic;
