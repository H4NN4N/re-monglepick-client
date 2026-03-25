/**
 * 도움말 탭 컴포넌트.
 *
 * 카테고리 필터와 도움말 문서 카드 그리드, 상세 패널을 제공한다.
 *
 * @param {Object} props
 * @param {Array} props.articles - 도움말 문서 배열
 * @param {boolean} props.isLoading - 로딩 상태
 * @param {number} props.categoryIdx - 현재 선택된 카테고리 인덱스
 * @param {Function} props.onCategoryChange - 카테고리 변경 핸들러
 * @param {Object|null} props.openArticle - 열린 도움말 문서 객체
 * @param {string|number|null} props.openHelpId - 열린 도움말 문서 ID
 * @param {Function} props.onToggleHelp - 도움말 토글 핸들러
 * @param {Array} props.categoryFilters - 카테고리 필터 목록
 * @param {Object} props.categoryLabelMap - 카테고리 라벨 매핑
 */

import Loading from '../../../shared/components/Loading/Loading';
import './HelpTab.css';

export default function HelpTab({
  articles,
  isLoading,
  categoryIdx,
  onCategoryChange,
  openArticle,
  openHelpId,
  onToggleHelp,
  categoryFilters,
  categoryLabelMap,
}) {
  return (
    <section
      id="support-panel-help"
      role="tabpanel"
      aria-labelledby="help-tab"
      className="support-page__section"
    >
      <h2 className="support-page__section-title">도움말</h2>

      {/* 카테고리 필터 탭 */}
      <div className="support-page__category-tabs" role="group" aria-label="도움말 카테고리 필터">
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

      {/* 도움말 상세 패널 (열려있을 때) */}
      {openArticle && (
        <div className="help-tab__detail">
          <div className="help-tab__detail-header">
            <h3 className="help-tab__detail-title">
              {openArticle.title}
            </h3>
            <button
              className="help-tab__detail-close"
              onClick={() => onToggleHelp(null)}
              aria-label="도움말 상세 닫기"
            >
              &#10005;
            </button>
          </div>
          <div className="help-tab__detail-content">
            {openArticle.content}
          </div>
        </div>
      )}

      {/* 도움말 카드 그리드 */}
      {isLoading ? (
        <Loading message="도움말을 불러오는 중..." />
      ) : articles.length === 0 ? (
        <div className="support-page__empty">
          <div className="support-page__empty-icon" aria-hidden="true">?</div>
          <p className="support-page__empty-text">등록된 도움말이 없습니다.</p>
        </div>
      ) : (
        <div className="help-tab__grid">
          {articles.map((article) => (
            <article
              key={article.id}
              className="help-tab__card"
              onClick={() => onToggleHelp(article.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onToggleHelp(article.id);
                }
              }}
              role="button"
              tabIndex={0}
              aria-expanded={openHelpId === article.id}
              aria-label={`${article.title} 도움말 열기`}
            >
              <span className="help-tab__card-category">
                {categoryLabelMap[article.category] || article.category}
              </span>
              <div className="help-tab__card-header">
                <h3 className="help-tab__card-title">{article.title}</h3>
                <span className="help-tab__card-views">
                  {article.viewCount?.toLocaleString() || 0}회
                </span>
              </div>
              <p className="help-tab__card-preview">
                {article.content}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
