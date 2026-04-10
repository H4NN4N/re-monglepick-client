/**
 * RewardToast 전역 Provider + useRewardToast 훅.
 *
 * 리워드 획득 시 화면 상단에 포인트 알림 토스트를 표시한다.
 * ModalProvider와 동일하게 Context 기반으로 앱 어디서나 호출 가능.
 *
 * 사용법:
 *   const { showReward } = useRewardToast();
 *   showReward(10, '리뷰 작성');  // "+10P 리뷰 작성 리워드"
 */

/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback, useRef } from 'react';
import * as S from './RewardToast.styled';

/** 토스트 자동 닫힘 시간 (ms) */
const AUTO_CLOSE_MS = 3000;
/** 퇴장 애니메이션 시간 (ms) */
const LEAVE_ANIM_MS = 400;

const RewardToastContext = createContext(null);

/**
 * RewardToastProvider — 토스트 큐 관리 + 렌더링.
 *
 * 여러 리워드가 동시에 발생하면 큐에 쌓여 순차적으로 표시된다.
 */
export function RewardToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  /**
   * 리워드 토스트를 표시한다.
   *
   * @param {number} points   - 획득 포인트 (0 이하이면 표시하지 않음)
   * @param {string} [label]  - 활동 이름 (예: '리뷰 작성')
   */
  const showReward = useCallback((points, label) => {
    if (!points || points <= 0) return;

    const id = ++idRef.current;
    const toast = { id, points, label, leaving: false };

    setToasts((prev) => [...prev, toast]);

    /* AUTO_CLOSE_MS 후 퇴장 애니메이션 시작 */
    setTimeout(() => {
      setToasts((prev) =>
        prev.map((t) => (t.id === id ? { ...t, leaving: true } : t))
      );
      /* 애니메이션 완료 후 DOM에서 제거 */
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, LEAVE_ANIM_MS);
    }, AUTO_CLOSE_MS);
  }, []);

  return (
    <RewardToastContext.Provider value={{ showReward }}>
      {children}

      {/* 토스트 렌더링 영역 */}
      {toasts.length > 0 && (
        <S.ToastContainer>
          {toasts.map((t) => (
            <S.Toast key={t.id} $leaving={t.leaving}>
              <S.PointBadge>+{t.points}P</S.PointBadge>
              <S.Message>
                {t.label ? `${t.label} 리워드 획득!` : '리워드 획득!'}
              </S.Message>
            </S.Toast>
          ))}
        </S.ToastContainer>
      )}
    </RewardToastContext.Provider>
  );
}

/**
 * useRewardToast — 리워드 토스트 호출 훅.
 *
 * RewardToastProvider 내부에서만 사용 가능하다.
 *
 * @returns {{ showReward: (points: number, label?: string) => void }}
 */
export function useRewardToast() {
  const context = useContext(RewardToastContext);
  if (!context) {
    throw new Error('useRewardToast는 RewardToastProvider 내부에서만 사용할 수 있습니다.');
  }
  return context;
}
