/**
 * 업적/도장깨기 페이지.
 *
 * 두 개의 탭으로 구성:
 * - 업적: 카테고리별 업적 카드 + 진행률 바
 * - 도장깨기: 영화 시청 미션 + 도장 UI
 *
 * @module features/achievement/pages/AchievementPage
 */

import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { buildPath, ROUTES } from '../../../shared/constants/routes';
import { getAchievements, getStampRallies } from '../api/achievementApi';
import * as S from './AchievementPage.styled';

/** 탭 정의 */
const TABS = [
  { key: 'achievement', label: '업적' },
  { key: 'stamp', label: '도장깨기' },
];

/** 업적 카테고리 */
const CATEGORIES = [
  { key: '', label: '전체' },
  { key: 'VIEWING', label: '시청' },
  { key: 'SOCIAL', label: '소셜' },
  { key: 'COLLECTION', label: '컬렉션' },
  { key: 'CHALLENGE', label: '도전' },
];

/** 카테고리별 기본 아이콘 */
const CATEGORY_ICONS = {
  VIEWING: '&#x1F3AC;',
  SOCIAL: '&#x1F91D;',
  COLLECTION: '&#x1F4DA;',
  CHALLENGE: '&#x1F3C6;',
};

export default function AchievementPage() {
  const navigate = useNavigate();

  /* 탭 상태 */
  const [activeTab, setActiveTab] = useState('achievement');
  /* 카테고리 필터 */
  const [selectedCategory, setSelectedCategory] = useState('');

  /* 업적 데이터 */
  const [achievements, setAchievements] = useState([]);
  const [isLoadingAchievements, setIsLoadingAchievements] = useState(true);

  /* 도장깨기 데이터 */
  const [stampRallies, setStampRallies] = useState([]);
  const [isLoadingStamps, setIsLoadingStamps] = useState(true);

  /**
   * 업적 목록 로드.
   */
  const loadAchievements = useCallback(async () => {
    setIsLoadingAchievements(true);
    try {
      const data = await getAchievements({
        category: selectedCategory || undefined,
      });
      setAchievements(Array.isArray(data) ? data : data?.content || []);
    } catch (err) {
      console.error('[Achievement] 로드 실패:', err.message);
      setAchievements([]);
    } finally {
      setIsLoadingAchievements(false);
    }
  }, [selectedCategory]);

  /**
   * 도장깨기 목록 로드.
   */
  const loadStampRallies = useCallback(async () => {
    setIsLoadingStamps(true);
    try {
      const data = await getStampRallies();
      setStampRallies(Array.isArray(data) ? data : data?.content || []);
    } catch (err) {
      console.error('[StampRally] 로드 실패:', err.message);
      setStampRallies([]);
    } finally {
      setIsLoadingStamps(false);
    }
  }, []);

  /* 탭/카테고리 변경 시 데이터 로드 */
  useEffect(() => {
    if (activeTab === 'achievement') {
      loadAchievements();
    } else {
      loadStampRallies();
    }
  }, [activeTab, loadAchievements, loadStampRallies]);

  /* 업적 통계 계산 */
  const totalAchievements = achievements.length;
  const achievedCount = achievements.filter((a) => a.achieved).length;
  const totalProgress = totalAchievements > 0
    ? Math.round((achievedCount / totalAchievements) * 100)
    : 0;

  return (
    <S.Container>
      <S.PageTitle>업적 &amp; 도장깨기</S.PageTitle>

      {/* 요약 통계 */}
      <S.StatsBar>
        <S.StatItem>
          <S.StatValue>{achievedCount}</S.StatValue>
          <S.StatLabel>달성한 업적</S.StatLabel>
        </S.StatItem>
        <S.StatItem>
          <S.StatValue>{totalAchievements}</S.StatValue>
          <S.StatLabel>전체 업적</S.StatLabel>
        </S.StatItem>
        <S.StatItem>
          <S.StatValue>{totalProgress}%</S.StatValue>
          <S.StatLabel>달성률</S.StatLabel>
        </S.StatItem>
      </S.StatsBar>

      {/* 탭 */}
      <S.Tabs>
        {TABS.map((tab) => (
          <S.Tab
            key={tab.key}
            $active={activeTab === tab.key}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </S.Tab>
        ))}
      </S.Tabs>

      {/* ── 업적 탭 ── */}
      {activeTab === 'achievement' && (
        <>
          {/* 카테고리 필터 */}
          <S.CategoryFilters>
            {CATEGORIES.map((cat) => (
              <S.CategoryBtn
                key={cat.key}
                $active={selectedCategory === cat.key}
                onClick={() => setSelectedCategory(cat.key)}
              >
                {cat.label}
              </S.CategoryBtn>
            ))}
          </S.CategoryFilters>

          {/* 로딩 */}
          {isLoadingAchievements && (
            <S.AchievementGrid>
              {[1, 2, 3, 4].map((i) => (
                <S.SkeletonCard key={i} $h={100} />
              ))}
            </S.AchievementGrid>
          )}

          {/* 업적 그리드 */}
          {!isLoadingAchievements && achievements.length > 0 && (
            <S.AchievementGrid>
              {achievements.map((ach) => {
                const progress = ach.progress || 0;
                const maxProgress = ach.maxProgress || 1;
                const percent = Math.round((progress / maxProgress) * 100);

                return (
                  <S.AchievementCard key={ach.id} $achieved={ach.achieved}>
                    <S.AchievementIcon
                      dangerouslySetInnerHTML={{
                        __html: ach.iconUrl || CATEGORY_ICONS[ach.category] || '&#x1F3C5;',
                      }}
                    />
                    <S.AchievementInfo>
                      <S.AchievementName>
                        {ach.name}
                        {ach.achieved && (
                          <S.AchievedBadge> ✓ 달성</S.AchievedBadge>
                        )}
                      </S.AchievementName>
                      <S.AchievementDesc>{ach.description}</S.AchievementDesc>
                      <S.ProgressBarOuter>
                        <S.ProgressBarInner
                          $percent={percent}
                          $complete={ach.achieved}
                        />
                      </S.ProgressBarOuter>
                      <S.ProgressText>
                        {progress} / {maxProgress}
                      </S.ProgressText>
                    </S.AchievementInfo>
                  </S.AchievementCard>
                );
              })}
            </S.AchievementGrid>
          )}

          {/* 빈 상태 */}
          {!isLoadingAchievements && achievements.length === 0 && (
            <S.EmptyState>
              <S.EmptyIcon>&#x1F3C6;</S.EmptyIcon>
              <S.EmptyText>
                아직 업적이 없어요.
                <br />
                영화를 시청하고 활동하면 업적을 달성할 수 있어요!
              </S.EmptyText>
            </S.EmptyState>
          )}
        </>
      )}

      {/* ── 도장깨기 탭 ── */}
      {activeTab === 'stamp' && (
        <>
          {/* 로딩 */}
          {isLoadingStamps && (
            <S.StampList>
              {[1, 2].map((i) => (
                <S.SkeletonCard key={i} $h={160} />
              ))}
            </S.StampList>
          )}

          {/* 도장깨기 목록 */}
          {!isLoadingStamps && stampRallies.length > 0 && (
            <S.StampList>
              {stampRallies.map((rally) => {
                const movies = rally.movies || [];
                const completedIds = new Set(
                  (rally.completedMovies || []).map((m) => m.movieId || m.id || m),
                );

                return (
                  <S.StampCard key={rally.id}>
                    <S.StampHeader>
                      <S.StampTitle>{rally.name}</S.StampTitle>
                      <S.StampReward>
                        {rally.reward ? `${rally.reward}P 보상` : ''}
                      </S.StampReward>
                    </S.StampHeader>
                    {rally.description && (
                      <S.StampDesc>{rally.description}</S.StampDesc>
                    )}
                    <div>
                      <S.ProgressBarOuter>
                        <S.ProgressBarInner
                          $percent={
                            movies.length > 0
                              ? (completedIds.size / movies.length) * 100
                              : 0
                          }
                          $complete={completedIds.size === movies.length && movies.length > 0}
                        />
                      </S.ProgressBarOuter>
                      <S.ProgressText>
                        {completedIds.size} / {movies.length}편 완료
                      </S.ProgressText>
                    </div>
                    <S.StampGrid>
                      {movies.map((movie) => {
                        const mid = movie.movieId || movie.id;
                        const isCompleted = completedIds.has(mid);
                        return (
                          <div key={mid} style={{ textAlign: 'center' }}>
                            <S.Stamp
                              $completed={isCompleted}
                              onClick={() => navigate(buildPath(ROUTES.MOVIE_DETAIL, { id: mid }))}
                              title={movie.title}
                            >
                              {isCompleted ? '✓' : '🎬'}
                              {isCompleted && <S.StampCheck>✓</S.StampCheck>}
                            </S.Stamp>
                            <S.StampLabel>{movie.title || ''}</S.StampLabel>
                          </div>
                        );
                      })}
                    </S.StampGrid>
                  </S.StampCard>
                );
              })}
            </S.StampList>
          )}

          {/* 빈 상태 */}
          {!isLoadingStamps && stampRallies.length === 0 && (
            <S.EmptyState>
              <S.EmptyIcon>&#x1F4E6;</S.EmptyIcon>
              <S.EmptyText>
                아직 도장깨기 미션이 없어요.
                <br />
                곧 새로운 미션이 추가될 예정이에요!
              </S.EmptyText>
            </S.EmptyState>
          )}
        </>
      )}
    </S.Container>
  );
}
