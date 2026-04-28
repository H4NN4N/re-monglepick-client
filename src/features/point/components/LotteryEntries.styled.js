/**
 * LotteryEntries 컴포넌트 styled-components 스타일 정의 (2026-04-28 신규).
 *
 * <p>응모 현황 테이블 + 페이지네이션. PointHistory.styled 의 디자인 토큰을 재사용해
 * 같은 시각 언어로 통일한다.</p>
 */

import styled from 'styled-components';
import { media } from '../../../shared/styles/media';

/** 응모 현황 섹션 래퍼 — 다른 섹션과 동일 글래스 카드 톤 */
export const Section = styled.section`
  background: ${({ theme }) => theme.glass.bg};
  backdrop-filter: blur(8px) saturate(1.4);
  -webkit-backdrop-filter: blur(8px) saturate(1.4);
  border: 1px solid ${({ theme }) => theme.glass.border};
  border-radius: ${({ theme }) => theme.radius.xl};
  padding: ${({ theme }) => theme.spacing.xl};

  ${media.tablet} {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

/** 섹션 제목 + 응모 건수 */
export const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.textLg};
  font-weight: ${({ theme }) => theme.typography.fontSemibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0 0 ${({ theme }) => theme.spacing.lg} 0;
  display: flex;
  align-items: baseline;
  gap: ${({ theme }) => theme.spacing.sm};
`;

/** 부가 카운트 (헤더 안에 회색 보조 텍스트) */
export const TitleCount = styled.span`
  font-size: ${({ theme }) => theme.typography.textSm};
  font-weight: ${({ theme }) => theme.typography.fontNormal};
  color: ${({ theme }) => theme.colors.textMuted};
`;

/** 안내 박스 — "매월 1일 추첨" 등 */
export const Notice = styled.p`
  font-size: ${({ theme }) => theme.typography.textSm};
  color: ${({ theme }) => theme.colors.textSecondary};
  background: ${({ theme }) => theme.colors.bgElevated};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radius.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  line-height: 1.6;
  border-left: 3px solid ${({ theme }) => theme.colors.primary};
`;

/** 빈 상태 */
export const Empty = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxl};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.textSm};
`;

/** 테이블 가로 스크롤 래퍼 */
export const TableWrapper = styled.div`
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  ${media.tablet} {
    min-width: 480px;
  }
`;

export const Th = styled.th`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.textSm};
  font-weight: ${({ theme }) => theme.typography.fontMedium};
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: left;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderDefault};
  white-space: nowrap;
`;
export const Td = styled.td`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.textSm};
  color: ${({ theme }) => theme.colors.textSecondary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
`;
export const Tr = styled.tr`
  &:hover td {
    background-color: ${({ theme }) => theme.colors.bgElevated};
  }
`;

/** 회차(YYYY-MM) 셀 — monospace 강조 */
export const CycleCell = styled(Td)`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: 'Menlo', 'Monaco', monospace;
  font-weight: ${({ theme }) => theme.typography.fontMedium};
  white-space: nowrap;
`;

/**
 * 결과 상태 pill — WON 강조(primary), PENDING 은 보통, LOST 는 흐림.
 *
 * <p>$status: 'PENDING' | 'WON' | 'LOST'</p>
 */
export const StatusPill = styled.span`
  display: inline-block;
  padding: 2px 10px;
  border-radius: 999px;
  font-size: ${({ theme }) => theme.typography.textXs ?? theme.typography.textSm};
  font-weight: ${({ theme }) => theme.typography.fontSemibold};
  background: ${({ $status, theme }) => {
    if ($status === 'WON')  return theme.colors.successBg ?? '#e8f6ee';
    if ($status === 'LOST') return theme.colors.bgElevated;
    return theme.colors.warningBg ?? '#fff5e1';
  }};
  color: ${({ $status, theme }) => {
    if ($status === 'WON')  return theme.colors.success ?? '#2e7d32';
    if ($status === 'LOST') return theme.colors.textMuted;
    return theme.colors.warning ?? '#b26a00';
  }};
`;

/** 일시 셀 — 보조 텍스트 톤 */
export const DateCell = styled(Td)`
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.textMuted};
`;

/** 페이지네이션 래퍼 */
export const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

export const PaginationBtn = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.borderDefault};
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: ${({ theme }) => theme.typography.textSm};
  font-weight: ${({ theme }) => theme.typography.fontMedium};
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
  &:disabled {
    color: ${({ theme }) => theme.colors.textMuted};
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const PaginationInfo = styled.span`
  font-size: ${({ theme }) => theme.typography.textSm};
  color: ${({ theme }) => theme.colors.textSecondary};
`;
