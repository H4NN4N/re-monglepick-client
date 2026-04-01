/**
 * 리뷰(Review) API 모듈.
 *
 * 영화 리뷰의 조회 및 작성 관련 HTTP 요청을 처리한다.
 * communityApi에서 분리된 리뷰 전용 모듈이다.
 */

/* 공용 axios 인스턴스 — JWT 자동 주입 + 401 갱신 */
import api from '../../../shared/api/axiosInstance';
/* API 상수 — shared/constants에서 가져옴 */
import { COMMUNITY_ENDPOINTS } from '../../../shared/constants/api';

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
 */
export async function getReviews(movieId, { page = 1, size = 10, sort = 'latest' } = {}) {
  return api.get(COMMUNITY_ENDPOINTS.REVIEWS(movieId), { params: { page, size, sort } });
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
 */
export async function createReview(movieId, { content, rating }) {
  return api.post(COMMUNITY_ENDPOINTS.CREATE_REVIEW(movieId), { content, rating });
}

/**
 * 영화 리뷰를 수정한다.
 * 인증이 필요하며 본인 리뷰만 수정 가능하다.
 *
 * @param {number|string} movieId - 영화 ID
 * @param {number|string} reviewId - 리뷰 ID
 * @param {Object} reviewData - 수정할 리뷰 데이터
 * @param {string} reviewData.content - 리뷰 내용
 * @param {number} reviewData.rating - 평점 (1~10)
 * @returns {Promise<Object>} 수정된 리뷰 정보
 */
export async function updateReview(movieId, reviewId, { content, rating }) {
  return api.put(COMMUNITY_ENDPOINTS.REVIEW_DETAIL(movieId, reviewId), { content, rating });
}

/**
 * 영화 리뷰를 삭제한다.
 * 인증이 필요하며 본인 리뷰만 삭제 가능하다.
 *
 * @param {number|string} movieId - 영화 ID
 * @param {number|string} reviewId - 리뷰 ID
 * @returns {Promise<void>}
 */
export async function deleteReview(movieId, reviewId) {
  return api.delete(COMMUNITY_ENDPOINTS.REVIEW_DETAIL(movieId, reviewId));
}

/**
 * 리뷰에 좋아요를 추가한다.
 * 인증이 필요하며 동일 리뷰에 중복 좋아요는 불가하다.
 *
 * @param {number|string} movieId - 영화 ID
 * @param {number|string} reviewId - 리뷰 ID
 * @returns {Promise<Object>} 좋아요 결과
 */
export async function likeReview(movieId, reviewId) {
  return api.post(COMMUNITY_ENDPOINTS.REVIEW_LIKE(movieId, reviewId));
}

/**
 * 리뷰 좋아요를 취소한다.
 *
 * @param {number|string} movieId - 영화 ID
 * @param {number|string} reviewId - 리뷰 ID
 * @returns {Promise<void>}
 */
export async function unlikeReview(movieId, reviewId) {
  return api.delete(COMMUNITY_ENDPOINTS.REVIEW_LIKE(movieId, reviewId));
}
