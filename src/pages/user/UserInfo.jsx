//import 라이브러리
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // axios 임포트

import Header from '../include/Header';
import Footer from '../include/Footer';
import Sidebar from '../include/Aside';

//css
import '../../assets/css/all.css';
import '../../assets/css/footer.css';
import '../../assets/css/jjinUtilize.css';
import '../../assets/css/userinfo.css';

//images
import profileImage from '../../assets/images/default_img2.png';

const UserInfo = ({ updateProfileImage }) => { // Header의 상태 업데이트 함수를 받음
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
    const [deleteProfile, setDeleteProfile] = useState(false);

    


    // 탈퇴관련 변수
    const [showConfirm, setShowConfirm] = useState(false);

    /*---일반변수--------------------------------*/
    const token = localStorage.getItem('token');

    /*---일반메소드 -----------------------------*/

    // 프로필 사진 업로드 핸들러
    const handleProfileChange = (e) => {
        const file = e.target.files[0];
        if (!deleteProfile && file) {
            setSelectedFile(file);

            // 업로드된 파일 미리보기
            const reader = new FileReader();
            reader.onload = () => {
                setProfile(reader.result); // 미리보기에 선택한 이미지 표시
            };
            reader.readAsDataURL(file);
        } else if (deleteProfile) {
            setProfile(profileImage); // 체크박스 선택 시 디폴트 이미지로 변경
            setSelectedFile(null); // 선택된 파일을 초기화
        }
    };

    // 프로필 사진 삭제 체크박스 핸들러
    const handleDeleteProfileChange = (e) => {
        setDeleteProfile(e.target.checked);

        if (e.target.checked) {
            setProfile(profileImage); // 체크박스 선택 시 즉시 디폴트 이미지로 변경
            setSelectedFile(null); // 선택된 파일 초기화
        }
    };

    /*---훅(useEffect)+이벤트(handle)메소드------*/
    // 사용자 정보 불러오기 (마운트 시 실행)
    useEffect(() => {
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}/api/users/me`,
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },

        }).then(response => {
            if (response.data && response.data.apiData) {
                const userVo = response.data.apiData;
                setName(userVo.name || '')
                setId(userVo.id || '');  // id가 없을 경우 빈 문자열로 설정
                setPw(userVo.password || '');  // password가 없을 경우 빈 문자열로 설정
                setPhone(userVo.phone || '');  // phone이 없을 경우 빈 문자열로 설정
                setAddress(userVo.address || '');  // address가 없을 경우 빈 문자열로 설정

                // filePath와 saveName을 합쳐서 이미지 경로 생성
                const imageUrl = `${process.env.REACT_APP_API_URL}/upload/${userVo.saveName}`;
                setProfile(imageUrl || profileImage); // 파일 경로가 유효할 경우에만 이미지 표시
            } else {
                console.error('회원 정보가 없습니다.');
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
        formData.append('name', name);
        formData.append('password', pw);
        formData.append('phone', phone);
        formData.append('address', address);

        // 삭제 체크박스가 선택된 경우 기본 이미지 설정
        if (deleteProfile) {
            formData.append('profile', null);  // 서버에서 기본 이미지를 설정하도록 null 값을 보냄

        } else if (selectedFile) {
            formData.append('profile', selectedFile); // 선택된 파일을 프로필로 설정
        }

        const user = {
            name: name,
            password: pw,
            phone: phone,
            address: address
        };
        formData.append('user', new Blob([JSON.stringify(user)], { type: 'application/json' }));

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
                // 프로필 이미지가 변경되었을 때 헤더 업데이트
                if (selectedFile) {
                    const imageUrl = URL.createObjectURL(selectedFile);
                    updateProfileImage(imageUrl);  // Header에서 프로필 이미지 업데이트
                } else if (deleteProfile) {
                    updateProfileImage(profileImage); // 기본 이미지로 변경
                }

                navigate('/');
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
                {/* 공통 사이드바 */}
                <Sidebar name={name} profile={profile} />

                {/* 메인 섹션 */}
                <div id="wrap-main" className="userinfo">
                    <div id="top-title" className="userinfotitle">
                        <h2>내 정보</h2>
                        <ul className="Breadcrumbs">
                            <li><Link to="/">홈</Link> {'>'}</li>
                            <li><Link to="/user/mymusic">마이뮤직</Link> {'>'}</li>
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
                                                <img src={profile} alt="" />
                                                <input type="file" id='input-img' name="profile_image" onChange={handleProfileChange} />
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        name="delete_profile_image"
                                                        checked={deleteProfile}
                                                        onChange={handleDeleteProfileChange}
                                                    /> 삭제
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
            <Footer />
        </div>
    );
};

export default UserInfo;