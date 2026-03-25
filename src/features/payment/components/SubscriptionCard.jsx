/**
 * 구독 상품 카드 컴포넌트.
 *
 * 개별 구독 플랜의 정보를 카드 형태로 표시한다.
 * 상품명, 가격, 포인트 지급량, 가성비, 구독 버튼을 포함한다.
 *
 * @param {Object} props
 * @param {Object} props.plan - 구독 상품 데이터
 * @param {string} props.plan.planCode - 상품 코드
 * @param {string} props.plan.name - 상품명
 * @param {number} props.plan.price - 가격 (원)
 * @param {number} props.plan.pointsPerPeriod - 주기당 지급 포인트
 * @param {string} props.plan.periodType - 주기 (MONTHLY, YEARLY)
 * @param {string} [props.plan.description] - 상품 설명
 * @param {boolean} [props.plan.best] - 최고 혜택 여부
 * @param {string|null} props.processingId - 현재 결제 처리 중인 상품 코드
 * @param {Function} props.onSubscribe - 구독 버튼 클릭 핸들러
 * @param {Function} props.formatNumber - 숫자 포맷팅 함수
 */

import './SubscriptionCard.css';

/** 구독 주기별 표시 라벨 */
const PERIOD_TYPE_LABELS = {
  MONTHLY: '월',
  YEARLY: '년',
};

export default function SubscriptionCard({ plan, processingId, onSubscribe, formatNumber }) {
  /* 포인트 단가 계산 (포인트당 원) — 높을수록 가성비 좋음 */
  const valuePerWon = plan.price > 0
    ? (plan.pointsPerPeriod / plan.price).toFixed(1)
    : 0;
  /* 최고 혜택 플랜 표시 여부 */
  const isBest = plan.best || plan.planCode === 'yearly_premium';
  const periodLabel = PERIOD_TYPE_LABELS[plan.periodType] || '월';

  return (
    <div
      className={[
        'subscription-card',
        isBest ? 'subscription-card--best' : '',
      ].join(' ')}
    >
      {/* 최고 혜택 배지 */}
      {isBest && (
        <div className="subscription-card__badge">BEST</div>
      )}

      {/* 상품명 */}
      <h3 className="subscription-card__name">{plan.name}</h3>

      {/* 가격 */}
      <div className="subscription-card__price">
        <span className="subscription-card__price-amount">
          {formatNumber(plan.price)}
        </span>
        <span className="subscription-card__price-unit">원/{periodLabel}</span>
      </div>

      {/* 포인트 지급량 */}
      <p className="subscription-card__points">
        {formatNumber(plan.pointsPerPeriod)}P 지급
      </p>

      {/* 가성비 표시 */}
      <p className="subscription-card__value">
        1원당 {valuePerWon}P
      </p>

      {/* 설명 */}
      {plan.description && (
        <p className="subscription-card__desc">{plan.description}</p>
      )}

      {/* 구독 버튼 */}
      <button
        className={[
          'subscription-card__btn',
          isBest ? 'subscription-card__btn--best' : '',
        ].join(' ')}
        onClick={() => onSubscribe(plan)}
        disabled={processingId === plan.planCode}
      >
        {processingId === plan.planCode ? '처리 중...' : '구독하기'}
      </button>
    </div>
  );
}
