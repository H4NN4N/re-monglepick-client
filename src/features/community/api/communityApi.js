/**
 * 커뮤니티(Community) API 모듈.
 *
 * 게시글의 CRUD 관련 HTTP 요청을 처리한다.
 * 리뷰 관련 API는 features/review/api/reviewApi.js로 분리되었다.
 * axios interceptor가 JWT 토큰을 자동 주입하며, 비인증 상태에서도 조회는 가능하다.
 */

/* 공용 axios 인스턴스 — JWT 자동 주입 + 401 갱신 */
import api from '../../../shared/api/axiosInstance';
/* API 상수 — shared/constants에서 가져옴 */
import { COMMUNITY_ENDPOINTS } from '../../../shared/constants/api';

// ── 게시글 (Posts) ──

/**
 * 게시글 목록을 조회한다.
 *
 * @param {Object} [params={}] - 조회 파라미터
 * @param {number} [params.page=1] - 페이지 번호
 * @param {number} [params.size=20] - 페이지 크기
 * @param {string} [params.sort='latest'] - 정렬 기준 (latest, popular)
 * @returns {Promise<Object>} 게시글 목록 ({ posts: [], total: number, page: number })
 */
export async function getPosts({ page = 1, size = 20, sort = 'latest' } = {}) {
  return api.get(COMMUNITY_ENDPOINTS.POSTS, { params: { page, size, sort } });
}

/**
 * 게시글 상세 정보를 조회한다.
 *
 * @param {number|string} postId - 게시글 ID
 * @returns {Promise<Object>} 게시글 상세 (id, title, content, author, createdAt, comments 등)
 */
export async function getPostDetail(postId) {
  return api.get(COMMUNITY_ENDPOINTS.POST_DETAIL(postId));
}

/**
 * 새 게시글을 작성한다.
 * 인증이 필요하다 (interceptor가 Authorization 헤더 자동 포함).
 *
 * @param {Object} postData - 게시글 데이터
 * @param {string} postData.title - 게시글 제목
 * @param {string} postData.content - 게시글 내용
 * @param {string} [postData.category='general'] - 카테고리 (general, review, question)
 * @returns {Promise<Object>} 생성된 게시글 정보
 */
export async function createPost({ title, content, category = 'general' }) {
  return api.post(COMMUNITY_ENDPOINTS.CREATE_POST, { title, content, category });
}
