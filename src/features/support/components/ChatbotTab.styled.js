/**
 * ChatbotTab styled-components 정의.
 *
 * AI 고객센터 챗봇 UI: 메시지 영역 + 입력 + 매칭 FAQ 카드.
 */

import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
`;

const dotBounce = keyframes`
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
`;

/** 탭 컨테이너 */
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 500px;
  max-height: 60vh;
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.bgSecondary};
  border: 1px solid ${({ theme }) => theme.colors.borderDefault};
  overflow: hidden;
`;

/** 챗봇 헤더 */
export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderDefault};
  flex-shrink: 0;
`;

/** 봇 아바타 */
export const BotAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary}20;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
`;

/** 헤더 텍스트 */
export const HeaderText = styled.div`
  flex: 1;
`;

/** 봇 이름 */
export const BotName = styled.div`
  font-size: ${({ theme }) => theme.typography.textSm};
  font-weight: ${({ theme }) => theme.typography.fontSemibold};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

/** 봇 상태 */
export const BotStatus = styled.div`
  font-size: ${({ theme }) => theme.typography.textXs};
  color: ${({ theme }) => theme.colors.success};
`;

/** 메시지 영역 */
export const Messages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

/** 메시지 래퍼 (정렬: 사용자=오른쪽, 봇=왼쪽) */
export const MsgRow = styled.div`
  display: flex;
  justify-content: ${({ $isUser }) => ($isUser ? 'flex-end' : 'flex-start')};
  animation: ${fadeIn} 0.25s ease;
`;

/** 메시지 버블 */
export const MsgBubble = styled.div`
  max-width: 75%;
  padding: 10px 14px;
  border-radius: ${({ theme }) => theme.radius.lg};
  font-size: ${({ theme }) => theme.typography.textSm};
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-word;

  ${({ $isUser, theme }) =>
    $isUser
      ? `
        background: ${theme.colors.primary};
        color: #fff;
        border-bottom-right-radius: ${theme.radius.sm};
      `
      : `
        background: ${theme.colors.bgElevated};
        color: ${theme.colors.textPrimary};
        border: 1px solid ${theme.colors.borderDefault};
        border-bottom-left-radius: ${theme.radius.sm};
      `}
`;

/** 타이핑 인디케이터 */
export const TypingIndicator = styled.div`
  display: flex;
  gap: 4px;
  padding: 12px 14px;
  background: ${({ theme }) => theme.colors.bgElevated};
  border: 1px solid ${({ theme }) => theme.colors.borderDefault};
  border-radius: ${({ theme }) => theme.radius.lg};
  border-bottom-left-radius: ${({ theme }) => theme.radius.sm};
  max-width: 80px;
`;

/** 타이핑 점 */
export const TypingDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.textMuted};
  animation: ${dotBounce} 1.4s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay || '0s'};
`;

/** 매칭 FAQ 카드 목록 */
export const FaqMatches = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 8px;
`;

/** 매칭 FAQ 카드 */
export const FaqMatchCard = styled.button`
  display: block;
  width: 100%;
  text-align: left;
  padding: 8px 12px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.borderDefault};
  background: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.textXs};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  line-height: 1.4;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.primary}08;
  }
`;

/** 상담원 이관 배너 */
export const HumanAgentBanner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 14px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.warning}15;
  border: 1px solid ${({ theme }) => theme.colors.warning}40;
  margin-top: 8px;
  animation: ${fadeIn} 0.3s ease;
`;

/** 상담원 이관 텍스트 */
export const HumanAgentText = styled.span`
  font-size: ${({ theme }) => theme.typography.textXs};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

/** 상담원 연결 버튼 */
export const HumanAgentBtn = styled.button`
  padding: 6px 14px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: none;
  background: ${({ theme }) => theme.colors.warning};
  color: #fff;
  font-size: ${({ theme }) => theme.typography.textXs};
  font-weight: ${({ theme }) => theme.typography.fontSemibold};
  cursor: pointer;
  flex-shrink: 0;
  transition: opacity ${({ theme }) => theme.transitions.fast};

  &:hover { opacity: 0.85; }
`;

/** 입력 영역 */
export const InputArea = styled.div`
  display: flex;
  gap: 8px;
  padding: 12px 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.borderDefault};
  flex-shrink: 0;
  background: ${({ theme }) => theme.colors.bg};
`;

/** 입력 필드 */
export const Input = styled.input`
  flex: 1;
  padding: 10px 14px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.borderDefault};
  background: ${({ theme }) => theme.colors.bgSecondary};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.textSm};
  font-family: inherit;

  &::placeholder { color: ${({ theme }) => theme.colors.textMuted}; }
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

/** 전송 버튼 */
export const SendBtn = styled.button`
  padding: 10px 18px;
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

/** 환영 메시지 영역 */
export const WelcomeMsg = styled.div`
  text-align: center;
  padding: 20px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

/** 환영 아이콘 */
export const WelcomeIcon = styled.div`
  font-size: 36px;
  margin-bottom: 8px;
`;

/** 환영 텍스트 */
export const WelcomeText = styled.p`
  font-size: ${({ theme }) => theme.typography.textSm};
  line-height: 1.5;
  margin: 0;
`;

/** 추천 질문 칩 */
export const SuggestionChips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: center;
  margin-top: 12px;
`;

/** 추천 질문 버튼 */
export const SuggestionChip = styled.button`
  padding: 6px 12px;
  border-radius: ${({ theme }) => theme.radius.full};
  border: 1px solid ${({ theme }) => theme.colors.borderDefault};
  background: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.textXs};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
`;
