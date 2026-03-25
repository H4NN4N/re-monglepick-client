/**
 * 인증 상태 관리 Context 모듈.
 *
 * 앱 전체에서 사용자 인증 상태를 공유하기 위한 React Context를 제공한다.
 * - user: 현재 로그인한 사용자 정보 (null이면 미인증)
 * - token: JWT 액세스 토큰
 * - login: 로그인 처리 함수
 * - logout: 로그아웃 처리 함수
 * - isAuthenticated: 인증 여부 (boolean)
 *
 * localStorage를 통해 새로고침 후에도 인증 상태를 유지한다.
 *
 * @remarks
 * useAuth 훅은 별도 파일(useAuth.js)로 분리되어 있다.
 * React Fast Refresh는 한 파일에 컴포넌트와 비컴포넌트 export가 섞이면
 * HMR 동작이 불안정해지기 때문이다.
 */

import { createContext, useState, useCallback, useMemo } from 'react';
/* localStorage 래퍼 — shared/utils에서 가져옴 */
import {
  getToken,
  setToken,
  getUser,
  setUser,
  setRefreshToken,
  clearAll,
} from '../../shared/utils/storage';

/**
 * 인증 Context 객체.
 * Provider 외부에서 접근하면 null이 반환된다.
 * useAuth 훅(useAuth.js)을 통해서만 접근할 것을 권장한다.
 */
const AuthContext = createContext(null);

/**
 * localStorage에서 토큰과 사용자 정보를 읽어 초기 인증 상태를 구성한다.
 * useState의 lazy initializer로 사용하여 마운트 시 단 한 번만 실행된다.
 * useEffect 내 동기 setState(cascading render)를 방지하기 위한 패턴이다.
 *
 * @returns {{ token: string|null, user: Object|null }} 초기 상태
 */
function readAuthFromStorage() {
  const savedToken = getToken();
  const savedUser = getUser();

  /* 토큰과 사용자 정보가 모두 있어야 로그인 상태로 복원한다 */
  if (savedToken && savedUser) {
    return { token: savedToken, user: savedUser };
  }

  return { token: null, user: null };
}

/**
 * 인증 Context Provider 컴포넌트.
 *
 * 앱 최상위에서 감싸서 하위 컴포넌트에 인증 상태를 제공한다.
 * useState lazy initializer를 통해 렌더링 전에 localStorage를 즉시 복원하므로
 * useEffect 방식의 cascading render 문제가 발생하지 않는다.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - 하위 컴포넌트
 */
export function AuthProvider({ children }) {
  /**
   * 인증 상태 (token + user)를 단일 객체로 관리한다.
   * lazy initializer로 마운트 시 단 한 번 localStorage를 읽어 복원하므로
   * readAuthFromStorage() 중복 호출이 발생하지 않는다.
   */
  const [auth, setAuth] = useState(readAuthFromStorage);

  /* 구조 분해하여 개별 참조로 사용 */
  const { token, user } = auth;

  /**
   * 로그인 처리 함수.
   * API 응답으로 받은 토큰과 사용자 정보를 상태(단일 auth 객체)와
   * localStorage에 동시에 저장한다.
   *
   * @param {Object} params - 로그인 응답 데이터
   * @param {string} params.accessToken - JWT 액세스 토큰
   * @param {string} [params.refreshToken] - JWT 리프레시 토큰
   * @param {Object} params.user - 사용자 정보 객체 (id, email, nickname 등)
   */
  const login = useCallback(({ accessToken, refreshToken, user: userData }) => {
    /* auth 단일 객체로 상태 업데이트 (배치 처리 — 리렌더링 1회) */
    setAuth({ token: accessToken, user: userData });

    /* localStorage에 영속 저장 */
    setToken(accessToken);
    setUser(userData);

    /* 리프레시 토큰이 있으면 별도 저장 */
    if (refreshToken) {
      setRefreshToken(refreshToken);
    }
  }, []);

  /**
   * 로그아웃 처리 함수.
   * 상태와 localStorage의 모든 인증 정보를 삭제한다.
   */
  const logout = useCallback(() => {
    /* auth 단일 객체를 null 상태로 초기화 */
    setAuth({ token: null, user: null });

    /* localStorage 전체 삭제 (토큰 + 리프레시 + 세션 + 유저) */
    clearAll();
  }, []);

  /**
   * 사용자 정보를 업데이트한다 (프로필 수정 등).
   * token은 유지하고 user 정보만 교체한다.
   *
   * @param {Object} updatedUser - 업데이트할 사용자 정보
   */
  const updateUser = useCallback((updatedUser) => {
    /* 이전 auth 상태를 spread하여 user만 교체 */
    setAuth((prev) => ({ ...prev, user: updatedUser }));
    setUser(updatedUser);
  }, []);

  /**
   * 인증 여부 (토큰과 사용자 정보가 모두 존재하면 true).
   * token/user 상태에서 파생되는 값으로, useMemo 의존성에 명시하여
   * React Compiler가 memoization을 올바르게 추론할 수 있도록 한다.
   */
  const isAuthenticated = Boolean(token && user);

  /**
   * Context 값 메모이제이션.
   * 불필요한 리렌더링을 방지하기 위해 useMemo로 감싼다.
   *
   * 의존성 배열에 isAuthenticated를 포함한다:
   * - isAuthenticated는 token/user에서 파생되므로 논리적으로 중복이지만
   * - React Compiler는 객체 내에 직접 참조된 변수를 의존성으로 요구한다
   * - 누락 시 "inferred dependency did not match" 컴파일 오류가 발생한다
   */
  const contextValue = useMemo(
    () => ({
      user,
      token,
      isAuthenticated,
      login,
      logout,
      updateUser,
    }),
    [user, token, isAuthenticated, login, logout, updateUser],
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
