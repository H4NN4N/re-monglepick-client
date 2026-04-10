/**
 * 공지사항(Notice) API 모듈.
 *
 * 앱 메인 화면에 노출되는 활성 공지(BANNER/POPUP/MODAL)를 조회한다.
 * Backend GET /api/v1/notices — 비로그인 허용 (Public API).
 *
 * 응답 형태: NoticeResponse[]
 *   { noticeId, title, content, noticeType, displayType,
 *     linkUrl, imageUrl, startAt, endAt, priority, isActive, ... }
 */

import { backendApi } from './axiosInstance';
import { NOTICE_ENDPOINTS } from '../constants/api';

/**
 * 현재 노출 중인 앱 메인 공지 목록을 조회한다.
 *
 * @param {string} [type] - 노출 방식 필터 (BANNER/POPUP/MODAL, 생략 시 전체)
 * @returns {Promise<Array>} 활성 공지 목록 (priority DESC, createdAt DESC)
 */
export async function getActiveNotices(type) {
  const params = {};
  if (type) params.type = type;
  const { data } = await backendApi.get(NOTICE_ENDPOINTS.ACTIVE, { params });
  return data;
}
