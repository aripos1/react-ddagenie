import React, { useState, useEffect } from 'react';
import axios from 'axios';  // API 호출을 위해 axios 추가
import '../../assets/css/all.css';
import '../../assets/css/playlist.css';
import '../../assets/css/jjinUtilize.css';
import Header from '../include/header';
import Footer from '../include/Footer';
import logo from '../../assets/images/cuteddagenie.png';
import searchIcon from '../../assets/images/search.png';
import albumCover from '../../assets/images/햄을 구워요.webp';

const MyMusic = () => {
  const [activeTab, setActiveTab] = useState('playlist');
  const [myMusicList, setMyMusicList] = useState([]); // 마이뮤직 리스트 상태 추가
  const [error, setError] = useState(null); // 에러 상태 추가

  useEffect(() => {
    loadMyMusicList(1); // 컴포넌트 로드 시 마이뮤직 리스트 불러오기
  }, []);

  // 마이뮤직 리스트 API 호출
  const loadMyMusicList = async (userNo) => {
    try {
      const response = await axios.get(`http://localhost:8888/api/mymusiclist/${userNo}`);
      if (response.status === 200) {
        setMyMusicList(response.data); // 불러온 데이터로 상태 업데이트
      } else {
        setError('Failed to fetch MyMusic list.');
      }
    } catch (error) {
      setError('Error fetching MyMusic list.');
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div id="wrap-main">
      {/* Header */}
      <Header />

      <div id="wrap-body" className="clearfix">
        <div id="wrap-side">
          <div id="profile-box">
            <div className="profile-name">
              <span>
                <img src={logo} alt="프로필" />
              </span>
              <div className="profile-name-one">
                <p><a href="#"><strong>진소영</strong> 님</a></p>
                <a href="#">프로필수정</a>
              </div>
            </div>
            <div className="profile-edit">
              <a href="#" className="button-left"><span>내정보</span></a>
              <a href="#" className="button-right"><span>이용권내역</span></a>
            </div>
          </div>

          {/* 마이뮤직 리스트 */}
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
            <p>홈  마이뮤직  마이뮤직리스트  <strong>마이뮤직리스트</strong></p>
          </div>
          <div id="top-ct-list" className="clearfix">
            <ul>
              <li><a href="#" className="top-menu-item" onClick={() => handleTabClick('playlist')}>마이뮤직리스트</a></li>
              <li><a href="#" className="top-menu-item" onClick={() => handleTabClick('likes')}>좋아요♥</a></li>
            </ul>
          </div>

          <div id="wrap-main-content">
            {/* 마이뮤직리스트 섹션 */}
            {activeTab === 'playlist' && (
              <div id="wrap-playlist">
                <table id="playlist-table">
                  <colgroup>
                    <col style={{ width: '50px' }} />
                    <col style={{ width: '50px' }} />
                    <col style={{ width: '200px' }} />
                    <col style={{ width: '75px' }} />
                    <col style={{ width: '75px' }} />
                  </colgroup>
                  <thead>
                    <tr>
                      <th><input type="checkbox" /></th>
                      <th>번호</th>
                      <th>곡 정보</th>
                      <th>듣기</th>
                      <th>삭제</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myMusicList.length > 0 ? (
                      myMusicList.map((song, index) => (
                        <tr key={song.mymusicNo}>
                          <td><input type="checkbox" /></td>
                          <td>{index + 1}</td>
                          <td>
                            <div className="song-info">
                              <img src={albumCover} alt="앨범 커버" />
                              <div>
                                <p>{song.title}</p>
                                <p>{song.artistName} | {song.genre}</p>
                              </div>
                            </div>
                          </td>
                          <td><button>듣기</button></td>
                          <td><button>삭제</button></td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5">마이뮤직 리스트가 없습니다.</td>
                      </tr>
                    )}
                  </tbody>
                </table>

                {/* 페이지네이션 */}
                <div className="pagination">
                  <span>&#60;</span>
                  <span>1 / 5</span>
                  <span>&#62;</span>
                </div>

                {/* 테이블 아래 버튼들 */}
                <br />
                <div className="action-buttons">
                  <button>전체 듣기</button>
                  <button>전체 삭제</button>
                </div>
              </div>
            )}

            {/* 좋아요 리스트 섹션 */}
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
                    <tr>
                      <td>1</td>
                      <td>
                        <div className="song-info">
                          <img src={albumCover} alt="앨범 커버" />
                          <div>
                            <p>예시곡</p>
                            <p>가수명 | 앨범명</p>
                          </div>
                        </div>
                      </td>
                      <td><button>듣기</button></td>
                    </tr>
                    {/* 더 많은 노래 추가 */}
                  </tbody>
                </table>

                {/* 페이지네이션 */}
                <div className="pagination">
                  <span>&#60;</span>
                  <span>1 / 5</span>
                  <span>&#62;</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MyMusic;
