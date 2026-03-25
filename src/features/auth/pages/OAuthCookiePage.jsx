/**
 * OAuth2 쿠키→헤더 교환 페이지 컴포넌트.
 *
 * Spring Security OAuth2 Client 방식의 소셜 로그인 흐름에서 사용된다.
 * SocialSuccessHandler가 HttpOnly 쿠키에 Refresh Token을 저장한 후
 * 이 페이지(/cookie)로 리다이렉트한다.
 *
 * 이 페이지는:
 * 1. 마운트 즉시 POST /jwt/exchange를 호출하여 쿠키를 JWT로 교환
 * 2. 교환 성공 시 AuthContext에 인증 정보 저장
 * 3. 홈 페이지로 리다이렉트
 * 4. 실패 시 에러 메시지 + 로그인 페이지 링크 표시
 */

import { useEffect, useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
/* 인증 Context 훅 — app/providers에서 가져옴 */
import useAuthStore from '../../../shared/stores/useAuthStore';
/* 쿠키→헤더 교환 API — 같은 feature 내의 authApi에서 가져옴 */
import { exchangeToken } from '../api/authApi';
/* 라우트 경로 상수 — shared/constants에서 가져옴 */
import { ROUTES } from '../../../shared/constants/routes';
/* OAuthCallbackPage와 동일한 CSS 스타일 재사용 */
import './OAuthCallbackPage.css';

export default function OAuthCookiePage() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);

  /* 에러 메시지 상태 */
  const [error, setError] = useState('');
  /* 처리 진행 중 상태 */
  const [isProcessing, setIsProcessing] = useState(true);
  /* useEffect 중복 실행 방지 guard (StrictMode 대응) */
  const hasProcessed = useRef(false);

  useEffect(() => {
    // 이미 처리 중이면 중복 실행 방지
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    /**
     * 쿠키에 저장된 Refresh Token을 JSON 기반 JWT로 교환한다.
     * POST /jwt/exchange (credentials: include)로 HttpOnly 쿠키를 전송한다.
     */
    const processExchange = async () => {
      try {
        // 쿠키→헤더 교환 API 호출
        const response = await exchangeToken();

        // AuthContext에 인증 정보 저장
        login({
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
          user: response.user || { nickname: response.userNickname },
        });

        // 홈으로 리다이렉트
        navigate(ROUTES.HOME, { replace: true });
      } catch (err) {
        setError(err.message || '소셜 로그인 토큰 교환에 실패했습니다.');
        setIsProcessing(false);
      }
    };

    processExchange();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 마운트 시 1회만 실행

  // 처리 중이고 에러가 없으면 로딩 스피너 표시
  if (isProcessing && !error) {
    return (
      <div className="oauth-callback">
        <div className="oauth-callback__spinner" />
        <p className="oauth-callback__message">소셜 로그인 처리 중...</p>
      </div>
    );
  }

  // 에러 발생 시 에러 메시지와 로그인 페이지 링크 표시
  return (
    <div className="oauth-callback">
      <div className="oauth-callback__error">
        <h2>로그인 실패</h2>
        <p>{error}</p>
        <Link to={ROUTES.LOGIN} className="oauth-callback__link">
          로그인 페이지로 돌아가기
        </Link>
      </div>
    </div>
  );
}
