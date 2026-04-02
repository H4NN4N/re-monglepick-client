/**
 * LoginPage styled-components 정의.
 *
 * 3개 floating orb 배경 (보라/시안/핑크, blur, 느린 animation).
 * 폼 카드 중앙 배치 + fadeInUp 등장.
 */

import styled from 'styled-components';
import { floatUpDown } from '../../../shared/styles/animations';
import { media } from '../../../shared/styles/media';

/** 로그인 페이지 전체 컨테이너 — 세로 중앙 정렬, orb overflow 숨김 */
export const LoginPageWrapper = styled.div`
  width: 100%;
  min-height: calc(
    100vh - ${({ theme }) => theme.layout.headerHeight} -
      ${({ theme }) => theme.layout.footerHeight}
  );
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
  position: relative;
  overflow: hidden;

  ${media.mobile} {
    padding: ${({ theme }) => theme.spacing.md};
    min-height: 100vh;
  }
`;

/** 공통 배경 Floating Orb 기반 스타일 */
const OrbBase = styled.div`
  position: absolute;
  border-radius: ${({ theme }) => theme.radius.full};
  pointer-events: none;
  will-change: transform;
`;

/** 좌상단 보라 orb */
export const Orb1 = styled(OrbBase)`
  width: 450px;
  height: 450px;
  top: -120px;
  left: -120px;
  /* radial-gradient 글로우 — theme 토큰으로 대체 */
  background: ${({ theme }) => theme.gradients.glow};
  filter: blur(100px);
  animation: ${floatUpDown} 8s ease-in-out infinite;
`;

/** 우하단 시안 orb */
export const Orb2 = styled(OrbBase)`
  width: 350px;
  height: 350px;
  bottom: -100px;
  right: -100px;
  background: radial-gradient(
    circle,
    rgba(6, 214, 160, 0.15) 0%,
    transparent 70%
  );
  filter: blur(100px);
  animation: ${floatUpDown} 10s ease-in-out infinite 2s;
`;

/** 우상단 핑크 orb */
export const Orb3 = styled(OrbBase)`
  width: 300px;
  height: 300px;
  top: 20%;
  right: 10%;
  background: radial-gradient(
    circle,
    rgba(239, 71, 111, 0.1) 0%,
    transparent 70%
  );
  filter: blur(120px);
  animation: ${floatUpDown} 12s ease-in-out infinite 4s;
`;
