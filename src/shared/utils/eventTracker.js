/**
 * 이벤트 배치 전송 유틸리티 (Phase 2).
 *
 * 사용자 행동 이벤트(클릭, 호버, 검색, 트레일러 재생 등)를
 * 메모리 큐에 쌓고, 일정 조건(5초 주기 또는 10건 도달) 시
 * POST /api/v1/events/batch 로 배치 전송한다.
 *
 * 페이지 언로드 시 navigator.sendBeacon으로 잔여 이벤트를 전송하여
 * 데이터 유실을 최소화한다.
 *
 * 사용법:
 *   import { trackEvent } from '../../../shared/utils/eventTracker';
 *   trackEvent('recommendation_card_click', movieId, { rank: 1, source: 'chat' });
 *
 * @module shared/utils/eventTracker
 */

import { backendApi } from '../api/axiosInstance';
import { getToken } from './storage';
import { SERVICE_URLS } from '../api/serviceUrls';

// ── 설정 상수 ──

/** 배치 전송 주기 (밀리초) */
const FLUSH_INTERVAL_MS = 5000;

/** 큐 임계값 — 이 수에 도달하면 즉시 flush */
const FLUSH_THRESHOLD = 10;

/** 큐 최대 크기 — 전송 실패 시 재삽입 상한 */
const MAX_QUEUE_SIZE = 100;

// ── 내부 상태 ──

/** @type {Array<{eventType: string, movieId: string|null, recommendScore: number|null, metadata: string|null}>} */
const eventQueue = [];

/** flush 중복 실행 방지 플래그 */
let isFlushing = false;

/** 주기적 flush 타이머 ID */
let flushTimerId = null;

// ── 공개 API ──

/**
 * 이벤트를 큐에 추가한다.
 *
 * 큐가 FLUSH_THRESHOLD에 도달하면 즉시 배치 전송을 트리거한다.
 * 비로그인 상태에서도 큐에 쌓지만, flush 시 토큰이 없으면 전송을 건너뛴다.
 *
 * @param {string} eventType - 이벤트 유형 (click, hover, search, trailer_play, skip 등)
 * @param {string|null} [movieId=null] - 관련 영화 ID (영화 무관 이벤트는 null)
 * @param {Object} [metadata={}] - 추가 메타데이터 (JSON 직렬화됨)
 */
export function trackEvent(eventType, movieId = null, metadata = {}) {
  if (!eventType) return;

  eventQueue.push({
    eventType,
    movieId: movieId || null,
    recommendScore: null,
    metadata: Object.keys(metadata).length > 0 ? JSON.stringify(metadata) : null,
  });

  // 임계값 도달 시 즉시 flush
  if (eventQueue.length >= FLUSH_THRESHOLD) {
    flushEvents();
  }
}

/**
 * 큐에 쌓인 이벤트를 Backend로 배치 전송한다.
 *
 * 전송 실패 시 이벤트를 큐 앞에 재삽입한다 (MAX_QUEUE_SIZE까지).
 * 비로그인 상태(토큰 없음)에서는 전송을 건너뛴다.
 */
export async function flushEvents() {
  if (isFlushing || eventQueue.length === 0) return;

  // 비로그인 시 전송 건너뜀
  const token = getToken();
  if (!token) return;

  isFlushing = true;
  const batch = eventQueue.splice(0);

  try {
    await backendApi.post('/api/v1/events/batch', batch);
  } catch (err) {
    // 전송 실패 시 큐 앞에 재삽입 (상한 초과분은 버림)
    const spaceLeft = MAX_QUEUE_SIZE - eventQueue.length;
    if (spaceLeft > 0) {
      eventQueue.unshift(...batch.slice(0, spaceLeft));
    }

    if (import.meta.env.DEV) {
      console.warn('[EventTracker] 배치 전송 실패:', err.message, '재삽입:', Math.min(batch.length, spaceLeft), '건');
    }
  } finally {
    isFlushing = false;
  }
}

// ── 주기적 flush (5초 간격) ──

/**
 * 주기적 flush 타이머를 시작한다.
 * 이미 실행 중이면 중복 시작하지 않는다.
 */
export function startEventTracker() {
  if (flushTimerId !== null) return;
  flushTimerId = setInterval(flushEvents, FLUSH_INTERVAL_MS);
}

/**
 * 주기적 flush 타이머를 중지한다.
 */
export function stopEventTracker() {
  if (flushTimerId !== null) {
    clearInterval(flushTimerId);
    flushTimerId = null;
  }
}

// ── 페이지 언로드 시 sendBeacon으로 잔여 이벤트 전송 ──

if (typeof window !== 'undefined') {
  // 모듈 로드 시 자동 시작
  startEventTracker();

  window.addEventListener('beforeunload', () => {
    if (eventQueue.length === 0) return;

    const token = getToken();
    if (!token) return;

    // sendBeacon은 페이지 언로드 중에도 안정적으로 전송 가능
    const baseUrl = SERVICE_URLS.BACKEND;
    const url = `${baseUrl}/api/v1/events/batch`;
    const blob = new Blob(
      [JSON.stringify(eventQueue.splice(0))],
      { type: 'application/json' }
    );

    // sendBeacon에는 Authorization 헤더를 첨부할 수 없으므로,
    // 서버에서 쿠키 기반 인증 또는 비인증 배치 엔드포인트가 필요할 수 있다.
    // 현재는 best-effort로 전송 시도한다.
    try {
      navigator.sendBeacon(url, blob);
    } catch {
      // sendBeacon 실패 시 무시 (페이지가 닫히는 중)
    }
  });
}
