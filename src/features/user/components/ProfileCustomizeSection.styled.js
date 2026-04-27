/**
 * ProfileCustomizeSection styled-components — 2026-04-27.
 *
 * 좌측 미리보기 카드 + 우측 보유 슬롯 그리드 구조.
 * 모바일(≤768px)에서는 1열 컬럼으로 stack.
 */

import styled, { css, keyframes } from 'styled-components';
import { media } from '../../../shared/styles/media';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
`;

/* ============================================================
 * 섹션 헤더
 * ============================================================ */
export const Section = styled.section`
  animation: ${fadeIn} 0.3s ease;
`;

export const SectionHeader = styled.header`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const SectionTitle = styled.h2`
  margin: 0 0 ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.typography.textXl};
  font-weight: ${({ theme }) => theme.typography.fontBold};
  color: ${({ theme }) => theme.colors.textPrimary};
  letter-spacing: -0.02em;
`;

export const SectionDesc = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.textSm};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: ${({ theme }) => theme.typography.leadingNormal};
`;

/* ============================================================
 * 그리드 — 데스크톱: 미리보기(280px) + 슬롯(나머지) | 모바일: 1열
 * ============================================================ */
export const Grid = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: ${({ theme }) => theme.spacing.lg};

  ${media.tablet} {
    grid-template-columns: 1fr;
  }
`;

/* ============================================================
 * 미리보기 카드
 * ============================================================ */
export const PreviewCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.bgCard};
  border: 1px solid ${({ theme }) => theme.colors.borderDefault};
  position: sticky;
  top: ${({ theme }) => theme.spacing.lg};
  align-self: start;

  ${media.tablet} {
    position: static;
  }
`;

export const PreviewLabel = styled.span`
  font-size: ${({ theme }) => theme.typography.textXs};
  font-weight: ${({ theme }) => theme.typography.fontSemibold};
  color: ${({ theme }) => theme.colors.textMuted};
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const PreviewAvatar = styled.div`
  position: relative;
  width: 132px;
  height: 132px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.bgElevated};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  overflow: visible;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    display: block;
  }
`;

export const PreviewInitial = styled.span`
  font-size: 48px;
  font-weight: ${({ theme }) => theme.typography.fontBold};
  color: ${({ theme }) => theme.colors.primary};
`;

/** 미리보기 우상단 배지 오버레이 */
export const PreviewBadge = styled.div`
  position: absolute;
  right: -6px;
  bottom: 4px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.bgCard};
  border: 2px solid ${({ theme }) => theme.colors.warning};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  box-shadow: ${({ theme }) => theme.shadows.sm};

  img {
    width: 28px;
    height: 28px;
    object-fit: contain;
  }
`;

export const PreviewNickname = styled.div`
  font-size: ${({ theme }) => theme.typography.textLg};
  font-weight: ${({ theme }) => theme.typography.fontSemibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const PreviewMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 6px 0;
  border-top: 1px dashed ${({ theme }) => theme.colors.borderLight};
  font-size: ${({ theme }) => theme.typography.textSm};

  span {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  strong {
    color: ${({ theme }) => theme.colors.textPrimary};
    font-weight: ${({ theme }) => theme.typography.fontMedium};
    max-width: 60%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const UnequipRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: ${({ theme }) => theme.spacing.md};
  width: 100%;
`;

export const UnequipBtn = styled.button`
  flex: 1;
  min-width: 96px;
  padding: 6px 10px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.borderDefault};
  background: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.textXs};
  font-weight: ${({ theme }) => theme.typography.fontMedium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.error};
    color: ${({ theme }) => theme.colors.error};
  }
`;

/* ============================================================
 * 우측 슬롯 컬럼
 * ============================================================ */
export const SlotsColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  min-width: 0;
`;

export const SlotSection = styled.div`
  background: ${({ theme }) => theme.colors.bgCard};
  border: 1px solid ${({ theme }) => theme.colors.borderDefault};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
`;

export const SlotSectionTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.textBase};
  font-weight: ${({ theme }) => theme.typography.fontSemibold};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const SlotCount = styled.span`
  display: inline-flex;
  align-items: center;
  height: 20px;
  padding: 0 8px;
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.textXs};
  font-weight: ${({ theme }) => theme.typography.fontSemibold};
`;

export const SlotGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(112px, 1fr));
  gap: 12px;
`;

/* ============================================================
 * 슬롯 카드 (1개 아이템)
 * ============================================================ */
export const SlotButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 12px 8px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1.5px solid ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.borderDefault};
  background: ${({ $active, theme }) =>
    $active ? theme.colors.primaryLight : theme.colors.bgSecondary};
  cursor: pointer;
  transition: transform ${({ theme }) => theme.transitions.fast},
    border-color ${({ theme }) => theme.transitions.fast},
    box-shadow ${({ theme }) => theme.transitions.fast};
  position: relative;
  text-align: center;

  ${({ $disabled }) => $disabled && css`
    opacity: 0.5;
    cursor: not-allowed;
  `}

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.sm};
    transform: translateY(-2px);
  }
`;

export const SlotThumb = styled.div`
  position: relative;
  width: 64px;
  height: 64px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.bgElevated};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }
`;

export const SlotPlaceholder = styled.span`
  font-size: 28px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

/** 장착 중 표시 — 우상단 체크 아이콘 */
export const EquippedTick = styled.span`
  position: absolute;
  top: -6px;
  right: -6px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-size: 14px;
  font-weight: ${({ theme }) => theme.typography.fontBold};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

export const SlotName = styled.div`
  font-size: ${({ theme }) => theme.typography.textXs};
  font-weight: ${({ theme }) => theme.typography.fontMedium};
  color: ${({ theme }) => theme.colors.textPrimary};
  line-height: 1.3;
  word-break: keep-all;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  max-width: 100%;
`;

export const SlotMeta = styled.div`
  font-size: 11px;
  color: ${({ $warning, theme }) =>
    $warning ? theme.colors.error : theme.colors.textMuted};
  font-weight: ${({ $warning, theme }) =>
    $warning ? theme.typography.fontSemibold : theme.typography.fontNormal};
`;

/* ============================================================
 * 빈 상태 / CTA
 * ============================================================ */
export const EmptyHint = styled.p`
  margin: 0;
  padding: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  font-size: ${({ theme }) => theme.typography.textSm};
  color: ${({ theme }) => theme.colors.textMuted};
  background: ${({ theme }) => theme.colors.bgElevated};
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px dashed ${({ theme }) => theme.colors.borderDefault};
`;

export const ShopCta = styled.button`
  align-self: center;
  padding: 10px 24px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: none;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-size: ${({ theme }) => theme.typography.textSm};
  font-weight: ${({ theme }) => theme.typography.fontSemibold};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
    transform: translateY(-1px);
  }
`;
