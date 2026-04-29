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
 * 이펙트 합성용 keyframes — 2026-04-28 v3.5 6슬롯 확장.
 *
 * 운영자가 등록하는 이펙트 PointItem 의 itemName 또는 imageUrl 끝부분으로 매핑되는 effectKey
 * (popcorn / sparkle / film / pulse) 별 애니메이션. 추가 이펙트는 새 keyframes 후 effectKey
 * 매핑만 늘리면 된다.
 * ============================================================ */
const effectPopcorn = keyframes`
  0%   { transform: translateY(-12px); opacity: 0; }
  60%  { transform: translateY(40px);  opacity: 1; }
  100% { transform: translateY(120px); opacity: 0; }
`;
const effectSparkle = keyframes`
  0%, 100% { transform: scale(0.6); opacity: 0; }
  50%      { transform: scale(1.1); opacity: 1; }
`;
const effectFilmStrip = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;
const effectPulse = keyframes`
  0%, 100% { transform: scale(1);    opacity: 0.6; }
  50%      { transform: scale(1.08); opacity: 1; }
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
 * 미리보기 카드 — 2026-04-28 v3.5 6슬롯 합성으로 확장.
 *
 * z-index 레이어 순서 (낮은 것이 뒤):
 *   0: PreviewBackgroundLayer (배경 이미지/패턴)
 *   1: PreviewAvatar (아바타 본체)
 *   2: PreviewFrameOverlay (테두리)
 *   3: PreviewEffectOverlay (애니메이션)
 * 텍스트 레이어:
 *   - PreviewTitle (닉네임 위)
 *   - PreviewNickname + PreviewBadge (닉네임 옆)
 * ============================================================ */
export const PreviewCard = styled.div`
  position: relative;
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
  overflow: hidden;

  ${media.tablet} {
    position: static;
  }
`;

/**
 * 배경 레이어 (z-index 0) — PreviewCard 전체를 덮는 배경 이미지.
 *
 * 등록된 background 아이템의 imageUrl 을 background-image 로 깐다. 가독성 보장을 위해
 * 0.85 불투명 흰색 그라데이션으로 살짝 흐림 처리. 미장착 시 컴포넌트 자체가 렌더되지 않음.
 */
export const PreviewBackgroundLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  background-image:
    linear-gradient(180deg, rgba(255,255,255,0.85), rgba(255,255,255,0.7)),
    url(${({ $url }) => $url || ''});
  background-size: cover;
  background-position: center;
  pointer-events: none;
`;

export const PreviewLabel = styled.span`
  font-size: ${({ theme }) => theme.typography.textXs};
  font-weight: ${({ theme }) => theme.typography.fontSemibold};
  color: ${({ theme }) => theme.colors.textMuted};
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

/**
 * 아바타 컨테이너 (z-index 1) — 아바타 이미지 + 프레임/이펙트 합성 root.
 *
 * 자체는 132×132 원형. 자식 PreviewFrameOverlay/PreviewEffectOverlay 가 동일 좌표에 겹쳐진다.
 * 프레임 미장착 시 컴포넌트 자체의 border (primary 색)가 기본 테두리 역할.
 */
export const PreviewAvatar = styled.div`
  position: relative;
  z-index: 1;
  width: 132px;
  height: 132px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.bgElevated};
  border: 2px solid ${({ $hasFrame, theme }) =>
    $hasFrame ? 'transparent' : theme.colors.primary};
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

/**
 * 프레임 오버레이 (z-index 2) — 아바타 위 SVG/PNG 테두리 합성.
 *
 * PointItem.imageUrl 을 그대로 표시한다. SVG 권장 — 해상도 무관 + 배경 투명.
 * pointer-events: none 으로 하단 아바타 클릭(미래 확장) 을 방해하지 않는다.
 */
export const PreviewFrameOverlay = styled.div`
  position: absolute;
  inset: -8px;
  z-index: 2;
  pointer-events: none;

  > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }
`;

/**
 * 이펙트 오버레이 (z-index 3) — 아바타 주변 애니메이션.
 *
 * effectKey 별로 다른 keyframes 적용. 운영자가 등록한 이펙트 아이템의 itemName/imageUrl
 * 끝부분(popcorn/sparkle/film/pulse) 을 본 컴포넌트의 $effectKey prop 으로 전달받는다.
 * 미인식 키는 기본 pulse 로 fallback.
 */
export const PreviewEffectOverlay = styled.div`
  position: absolute;
  inset: -16px;
  z-index: 3;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ $effectKey }) => {
    if ($effectKey === 'popcorn') {
      return css`animation: ${effectPopcorn} 1.6s ease-in infinite;`;
    }
    if ($effectKey === 'sparkle') {
      return css`animation: ${effectSparkle} 1.4s ease-in-out infinite;`;
    }
    if ($effectKey === 'film') {
      return css`animation: ${effectFilmStrip} 6s linear infinite;`;
    }
    return css`animation: ${effectPulse} 2.0s ease-in-out infinite;`;
  }}

  > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
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

/**
 * 닉네임 위 칭호 텍스트 라벨 — 2026-04-28 v3.5 신규.
 *
 * PointItem.itemName 을 그대로 표시. "🍿 영화광" 처럼 이모지 prefix 가 itemName 에 포함되면
 * 자연스럽게 함께 렌더된다. 칭호 미장착 시 컴포넌트가 렌더되지 않음.
 * z-index 4 — 배경/아바타/프레임/이펙트 위.
 */
export const PreviewTitle = styled.div`
  position: relative;
  z-index: 4;
  font-size: ${({ theme }) => theme.typography.textXs};
  font-weight: ${({ theme }) => theme.typography.fontSemibold};
  color: ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.primaryLight};
  padding: 2px 10px;
  border-radius: ${({ theme }) => theme.radius.full};
  margin-bottom: 6px;
  letter-spacing: -0.01em;
  white-space: nowrap;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const PreviewNickname = styled.div`
  position: relative;
  z-index: 4;
  font-size: ${({ theme }) => theme.typography.textLg};
  font-weight: ${({ theme }) => theme.typography.fontSemibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const PreviewMeta = styled.div`
  position: relative;
  z-index: 4;
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
