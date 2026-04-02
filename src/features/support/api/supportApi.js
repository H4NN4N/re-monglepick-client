/**
 * 고객센터(Support) API 모듈.
 *
 * FAQ 조회, FAQ 피드백, 도움말 문서, 상담 티켓 관련 HTTP 요청을 처리한다.
 * FAQ/도움말은 비인증 사용자도 조회 가능하며,
 * 티켓 생성/조회와 FAQ 피드백은 인증이 필요하다.
 */

/* 공용 axios 인스턴스 + 인증 필수 가드 */
import api, { requireAuth } from '../../../shared/api/axiosInstance';
/* API 상수 — shared/constants에서 가져옴 */
import { SUPPORT_ENDPOINTS } from '../../../shared/constants/api';

// ── FAQ ──

/**
 * FAQ 목록을 조회한다.
 * 인증 없이 접근 가능한 공개 API.
 *
 * @param {string} [category] - FAQ 카테고리 필터 (GENERAL, ACCOUNT, CHAT, RECOMMENDATION, COMMUNITY, PAYMENT)
 * @returns {Promise<Array<Object>>} FAQ 배열
 */
export async function getFaqs(category) {
  const params = {};
  if (category) params.category = category;
  return api.get(SUPPORT_ENDPOINTS.FAQ, { params });
}

/**
 * FAQ에 대한 피드백(도움됨/안됨)을 제출한다.
 * 인증된 사용자만 피드백을 남길 수 있다.
 *
 * @param {number|string} faqId - 피드백 대상 FAQ ID
 * @param {boolean} helpful - 도움이 되었는지 여부
 * @returns {Promise<Object>} 피드백 결과
 */
export async function submitFaqFeedback(faqId, helpful) {
  requireAuth();
  return api.post(SUPPORT_ENDPOINTS.FAQ_FEEDBACK(faqId), { helpful });
}

// ── 도움말 ──

/**
 * 도움말 문서 목록을 조회한다.
 * 인증 없이 접근 가능한 공개 API.
 *
 * @param {string} [category] - 도움말 카테고리 필터
 * @returns {Promise<Array<Object>>} 도움말 문서 배열
 */
export async function getHelpArticles(category) {
  const params = {};
  if (category) params.category = category;
  return api.get(SUPPORT_ENDPOINTS.HELP, { params });
}

// ── 상담 티켓 ──

/**
 * 상담 티켓을 생성한다.
 * 인증된 사용자만 티켓을 생성할 수 있다.
 *
 * @param {Object} ticketData - 티켓 생성 정보
 * @param {string} ticketData.category - 문의 카테고리
 * @param {string} ticketData.title - 문의 제목 (2~100자)
 * @param {string} ticketData.content - 문의 내용 (10~2000자)
 * @returns {Promise<Object>} 생성된 티켓 정보
 */
export async function createTicket({ category, title, content }) {
  requireAuth();
  return api.post(SUPPORT_ENDPOINTS.CREATE_TICKET, { category, title, content });
}

/**
 * 내 상담 티켓 목록을 조회한다 (페이징).
 *
 * @param {number} [page=0] - 페이지 번호 (0부터 시작, Spring Page 규격)
 * @param {number} [size=10] - 페이지 크기
 * @returns {Promise<Object>} Spring Page 응답
 */
export async function getMyTickets(page = 0, size = 10) {
  requireAuth();
  return api.get(SUPPORT_ENDPOINTS.MY_TICKETS, { params: { page, size } });
}

/**
 * 상담 티켓 상세 정보를 조회한다 (답변 이력 포함).
 * 인증된 사용자만 본인 티켓을 조회할 수 있다.
 *
 * @param {number|string} ticketId - 티켓 ID
 * @returns {Promise<Object>} 티켓 상세 (ticket 정보 + replies 배열)
 */
export async function getTicketDetail(ticketId) {
  requireAuth();
  return api.get(SUPPORT_ENDPOINTS.TICKET_DETAIL(ticketId));
}

// ── AI 챗봇 ──

/**
 * AI 고객센터 챗봇에 메시지를 전송한다.
 * FAQ 매칭 + LLM 자동응답을 수행하며,
 * 해결되지 않으면 상담원 이관을 안내한다.
 *
 * @param {Object} params
 * @param {string} params.message - 사용자 메시지
 * @param {string} [params.sessionId] - 세션 ID (맥락 유지용)
 * @returns {Promise<{answer: string, matchedFaqs: Array, needsHumanAgent: boolean, sessionId: string}>}
 */
export async function sendChatbotMessage({ message, sessionId }) {
  return api.post(SUPPORT_ENDPOINTS.CHATBOT, { message, sessionId });
}
