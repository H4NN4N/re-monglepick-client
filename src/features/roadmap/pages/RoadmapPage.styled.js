/**
 * RoadmapPage styled-components 정의.
 *
 * 영화 학습 로드맵: 코스 목록 + 코스 상세 (영화 체크리스트).
 */

import styled, { keyframes } from 'styled-components';

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
`;

/** 페이지 컨테이너 */
export const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.lg}px ${({ theme }) => theme.spacing.md}px;
  animation: ${fadeInUp} 0.4s ease;
`;

/** 페이지 제목 */
export const PageTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.text2xl};
  font-weight: ${({ theme }) => theme.typography.fontBold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0 0 4px;
`;

/** 서브 제목 */
export const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.textSm};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0 0 ${({ theme }) => theme.spacing.lg}px;
`;

/** 카테고리 필터 */
export const CategoryFilters = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
  flex-wrap: wrap;
`;

/** 카테고리 버튼 */
export const CategoryBtn = styled.button`
  padding: 8px 16px;
  border-radius: ${({ theme }) => theme.radius.full};
  border: 1px solid ${({ theme }) => theme.colors.borderDefault};
  background: ${({ $active, theme }) =>
    $active ? theme.colors.primary : 'transparent'};
  color: ${({ $active }) => ($active ? '#fff' : 'inherit')};
  font-size: ${({ theme }) => theme.typography.textSm};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover { border-color: ${({ theme }) => theme.colors.primary}; }
`;

/** 코스 그리드 */
export const CourseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
`;

/** 코스 카드 */
export const CourseCard = styled.div`
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.bgSecondary};
  border: 1px solid ${({ theme }) => theme.colors.borderDefault};
  overflow: hidden;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.base};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

/** 코스 썸네일 */
export const CourseThumbnail = styled.div`
  width: 100%;
  height: 120px;
  background: ${({ theme }) => theme.colors.bgElevated};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
`;

/** 코스 정보 */
export const CourseInfo = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

/** 코스 제목 */
export const CourseTitle = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.textBase};
  font-weight: ${({ theme }) => theme.typography.fontSemibold};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

/** 코스 설명 */
export const CourseDesc = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.textSm};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

/** 코스 메타 (영화 수, 난이도) */
export const CourseMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: ${({ theme }) => theme.typography.textXs};
  color: ${({ theme }) => theme.colors.textMuted};
  margin-top: 4px;
`;

/** 난이도 배지 */
export const DifficultyBadge = styled.span`
  padding: 2px 8px;
  border-radius: ${({ theme }) => theme.radius.full};
  font-size: ${({ theme }) => theme.typography.textXs};
  font-weight: ${({ theme }) => theme.typography.fontSemibold};
  background: ${({ $level, theme }) => {
    if ($level === 'EASY') return `${theme.colors.success}20`;
    if ($level === 'MEDIUM') return `${theme.colors.warning}20`;
    return `${theme.colors.error}20`;
  }};
  color: ${({ $level, theme }) => {
    if ($level === 'EASY') return theme.colors.success;
    if ($level === 'MEDIUM') return theme.colors.warning;
    return theme.colors.error;
  }};
`;

/** 진행률 바 외부 */
export const ProgressBarOuter = styled.div`
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background: ${({ theme }) => theme.colors.bgElevated};
  overflow: hidden;
  margin-top: 8px;
`;

/** 진행률 바 내부 */
export const ProgressBarInner = styled.div`
  height: 100%;
  border-radius: 2px;
  background: ${({ $percent, theme }) =>
    $percent >= 100 ? theme.colors.success : theme.colors.primary};
  width: ${({ $percent }) => Math.min(100, $percent || 0)}%;
  transition: width 0.5s ease;
`;

/* ── 상세 뷰 ── */

/** 뒤로가기 링크 */
export const BackLink = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 0;
  border: none;
  background: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.textSm};
  cursor: pointer;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;

  &:hover { color: ${({ theme }) => theme.colors.primary}; }
`;

/** 상세 헤더 */
export const DetailHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

/** 상세 진행 상황 */
export const DetailProgress = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 12px;
`;

/** 진행 텍스트 */
export const ProgressText = styled.span`
  font-size: ${({ theme }) => theme.typography.textSm};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

/** 시작 버튼 */
export const StartBtn = styled.button`
  padding: 10px 24px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: none;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-size: ${({ theme }) => theme.typography.textSm};
  font-weight: ${({ theme }) => theme.typography.fontSemibold};
  cursor: pointer;
  transition: opacity ${({ theme }) => theme.transitions.fast};
  margin-top: 12px;

  &:hover { opacity: 0.85; }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

/** 영화 체크리스트 */
export const MovieList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

/** 영화 아이템 */
export const MovieItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.bgSecondary};
  border: 1px solid ${({ theme }) => theme.colors.borderDefault};
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

/** 체크박스 */
export const Checkbox = styled.button`
  width: 28px;
  height: 28px;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 2px solid ${({ $checked, theme }) =>
    $checked ? theme.colors.success : theme.colors.borderDefault};
  background: ${({ $checked, theme }) =>
    $checked ? theme.colors.success : 'transparent'};
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.success};
  }
`;

/** 영화 포스터 (작은) */
export const MoviePoster = styled.img`
  width: 40px;
  height: 60px;
  border-radius: ${({ theme }) => theme.radius.sm};
  object-fit: cover;
  flex-shrink: 0;
`;

/** 영화 포스터 플레이스홀더 */
export const MoviePosterPlaceholder = styled.div`
  width: 40px;
  height: 60px;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.bgElevated};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  flex-shrink: 0;
`;

/** 영화 정보 */
export const MovieInfo = styled.div`
  flex: 1;
  min-width: 0;
  cursor: pointer;

  &:hover h4 { color: ${({ theme }) => theme.colors.primary}; }
`;

/** 영화 제목 */
export const MovieTitle = styled.h4`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.textSm};
  font-weight: ${({ theme }) => theme.typography.fontMedium};
  color: ${({ theme }) => theme.colors.textPrimary};
  transition: color ${({ theme }) => theme.transitions.fast};
`;

/** 영화 메타 */
export const MovieMeta = styled.div`
  font-size: ${({ theme }) => theme.typography.textXs};
  color: ${({ theme }) => theme.colors.textMuted};
  margin-top: 2px;
`;

/** 빈 상태 */
export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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

/** 빈 상태 텍스트 */
export const EmptyText = styled.p`
  font-size: ${({ theme }) => theme.typography.textSm};
  margin: 0;
  line-height: 1.5;
`;

/** 스켈레톤 */
export const SkeletonCard = styled.div`
  height: ${({ $h }) => $h || 200}px;
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.bgSecondary};
  animation: pulse 1.5s ease-in-out infinite;

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;
