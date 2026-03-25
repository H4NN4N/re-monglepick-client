/**
 * 포인트 이력 섹션 컴포넌트.
 *
 * 적립/차감 내역을 테이블로 표시하고, 페이지네이션을 제공한다.
 * 양수(적립)는 초록색, 음수(차감)는 빨간색으로 구분한다.
 *
 * @param {Object} props
 * @param {Object} props.history - 이력 페이지 데이터 {content, totalPages, totalElements}
 * @param {number} props.historyPage - 현재 페이지 번호 (0-indexed)
 * @param {boolean} props.isLoading - 로딩 상태
 * @param {Function} props.onPageChange - 페이지 변경 핸들러
 * @param {Function} props.formatNumber - 숫자 포맷팅 함수
 * @param {Function} props.formatDate - 날짜 포맷팅 함수
 */

import Loading from '../../../shared/components/Loading/Loading';
import './PointHistory.css';

export default function PointHistory({
  history,
  historyPage,
  isLoading,
  onPageChange,
  formatNumber,
  formatDate,
}) {
  return (
    <section className="point-page__section point-page__history">
      <h2 className="point-page__section-title">
        포인트 이력
        {history.totalElements > 0 && (
          <span className="point-page__history-count">
            ({formatNumber(history.totalElements)}건)
          </span>
        )}
      </h2>

      {isLoading ? (
        <Loading message="이력 로딩 중..." />
      ) : history.content.length === 0 ? (
        <div className="point-page__history-empty">
          <p>포인트 이력이 없습니다.</p>
        </div>
      ) : (
        <>
          {/* 이력 테이블 */}
          <div className="point-page__history-table-wrapper">
            <table className="point-page__history-table">
              <thead>
                <tr>
                  <th>내용</th>
                  <th>변동</th>
                  <th>잔액</th>
                  <th>일시</th>
                </tr>
              </thead>
              <tbody>
                {history.content.map((item, idx) => {
                  /* 양수(적립)는 초록색, 음수(차감)는 빨간색 */
                  const isPositive = item.pointChange > 0;
                  return (
                    <tr key={item.id || idx}>
                      <td className="point-page__history-desc">
                        {item.description || '-'}
                      </td>
                      <td
                        className={[
                          'point-page__history-change',
                          isPositive
                            ? 'point-page__history-change--positive'
                            : 'point-page__history-change--negative',
                        ].join(' ')}
                      >
                        {isPositive ? '+' : ''}{formatNumber(item.pointChange)}P
                      </td>
                      <td className="point-page__history-after">
                        {formatNumber(item.pointAfter)}P
                      </td>
                      <td className="point-page__history-date">
                        {formatDate(item.createdAt)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* 페이지네이션 */}
          {history.totalPages > 1 && (
            <div className="point-page__pagination">
              {/* 이전 페이지 */}
              <button
                className="point-page__pagination-btn"
                onClick={() => onPageChange((prev) => Math.max(0, prev - 1))}
                disabled={historyPage === 0}
              >
                이전
              </button>

              {/* 페이지 번호 */}
              <span className="point-page__pagination-info">
                {historyPage + 1} / {history.totalPages}
              </span>

              {/* 다음 페이지 */}
              <button
                className="point-page__pagination-btn"
                onClick={() =>
                  onPageChange((prev) => Math.min(history.totalPages - 1, prev + 1))
                }
                disabled={historyPage >= history.totalPages - 1}
              >
                다음
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
