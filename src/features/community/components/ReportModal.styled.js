import styled, { css, keyframes } from 'styled-components';
import { media } from '../../../shared/styles/media';

const backdropFadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const backdropFadeOut = keyframes`
  from { opacity: 1; }
  to   { opacity: 0; }
`;

const scaleIn = keyframes`
  from { opacity: 0; transform: translate(-50%, -50%) scale(0.92); }
  to   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
`;

const scaleOut = keyframes`
  from { opacity: 1; transform: translate(-50%, -50%) scale(1); }
  to   { opacity: 0; transform: translate(-50%, -50%) scale(0.92); }
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndex.modalBackdrop};
  background: rgba(0, 0, 0, 0.65);
  animation: ${({ $closing }) => ($closing ? backdropFadeOut : backdropFadeIn)}
    ${({ $closing }) => ($closing ? '200ms' : '250ms')} ease forwards;
`;

export const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: ${({ theme }) => theme.zIndex.modal};
  width: 90%;
  max-width: 460px;
  padding: ${({ theme }) => `${theme.spacing.xl} ${theme.spacing.lg}`};
  border-radius: ${({ theme }) => theme.radius.xl};
  background: ${({ theme }) => theme.glass.bg};
  backdrop-filter: ${({ theme }) => theme.glass.blur};
  -webkit-backdrop-filter: ${({ theme }) => theme.glass.blur};
  border: 1px solid ${({ theme }) => theme.glass.border};
  box-shadow:
    ${({ theme }) => theme.shadows.xl},
    ${({ theme }) => theme.shadows.glow};
  animation: ${({ $closing }) => ($closing ? css`${scaleOut}` : css`${scaleIn}`)}
    ${({ $closing }) => ($closing ? '200ms' : '300ms')} ease forwards;

  ${media.mobile} {
    width: 95%;
    padding: ${({ theme }) => `${theme.spacing.lg} ${theme.spacing.md}`};
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const IconArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.colors.errorBg};
  font-size: 22px;
  flex-shrink: 0;
`;

export const Title = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.textLg};
  font-weight: ${({ theme }) => theme.typography.fontBold};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const ReasonList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const ReasonItem = styled.label`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ $selected, theme }) =>
    $selected ? theme.colors.primary : theme.colors.borderDefault};
  background: ${({ $selected, theme }) =>
    $selected ? theme.colors.primaryLight : 'transparent'};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  font-size: ${({ theme }) => theme.typography.textSm};
  color: ${({ $selected, theme }) =>
    $selected ? theme.colors.primary : theme.colors.textPrimary};

  input[type='radio'] {
    accent-color: ${({ theme }) => theme.colors.primary};
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const DetailTextarea = styled.textarea`
  width: 100%;
  min-height: 80px;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.borderDefault};
  background: ${({ theme }) => theme.colors.bgElevated};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.textSm};
  resize: vertical;
  box-sizing: border-box;
  font-family: inherit;
  transition: border-color ${({ theme }) => theme.transitions.fast};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const CancelButton = styled.button`
  flex: 1;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: ${({ theme }) => theme.typography.textSm};
  font-weight: ${({ theme }) => theme.typography.fontSemibold};
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.colors.borderDefault};
  background: ${({ theme }) => theme.colors.bgElevated};
  color: ${({ theme }) => theme.colors.textSecondary};
  min-height: 42px;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.bgTertiary};
    color: ${({ theme }) => theme.colors.textPrimary};
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:active { transform: scale(0.97); }
`;

export const SubmitButton = styled.button`
  flex: 1;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: ${({ theme }) => theme.typography.textSm};
  font-weight: ${({ theme }) => theme.typography.fontSemibold};
  cursor: pointer;
  border: none;
  background: ${({ theme }) => theme.gradients.primary};
  color: white;
  min-height: 42px;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover:not(:disabled) {
    box-shadow: ${({ theme }) => theme.glows.primary};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:active:not(:disabled) { transform: scale(0.97); }
`;
