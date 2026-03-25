/**
 * 현재 구독 상태 표시 컴포넌트.
 *
 * 활성 구독이 있으면 구독 정보(상품명, 상태, 시작일, 만료일)와 취소 버튼을 표시한다.
 * 구독이 없으면 구독 유도 메시지를 표시한다.
 *
 * @param {Object} props
 * @param {Object|null} props.subscriptionStatus - 구독 상태 데이터
 * @param {boolean} props.hasActiveSubscription - 활성 구독 존재 여부
 * @param {boolean} props.isLoading - 로딩 상태
 * @param {boolean} props.isCancelling - 취소 처리 중 여부
 * @param {Function} props.onCancel - 구독 취소 핸들러
 * @param {Function} props.formatDate - 날짜 포맷팅 함수
 */

import Loading from '../../../shared/components/Loading/Loading';
import './SubscriptionStatus.css';

export default function SubscriptionStatus({
  subscriptionStatus,
  hasActiveSubscription,
  isLoading,
  isCancelling,
  onCancel,
  formatDate,
}) {
  if (isLoading) {
    return <Loading message="구독 상태 확인 중..." />;
  }

  /* 구독 없음 */
  if (!hasActiveSubscription) {
    return (
      <div className="subscription-status__empty">
        <p className="subscription-status__empty-text">
          현재 활성화된 구독이 없습니다.
        </p>
        <p className="subscription-status__empty-hint">
          위 구독 상품을 선택하여 더 많은 혜택을 받아보세요!
        </p>
      </div>
    );
  }

  /* 활성 구독 정보 표시 */
  return (
    <div className="subscription-status__card">
      {/* 구독 정보 */}
      <div className="subscription-status__info">
        <div className="subscription-status__field">
          <span className="subscription-status__label">구독 상품</span>
          <span className="subscription-status__value">
            {subscriptionStatus?.planName || '-'}
          </span>
        </div>
        <div className="subscription-status__field">
          <span className="subscription-status__label">상태</span>
          <span
            className="subscription-status__value"
            style={{
              color:
                subscriptionStatus?.status === 'ACTIVE'
                  ? 'var(--success)'
                  : subscriptionStatus?.status === 'CANCELLED'
                    ? 'var(--warning)'
                    : 'var(--text-secondary)',
            }}
          >
            {subscriptionStatus?.status === 'ACTIVE'
              ? '구독 중'
              : subscriptionStatus?.status === 'CANCELLED'
                ? '취소됨 (만료일까지 이용 가능)'
                : subscriptionStatus?.status || '-'}
          </span>
        </div>
        <div className="subscription-status__field">
          <span className="subscription-status__label">시작일</span>
          <span className="subscription-status__value">
            {formatDate(subscriptionStatus?.startedAt || subscriptionStatus?.startDate)}
          </span>
        </div>
        <div className="subscription-status__field">
          <span className="subscription-status__label">만료일</span>
          <span className="subscription-status__value">
            {formatDate(subscriptionStatus?.expiresAt || subscriptionStatus?.endDate)}
          </span>
        </div>
      </div>

      {/* 구독 취소 버튼 — ACTIVE 상태에서만 표시 */}
      {subscriptionStatus?.status === 'ACTIVE' && (
        <button
          className="subscription-status__cancel-btn"
          onClick={onCancel}
          disabled={isCancelling}
        >
          {isCancelling ? '취소 처리 중...' : '구독 취소'}
        </button>
      )}
    </div>
  );
}
