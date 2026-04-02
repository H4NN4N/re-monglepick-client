/**
 * 공유 CSS 믹스인 정의.
 *
 * global.css의 .glass-card, .gradient-text 등 반복 사용되는
 * 스타일 패턴을 styled-components의 css 헬퍼로 추출한다.
 *
 * 사용 예시:
 *   import { glassCard } from '../../../shared/styles/mixins';
 *   const Card = styled.div`${glassCard}`;
 */

import { css } from 'styled-components';
import { gradientShift, cardShine } from './animations';

/** 글래스모피즘 카드 — 반투명 배경 + 블러 + 보더 */
export const glassCard = css`
  background: ${({ theme }) => theme.glass.bg};
  backdrop-filter: ${({ theme }) => theme.glass.blur};
  -webkit-backdrop-filter: ${({ theme }) => theme.glass.blur};
  border: 1px solid ${({ theme }) => theme.glass.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  position: relative;
  overflow: hidden;

  /* 호버 시 빛이 지나가는 shine 효과 */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 50%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.03),
      transparent
    );
    transition: none;
    pointer-events: none;
  }

  &:hover::before {
    animation: ${cardShine} 0.8s ease forwards;
  }
`;

/** 그라데이션 텍스트 — 보라→시안→블루 그라데이션 + 쉬프트 애니메이션 */
export const gradientText = css`
  background: ${({ theme }) => theme.gradients.text};
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${gradientShift} 4s ease infinite;
`;

/** 카드 호버 — 위로 이동 + 그림자 + 보더 강조 */
export const cardHover = css`
  transition: transform ${({ theme }) => theme.transitions.base},
    box-shadow ${({ theme }) => theme.transitions.base},
    border-color ${({ theme }) => theme.transitions.base};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.lg},
      ${({ theme }) => theme.shadows.glow};
    border-color: ${({ theme }) => theme.glass.border};
  }
`;

/** 숨김 (스크린 리더에서는 접근 가능) */
export const srOnly = css`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`;
