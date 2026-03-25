/**
 * 문의하기 + 내 문의 내역 탭 컴포넌트.
 *
 * 활성 섹션에 따라 문의 폼 또는 티켓 내역을 렌더링한다.
 * - 'ticket' 섹션: 문의 등록 폼 (카테고리/제목/내용 입력)
 * - 'history' 섹션: 내 티켓 목록 + 페이지네이션
 *
 * @param {Object} props
 * @param {string} props.activeSection - 현재 활성 섹션 ('ticket' | 'history')
 * @param {boolean} props.isAuthenticated - 인증 상태
 * @param {string} props.ticketCategory - 선택된 문의 카테고리
 * @param {Function} props.onCategoryChange - 카테고리 변경 핸들러
 * @param {string} props.ticketTitle - 문의 제목
 * @param {Function} props.onTitleChange - 제목 변경 핸들러
 * @param {string} props.ticketContent - 문의 내용
 * @param {Function} props.onContentChange - 내용 변경 핸들러
 * @param {boolean} props.isSubmitting - 폼 제출 처리 중
 * @param {Object} props.formErrors - 폼 검증 에러 메시지
 * @param {boolean} props.ticketSuccess - 티켓 생성 성공 여부
 * @param {Function} props.onSubmit - 폼 제출 핸들러
 * @param {Function} props.onResetForm - 새 문의하기 핸들러
 * @param {Object} props.myTickets - 내 티켓 페이지 데이터
 * @param {number} props.ticketPage - 현재 페이지 번호
 * @param {boolean} props.isLoadingTickets - 티켓 로딩 상태
 * @param {Function} props.onPageChange - 페이지 변경 핸들러
 * @param {Array} props.ticketCategories - 문의 카테고리 옵션
 * @param {Object} props.categoryLabelMap - 카테고리 라벨 매핑
 * @param {Object} props.statusLabelMap - 티켓 상태 라벨 매핑
 * @param {Function} props.formatDate - 날짜 포맷팅 함수
 */

import { Link } from 'react-router-dom';
import { ROUTES } from '../../../shared/constants/routes';
import Loading from '../../../shared/components/Loading/Loading';
import './TicketTab.css';

export default function TicketTab({
  activeSection,
  isAuthenticated,
  ticketCategory,
  onCategoryChange,
  ticketTitle,
  onTitleChange,
  ticketContent,
  onContentChange,
  isSubmitting,
  formErrors,
  ticketSuccess,
  onSubmit,
  onResetForm,
  myTickets,
  ticketPage,
  isLoadingTickets,
  onPageChange,
  ticketCategories,
  categoryLabelMap,
  statusLabelMap,
  formatDate,
}) {
  /* ── 문의하기 섹션 ── */
  if (activeSection === 'ticket') {
    return (
      <section
        id="support-panel-ticket"
        role="tabpanel"
        aria-labelledby="ticket-tab"
        className="support-page__section"
      >
        <h2 className="support-page__section-title">문의하기</h2>

        {!isAuthenticated ? (
          /* 비인증 사용자 — 로그인 유도 */
          <div className="ticket-tab__login-prompt">
            <p className="ticket-tab__login-prompt-text">
              로그인 후 이용 가능합니다.
            </p>
            <Link to={ROUTES.LOGIN} className="ticket-tab__login-prompt-link">
              로그인하기
            </Link>
          </div>
        ) : ticketSuccess ? (
          /* 티켓 생성 성공 화면 */
          <div className="ticket-tab__success">
            <div className="ticket-tab__success-icon" aria-hidden="true">
              &#10003;
            </div>
            <h3 className="ticket-tab__success-title">
              문의가 등록되었습니다
            </h3>
            <p className="ticket-tab__success-text">
              담당자가 확인 후 빠르게 답변드리겠습니다.
              <br />
              "내 문의 내역" 탭에서 처리 상태를 확인할 수 있습니다.
            </p>
            <button
              className="ticket-tab__success-btn"
              onClick={onResetForm}
            >
              새 문의하기
            </button>
          </div>
        ) : (
          /* 문의 등록 폼 */
          <form
            className="ticket-tab__form"
            onSubmit={onSubmit}
            noValidate
          >
            {/* 카테고리 선택 */}
            <div className="ticket-tab__form-group">
              <label htmlFor="ticket-category" className="ticket-tab__form-label">
                카테고리
                <span className="ticket-tab__form-required" aria-hidden="true">*</span>
              </label>
              <select
                id="ticket-category"
                className="ticket-tab__form-select"
                value={ticketCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
                aria-required="true"
                aria-invalid={!!formErrors.category}
                aria-describedby={formErrors.category ? 'ticket-category-error' : undefined}
              >
                {ticketCategories.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {formErrors.category && (
                <p id="ticket-category-error" className="ticket-tab__form-error" role="alert">
                  {formErrors.category}
                </p>
              )}
            </div>

            {/* 제목 입력 */}
            <div className="ticket-tab__form-group">
              <label htmlFor="ticket-title" className="ticket-tab__form-label">
                제목
                <span className="ticket-tab__form-required" aria-hidden="true">*</span>
              </label>
              <input
                id="ticket-title"
                type="text"
                className="ticket-tab__form-input"
                placeholder="문의 제목을 입력하세요"
                value={ticketTitle}
                onChange={(e) => onTitleChange(e.target.value)}
                maxLength={100}
                aria-required="true"
                aria-invalid={!!formErrors.title}
                aria-describedby={formErrors.title ? 'ticket-title-error' : 'ticket-title-hint'}
              />
              <div className="ticket-tab__form-char-count">
                <span className={ticketTitle.length > 100 ? 'ticket-tab__form-char-count--over' : ''}>
                  {ticketTitle.length}
                </span>
                /100
              </div>
              {formErrors.title ? (
                <p id="ticket-title-error" className="ticket-tab__form-error" role="alert">
                  {formErrors.title}
                </p>
              ) : (
                <p id="ticket-title-hint" className="ticket-tab__form-hint">
                  2~100자 이내로 작성해주세요.
                </p>
              )}
            </div>

            {/* 내용 입력 */}
            <div className="ticket-tab__form-group">
              <label htmlFor="ticket-content" className="ticket-tab__form-label">
                내용
                <span className="ticket-tab__form-required" aria-hidden="true">*</span>
              </label>
              <textarea
                id="ticket-content"
                className="ticket-tab__form-textarea"
                placeholder="문의 내용을 상세히 작성해주세요"
                value={ticketContent}
                onChange={(e) => onContentChange(e.target.value)}
                maxLength={2000}
                aria-required="true"
                aria-invalid={!!formErrors.content}
                aria-describedby={formErrors.content ? 'ticket-content-error' : 'ticket-content-hint'}
              />
              <div className="ticket-tab__form-char-count">
                <span className={ticketContent.length > 2000 ? 'ticket-tab__form-char-count--over' : ''}>
                  {ticketContent.length}
                </span>
                /2,000
              </div>
              {formErrors.content ? (
                <p id="ticket-content-error" className="ticket-tab__form-error" role="alert">
                  {formErrors.content}
                </p>
              ) : (
                <p id="ticket-content-hint" className="ticket-tab__form-hint">
                  10~2,000자 이내로 작성해주세요.
                </p>
              )}
            </div>

            {/* 제출 버튼 */}
            <button
              type="submit"
              className="ticket-tab__submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? '등록 중...' : '문의 등록'}
            </button>
          </form>
        )}
      </section>
    );
  }

  /* ── 내 문의 내역 섹션 ── */
  if (activeSection === 'history' && isAuthenticated) {
    return (
      <section
        id="support-panel-history"
        role="tabpanel"
        aria-labelledby="history-tab"
        className="support-page__section"
      >
        <h2 className="support-page__section-title">
          내 문의 내역
          {myTickets.totalElements > 0 && (
            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', marginLeft: 'var(--space-sm)' }}>
              ({myTickets.totalElements}건)
            </span>
          )}
        </h2>

        {isLoadingTickets ? (
          <Loading message="문의 내역을 불러오는 중..." />
        ) : myTickets.content.length === 0 ? (
          <div className="support-page__empty">
            <div className="support-page__empty-icon" aria-hidden="true">?</div>
            <p className="support-page__empty-text">문의 내역이 없습니다.</p>
          </div>
        ) : (
          <>
            {/* 티켓 목록 */}
            <div className="ticket-tab__list" role="list">
              {myTickets.content.map((ticket) => (
                <div
                  key={ticket.ticketId}
                  className="ticket-tab__item"
                  role="listitem"
                >
                  <div className="ticket-tab__item-info">
                    <p className="ticket-tab__item-title">{ticket.title}</p>
                    <div className="ticket-tab__item-meta">
                      <span className="ticket-tab__item-category-badge">
                        {categoryLabelMap[ticket.category] || ticket.category}
                      </span>
                      <span className="ticket-tab__item-date">
                        {formatDate(ticket.createdAt)}
                      </span>
                    </div>
                  </div>
                  <span
                    className={[
                      'ticket-tab__item-status',
                      `ticket-tab__item-status--${ticket.status}`,
                    ].join(' ')}
                  >
                    {statusLabelMap[ticket.status] || ticket.status}
                  </span>
                </div>
              ))}
            </div>

            {/* 페이지네이션 */}
            {myTickets.totalPages > 1 && (
              <div className="ticket-tab__pagination">
                <button
                  className="ticket-tab__pagination-btn"
                  onClick={() => onPageChange((prev) => Math.max(0, prev - 1))}
                  disabled={ticketPage === 0}
                >
                  이전
                </button>
                <span className="ticket-tab__pagination-info">
                  {ticketPage + 1} / {myTickets.totalPages}
                </span>
                <button
                  className="ticket-tab__pagination-btn"
                  onClick={() =>
                    onPageChange((prev) =>
                      Math.min(myTickets.totalPages - 1, prev + 1)
                    )
                  }
                  disabled={ticketPage >= myTickets.totalPages - 1}
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

  return null;
}
