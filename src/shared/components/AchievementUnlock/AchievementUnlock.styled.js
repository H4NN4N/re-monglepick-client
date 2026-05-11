import styled, { keyframes } from 'styled-components';
import { media } from '../../styles/media';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const popIn = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.94);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndex.modalBackdrop};
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(4px);
  animation: ${fadeIn} 180ms ease forwards;
`;

export const Dialog = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: ${({ theme }) => theme.zIndex.modal};
  width: min(92vw, 420px);
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.radius.xl};
  background: ${({ theme }) => theme.glass.bg};
  border: 1px solid ${({ theme }) => theme.glass.border};
  box-shadow: ${({ theme }) => theme.shadows.xl}, ${({ theme }) => theme.shadows.glow};
  backdrop-filter: ${({ theme }) => theme.glass.blur};
  text-align: center;
  animation: ${popIn} 220ms ease forwards;

  ${media.mobile} {
    padding: ${({ theme }) => `${theme.spacing.lg} ${theme.spacing.md}`};
  }
`;

export const Eyebrow = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.textSm};
  font-weight: ${({ theme }) => theme.typography.fontBold};
`;

export const IconBox = styled.div`
  width: 76px;
  height: 76px;
  margin: 0 auto ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.primaryLight};
  box-shadow: 0 0 28px ${({ theme }) => theme.colors.primary}44;
  font-size: 34px;
`;

export const IconImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Title = styled.h3`
  margin: 0 0 ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.textXl || theme.typography.textLg};
  font-weight: ${({ theme }) => theme.typography.fontBold};
  line-height: ${({ theme }) => theme.typography.leadingTight};
`;

export const Description = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.textSm};
  line-height: ${({ theme }) => theme.typography.leadingRelaxed};
  white-space: pre-line;
  word-break: keep-all;
`;

export const Reward = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.colors.successBg};
  color: ${({ theme }) => theme.colors.success};
  font-size: ${({ theme }) => theme.typography.textSm};
  font-weight: ${({ theme }) => theme.typography.fontBold};
`;

export const Button = styled.button`
  width: 100%;
  min-height: 44px;
  margin-top: ${({ theme }) => theme.spacing.lg};
  border: 0;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.gradients.primary};
  color: white;
  font-size: ${({ theme }) => theme.typography.textSm};
  font-weight: ${({ theme }) => theme.typography.fontSemibold};
  cursor: pointer;
  transition: transform ${({ theme }) => theme.transitions.fast};

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.glows.primary};
  }
`;
