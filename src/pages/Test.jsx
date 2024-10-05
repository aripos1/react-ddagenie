// import 라이브러리
import React, { useEffect, useState } from 'react';
import axios from 'axios';

//import 컴포넌트

//import css
const Test = () => {
    /*---상태관리 변수들(값이 변화면 화면 랜더링) ----------*/
    const [message, setMessage] = useState('');

    /*---일반 메소드 --------------------------------------------*/

    /*---생명주기 + 이벤트 관련 메소드 ----------------------*/
    useEffect(() => {
        // Spring Boot API 호출
        axios.get('http://localhost:8888/api/test')
            .then(response => {
                setMessage(response.data); // API로부터 받은 데이터를 상태로 설정
            })
            .catch(error => {
                console.error("There was an error!", error);
            });
    }, []);

    return (
        <>

        
                이름출력
    

            <h1>{message}</h1>

        </>
    );
}

export default Test;