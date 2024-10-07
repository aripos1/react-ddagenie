// ArtistInsert.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../assets/css/musicAdmin.css';

const ArtistInsert = () => {
    const [artistName, setArtistName] = useState('');
    const navigate = useNavigate();

    const handleArtistNameChange = (e) => {
        setArtistName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`${process.env.REACT_APP_API_URL}/api/artists`, { artistName })
            .then(response => {
                console.log(response);
                alert('아티스트가 성공적으로 등록되었습니다.');
                navigate('/api/artists'); // 아티스트 목록 페이지로 리다이렉트
            })
            .catch(error => {
                console.error(error);
                alert('아티스트 등록 중 오류가 발생했습니다.');
            });
    };

    return (
        <div id="wrap-main">
            <h2>아티스트 등록</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="artistName">아티스트 이름</label>
                <input
                    type="text"
                    id="artistName"
                    name="artistName"
                    value={artistName}
                    onChange={handleArtistNameChange}
                    placeholder="아티스트 이름을 입력하세요"
                    required
                />
                <button type="submit">등록</button>
            </form>
        </div>
    );
};

export default ArtistInsert;
