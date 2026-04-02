/**
 * Loading styled-components.
 *
 * 회전하는 원형 스피너 애니메이션과 로딩 메시지.
 * $fullPage, $size props로 변형을 제어한다.
 */

import styled, { keyframes } from 'styled-components';

/** 스피너 회전 애니메이션 */
const loadingSpin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

/** 크기별 스피너 치수 매핑 */
const spinnerSizeMap = {
  sm: { size: '24px', border: '2px' },
  md: { size: '40px', border: '3px' },
  lg: { size: '56px', border: '4px' },
};

/** 로딩 컨테이너 */
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.xl};

  /* 전체 페이지 로딩 — 화면 중앙 고정 */
  ${({ $fullPage, theme }) =>
    $fullPage &&
    `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${theme.colors.bgMain};
    z-index: ${theme.zIndex.modal};
  `}
`;

/** 스피너 컨테이너 — $size로 크기 결정 */
export const Spinner = styled.div`
  position: relative;
  width: ${({ $size }) => spinnerSizeMap[$size]?.size || spinnerSizeMap.md.size};
  height: ${({ $size }) => spinnerSizeMap[$size]?.size || spinnerSizeMap.md.size};
`;

/** 스피너 링 — 회전 + 그라데이션 글로우 */
export const SpinnerRing = styled.div`
  width: 100%;
  height: 100%;
  border-radius: ${({ theme }) => theme.radius.full};
  border: ${({ $size }) => spinnerSizeMap[$size]?.border || spinnerSizeMap.md.border} solid
    ${({ theme }) => theme.glass.border};
  border-top-color: ${({ theme }) => theme.colors.primary};
  border-right-color: rgba(6, 214, 160, 0.5);
  animation: ${loadingSpin} 0.8s linear infinite;
  box-shadow: ${({ theme }) => theme.shadows.glow};
`;

/** 로딩 메시지 */
export const Message = styled.p`
  font-size: ${({ theme }) => theme.typography.textSm};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
`;
