import React from 'react';
import { Link } from 'react-router-dom';
import defaultProfileImage from '../../assets/images/cuteddagenie.png';


import '../../assets/css/aside.css';

const Sidebar = ({ name, profile }) => {
    // 실제로 표시할 프로필 이미지, 프로필이 없으면 기본 이미지 사용
    const profileImage = profile || defaultProfileImage;
    return (
        <div id="wrap-side" className='admin-side'>
            <div id="profile-box">
                <div className="profile-name">
                    <img
                        src={profileImage}
                        alt="Profile"
                        onError={(e) => e.target.src = defaultProfileImage} // 이미지 로드 실패 시 기본 이미지로 변경
                    />
                    <div className="profile-name-one">
                        <p><Link to="/user/info"><strong>{name}</strong> 님</Link></p>
                        <Link to="/user/info">프로필수정</Link>
                    </div>
                </div>
                <div className="profile-edit">
                    <Link to="/admin/artistinsert" className="button-left"><span>아티스트</span></Link>
                    <Link to="/admin/musicadmin" className="button-center"><span>음원 관리</span></Link>
                    <Link to="/admin/adminPayment" className="button-right"><span>결제 관리</span></Link>
                </div>
            </div>
          
        </div>
    );
};

export default Sidebar;
