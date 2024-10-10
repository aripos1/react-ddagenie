import React from 'react';
import { Link } from 'react-router-dom';
import searchIcon from '../../assets/images/search.png';
import profileImage from '../../assets/images/default_img2.png';



const Sidebar = ({ name, profile }) => {
    return (
        <div id="wrap-side">
            <div id="profile-box">
                <div className="profile-name">
                    <img src={profile || profileImage} alt="" />
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
                <Link to="/user/mymusic">
                    <span>마이뮤직</span>
                </Link>
                <div>
                    <ul>
                        <li><Link to="/user/mymusic"><img src={searchIcon} alt="검색" /> 마이뮤직리스트</Link></li>
                        <li><Link to="/user/mymusic#"><img src={searchIcon} alt="검색" /> 좋아요♥</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
