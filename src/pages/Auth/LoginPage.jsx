/**
 * 로그인 페이지 컴포넌트.
 *
 * LoginForm 컴포넌트를 중앙 정렬하여 표시한다.
 * 이미 로그인된 사용자는 홈 페이지로 리다이렉트한다.
 */

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ROUTES } from '../../constants/routes';
import LoginForm from '../../components/Auth/LoginForm';
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
      <LoginForm />
    </div>
  );
}
