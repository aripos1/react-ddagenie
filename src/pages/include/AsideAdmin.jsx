import React from 'react';
import { Link } from 'react-router-dom';
import searchLogo from '../../assets/images/search.png';
import defaultProfileImage from '../../assets/images/default_img2.png';


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
                    <Link to="/admin/artistinsert" className="button-left"><span>아티스트 &nbsp;관리</span></Link>
                    <Link to="/admin/musicadmin" className="button-center"><span>음원 관리</span></Link>
                    <Link to="/admin/adminPayment" className="button-right"><span>결제 관리</span></Link>
                </div>
            </div>
            <div id="profile-list">
                <a>
                    <span>관리자 페이지</span>
                </a>
                <div>
                    <ul>
                        <li><Link to="/admin/artistinsert"><img src={searchLogo} alt="아티스트 관리" /> 아티스트 관리</Link></li>
                        <li><Link to="/admin/musicadmin"><img src={searchLogo} alt="음원 관리" /> 음원 관리</Link></li>
                        <li><Link to="/admin/adminPayment"><img src={searchLogo} alt="결제 관리" /> 결제 관리</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
