import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../assets/css/musicAdmin.css';

const MusicInsert = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [artistNo, setArtistNo] = useState(''); // 아티스트 번호 상태
    const [genre, setGenre] = useState('');
    const [releasedDate, setReleasedDate] = useState('');
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState(null);
    const [fileUrl, setFileUrl] = useState(null);
    const [artists, setArtists] = useState([]); // 아티스트 목록 상태
    
    // 아티스트 목록 불러오기
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/artists`)
            .then(response => {
                console.log('API Response:', response.data);
                if (response.data && Array.isArray(response.data.apiData)) {
                    setArtists(response.data.apiData);
                } else {
                    console.error('Error: Expected array but got', typeof response.data.apiData);
                    setArtists([]);
                }
            })
            .catch(error => {
                console.error('Error fetching artists:', error);
                setArtists([]);
            });
    }, []);

    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleArtistChange = (e) => setArtistNo(e.target.value); // 아티스트 선택 시 번호로 업데이트
    const handleGenreChange = (e) => setGenre(e.target.value);
    const handleReleasedDateChange = (e) => setReleasedDate(e.target.value);
    const handleContentChange = (e) => setContent(e.target.value);
    const handleImageChange = (e) => setImageUrl(e.target.files[0]);
    const handleFileChange = (e) => setFileUrl(e.target.files[0]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('artistNo', artistNo); // 아티스트 번호 전송
        formData.append('genre', genre);
        formData.append('releasedDate', releasedDate);
        formData.append('musicContent', content);
        formData.append('imageUrl', imageUrl);
        formData.append('fileUrl', fileUrl);

        axios.post(`${process.env.REACT_APP_API_URL}/api/musicAdmins`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then(response => {
            console.log(response);
            alert('음원이 성공적으로 등록되었습니다.');
            navigate('/admin/musicadmin');
        })
        .catch(error => {
            console.error(error);
            alert('음원 등록 중 오류가 발생했습니다.');
        });
    };

    return (
        <div id="wrap-main">
            <h2>음원 등록</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <label htmlFor="title">음원 제목</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="음원 제목을 입력하세요"
                    required
                />

                <label htmlFor="artist">아티스트(가수)</label>
                <select
                    id="artist"
                    value={artistNo} // 선택된 아티스트 번호를 상태로 설정
                    onChange={handleArtistChange} // 아티스트 선택 시 번호 업데이트
                    required
                >
                    <option value="">아티스트를 선택하세요</option>
                    {artists.map(artist => (
                        <option key={artist.artistNo} value={artist.artistNo}>
                            {artist.artistName}
                        </option>
                    ))}
                </select>

                <label htmlFor="genre">장르</label>
                <select id="genre" value={genre} onChange={handleGenreChange} required>
                    <option value="">장르를 선택하세요</option>
                    <option value="Pop">Pop</option>
                    <option value="Rock">Rock</option>
                    <option value="HipHop">HipHop</option>
                    <option value="Kizz">Kizz</option>
                    <option value="Classical">Classical</option>
                </select>

                <label htmlFor="releasedDate">발매일</label>
                <input type="date" id="releasedDate" value={releasedDate} onChange={handleReleasedDateChange} required />

                <label htmlFor="content">음원 소개</label>
                <input
                    type="text"
                    id="content"
                    value={content}
                    onChange={handleContentChange}
                    placeholder="음원 소개를 입력하세요 (옵션)"
                />

                <label htmlFor="musicImage">음원 이미지</label>
                <input type="file" id="musicImage" name="musicImage" onChange={handleImageChange} required />

                <label htmlFor="musicFile">음원 파일 업로드</label>
                <input type="file" id="musicFile" name="musicFile" onChange={handleFileChange} accept=".mp3,.wav,.flac" required />

                <button type="submit">음원 등록</button>
            </form>
        </div>
    );
};

export default MusicInsert;
