import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/all.css';
import '../../assets/css/header.css';
import '../../assets/css/footer.css';
import '../../assets/css/jjinUtilize.css';
import '../../assets/css/userinfo.css';
import logo from '../../assets/images/cuteddagenie.png';
import walletIcon from '../../assets/images/wallet.png';
import searchIcon from '../../assets/images/search.png';
import profileImage from '../../assets/images/default_img.webp';
import customProfile from '../../assets/images/default_img2.png';

const UserInfo = () => {
    const [showConfirm, setShowConfirm] = useState();

    const handleDeleteAccount = () => {
        setShowConfirm(true);
    };

    const handleConfirmYes = () => {
        // 탈퇴 처리 로직 (AJAX 요청 또는 form 제출)
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = '/deleteAccount'; // 실제 탈퇴 처리 URL
        document.body.appendChild(form);
        form.submit();

        // 탈퇴 후 리다이렉트
        window.location.href = '/home'; // 홈으로 이동
    };

    const handleConfirmNo = () => {
        setShowConfirm(false);
    };

    return (
        <div id="wrap-main">
            <div id="wrap-head">
                {/* 헤더 */}
                <div id="wrap-header">
                    <div id="purchase-button">
                        <img src={walletIcon} alt="지갑" />
                        <Link to="" className="headBuy">이용권구매</Link>
                    </div>
                    <div className="header-main">
                        <div className="header-left">
                            <span className="logo">
                                <img src={customProfile} alt="로고" />
                            </span>
                            <div id="search-wrap">
                                <input
                                    type="search"
                                    id="sc-fd"
                                    className="ipt-search"
                                    maxLength="200"
                                    autoComplete="off"
                                    placeholder="가을에 듣기 좋은 감성 발라드"
                                />
                                <input type="submit" className="btn-submit" value="검색" />
                            </div>
                        </div>
                    </div>

                    <div className="gnb" id="gnb">
                        <ul className="menu clearfix">
                            <li><Link to="#" className="gnb-menu">따지니차트</Link></li>
                            <li><Link to="#" className="gnb-menu">최신음악</Link></li>
                            <li><Link to="#" className="gnb-menu">장르음악</Link></li>
                        </ul>
                        <ul className="gnb-my">
                            <li><Link to="" className="btn login-join-btn">jji***님</Link></li>
                            <li><Link to="" className="btn login-join-btn">마이뮤직</Link></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div id="wrap-body" className="clearfix">
                {/* 사이드바 */}
                <div id="wrap-side">
                    <div id="profile-box">
                        <div className="profile-name">
                            <span>
                                <img src={customProfile} alt="프로필" />
                            </span>
                            <div className="profile-name-one">
                                <p><Link to="#"><strong>진소영</strong> 님</Link></p>
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
                            <li><Link to="#">홈</Link> ></li>
                            <li><Link to="##">마이뮤직</Link> ></li>
                            <li><Link to="">내정보</Link> ></li>
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
                    <div id="wrap-maincontent">
                        <form action="#" method="POST" encType="multipart/form-data">
                            <table className="info-table">
                                <thead>
                                    <tr>
                                        <th>아이디(ID)</th>
                                        <td><input type="text" id="username" value="jji***" readOnly /></td>
                                    </tr>
                                    <tr>
                                        <th>휴대폰 번호</th>
                                        <td>
                                            <input type="text" id="phone" name="phone" value="" placeholder="010-1234-5678" />
                                            <button type="button" className="change-btn">변경하기</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>이메일 주소</th>
                                        <td>
                                            <input type="text" id="email_id" placeholder="이메일 아이디" required />
                                            @
                                            <input type="text" id="email_domain" list="email_domains" placeholder="직접 입력" required />
                                            <datalist id="email_domains">
                                                <option value="naver.com" />
                                                <option value="gmail.com" />
                                                <option value="kakao.com" />
                                                <option value="daum.net" />
                                                <option value="hanmail.net" />
                                                <option value="nate.com" />
                                            </datalist>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>주소</th>
                                        <td>
                                            <input type="text" id="postalcode" name="postalcode" value="" placeholder="우편번호" />
                                            <input type="text" id="address" name="address" value="" placeholder="서울시 강남구" />
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>프로필 사진</th>
                                        <td>
                                            <div className="profile-photo">
                                                <img src={profileImage} alt="프로필 사진" />
                                                <input type="file" name="profile_image" />
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
                                <button type="button" className="btn-cancel">취소</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div id="wrap-foot" className="footer">
                <div className="ft-head clearfix">
                    <ul>
                        <li><Link to="#">회사소개</Link></li>
                        <li><Link to="#">이용약관</Link></li>
                        <li><Link to="#">개인정보처리방침</Link></li>
                        <li><Link to="#">청소년보호정책</Link></li>
                        <li><Link to="#">위치기반서비스</Link></li>
                    </ul>
                </div>
                <div className="ft-main clearfix">
                    <div className="ft-logo">
                        <img src={logo} alt="지니뮤직 로고" />
                    </div>
                    <div className="ft-info">
                        <p>(주) 따지니뮤직</p>
                        <p>대표이사 황일영 | 서울 서초구 강남대로 405 통영빌딩 8층</p>
                        <p>사업자등록번호: 777-77-01234</p>
                        <p>개인정보보호책임자: 임현성</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserInfo;
