import React from 'react';
import { Link } from 'react-router-dom'; // Link 태그 임포트
import '../../assets/css/all.css';
import '../../assets/css/footer.css';

// 이미지 파일 가져오기
import logo from '../../assets/images/cuteddagenie.png';
import kakaoIcon from '../../assets/images/kakao.png';
import facebookIcon from '../../assets/images/facebook.png';
import instagramIcon from '../../assets/images/insta.png';

const Footer = () => {
    return (
        <div id="wrap-main">
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
                    {/* 로고 이미지 */}
                    <div className="ft-logo">
                        <img src={logo} alt="따지니뮤직 로고" />
                    </div>
                    {/* 회사 정보 텍스트 */}
                    <div className="ft-info">
                        <p>(주) 따지니뮤직</p>
                        <p>대표이사 황일영 | 서울 서초구 강남대로 405 통영빌딩 8층</p>
                        <p>사업자등록번호: 777-77-01234 | 통신판매업신고 2013-서울강남-01302</p>
                        <p>개인정보보호책임자: 임현성 | 서비스문의: 1577-5337 | 이메일: molddajini@hwak.ma</p>
                        <p>COPYRIGHT©DDAGENIE MUSIC CORP ALL RIGHTS RESERVED.</p>
                    </div>
                </div>
                {/* SNS 아이콘 */}
                <div className="ft-sns">
                    <Link to="#"><img src={kakaoIcon} alt="카카오톡" /></Link>
                    <Link to="#"><img src={facebookIcon} alt="페이스북" /></Link>
                    <Link to="#"><img src={instagramIcon} alt="인스타그램" /></Link>
                </div>
            </div>
        </div>
    );
};

export default Footer;
