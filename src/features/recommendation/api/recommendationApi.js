/**
 * 추천 내역 API 모듈.
 *
 * Backend의 RecommendationController와 통신하여
 * AI 추천 이력 조회, 찜/봤어요 토글, 만족도 피드백을 수행한다.
 *
 * @module features/recommendation/api/recommendationApi
 */

import { backendApi, requireAuth } from '../../../shared/api/axiosInstance';
import { RECOMMENDATION_ENDPOINTS } from '../../../shared/constants/api';

/**
 * 추천 이력 목록을 조회한다 (페이징).
 *
 * @param {Object} params - 조회 파라미터
 * @param {number} [params.page=0] - 페이지 번호
 * @param {number} [params.size=20] - 페이지 크기
 * @param {string} [params.status] - 필터 (ALL, WISHLIST, WATCHED)
 * @returns {Promise<{content: Array, totalPages: number, totalElements: number}>}
 */
export async function getRecommendations({ page = 0, size = 20, status } = {}) {
  requireAuth();
  const params = { page, size };
  if (status && status !== 'ALL') params.status = status;
  return backendApi.get(RECOMMENDATION_ENDPOINTS.LIST, { params });
}

/**
 * 추천 영화 찜(위시리스트) 토글.
 *
 * @param {string|number} recommendationId - 추천 ID
 * @returns {Promise<{wishlisted: boolean}>}
 */
export async function toggleWishlist(recommendationId) {
  requireAuth();
  return backendApi.post(RECOMMENDATION_ENDPOINTS.WISHLIST(recommendationId));
}

/**
 * 추천 영화 봤어요 토글.
 *
 * @param {string|number} recommendationId - 추천 ID
 * @returns {Promise<{watched: boolean}>}
 */
export async function toggleWatched(recommendationId) {
  requireAuth();
  return backendApi.post(RECOMMENDATION_ENDPOINTS.WATCHED(recommendationId));
}

/**
 * 만족도 피드백 제출.
 *
 * @param {string|number} recommendationId - 추천 ID
 * @param {Object} feedback - 피드백 데이터
 * @param {number} feedback.rating - 평점 (1~5)
 * @param {string} [feedback.comment] - 코멘트
 * @returns {Promise<void>}
 */
export async function submitFeedback(recommendationId, { rating, comment }) {
  requireAuth();
  return backendApi.post(RECOMMENDATION_ENDPOINTS.FEEDBACK(recommendationId), {
    rating,
    comment,
  });
}
