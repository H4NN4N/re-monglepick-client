/**
 * 테마 모드 관리 Zustand 스토어.
 *
 * 다크/라이트 모드 전환을 전역에서 관리한다.
 * - mode: 현재 테마 모드 ('dark' | 'light')
 * - toggleMode: 다크 ↔ 라이트 토글
 * - setMode: 특정 모드로 강제 설정
 *
 * 초기 모드 결정 우선순위:
 *   1. localStorage 저장값
 *   2. OS 설정 (prefers-color-scheme)
 *   3. 기본값 'dark'
 *
 * localStorage를 통해 새로고침/재방문 시에도 선택한 테마를 유지한다.
 *
 * @module shared/stores/useThemeStore
 *
 * @example
 * // 컴포넌트에서 현재 모드 구독
 * const mode = useThemeStore((s) => s.mode);
 *
 * // 다크 모드 여부 직접 비교 (isDark getter 대신 — 불필요한 리렌더링 방지)
 * const isDark = mode === 'dark';
 *
 * // 토글
 * const toggleMode = useThemeStore((s) => s.toggleMode);
 * <button onClick={toggleMode}>테마 전환</button>
 */

import { create } from 'zustand';

/** localStorage 키 (Admin은 'monglepick_admin_theme_mode' 사용) */
const THEME_STORAGE_KEY = 'monglepick_theme_mode';

/**
 * 초기 테마 모드 결정.
 * localStorage > OS 설정 > 기본값('dark') 순서로 결정한다.
 *
 * @returns {'dark' | 'light'} 초기 테마 모드
 */
function getInitialMode() {
  /* 1. localStorage에 저장된 값이 있으면 사용 */
  const saved = localStorage.getItem(THEME_STORAGE_KEY);
  if (saved === 'light' || saved === 'dark') return saved;

  /* 2. OS 설정 감지 (prefers-color-scheme) */
  if (window.matchMedia?.('(prefers-color-scheme: light)').matches) return 'light';

  /* 3. 기본값: 다크 모드 (몽글픽 브랜드 아이덴티티) */
  return 'dark';
}

const useThemeStore = create((set) => ({
  /** 현재 테마 모드 ('dark' | 'light') */
  mode: getInitialMode(),

  /**
   * 테마 토글 (dark ↔ light).
   * localStorage에 즉시 영속 저장하여 새로고침 시 복원한다.
   */
  toggleMode: () =>
    set((state) => {
      const next = state.mode === 'dark' ? 'light' : 'dark';
      localStorage.setItem(THEME_STORAGE_KEY, next);
      return { mode: next };
    }),

  /**
   * 특정 모드로 강제 설정.
   * OS 설정 변경 감지 등 외부에서 호출할 때 사용한다.
   *
   * @param {'dark' | 'light'} mode - 설정할 테마 모드
   */
  setMode: (mode) => {
    localStorage.setItem(THEME_STORAGE_KEY, mode);
    set({ mode });
  },
}));

export default useThemeStore;
