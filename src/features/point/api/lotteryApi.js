/**
 * 영화 티켓 추첨 응모 현황 API 모듈 (2026-04-28 신규).
 *
 * <p>응모권(APPLY_MOVIE_TICKET) 사용 시 자동 발급된 entry 의 회차/결과를 조회한다.
 * 응모 자체는 {@code userItemApi.useItem()} 이 트랜잭션 내에서 처리하므로
 * 이 모듈에서는 별도 응모 EP 가 없다 (조회 전용).</p>
 *
 * Backend 경로: /api/v1/users/me/lottery/**
 * 모든 요청은 JWT 인증 필수.
 *
 * @module lotteryApi
 */

import api, { requireAuth } from '../../../shared/api/axiosInstance';
import { LOTTERY_ENDPOINTS } from '../../../shared/constants/api';

/**
 * 내 응모 현황 페이징 조회.
 *
 * <p>Backend 가 createdAt DESC 로 정렬하므로 별도 sort 파라미터는 받지 않는다.
 * 각 항목은 회차(YYYY-MM), 결과(PENDING/WON/LOST), 응모 시각, 추첨 시각을 포함한다.</p>
 *
 * @param {Object} [opts={}]
 * @param {number} [opts.page=0]  - 0-indexed
 * @param {number} [opts.size=20]
 * @returns {Promise<Object>} EntryPageResponse
 *   - content: [{ entryId, cycleYearMonth, status, enrolledAt, drawnAt }]
 *   - page, size, totalElements, totalPages
 */
export async function getMyLotteryEntries({ page = 0, size = 20 } = {}) {
  requireAuth();
  return api.get(LOTTERY_ENDPOINTS.MY_ENTRIES, { params: { page, size } });
}
