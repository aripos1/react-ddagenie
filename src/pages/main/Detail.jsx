import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

// 헤더 푸터 및 css
import Header from '../include/Header';
import '../../assets/css/Detail.css';


const Detail = () => {
    // 상태변화 변수
    const [title, setTitle] = useState('');
    const [artistName, setArtistname] = useState('');
    const [genre, setGenre] = useState('');
    const [releasedDate, setReleasedDate] = useState('');
    const [likeCount, setLikecount] = useState('');
    const [musicContent, setMusiccontent] = useState('');
    const [imageName, setImagename] = useState('');
    const [artistNo, setArtistNo] = useState(null); // 아티스트 넘버 저장
    const [otherTracks, setOtherTracks] = useState([]); // 아티스트의 다른 곡을 위한 상태 변수
    

    const navigate = useNavigate();
    const { no } = useParams();  
  

    // 데이터 가져오기(music의 n번째 곡에 대한 데이터)
    useEffect(() => {
        console.log("no 값:", no); // no 값이 undefined인지 확인
        if (no) {
            // 첫 번째 API 호출: 음악 정보 가져오기
            axios({
                method: 'get',
                url: `http://localhost:8888/api/music/${no}`, 
                headers: { "Content-Type": "application/json; charset=utf-8" },
                responseType: 'json'
            })
            .then(response => {
                if (response.data.result === 'success') {
                    const musicVo = response.data.apiData;

                    // 현재 곡 정보 설정
                    setTitle(musicVo.title);
                    setArtistname(musicVo.artistName);
                    setGenre(musicVo.genre);
                    setReleasedDate(musicVo.releasedDate);
                    setLikecount(musicVo.likeCount);
                    setMusiccontent(musicVo.musicContent);
                    setImagename(musicVo.imageName);
                    setArtistNo(musicVo.artistNo); // 아티스트 번호 저장

                    // 아티스트 번호 확인
                    const artistNo = musicVo.artistNo;
                    console.log('artistNo 확인:', artistNo); // artistNo 로그 확인

                    // 두 번째 API 호출: 해당 아티스트의 다른 곡 가져오기
                    return axios.get(`http://localhost:8888/api/music/artist/${artistNo}/${no}`, {
                        headers: { "Content-Type": "application/json; charset=utf-8" },
                        responseType: 'json'
                    });
                } else {
                    alert('음악 정보를 확인하세요');
                }
            })
            .then(response => {
                if (response.data.result === 'success') {
                    const otherTracksData = response.data.apiData;
                    setOtherTracks(otherTracksData); // 아티스트의 다른 곡 설정
                    console.log('아티스트의 다른 곡:', otherTracksData); // 확인용 로그
                } else {
                    console.log('다른 곡을 가져오는데 실패했습니다.');
                }
            })
            .catch(error => {
                console.error('API 호출 오류:', error);
            });
        }
    }, [no]);

     // 이미지 클릭 시 음악 상세 페이지로 이동
     const handleImageClick = (musicNo) => {
        navigate(`/main/detail/${musicNo}`); // 해당 음악 번호에 맞는 상세 페이지로 이동
    };
    
    return (
        <>
            <Header />
            <div id="wrap-body" className="clearfix">
                <div className="page-main-container">
                    {/* 앨범 이미지와 정보 */}
                    <div className="album-section">
                        <div className="album-cover">
                            <img src={imageName} alt="노래 이미지" className="album-img" />
                        </div>
                        <div className="album-info">
                            <h1>{title}</h1>
                            <p>아티스트: {artistName}</p>
                            <p>장르: {genre}</p>
                            <p>발매일: {releasedDate}</p>
                            <div className="buttons">
                                <button className="button-play">듣기</button>
                                <button className="button-add">담기</button>
                                <span className="like-count">좋아요 수: {likeCount} <strong id="like-count"></strong></span>
                            </div>
                        </div>
                    </div>
                    
                    {/* 소개문구 */}
                    <div className="song-description-section">
                        <h2>곡 소개</h2>
                        <p>
                            {musicContent}
                        </p>
                    </div>

                    {/* 다른 앨범 리스트 */}
                    <div className="artist-album-list">
                        <h2>이 아티스트의 다른 곡 더보기</h2>
                        <div className="album-covers-container">
                            {otherTracks && otherTracks.length > 0 ? (
                                otherTracks.map(track => (
                                    <div className="cover-item" key={track.musicNo} onClick={() => handleImageClick(track.musicNo)}>
                                        <img src={track.imageName} alt={track.title} />
                                        <p>{track.title}</p>
                                    </div>
                                ))
                            ) : (
                                <p>다른 곡이 없습니다.</p> // 다른 곡이 없는 경우 메시지 표시
                            )}
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

                        {/* 반복되는 댓글 구조는 동일하게 유지하며 JSX 스타일 */}
                        {/* 다른 댓글 섹션들 */}
                        {/* ... 생략된 다른 댓글 섹션 ... */}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Detail;
