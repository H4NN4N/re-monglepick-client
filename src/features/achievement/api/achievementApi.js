/**
 * 업적/도장깨기 API 모듈.
 *
 * Backend의 AchievementController와 통신하여
 * 업적 목록, 도장깨기 현황을 조회한다.
 *
 * @module features/achievement/api/achievementApi
 */

import { backendApi, requireAuth } from '../../../shared/api/axiosInstance';
import { ACHIEVEMENT_ENDPOINTS } from '../../../shared/constants/api';

/**
 * 사용자 업적 목록 조회.
 *
 * @param {Object} params
 * @param {string} [params.category] - 카테고리 필터 (VIEWING, SOCIAL, COLLECTION, CHALLENGE)
 * @returns {Promise<Array<{id, name, description, category, iconUrl, progress, maxProgress, achieved, achievedAt}>>}
 */
export async function getAchievements({ category } = {}) {
  requireAuth();
  const params = {};
  if (category) params.category = category;
  return backendApi.get(ACHIEVEMENT_ENDPOINTS.LIST, { params });
}

/**
 * 업적 상세 조회.
 *
 * @param {string|number} achievementId
 * @returns {Promise<Object>}
 */
export async function getAchievementDetail(achievementId) {
  requireAuth();
  return backendApi.get(ACHIEVEMENT_ENDPOINTS.DETAIL(achievementId));
}

/**
 * 도장깨기 목록 조회.
 *
 * @returns {Promise<Array<{id, name, description, movies: Array, completedCount, totalCount, reward}>>}
 */
export async function getStampRallies() {
  requireAuth();
  return backendApi.get(ACHIEVEMENT_ENDPOINTS.STAMP_RALLY);
}

/**
 * 도장깨기 상세 조회.
 *
 * @param {string|number} rallyId
 * @returns {Promise<{id, name, description, movies: Array, completedMovies: Array, reward}>}
 */
export async function getStampRallyDetail(rallyId) {
  requireAuth();
  return backendApi.get(ACHIEVEMENT_ENDPOINTS.STAMP_RALLY_DETAIL(rallyId));
}
