/**
 * StampReviewPage styled-components 정의.
 *
 * 도장깨기 리뷰 작성 페이지 전용 스타일.
 * RoadmapPage 상세 뷰의 리뷰 모달(ReviewOverlay/ReviewPanel)을
 * 독립 페이지 레이아웃으로 확장한 버전.
 *
 * 테마 토큰(theme.colors / theme.typography / theme.radius / theme.shadows / theme.transitions)은
 * RoadmapPage.styled.js 와 동일한 디자인 시스템을 사용한다.
 */

import styled, { keyframes } from 'styled-components';

/* 페이지 진입 애니메이션 (RoadmapPage와 동일 톤) */
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
`;

/** 페이지 컨테이너 — RoadmapPage Container 와 동일 폭/여백 */
export const Container = styled.div`
  max-width: 720px;
  margin: 0 auto;
  padding: 48px 32px 32px;
  animation: ${fadeInUp} 0.4s ease;

  @media (max-width: 480px) {
    padding: 32px 16px 24px;
  }
`;

/** 뒤로가기 링크 — RoadmapPage BackLink 와 동일 */
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
  margin-bottom: 16px;

  &:hover { color: ${({ theme }) => theme.colors.primary}; }
`;

/** 헤더 블록 — 코스명/제목/영화명 묶음 */
export const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 24px;
`;

/** 코스명 — 상위 컨텍스트(작게) */
export const CourseName = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.textSm};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

/** 페이지 제목 */
export const PageTitle = styled.h1`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.text2xl};
  font-weight: ${({ theme }) => theme.typography.fontBold};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

/** 영화명 — 포커스 톤(프라이머리) */
export const MovieName = styled.p`
  margin: 4px 0 0;
  font-size: ${({ theme }) => theme.typography.textBase};
  font-weight: ${({ theme }) => theme.typography.fontMedium};
  color: ${({ theme }) => theme.colors.primary};
`;

/** 작성 카드 — RoadmapPage ReviewPanel 을 풀페이지 카드로 확장 */
export const Card = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 28px 24px 24px;
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.bgSecondary};
  border: 1px solid ${({ theme }) => theme.colors.borderDefault};
`;

/** 안내 라벨 */
export const Label = styled.label`
  font-size: ${({ theme }) => theme.typography.textSm};
  font-weight: ${({ theme }) => theme.typography.fontSemibold};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

/** 힌트 문구 */
export const Hint = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.textXs};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.5;
`;

/** 리뷰 입력 텍스트영역 — RoadmapPage ReviewTextarea 를 크게 확장 */
export const Textarea = styled.textarea`
  width: 100%;
  min-height: 180px;
  padding: 12px 14px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.borderDefault};
  background: ${({ theme }) => theme.colors.bgElevated};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.textSm};
  line-height: 1.6;
  resize: vertical;
  box-sizing: border-box;
  transition: border-color ${({ theme }) => theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

/**
 * 글자 수 카운트 — $warn 이 true 면 경고 톤.
 * (StampReviewPage.jsx 에서 length > MAX_LENGTH * 0.9 이면 $warn 전달)
 */
export const CharCount = styled.div`
  align-self: flex-end;
  font-size: ${({ theme }) => theme.typography.textXs};
  color: ${({ $warn, theme }) =>
    $warn ? theme.colors.warning : theme.colors.textMuted};
  font-weight: ${({ $warn, theme }) =>
    $warn ? theme.typography.fontSemibold : theme.typography.fontNormal};
`;

/** 하단 액션 버튼 영역 */
export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 20px;
`;

/** 취소 버튼 — RoadmapPage ReviewBtn($variant='cancel') 톤 */
export const CancelBtn = styled.button`
  padding: 10px 20px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.borderDefault};
  background: ${({ theme }) => theme.colors.bgElevated};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.textSm};
  font-weight: ${({ theme }) => theme.typography.fontSemibold};
  cursor: pointer;
  transition: opacity ${({ theme }) => theme.transitions.fast};

  &:hover { opacity: 0.85; }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

/** 제출 버튼 — 프라이머리 */
export const SubmitBtn = styled.button`
  padding: 10px 20px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: none;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-size: ${({ theme }) => theme.typography.textSm};
  font-weight: ${({ theme }) => theme.typography.fontSemibold};
  cursor: pointer;
  transition: opacity ${({ theme }) => theme.transitions.fast};

  &:hover { opacity: 0.85; }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;
