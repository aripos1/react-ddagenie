import React, { useState } from 'react';
import '../../assets/css/all.css';
import '../../assets/css/header.css';
import '../../assets/css/footer.css';
import '../../assets/css/playlist.css';
import '../../assets/css/jjinUtilize.css';
import logo from '../../assets/images/cuteddagenie.png';
import walletIcon from '../../assets/images/wallet.png';
import searchIcon from '../../assets/images/search.png';
import albumCover from '../../assets/images/햄을 구워요.webp';
import kakaoIcon from '../../assets/images/kakao.png';
import facebookIcon from '../../assets/images/facebook.png';
import instaIcon from '../../assets/images/insta.png';

const MyMusic = () => {
  const [activeTab, setActiveTab] = useState('playlist');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div id="wrap-main">
      <div id="wrap-head">
        <div id="wrap-header">
          <div id="purchase-button">
            <img src={walletIcon} alt="지갑" />
            <a href="">이용권구매</a>
          </div>
          <div className="header-main">
            <div className="header-left">
              <span className="logo">
                <img src={logo} alt="로고" />
              </span>
              <div id="search-wrap">
                <input
                  type="search"
                  id="sc-fd"
                  className="ipt-search"
                  maxLength="200"
                  autoComplete="off"
                  placeholder="가을에 듣기 좋은 감성 발라드"
                />
                <input type="submit" className="btn-submit" value="검색" />
              </div>
            </div>
          </div>

          <div className="gnb" id="gnb">
            <ul className="menu clearfix">
              <li><a href="#" className="gnb-menu">지니차트</a></li>
              <li><a href="#" className="gnb-menu">최신음악</a></li>
              <li><a href="#" className="gnb-menu">장르음악</a></li>
            </ul>
            <div className="gnb-my">
              <button type="button" className="btn login-join-btn">로그인/회원가입</button>
            </div>
          </div>
        </div>
      </div>

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
            <a>
              <span>마이뮤직</span>
            </a>
            <div>
              <ul>
                <li><a href="#" className="menu-item" onClick={() => handleTabClick('playlist')}><img src={searchIcon} alt="검색" /> 플레이 리스트</a></li>
                <li><a href="#" className="menu-item" onClick={() => handleTabClick('likes')}><img src={searchIcon} alt="검색" /> 좋아요♥</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div id="wrap-main">
          <div id="top-title">
            <h2>마이뮤직</h2>
            <p>홈  마이뮤직  플레이리스트  <strong>플레이리스트</strong></p>
          </div>
          <div id="top-ct-list" className="clearfix">
            <ul>
              <li><a href="#" className="top-menu-item" onClick={() => handleTabClick('playlist')}>플레이리스트</a></li>
              <li><a href="#" className="top-menu-item" onClick={() => handleTabClick('likes')}>좋아요♥</a></li>
            </ul>
          </div>

          <div id="wrap-main-content">
            {/* 플레이리스트 섹션 */}
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
                    <tr>
                      <td><input type="checkbox" /></td>
                      <td>1</td>
                      <td>
                        <div className="song-info">
                          <img src={albumCover} alt="앨범 커버" />
                          <div>
                            <p>HAPPY</p>
                            <p>DAY6 (데이식스) | Fourever</p>
                          </div>
                        </div>
                      </td>
                      <td><button>듣기</button></td>
                      <td><button>삭제</button></td>
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
      <div id="wrap-foot" className="footer">
        <div className="ft-head clearfix">
          <ul>
            <li><a href="#">회사소개</a></li>
            <li><a href="#">이용약관</a></li>
            <li><a href="#">개인정보처리방침</a></li>
            <li><a href="#">청소년보호정책</a></li>
            <li><a href="#">위치기반서비스</a></li>
          </ul>
        </div>
        <div className="ft-main clearfix">
          <div className="ft-logo">
            <img src={logo} alt="지니뮤직 로고" />
          </div>
          <div className="ft-info">
            <p>(주) 따지니뮤직</p>
            <p>대표이사 황일영 | 서울 서초구 강남대로 405 통영빌딩 8층</p>
            <p>사업자등록번호: 777-77-01234 | 통신판매업신고 2013-서울강남-01302</p>
            <p>개인정보보호책임자: 임현성 | 서비스문의: 1577-5337 | 이메일: molddajini@hwak.ma</p>
            <p>COPYRIGHT©DDAGENIE MUSIC CORP ALL RIGHTS RESERVED.</p>
          </div>
        </div>
        <div className="ft-sns">
          <a href="#"><img src={kakaoIcon} alt="카카오톡" /></a>
          <a href="#"><img src={facebookIcon} alt="페이스북" /></a>
          <a href="#"><img src={instaIcon} alt="인스타그램" /></a>
        </div>
      </div>
    </div>
  );
};

export default MyMusic;
