/**
 * HelpTab 컴포넌트 styled-components 정의.
 *
 * HelpTab.css의 모든 규칙을 styled-components로 이관한다.
 * BEM 클래스(.help-tab__*) → 개별 컴포넌트로 매핑.
 * SupportPage가 소유하는 공통 클래스(.support-page__section 등)는
 * JSX에서 그대로 유지하며, 해당 스타일은 SupportPage.css에서 관리한다.
 *
 * 공유 리소스:
 *   - animations.js : cardShine (카드 hover 광선 효과)
 *   - media.js      : media.tablet, media.mobile
 *
 * supportFadeIn — SupportPage.css에만 정의된 로컬 keyframe이므로
 *   여기서 keyframes 헬퍼로 새로 정의한다.
 */

import styled, { keyframes } from 'styled-components';
import { cardShine } from '../../../shared/styles/animations';
import { media } from '../../../shared/styles/media';

/* ── 섹션 레이아웃 ── */

export const SectionWrapper = styled.section``;

export const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.textXl};
  font-weight: ${({ theme }) => theme.typography.fontSemibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
`;

export const CategoryTabs = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;

  ${media.tablet} {
    overflow-x: auto;
    flex-wrap: nowrap;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    &::-webkit-scrollbar { display: none; }
  }
`;

export const CategoryTab = styled.button`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background: ${({ $isActive, theme }) =>
    $isActive ? theme.gradients.primary : theme.colors.bgCard};
  border: 1px solid ${({ $isActive, theme }) =>
    $isActive ? 'transparent' : theme.colors.borderDefault};
  border-radius: ${({ theme }) => theme.radius.full};
  color: ${({ $isActive, theme }) =>
    $isActive ? 'white' : theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.textSm};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  box-shadow: ${({ $isActive, theme }) => $isActive ? theme.glows.primary : 'none'};
  flex-shrink: 0;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

export const Empty = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const EmptyIcon = styled.div`
  font-size: ${({ theme }) => theme.typography.text4xl};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  opacity: 0.5;
`;

export const EmptyText = styled.p`
  font-size: ${({ theme }) => theme.typography.textBase};
  margin: 0;
`;

/**
 * 도움말 상세 패널 등장 애니메이션.
 * SupportPage.css의 @keyframes supportFadeIn 을 그대로 포팅한다.
 * (위에서 아래로 4px 이동하며 opacity 0 → 1)
 */
const supportFadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

/* ── 도움말 카드 그리드 ── */

/**
 * 도움말 카드 목록을 담는 그리드 컨테이너.
 * auto-fill + minmax(300px, 1fr) 로 자동 컬럼 배치.
 * 태블릿(768px) 이하에서는 단일 컬럼으로 전환.
 */
export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};

  ${media.tablet} {
    grid-template-columns: 1fr;
  }
`;

/**
 * 개별 도움말 카드.
 * glass-card 스타일 + hover 시 좌→우 광선(cardShine) 효과.
 * hover 시 translateY(-4px) + 보라 글로우 + 보더 강조.
 *
 * 모바일(480px) 이하에서는 패딩을 sm으로 줄인다.
 */
export const Card = styled.article`
  background: ${({ theme }) => theme.glass.bg};
  backdrop-filter: blur(8px) saturate(1.4);
  -webkit-backdrop-filter: blur(8px) saturate(1.4);
  border: 1px solid ${({ theme }) => theme.glass.border};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: ${({ theme }) => theme.spacing.md};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  position: relative;
  overflow: hidden;

  /* hover shine — 좌→우 광선 */
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
    pointer-events: none;
  }

  &:hover::before {
    animation: ${cardShine} 0.8s ease forwards;
  }

  &:hover {
    border-color: ${({ theme }) => theme.glass.border};
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.lg},
      ${({ theme }) => theme.shadows.glow};
  }

  ${media.mobile} {
    padding: ${({ theme }) => theme.spacing.sm};
  }
`;

/**
 * 카드 헤더 행 — 제목과 조회수를 좌우로 배치.
 */
export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

/**
 * 카드 제목 텍스트.
 * 남은 공간을 모두 차지하며, 줄 높이를 tight로 설정.
 */
export const CardTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.textBase};
  font-weight: ${({ theme }) => theme.typography.fontSemibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
  flex: 1;
  line-height: ${({ theme }) => theme.typography.leadingTight};
`;

/**
 * 카드 조회수 텍스트.
 * 우측에 고정되며 넘치지 않도록 flex-shrink: 0.
 */
export const CardViews = styled.span`
  font-size: ${({ theme }) => theme.typography.textXs};
  color: ${({ theme }) => theme.colors.textMuted};
  flex-shrink: 0;
  margin-left: ${({ theme }) => theme.spacing.sm};
`;

/**
 * 카드 카테고리 배지 — primary 계열 pill 형태.
 * 카드 상단에 인라인 블록으로 표시.
 */
export const CardCategory = styled.span`
  display: inline-block;
  padding: 2px ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.radius.full};
  font-size: ${({ theme }) => theme.typography.textXs};
  font-weight: ${({ theme }) => theme.typography.fontMedium};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

/**
 * 카드 미리보기 텍스트.
 * -webkit-line-clamp 2 로 두 줄 이후를 말줄임 처리한다.
 */
export const CardPreview = styled.p`
  font-size: ${({ theme }) => theme.typography.textSm};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: ${({ theme }) => theme.typography.leadingNormal};
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

/* ── 도움말 상세 패널 ── */

/**
 * 도움말 상세 패널 — 카드 클릭 시 그리드 상단에 펼쳐지는 상세 보기.
 * supportFadeIn 애니메이션으로 부드럽게 등장.
 * 태블릿(768px) 이하에서 패딩을 md로 줄인다.
 */
export const Detail = styled.div`
  background-color: ${({ theme }) => theme.colors.bgCard};
  border: 1px solid ${({ theme }) => theme.colors.borderDefault};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  animation: ${supportFadeIn} 0.2s ease;

  ${media.tablet} {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

/**
 * 상세 패널 헤더 행 — 제목과 닫기 버튼을 좌우로 배치.
 */
export const DetailHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

/**
 * 상세 패널 제목 텍스트.
 */
export const DetailTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.textXl};
  font-weight: ${({ theme }) => theme.typography.fontSemibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
  flex: 1;
`;

/**
 * 상세 패널 닫기 버튼.
 * hover 시 muted → primary 색상으로 전환.
 */
export const DetailClose = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.textXl};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.xs};
  line-height: 1;
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

/**
 * 상세 패널 본문 텍스트.
 * white-space: pre-line 으로 줄바꿈을 그대로 표현.
 */
export const DetailContent = styled.div`
  font-size: ${({ theme }) => theme.typography.textBase};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: ${({ theme }) => theme.typography.leadingRelaxed};
  white-space: pre-line;
`;
