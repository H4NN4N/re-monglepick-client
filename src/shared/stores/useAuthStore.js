/**
 * 인증 상태 관리 Zustand 스토어.
 *
 * 앱 전체에서 사용자 인증 상태를 공유한다.
 * - user: 현재 로그인한 사용자 정보 (null이면 미인증)
 * - token: JWT 액세스 토큰
 * - login: 로그인 처리 (토큰 + 사용자 정보 저장)
 * - logout: 로그아웃 처리 (모든 인증 정보 삭제)
 * - isAuthenticated: 인증 여부 (computed)
 *
 * localStorage를 통해 새로고침 후에도 인증 상태를 유지한다.
 *
 * @module shared/stores/useAuthStore
 *
 * @example
 * // 컴포넌트에서 필요한 상태만 선택 (선택적 구독으로 리렌더링 최소화)
 * const user = useAuthStore((s) => s.user);
 * const { login, logout } = useAuthStore();
 *
 * // PrivateRoute 등에서 인증 여부 확인
 * const isAuthenticated = useAuthStore((s) => s.isAuthenticated());
 */

import { create } from 'zustand';
import {
  getToken,
  setToken,
  getUser,
  setUser,
  setRefreshToken,
  clearAll,
} from '../utils/storage';
/* removeToken, removeUser, removeRefreshToken은 logout에서 clearAll()로 일괄 처리하므로 미사용 */

/**
 * 인증 Zustand 스토어.
 *
 * 초기 상태: localStorage에서 토큰과 사용자 정보를 복원한다.
 * Context API와 달리 Provider 래핑이 불필요하며,
 * 선택적 구독(selector)으로 불필요한 리렌더링을 방지한다.
 */
/**
 * JWT 토큰의 만료 여부를 검사한다.
 * payload의 exp 클레임을 디코딩하여 현재 시간과 비교한다.
 *
 * @param {string} token - JWT 토큰 문자열
 * @returns {boolean} 만료되었으면 true
 */
function isTokenExpired(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    /* exp는 초 단위이므로 밀리초로 변환하여 비교 */
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

const useAuthStore = create((set, get) => {
  /* ── 초기 상태: localStorage에서 복원 (만료된 토큰은 무시) ── */
  const savedToken = getToken();
  const savedUser = getUser();
  const isValid = savedToken && savedUser && !isTokenExpired(savedToken);

  /* 만료된 토큰이 있으면 즉시 정리 */
  if (savedToken && !isValid) {
    clearAll();
  }

  return {
    /** 사용자 정보 (null이면 미인증) */
    user: isValid ? savedUser : null,

    /** JWT 액세스 토큰 */
    token: isValid ? savedToken : null,

    /** 초기 로딩 완료 여부 (localStorage 복원 즉시 완료되므로 false) */
    isLoading: false,

    /**
     * 인증 여부를 반환한다.
     * Zustand에서는 getter 함수로 구현 (derived state).
     *
     * @returns {boolean} 토큰과 사용자 정보가 모두 존재하면 true
     */
    isAuthenticated: () => {
      const { token, user } = get();
      return Boolean(token && user);
    },

    /**
     * 로그인 처리.
     * API 응답으로 받은 토큰과 사용자 정보를 상태와 localStorage에 저장한다.
     *
     * @param {Object} params - 로그인 응답 데이터
     * @param {string} params.accessToken - JWT 액세스 토큰
     * @param {string} [params.refreshToken] - JWT 리프레시 토큰
     * @param {Object} params.user - 사용자 정보 객체 (id, email, nickname 등)
     */
    login: ({ accessToken, refreshToken, user: userData }) => {
      /* 상태 업데이트 */
      set({ token: accessToken, user: userData });

      /* localStorage에 영속 저장 */
      setToken(accessToken);
      setUser(userData);

      /* 리프레시 토큰이 있으면 별도 저장 */
      if (refreshToken) {
        setRefreshToken(refreshToken);
      }
    },

    /**
     * 로그아웃 처리.
     * 상태와 localStorage의 모든 인증 정보를 삭제한다.
     */
    logout: () => {
      set({ token: null, user: null });
      clearAll();
    },

    /**
     * 사용자 정보를 업데이트한다 (프로필 수정 등).
     *
     * @param {Object} updatedUser - 업데이트할 사용자 정보
     */
    updateUser: (updatedUser) => {
      set({ user: updatedUser });
      setUser(updatedUser);
    },
  };
});

export default useAuthStore;
