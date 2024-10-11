import React from 'react';
import { Link } from 'react-router-dom';
import searchLogo from '../../assets/images/search.png';
import profileImage from '../../assets/images/default_img2.png';



const Sidebar = ({ name = "사용자", profile = profileImage }) => {
    return (
        <div id="wrap-side">
            <div id="profile-box">
                <div className="profile-name">
                    <img src={profile} alt="프로필 이미지" />
                    <div className="profile-name-one">
                        <p><Link to="/user/info"><strong>{name}</strong> 님</Link></p>
                        <Link to="/user/info">프로필수정</Link>
                    </div>
                </div>
                <div className="profile-edit">
                    <Link to="/user/info" className="button-left"><span>내정보</span></Link>
                    <Link to="/user/utilize" className="button-right"><span>이용권내역</span></Link>
                </div>
            </div>
            <div id="profile-list">
                <a>
                    <span>관리자 페이지</span>
                </a>
                <div>
                    <ul>
                        <li><Link to="/admin/artistinsert"><img src={searchLogo} alt="아티스트 관리"/> 아티스트 관리</Link></li>
                        <li><Link to="/admin/musicadmin"><img src={searchLogo} alt="음원 관리"/> 음원 관리</Link></li>
                        <li><Link to="/admin/adminPayment"><img src={searchLogo} alt="결제 관리"/> 결제 관리</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
