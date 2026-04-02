/**
 * 채팅 이력 API 모듈.
 *
 * Backend의 ChatHistoryController와 통신하여
 * 이전 채팅 목록 조회, 세션 상세, 삭제, 제목 변경을 수행한다.
 *
 * backendApi 인스턴스를 사용하므로 JWT 자동 주입/갱신이 적용된다.
 *
 * @module features/chat/api/sessionHistoryApi
 */

import { backendApi } from '../../../shared/api/axiosInstance';

/**
 * 사용자의 이전 채팅 세션 목록을 조회한다 (페이징).
 *
 * @param {number} [page=0] - 페이지 번호 (0부터 시작)
 * @param {number} [size=20] - 페이지 크기
 * @returns {Promise<{content: Array, totalPages: number, totalElements: number, ...}>}
 *          Spring Page 응답 객체
 */
export async function fetchSessionList(page = 0, size = 20) {
  return backendApi.get('/api/v1/chat/history', {
    params: { page, size },
  });
}

/**
 * 세션 상세를 조회한다 (메시지 포함).
 * 이전 대화를 이어서 진행할 때 메시지를 로드하기 위해 사용한다.
 *
 * @param {string} sessionId - 세션 UUID
 * @returns {Promise<{sessionId, title, messages, turnCount, startedAt, lastMessageAt}>}
 */
export async function fetchSessionDetail(sessionId) {
  return backendApi.get(`/api/v1/chat/history/${sessionId}`);
}

/**
 * 세션을 소프트 삭제한다.
 * 삭제된 세션은 목록에서 제외되며, 30일 후 물리삭제된다.
 *
 * @param {string} sessionId - 세션 UUID
 * @returns {Promise<void>}
 */
export async function deleteSessionApi(sessionId) {
  return backendApi.delete(`/api/v1/chat/history/${sessionId}`);
}

/**
 * 세션 제목을 변경한다.
 *
 * @param {string} sessionId - 세션 UUID
 * @param {string} title - 새 제목
 * @returns {Promise<void>}
 */
export async function updateSessionTitleApi(sessionId, title) {
  return backendApi.patch(`/api/v1/chat/history/${sessionId}/title`, { title });
}
