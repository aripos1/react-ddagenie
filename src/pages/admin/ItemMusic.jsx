//import 라이브러리

import React from 'react';
import { Link } from 'react-router-dom';

import '../../assets/css/musicAdmin.css';

const ItemMusic = ( props ) => {

    /*---라우터 관련-------------------------------*/

    /*---상태관리 변수들(값이 변화면 화면 랜더링 )---*/

    /*---일반 변수--------------------------------*/
    const { music, deleteMusic, updateMusic } = props;
    console.log(music.musicNo);
    console.log(updateMusic());
    console.log(deleteMusic());
    


    /*---일반 메소드 -----------------------------*/

    /*---훅(useEffect)+이벤트(handle)메소드-------*/





    return (

        <>

            
                <tr>
                    

                    <td>{music.title}</td>
                    <td>{music.artistName}</td>
                    <td>{music.genre}</td>
                    <td>{music.releasedDate}</td>
                    <td>{music.musicContent}</td>
                    <td><Link to={`/admin/musicupdate/${music.musicNo}`} className="action-btn" rel="noreferrer noopener">수정</Link></td>
                    <td><Link to="" className="action-btn delete-btn" rel="noreferrer noopener">삭제</Link></td>
                

                
                        
                </tr>



        </>

    );

}

export default ItemMusic;