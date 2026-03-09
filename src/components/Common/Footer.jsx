/**
 * 푸터 컴포넌트.
 *
 * 앱 하단에 저작권 정보, 간단한 링크 등을 표시한다.
 * 다크 테마에 맞춘 미니멀한 디자인을 적용한다.
 */

import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import './Footer.css';

export default function Footer() {
  // 현재 연도 — 저작권 표시에 사용
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__inner">
        {/* ── 로고 및 설명 ── */}
        <div className="footer__brand">
          <Link to={ROUTES.HOME} className="footer__logo">
            <span className="footer__logo-icon">M</span>
            <span className="footer__logo-text">몽글픽</span>
          </Link>
          <p className="footer__desc">
            AI가 당신의 취향을 분석하여 딱 맞는 영화를 추천해 드립니다.
          </p>
        </div>

        {/* ── 빠른 링크 ── */}
        <div className="footer__links">
          <Link to={ROUTES.CHAT} className="footer__link">AI 추천</Link>
          <Link to={ROUTES.COMMUNITY} className="footer__link">커뮤니티</Link>
          <Link to={ROUTES.SEARCH} className="footer__link">검색</Link>
        </div>

        {/* ── 저작권 ── */}
        <div className="footer__copyright">
          <p>&copy; {currentYear} 몽글픽. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
