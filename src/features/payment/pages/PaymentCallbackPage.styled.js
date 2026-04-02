/**
 * 결제 성공/실패 콜백 페이지 공통 styled-components.
 *
 * 결제 결과를 카드 형태로 중앙에 표시한다.
 * PaymentSuccessPage, PaymentFailPage에서 공유한다.
 */

import styled, { css } from 'styled-components';
import { fadeInUp } from '../../../shared/styles/animations';
import { media } from '../../../shared/styles/media';

/** 컨테이너 — 화면 중앙 정렬 */
export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.xl};

  ${media.mobile} {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

/** 결과 카드 — glass-card */
export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  max-width: 480px;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.xxl};
  background: ${({ theme }) => theme.glass.bg};
  backdrop-filter: blur(8px) saturate(1.4);
  -webkit-backdrop-filter: blur(8px) saturate(1.4);
  border: 1px solid ${({ theme }) => theme.glass.border};
  border-radius: ${({ theme }) => theme.radius.xl};
  text-align: center;
  animation: ${fadeInUp} 0.5s ease forwards;

  ${media.mobile} {
    padding: ${({ theme }) => theme.spacing.xl};
  }
`;

/** 아이콘 — 원형 배지 */
export const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  font-size: 32px;
  font-weight: ${({ theme }) => theme.typography.fontBold};

  ${({ $variant }) =>
    $variant === 'success' &&
    css`
      background: linear-gradient(135deg, #06d6a0, #1b9aaa);
      color: white;
      box-shadow: 0 0 24px rgba(6, 214, 160, 0.3);
    `}

  ${({ $variant }) =>
    $variant === 'fail' &&
    css`
      background: linear-gradient(135deg, #ef476f, #e63946);
      color: white;
      box-shadow: 0 0 24px rgba(239, 71, 111, 0.3);
    `}
`;

/** 제목 */
export const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.textXl};
  font-weight: ${({ theme }) => theme.typography.fontBold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;

  ${media.mobile} {
    font-size: ${({ theme }) => theme.typography.textLg};
  }
`;

/** 메시지 */
export const Message = styled.p`
  font-size: ${({ theme }) => theme.typography.textBase};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
  line-height: ${({ theme }) => theme.typography.leadingRelaxed};
`;

/** 결제 결과 상세 정보 */
export const Details = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.lg};
  /* 상세 정보 bg — primaryLight 토큰으로 대체 */
  background: ${({ theme }) => theme.colors.primaryLight};
  border-radius: ${({ theme }) => theme.radius.md};
`;

/** 상세 항목 */
export const Detail = styled.p`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
`;

/** 상세 라벨 */
export const DetailLabel = styled.span`
  font-size: ${({ theme }) => theme.typography.textSm};
  color: ${({ theme }) => theme.colors.textMuted};
`;

/** 상세 값 */
export const DetailValue = styled.span`
  font-size: ${({ theme }) => theme.typography.textBase};
  font-weight: ${({ theme }) => theme.typography.fontSemibold};
  color: ${({ theme }) => theme.colors.textPrimary};

  ${({ $highlight, theme }) =>
    $highlight &&
    css`
      color: ${theme.colors.primary};
      font-size: ${theme.typography.textLg};
    `}
`;

/** 디버그 정보 */
export const Debug = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  background: rgba(255, 255, 255, 0.03);
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
`;

/** 디버그 항목 */
export const DebugItem = styled.p`
  font-size: ${({ theme }) => theme.typography.textXs};
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0;
  font-family: ${({ theme }) => theme.typography.fontMono};

  & + & {
    margin-top: ${({ theme }) => theme.spacing.xs};
  }

  span {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

/** 버튼 영역 */
export const Actions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;

  ${media.mobile} {
    flex-direction: column;
  }
`;

/** 버튼 기본 */
export const Btn = styled.button`
  flex: 1;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  border-radius: ${({ theme }) => theme.radius.lg};
  font-size: ${({ theme }) => theme.typography.textSm};
  font-weight: ${({ theme }) => theme.typography.fontSemibold};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
`;

/** Primary 버튼 — gradient */
export const BtnPrimary = styled(Btn)`
  background: ${({ theme }) => theme.gradients.primary};
  border: none;
  color: white;

  &:hover {
    box-shadow: ${({ theme }) => theme.glows.primary};
    transform: translateY(-1px);
  }
`;

/** Secondary 버튼 — outline */
export const BtnSecondary = styled(Btn)`
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.borderDefault};
  color: ${({ theme }) => theme.colors.textSecondary};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
`;
