/**
 * OrderHistory 컴포넌트 styled-components 정의.
 *
 * 결제 내역 테이블과 페이지네이션 스타일.
 * 순수 CSS(OrderHistory.css)에서 전환됨.
 *
 * 인라인 스타일 제거:
 *   - 주문 상태(status)별 색상 → $status transient prop으로 매핑
 */

import styled from 'styled-components';
import { media } from '../../../shared/styles/media';

/* ── 주문 상태(status)별 색상 매핑 헬퍼 ── */
const getStatusColor = ({ $status, theme }) => {
  switch ($status) {
    case 'PENDING':   return theme.colors.warning;
    case 'COMPLETED': return theme.colors.success;
    case 'FAILED':    return theme.colors.error;
    case 'REFUNDED':
    case 'CANCELLED': return theme.colors.textMuted;
    default:          return theme.colors.textSecondary;
  }
};

/* 빈 결제 내역 안내 */
export const EmptyWrapper = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxl};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.textSm};
`;

/* 테이블 래퍼 — 모바일 가로 스크롤 */
export const TableWrapper = styled.div`
  overflow-x: auto;
`;

/* 결제 내역 테이블 */
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  /* 모바일: 최소 너비로 가로 스크롤 유도 */
  ${media.tablet} {
    min-width: 500px;
  }
`;

/* 테이블 헤더 셀 */
export const Th = styled.th`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.textSm};
  font-weight: ${({ theme }) => theme.typography.fontMedium};
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: left;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderDefault};
  white-space: nowrap;
`;

/* 테이블 데이터 셀 */
export const Td = styled.td`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.textSm};
  color: ${({ theme }) => theme.colors.textSecondary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
`;

/* 테이블 행 — 호버 시 glass 강조 */
export const Tr = styled.tr`
  &:hover {
    /* hover bg — primaryLight 토큰으로 대체 */
    background-color: ${({ theme }) => theme.colors.primaryLight};
  }
`;

/* 주문번호 셀 — 고정폭 폰트 */
export const OrderIdCell = styled(Td)`
  font-family: ${({ theme }) => theme.typography.fontMono};
  font-size: ${({ theme }) => theme.typography.textXs};
  color: ${({ theme }) => theme.colors.textMuted};
`;

/* 금액 셀 */
export const AmountCell = styled(Td)`
  font-weight: ${({ theme }) => theme.typography.fontSemibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  white-space: nowrap;
`;

/* 상태 배지 span — $status prop으로 색상 결정 */
export const StatusBadge = styled.span`
  font-weight: ${({ theme }) => theme.typography.fontMedium};
  color: ${getStatusColor};
`;

/* 일시 셀 */
export const DateCell = styled(Td)`
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.textMuted};
`;

/* 페이지네이션 컨테이너 */
export const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

/* 페이지 이동 버튼 */
export const PaginationButton = styled.button`
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

/* 현재 페이지 / 전체 페이지 표시 */
export const PaginationInfo = styled.span`
  font-size: ${({ theme }) => theme.typography.textSm};
  color: ${({ theme }) => theme.colors.textSecondary};
`;
