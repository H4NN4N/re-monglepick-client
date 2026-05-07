/**
 * @typedef {Object} UnlockedAchievement
 * @property {number} achievementId
 * @property {string} code
 * @property {string} name
 * @property {string|null} description
 * @property {string|null} iconUrl
 * @property {number|null} rewardPoints
 *
 * @template T
 * @typedef {Object} AchievementAwareResponse
 * @property {T} data
 * @property {UnlockedAchievement[]} unlockedAchievements
 */

/**
 * 백엔드 업적 공통 응답을 프론트에서 항상 같은 형태로 다루게 정규화한다.
 * 레거시 직접 DTO 응답도 data로 감싸서 호출부 호환성을 유지한다.
 *
 * @template T
 * @param {AchievementAwareResponse<T>|T} response
 * @returns {AchievementAwareResponse<T>}
 */
export function normalizeAchievementAwareResponse(response) {
  if (
    response &&
    typeof response === 'object' &&
    Object.prototype.hasOwnProperty.call(response, 'data') &&
    Object.prototype.hasOwnProperty.call(response, 'unlockedAchievements')
  ) {
    return {
      data: response.data,
      unlockedAchievements: Array.isArray(response.unlockedAchievements)
        ? response.unlockedAchievements
        : [],
    };
  }

  return {
    data: response,
    unlockedAchievements: [],
  };
}

/**
 * 업적 배열이 있을 때만 true를 반환한다.
 *
 * @param {AchievementAwareResponse<unknown>|null|undefined} response
 * @returns {boolean}
 */
export function hasUnlockedAchievements(response) {
  return Array.isArray(response?.unlockedAchievements) && response.unlockedAchievements.length > 0;
}
