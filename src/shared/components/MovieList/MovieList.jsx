/**
 * 영화 목록 그리드 컴포넌트.
 *
 * 영화 카드들을 반응형 그리드로 배치한다.
 * 각 카드는 포스터, 제목, 평점, 장르 정보를 표시하며,
 * 클릭 시 영화 상세 페이지로 이동한다.
 *
 * 개선 사항:
 * - 로딩 중 Skeleton 카드 6개 표시
 * - 포스터 없는 영화: 이모지 + "포스터 없음" 텍스트 개선
 * - 카드 호버 시 "자세히 보기" 오버레이
 * - 빈 상태에 EmptyState 컴포넌트 적용
 *
 * @param {Object} props
 * @param {Array} props.movies - 영화 객체 배열
 * @param {string} [props.title] - 섹션 제목 (선택)
 * @param {boolean} [props.loading=false] - 로딩 상태
 */

import { Link } from 'react-router-dom';
/* 라우트 경로 상수 + 경로 빌더 — shared/constants에서 가져옴 */
import { buildPath, ROUTES } from '../../constants/routes';
/* 포맷팅 유틸 — shared/utils에서 가져옴 */
import { formatRating, truncateText, genreMapper } from '../../utils/formatters';
/* 스켈레톤 로더 — shared/components에서 가져옴 */
import Skeleton from '../Skeleton/Skeleton';
/* 빈 상태 컴포넌트 — shared/components에서 가져옴 */
import EmptyState from '../EmptyState/EmptyState';
import './MovieList.css';

export default function MovieList({ movies = [], title, loading = false }) {
  // 로딩 중 — Skeleton 카드 6개 표시
  if (loading) {
    return (
      <section className="movie-list">
        {title && <h2 className="movie-list__title">{title}</h2>}
        <div className="movie-list__grid">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <Skeleton key={n} variant="card" />
          ))}
        </div>
      </section>
    );
  }

  // 영화 데이터가 없을 때 — EmptyState 컴포넌트
  if (!movies || movies.length === 0) {
    return (
      <EmptyState
        icon="🎬"
        title="표시할 영화가 없습니다"
        description="다른 조건으로 검색해보세요"
      />
    );
  }

  return (
    <section className="movie-list">
      {/* 섹션 제목 (옵션) */}
      {title && <h2 className="movie-list__title">{title}</h2>}

      {/* 영화 카드 그리드 */}
      <div className="movie-list__grid">
        {movies.map((movie) => (
          <Link
            key={movie.id}
            to={buildPath(ROUTES.MOVIE_DETAIL, { id: movie.id })}
            className="movie-list__card"
          >
            {/* 포스터 이미지 */}
            <div className="movie-list__poster">
              {movie.poster_path || movie.posterUrl ? (
                <img
                  src={movie.poster_path || movie.posterUrl}
                  alt={`${movie.title || movie.title_ko} 포스터`}
                  className="movie-list__poster-img"
                  loading="lazy"
                />
              ) : (
                /* 포스터 없을 때 — 이모지 + 텍스트 개선 */
                <div className="movie-list__poster-placeholder">
                  <span className="movie-list__poster-placeholder-icon">🎬</span>
                  <span className="movie-list__poster-placeholder-text">포스터 없음</span>
                </div>
              )}

              {/* 평점 배지 (평점이 있을 때만 표시) */}
              {movie.rating > 0 && (
                <span className="movie-list__rating-badge">
                  {formatRating(movie.rating)}
                </span>
              )}

              {/* 호버 시 오버레이 — "자세히 보기" */}
              <div className="movie-list__overlay">
                <span className="movie-list__overlay-text">자세히 보기</span>
              </div>
            </div>

            {/* 영화 정보 */}
            <div className="movie-list__info">
              <h3 className="movie-list__name">
                {truncateText(movie.title || movie.title_ko, 20)}
              </h3>

              {/* 장르 태그 (최대 2개) */}
              {movie.genres && movie.genres.length > 0 && (
                <div className="movie-list__genres">
                  {movie.genres.slice(0, 2).map((genre) => (
                    <span key={typeof genre === 'string' ? genre : (genre.name || genre.id)} className="movie-list__genre-tag">
                      {genreMapper(genre)}
                    </span>
                  ))}
                </div>
              )}

              {/* 개봉 연도 */}
              {movie.release_date && (
                <span className="movie-list__year">
                  {new Date(movie.release_date).getFullYear()}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
