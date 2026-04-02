/**
 * 미디어쿼리 헬퍼.
 *
 * 프로젝트에서 사용하는 브레이크포인트를 상수화하여
 * styled-components 내부에서 일관되게 사용한다.
 *
 * 브레이크포인트 3단계:
 *   - mobile  (≤480px)  : 소형 모바일
 *   - tablet  (≤768px)  : 태블릿 / 대형 모바일
 *   - desktop (≤1024px) : 소형 데스크톱 / 태블릿 가로
 *
 * 사용 예시:
 *   import { media } from '../../../shared/styles/media';
 *   const Nav = styled.nav`
 *     display: flex;
 *     ${media.desktop} { gap: 12px; }
 *     ${media.tablet} { display: none; }
 *     ${media.mobile} { padding: 8px; }
 *   `;
 */

/** 브레이크포인트 값 (px) */
export const breakpoints = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
};

/** 미디어쿼리 문자열 — tagged template literal 내부에서 보간 가능 */
export const media = {
  mobile: `@media (max-width: ${breakpoints.mobile}px)`,
  tablet: `@media (max-width: ${breakpoints.tablet}px)`,
  desktop: `@media (max-width: ${breakpoints.desktop}px)`,
};
