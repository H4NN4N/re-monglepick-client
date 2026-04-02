/**
 * RecommendationCard styled-components 정의.
 *
 * 추천 영화 카드 UI: 포스터 + 정보 + 액션 버튼(찜/봤어요/피드백).
 */

import styled, { css, keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
`;

/** 카드 컨테이너 */
export const Card = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px;
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.bgSecondary};
  border: 1px solid ${({ theme }) => theme.colors.borderDefault};
  transition: all ${({ theme }) => theme.transitions.base};
  animation: ${fadeIn} 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.md};
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

/** 포스터 이미지 래퍼 */
export const PosterWrapper = styled.div`
  flex-shrink: 0;
  width: 100px;
  height: 150px;
  border-radius: ${({ theme }) => theme.radius.md};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.bgElevated};
  cursor: pointer;
`;

/** 포스터 이미지 */
export const Poster = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

/** 포스터 플레이스홀더 */
export const PosterPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

/** 정보 영역 */
export const Info = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

/** 영화 제목 */
export const Title = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.textBase};
  font-weight: ${({ theme }) => theme.typography.fontSemibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

/** 메타 정보 (연도, 장르 등) */
export const Meta = styled.div`
  font-size: ${({ theme }) => theme.typography.textSm};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

/** 추천 이유 */
export const Explanation = styled.p`
  margin: 4px 0 0;
  font-size: ${({ theme }) => theme.typography.textSm};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.5;
  border-left: 3px solid ${({ theme }) => theme.colors.primary};
  padding-left: 10px;
  background: ${({ theme }) => theme.colors.bgElevated};
  border-radius: 0 ${({ theme }) => theme.radius.sm} ${({ theme }) => theme.radius.sm} 0;
  padding: 8px 12px;
`;

/** 추천 일시 */
export const RecommendedAt = styled.div`
  font-size: ${({ theme }) => theme.typography.textXs};
  color: ${({ theme }) => theme.colors.textMuted};
  margin-top: auto;
`;

/** 액션 버튼 영역 */
export const Actions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    justify-content: center;
  }
`;

/** 액션 버튼 공통 */
export const ActionBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.borderDefault};
  background: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.textSm};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.bgElevated};
  }

  /* 활성 상태 */
  ${({ $active, $variant, theme }) =>
    $active &&
    $variant === 'wishlist' &&
    css`
      background: ${theme.colors.error}20;
      border-color: ${theme.colors.error};
      color: ${theme.colors.error};
    `}

  ${({ $active, $variant, theme }) =>
    $active &&
    $variant === 'watched' &&
    css`
      background: ${theme.colors.success}20;
      border-color: ${theme.colors.success};
      color: ${theme.colors.success};
    `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

/** 피드백 별점 영역 */
export const FeedbackStars = styled.div`
  display: flex;
  gap: 2px;
  margin-top: 4px;
`;

/** 별 아이콘 버튼 */
export const StarBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
  padding: 0 1px;
  color: ${({ $filled, theme }) => ($filled ? '#fbbf24' : theme.colors.textMuted)};
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: #fbbf24;
  }
`;

/** 피드백 입력 래퍼 */
export const FeedbackForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
  padding: 12px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.bgElevated};
  border: 1px solid ${({ theme }) => theme.colors.borderDefault};
`;

/** 피드백 코멘트 입력 */
export const FeedbackInput = styled.textarea`
  width: 100%;
  min-height: 60px;
  padding: 8px 12px;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid ${({ theme }) => theme.colors.borderDefault};
  background: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.textSm};
  resize: vertical;
  font-family: inherit;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

/** 피드백 제출 버튼 */
export const FeedbackSubmitBtn = styled.button`
  align-self: flex-end;
  padding: 6px 16px;
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

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
