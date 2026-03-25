/**
 * FAQ 탭 컴포넌트.
 *
 * 카테고리 필터, 검색 바, FAQ 아코디언 목록, 피드백 기능을 제공한다.
 *
 * @param {Object} props
 * @param {Array} props.faqs - 필터링된 FAQ 배열
 * @param {boolean} props.isLoading - 로딩 상태
 * @param {number} props.categoryIdx - 현재 선택된 카테고리 인덱스
 * @param {Function} props.onCategoryChange - 카테고리 변경 핸들러
 * @param {string} props.searchKeyword - 검색 키워드
 * @param {Function} props.onSearchChange - 검색어 변경 핸들러
 * @param {Set} props.openFaqIds - 열린 FAQ ID Set
 * @param {Function} props.onToggleFaq - FAQ 아코디언 토글 핸들러
 * @param {Object} props.feedbackMap - FAQ 피드백 상태 맵
 * @param {string|null} props.feedbackLoadingId - 피드백 처리 중인 FAQ ID
 * @param {Function} props.onFeedback - 피드백 제출 핸들러
 * @param {boolean} props.isAuthenticated - 인증 상태
 * @param {Array} props.categoryFilters - 카테고리 필터 목록
 * @param {Object} props.categoryLabelMap - 카테고리 라벨 매핑
 */

import Loading from '../../../shared/components/Loading/Loading';
import './FaqTab.css';

export default function FaqTab({
  faqs,
  isLoading,
  categoryIdx,
  onCategoryChange,
  searchKeyword,
  onSearchChange,
  openFaqIds,
  onToggleFaq,
  feedbackMap,
  feedbackLoadingId,
  onFeedback,
  isAuthenticated,
  categoryFilters,
  categoryLabelMap,
}) {
  return (
    <section
      id="support-panel-faq"
      role="tabpanel"
      aria-labelledby="faq-tab"
      className="support-page__section"
    >
      <h2 className="support-page__section-title">자주 묻는 질문</h2>

      {/* 카테고리 필터 탭 */}
      <div className="support-page__category-tabs" role="group" aria-label="FAQ 카테고리 필터">
        {categoryFilters.map((cat, idx) => (
          <button
            key={cat.label}
            className={[
              'support-page__category-tab',
              categoryIdx === idx ? 'support-page__category-tab--active' : '',
            ].join(' ')}
            onClick={() => onCategoryChange(idx)}
            aria-pressed={categoryIdx === idx}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* 검색 바 */}
      <div className="faq-tab__search">
        <span className="faq-tab__search-icon" aria-hidden="true">
          &#128269;
        </span>
        <input
          type="text"
          className="faq-tab__search-input"
          placeholder="FAQ 검색..."
          value={searchKeyword}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="FAQ 검색"
        />
      </div>

      {/* FAQ 목록 */}
      {isLoading ? (
        <Loading message="FAQ를 불러오는 중..." />
      ) : faqs.length === 0 ? (
        <div className="support-page__empty">
          <div className="support-page__empty-icon" aria-hidden="true">?</div>
          <p className="support-page__empty-text">
            {searchKeyword
              ? `"${searchKeyword}"에 대한 검색 결과가 없습니다.`
              : '등록된 FAQ가 없습니다.'}
          </p>
        </div>
      ) : (
        <div className="faq-tab__list" role="list">
          {faqs.map((faq) => {
            const isOpen = openFaqIds.has(faq.id);
            const feedbackState = feedbackMap[faq.id];

            return (
              <div key={faq.id} className="faq-tab__item" role="listitem">
                {/* FAQ 질문 (아코디언 헤더) */}
                <button
                  className="faq-tab__question"
                  onClick={() => onToggleFaq(faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                >
                  <span className="faq-tab__category-badge">
                    {categoryLabelMap[faq.category] || faq.category}
                  </span>
                  <span className="faq-tab__question-text">
                    {faq.question}
                  </span>
                  <span
                    className={[
                      'faq-tab__toggle',
                      isOpen ? 'faq-tab__toggle--open' : '',
                    ].join(' ')}
                    aria-hidden="true"
                  >
                    &#9660;
                  </span>
                </button>

                {/* FAQ 답변 (아코디언 패널) */}
                {isOpen && (
                  <div
                    id={`faq-answer-${faq.id}`}
                    className="faq-tab__answer"
                    role="region"
                    aria-label={`${faq.question} 답변`}
                  >
                    <p className="faq-tab__answer-text">{faq.answer}</p>

                    {/* 피드백 버튼 (인증 사용자만) */}
                    {isAuthenticated && (
                      <div className="faq-tab__feedback">
                        <span className="faq-tab__feedback-label">
                          도움이 되었나요?
                        </span>
                        <button
                          className={[
                            'faq-tab__feedback-btn',
                            feedbackState === 'helpful'
                              ? 'faq-tab__feedback-btn--selected'
                              : '',
                          ].join(' ')}
                          onClick={() => onFeedback(faq.id, true)}
                          disabled={!!feedbackState || feedbackLoadingId === faq.id}
                          aria-label="도움이 되었습니다"
                        >
                          &#128077; 네
                        </button>
                        <button
                          className={[
                            'faq-tab__feedback-btn',
                            feedbackState === 'notHelpful'
                              ? 'faq-tab__feedback-btn--selected'
                              : '',
                          ].join(' ')}
                          onClick={() => onFeedback(faq.id, false)}
                          disabled={!!feedbackState || feedbackLoadingId === faq.id}
                          aria-label="도움이 되지 않았습니다"
                        >
                          &#128078; 아니요
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
