/**
 * PostForm 컴포넌트 styled-components 정의.
 *
 * PostForm.css의 모든 규칙을 styled-components로 이관한다.
 * BEM 클래스(.post-form__*) → 개별 컴포넌트(S.Wrapper, S.Field 등)로 매핑.
 *
 * $error — transient prop (DOM에 전달하지 않음)
 *   - true 이면 입력 필드/텍스트영역의 테두리를 에러 색상으로 변경한다.
 *
 * $active — transient prop (DOM에 전달하지 않음)
 *   - true 이면 카테고리 버튼에 gradient 배경을 적용한다.
 *
 * 공유 리소스:
 *   - animations.js : fadeInUp
 */

import styled from 'styled-components';
import { fadeInUp } from '../../../shared/styles/animations';

/**
 * 폼 루트 컨테이너 — glass-card + fadeInUp 진입 애니메이션.
 */
export const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.glass.bg};
  backdrop-filter: ${({ theme }) => theme.glass.blur};
  -webkit-backdrop-filter: ${({ theme }) => theme.glass.blur};
  border: 1px solid ${({ theme }) => theme.glass.border};
  border-radius: ${({ theme }) => theme.radius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  animation: ${fadeInUp} 0.4s ease forwards;
`;

/**
 * 개별 필드 그룹 — 라벨 + 입력 요소를 세로로 배치.
 */
export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

/**
 * 필드 라벨.
 */
export const Label = styled.label`
  font-size: ${({ theme }) => theme.typography.textSm};
  font-weight: ${({ theme }) => theme.typography.fontMedium};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

/**
 * 카테고리 버튼 그룹 컨테이너.
 */
export const Categories = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;

/**
 * 카테고리 선택 버튼.
 *
 * $active 가 true 이면 gradient 배경 + 투명 테두리로 활성 상태를 표시한다.
 */
export const CategoryBtn = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radius.full};
  font-size: ${({ theme }) => theme.typography.textSm};
  font-weight: ${({ theme }) => theme.typography.fontMedium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  /* 비활성 기본 스타일 */
  color: ${({ $active, theme }) =>
    $active ? 'white' : theme.colors.textSecondary};
  background: ${({ $active, theme }) =>
    $active ? theme.gradients.primary : theme.colors.bgElevated};
  border: 1px solid ${({ $active }) =>
    $active ? 'transparent' : 'var(--border-default)'};

  /* 비활성 hover */
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ $active, theme }) =>
      $active ? 'white' : theme.colors.primary};
  }
`;

/**
 * 텍스트 입력 필드.
 *
 * $error 가 true 이면 테두리를 에러 색상으로 변경한다.
 * 포커스 시 primary 테두리 + glow 효과를 적용한다.
 */
export const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.bgInput};
  border: 1px solid ${({ $error, theme }) =>
    $error ? theme.colors.error : theme.colors.borderDefault};
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.textBase};
  transition: border-color ${({ theme }) => theme.transitions.fast};

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.glows.primary};
    outline: none;
  }
`;

/**
 * 멀티라인 텍스트 영역.
 *
 * $error 가 true 이면 테두리를 에러 색상으로 변경한다.
 * resize: vertical 로 세로 방향만 크기 조정을 허용한다.
 */
export const Textarea = styled.textarea`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.bgInput};
  border: 1px solid ${({ $error, theme }) =>
    $error ? theme.colors.error : theme.colors.borderDefault};
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.textBase};
  line-height: ${({ theme }) => theme.typography.leadingRelaxed};
  resize: vertical;
  min-height: 200px;
  transition: border-color ${({ theme }) => theme.transitions.fast};
  font-family: ${({ theme }) => theme.typography.fontFamily};

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.glows.primary};
    outline: none;
  }
`;

/**
 * 글자 수 카운터 행 — 오른쪽 정렬.
 */
export const CharCount = styled.div`
  display: flex;
  justify-content: flex-end;

  span {
    font-size: ${({ theme }) => theme.typography.textXs};
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

/**
 * 필드별 에러 메시지.
 */
export const ErrorMsg = styled.span`
  font-size: ${({ theme }) => theme.typography.textXs};
  color: ${({ theme }) => theme.colors.error};
`;

/**
 * 버튼 영역 — 오른쪽 정렬.
 */
export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.md};
`;

/**
 * 폼 버튼 기본 스타일.
 */
const BtnBase = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: ${({ theme }) => theme.typography.textSm};
  font-weight: ${({ theme }) => theme.typography.fontSemibold};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  border: none;
`;

/**
 * 취소 버튼 — 투명 배경, 테두리.
 */
export const CancelBtn = styled(BtnBase)`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};
  border: 1px solid ${({ theme }) => theme.colors.borderDefault};

  &:hover {
    background-color: ${({ theme }) => theme.colors.bgElevated};
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

/**
 * 제출 버튼 — gradient 배경, hover 시 glow + translateY.
 */
export const SubmitBtn = styled(BtnBase)`
  background: ${({ theme }) => theme.gradients.primary};
  color: white;

  &:hover:not(:disabled) {
    box-shadow: ${({ theme }) => theme.glows.primary};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const ImagePreviewList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
`;

export const ImagePreviewItem = styled.div`
  position: relative;
  width: 100px;
  height: 100px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.colors.borderDefault};
  }
`;

export const ImageRemoveBtn = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 20px;
  height: 20px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover { background: rgba(0, 0, 0, 0.8); }
`;

export const ImageUploadLabel = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border: 1px dashed ${({ theme }) => theme.colors.borderDefault};
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const UploadingMsg = styled.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-top: 4px;
`;