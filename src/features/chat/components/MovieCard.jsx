/**
 * 영화 추천 카드 컴포넌트.
 *
 * 백엔드 movie_card SSE 이벤트로 수신한 RankedMovie 데이터를
 * 시각적인 카드로 렌더링한다.
 *
 * 표시 정보:
 * - 포스터 이미지 (TMDB poster_path 기반)
 * - 제목 (한국어/영어)
 * - 장르 태그, 무드 태그
 * - 평점, 개봉연도, 관람등급
 * - 추천 이유 (explanation)
 * - 트레일러 (YouTube embed 모달)
 * - OTT 플랫폼
 */

import { useState, useCallback } from 'react';

/* 영화 카드 전용 CSS — CSS 변수 의존 없이 색상 직접 지정 */
import './MovieCard.css';

/**
 * TMDB 포스터 이미지 URL 생성.
 * poster_path가 없으면 플레이스홀더 반환.
 *
 * @param {string|null} posterPath - TMDB poster_path (/xxx.jpg)
 * @param {string} size - TMDB 이미지 사이즈 (w185, w342, w500 등)
 * @returns {string} 이미지 URL
 */
function getPosterUrl(posterPath, size = 'w342') {
  if (!posterPath) {
    return `https://placehold.co/342x513/1a1a2e/666?text=No+Poster`;
  }
  return `https://image.tmdb.org/t/p/${size}${posterPath}`;
}

/**
 * YouTube URL에서 영상 ID를 추출하여 embed URL을 반환한다.
 * 지원하는 URL 형식:
 *   - https://www.youtube.com/watch?v=VIDEO_ID
 *   - https://youtu.be/VIDEO_ID
 *   - https://www.youtube.com/embed/VIDEO_ID
 *
 * YouTube URL이 아니면 null을 반환한다.
 *
 * @param {string} url - 트레일러 URL
 * @returns {string|null} YouTube embed URL 또는 null
 */
function getYouTubeEmbedUrl(url) {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    let videoId = null;

    /* youtube.com/watch?v=xxx */
    if (parsed.hostname.includes('youtube.com') && parsed.searchParams.get('v')) {
      videoId = parsed.searchParams.get('v');
    }
    /* youtu.be/xxx */
    else if (parsed.hostname === 'youtu.be') {
      videoId = parsed.pathname.slice(1);
    }
    /* youtube.com/embed/xxx */
    else if (parsed.hostname.includes('youtube.com') && parsed.pathname.startsWith('/embed/')) {
      videoId = parsed.pathname.split('/embed/')[1];
    }

    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    }
  } catch {
    /* URL 파싱 실패 시 무시 */
  }
  return null;
}

/**
 * 영화 추천 카드.
 *
 * @param {Object} props
 * @param {Object} props.movie - RankedMovie 데이터
 * @param {number} props.movie.rank - 추천 순위 (1부터 시작)
 * @param {string} props.movie.title - 한국어 제목
 * @param {string} [props.movie.title_en] - 영어 제목
 * @param {string[]} [props.movie.genres] - 장르 목록
 * @param {string} [props.movie.director] - 감독
 * @param {string[]} [props.movie.cast] - 출연진
 * @param {number} [props.movie.rating] - 평점 (0~10)
 * @param {number} [props.movie.release_year] - 개봉연도
 * @param {string} [props.movie.overview] - 줄거리
 * @param {string[]} [props.movie.mood_tags] - 무드 태그
 * @param {string} [props.movie.poster_path] - TMDB 포스터 경로
 * @param {string[]} [props.movie.ott_platforms] - OTT 플랫폼 목록
 * @param {string} [props.movie.certification] - 관람등급
 * @param {string} [props.movie.trailer_url] - 트레일러 URL
 * @param {string} [props.movie.explanation] - 추천 이유
 */
export default function MovieCard({ movie }) {
  const {
    rank,
    title,
    title_en,
    genres = [],
    director,
    cast = [],
    rating,
    release_year,
    overview,
    mood_tags = [],
    poster_path,
    ott_platforms = [],
    certification,
    trailer_url,
    explanation,
  } = movie;

  /* 트레일러 모달 표시 상태 */
  const [showTrailer, setShowTrailer] = useState(false);

  /* YouTube embed URL (YouTube가 아니면 null → 외부 링크 폴백) */
  const embedUrl = getYouTubeEmbedUrl(trailer_url);

  /**
   * 트레일러 모달 배경 클릭 시 닫기.
   * 이벤트 버블링으로 iframe 위 클릭은 전파되지 않으므로 자연스럽게 동작한다.
   */
  const handleOverlayClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      setShowTrailer(false);
    }
  }, []);

  return (
    <div className="movie-card">
      {/* 순위 배지 */}
      {rank && <span className="movie-card__rank">#{rank}</span>}

      {/* 포스터 이미지 */}
      <div className="movie-card__poster">
        <img
          src={getPosterUrl(poster_path)}
          alt={`${title} 포스터`}
          loading="lazy"
        />
      </div>

      {/* 카드 정보 영역 */}
      <div className="movie-card__info">
        {/* 제목 */}
        <h3 className="movie-card__title">{title}</h3>
        {title_en && <p className="movie-card__title-en">{title_en}</p>}

        {/* 메타 정보 (연도, 평점, 관람등급) */}
        <div className="movie-card__meta">
          {release_year && <span>{release_year}</span>}
          {rating != null && <span>★ {rating.toFixed(1)}</span>}
          {certification && <span>{certification}</span>}
        </div>

        {/* 감독 · 출연 */}
        {director && (
          <p className="movie-card__crew">
            감독: {director}
            {cast.length > 0 && ` | 출연: ${cast.slice(0, 3).join(', ')}`}
          </p>
        )}

        {/* 장르 태그 */}
        {genres.length > 0 && (
          <div className="movie-card__tags">
            {genres.map((g) => (
              <span key={g} className="movie-card__tag movie-card__tag--genre">
                {g}
              </span>
            ))}
          </div>
        )}

        {/* 무드 태그 */}
        {mood_tags.length > 0 && (
          <div className="movie-card__tags">
            {mood_tags.map((m) => (
              <span key={m} className="movie-card__tag movie-card__tag--mood">
                {m}
              </span>
            ))}
          </div>
        )}

        {/* 줄거리 (최대 100자) */}
        {overview && (
          <p className="movie-card__overview">
            {overview.length > 100 ? overview.slice(0, 100) + '...' : overview}
          </p>
        )}

        {/* 추천 이유 */}
        {explanation && (
          <p className="movie-card__explanation">{explanation}</p>
        )}

        {/* OTT 플랫폼 */}
        {ott_platforms.length > 0 && (
          <div className="movie-card__ott">
            {ott_platforms.map((p) => (
              <span key={p} className="movie-card__ott-badge">{p}</span>
            ))}
          </div>
        )}

        {/* 트레일러 버튼 — YouTube이면 모달, 아니면 외부 링크 */}
        {trailer_url && (
          embedUrl ? (
            <button
              type="button"
              className="movie-card__trailer"
              onClick={() => setShowTrailer(true)}
            >
              ▶ 트레일러 보기
            </button>
          ) : (
            <a
              href={trailer_url}
              target="_blank"
              rel="noopener noreferrer"
              className="movie-card__trailer"
            >
              ▶ 트레일러 보기
            </a>
          )
        )}
      </div>

      {/* YouTube 트레일러 모달 오버레이 */}
      {showTrailer && embedUrl && (
        <div className="trailer-modal" onClick={handleOverlayClick}>
          <div className="trailer-modal__content">
            {/* 닫기 버튼 */}
            <button
              type="button"
              className="trailer-modal__close"
              onClick={() => setShowTrailer(false)}
            >
              ✕
            </button>
            {/* 영화 제목 */}
            <p className="trailer-modal__title">{title} 트레일러</p>
            {/* YouTube iframe */}
            <div className="trailer-modal__player">
              <iframe
                src={embedUrl}
                title={`${title} 트레일러`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
