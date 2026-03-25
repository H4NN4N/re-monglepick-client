/**
 * 푸터 컴포넌트.
 *
 * 앱 하단에 3컬럼 구조로 정보를 표시한다:
 * - 좌: 로고 + 서비스 설명
 * - 중: 퀵 링크 (홈, 검색, 커뮤니티, 고객센터)
 * - 우: 팀 정보 (몽글픽 팀, 이메일)
 * - 하단: 구분선 + 저작권
 * 모바일에서는 1컬럼 스택으로 전환된다.
 */

import { Link } from 'react-router-dom';
/* 라우트 경로 상수 — shared/constants에서 가져옴 */
import { ROUTES } from '../../constants/routes';
import './Footer.css';

export default function Footer() {
  // 현재 연도 — 저작권 표시에 사용
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__inner">
        {/* ── 3컬럼 콘텐츠 영역 ── */}
        <div className="footer__columns">
          {/* 좌측 — 로고 및 서비스 설명 */}
          <div className="footer__brand">
            <Link to={ROUTES.HOME} className="footer__logo">
              <img src="/mongle-transparent.png" alt="몽글픽" className="footer__logo-icon" />
              <span className="footer__logo-text">몽글픽</span>
            </Link>
            <p className="footer__desc">
              AI가 당신의 취향을 분석하여
            </p>
            <p className="footer__desc">
              딱 맞는 영화를 추천해 드립니다.
            </p>
          </div>

          {/* 중앙 — 퀵 링크 */}
          <div className="footer__nav">
            <h4 className="footer__nav-title">바로가기</h4>
            <Link to={ROUTES.HOME} className="footer__link">홈</Link>
            <Link to={ROUTES.SEARCH} className="footer__link">검색</Link>
            <Link to={ROUTES.COMMUNITY} className="footer__link">커뮤니티</Link>
            <Link to={ROUTES.SUPPORT} className="footer__link">고객센터</Link>
          </div>

          {/* 우측 — 팀 정보 */}
          <div className="footer__team">
            <h4 className="footer__nav-title">팀 정보</h4>
            <p className="footer__team-name">몽글픽 팀</p>
            <p className="footer__team-email">contact@monglepick.com</p>
          </div>
        </div>

        {/* ── 구분선 ── */}
        <div className="footer__divider" />

        {/* ── 저작권 ── */}
        <div className="footer__copyright">
          <p>&copy; {currentYear} 몽글픽. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
