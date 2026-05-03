import { useCallback, useEffect, useState } from 'react';

import { getTrendingKeywords } from '../../features/movie/api/movieApi';

const POPULAR_SEARCH_CACHE_KEY = 'monglepick_popular_search_keywords_cache_v1';
const POPULAR_SEARCH_CACHE_TTL_MS = 5 * 60 * 1000;

let memoryCache = null;
let pendingRequest = null;

function buildKeywordsSignature(keywords) {
  return JSON.stringify(
    keywords.map((item) => [item.rank, item.keyword, item.searchCount])
  );
}

function normalizeKeywords(data) {
  return Array.isArray(data) ? data.slice(0, 10) : [];
}

function readSessionCache() {
  if (memoryCache) {
    return memoryCache;
  }

  try {
    const raw = window.sessionStorage.getItem(POPULAR_SEARCH_CACHE_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed?.keywords) || typeof parsed?.signature !== 'string') {
      return null;
    }

    memoryCache = parsed;
    return parsed;
  } catch {
    return null;
  }
}

function writeSessionCache(cache) {
  memoryCache = cache;
  try {
    window.sessionStorage.setItem(POPULAR_SEARCH_CACHE_KEY, JSON.stringify(cache));
  } catch {
    // sessionStorage 사용이 불가능한 환경에서는 메모리 캐시만 유지합니다.
  }
}

async function fetchPopularKeywordsCache() {
  if (pendingRequest) {
    return pendingRequest;
  }

  pendingRequest = (async () => {
    const data = await getTrendingKeywords();
    const keywords = normalizeKeywords(data);
    const cache = {
      keywords,
      signature: buildKeywordsSignature(keywords),
      fetchedAt: Date.now(),
    };
    writeSessionCache(cache);
    return cache;
  })();

  try {
    return await pendingRequest;
  } finally {
    pendingRequest = null;
  }
}

/**
 * 검색창 하단 공용 "인기 검색어" 목록을 로드합니다.
 *
 * 홈/검색 페이지가 동일한 소스를 바라보도록 공용 훅으로 분리합니다.
 */
export default function usePopularSearchKeywords() {
  const initialCache = typeof window !== 'undefined' ? readSessionCache() : null;
  const [keywords, setKeywords] = useState(initialCache?.keywords ?? []);
  const [isLoading, setIsLoading] = useState(!initialCache);

  const loadKeywords = useCallback(async ({ force = false } = {}) => {
    const currentCache = typeof window !== 'undefined' ? readSessionCache() : memoryCache;
    const isFresh = currentCache
      && Date.now() - currentCache.fetchedAt < POPULAR_SEARCH_CACHE_TTL_MS;

    if (!force && isFresh) {
      setKeywords(currentCache.keywords);
      setIsLoading(false);
      return currentCache;
    }

    try {
      setIsLoading(!currentCache);
      const nextCache = await fetchPopularKeywordsCache();
      setKeywords((prev) => {
        const previousSignature = buildKeywordsSignature(prev);
        return previousSignature === nextCache.signature ? prev : nextCache.keywords;
      });
      return nextCache;
    } catch (error) {
      console.error('[usePopularSearchKeywords] 인기 검색어 로드 실패:', error);
      if (!currentCache) {
        setKeywords([]);
      }
      return currentCache ?? null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadKeywords();
  }, [loadKeywords]);

  return {
    keywords,
    isLoading,
    reload: loadKeywords,
  };
}
