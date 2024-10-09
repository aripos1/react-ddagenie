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
        const fetchData = async () => {
            if (no) {
                try {
                    // 음악 정보 가져오기
                    const musicResponse = await axios.get(`http://localhost:8888/api/music/${no}`, {
                        headers: { "Content-Type": "application/json; charset=utf-8" }
                    });
                    
                    console.log('음악 정보 응답:', musicResponse.data); // 응답 로그

                    if (musicResponse.data.result === 'success') {
                        const musicVo = musicResponse.data.apiData;
                        setTitle(musicVo.title);
                        setArtistname(musicVo.artistName);
                        setGenre(musicVo.genre);
                        setReleasedDate(musicVo.releasedDate);
                        setLikecount(musicVo.likeCount);
                        setMusiccontent(musicVo.musicContent);
                        setImagename(musicVo.imageName);
                        setArtistNo(musicVo.artistNo);
                        
                        // 다른 곡 가져오기
                        const tracksResponse = await axios.get(`http://localhost:8888/api/music/artist/${musicVo.artistNo}/${no}`);
                        console.log('다른 곡 응답:', tracksResponse.data); // 응답 로그
                        if (tracksResponse.data.result === 'success') {
                            setOtherTracks(tracksResponse.data.apiData);
                        }
                        
                        // 댓글 데이터 가져오기
                        const commentsResponse = await axios.get(`http://localhost:8888/api/comments/${no}`);
                        console.log('댓글 응답:', commentsResponse.data); // 응답 로그
                        if (commentsResponse.data.result === 'success') {
                            setComments(commentsResponse.data.apiData);
                        } else {
                            console.error('댓글 데이터 오류:', commentsResponse.data.message);
                        }
                    } else {
                        console.error('음악 데이터 오류:', musicResponse.data.message);
                    }
                } catch (error) {
                    console.error('API 호출 오류:', error);
                }
            }
        };

        fetchData();
    }, [no]);

    // 댓글 등록 처리
    const handleCommentSubmit = (event) => {
        event.preventDefault();
       
        if (!userNo) {
            alert('로그인 후 댓글을 달 수 있습니다.');
            return;
        }

        if (!newComment.trim()) {
            alert('댓글을 입력하세요.');
            return;
        }

        const commentData = {
            userNo: userNo,
            musicNo: no,
            reContent: newComment,
            parentNo: 0, // 부모 댓글이 없으므로 0 설정
            createdDate: new Date().toISOString().slice(0, 19).replace('T', ' '), // 현재 날짜
        };

        axios.post('http://localhost:8888/api/comments/add', commentData, {
            headers: {
                "Content-Type": "application/json; charset=utf-8" // 헤더 설정
            }
        })
        .then(response => {
            console.log('댓글 등록 응답:', response.data); // 응답 로그
            if (response.data.result === 'success') {
                // 댓글 추가 후 입력값 초기화
                setNewComment('');
                const newCommentData = {
                    ...commentData,
                    comment_no: response.data.comment_no // 새 댓글의 ID
                };
                setComments(prevComments => [...prevComments, newCommentData]);
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
            userNo: userNo,
            musicNo: no,
            reContent: replyContent,
            parentNo: parentNo, // 부모 댓글 번호
            likeNo: 0, // 좋아요 수 초기값
            createdDate: new Date().toISOString().slice(0, 19).replace('T', ' '), // 현재 날짜
        };

        axios.post(`http://localhost:8888/api/comments/reply`, replyData)
            .then(response => {
                console.log('대댓글 등록 응답:', response.data); // 응답 로그
                if (response.data.result === 'success') {
                    // 대댓글 추가 후 입력값 초기화
                    setReplyContent('');
                    const newReplyData = {
                        ...replyData,
                        comment_no: response.data.comment_no // 새 대댓글의 ID
                    };
                    setComments(prevComments => [...prevComments, newReplyData]); // 대댓글 추가
                }
            })
            .catch(error => {
                console.error('대댓글 등록 오류:', error);
            });
    };

    const handleReplyToggle = (comment) => {
        const replyForm = document.getElementById(`reply-form-${comment.comment_no}`);
        if (replyForm) {
            replyForm.style.display = replyForm.style.display === 'none' ? 'block' : 'none';
        }
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
                                <div className="comment-item" key={comment.commentNo}>
                                    <p><strong>{comment.userName}</strong> <span>{comment.createdDate}</span></p>
                                    <p>{comment.reContent}</p>
                                    <button className="reply-toggle" onClick={() => handleReplyToggle(comment)}>대댓글 보기</button>
                                    {/* 대댓글 리스트 */}
                                    <div id={`reply-form-${comment.comment_no}`} className="reply-form" style={{ display: 'none' }}>
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



