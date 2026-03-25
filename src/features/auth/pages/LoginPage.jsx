/**
 * 로그인 페이지 컴포넌트.
 *
 * LoginForm 컴포넌트를 중앙 정렬하여 표시한다.
 * 이미 로그인된 사용자는 홈 페이지로 리다이렉트한다.
 *
 * 개선 사항:
 * - 배경에 그라데이션 원 장식 2개 (decorative circles)
 */

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
/* 인증 Context 훅 — app/providers에서 가져옴 */
import { useAuth } from '../../../app/providers/AuthProvider';
/* 라우트 경로 상수 — shared/constants에서 가져옴 */
import { ROUTES } from '../../../shared/constants/routes';
/* 로그인 폼 — 같은 feature 내의 components에서 가져옴 */
import LoginForm from '../components/LoginForm';
import './LoginPage.css';

export default function LoginPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  /**
   * 이미 인증된 사용자는 홈으로 리다이렉트.
   */
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate(ROUTES.HOME, { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  return (
    <div className="login-page">
      {/* 배경 장식 — Floating Orb 3개 (보라/시안/핑크) */}
      <div className="login-page__deco login-page__deco--1" aria-hidden="true" />
      <div className="login-page__deco login-page__deco--2" aria-hidden="true" />
      <div className="login-page__deco login-page__deco--3" aria-hidden="true" />
      <LoginForm />
    </div>
  );
}
