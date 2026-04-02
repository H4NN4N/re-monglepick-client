/**
 * CommunityPage styled-components 스타일 정의.
 *
 * gradient-text 제목 + 활성 탭 gradient 하단 바 + 글로우 +
 * 콘텐츠 fade-in + FAB gradient 배경 + pulseGlow.
 *
 * 로컬 keyframe: fadeIn (탭 콘텐츠 등장)
 * 공유 keyframe: fadeInUp (페이지 진입), gradientShift (제목), pulseGlow (FAB)
 *
 * BEM → styled 매핑:
 *   .community-page            → PageWrapper
 *   .community-page__inner     → PageInner
 *   .community-page__header    → Header
 *   .community-page__title     → Title
 *   .community-page__desc      → Desc
 *   .community-page__tabs      → Tabs
 *   .community-page__tab       → Tab  ($active prop)
 *   .community-page__content   → Content
 *   .community-page__fab       → Fab
 */

import styled, { keyframes } from 'styled-components';
import { fadeInUp, pulseGlow } from '../../../shared/styles/animations';
import { gradientText } from '../../../shared/styles/mixins';
import { media } from '../../../shared/styles/media';

/* ── 로컬 keyframe: 탭 콘텐츠 등장 (위로 8px 이동) ── */
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

/** 페이지 최외곽 컨테이너 — FAB fixed 기준 position:relative */
export const PageWrapper = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
  position: relative;
`;

/** 내부 컨테이너 — 최대 폭(narrow) 제한 + fadeInUp 등장 */
export const PageInner = styled.div`
  max-width: ${({ theme }) => theme.layout.contentNarrow};
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  animation: ${fadeInUp} 0.5s ease forwards;
`;

/** 페이지 헤더 — 제목 + 설명 묶음 */
export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

/** 페이지 제목 — gradientShift 텍스트 믹스인 */
export const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.text3xl};
  font-weight: ${({ theme }) => theme.typography.fontBold};
  margin: 0;
  ${gradientText}
`;

/** 페이지 부제 */
export const Desc = styled.p`
  font-size: ${({ theme }) => theme.typography.textBase};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
`;

/** 탭 네비게이션 — 하단 border 라인 */
export const Tabs = styled.div`
  display: flex;
  gap: 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderDefault};
  padding-bottom: 0;
`;

/**
 * 탭 버튼.
 * $active: true 일 때 gradient 하단 바 + 글로우 활성화.
 * border-image 사용 시 border-radius가 적용되지 않으므로 상단 radius만 적용.
 */
export const Tab = styled.button`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  font-size: ${({ theme }) => theme.typography.textSm};
  font-weight: ${({ theme, $active }) =>
    $active ? theme.typography.fontSemibold : theme.typography.fontMedium};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.textSecondary};
  background: none;
  border: none;
  /* 활성 탭: gradient border-image 3px 하단 바 */
  border-bottom: ${({ $active }) => ($active ? '3px solid' : '3px solid transparent')};
  border-image: ${({ theme, $active }) =>
    $active ? `${theme.gradients.primary} 1` : 'none'};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  margin-bottom: -1px;
  border-radius: ${({ theme }) => theme.radius.md} ${({ theme }) => theme.radius.md} 0 0;
  /* 활성 탭 글로우 */
  text-shadow: ${({ $active, theme }) =>
    $active ? theme.shadows.glow : 'none'};

  &:hover {
    color: ${({ theme }) => theme.colors.textPrimary};
    background-color: ${({ theme }) => theme.colors.bgTertiary};
  }
`;

/** 탭 콘텐츠 영역 — key 변경 시 fadeIn 재실행 */
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  animation: ${fadeIn} 0.3s ease-out;
`;

/**
 * FAB (Floating Action Button).
 * gradient 배경 + pulseGlow 무한 반복.
 * 호버 시 scale(1.15) + 강한 글로우.
 */
export const Fab = styled.button`
  position: fixed;
  bottom: ${({ theme }) => theme.spacing.xl};
  right: ${({ theme }) => theme.spacing.xl};
  width: 56px;
  height: 56px;
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.gradients.primary};
  color: white;
  font-size: ${({ theme }) => theme.typography.text2xl};
  font-weight: ${({ theme }) => theme.typography.fontBold};
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ theme }) => theme.shadows.lg}, ${({ theme }) => theme.shadows.glow};
  transition: all ${({ theme }) => theme.transitions.fast};
  z-index: ${({ theme }) => theme.zIndex.sticky};
  line-height: 1;
  animation: ${pulseGlow} 3s ease-in-out infinite;

  &:hover {
    transform: scale(1.15);
    box-shadow: ${({ theme }) => theme.shadows.xl}, ${({ theme }) => theme.glows.primary};
  }

  ${media.tablet} {
    bottom: ${({ theme }) => theme.spacing.lg};
    right: ${({ theme }) => theme.spacing.lg};
    width: 48px;
    height: 48px;
    font-size: ${({ theme }) => theme.typography.textXl};
  }
`;
