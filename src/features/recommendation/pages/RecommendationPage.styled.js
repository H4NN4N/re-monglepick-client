/**
 * RecommendationPage styled-components 정의.
 *
 * 추천 내역 페이지 레이아웃: 헤더(제목+부제+카운트) + 필터 탭 + 카드 목록 + 페이지네이션.
 *
 * 2026-04-27 UI/UX 정돈:
 *   - PageHeader 블록 신설 (제목/부제/총 개수 chip 을 하나의 그룹으로 묶음)
 *   - 필터 탭 hover/active 톤다운 + 카운트 배지 슬롯
 *   - 카드 목록 gap 16px 로 확대 + 진입 fadeInUp 단일화
 *   - EmptyState 카드형 컨테이너로 개선 (단순 빈 텍스트 → 일러스트형)
 *   - Pagination 버튼 톤 정리 + 컴팩트한 페이지 인디케이터
 */

import styled, { css, keyframes } from 'styled-components';
import { media } from '../../../shared/styles/media';

/* ── 진입 애니메이션 — 페이지 전체 1회만 ── */
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
`;

/** 페이지 컨테이너 */
export const Container = styled.div`
  max-width: 880px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md};
  animation: ${fadeInUp} 0.4s ease;

  ${media.mobile} {
    padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.sm};
  }
`;

/* ============================================================
 * 페이지 헤더 — 제목 + 부제 + 카운트 chip
 * ============================================================ */
export const PageHeader = styled.header`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

/** 제목 + 카운트 chip 같은 줄 정렬 */
export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

/** 페이지 제목 */
export const PageTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.text2xl};
  font-weight: ${({ theme }) => theme.typography.fontBold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
  letter-spacing: -0.02em;
`;

/** 총 개수 chip (헤더 우상단 인라인) */
export const CountBadge = styled.span`
  display: inline-flex;
  align-items: center;
  height: 24px;
  padding: 0 10px;
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.textXs};
  font-weight: ${({ theme }) => theme.typography.fontSemibold};
  letter-spacing: 0.02em;
`;

/** 부제 */
export const PageSubtitle = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.textSm};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: ${({ theme }) => theme.typography.leadingNormal};
`;

/* ============================================================
 * 필터 탭
 * ============================================================ */
export const FilterTabs = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  flex-wrap: wrap;
`;

/**
 * 필터 탭 버튼.
 *
 * 비활성: bgSecondary + textSecondary + 투명 보더
 * 활성: primary 풀필 + 흰 텍스트 + 살짝 그림자
 */
export const FilterTab = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: ${({ theme }) => theme.radius.full};
  border: 1px solid transparent;
  background: ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.bgSecondary};
  color: ${({ $active, theme }) =>
    $active ? '#fff' : theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.textSm};
  font-weight: ${({ theme }) => theme.typography.fontMedium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  box-shadow: ${({ $active, theme }) =>
    $active ? theme.shadows.sm : 'none'};

  &:hover {
    ${({ $active, theme }) =>
      !$active &&
      css`
        background: ${theme.colors.bgElevated};
        color: ${theme.colors.textPrimary};
      `}
  }
`;

/* ============================================================
 * 카드 목록
 * ============================================================ */
export const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

/* ============================================================
 * 페이지네이션
 * ============================================================ */
export const Pagination = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.md} 0;
`;

/** 이전/다음 버튼 */
export const PageBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 80px;
  height: 36px;
  padding: 0 14px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.borderDefault};
  background: ${({ theme }) => theme.colors.bgSecondary};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.textSm};
  font-weight: ${({ theme }) => theme.typography.fontMedium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

/** 페이지 인디케이터 (n / N) */
export const PageInfo = styled.span`
  font-size: ${({ theme }) => theme.typography.textSm};
  font-weight: ${({ theme }) => theme.typography.fontMedium};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-variant-numeric: tabular-nums;
  min-width: 60px;
  text-align: center;
`;

/* ============================================================
 * 빈 상태 — 카드형 컨테이너로 격상
 * ============================================================ */
export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xxxl} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.bgSecondary};
  border: 1px dashed ${({ theme }) => theme.colors.borderDefault};
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: center;
`;

export const EmptyIcon = styled.div`
  width: 72px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.colors.primaryLight};
  font-size: 36px;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const EmptyTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.textLg};
  font-weight: ${({ theme }) => theme.typography.fontSemibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0 0 ${({ theme }) => theme.spacing.xs};
`;

export const EmptyDesc = styled.p`
  font-size: ${({ theme }) => theme.typography.textSm};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0 0 ${({ theme }) => theme.spacing.lg};
  line-height: ${({ theme }) => theme.typography.leadingNormal};
`;

export const CtaBtn = styled.button`
  padding: 10px 20px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: none;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-size: ${({ theme }) => theme.typography.textSm};
  font-weight: ${({ theme }) => theme.typography.fontSemibold};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  box-shadow: ${({ theme }) => theme.shadows.sm};

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

/* ============================================================
 * 로딩 스켈레톤
 * ============================================================ */
const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.55; }
`;

export const SkeletonCard = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px;
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.bgSecondary};
  border: 1px solid ${({ theme }) => theme.colors.borderDefault};
`;

export const SkeletonPoster = styled.div`
  flex-shrink: 0;
  width: 100px;
  height: 150px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.bgElevated};
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

export const SkeletonLine = styled.div`
  height: ${({ $h }) => $h || 14}px;
  width: ${({ $w }) => $w || '100%'};
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.bgElevated};
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

export const SkeletonInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
