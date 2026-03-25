/**
 * 스켈레톤 로더 컴포넌트.
 *
 * 데이터 로딩 중 콘텐츠 자리를 회색 shimmer 효과로 채운다.
 * 사용자에게 곧 콘텐츠가 표시될 것임을 시각적으로 전달하여
 * 체감 로딩 시간을 줄여준다.
 *
 * @param {Object} props
 * @param {string} [props.width='100%'] - 스켈레톤 너비 (CSS 값)
 * @param {string} [props.height='20px'] - 스켈레톤 높이 (CSS 값)
 * @param {string} [props.borderRadius] - 커스텀 border-radius (기본: variant에 따라 자동)
 * @param {'text'|'circular'|'rectangular'|'card'} [props.variant='text'] - 형태 variant
 *   - text: 텍스트 줄 플레이스홀더
 *   - circular: 원형 아바타 플레이스홀더
 *   - rectangular: 직사각형 이미지/배너 플레이스홀더
 *   - card: 영화 포스터 카드 형태 (2:3 비율 + 제목/장르 줄)
 */

import './Skeleton.css';

export default function Skeleton({
  width = '100%',
  height = '20px',
  borderRadius,
  variant = 'text',
}) {
  /* card variant는 내부 구조가 있으므로 별도 렌더링 */
  if (variant === 'card') {
    return (
      <div
        className="skeleton skeleton--card"
        style={{ width, borderRadius }}
      >
        {/* 포스터 영역 (2:3 비율) */}
        <div className="skeleton__card-poster" />
        {/* 정보 영역 (제목 + 장르) */}
        <div className="skeleton__card-info">
          <div className="skeleton__card-title" />
          <div className="skeleton__card-genre" />
        </div>
      </div>
    );
  }

  /* text / circular / rectangular 공통 렌더링 */
  return (
    <div
      className={`skeleton skeleton--${variant}`}
      style={{
        width,
        height,
        ...(borderRadius ? { borderRadius } : {}),
      }}
    />
  );
}
