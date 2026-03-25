/**
 * 인증이 필요한 API 요청을 위한 공통 fetch 래퍼.
 *
 * 저장된 JWT 토큰이 있으면 Authorization 헤더를 자동 추가한다.
 * 401 응답 시 리프레시 토큰으로 자동 갱신을 시도하고, 원래 요청을 재시도한다.
 * 갱신 실패 시 모든 인증 정보를 삭제하고 로그인 페이지로 리다이렉트한다.
 *
 * @module shared/utils/fetchWithAuth
 */

/* API 상수 — shared/constants에서 가져옴 */
import { API_BASE_URL, AUTH_ENDPOINTS } from '../constants/api';
/* localStorage 유틸 — shared/utils에서 가져옴 */
import { getToken, setToken, getRefreshToken, setRefreshToken, clearAll } from './storage';

/**
 * 토큰 갱신 진행 중 여부 + Promise 캐싱.
 * 동시에 여러 요청이 401을 받을 때 갱신 요청이 중복 발생하지 않도록 한다.
 */
let refreshPromise = null;

/**
 * 리프레시 토큰으로 새 액세스 토큰을 발급받는다.
 * 동시 호출 시 하나의 갱신 요청만 실행되고, 나머지는 같은 Promise를 공유한다.
 *
 * @returns {Promise<string>} 새 액세스 토큰
 * @throws {Error} 갱신 실패 시
 */
async function refreshAccessToken() {
  // 이미 갱신 진행 중이면 같은 Promise를 반환 (중복 갱신 방지)
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = (async () => {
    const currentRefreshToken = getRefreshToken();
    if (!currentRefreshToken) {
      throw new Error('리프레시 토큰이 없습니다.');
    }

    const response = await fetch(`${API_BASE_URL}${AUTH_ENDPOINTS.REFRESH}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken: currentRefreshToken }),
    });

    if (!response.ok) {
      throw new Error('토큰 갱신에 실패했습니다.');
    }

    const data = await response.json();

    // 새 토큰을 localStorage에 저장
    if (data.accessToken) {
      setToken(data.accessToken);
    }
    if (data.refreshToken) {
      setRefreshToken(data.refreshToken);
    }

    return data.accessToken;
  })();

  try {
    const newToken = await refreshPromise;
    return newToken;
  } finally {
    // 갱신 완료 후 Promise 캐시 제거 (다음 갱신 허용)
    refreshPromise = null;
  }
}

/**
 * 인증이 필요한 API 요청을 위한 공통 fetch 래퍼.
 * 저장된 JWT 토큰이 있으면 Authorization 헤더를 자동 추가한다.
 * 401 응답 시 리프레시 토큰으로 자동 갱신 후 재시도한다.
 *
 * @param {string} url - 요청 URL (API_BASE_URL 이후 경로)
 * @param {Object} [options={}] - fetch 옵션
 * @returns {Promise<Object>} 파싱된 JSON 응답
 * @throws {Error} HTTP 에러 시 에러 메시지 포함
 */
export async function fetchWithAuth(url, options = {}) {
  const token = getToken();

  // 헤더 구성: 토큰이 있으면 Authorization 헤더 자동 추가
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  });

  // 401 Unauthorized — 토큰 만료 시 자동 갱신 시도
  if (response.status === 401) {
    try {
      const newToken = await refreshAccessToken();

      // 새 토큰으로 원래 요청 재시도
      const retryHeaders = {
        ...headers,
        'Authorization': `Bearer ${newToken}`,
      };
      const retryResponse = await fetch(`${API_BASE_URL}${url}`, {
        ...options,
        headers: retryHeaders,
      });

      const retryData = await retryResponse.json().catch(() => null);

      if (!retryResponse.ok) {
        const errorMessage = retryData?.message || retryData?.detail || `요청 실패 (${retryResponse.status})`;
        const error = new Error(errorMessage);
        error.code = retryData?.code || null;
        error.status = retryResponse.status;
        throw error;
      }

      return retryData;
    } catch {
      // 갱신 실패 → 모든 인증 정보 삭제 + 로그인 페이지로 리다이렉트
      clearAll();
      window.location.href = '/login';
      throw new Error('인증이 만료되었습니다. 다시 로그인해주세요.');
    }
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const errorMessage = data?.message || data?.detail || `요청 실패 (${response.status})`;
    const error = new Error(errorMessage);
    error.code = data?.code || null;
    error.status = response.status;
    throw error;
  }

  return data;
}

/**
 * 인증 필수 API 요청을 위한 fetch 래퍼.
 * fetchWithAuth와 동일하지만, 토큰이 없으면 즉시 에러를 던진다.
 * 포인트, 결제, 마이페이지 등 반드시 인증이 필요한 API에 사용한다.
 *
 * @param {string} url - 요청 URL (API_BASE_URL 이후 경로)
 * @param {Object} [options={}] - fetch 옵션
 * @returns {Promise<Object>} 파싱된 JSON 응답
 * @throws {Error} 인증 토큰이 없거나 HTTP 에러 시
 */
export async function fetchWithAuthRequired(url, options = {}) {
  const token = getToken();

  // 인증 필수 — 토큰이 없으면 즉시 에러
  if (!token) {
    throw new Error('로그인이 필요합니다.');
  }

  return fetchWithAuth(url, options);
}
