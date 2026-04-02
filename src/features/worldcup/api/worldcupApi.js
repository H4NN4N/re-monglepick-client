/**
 * 월드컵 API 모듈.
 *
 * Backend의 WorldcupController와 통신하여
 * 영화 이상형 월드컵 게임을 진행한다.
 *
 * @module features/worldcup/api/worldcupApi
 */

import { backendApi, requireAuth } from '../../../shared/api/axiosInstance';
import { WORLDCUP_ENDPOINTS } from '../../../shared/constants/api';

/**
 * 월드컵 게임 시작.
 * 서버에서 라운드에 맞는 영화 목록을 반환한다.
 *
 * @param {Object} params
 * @param {number} [params.round=16] - 토너먼트 라운드 (8, 16, 32)
 * @param {string} [params.genre] - 장르 필터
 * @returns {Promise<{gameId, round, matches: Array<{matchId, movie1, movie2}>}>}
 */
export async function startWorldcup({ round = 16, genre } = {}) {
  requireAuth();
  const body = { round };
  if (genre) body.genre = genre;
  return backendApi.post(WORLDCUP_ENDPOINTS.START, body);
}

/**
 * 선택 제출 (한 매치 결과).
 *
 * @param {Object} params
 * @param {string} params.gameId - 게임 ID
 * @param {string} params.matchId - 매치 ID
 * @param {string} params.winnerId - 선택한 영화 ID
 * @returns {Promise<{nextMatch?: Object, isFinished: boolean, finalWinner?: Object}>}
 */
export async function submitPick({ gameId, matchId, winnerId }) {
  requireAuth();
  return backendApi.post(WORLDCUP_ENDPOINTS.PICK, { gameId, matchId, winnerId });
}

/**
 * 게임 결과 조회.
 *
 * @param {string} gameId
 * @returns {Promise<{gameId, winner, rankings: Array, completedAt}>}
 */
export async function getWorldcupResult(gameId) {
  requireAuth();
  return backendApi.get(WORLDCUP_ENDPOINTS.RESULT(gameId));
}

/**
 * 최근 월드컵 결과 이력.
 *
 * @param {Object} params
 * @param {number} [params.page=0]
 * @param {number} [params.size=10]
 * @returns {Promise<{content: Array, totalPages: number}>}
 */
export async function getWorldcupHistory({ page = 0, size = 10 } = {}) {
  requireAuth();
  return backendApi.get(WORLDCUP_ENDPOINTS.HISTORY, { params: { page, size } });
}
