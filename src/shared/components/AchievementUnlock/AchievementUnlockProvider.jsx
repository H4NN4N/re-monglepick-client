/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import * as S from './AchievementUnlock.styled';

const AchievementUnlockContext = createContext(null);

function normalizeAchievements(achievements) {
  return (Array.isArray(achievements) ? achievements : [])
    .filter((achievement) => achievement && typeof achievement === 'object')
    .map((achievement) => ({
      achievementId: achievement.achievementId,
      code: achievement.code,
      name: achievement.name || '새 업적 달성',
      description: achievement.description ?? null,
      iconUrl: achievement.iconUrl ?? null,
      rewardPoints: achievement.rewardPoints ?? null,
    }));
}

export function AchievementUnlockProvider({ children }) {
  const [queue, setQueue] = useState([]);

  const showAchievements = useCallback((achievements) => {
    const normalized = normalizeAchievements(achievements);
    if (normalized.length === 0) return;
    setQueue((prev) => [...prev, ...normalized]);
  }, []);

  const currentAchievement = queue[0] || null;

  const handleClose = useCallback(() => {
    setQueue((prev) => prev.slice(1));
  }, []);

  const contextValue = useMemo(() => ({ showAchievements }), [showAchievements]);

  return (
    <AchievementUnlockContext.Provider value={contextValue}>
      {children}

      {currentAchievement && (
        <>
          <S.Overlay onClick={handleClose} />
          <S.Dialog role="dialog" aria-modal="true" aria-labelledby="achievement-unlock-title">
            <S.Eyebrow>업적 달성</S.Eyebrow>
            <S.IconBox aria-hidden="true">
              {currentAchievement.iconUrl ? (
                <S.IconImage src={currentAchievement.iconUrl} alt="" />
              ) : (
                '🏆'
              )}
            </S.IconBox>
            <S.Title id="achievement-unlock-title">{currentAchievement.name}</S.Title>
            {currentAchievement.description && (
              <S.Description>{currentAchievement.description}</S.Description>
            )}
            {currentAchievement.rewardPoints > 0 && (
              <S.Reward>+{currentAchievement.rewardPoints}P</S.Reward>
            )}
            <S.Button type="button" onClick={handleClose} autoFocus>
              확인
            </S.Button>
          </S.Dialog>
        </>
      )}
    </AchievementUnlockContext.Provider>
  );
}

export function useAchievementUnlock() {
  const context = useContext(AchievementUnlockContext);
  if (!context) {
    throw new Error('useAchievementUnlock은 AchievementUnlockProvider 내부에서만 사용할 수 있습니다.');
  }
  return context;
}
