/**
 * 업적 상세 페이지 (placeholder).
 *
 * PR #79 (ministar99) 가 App.jsx 에 라우트 + import 만 추가했으나 실제 파일이
 * 누락되어 Vite 빌드 실패(Could not resolve ...AchievementDetailPage)를 유발했다.
 * 빌드 복구를 위해 최소 placeholder 페이지를 임시로 제공한다.
 * 본격적인 상세 UI/UX 는 담당자가 후속 PR 로 구현한다.
 *
 * @module features/achievement/pages/AchievementDetailPage
 */

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAchievementDetail } from '../api/achievementApi';

export default function AchievementDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [detail, setDetail] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setIsLoading(true);
      try {
        const data = await getAchievementDetail(id);
        if (!cancelled) setDetail(data);
      } catch (e) {
        if (!cancelled) setError(e.message || '업적 상세를 불러오지 못했습니다.');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }
    if (id) load();
    return () => { cancelled = true; };
  }, [id]);

  return (
    <section style={{ padding: '2rem', maxWidth: 720, margin: '0 auto' }}>
      <button
        type="button"
        onClick={() => navigate(-1)}
        style={{ marginBottom: '1rem', padding: '0.5rem 1rem', cursor: 'pointer' }}
      >
        ← 이전
      </button>

      <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>업적 상세</h1>

      {isLoading && <p>로딩 중…</p>}
      {error && <p style={{ color: '#d9534f' }}>{error}</p>}
      {detail && (
        <div>
          <h2 style={{ fontSize: '1.2rem' }}>{detail.name ?? detail.title ?? `업적 #${id}`}</h2>
          {detail.description && <p>{detail.description}</p>}
          {/* 본격 UI/UX 는 후속 PR 에서 담당자가 구현 */}
          <p style={{ marginTop: '1.5rem', color: '#888', fontSize: '0.9rem' }}>
            (이 화면은 빌드 복구를 위한 임시 placeholder 입니다. 본격 상세 UI 는 후속 작업 예정.)
          </p>
        </div>
      )}
    </section>
  );
}
