/**
 * NotFoundPage 스타일 정의 (styled-components).
 *
 * 404 코드 gradient-text + gradientShift + fadeInScale 애니메이션.
 * 배경 floating orb 2개 (::before, ::after pseudo-element).
 * 이모지 장식 4개 — 각기 다른 duration의 floatEmoji 로컬 keyframes.
 * "홈으로" gradient 버튼 + pulseGlow. "영화 검색" glass 버튼.
 * shared/styles의 fadeInUp, gradientShift, pulseGlow, floatUpDown을 import한다.
 */

import styled, { keyframes, css } from 'styled-components';
import { gradientShift, fadeInUp, pulseGlow, floatUpDown } from '../../../shared/styles/animations';
import { gradientText } from '../../../shared/styles/mixins';

/* ── 로컬 keyframes ── */

/**
 * 404 숫자 등장 — 작게 시작해서 overshoot 후 정착.
 */
const fadeInScale = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  60% {
    transform: scale(1.05);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

/** 떠다니는 이모지 1 — 4s, 위로 30px + 10deg 회전. */
const floatEmoji1 = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50%       { transform: translateY(-30px) rotate(10deg); }
`;

/** 떠다니는 이모지 2 — 5s, 위로 20px + -8deg 회전. */
const floatEmoji2 = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50%       { transform: translateY(-20px) rotate(-8deg); }
`;

/** 떠다니는 이모지 3 — 4.5s, 위로 25px + 12deg 회전. */
const floatEmoji3 = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50%       { transform: translateY(-25px) rotate(12deg); }
`;

/** 떠다니는 이모지 4 — 3.5s, 위로 18px + -6deg 회전. */
const floatEmoji4 = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50%       { transform: translateY(-18px) rotate(-6deg); }
`;

/* ── 이모지별 위치/duration 설정 맵 ── */
const FLOAT_CONFIG = {
  1: { top: '15%',  left: '10%',   animation: css`${floatEmoji1} 4s ease-in-out infinite` },
  2: { top: '25%',  right: '15%',  animation: css`${floatEmoji2} 5s ease-in-out infinite 0.5s` },
  3: { bottom: '20%', left: '20%', animation: css`${floatEmoji3} 4.5s ease-in-out infinite 1s` },
  4: { bottom: '30%', right: '10%',animation: css`${floatEmoji4} 3.5s ease-in-out infinite 1.5s` },
};

/**
 * 전체 화면 중앙 정렬 컨테이너.
 * ::before / ::after 로 floating orb 배경 2개를 렌더링한다.
 */
export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.bgMain};
  padding: ${({ theme }) => theme.spacing.lg};
  position: relative;
  overflow: hidden;

  /* Floating Orb 1 — 왼쪽 상단, 보라색 */
  &::before {
    content: '';
    position: absolute;
    top: -10%;
    left: -5%;
    width: 400px;
    height: 400px;
    border-radius: ${({ theme }) => theme.radius.full};
    background: ${({ theme }) => theme.gradients.glow};
    filter: blur(100px);
    pointer-events: none;
    animation: ${floatUpDown} 8s ease-in-out infinite;
  }

  /* Floating Orb 2 — 오른쪽 하단, 시안색 */
  &::after {
    content: '';
    position: absolute;
    bottom: -10%;
    right: -5%;
    width: 350px;
    height: 350px;
    border-radius: ${({ theme }) => theme.radius.full};
    background: radial-gradient(circle, rgba(6, 214, 160, 0.14) 0%, transparent 70%);
    filter: blur(100px);
    pointer-events: none;
    animation: ${floatUpDown} 10s ease-in-out infinite 2s;
  }
`;

/**
 * 떠다니는 이모지 장식.
 *
 * $index prop(1~4)으로 위치와 애니메이션을 결정한다.
 *
 * @prop {1|2|3|4} $index - 이모지 인덱스
 */
export const FloatEmoji = styled.span`
  position: absolute;
  font-size: 48px;
  opacity: 0.12;
  pointer-events: none;

  ${({ $index }) => {
    const config = FLOAT_CONFIG[$index];
    if (!config) return '';
    return css`
      ${config.top    ? `top: ${config.top};`       : ''}
      ${config.bottom ? `bottom: ${config.bottom};` : ''}
      ${config.left   ? `left: ${config.left};`     : ''}
      ${config.right  ? `right: ${config.right};`   : ''}
      animation: ${config.animation};
    `;
  }}
`;

/**
 * 내부 콘텐츠 래퍼 — fadeInUp 등장, 최대 480px.
 */
export const Inner = styled.div`
  text-align: center;
  max-width: 480px;
  position: relative;
  z-index: 1;
  animation: ${fadeInUp} 0.6s ease forwards;
`;

/**
 * 404 코드 텍스트 — gradient-text mixin + gradientShift + fadeInScale.
 * gradientText mixin은 background-size: 200% auto와 animation: gradientShift를 포함한다.
 */
export const Code = styled.h1`
  ${gradientText}
  font-size: 8rem;
  font-weight: ${({ theme }) => theme.typography.fontBold};
  line-height: 1;
  margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
  /* gradientShift(mixin) + fadeInScale 동시 적용 */
  animation: ${gradientShift} 3s ease infinite, ${fadeInScale} 0.8s ease-out;
`;

/** 주 안내 메시지 — semibold, Primary 텍스트 색상. */
export const Message = styled.p`
  font-size: ${({ theme }) => theme.typography.textXl};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
  font-weight: ${({ theme }) => theme.typography.fontSemibold};
`;

/** 부가 설명 텍스트 — secondary 색상, relaxed 줄 높이. */
export const Description = styled.p`
  font-size: ${({ theme }) => theme.typography.textBase};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0 0 ${({ theme }) => theme.spacing.xl} 0;
  line-height: ${({ theme }) => theme.typography.leadingRelaxed};
`;

/** 액션 링크 영역 — 가로 flex, 중앙 정렬, flex-wrap. */
export const Actions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: center;
  flex-wrap: wrap;
`;

/**
 * "홈으로 돌아가기" 링크 버튼.
 * gradient 배경 + pulseGlow 애니메이션.
 * 호버 시 glows.primary + 위로 2px 이동.
 */
export const HomeLink = styled.a`
  display: inline-block;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.gradients.primary};
  color: white;
  border-radius: ${({ theme }) => theme.radius.lg};
  text-decoration: none;
  font-weight: ${({ theme }) => theme.typography.fontSemibold};
  font-size: ${({ theme }) => theme.typography.textBase};
  transition: all ${({ theme }) => theme.transitions.fast};
  animation: ${pulseGlow} 3s ease-in-out infinite;

  &:hover {
    box-shadow: ${({ theme }) => theme.glows.primary};
    transform: translateY(-2px);
    color: white;
  }
`;

/**
 * "영화 검색" 링크 버튼.
 * glass 배경 + Primary 텍스트.
 * 호버 시 Primary 테두리 + 연보라 glow + 위로 2px 이동.
 */
export const SearchLink = styled.a`
  display: inline-block;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.glass.bg};
  backdrop-filter: ${({ theme }) => theme.glass.blur};
  -webkit-backdrop-filter: ${({ theme }) => theme.glass.blur};
  color: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.glass.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  text-decoration: none;
  font-weight: ${({ theme }) => theme.typography.fontSemibold};
  font-size: ${({ theme }) => theme.typography.textBase};
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.glow};
    transform: translateY(-2px);
  }
`;
