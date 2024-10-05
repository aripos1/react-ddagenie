// import 라이브러리
import React, { useEffect, useState } from 'react';
import axios from 'axios';

//import 컴포넌트

//import css
const TestList = () => {
    /*---상태관리 변수들(값이 변화면 화면 랜더링) ----------*/
    const [users, setUsers] = useState([]);  // 사용자 데이터를 저장할 상태

    /*---생명주기 + 이벤트 관련 메소드 ----------------------*/
    useEffect(() => {
        // Spring Boot API 호출
        axios.get('http://localhost:8888/api/users')  // 사용자 리스트를 가져오는 API
            .then(response => {
                setUsers(response.data);  // API로부터 받은 데이터를 상태로 설정
            })
            .catch(error => {
                console.error("There was an error!", error);  // 에러 처리
            });
    }, []);  // 컴포넌트가 처음 렌더링될 때만 실행

    return (
        <>
            <h1>사용자 목록</h1>
            <ul>
                {users.map(user => (  // users 리스트를 반복문으로 출력
                    <li key={user.no}>
                        {user.no}: {user.name}
                    </li>
                ))}
            </ul>
        </>
    );
}

export default TestList;
