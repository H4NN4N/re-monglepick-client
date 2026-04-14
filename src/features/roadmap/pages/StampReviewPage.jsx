/**
 * 도장깨기 리뷰 작성 페이지 (placeholder).
 *
 * PR #79 (ministar99) 가 App.jsx 에 라우트 + import 만 추가했으나 실제 파일이
 * 누락되어 Vite 빌드 실패(Could not resolve ...StampReviewPage)를 유발했다.
 * 빌드 복구를 위해 최소 placeholder 페이지를 임시로 제공한다.
 *
 * 흐름 (본격 구현 시):
 *   1. URL 파라미터 courseId + movieId 로 컨텍스트 확정
 *   2. 리뷰 본문 입력 + 별점
 *   3. 제출 시 `completeMovie(courseId, movieId, { text, rating })` 호출
 *   4. Agent `/admin/ai/review-verification/verify` 와 후속 연동
 *
 * 현재는 다른 방식(PostWatchFeedback 모달)으로도 리뷰 작성이 가능하므로 UX 차단은 없음.
 *
 * @module features/roadmap/pages/StampReviewPage
 */

import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { completeMovie } from '../api/roadmapApi';

export default function StampReviewPage() {
  const { courseId, movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const movieTitle = location.state?.movieTitle ?? '선택 영화';
  const courseTitle = location.state?.courseTitle ?? '도장깨기 코스';

  const [reviewText, setReviewText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!reviewText.trim()) {
      setError('리뷰 내용을 입력해주세요.');
      return;
    }
    setIsSubmitting(true);
    setError(null);
    try {
      await completeMovie(courseId, movieId, { reviewText });
      // 성공 시 코스 상세로 복귀
      navigate(`/stamp/${courseId}`, { replace: true });
    } catch (e2) {
      setError(e2.message || '리뷰 저장에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section style={{ padding: '2rem', maxWidth: 720, margin: '0 auto' }}>
      <button
        type="button"
        onClick={() => navigate(-1)}
        style={{ marginBottom: '1rem', padding: '0.5rem 1rem', cursor: 'pointer' }}
      >
        ← 이전
      </button>

      <h1 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>시청 인증 & 리뷰 작성</h1>
      <p style={{ color: '#666', marginBottom: '1rem' }}>
        {courseTitle} · {movieTitle}
      </p>

      <form onSubmit={handleSubmit}>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="영화를 본 감상을 자유롭게 적어주세요. (최소 10자)"
          rows={8}
          style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', resize: 'vertical' }}
          disabled={isSubmitting}
        />

        {error && <p style={{ color: '#d9534f', marginTop: '0.5rem' }}>{error}</p>}

        <button
          type="submit"
          disabled={isSubmitting || reviewText.length < 10}
          style={{
            marginTop: '1rem',
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            cursor: (isSubmitting || reviewText.length < 10) ? 'not-allowed' : 'pointer',
          }}
        >
          {isSubmitting ? '제출 중…' : '인증 제출'}
        </button>
      </form>

      <p style={{ marginTop: '2rem', color: '#888', fontSize: '0.9rem' }}>
        (이 화면은 빌드 복구를 위한 임시 placeholder 입니다. 본격 인증 UX·AI 리뷰 검증 연동은 후속 PR 예정.)
      </p>
    </section>
  );
}
