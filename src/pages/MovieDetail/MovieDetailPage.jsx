/**
 * 영화 상세 페이지 컴포넌트.
 *
 * URL 파라미터에서 영화 ID를 추출하여 영화 상세 정보를 로드한다.
 * MovieDetailCard 컴포넌트로 영화 정보를 표시하고,
 * 위시리스트 토글, 리뷰 목록 등 부가 기능을 제공한다.
 */

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovie } from '../../api/movies';
import { getReviews } from '../../api/community';
import { toggleWishlist } from '../../api/mypage';
import { useAuth } from '../../context/AuthContext';
import MovieDetailCard from '../../components/Movie/MovieDetailCard';
import ReviewList from '../../components/Community/ReviewList';
import Loading from '../../components/Common/Loading';
import './MovieDetailPage.css';

export default function MovieDetailPage() {
  // URL 파라미터에서 영화 ID 추출
  const { id } = useParams();
  // 영화 상세 정보 상태
  const [movie, setMovie] = useState(null);
  // 리뷰 목록 상태
  const [reviews, setReviews] = useState([]);
  // 위시리스트 포함 여부
  const [isWishlisted, setIsWishlisted] = useState(false);
  // 로딩 상태
  const [isLoading, setIsLoading] = useState(true);
  // 에러 메시지
  const [error, setError] = useState(null);

  const { isAuthenticated } = useAuth();

  /**
   * 영화 상세 정보와 리뷰를 로드한다.
   */
  useEffect(() => {
    async function loadMovieData() {
      setIsLoading(true);
      setError(null);

      try {
        // 영화 상세 정보 조회
        const movieData = await getMovie(id);
        setMovie(movieData);

        // 위시리스트 상태 (영화 데이터에 포함된 경우)
        if (movieData.isWishlisted !== undefined) {
          setIsWishlisted(movieData.isWishlisted);
        }

        // 리뷰 목록 조회 (별도 API, 실패해도 영화 정보는 표시)
        try {
          const reviewData = await getReviews(id);
          setReviews(reviewData?.reviews || []);
        } catch {
          // 리뷰 로드 실패 시 빈 배열
          setReviews([]);
        }
      } catch (err) {
        setError(err.message || '영화 정보를 불러올 수 없습니다.');
      } finally {
        setIsLoading(false);
      }
    }

    if (id) {
      loadMovieData();
    }
  }, [id]);

  /**
   * 위시리스트 토글 핸들러.
   * 인증된 사용자만 사용 가능하다.
   *
   * @param {string|number} movieId - 영화 ID
   */
  const handleWishlistToggle = async (movieId) => {
    if (!isAuthenticated) {
      alert('위시리스트를 사용하려면 로그인이 필요합니다.');
      return;
    }

    try {
      const result = await toggleWishlist(movieId);
      setIsWishlisted(result.added);
    } catch (err) {
      alert(err.message || '위시리스트 변경에 실패했습니다.');
    }
  };

  // 로딩 중
  if (isLoading) {
    return (
      <div className="movie-detail-page">
        <Loading message="영화 정보를 불러오는 중..." fullPage />
      </div>
    );
  }

  // 에러 발생
  if (error) {
    return (
      <div className="movie-detail-page">
        <div className="movie-detail-page__error">
          <h2>오류가 발생했습니다</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="movie-detail-page">
      <div className="movie-detail-page__inner">
        {/* 영화 상세 카드 */}
        <MovieDetailCard
          movie={movie}
          onWishlistToggle={handleWishlistToggle}
          isWishlisted={isWishlisted}
        />

        {/* 리뷰 섹션 */}
        <section className="movie-detail-page__reviews">
          <h2 className="movie-detail-page__section-title">
            리뷰 {reviews.length > 0 && <span>({reviews.length})</span>}
          </h2>
          <ReviewList reviews={reviews} />
        </section>
      </div>
    </div>
  );
}
