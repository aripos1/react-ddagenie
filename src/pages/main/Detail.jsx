import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

// 헤더 푸터 및 css
import Header from '../include/Header';
import '../../assets/css/Detail.css';

const Detail = () => {
    const [title, setTitle] = useState('');
    const [artistName, setArtistname] = useState('');
    const [genre, setGenre] = useState('');
    const [releasedDate, setReleasedDate] = useState('');
    const [likeCount, setLikecount] = useState('');
    const [musicContent, setMusiccontent] = useState('');
    const [imageName, setImagename] = useState('');
    const [artistNo, setArtistNo] = useState(null);
    const [otherTracks, setOtherTracks] = useState([]);
    const [comments, setComments] = useState([]); // 댓글 상태 추가
    const [newComment, setNewComment] = useState(''); // 새 댓글 입력 상태 추가
    const [replyContent, setReplyContent] = useState(''); // 대댓글 입력 상태 추가
    const [userNo, setUserNo] = useState(null); // 사용자 ID 상태 추가
    const navigate = useNavigate();
    const { no } = useParams();

    // 사용자 로그인 상태 확인 (예: localStorage 또는 Redux 사용)
    useEffect(() => {
        const authUser = JSON.parse(localStorage.getItem('authUser')); // authUser를 객체로 변환
        const loggedUserNo = authUser ? authUser.no : null; // no를 가져옴
        setUserNo(loggedUserNo); // 상태에 저장
        console.log(localStorage);
    }, []);
    // 음악 정보와 댓글 목록 가져오기
    useEffect(() => {
        if (no) {
            axios.get(`http://localhost:8888/api/music/${no}`, {
                headers: { "Content-Type": "application/json; charset=utf-8" }
            })
            .then(response => {
                if (response.data.result === 'success') {
                    const musicVo = response.data.apiData;
                    setTitle(musicVo.title);
                    setArtistname(musicVo.artistName);
                    setGenre(musicVo.genre);
                    setReleasedDate(musicVo.releasedDate);
                    setLikecount(musicVo.likeCount);
                    setMusiccontent(musicVo.musicContent);
                    setImagename(musicVo.imageName);
                    setArtistNo(musicVo.artistNo);
                    return axios.get(`http://localhost:8888/api/music/artist/${musicVo.artistNo}/${no}`);
                }
            })
            .then(response => {
                if (response.data.result === 'success') {
                    setOtherTracks(response.data.apiData);
                }
            })
            .catch(error => {
                console.error('API 호출 오류:', error);
            });

            // 댓글 데이터 가져오기
            axios.get(`http://localhost:8888/api/comments/${no}`)
                .then(response => {
                    if (response.data.result === 'success') {
                        setComments(response.data.apiData);
                    }
                })
                .catch(error => {
                    console.error('댓글 데이터 가져오기 오류:', error);
                });
        }
    }, [no]);

    // 댓글 등록 처리
    const handleCommentSubmit = () => {
        if (!userNo) {
            alert('로그인 후 댓글을 달 수 있습니다.');
            return;
        }

        if (!newComment.trim()) {
            alert('댓글을 입력하세요.');
            return;
        }

        const commentData = {
            user_no: userNo,
            music_no: no,
            re_content: newComment,
            parent_no: 0, // 부모 댓글이 없으므로 0 설정
            like_no: 0, // 좋아요 수 초기값
            created_date: new Date().toISOString().slice(0, 19).replace('T', ' '), // 현재 날짜
        };

        axios.post(`http://localhost:8888/api/comments/add`, commentData)
            .then(response => {
                if (response.data.result === 'success') {
                    // 댓글 추가 후 입력값 초기화
                    setNewComment('');
                    setComments([...comments, { ...commentData, comment_no: response.data.comment_no }]); // 새 댓글 추가
                }
            })
            .catch(error => {
                console.error('댓글 등록 오류:', error);
            });
    };

    // 대댓글 등록 처리
    const handleReplySubmit = (parentNo) => {
        if (!userNo) {
            alert('로그인 후 대댓글을 달 수 있습니다.');
            return;
        }

        if (!replyContent.trim()) {
            alert('대댓글을 입력하세요.');
            return;
        }

        const replyData = {
            user_no: userNo,
            music_no: no,
            re_content: replyContent,
            parent_no: parentNo, // 부모 댓글 번호
            like_no: 0, // 좋아요 수 초기값
            created_date: new Date().toISOString().slice(0, 19).replace('T', ' '), // 현재 날짜
        };

        axios.post(`http://localhost:8888/api/comments/reply`, replyData)
            .then(response => {
                if (response.data.result === 'success') {
                    // 대댓글 추가 후 입력값 초기화
                    setReplyContent('');
                    // 댓글 목록 다시 가져오기
                    setComments([...comments, { ...replyData, comment_no: response.data.comment_no }]); // 대댓글 추가
                }
            })
            .catch(error => {
                console.error('대댓글 등록 오류:', error);
            });
    };

    const handleReplyToggle = (comment) => {
        // 대댓글 보기 토글 기능을 구현
        // 추가 로직 필요
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
                                <span className="like-count">좋아요 수: {likeCount}</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* 소개문구 */}
                    <div className="song-description-section">
                        <h2>곡 소개</h2>
                        <p>{musicContent}</p>
                    </div>

                    {/* 다른 앨범 리스트 */}
                    <div className="artist-album-list">
                        <h2>이 아티스트의 다른 곡 더보기</h2>
                        <div className="album-covers-container">
                            {otherTracks.map(track => (
                                <div className="cover-item" key={track.musicNo} onClick={() => navigate(`/main/detail/${track.musicNo}`)}>
                                    <img src={track.imageName} alt={track.title} />
                                    <p>{track.title}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* 댓글 섹션 */}
                    <div className="comments-section">
                        <h3>댓글</h3>

                        {/* 댓글 입력 폼 */}
                        <div className="comment-form">
                            <textarea 
                                className="comment-input" 
                                placeholder="댓글을 입력하세요..." 
                                maxLength="140" 
                                value={newComment} 
                                onChange={(e) => setNewComment(e.target.value)} 
                            ></textarea>
                            <button className="comment-submit-button" onClick={handleCommentSubmit}>댓글 등록</button>
                        </div>

                        {/* 댓글 리스트 */}
                        <div className="comment-section">
                            {comments.map(comment => (
                                <div className="comment-item" key={comment.comment_no}>
                                    <p><strong>{comment.user_no}</strong> <span>{comment.created_date}</span></p>
                                    <p>{comment.re_content}</p>
                                    <button className="reply-toggle" onClick={() => handleReplyToggle(comment)}>대댓글 보기</button>
                                    {/* 대댓글 리스트 */}
                                    {/* 대댓글 UI 추가 */}
                                    <div className="reply-form" style={{ display: 'none' }}>
                                        <textarea 
                                            className="reply-input" 
                                            placeholder="대댓글을 입력하세요..." 
                                            value={replyContent} 
                                            onChange={(e) => setReplyContent(e.target.value)} 
                                        />
                                        <button className="reply-submit" onClick={() => handleReplySubmit(comment.comment_no)}>대댓글 등록</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Detail;
