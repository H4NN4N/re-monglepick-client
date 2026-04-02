/**
 * ItemExchange 컴포넌트 styled-components 정의.
 *
 * ItemExchange.css의 모든 규칙을 styled-components로 이관한다.
 * BEM 클래스(.point-page__items-*, .point-page__item-*) →
 * 개별 컴포넌트(S.Section, S.Tabs, S.Tab, S.Grid, S.Card 등)로 매핑.
 *
 * $active — transient prop (DOM에 전달하지 않음)
 *   - true 이면 카테고리 탭에 primary 배경을 적용한다.
 *
 * 공유 리소스:
 *   - animations.js : cardShine
 *   - media.js      : media.tablet, media.mobile
 */

import styled from 'styled-components';
import { cardShine } from '../../../shared/styles/animations';
import { media } from '../../../shared/styles/media';

/**
 * 아이템 교환 섹션 루트 컨테이너.
 * PointPage 내에서 공통 섹션 스타일을 상속받는 대신 직접 정의한다.
 */
export const Section = styled.section`
  /* 부모 페이지에서 margin-bottom을 제어하므로 내부에서는 별도 여백 없음 */
`;

/**
 * 섹션 제목.
 */
export const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.textXl};
  font-weight: ${({ theme }) => theme.typography.fontSemibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
`;

/**
 * 카테고리 필터 탭 행 컨테이너.
 * 넘칠 경우 가로 스크롤 처리.
 */
export const Tabs = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  overflow-x: auto;

  ${media.mobile} {
    gap: ${({ theme }) => theme.spacing.xs};
  }
`;

/**
 * 카테고리 필터 탭 버튼.
 *
 * $active 가 true 이면 primary 색상 배경 + 흰색 텍스트로 활성 상태를 표시한다.
 */
export const Tab = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  background: ${({ $active, theme }) =>
    $active ? theme.colors.primary : 'none'};
  border: 1px solid ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.borderDefault};
  border-radius: ${({ theme }) => theme.radius.full};
  font-size: ${({ theme }) => theme.typography.textSm};
  font-weight: ${({ theme }) => theme.typography.fontMedium};
  color: ${({ $active, theme }) =>
    $active ? 'white' : theme.colors.textSecondary};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  white-space: nowrap;

  /* 비활성 탭 hover */
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ $active, theme }) =>
      $active ? 'white' : theme.colors.primary};
  }

  ${media.mobile} {
    padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
    font-size: ${({ theme }) => theme.typography.textXs};
  }
`;

/**
 * 아이템 없음 빈 상태 메시지 영역.
 */
export const Empty = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxl};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.textSm};
`;

/**
 * 아이템 카드 그리드 컨테이너.
 * 화면 너비에 따라 열 수가 자동 조정된다.
 */
export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};

  /* 태블릿 이하 — 단일 열 */
  ${media.tablet} {
    grid-template-columns: 1fr;
  }
`;

/**
 * 개별 아이템 카드 — glass-card + hover shine 효과.
 *
 * ::before 수도 요소로 hover 시 빛이 지나가는 shine을 구현한다.
 */
export const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.glass.bg};
  backdrop-filter: blur(8px) saturate(1.4);
  -webkit-backdrop-filter: blur(8px) saturate(1.4);
  border: 1px solid ${({ theme }) => theme.glass.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  transition: all ${({ theme }) => theme.transitions.fast};
  position: relative;
  overflow: hidden;

  /* hover shine */
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
`;

/**
 * 아이템 카테고리 태그 배지.
 */
export const CategoryTag = styled.span`
  display: inline-block;
  width: fit-content;
  padding: 2px ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.radius.sm};
  font-size: ${({ theme }) => theme.typography.textXs};
  font-weight: ${({ theme }) => theme.typography.fontMedium};
`;

/**
 * 아이템 이름.
 */
export const ItemName = styled.h3`
  font-size: ${({ theme }) => theme.typography.textBase};
  font-weight: ${({ theme }) => theme.typography.fontSemibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
`;

/**
 * 아이템 설명 텍스트 — flex: 1 로 카드 내 공간을 채움.
 */
export const ItemDesc = styled.p`
  font-size: ${({ theme }) => theme.typography.textSm};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: ${({ theme }) => theme.typography.leadingNormal};
  margin: 0;
  flex: 1;
`;

/**
 * 카드 하단 행 — 가격과 교환 버튼을 양 끝 정렬.
 */
export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing.sm};
  padding-top: ${({ theme }) => theme.spacing.sm};
  border-top: 1px solid ${({ theme }) => theme.colors.borderLight};
`;

/**
 * 아이템 가격 표시.
 */
export const Price = styled.span`
  font-size: ${({ theme }) => theme.typography.textBase};
  font-weight: ${({ theme }) => theme.typography.fontBold};
  color: ${({ theme }) => theme.colors.primary};
`;

/**
 * 교환 버튼 — gradient 배경, hover 시 glow + translateY.
 * 비활성(포인트 부족 / 처리 중) 상태에서는 elevated 배경으로 전환된다.
 */
export const ExchangeBtn = styled.button`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.gradients.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: ${({ theme }) => theme.typography.textSm};
  font-weight: ${({ theme }) => theme.typography.fontMedium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover:not(:disabled) {
    box-shadow: ${({ theme }) => theme.glows.primary};
    transform: translateY(-1px);
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.bgElevated};
    color: ${({ theme }) => theme.colors.textMuted};
    cursor: not-allowed;
  }
`;
