/**
 * ThemeToggle styled-components.
 *
 * 32x32 원형 버튼. 해(라이트)/달(다크) 아이콘 전환.
 * 아이콘 전환 시 rotate + scale 트랜지션.
 */

import styled from 'styled-components';

/** 토글 버튼 — 원형, 테마 전환 시 아이콘 회전 애니메이션 */
export const ToggleButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.radius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.borderDefault};
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.base};
  flex-shrink: 0;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryLight};
    color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.glass.border};
  }
`;

/** 아이콘 래퍼 — 전환 시 rotate + scale 애니메이션 */
export const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  line-height: 1;
  transition: transform ${({ theme }) => theme.transitions.base};

  /* 전환 직후 잠깐 회전 효과 */
  ${ToggleButton}:active & {
    transform: rotate(180deg) scale(0.8);
  }
`;
