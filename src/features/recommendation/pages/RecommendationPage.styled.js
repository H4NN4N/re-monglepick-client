/**
 * RecommendationPage styled-components 정의.
 *
 * 추천 내역 페이지 레이아웃: 헤더 + 필터 탭 + 카드 목록 + 페이지네이션.
 */

import styled, { keyframes } from 'styled-components';

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
`;

/** 페이지 컨테이너 */
export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.lg}px ${({ theme }) => theme.spacing.md}px;
  animation: ${fadeInUp} 0.4s ease;
`;

/** 페이지 제목 */
export const PageTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.text2xl};
  font-weight: ${({ theme }) => theme.typography.fontBold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0 0 ${({ theme }) => theme.spacing.lg}px;
`;

/** 필터 탭 영역 */
export const FilterTabs = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
  flex-wrap: wrap;
`;

/** 필터 탭 버튼 */
export const FilterTab = styled.button`
  padding: 8px 16px;
  border-radius: ${({ theme }) => theme.radius.full};
  border: 1px solid ${({ theme }) => theme.colors.borderDefault};
  background: ${({ $active, theme }) =>
    $active ? theme.colors.primary : 'transparent'};
  color: ${({ $active, theme }) =>
    $active ? '#fff' : theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.textSm};
  font-weight: ${({ theme }) => theme.typography.fontMedium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

/** 카드 목록 */
export const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

/** 페이지네이션 */
export const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: ${({ theme }) => theme.spacing.xl}px;
  padding: ${({ theme }) => theme.spacing.md}px 0;
`;

/** 페이지 버튼 */
export const PageBtn = styled.button`
  padding: 8px 16px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.borderDefault};
  background: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.textSm};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.bgElevated};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

/** 페이지 정보 */
export const PageInfo = styled.span`
  font-size: ${({ theme }) => theme.typography.textSm};
  color: ${({ theme }) => theme.colors.textMuted};
`;

/** 빈 상태 */
export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 64px 20px;
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: center;
`;

/** 빈 상태 아이콘 */
export const EmptyIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.5;
`;

/** 빈 상태 제목 */
export const EmptyTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.textLg};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0 0 8px;
`;

/** 빈 상태 설명 */
export const EmptyDesc = styled.p`
  font-size: ${({ theme }) => theme.typography.textSm};
  margin: 0 0 16px;
  line-height: 1.5;
`;

/** CTA 버튼 */
export const CtaBtn = styled.button`
  padding: 10px 24px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: none;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-size: ${({ theme }) => theme.typography.textSm};
  font-weight: ${({ theme }) => theme.typography.fontSemibold};
  cursor: pointer;
  transition: opacity ${({ theme }) => theme.transitions.fast};

  &:hover {
    opacity: 0.85;
  }
`;

/** 로딩 스켈레톤 카드 */
export const SkeletonCard = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px;
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.bgSecondary};
  border: 1px solid ${({ theme }) => theme.colors.borderDefault};
`;

/** 스켈레톤 포스터 */
export const SkeletonPoster = styled.div`
  width: 100px;
  height: 150px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.bgElevated};
  animation: pulse 1.5s ease-in-out infinite;

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;

/** 스켈레톤 텍스트 라인 */
export const SkeletonLine = styled.div`
  height: ${({ $h }) => $h || 14}px;
  width: ${({ $w }) => $w || '100%'};
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.bgElevated};
  animation: pulse 1.5s ease-in-out infinite;
`;

/** 스켈레톤 정보 영역 */
export const SkeletonInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
