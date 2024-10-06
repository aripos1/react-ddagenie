
import React from 'react';
import '../../assets/css/all.css'
import '../../assets/css/index.css'
import '../../assets/css/header.css'

import Footer from '../../pages/include/Footer.jsx'
import Header from '../../pages/include/Header.jsx';
const MainPage = () => {
  return (
    <>
      <div id="wrap-main">
    <Header/>        

        <div class="container">
          <div class="banner-section">
            <h2>최신음악</h2>
            <div class="banner-container">
              <div class="banner-item">
                <a href="hdrDetail.html">
                  <img src="../../assets/images/logo.webp" alt="이미지 1"/>
                </a>
              </div>
              <div class="banner-item">
                <img src="../../assets/images/logo.webp" alt="이미지 2"/>
              </div>
              <div class="banner-item">
                <img src="../../assets/images/logo.webp" alt="이미지 3"/>
              </div>
              <div class="banner-item">
                <img src="../../assets/images/logo.webp" alt="이미지 4"/>
              </div>
              <div class="banner-item">
                <img src="../../assets/images/logo.webp" alt="이미지 5"/>
              </div>
              <div class="banner-item">
                <img src="../../assets/images/logo.webp" alt="이미지 6"/>
              </div>
              <div class="banner-item">
                <img src="../../assets/images/logo.webp" alt="이미지 7"/>
              </div>
              <div class="banner-item">
                <img src="../../assets/images/logo.webp" alt="이미지 8"/>
              </div>
              <div class="banner-item">
                <img src="../../assets/images/logo.webp" alt="이미지 9"/>
              </div>
              <div class="banner-item">
                <img src="../../assets/images/logo.webp" alt="이미지 10"/>
              </div>
            </div>

            <div class="pagination">
              <span>&#60;</span>
              <span>1 / 5</span>
              <span>&#62;</span>
            </div>
          </div>

          <div class="ad-banner">
            <img src="../../assets/images/캡처.PNG" alt="광고 배너 이미지"/>
          </div>

          <div class="ranking-section">
            <h2>인기순위</h2>
            <table class="playlist">
              <thead>
                <tr>
                  <th>순위</th>
                  <th>곡 정보</th>
                  <th>재생/추가</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>
                    <div class="song-info">
                      <img src="../../assets/images/cuteddagenie.png" alt="곡 커버" class="song-cover"/>
                      <div class="song-details">
                        <span class="song-title">HAPPY</span>
                        <span class="artist">DAY6 (데이식스)</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="icon-container">
                      <button class="icon-btn play-btn">▶</button>
                      <button class="icon-btn plus-btn">+</button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>
                    <div class="song-info">
                      <img src="../../assets/images/cuteddagenie.png" alt="곡 커버" class="song-cover"/>
                      <div class="song-details">
                        <span class="song-title">Welcome to the Show</span>
                        <span class="artist">DAY6 (데이식스)</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="icon-container">
                      <button class="icon-btn play-btn">▶</button>
                      <button class="icon-btn plus-btn">+</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      
      <Footer/>
      </div>
      
    </>
  );
}

export default MainPage;
