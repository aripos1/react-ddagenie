//import 라이브러리
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // axios 임포트

import Header from '../include/header';
import Footer from '../include/footer';

//css
import '../../assets/css/all.css';
import '../../assets/css/footer.css';
import '../../assets/css/jjinUtilize.css';
import '../../assets/css/userinfo.css';

//images
import searchIcon from '../../assets/images/search.png';
import profileImage from '../../assets/images/default_img.webp';
import customProfile from '../../assets/images/default_img2.png';

const UserInfo = () => {
    /*---라우터관련-----*/
    const navigate = useNavigate();

    /*---상태관리 변수들(값이 변화면 화면 랜더링 )--*/
    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [profile, setProfile] = useState(profileImage);
    const [selectedFile, setSelectedFile] = useState(null);

    // 탈퇴관련 변수
    const [showConfirm, setShowConfirm] = useState(false);

    /*---일반변수--------------------------------*/
    const token = localStorage.getItem('token');

    /*---일반메소드 -----------------------------*/
    // 프로필 사진 업로드 핸들러
    const handleProfileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);

        // 업로드된 파일 미리보기
        const reader = new FileReader();
        reader.onload = () => {
            setProfile(reader.result);
        };
        reader.readAsDataURL(file);
    };

    /*---훅(useEffect)+이벤트(handle)메소드------*/
    // 사용자 정보 불러오기 (마운트 시 실행)
    useEffect(() => {
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}/api/users/me`,
            headers: { "Authorization": `Bearer ${token}` },

        }).then(response => {
            if (response.data && response.data.apiData) {
                const userVo = response.data.apiData;
                setName(userVo.name || '')
                setId(userVo.id || '');  // id가 없을 경우 빈 문자열로 설정
                setPw(userVo.password || '');  // password가 없을 경우 빈 문자열로 설정
                setPhone(userVo.phone || '');  // phone이 없을 경우 빈 문자열로 설정
                setAddress(userVo.address || '');  // address가 없을 경우 빈 문자열로 설정
                setProfile(`${process.env.REACT_APP_API_URL}/upload/${userVo.profile || profileImage}`);  // 프로필 이미지가 없을 경우 기본 이미지 사용
            } else {
                console.error('No user data found');
            }
        }).catch(error => {
            console.error('유저 정보 로딩 실패:', error);
        });
    }, [token]);


    //확인버튼 클릭 이벤트
    // 폼 제출 핸들러 (회원정보 수정)
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('password', pw);
        formData.append('phone', phone);
        formData.append('address', address);
        if (selectedFile) {
            formData.append('profile', selectedFile);
        }

        axios({
            method: 'put',
            url: `${process.env.REACT_APP_API_URL}/api/users/me`,
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            },
            data: formData,
        }).then(response => {
            if (response.data.result === 'success') {
                alert('회원정보 수정 완료');
                navigate('/user/info');
            } else {
                alert('수정 실패');
            }
        }).catch(error => {
            console.error('회원정보 수정 실패:', error);
        });
    };

    //탈퇴창 관련
    const handleDeleteAccount = () => {
        setShowConfirm(true);
    };

    // 탈퇴 확인 (탈퇴 처리)
    const handleConfirmYes = () => {
        axios({
            method: 'delete',  // 실제 탈퇴는 DELETE 메소드로 처리
            url: `${process.env.REACT_APP_API_URL}/api/users/me`,
            headers: { "Authorization": `Bearer ${token}` },
        }).then(response => {
            if (response.status === 200) {
                alert('후회할거야...');
                localStorage.removeItem('token'); // 로컬 스토리지에서 토큰 제거
                localStorage.removeItem('authUser');
                navigate('/login'); // 탈퇴 후 홈으로 이동
            } else {
                alert('탈퇴 처리에 실패했습니다.');
            }
        }).catch(error => {
            console.error('회원 탈퇴 오류:', error);
            alert('탈퇴 처리 중 오류가 발생했습니다.');
        });
    };

    // 탈퇴 취소 핸들러
    const handleConfirmNo = () => {
        setShowConfirm(false);
    };

    return (
        <div id="wrap-main">
            {/* 헤더 */}
            <Header />

            <div id="wrap-body" className="clearfix ham">
                {/* 사이드바 */}
                <div id="wrap-side">
                    <div id="profile-box">
                        <div className="profile-name">
                            <img src={profile} alt="프로필" />
                            <div className="profile-name-one">
                                <p><Link to="#"><strong>{name}</strong> 님</Link></p>
                                <Link to="#">프로필수정</Link>
                            </div>
                        </div>
                        <div className="profile-edit">
                            <Link to="#" className="button-left"><span>내정보</span></Link>
                            <Link to="#" className="button-right"><span>이용권내역</span></Link>
                        </div>
                    </div>
                    <div id="profile-list">
                        <Link to="#">
                            <span>마이뮤직</span>
                        </Link>
                        <div>
                            <ul>
                                <li><Link to="#"><img src={searchIcon} alt="검색" /> 플레이 리스트</Link></li>
                                <li><Link to="#"><img src={searchIcon} alt="검색" /> 좋아요♥</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* 메인 섹션 */}
                <div id="wrap-main">
                    <div id="top-title" className="userinfotitle">
                        <h2>내 정보</h2>
                        <ul className="Breadcrumbs">
                            <li><Link to="#">홈</Link> {'>'}</li>
                            <li><Link to="##">마이뮤직</Link> {'>'}</li>
                            <li><Link to="">내정보</Link> {'>'}</li>
                            <li><strong><Link to="#">기본정보 변경</Link></strong></li>
                        </ul>
                    </div>
                    <div id="top-ct-list">
                        <ul>
                            <li><Link to="#">기본정보 변경</Link></li>
                            <li><button id="deleteAccountButton" onClick={handleDeleteAccount}>회원 탈퇴</button></li>

                            {/* 커스텀 확인 팝업 */}
                            {showConfirm && (
                                <div id="custom-confirm" className="custom-confirm">
                                    <div className="confirm-content">
                                        <p>정말 탈퇴 하시겠습니까?</p>
                                        <button id="confirm-yes" className="confirm-btn" onClick={handleConfirmYes}>확인</button>
                                        <button id="confirm-no" className="confirm-btn" onClick={handleConfirmNo}>취소</button>
                                    </div>
                                </div>
                            )}
                        </ul>
                    </div>
                    {/* 메인 컨텐츠 */}
                    <div id="wrap-maincontent">
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <table className="info-table">
                                <thead>
                                    <tr>
                                        <th>아이디(ID)</th>
                                        <td><input id='input-id' type="text" value={id} readOnly /></td>
                                    </tr>
                                    <tr>
                                        <th>비밀번호</th>
                                        <td><input type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="비밀번호를 입력하세요" /></td>
                                    </tr>
                                    <tr>
                                        <th>휴대폰 번호</th>
                                        <td><input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="010-1234-5678" /></td>
                                    </tr>
                                    <tr>
                                        <th>주소</th>
                                        <td>
                                            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="서울시 강남구" />
                                        </td>
                                    </tr>
                                </thead>
                                <br />
                                <tbody>
                                    <tr>
                                        <th>프로필 사진</th>
                                        <td>
                                            <div className="profile-photo">
                                                <img src={profile} alt="프로필 사진" />
                                                <input type="file" id='input-img' name="profile_image" onChange={handleProfileChange} />
                                                <label>
                                                    <input type="checkbox" name="delete_profile_image" /> 삭제
                                                </label>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            {/* 제출 버튼 */}
                            <div className="submit-section">
                                <button type="submit" className="btn-submit">확인</button>
                                <button type="button" className="btn-cancel" onClick={() => navigate('/user/mymusic')}>취소</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>

            {/* 푸터 */}
            <Footer/>
        </div>
    );
};

export default UserInfo;
