/**
 * 인증 Context 커스텀 훅 모듈.
 *
 * React Fast Refresh(HMR) 규칙에 따라 AuthProvider.jsx와 분리된 별도 파일이다.
 * Fast Refresh는 한 파일에 React 컴포넌트(AuthProvider)와
 * 비컴포넌트 export(useAuth 훅)가 공존하면 HMR 동작이 불안정해진다.
 * (react-refresh/only-export-components 규칙)
 *
 * @module app/providers/useAuth
 *
 * @example
 * // 컴포넌트에서 인증 상태 구독
 * import { useAuth } from '../../../app/providers/useAuth';
 *
 * function MyComponent() {
 *   const { user, isAuthenticated, login, logout } = useAuth();
 *   // ...
 * }
 */

import { useContext } from 'react';
/* AuthContext — AuthProvider.jsx의 default export */
import AuthContext from './AuthProvider';

/**
 * 인증 Context를 사용하기 위한 커스텀 훅.
 * 반드시 AuthProvider 내부에서만 호출해야 한다.
 *
 * 현재 프로젝트는 Zustand(useAuthStore)를 주 인증 상태 관리로 사용하므로
 * 이 훅은 AuthProvider를 직접 활용하는 경우에만 사용한다.
 *
 * @returns {Object} 인증 상태 및 액션
 * @returns {Object|null} returns.user - 현재 로그인한 사용자 정보 (미인증 시 null)
 * @returns {string|null} returns.token - JWT 액세스 토큰 (미인증 시 null)
 * @returns {boolean} returns.isAuthenticated - 인증 여부 (token + user 모두 존재 시 true)
 * @returns {function} returns.login - 로그인 처리 함수 ({ accessToken, refreshToken, user })
 * @returns {function} returns.logout - 로그아웃 처리 함수 (상태 + localStorage 초기화)
 * @returns {function} returns.updateUser - 사용자 정보 업데이트 함수 (프로필 수정 등)
 *
 * @throws {Error} AuthProvider 외부에서 호출 시 에러
 */
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth는 AuthProvider 내부에서만 사용할 수 있습니다. ' +
        '컴포넌트가 <AuthProvider>로 감싸져 있는지 확인하세요.',
    );
  }

  return context;
}
