/**
 * 영화(Movies) API 모듈.
 *
 * 영화 정보 조회, 검색 등 영화 관련 HTTP 요청을 처리한다.
 * fetch API를 사용하며, 인증이 필요한 요청은 Authorization 헤더를 포함한다.
 */

/* API 상수 — shared/constants에서 가져옴 */
import { MOVIE_ENDPOINTS } from '../../../shared/constants/api';
/* 공통 인증 fetch 래퍼 — shared/utils에서 가져옴 (토큰 자동 갱신 포함) */
import { fetchWithAuth } from '../../../shared/utils/fetchWithAuth';

/**
 * 영화 상세 정보를 조회한다.
 *
 * @param {number|string} movieId - 영화 ID
 * @returns {Promise<Object>} 영화 상세 정보 객체
 *   - id, title, overview, genres, cast, rating, poster_path,
 *     trailer_url, ott_platforms, release_date, runtime 등
 *
 * @example
 * const movie = await getMovie(550);
 * console.log(movie.title); // '파이트 클럽'
 */
export async function getMovie(movieId) {
  return fetchWithAuth(MOVIE_ENDPOINTS.DETAIL(movieId));
}

/**
 * 영화를 검색한다.
 * 키워드, 장르, 정렬 등의 필터를 지원한다.
 *
 * @param {Object} params - 검색 파라미터
 * @param {string} params.query - 검색 키워드
 * @param {string} [params.genre] - 장르 필터
 * @param {string} [params.sort='relevance'] - 정렬 기준 (relevance, rating, date)
 * @param {number} [params.page=1] - 페이지 번호
 * @param {number} [params.size=20] - 페이지 크기
 * @returns {Promise<Object>} 검색 결과 ({ movies: [], total: number, page: number })
 *
 * @example
 * const results = await searchMovies({ query: '인터스텔라', genre: 'SF' });
 * console.log(results.movies.length); // 검색된 영화 수
 */
export async function searchMovies({ query, genre, sort = 'relevance', page = 1, size = 20 }) {
  // URL 쿼리 파라미터 구성
  const params = new URLSearchParams();
  if (query) params.append('query', query);
  if (genre) params.append('genre', genre);
  if (sort) params.append('sort', sort);
  params.append('page', String(page));
  params.append('size', String(size));

  return fetchWithAuth(`${MOVIE_ENDPOINTS.SEARCH}?${params.toString()}`);
}

/**
 * 인기 영화 목록을 조회한다.
 *
 * @param {number} [page=1] - 페이지 번호
 * @param {number} [size=20] - 페이지 크기
 * @returns {Promise<Object>} 인기 영화 목록 ({ movies: [], total: number })
 */
export async function getPopularMovies(page = 1, size = 20) {
  const params = new URLSearchParams({ page: String(page), size: String(size) });
  return fetchWithAuth(`${MOVIE_ENDPOINTS.POPULAR}?${params.toString()}`);
}

/**
 * 최신 영화 목록을 조회한다.
 *
 * @param {number} [page=1] - 페이지 번호
 * @param {number} [size=20] - 페이지 크기
 * @returns {Promise<Object>} 최신 영화 목록 ({ movies: [], total: number })
 */
export async function getLatestMovies(page = 1, size = 20) {
  const params = new URLSearchParams({ page: String(page), size: String(size) });
  return fetchWithAuth(`${MOVIE_ENDPOINTS.LATEST}?${params.toString()}`);
}
