/**
 * 인증(Authentication) API 모듈.
 *
 * 회원가입, 로그인, 토큰 갱신 등 인증 관련 HTTP 요청을 처리한다.
 * axios 인스턴스를 사용하며, 응답은 interceptor에서 JSON으로 자동 파싱된다.
 */

/* 공용 axios 인스턴스 — JWT 자동 주입 + 401 갱신 */
import api from '../../../shared/api/axiosInstance';
/* API 상수 — shared/constants에서 가져옴 */
import { AUTH_ENDPOINTS, API_BASE_URL } from '../../../shared/constants/api';
/* localStorage 유틸 — shared/utils에서 가져옴 */
import { getRefreshToken } from '../../../shared/utils/storage';
/* axios 원본 — 인증 불필요 요청에 사용 */
import axios from 'axios';

/**
 * 회원가입 API 호출.
 *
 * @param {Object} params - 회원가입 정보
 * @param {string} params.email - 이메일 주소
 * @param {string} params.password - 비밀번호
 * @param {string} params.nickname - 닉네임
 * @returns {Promise<Object>} 회원가입 응답 (accessToken, refreshToken, user)
 */
export async function signup({ email, password, nickname }) {
  return api.post(AUTH_ENDPOINTS.SIGNUP, { email, password, nickname });
}

/**
 * 로그인 API 호출.
 *
 * @param {Object} params - 로그인 정보
 * @param {string} params.email - 이메일 주소
 * @param {string} params.password - 비밀번호
 * @returns {Promise<Object>} 로그인 응답 (accessToken, refreshToken, user)
 */
export async function login({ email, password }) {
  return api.post(AUTH_ENDPOINTS.LOGIN, { email, password });
}

/**
 * 토큰 갱신 API 호출.
 * localStorage에 저장된 리프레시 토큰을 사용하여 새로운 액세스 토큰을 발급받는다.
 *
 * @returns {Promise<Object>} 갱신 응답 (accessToken, refreshToken?)
 * @throws {Error} 리프레시 토큰이 없거나 만료된 경우
 */
export async function refreshToken() {
  const currentRefreshToken = getRefreshToken();

  if (!currentRefreshToken) {
    throw new Error('리프레시 토큰이 없습니다. 다시 로그인해주세요.');
  }

  return api.post(AUTH_ENDPOINTS.REFRESH, { refreshToken: currentRefreshToken });
}

/**
 * 로그아웃 API 호출 (서버 세션 무효화).
 * 서버에서 리프레시 토큰을 무효화한다.
 *
 * @param {string} token - 현재 액세스 토큰
 * @returns {Promise<Object>} 로그아웃 응답
 */
export async function logoutAPI(token) {
  return api.post(AUTH_ENDPOINTS.LOGOUT, null, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

/**
 * OAuth 소셜 로그인 API 호출 (구 방식 — 코드 전달).
 * OAuth 제공자로부터 받은 인가 코드를 백엔드에 전달하여 토큰을 발급받는다.
 *
 * @param {Object} params - OAuth 로그인 정보
 * @param {string} params.provider - 제공자 이름 (google, kakao, naver)
 * @param {string} params.code - OAuth 인가 코드
 * @param {string} params.redirectUri - 콜백 리다이렉트 URI
 * @returns {Promise<Object>} 로그인 응답 (accessToken, refreshToken, user)
 * @deprecated Backend가 Spring Security OAuth2 Client로 전환됨. exchangeToken() 사용 권장.
 */
export async function oauthLogin({ provider, code, redirectUri }) {
  return api.post(AUTH_ENDPOINTS.OAUTH(provider), { code, redirectUri });
}

/**
 * OAuth2 쿠키→헤더 토큰 교환 API 호출.
 *
 * Spring Security OAuth2 Client 방식의 소셜 로그인 흐름에서 사용.
 * SocialSuccessHandler가 HttpOnly 쿠키에 저장한 Refresh Token을
 * POST /jwt/exchange로 전송하여 JSON 기반 JWT(accessToken + refreshToken)로 교환한다.
 *
 * withCredentials: true로 쿠키를 자동 전송한다.
 *
 * @returns {Promise<Object>} JWT 응답 (accessToken, refreshToken, userNickname)
 */
export async function exchangeToken() {
  /* 쿠키 전송이 필요하므로 withCredentials 옵션 사용 */
  const response = await axios.post(
    `${API_BASE_URL}/jwt/exchange`,
    null,
    {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    },
  );
  return response.data;
}
