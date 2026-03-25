/**
 * 아이템 교환 섹션 컴포넌트.
 *
 * 카테고리 필터 탭과 아이템 카드 그리드를 렌더링한다.
 * 각 카드에는 카테고리 태그, 이름, 설명, 가격, 교환 버튼이 포함된다.
 *
 * @param {Object} props
 * @param {Array} props.items - 아이템 목록 배열
 * @param {string} props.selectedCategory - 현재 선택된 카테고리
 * @param {Function} props.onCategoryChange - 카테고리 변경 핸들러
 * @param {boolean} props.isLoading - 로딩 상태
 * @param {number|null} props.exchangingItemId - 교환 처리 중인 아이템 ID
 * @param {number} props.balance - 현재 보유 포인트
 * @param {Function} props.onExchangeItem - 아이템 교환 핸들러
 * @param {Function} props.formatNumber - 숫자 포맷팅 함수
 */

import Loading from '../../../shared/components/Loading/Loading';
import './ItemExchange.css';

/** 아이템 카테고리 필터 탭 목록 */
const ITEM_CATEGORIES = ['전체', 'AI', '쿠폰', '아바타'];

export default function ItemExchange({
  items,
  selectedCategory,
  onCategoryChange,
  isLoading,
  exchangingItemId,
  balance,
  onExchangeItem,
  formatNumber,
}) {
  return (
    <section className="point-page__section point-page__items">
      <h2 className="point-page__section-title">아이템 교환</h2>

      {/* 카테고리 필터 탭 */}
      <div className="point-page__items-tabs">
        {ITEM_CATEGORIES.map((category) => (
          <button
            key={category}
            className={[
              'point-page__items-tab',
              selectedCategory === category ? 'point-page__items-tab--active' : '',
            ].join(' ')}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* 아이템 그리드 */}
      {isLoading ? (
        <Loading message="아이템 로딩 중..." />
      ) : items.length === 0 ? (
        <div className="point-page__items-empty">
          <p>교환 가능한 아이템이 없습니다.</p>
        </div>
      ) : (
        <div className="point-page__items-grid">
          {items.map((item) => (
            <div key={item.itemId} className="point-page__item-card">
              {/* 아이템 카테고리 태그 */}
              <span className="point-page__item-category">{item.category}</span>
              {/* 아이템 이름 */}
              <h3 className="point-page__item-name">{item.name}</h3>
              {/* 아이템 설명 */}
              <p className="point-page__item-desc">{item.description}</p>
              {/* 가격 및 교환 버튼 */}
              <div className="point-page__item-footer">
                <span className="point-page__item-price">
                  {formatNumber(item.price)}P
                </span>
                <button
                  className="point-page__item-exchange-btn"
                  onClick={() => onExchangeItem(item)}
                  disabled={
                    exchangingItemId === item.itemId ||
                    (balance || 0) < item.price
                  }
                >
                  {exchangingItemId === item.itemId
                    ? '교환 중...'
                    : (balance || 0) < item.price
                      ? '포인트 부족'
                      : '교환'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
