/**
 * 리뷰(Review) API 모듈.
 *
 * 영화 리뷰의 조회 및 작성 관련 HTTP 요청을 처리한다.
 * communityApi에서 분리된 리뷰 전용 모듈이다.
 */

/* API 상수 — shared/constants에서 가져옴 */
import { COMMUNITY_ENDPOINTS, API_BASE_URL } from '../../../shared/constants/api';
/* localStorage 유틸 — shared/utils에서 가져옴 */
import { getToken } from '../../../shared/utils/storage';

/**
 * 인증 헤더를 포함한 공통 fetch 래퍼.
 *
 * @param {string} url - 요청 URL
 * @param {Object} [options={}] - fetch 옵션
 * @returns {Promise<Object>} 파싱된 JSON 응답
 * @throws {Error} HTTP 에러 시 에러 메시지 포함
 */
async function fetchWithAuth(url, options = {}) {
  const token = getToken();
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

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const errorMessage = data?.message || data?.detail || `요청 실패 (${response.status})`;
    throw new Error(errorMessage);
  }

  return data;
}

// ── 리뷰 (Reviews) ──

/**
 * 특정 영화의 리뷰 목록을 조회한다.
 *
 * @param {number|string} movieId - 영화 ID
 * @param {Object} [params={}] - 조회 파라미터
 * @param {number} [params.page=1] - 페이지 번호
 * @param {number} [params.size=10] - 페이지 크기
 * @param {string} [params.sort='latest'] - 정렬 기준 (latest, rating_high, rating_low)
 * @returns {Promise<Object>} 리뷰 목록 ({ reviews: [], total: number })
 *
 * @example
 * const result = await getReviews(550, { sort: 'rating_high' });
 * console.log(result.reviews); // [{id, content, rating, author, createdAt, ...}]
 */
export async function getReviews(movieId, { page = 1, size = 10, sort = 'latest' } = {}) {
  const params = new URLSearchParams({
    page: String(page),
    size: String(size),
    sort,
  });
  return fetchWithAuth(`${COMMUNITY_ENDPOINTS.REVIEWS(movieId)}?${params.toString()}`);
}

/**
 * 영화 리뷰를 작성한다.
 * 인증이 필요하다.
 *
 * @param {number|string} movieId - 영화 ID
 * @param {Object} reviewData - 리뷰 데이터
 * @param {string} reviewData.content - 리뷰 내용
 * @param {number} reviewData.rating - 평점 (1~10)
 * @returns {Promise<Object>} 생성된 리뷰 정보
 *
 * @example
 * const review = await createReview(550, {
 *   content: '몰입감이 대단한 영화!',
 *   rating: 9,
 * });
 */
export async function createReview(movieId, { content, rating }) {
  return fetchWithAuth(COMMUNITY_ENDPOINTS.CREATE_REVIEW(movieId), {
    method: 'POST',
    body: JSON.stringify({ content, rating }),
  });
}
