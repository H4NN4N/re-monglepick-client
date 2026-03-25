/**
 * 결제 내역 테이블 + 페이지네이션 컴포넌트.
 *
 * 과거 결제 주문 목록을 테이블 형태로 표시하며,
 * Spring Page 응답 기반 페이지네이션을 제공한다.
 *
 * @param {Object} props
 * @param {Object} props.orders - 주문 페이지 데이터 ({ content: [], totalPages, totalElements })
 * @param {number} props.orderPage - 현재 페이지 번호 (0-indexed)
 * @param {boolean} props.isLoading - 로딩 상태
 * @param {Function} props.onPageChange - 페이지 변경 핸들러 (setter 함수)
 * @param {Function} props.formatNumber - 숫자 포맷팅 함수
 * @param {Function} props.formatDate - 날짜 포맷팅 함수
 */

import Loading from '../../../shared/components/Loading/Loading';
import './OrderHistory.css';

/** 주문 상태별 표시 라벨 및 색상 */
const ORDER_STATUS_CONFIG = {
  PENDING: { label: '대기 중', color: 'var(--warning)' },
  COMPLETED: { label: '완료', color: 'var(--success)' },
  FAILED: { label: '실패', color: 'var(--error)' },
  REFUNDED: { label: '환불', color: 'var(--text-muted)' },
  CANCELLED: { label: '취소', color: 'var(--text-muted)' },
};

/** 주문 유형별 표시 라벨 */
const ORDER_TYPE_LABELS = {
  POINT_CHARGE: '포인트 충전',
  POINT_PURCHASE: '포인트 충전',
  SUBSCRIPTION: '구독 결제',
};

export default function OrderHistory({
  orders,
  orderPage,
  isLoading,
  onPageChange,
  formatNumber,
  formatDate,
}) {
  if (isLoading) {
    return <Loading message="결제 내역 로딩 중..." />;
  }

  if (orders.content.length === 0) {
    return (
      <div className="order-history__empty">
        <p>결제 내역이 없습니다.</p>
      </div>
    );
  }

  return (
    <>
      {/* 결제 내역 테이블 */}
      <div className="order-history__table-wrapper">
        <table className="order-history__table">
          <thead>
            <tr>
              <th>주문번호</th>
              <th>유형</th>
              <th>금액</th>
              <th>상태</th>
              <th>일시</th>
            </tr>
          </thead>
          <tbody>
            {orders.content.map((order, idx) => {
              const statusConfig = ORDER_STATUS_CONFIG[order.status] || {
                label: order.status,
                color: 'var(--text-secondary)',
              };

              return (
                <tr key={order.orderId || idx}>
                  <td className="order-history__order-id">
                    {order.orderId
                      ? `${order.orderId.slice(0, 8)}...`
                      : '-'}
                  </td>
                  <td>
                    {ORDER_TYPE_LABELS[order.orderType] || order.orderType || '-'}
                  </td>
                  <td className="order-history__order-amount">
                    {formatNumber(order.amount)}원
                  </td>
                  <td>
                    <span
                      className="order-history__order-status"
                      style={{ color: statusConfig.color }}
                    >
                      {statusConfig.label}
                    </span>
                  </td>
                  <td className="order-history__order-date">
                    {formatDate(order.completedAt || order.createdAt)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      {orders.totalPages > 1 && (
        <div className="order-history__pagination">
          <button
            className="order-history__pagination-btn"
            onClick={() => onPageChange((prev) => Math.max(0, prev - 1))}
            disabled={orderPage === 0}
          >
            이전
          </button>
          <span className="order-history__pagination-info">
            {orderPage + 1} / {orders.totalPages}
          </span>
          <button
            className="order-history__pagination-btn"
            onClick={() =>
              onPageChange((prev) => Math.min(orders.totalPages - 1, prev + 1))
            }
            disabled={orderPage >= orders.totalPages - 1}
          >
            다음
          </button>
        </div>
      )}
    </>
  );
}
