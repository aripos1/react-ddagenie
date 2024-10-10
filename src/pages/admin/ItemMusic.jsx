//import 라이브러리

import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import '../../assets/css/musicAdmin.css';

const ItemMusic = ( props ) => {

    const { music, musicList } = props;
    

    const handleDelete = () => {

        const confirmDelete = window.confirm("삭제하시겠습니까?");

        if (confirmDelete) {
            
            console.log("삭제가 승인되었습니다.");

            axios.delete(`${process.env.REACT_APP_API_URL}/api/musicAdmins/${music.musicNo}`)
                .then(response => {
                    console.log(response.data); //수신데이타
                    alert('삭제되었습니다.');
                    musicList();
                })
                .catch(error => {
                    console.error('삭제 중 오류가 발생했습니다:', error);
                });

        } else {
            console.log("삭제가 취소되었습니다.");
        }


    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 월을 2자리로
        const day = String(date.getDate()).padStart(2, '0'); // 일을 2자리로
        return `${year}-${month}-${day}`; // YYYY-MM-DD 형식
    };





    return (

        <>

            
                <tr>
                    
                    <td>{music.musicNo}</td>
                    <td>{music.title}</td>
                    <td>{music.artistName}</td>
                    <td>{music.genre}</td>
                    <td>{formatDate(music.releasedDate)}</td>
                    <td>{music.musicContent}</td>
                    <td><Link to={`/admin/musicupdate/${music.musicNo}`} className="action-btn" rel="noreferrer noopener">수정</Link></td>
                    <td><input type="button" value="삭제" className="delete-btn" onClick={handleDelete} /></td>
                
                </tr>



        </>

    );

}

export default ItemMusic;