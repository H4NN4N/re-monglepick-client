/**
 * 포인트 팩 구매 섹션 컴포넌트.
 *
 * 일회성 포인트 충전 상품 목록을 카드 그리드로 표시한다.
 * 각 카드에 포인트 수량, 보너스, 가격, 구매 버튼을 포함한다.
 *
 * @param {Object} props
 * @param {Array} props.packs - 포인트 팩 상품 배열
 * @param {string|null} props.processingId - 현재 결제 처리 중인 팩 ID
 * @param {Function} props.onBuyPack - 구매 버튼 클릭 핸들러
 * @param {Function} props.formatNumber - 숫자 포맷팅 함수
 */

import './PointPackSection.css';

export default function PointPackSection({ packs, processingId, onBuyPack, formatNumber }) {
  return (
    <div className="point-pack-grid">
      {packs.map((pack) => (
        <div
          key={pack.id}
          className={[
            'point-pack-card',
            pack.best ? 'point-pack-card--best' : '',
          ].join(' ')}
        >
          {/* 보너스/최고 혜택 배지 */}
          {pack.best && (
            <div className="point-pack-card__badge">BEST</div>
          )}

          {/* 포인트 수량 */}
          <div className="point-pack-card__points">{pack.label}</div>

          {/* 보너스 안내 */}
          {pack.bonus && (
            <span className="point-pack-card__bonus">{pack.bonus}</span>
          )}

          {/* 가격 */}
          <div className="point-pack-card__price">
            {formatNumber(pack.price)}원
          </div>

          {/* 구매 버튼 */}
          <button
            className="point-pack-card__btn"
            onClick={() => onBuyPack(pack)}
            disabled={processingId === pack.id}
          >
            {processingId === pack.id ? '처리 중...' : '구매하기'}
          </button>
        </div>
      ))}
    </div>
  );
}
