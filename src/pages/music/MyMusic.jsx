import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../assets/css/all.css';
import '../../assets/css/playlist.css';
import '../../assets/css/jjinUtilize.css';
import Header from '../include/Header';
import Footer from '../include/Footer';
import searchIcon from '../../assets/images/search.png';
import profileImage from '../../assets/images/default_img2.png';

const MyMusic = () => {
  const [activeTab, setActiveTab] = useState('playlist');
  const [myMusicList, setMyMusicList] = useState([]);
  const [likedSongs, setLikedSongs] = useState([]);
  const [error, setError] = useState(null);
  const [authUser, setAuthUser] = useState(null);
  const [profile, setProfile] = useState(profileImage);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 사용자 정보 로드
  useEffect(() => {
    const storedUser = localStorage.getItem('authUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setAuthUser(parsedUser);
      loadProfileImage(parsedUser);
    }
  }, []);

  // 프로필 이미지 로드
  const loadProfileImage = (user) => {
    if (user && user.saveName) {
      setProfile(`${process.env.REACT_APP_API_URL}/upload/${user.saveName}`);
    } else {
      setProfile(profileImage);
    }
  };

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
      const response = await axios.get(`http://localhost:8888/api/mymusiclist/${userNo}`);
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
      const response = await axios.get(`http://localhost:8888/api/like/list/${userNo}`);
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
  const handlePlayAndAddToPlaylist = async (musicNo, title, artist, fileUrl) => {
    if (!authUser) {
      alert('로그인 해주세요.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8888/api/playlist/add', {
        userNo: authUser.no,
        musicNo,
        title,
        artist,
        fileUrl,
      });

      if (response.status === 200) {
        openPlayerPopup(title, artist, fileUrl);
      } else {
        console.error('재생목록에 곡 추가 실패');
      }
    } catch (error) {
      console.error('Error adding song to playlist:', error);
    }
  };

  const openPlayerPopup = (title, artist, fileUrl) => {
    const popupOptions = `width=735,height=460,resizable=yes,scrollbars=no`;
    const popupUrl = `/music/musicplayer?title=${encodeURIComponent(title)}&artist=${encodeURIComponent(artist)}&fileUrl=${encodeURIComponent(fileUrl)}`;
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
      axios.post('http://localhost:8888/api/mymusic/delete', {
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

      <div id="wrap-body" className="clearfix">
        <div id="wrap-side">
          <div id="profile-box">
            <div className="profile-name">
              <img src={profile} alt="프로필" />
              <div className="profile-name-one">
                <p><Link to="#"><strong>{authUser?.name || '사용자'}</strong> 님</Link></p>
                <Link to="#">프로필수정</Link>
              </div>
            </div>
            <div className="profile-edit">
              <Link to="/user/info" className="button-left"><span>내정보</span></Link>
              <Link to="/user/utilize" className="button-right"><span>이용권내역</span></Link>
            </div>
          </div>
          <div id="profile-list">
            <a href="#">
              <span>마이뮤직</span>
            </a>
            <div>
              <ul>
                <li><a href="#" className="menu-item" onClick={() => handleTabClick('playlist')}><img src={searchIcon} alt="검색" /> 마이뮤직리스트</a></li>
                <li><a href="#" className="menu-item" onClick={() => handleTabClick('likes')}><img src={searchIcon} alt="검색" /> 좋아요♥</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div id="wrap-main">
          <div id="top-title">
            <h2>마이뮤직</h2>
            <p>홈  마이뮤직  <strong>{activeTab === 'playlist' ? '마이뮤직리스트' : '좋아요'}</strong></p>
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
                  <div id="wrap-playlist">
                    <table id="playlist-table">
                      <thead>
                        <tr>
                          <th>선택</th>
                          <th>번호</th>
                          <th>곡 정보</th>
                          <th>듣기</th>
                        </tr>
                      </thead>
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
                              <td>{index + 1}</td>
                              <td>
                                <div className="song-info">
                                  <img src={getImageUrl(song)} alt="앨범 커버" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                                  <div>
                                    <p>{song.title}</p>
                                    <p>{song.artistName} | {song.genre}</p>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <button
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
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="5">마이뮤직 리스트가 없습니다.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                    <div className="playlist-footer">
                      <button onClick={deleteSelectedSongsFromMyMusic}>선택 삭제</button>
                    </div>
                  </div>
                )}

                {activeTab === 'likes' && (
                  <div id="wrap-likes">
                    <table id="likes-table">
                      <thead>
                        <tr>
                          <th>번호</th>
                          <th>곡 정보</th>
                          <th>듣기</th>
                        </tr>
                      </thead>
                      <tbody>
                        {likedSongs.length > 0 ? (
                          likedSongs.map((song, index) => (
                            <tr key={song.musicNo || `liked-${index}`}>
                              <td>{index + 1}</td>
                              <td>
                                <div className="song-info">
                                  <img src={getImageUrl(song)} alt="앨범 커버" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                                  <div>
                                    <p>{song.title}</p>
                                    <p>{song.artistName} | {song.genre}</p>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <button
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
                            </tr>
                          ))
                        ) : (
                          <tr>
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
