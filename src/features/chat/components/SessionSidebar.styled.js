/**
 * SessionSidebar styled-components 정의.
 *
 * 좌측에서 슬라이드인하는 채팅 이력 사이드바.
 * 오버레이 배경 + 패널 구조.
 */

import styled, { keyframes } from 'styled-components';

/** 패널 슬라이드인 애니메이션 */
const slideIn = keyframes`
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
`;

/** 오버레이 페이드인 */
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

/** 오버레이 배경 (클릭 시 사이드바 닫기) */
export const SidebarOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.4);
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  animation: ${fadeIn} 0.2s ease-out;
`;

/** 사이드바 패널 */
export const SidebarPanel = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 320px;
  max-width: 85vw;
  z-index: 1001;
  background: var(--bg-primary, #fff);
  display: flex;
  flex-direction: column;
  box-shadow: 4px 0 24px rgba(0, 0, 0, 0.15);
  animation: ${slideIn} 0.25s ease-out;
`;

/** 사이드바 헤더 */
export const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-primary, #e5e7eb);
  flex-shrink: 0;
`;

/** 제목 */
export const SidebarTitle = styled.h2`
  font-size: 16px;
  font-weight: 700;
  color: var(--text-primary, #1f2937);
  margin: 0;
`;

/** 새 대화 버튼 */
export const NewChatBtn = styled.button`
  padding: 6px 14px;
  border-radius: 8px;
  border: 1px solid var(--accent-primary, #6366f1);
  background: transparent;
  color: var(--accent-primary, #6366f1);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background: var(--accent-primary, #6366f1);
    color: #fff;
  }
`;

/** 닫기 버튼 */
export const CloseBtn = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: none;
  background: transparent;
  color: var(--text-secondary, #6b7280);
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;

  &:hover {
    background: var(--bg-secondary, #f3f4f6);
  }
`;

/** 세션 목록 스크롤 영역 */
export const SessionList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 8px 0;
`;

/** 세션 목록 항목 */
export const SessionItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  cursor: pointer;
  transition: background 0.15s;
  position: relative;
  gap: 12px;

  &:hover {
    background: var(--bg-secondary, #f3f4f6);
  }

  /* 활성 세션 강조 */
  ${({ $isActive }) =>
    $isActive &&
    `
    background: var(--bg-tertiary, #ede9fe);
    border-right: 3px solid var(--accent-primary, #6366f1);
  `}
`;

/** 세션 정보 영역 */
export const SessionInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

/** 세션 제목 */
export const SessionTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary, #1f2937);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

/** 세션 메타 정보 (턴 수 + 시간) */
export const SessionMeta = styled.div`
  font-size: 12px;
  color: var(--text-tertiary, #9ca3af);
  margin-top: 2px;
`;

/** 삭제 버튼 */
export const DeleteBtn = styled.button`
  width: 28px;
  height: 28px;
  border-radius: 6px;
  border: none;
  background: transparent;
  color: var(--text-tertiary, #9ca3af);
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.15s;
  flex-shrink: 0;

  ${SessionItem}:hover & {
    opacity: 1;
  }

  &:hover {
    background: var(--danger-bg, #fef2f2);
    color: var(--danger-text, #ef4444);
  }
`;

/** 더 보기 버튼 */
export const LoadMoreBtn = styled.button`
  display: block;
  width: calc(100% - 40px);
  margin: 8px 20px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid var(--border-primary, #e5e7eb);
  background: transparent;
  color: var(--text-secondary, #6b7280);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background: var(--bg-secondary, #f3f4f6);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

/** 빈 상태 */
export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 20px;
  color: var(--text-tertiary, #9ca3af);
  text-align: center;
`;

/** 빈 상태 아이콘 */
export const EmptyIcon = styled.div`
  font-size: 40px;
  margin-bottom: 12px;
  opacity: 0.5;
`;

/** 빈 상태 텍스트 */
export const EmptyText = styled.div`
  font-size: 14px;
  line-height: 1.5;
`;
