import React from 'react';


//헤더 푸터 및 css
import Header from '../include/Header';
import'../../assets/css/Detail.css';

const Detail = () => {

  return (
    <>
        <Header/>
      <div id="wrap-body" className="clearfix">
        <div className="page-main-container">
          
          {/* 앨범 이미지와 정보 */}
          <div className="album-section">
            <div className="album-cover">
              <img src="../../assets/images/musicImg/album(small)/dance/황덕룡.png" alt="햄을 프라이팬에 구워서 김치와 싸 드셔보세요" className="album-img" />
            </div>
            <div className="album-info">
              <h1>햄을 프라이팬에 구워서 김치와 싸 드셔보세요</h1>
              <p>아티스트: 김치워리어</p>
              <p>장르/스타일: 김치</p>
              <p>레이블: Stone Music Entertainment</p>
              <p>개발사: Stone Music Entertainment, CJ E&M STUDIOS</p>
              <p>발매일: 2024.10.01</p>
              <div className="buttons">
                <button className="button-play">듣기</button>
                <button className="button-add">담기</button>
                <span className="like-count">좋아요 수: <strong id="like-count">11</strong></span>
              </div>
            </div>
          </div>
          
          {/* 소개문구 */}
          <div className="song-description-section">
            <h2>곡 소개</h2>
            <p>
              이 곡은 김치의 맛을 극대화 하기 위해선 햄을 김치에 싸서 후라이팬과 함께 먹는 것이 좋다고 합니다. 
              무슨 소리냐고요? 네 별 생각 없이 써놓은 거에요. 오늘 밥은 혼자서 후라이팬에 햄을 구워서 김치와 함께 드셔보시는 게 어떨까요?
              어떻긴 어때 맛이 없겠지 ㅋㅋ
            </p>
          </div>

          {/* 다른 앨범 리스트 */}
          <div className="artist-album-list">
            <h2>이 아티스트의 다른 앨범 더보기</h2>
            <div className="album-covers-container">
              <div className="cover-item">
                <img src="../../assets/images/musicImg/album(small)/dance/Q_80,0 (8).jfif" alt="YIM" />
                <p>YIM</p>
              </div>
              <div className="cover-item">
                <img src="../../assets/images/musicImg/album(small)/dance/Q_80,0 (13).jfif" alt="윤후" />
                <p>윤후</p>
              </div>
              <div className="cover-item">
                <img src="../../assets/images/musicImg/album(small)/dance/Q_80,0 (11).jfif" alt="After Love" />
                <p>After Love</p>
              </div>
              <div className="cover-item">
                <img src="../../assets/images/musicImg/album(small)/dance/Q_80,0 (1).jfif" alt="이별 뒷 그늘 부르다" />
                <p>이별 뒷 그늘 부르다</p>
              </div>
              <div className="cover-item">
                <img src="../../assets/images/musicImg/album(small)/dance/Q_80,0.jfif" alt="Love Part 2" />
                <p>Love Part 2</p>
              </div>
            </div>
          </div>

          {/* 댓글 섹션 */}
          <div className="comments-section">
            <h3>댓글(1개)</h3>

            {/* 댓글 입력 폼 */}
            <div className="comment-form">
              <textarea className="comment-input" placeholder="댓글을 입력하세요..." maxLength="140"></textarea>
              <button className="comment-submit-button" type="submit">댓글 등록</button>
            </div>

            {/* 댓글 리스트 */}
            <div className="comment-section">
              <div className="comment-item">
                <p><strong>임현성</strong> <span>2024-10-02</span></p>
                <p>다했니?다했니?다했니?다했니?다했니?다했니?다했니?다했니?다했니?(글자제한필요)</p>
                <button className="reply-toggle">대댓글 보기</button>

                {/* 대댓글 리스트 */}
                <div className="reply-list" style={{ display: 'none' }}>
                  <div className="reply-item">
                    <p><strong>진소영</strong> <span>2024-09-29</span></p>
                    <p>네</p>
                  </div>
                  <div className="reply-item">
                    <p><strong>드래곤</strong> <span>2024-09-29</span></p>
                    <p>죄송합니다</p>
                  </div>
                  <div className="reply-item">
                    <p><strong>함민규</strong> <span>2024-09-29</span></p>
                    <p>난 다했지롱</p>
                  </div>
                  <div className="reply-item">
                    <p><strong>신지연</strong> <span>2024-09-29</span></p>
                    <p>나도 다했지롱</p>
                  </div>    
                </div>

                {/* 대댓글 작성 폼 */}
                <div className="reply-form" style={{ display: 'none' }}>
                  <textarea className="reply-input" placeholder="대댓글을 입력하세요..."></textarea>
                  <button className="reply-submit">대댓글 등록</button>
                </div>
              </div>
            </div>

            {/* 반복되는 댓글 구조는 동일하게 유지하며 JSX 스타일로 변환하였습니다 */}
            {/* 다른 댓글 섹션들 */}
            {/* ... 생략된 다른 댓글 섹션 ... */}

          </div>
        </div>
      </div>
    </>
  );
}

export default Detail;
