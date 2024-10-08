//import 라이브러리

import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import '../../assets/css/musicAdmin.css';

const ItemMusic = ( props ) => {

    /*---라우터 관련-------------------------------*/

    /*---상태관리 변수들(값이 변화면 화면 랜더링 )---*/

    /*---일반 변수--------------------------------*/
    const { music, musicList } = props;
    


    /*---일반 메소드 -----------------------------*/

    /*---훅(useEffect)+이벤트(handle)메소드-------*/
    const handleDelete = () => {
        console.log('handleDelete');

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





    return (

        <>

            
                <tr>
                    

                    <td>{music.title}</td>
                    <td>{music.artistName}</td>
                    <td>{music.genre}</td>
                    <td>{music.releasedDate}</td>
                    <td>{music.musicContent}</td>
                    <td><Link to={`/admin/musicupdate/${music.musicNo}`} className="action-btn" rel="noreferrer noopener">수정</Link></td>
                    <td><input type="button" value="삭제" className="action-btn delete-btn" onClick={handleDelete} /></td>
                

                
                        
                </tr>



        </>

    );

}

export default ItemMusic;