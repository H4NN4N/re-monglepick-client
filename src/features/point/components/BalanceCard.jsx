/**
 * 포인트 잔액 요약 카드 컴포넌트.
 *
 * 보유 포인트, 등급 배지, 총 획득 포인트, 충전 버튼을 표시한다.
 *
 * @param {Object} props
 * @param {Object|null} props.balanceInfo - 잔액 정보 {balance, grade, totalEarned}
 * @param {boolean} props.isLoading - 로딩 상태
 * @param {Function} props.onNavigatePayment - 충전 버튼 클릭 핸들러
 * @param {Function} props.formatNumber - 숫자 포맷팅 함수
 */

import Loading from '../../../shared/components/Loading/Loading';
import './BalanceCard.css';

/** 등급별 표시 설정 (색상, 라벨) */
const GRADE_CONFIG = {
  BRONZE: { label: 'Bronze', color: '#cd7f32', bg: 'rgba(205, 127, 50, 0.15)' },
  SILVER: { label: 'Silver', color: '#c0c0c0', bg: 'rgba(192, 192, 192, 0.15)' },
  GOLD: { label: 'Gold', color: '#ffd700', bg: 'rgba(255, 215, 0, 0.15)' },
  PLATINUM: { label: 'Platinum', color: '#e5e4e2', bg: 'rgba(229, 228, 226, 0.15)' },
};

export default function BalanceCard({
  balanceInfo,
  isLoading,
  onNavigatePayment,
  formatNumber,
}) {
  /* 등급 설정 */
  const gradeKey = balanceInfo?.grade || 'BRONZE';
  const gradeConfig = GRADE_CONFIG[gradeKey] || GRADE_CONFIG.BRONZE;

  return (
    <section className="point-page__section point-page__summary">
      {isLoading ? (
        <Loading message="포인트 정보 로딩 중..." />
      ) : (
        <div className="point-page__summary-card">
          {/* 좌측: 잔액 정보 */}
          <div className="point-page__summary-left">
            <p className="point-page__summary-label">보유 포인트</p>
            <p className="point-page__summary-balance">
              {formatNumber(balanceInfo?.balance)}
              <span className="point-page__summary-unit">P</span>
            </p>
            <p className="point-page__summary-earned">
              총 획득: {formatNumber(balanceInfo?.totalEarned)}P
            </p>
          </div>

          {/* 우측: 등급 배지 + 충전 버튼 */}
          <div className="point-page__summary-right">
            <div
              className="point-page__grade-badge"
              style={{
                backgroundColor: gradeConfig.bg,
                color: gradeConfig.color,
                borderColor: gradeConfig.color,
              }}
            >
              {gradeConfig.label}
            </div>
            <button
              className="point-page__charge-btn"
              onClick={onNavigatePayment}
            >
              충전하기
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
