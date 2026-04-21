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
import * as S from './HelpTab.styled';

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
    <S.SectionWrapper
      id="support-panel-help"
      role="tabpanel"
      aria-labelledby="help-tab"
    >
      <S.SectionTitle>도움말</S.SectionTitle>

      <S.CategoryTabs role="group" aria-label="도움말 카테고리 필터">
        {categoryFilters.map((cat, idx) => (
          <S.CategoryTab
            key={cat.label}
            $isActive={categoryIdx === idx}
            onClick={() => onCategoryChange(idx)}
            aria-pressed={categoryIdx === idx}
          >
            {cat.label}
          </S.CategoryTab>
        ))}
      </S.CategoryTabs>

      {/* 도움말 상세 패널 (열려있을 때) */}
      {openArticle && (
        <S.Detail>
          <S.DetailHeader>
            <S.DetailTitle>
              {openArticle.title}
            </S.DetailTitle>
            <S.DetailClose
              onClick={() => onToggleHelp(null)}
              aria-label="도움말 상세 닫기"
            >
              &#10005;
            </S.DetailClose>
          </S.DetailHeader>
          <S.DetailContent>
            {openArticle.content}
          </S.DetailContent>
        </S.Detail>
      )}

      {/* 도움말 카드 그리드 */}
      {isLoading ? (
        <Loading message="도움말을 불러오는 중..." />
      ) : articles.length === 0 ? (
        <S.Empty>
          <S.EmptyIcon aria-hidden="true">?</S.EmptyIcon>
          <S.EmptyText>등록된 도움말이 없습니다.</S.EmptyText>
        </S.Empty>
      ) : (
        <S.Grid>
          {articles.map((article) => (
            <S.Card
              key={article.id}
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
              <S.CardCategory>
                {categoryLabelMap[article.category] || article.category}
              </S.CardCategory>
              <S.CardHeader>
                <S.CardTitle>{article.title}</S.CardTitle>
                <S.CardViews>
                  {article.viewCount?.toLocaleString() || 0}회
                </S.CardViews>
              </S.CardHeader>
              <S.CardPreview>
                {article.content}
              </S.CardPreview>
            </S.Card>
          ))}
        </S.Grid>
      )}
    </S.SectionWrapper>
  );
}
