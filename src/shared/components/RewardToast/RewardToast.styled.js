/**
 * RewardToast 스타일 — 리워드 획득 알림 토스트.
 *
 * 화면 상단 중앙에서 슬라이드 인/아웃되며,
 * 테마의 accent/primary 색상을 활용한다.
 */
import styled, { keyframes } from 'styled-components';

/** 슬라이드 인 + 페이드 인 */
const slideIn = keyframes`
  from {
    transform: translateY(-100%) translateX(-50%);
    opacity: 0;
  }
  to {
    transform: translateY(0) translateX(-50%);
    opacity: 1;
  }
`;

/** 슬라이드 아웃 + 페이드 아웃 */
const slideOut = keyframes`
  from {
    transform: translateY(0) translateX(-50%);
    opacity: 1;
  }
  to {
    transform: translateY(-100%) translateX(-50%);
    opacity: 0;
  }
`;

export const ToastContainer = styled.div`
  position: fixed;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: ${({ theme }) => theme.zIndex?.modal ? theme.zIndex.modal + 10 : 10010};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  pointer-events: none;
`;

export const Toast = styled.div`
  pointer-events: auto;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  border-radius: ${({ theme }) => theme.radius?.lg || '12px'};
  background: ${({ theme }) =>
    theme.mode === 'dark'
      ? 'linear-gradient(135deg, rgba(255, 183, 77, 0.15), rgba(255, 152, 0, 0.1))'
      : 'linear-gradient(135deg, rgba(255, 183, 77, 0.2), rgba(255, 152, 0, 0.12))'};
  border: 1px solid ${({ theme }) =>
    theme.mode === 'dark' ? 'rgba(255, 183, 77, 0.3)' : 'rgba(255, 152, 0, 0.3)'};
  backdrop-filter: blur(12px);
  box-shadow: 0 4px 20px rgba(255, 152, 0, 0.2);
  color: ${({ theme }) => theme.colors?.text || '#fff'};
  font-size: ${({ theme }) => theme.typography?.textSm || '0.875rem'};
  font-weight: ${({ theme }) => theme.typography?.fontSemibold || 600};
  min-width: 200px;
  max-width: 360px;

  animation: ${({ $leaving }) => ($leaving ? slideOut : slideIn)} 0.4s ease forwards;
`;

export const PointBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border-radius: ${({ theme }) => theme.radius?.full || '9999px'};
  background: ${({ theme }) =>
    theme.mode === 'dark'
      ? 'rgba(255, 183, 77, 0.25)'
      : 'rgba(255, 152, 0, 0.2)'};
  color: ${({ theme }) =>
    theme.mode === 'dark' ? '#ffb74d' : '#e65100'};
  font-weight: ${({ theme }) => theme.typography?.fontBold || 700};
  font-size: ${({ theme }) => theme.typography?.textSm || '0.875rem'};
  white-space: nowrap;
`;

export const Message = styled.span`
  flex: 1;
  line-height: 1.4;
`;
