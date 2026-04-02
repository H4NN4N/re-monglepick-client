/**
 * EmptyState styled-components.
 *
 * 데이터가 없을 때 아이콘 + 메시지 + 액션 버튼을 중앙 정렬하여 표시한다.
 */

import styled from 'styled-components';
import { floatUpDown } from '../../styles/animations';

/** 전체 컨테이너 — 중앙 정렬, 충분한 여백 */
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 300px;
  padding: ${({ theme }) => `${theme.spacing.xxxl} ${theme.spacing.lg}`};
  gap: ${({ theme }) => theme.spacing.md};
`;

/** 아이콘 — 큰 이모지 + floatUpDown 애니메이션 */
export const Icon = styled.div`
  font-size: 64px;
  line-height: 1;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  animation: ${floatUpDown} 3s ease-in-out infinite;
  filter: drop-shadow(${({ theme }) => theme.shadows.glow});
`;

/** 제목 — 굵고 눈에 띄는 텍스트 */
export const Title = styled.h3`
  font-size: ${({ theme }) => theme.typography.textLg};
  font-weight: ${({ theme }) => theme.typography.fontBold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
`;

/** 설명 — 부가 안내 문구 */
export const Description = styled.p`
  font-size: ${({ theme }) => theme.typography.textSm};
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0;
  max-width: 360px;
  line-height: ${({ theme }) => theme.typography.leadingRelaxed};
`;

/** 액션 버튼 — gradient + glow hover */
export const ActionButton = styled.button`
  margin-top: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.xl}`};
  background: ${({ theme }) => theme.gradients.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: ${({ theme }) => theme.typography.textSm};
  font-weight: ${({ theme }) => theme.typography.fontSemibold};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    box-shadow: ${({ theme }) => theme.glows.primary};
    transform: translateY(-1px);
  }
`;
