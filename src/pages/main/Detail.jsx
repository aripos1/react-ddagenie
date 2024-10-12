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
    const [comments, setComments] = useState([]); // 댓글 상태
    const [newComment, setNewComment] = useState(''); // 새 댓글 입력 상태
    const [replyContents, setReplyContents] = useState({}); // 댓글 번호별 대댓글 상태
    const [userNo, setUserNo] = useState(null); // 사용자 ID 상태
    const [musicNo, setMusicNo] = useState('');
    const [fileUrl, setFileUrl] = useState('');
    const [artist, setArtist] = useState('');
    const navigate = useNavigate();
    const { no } = useParams();
    const [authUser, setAuthUser] = useState(null);
    // 사용자 로그인 상태 확인
    useEffect(() => {
        const authUser = JSON.parse(localStorage.getItem('authUser')); // authUser를 객체로 변환
        const loggedUserNo = authUser ? authUser.no : null; // no를 가져옴
        setUserNo(loggedUserNo); // 상태에 저장
    }, []);

    // 로그인 유저 정보 가져오기 (localStorage)
    useEffect(() => {
        const storedUser = localStorage.getItem('authUser');
        if (storedUser) {
            setAuthUser(JSON.parse(storedUser));
        }
    }, []);


// 음악 정보와 댓글 목록 가져오기
useEffect(() => {
    const fetchData = async () => {
        if (no) {
            try {
                // 음악 정보 가져오기
                const musicResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/detail/${no}`, {
                    headers: { "Content-Type": "application/json; charset=utf-8" }
                });
                
                // 전체 API 응답 확인
                console.log('API Response:', musicResponse.data);
                
                if (musicResponse.data.result === 'success') {
                    const musicVo = musicResponse.data.apiData;

                    // releasedDate를 'YYYY년 MM월 DD일' 형식으로 변환
                    const formattedReleasedDate = new Date(musicVo.releasedDate).toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    });

                    setTitle(musicVo.title);
                    setArtistname(musicVo.artistName);
                    setGenre(musicVo.genre);
                    setReleasedDate(formattedReleasedDate);

                    // 좋아요 개수 콘솔 출력
                    console.log('Like Count:', musicVo.likeCount);
                    setLikecount(musicVo.likeCount);  // 쿼리에서 가져온 좋아요 개수 설정
                    
                    setMusiccontent(musicVo.musicContent);
                    setImagename(musicVo.imageName);
                    setArtistNo(musicVo.artistNo);
                    setMusicNo(musicVo.musicNo);
                    setFileUrl(musicVo.fileUrl); // 올바른 설정

                    // 다른 곡 가져오기
                    const tracksResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/music/artist/${musicVo.artistNo}/${no}`);
                    if (tracksResponse.data.result === 'success') {
                        setOtherTracks(tracksResponse.data.apiData);
                    }

                    // 댓글 데이터 가져오기
                    const commentsResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/comments/${no}`);
                    if (commentsResponse.data.result === 'success') {
                        setComments(commentsResponse.data.apiData);
                    }
                } else {
                    console.error('Failed to fetch music details:', musicResponse.data.message);
                }
            } catch (error) {
                console.error('API 호출 오류:', error);
            }
        }
    };

    fetchData();
}, [no]);


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

        axios.post(`${process.env.REACT_APP_API_URL}/api/comments/add`, commentData, {
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        })
            .then(response => {
                if (response.data.result === 'success') {
                    setNewComment('');
                    const newCommentData = {
                        ...commentData,
                        commentNo: response.data.comment_no // 새 댓글의 ID
                    };
                    // 새 댓글을 맨 위에 추가
                    setComments(prevComments => [newCommentData, ...prevComments]);
                    navigate(0);
                }
            })
            .catch(error => {
                console.error('댓글 등록 오류:', error);
            });
    };

    // 대댓글 입력 필드 값 처리
    const handleReplyChange = (commentNo, value) => {
        setReplyContents(prevState => ({
            ...prevState,
            [commentNo]: value  // 댓글 번호에 맞는 대댓글 입력 값만 변경
        }));
    };


    // 대댓글 등록 처리
    const handleReplySubmit = (e, parentNo) => {
        e.preventDefault();

        if (!userNo) {
            alert('로그인 후 대댓글을 달 수 있습니다.');
            return;
        }

        const replyContent = replyContents[parentNo]; // 해당 댓글 번호의 대댓글 입력값

        if (!replyContent.trim()) {
            alert('대댓글을 입력하세요.');
            return;
        }

        const replyData = {
            userNo: userNo,
            musicNo: no,
            reContent: replyContent,
            parentNo: parentNo, // 부모 댓글 번호
            createdDate: new Date().toISOString().slice(0, 19).replace('T', ' '), // 현재 날짜
        };

        axios.post(`${process.env.REACT_APP_API_URL}/api/comments/reply`, replyData, {
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        })
            .then(response => {
                console.log('대댓글 API 응답:', response.data);
                if (response.data.result === 'success') {
                    // 대댓글 등록 후 입력란 초기화
                    setReplyContents(prevState => ({
                        ...prevState,
                        [parentNo]: '' // 대댓글 입력란 초기화
                    }));

                    // 새 대댓글의 ID를 받아와서 댓글 리스트에 추가
                    const newReplyData = {
                        ...replyData,
                        commentNo: response.data.data // 새 대댓글의 commentNo
                    };

                    // 댓글 배열에서 해당 부모 댓글의 replies 배열에 대댓글 추가
                    setComments(prevComments => {
                        return prevComments.map(comment => {
                            if (comment.commentNo === parentNo) {
                                return {
                                    ...comment,
                                    replies: [...(comment.replies || []), newReplyData] // 대댓글 추가
                                };
                            }
                            return comment;

                        });
                    });
                    navigate(0);
                } else {
                    console.error('대댓글 등록 실패:', response.data.message);
                }
            })
            .catch(error => {
                console.error('대댓글 등록 오류:', error);
            });
    };
    // 대댓글 보이기/숨기기 토글 처리
    const handleReplyToggle = (parentNo) => {
        setComments(prevComments => {
            return prevComments.map(comment => {
                if (comment.commentNo === parentNo) {
                    // 대댓글이 보이지 않으면 새로 대댓글을 가져오고, 보이게 설정
                    if (!comment.isReplyVisible) {
                        axios.get(`${process.env.REACT_APP_API_URL}/api/comments/${no}`)
                            .then(commentsResponse => {
                                if (commentsResponse.data.result === 'success') {
                                    // 대댓글 목록을 해당 댓글에 반영
                                    setComments(prevComments =>
                                        prevComments.map(cmt => {
                                            if (cmt.commentNo === parentNo) {
                                                return {
                                                    ...cmt,
                                                    replies: commentsResponse.data.apiData.filter(c => c.parentNo === parentNo)
                                                };
                                            }
                                            return cmt;
                                        })
                                    );
                                }
                            })
                            .catch(error => {
                                console.error('대댓글 목록 불러오기 실패:', error);
                            });
                    }
                    return {
                        ...comment,
                        isReplyVisible: !comment.isReplyVisible // 대댓글 보이기 상태 토글
                    };
                }
                return comment;
            });
        });
    };

    const handleCommentDelete = (commentNo) => {
        if (!window.confirm("댓글을 삭제하시겠습니까?")) {
            return;
        }

        axios.delete(`${process.env.REACT_APP_API_URL}/api/comments/delete/${commentNo}`)
            .then(response => {
                if (response.data.result === 'success') {
                    setComments(prevComments => prevComments.filter(comment => comment.commentNo !== commentNo));
                } else {
                    console.error('댓글 삭제 실패:', response.data.message);
                }
            })
            .catch(error => {
                console.error('댓글 삭제 오류:', error);
            });
    };

    const handleReplyDelete = (parentNo, commentNo) => {
        if (!window.confirm("대댓글을 삭제하시겠습니까?")) {
            return;
        }

        axios.delete(`${process.env.REACT_APP_API_URL}/api/comments/reply/delete/${commentNo}`, {
            data: { parentNo }  // 부모 댓글 번호
        })
            .then(response => {
                if (response.data.result === 'success') {
                    setComments(prevComments => prevComments.map(comment => {
                        if (comment.commentNo === parentNo) {
                            return {
                                ...comment,
                                replies: comment.replies.filter(reply => reply.commentNo !== commentNo) // 해당 대댓글 삭제
                            };
                        }
                        return comment;
                    }));
                } else {
                    console.error('대댓글 삭제 실패:', response.data.message);
                }
            })
            .catch(error => {
                console.error('대댓글 삭제 오류:', error);
            });
    };

    // 팝업 열기 (유저 넘버만 전달)
    const openPlayerPopup = (userNo) => {
        const width = window.innerWidth > 735 ? 735 : window.innerWidth - 20;
        const height = window.innerHeight > 460 ? 460 : window.innerHeight - 20;
        const popupOptions = `width=${width},height=${height},resizable=yes,scrollbars=no`;
        const popupUrl = `/music/musicplayer?userNo=${encodeURIComponent(userNo)}`;
        window.open(popupUrl, 'Music Player', popupOptions);
    };

    // 재생 + 재생목록에 추가 (이용권 상태 체크 추가)
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
    // 마이뮤직에 추가 (이용권 상태 체크 추가)
    const handleAddToMyMusic = async (musicNo, title, artistName) => {
        if (!authUser) {
            alert("로그인 해주세요.");
            return;
        }

        // 이용권 상태 확인
        if (authUser.ticket_status !== "이용중" && authUser.ticket_status !== "해지중") {
            alert('이용권이 필요합니다.');
            return;
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/mymusic/add`, {
                userNo: authUser.no,
                musicNos: [musicNo],
            });

            if (response.status === 200) {
                // 곡 정보 포함 알림창 표시
                alert(`🎉 "${title}" - ${artistName} 곡이 내 MY MUSIC에 추가됐어! 🚀`);
                console.log('곡이 마이뮤직에 추가되었습니다:', response.data);
            } else {
                console.error('마이뮤직에 곡 추가 실패');
            }
        } catch (error) {
            console.error('Error adding song to MyMusic:', error);
        }
    };
    return (
        <>
            <Header />
            <div id="wrap-body" className="clearfix">
                <div className="page-main-container">
                    {/* 앨범 이미지와 정보 */}
                    <div className="listalbum-section">
                        <div className="listalbum-cover">
                            <img src={imageName} alt="노래 이미지" className="album-img" />
                        </div>
                        <div className="listalbum-info">
                            <h1>{title}</h1> <br />
                            <div className='sing-info'>
                                <p>아티스트: {artistName}</p><br />
                                <p>장르: {genre}</p><br />
                                <p>발매일: {releasedDate}</p><br />
                            </div>
                            <div className="buttons">
                                <button className="icon-btn play-btn"

                                    onClick={() => handlePlayAndAddToPlaylist(
                                        musicNo,
                                        title,
                                        artistName,
                                        fileUrl
                                    )}
                                > ▶</button>
                                <button className="icon-btn plus-btn"

                                    onClick={() => handleAddToMyMusic(
                                        musicNo,
                                        title,
                                        artistName
                                    )}
                                >+</button>
                                <span className="like-count">❤️ {likeCount}</span> {/* 좋아요 개수 표시 */}
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
                            />
                            <button className="comment-submit" onClick={handleCommentSubmit}>
                                댓글 등록
                            </button>

                        </div>

                        {/* 댓글 목록 */}


                        {comments.filter(comment => comment.parentNo === 0).map(comment => (
                            <div className="comment-item" key={comment.commentNo}>
                                <p><strong>{comment.userName}</strong> <span>{comment.createdDate}</span></p>
                                <p>{comment.reContent}</p>
                                {/* 댓글 삭제 버튼 (자기 글만 삭제 가능) */}
                                {comment.userNo === userNo && (
                                    <button className="delete-btn" onClick={() => handleCommentDelete(comment.commentNo)}>
                                        삭제
                                    </button>
                                )}
                                <button className="reply-toggle" onClick={() => handleReplyToggle(comment.commentNo)}>
                                    {comment.isReplyVisible ? '댓글 숨기기' : '댓글 보기'}
                                </button>

                                {/* 대댓글 출력 */}
                                {comment.isReplyVisible && (
                                    <div className="reply-container">
                                        {comment.replies && comment.replies.length > 0 ? (
                                            comment.replies.map(reply => (
                                                <div key={reply.commentNo} className="reply-item">
                                                    <p><strong>{reply.userName}</strong> <span>{reply.createdDate}</span></p>
                                                    <p>{reply.reContent}</p>
                                                    {/* 댓글 삭제 버튼 (자기 글만 삭제 가능) */}

                                                    {/* 대댓글 삭제 버튼 (자기 글만 삭제 가능) */}
                                                    {reply.userNo === userNo && (
                                                        <button className="delete-btn" onClick={() => handleReplyDelete(comment.commentNo, reply.commentNo)}>
                                                            삭제
                                                        </button>
                                                    )}
                                                </div>
                                            ))
                                        ) : (
                                            <p><br />대댓글이 없습니다.</p>
                                        )}

                                        {/* 대댓글 작성 폼 */}
                                        <div id={`reply-form-${comment.commentNo}`} className="reply-form">
                                            <textarea
                                                className="reply-input"
                                                placeholder="댓글을 입력하세요..."
                                                value={replyContents[comment.commentNo] || ''}
                                                onChange={(e) => handleReplyChange(comment.commentNo, e.target.value)}
                                            />
                                            <button className="reply-submit" onClick={(e) => handleReplySubmit(e, comment.commentNo)}>
                                                댓글 등록
                                            </button>

                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Detail;