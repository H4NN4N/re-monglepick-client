/**
 * 네비게이션 헤더 컴포넌트.
 *
 * 앱 상단에 고정되어 로고, 네비게이션 링크, 인증 버튼을 표시한다.
 * 다크 테마에 맞춘 반투명 배경으로 세련된 느낌을 제공한다.
 * 모바일 환경에서는 햄버거 메뉴로 전환된다.
 */

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
/* 인증 Context 훅 — app/providers에서 가져옴 */
import { useAuth } from '../../../app/providers/AuthProvider';
/* 라우트 경로 상수 — shared/constants에서 가져옴 */
import { ROUTES, NAV_ITEMS } from '../../constants/routes';
import './Header.css';

export default function Header() {
  // 현재 경로 — 활성 메뉴 하이라이트에 사용
  const location = useLocation();
  // 인증 상태 및 액션
  const { isAuthenticated, user, logout } = useAuth();
  // 모바일 메뉴 열림/닫힘 상태
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 모바일 메뉴 열릴 때 body 스크롤 잠금
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  /**
   * 모바일 메뉴 토글 핸들러.
   */
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  /**
   * 메뉴 항목 클릭 시 모바일 메뉴 닫기.
   */
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  /**
   * 로그아웃 버튼 클릭 핸들러.
   */
  const handleLogout = () => {
    logout();
    closeMobileMenu();
  };

  return (
    <header className="header">
      <div className="header__inner">
        {/* ── 로고 영역 ── */}
        <Link to={ROUTES.HOME} className="header__logo" onClick={closeMobileMenu}>
          <img src="/mongle-transparent.png" alt="몽글픽" className="header__logo-icon" />
          <span className="header__logo-text">몽글픽</span>
        </Link>

        {/* ── 네비게이션 링크 (데스크톱) ── */}
        <nav className={`header__nav ${isMobileMenuOpen ? 'header__nav--open' : ''}`}>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`header__nav-link ${
                location.pathname === item.path ? 'header__nav-link--active' : ''
              }`}
              onClick={closeMobileMenu}
            >
              {item.label}
            </Link>
          ))}

          {/* ── 인증 버튼 (모바일 메뉴 내부) ── */}
          <div className="header__auth header__auth--mobile">
            {isAuthenticated ? (
              <>
                <Link
                  to={ROUTES.MYPAGE}
                  className="header__nav-link"
                  onClick={closeMobileMenu}
                >
                  마이페이지
                </Link>
                <button className="header__auth-btn header__auth-btn--logout" onClick={handleLogout}>
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <Link to={ROUTES.LOGIN} className="header__auth-btn" onClick={closeMobileMenu}>
                  로그인
                </Link>
                <Link
                  to={ROUTES.SIGNUP}
                  className="header__auth-btn header__auth-btn--signup"
                  onClick={closeMobileMenu}
                >
                  회원가입
                </Link>
              </>
            )}
          </div>
        </nav>

        {/* ── 인증 버튼 (데스크톱) ── */}
        <div className="header__auth header__auth--desktop">
          {isAuthenticated ? (
            <>
              <Link to={ROUTES.MYPAGE} className="header__user">
                <span className="header__user-avatar">
                  {user?.nickname?.charAt(0) || 'U'}
                </span>
                <span className="header__user-name">{user?.nickname || '사용자'}</span>
              </Link>
              <button className="header__auth-btn header__auth-btn--logout" onClick={handleLogout}>
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link to={ROUTES.LOGIN} className="header__auth-btn">
                로그인
              </Link>
              <Link to={ROUTES.SIGNUP} className="header__auth-btn header__auth-btn--signup">
                회원가입
              </Link>
            </>
          )}
        </div>

        {/* ── 모바일 햄버거 메뉴 버튼 ── */}
        <button
          className={`header__mobile-toggle ${isMobileMenuOpen ? 'header__mobile-toggle--open' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="메뉴 열기/닫기"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
