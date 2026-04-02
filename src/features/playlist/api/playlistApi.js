/**
 * 플레이리스트 API 모듈.
 *
 * Backend의 PlaylistController와 통신하여
 * 플레이리스트 CRUD 및 영화 추가/제거를 수행한다.
 *
 * @module features/playlist/api/playlistApi
 */

import { backendApi, requireAuth } from '../../../shared/api/axiosInstance';
import { PLAYLIST_ENDPOINTS } from '../../../shared/constants/api';

/**
 * 플레이리스트 목록 조회 (페이징).
 *
 * @param {Object} params
 * @param {number} [params.page=0]
 * @param {number} [params.size=20]
 * @returns {Promise<{content: Array, totalPages: number}>}
 */
export async function getPlaylists({ page = 0, size = 20 } = {}) {
  requireAuth();
  return backendApi.get(PLAYLIST_ENDPOINTS.LIST, { params: { page, size } });
}

/**
 * 플레이리스트 상세 조회 (영화 목록 포함).
 *
 * @param {string|number} playlistId
 * @returns {Promise<{id, title, description, movies: Array, movieCount}>}
 */
export async function getPlaylistDetail(playlistId) {
  requireAuth();
  return backendApi.get(PLAYLIST_ENDPOINTS.DETAIL(playlistId));
}

/**
 * 플레이리스트 생성.
 *
 * @param {Object} data
 * @param {string} data.title - 제목
 * @param {string} [data.description] - 설명
 * @returns {Promise<{id, title, description}>}
 */
export async function createPlaylist({ title, description }) {
  requireAuth();
  return backendApi.post(PLAYLIST_ENDPOINTS.CREATE, { title, description });
}

/**
 * 플레이리스트 수정.
 *
 * @param {string|number} playlistId
 * @param {Object} data - {title, description}
 * @returns {Promise<void>}
 */
export async function updatePlaylist(playlistId, { title, description }) {
  requireAuth();
  return backendApi.put(PLAYLIST_ENDPOINTS.UPDATE(playlistId), { title, description });
}

/**
 * 플레이리스트 삭제.
 *
 * @param {string|number} playlistId
 * @returns {Promise<void>}
 */
export async function deletePlaylist(playlistId) {
  requireAuth();
  return backendApi.delete(PLAYLIST_ENDPOINTS.DELETE(playlistId));
}

/**
 * 플레이리스트에 영화 추가.
 *
 * @param {string|number} playlistId
 * @param {string} movieId
 * @returns {Promise<void>}
 */
export async function addMovieToPlaylist(playlistId, movieId) {
  requireAuth();
  return backendApi.post(PLAYLIST_ENDPOINTS.ADD_MOVIE(playlistId), { movieId });
}

/**
 * 플레이리스트에서 영화 제거.
 *
 * @param {string|number} playlistId
 * @param {string} movieId
 * @returns {Promise<void>}
 */
export async function removeMovieFromPlaylist(playlistId, movieId) {
  requireAuth();
  return backendApi.delete(PLAYLIST_ENDPOINTS.REMOVE_MOVIE(playlistId, movieId));
}
