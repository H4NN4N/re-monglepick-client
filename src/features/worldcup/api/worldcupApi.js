/**
 * Recommend 기반 영화 월드컵 API 모듈.
 *
 * 런타임 원본은 recommend(FastAPI)이며,
 * 카테고리 조회 → 옵션 계산 → 시작 → 라운드 제출 → 결과 조회 흐름을 처리한다.
 */

import { recommendApi, requireAuth } from '../../../shared/api/axiosInstance';
import { RECOMMEND_WORLDCUP_ENDPOINTS } from '../../../shared/constants/api';

function normalizeMovie(movie) {
  if (!movie) return null;
  return {
    movieId: movie.movie_id,
    title: movie.title,
    titleEn: movie.title_en ?? null,
    genres: Array.isArray(movie.genres) ? movie.genres : [],
    releaseYear: movie.release_year ?? null,
    rating: movie.rating ?? null,
    voteCount: movie.vote_count ?? null,
    posterUrl: movie.poster_url ?? null,
    trailerUrl: movie.trailer_url ?? null,
    overview: movie.overview ?? null,
  };
}

function normalizeMatch(match) {
  return {
    matchId: match.match_id,
    leftMovie: normalizeMovie(match.movie_a),
    rightMovie: normalizeMovie(match.movie_b),
  };
}

function normalizeCategory(category) {
  return {
    categoryId: category.categoryId,
    categoryCode: category.categoryCode,
    categoryName: category.categoryName,
    description: category.description ?? '',
    displayOrder: category.displayOrder ?? 0,
    candidatePoolSize: category.candidatePoolSize ?? 0,
    availableRoundSizes: Array.isArray(category.availableRoundSizes)
      ? category.availableRoundSizes
      : [],
    previewMovieId: category.previewMovieId ?? null,
    previewPosterUrl: category.previewPosterUrl ?? null,
    isReady: Boolean(category.isReady),
  };
}

function normalizeGenreOption(item) {
  return {
    genreCode: item.genreCode,
    genreName: item.genreName,
    contentsCount: item.contentsCount ?? 0,
  };
}

function normalizeBracket(data) {
  return {
    roundSize: data.round_size,
    totalRounds: data.total_rounds,
    matches: Array.isArray(data.matches) ? data.matches.map(normalizeMatch) : [],
  };
}

function normalizeOptions(data) {
  return {
    sourceType: data.sourceType,
    categoryId: data.categoryId ?? null,
    selectedGenres: Array.isArray(data.selectedGenres) ? data.selectedGenres : [],
    candidatePoolSize: data.candidatePoolSize ?? 0,
    availableRoundSizes: Array.isArray(data.availableRoundSizes)
      ? data.availableRoundSizes
      : [],
  };
}

function normalizeSelectionResult(data) {
  return {
    message: data.message,
    nextRound: data.next_round ?? null,
    nextMatches: Array.isArray(data.next_matches)
      ? data.next_matches.map(normalizeMatch)
      : [],
  };
}

function normalizeGenrePreference(item) {
  return {
    genre: item.genre,
    score: item.score,
  };
}

function normalizeResult(data) {
  return {
    winner: normalizeMovie(data.winner),
    runnerUp: normalizeMovie(data.runner_up),
    genrePreferences: Array.isArray(data.genre_preferences)
      ? data.genre_preferences.map(normalizeGenrePreference)
      : [],
    topGenres: Array.isArray(data.top_genres) ? data.top_genres : [],
  };
}

export async function getWorldcupCategories() {
  requireAuth();
  const data = await recommendApi.get(RECOMMEND_WORLDCUP_ENDPOINTS.CATEGORIES);
  return Array.isArray(data) ? data.map(normalizeCategory) : [];
}

export async function getWorldcupGenres() {
  requireAuth();
  const data = await recommendApi.get(RECOMMEND_WORLDCUP_ENDPOINTS.GENRES);
  return Array.isArray(data) ? data.map(normalizeGenreOption) : [];
}

export async function getWorldcupStartOptions({ sourceType, categoryId, selectedGenres } = {}) {
  requireAuth();
  const data = await recommendApi.post(RECOMMEND_WORLDCUP_ENDPOINTS.OPTIONS, {
    sourceType,
    categoryId: categoryId ?? null,
    selectedGenres: Array.isArray(selectedGenres) ? selectedGenres : [],
  });
  return normalizeOptions(data);
}

export async function startWorldcup({ sourceType, categoryId, selectedGenres, roundSize }) {
  requireAuth();
  const data = await recommendApi.post(RECOMMEND_WORLDCUP_ENDPOINTS.START, {
    sourceType,
    categoryId: categoryId ?? null,
    selectedGenres: Array.isArray(selectedGenres) ? selectedGenres : [],
    roundSize,
  });
  return normalizeBracket(data);
}

export async function submitWorldcupRound({ roundSize, selections, isFinal = false }) {
  requireAuth();
  const data = await recommendApi.post(RECOMMEND_WORLDCUP_ENDPOINTS.SUBMIT, {
    round_size: roundSize,
    selections,
    is_final: isFinal,
  });
  return normalizeSelectionResult(data);
}

export async function getWorldcupResult() {
  requireAuth();
  const data = await recommendApi.get(RECOMMEND_WORLDCUP_ENDPOINTS.RESULT);
  return normalizeResult(data);
}
