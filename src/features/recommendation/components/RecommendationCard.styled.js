/**
 * RecommendationCard styled-components 정의.
 *
 * 추천 영화 카드 UI: 포스터 + 정보(제목/메타/추천 사유/날짜) + 액션 버튼(찜/봤어요/평가).
 *
 * 2026-04-27 UI/UX 정돈:
 *   - 카드 hover 시 살짝 들어올리는(translateY) 인터랙션
 *   - 정보 영역에 헤더 라인 신설(제목 ↔ 우상단 날짜 chip)
 *   - 추천 사유 인용구 스타일 통일(좌측 컬러 바 + 약한 배경)
 *   - 액션 버튼 톤 정리(아이콘+라벨, 활성 시 컬러 풀필 — 텍스트는 항상 흰색)
 *   - 평가 버튼은 별점 가시화: 평가 완료 시 별 아이콘 + 점수 노출
 *   - 피드백 폼은 카드 내부 inset 배경으로 구분
 */

import styled, { css, keyframes } from 'styled-components';
import { media } from '../../../shared/styles/media';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
`;

/** 카드 컨테이너 */
export const Card = styled.article`
  display: flex;
  gap: 16px;
  padding: 16px;
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.bgCard};
  border: 1px solid ${({ theme }) => theme.colors.borderDefault};
  transition: transform ${({ theme }) => theme.transitions.fast},
    border-color ${({ theme }) => theme.transitions.fast},
    box-shadow ${({ theme }) => theme.transitions.fast};
  animation: ${fadeIn} 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.md};
    transform: translateY(-2px);
  }

  ${media.mobile} {
    padding: 14px;
    gap: 12px;
  }
`;

/** 포스터 이미지 래퍼 */
export const PosterWrapper = styled.div`
  flex-shrink: 0;
  width: 104px;
  height: 156px;
  border-radius: ${({ theme }) => theme.radius.md};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.bgElevated};
  cursor: pointer;
  position: relative;
  transition: transform ${({ theme }) => theme.transitions.fast};

  &:hover {
    transform: scale(1.02);
  }

  ${media.mobile} {
    width: 88px;
    height: 132px;
  }
`;

/** 포스터 이미지 */
export const Poster = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
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

/** 정보 영역 — 가로폭 가변, 컬럼 레이아웃 */
export const Info = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

/** 헤더 라인 — 제목(좌) ↔ 날짜 chip(우) */
export const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
`;

/** 영화 제목 */
export const Title = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.textBase};
  font-weight: ${({ theme }) => theme.typography.fontSemibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  cursor: pointer;
  line-height: 1.35;
  letter-spacing: -0.01em;
  word-break: keep-all;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

/** 추천 일시 chip — 제목 우측에 작게 정렬 */
export const DateChip = styled.time`
  flex-shrink: 0;
  font-size: ${({ theme }) => theme.typography.textXs};
  color: ${({ theme }) => theme.colors.textMuted};
  white-space: nowrap;
  padding-top: 2px;
`;

/** 메타 정보 (연도, 장르, 평점) */
export const Meta = styled.div`
  font-size: ${({ theme }) => theme.typography.textSm};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.5;
`;

/** 추천 이유 — 좌측 컬러 바 + 약한 배경 인용구 */
export const Explanation = styled.p`
  margin: 6px 0 0;
  padding: 10px 12px;
  font-size: ${({ theme }) => theme.typography.textSm};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: ${({ theme }) => theme.typography.leadingNormal};
  background: ${({ theme }) => theme.colors.bgElevated};
  border-left: 3px solid ${({ theme }) => theme.colors.primary};
  border-radius: 0 ${({ theme }) => theme.radius.sm} ${({ theme }) => theme.radius.sm} 0;
`;

/** 액션 버튼 영역 */
export const Actions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 10px;
  flex-wrap: wrap;
`;

/**
 * 액션 버튼 공통.
 *
 * 비활성: bgElevated + textSecondary
 * 활성:
 *   wishlist → error 풀필 (흰 텍스트)
 *   watched  → success 풀필 (흰 텍스트)
 *   feedback → primary 풀필 (흰 텍스트)
 */
export const ActionBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 12px;
  border-radius: ${({ theme }) => theme.radius.full};
  border: 1px solid transparent;
  background: ${({ theme }) => theme.colors.bgElevated};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.textSm};
  font-weight: ${({ theme }) => theme.typography.fontMedium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  line-height: 1;

  &:hover {
    background: ${({ theme }) => theme.colors.bgTertiary};
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  /* 활성 — 찜 */
  ${({ $active, $variant, theme }) =>
    $active &&
    $variant === 'wishlist' &&
    css`
      background: ${theme.colors.error};
      color: #fff;
      &:hover { background: ${theme.colors.error}; opacity: 0.9; color: #fff; }
    `}

  /* 활성 — 봤어요 */
  ${({ $active, $variant, theme }) =>
    $active &&
    $variant === 'watched' &&
    css`
      background: ${theme.colors.success};
      color: #fff;
      &:hover { background: ${theme.colors.success}; opacity: 0.9; color: #fff; }
    `}

  /* 활성 — 평가 완료 */
  ${({ $active, $variant, theme }) =>
    $active &&
    $variant === 'feedback' &&
    css`
      background: ${theme.colors.primary};
      color: #fff;
      &:hover { background: ${theme.colors.primaryHover}; color: #fff; }
    `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

/** 별점 영역 */
export const FeedbackStars = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

/** 별 아이콘 버튼 */
export const StarBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  line-height: 1;
  padding: 2px;
  color: ${({ $filled, theme }) => ($filled ? theme.colors.starFilled : theme.colors.starEmpty)};
  transition: transform ${({ theme }) => theme.transitions.fast},
    color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.starFilled};
    transform: scale(1.15);
  }
`;

/** 별점 옆 보조 라벨 (선택한 점수 안내) */
export const StarHint = styled.span`
  margin-left: 4px;
  font-size: ${({ theme }) => theme.typography.textXs};
  color: ${({ theme }) => theme.colors.textMuted};
`;

/** 피드백 입력 래퍼 */
export const FeedbackForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 12px;
  padding: 14px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.bgElevated};
  border: 1px solid ${({ theme }) => theme.colors.borderDefault};
  animation: ${fadeIn} 0.2s ease;
`;

/** 피드백 코멘트 입력 */
export const FeedbackInput = styled.textarea`
  width: 100%;
  min-height: 64px;
  padding: 10px 12px;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid ${({ theme }) => theme.colors.borderDefault};
  background: ${({ theme }) => theme.colors.bgInput};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.textSm};
  resize: vertical;
  font-family: inherit;
  line-height: 1.5;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.borderFocus};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

/** 피드백 폼 푸터 — 보조 라벨 + 제출 버튼 */
export const FeedbackFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
`;

/** 글자수 카운터 */
export const CharCount = styled.span`
  font-size: ${({ theme }) => theme.typography.textXs};
  color: ${({ theme }) => theme.colors.textMuted};
  font-variant-numeric: tabular-nums;
`;

/** 피드백 제출 버튼 */
export const FeedbackSubmitBtn = styled.button`
  padding: 8px 18px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: none;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-size: ${({ theme }) => theme.typography.textSm};
  font-weight: ${({ theme }) => theme.typography.fontSemibold};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primaryHover};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;
