/**
 * 디자인 시스템 테마 객체.
 *
 * baseTheme(색상 무관 공통 토큰) + darkTheme + lightTheme 3분할 구조.
 * styled-components의 ThemeProvider를 통해 모든 컴포넌트에서
 * ${({ theme }) => theme.colors.primary} 형태로 참조할 수 있다.
 *
 * 기존 theme 키 이름을 100% 유지하여 styled 파일 수정 최소화.
 *
 * 카테고리: mode, colors, spacing, typography, shadows, radius,
 *           transitions, layout, zIndex, gradients, glows, glass,
 *           header, footer, landing
 */

/* ============================================================
 * 공통 토큰 (색상 무관)
 * ============================================================ */
const baseTheme = {
  /* ── 간격 (Spacing) ── */
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
    xxxl: '64px',
  },

  /* ── 타이포그래피 (Typography) ��─ */
  typography: {
    /* 폰트 패밀리 */
    fontFamily:
      "'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans KR', sans-serif",
    fontMono: "'Fira Code', 'SF Mono', Menlo, Consolas, monospace",

    /* 폰트 크기 */
    textXs: '0.75rem',     /* 12px */
    textSm: '0.875rem',    /* 14px */
    textBase: '1rem',       /* 16px */
    textLg: '1.125rem',     /* 18px */
    textXl: '1.25rem',      /* 20px */
    text2xl: '1.5rem',      /* 24px */
    text3xl: '1.875rem',    /* 30px */
    text4xl: '2.25rem',     /* 36px */

    /* 폰트 두께 */
    fontNormal: 400,
    fontMedium: 500,
    fontSemibold: 600,
    fontBold: 700,

    /* 줄 높이 */
    leadingTight: 1.25,
    leadingNormal: 1.5,
    leadingRelaxed: 1.75,
  },

  /* ── 라운딩 (Border Radius) ── */
  radius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
  },

  /* ── 트랜지션 (Transitions) ── */
  transitions: {
    fast: '150ms ease',
    base: '250ms ease',
    slow: '400ms ease',
  },

  /* ── 레이아웃 (Layout) ── */
  layout: {
    headerHeight: '64px',
    footerHeight: '60px',
    sidebarWidth: '280px',
    contentMaxWidth: '1200px',
    contentNarrow: '800px',
  },

  /* ── Z-인덱스 (Z-Index) ── */
  zIndex: {
    dropdown: 100,
    sticky: 200,
    modalBackdrop: 300,
    modal: 400,
    toast: 500,
  },
};

/* ============================================================
 * 다크 테마 (기존 theme 그대로)
 * ============================================================ */
export const darkTheme = {
  ...baseTheme,

  /** 테마 모드 식별자 — GlobalStyle에서 color-scheme 동적 반영에 사용 */
  mode: 'dark',

  /* ── 색상 (Colors) ── */
  colors: {
    /* 기본(Primary) 색상 — 보라색 계열 */
    primary: '#7c6cf0',
    primaryHover: '#6b5ce0',
    primaryLight: 'rgba(124, 108, 240, 0.15)',
    primaryDark: '#5a4cc0',

    /* 배���(Background) 색상 — 진한 남색 계열 */
    bgMain: '#0f0f1a',
    bgCard: '#1a1a2e',
    bgElevated: '#222240',
    bgInput: '#16162b',
    bgOverlay: 'rgba(0, 0, 0, 0.6)',
    bgSecondary: '#1e1e35',
    bgTertiary: '#2a2a48',

    /* 텍스트(Text) 색상 */
    textPrimary: '#e8e8f0',
    textSecondary: '#8888a0',
    textMuted: '#555570',
    textInverse: '#0f0f1a',

    /* 상태(Status) 색상 */
    success: '#4ade80',
    successBg: 'rgba(74, 222, 128, 0.1)',
    warning: '#fbbf24',
    warningBg: 'rgba(251, 191, 36, 0.1)',
    error: '#f87171',
    errorBg: 'rgba(248, 113, 113, 0.1)',
    info: '#60a5fa',
    infoBg: 'rgba(96, 165, 250, 0.1)',

    /* 테두리(Border) 색상 */
    borderDefault: '#2a2a45',
    borderLight: '#1e1e38',
    borderFocus: '#7c6cf0',

    /* 평점 별(Rating Star) 색상 */
    starFilled: '#fbbf24',
    starEmpty: '#3a3a55',
  },

  /* ── 그림자 (Shadows) ── */
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.3)',
    md: '0 4px 6px rgba(0, 0, 0, 0.4)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.5)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.5)',
    glow: '0 0 20px rgba(124, 108, 240, 0.3)',
  },

  /* ── 그라데이션 (Gradients) ── */
  gradients: {
    primary: 'linear-gradient(135deg, #7c6cf0 0%, #06d6a0 100%)',
    accent: 'linear-gradient(135deg, #ef476f 0%, #ffd166 50%, #06d6a0 100%)',
    text: 'linear-gradient(135deg, #7c6cf0, #06d6a0, #60a5fa)',
    cardBorder:
      'linear-gradient(135deg, rgba(124,108,240,0.5), rgba(6,214,160,0.5), rgba(124,108,240,0.5))',
    glow: 'radial-gradient(circle, rgba(124,108,240,0.15) 0%, transparent 70%)',
  },

  /* ── 네온 글로우 (Glow Effects) ── */
  glows: {
    primary:
      '0 0 20px rgba(124,108,240,0.4), 0 0 40px rgba(124,108,240,0.2)',
    cyan: '0 0 20px rgba(6,214,160,0.4), 0 0 40px rgba(6,214,160,0.2)',
    pink: '0 0 20px rgba(239,71,111,0.4)',
  },

  /* ── 글래스모피즘 (Glassmorphism) ── */
  glass: {
    bg: 'rgba(26, 26, 46, 0.6)',
    border: 'rgba(124, 108, 240, 0.15)',
    blur: 'blur(16px) saturate(1.8)',
  },

  /* ── 헤더 (Header) — 기존 하드코딩 값을 테마 키로 이동 ���─ */
  header: {
    bg: 'rgba(15, 15, 26, 0.85)',
    mobileBg: 'rgba(15, 15, 26, 0.95)',
  },

  /* ── 푸터 (Footer) — 기존 하드코딩 값을 테마 키로 이동 ── */
  footer: {
    bg: 'rgba(26, 26, 46, 0.7)',
  },

  /* ── 랜딩 페이지 전용 (LP_* 상수 대체) ── */
  landing: {
    bgMain: '#0a0a14',
    bgCard: 'rgba(26, 26, 46, 0.6)',
    bgGlass: 'rgba(26, 26, 46, 0.35)',
    border: 'rgba(124, 108, 240, 0.15)',
    borderHover: 'rgba(124, 108, 240, 0.4)',
    primaryGlow: 'rgba(124, 108, 240, 0.4)',
    textPrimary: '#eeeef5',
    textSecondary: '#9999b8',
    textMuted: '#555570',
  },
};

/* ============================================================
 * 라이트 테마 (신규)
 *
 * 핵심 원칙: 글래스모피즘과 글로우 효과를 제거하지 않고,
 * 라이트 모드에 맞게 불투명도와 강도를 조절하여 브랜드 아이덴티티를 유지한다.
 * ============================================================ */
export const lightTheme = {
  ...baseTheme,

  /** 테마 모드 식별자 */
  mode: 'light',

  /* ── 색상 (Colors) ── */
  colors: {
    /* 기본(Primary) 색상 — 밝은 배경 대비 약간 어둡게 */
    primary: '#6b5ce0',
    primaryHover: '#5a4cc0',
    primaryLight: 'rgba(107, 92, 224, 0.12)',
    primaryDark: '#4a3cb0',

    /* 배경(Background) 색상 — 연한 라벤더 그레이 */
    bgMain: '#f5f5fa',
    bgCard: '#ffffff',
    bgElevated: '#f0f0f8',
    bgInput: '#ffffff',
    bgOverlay: 'rgba(0, 0, 0, 0.4)',
    bgSecondary: '#eeeef6',
    bgTertiary: '#e8e8f2',

    /* 텍스트(Text) 색상 — 다크 모드와 반전 */
    textPrimary: '#1a1a2e',
    textSecondary: '#555570',
    textMuted: '#8888a0',
    textInverse: '#f5f5fa',

    /* 상태(Status) 색상 — 채도 조정 */
    success: '#16a34a',
    successBg: 'rgba(22, 163, 74, 0.08)',
    warning: '#d97706',
    warningBg: 'rgba(217, 119, 6, 0.08)',
    error: '#dc2626',
    errorBg: 'rgba(220, 38, 38, 0.08)',
    info: '#2563eb',
    infoBg: 'rgba(37, 99, 235, 0.08)',

    /* 테두리(Border) 색상 */
    borderDefault: '#d8d8e8',
    borderLight: '#e8e8f2',
    borderFocus: '#6b5ce0',

    /* 평점 별(Rating Star) 색상 */
    starFilled: '#d97706',
    starEmpty: '#d8d8e8',
  },

  /* ── 그림자 (Shadows) — 1/4~1/5로 줄임 ── */
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px rgba(0, 0, 0, 0.08)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.12)',
    glow: '0 0 20px rgba(107, 92, 224, 0.15)',
  },

  /* ── 그라데이션 (Gradients) — 브랜드 아이덴티티 유지 ── */
  gradients: {
    primary: 'linear-gradient(135deg, #7c6cf0 0%, #06d6a0 100%)',
    accent: 'linear-gradient(135deg, #ef476f 0%, #ffd166 50%, #06d6a0 100%)',
    text: 'linear-gradient(135deg, #7c6cf0, #06d6a0, #60a5fa)',
    cardBorder:
      'linear-gradient(135deg, rgba(124,108,240,0.3), rgba(6,214,160,0.3), rgba(124,108,240,0.3))',
    glow: 'radial-gradient(circle, rgba(124,108,240,0.06) 0%, transparent 70%)',
  },

  /* ── 네온 글로우 (Glow Effects) — 강도 반으로 줄임 ── */
  glows: {
    primary:
      '0 0 20px rgba(107,92,224,0.2), 0 0 40px rgba(107,92,224,0.1)',
    cyan: '0 0 20px rgba(6,214,160,0.2), 0 0 40px rgba(6,214,160,0.1)',
    pink: '0 0 20px rgba(239,71,111,0.2)',
  },

  /* ── 글래스모피즘 (Glassmorphism) — 반투명 흰색 + 블러 약간 줄임 ── */
  glass: {
    bg: 'rgba(255, 255, 255, 0.7)',
    border: 'rgba(107, 92, 224, 0.15)',
    blur: 'blur(12px) saturate(1.4)',
  },

  /* ── 헤더 (Header) ── */
  header: {
    bg: 'rgba(255, 255, 255, 0.85)',
    mobileBg: 'rgba(255, 255, 255, 0.95)',
  },

  /* ── 푸터 (Footer) ── */
  footer: {
    bg: 'rgba(255, 255, 255, 0.7)',
  },

  /* ── 랜딩 페이지 전용 ── */
  landing: {
    bgMain: '#f0f0f8',
    bgCard: 'rgba(255, 255, 255, 0.7)',
    bgGlass: 'rgba(255, 255, 255, 0.5)',
    border: 'rgba(107, 92, 224, 0.12)',
    borderHover: 'rgba(107, 92, 224, 0.3)',
    primaryGlow: 'rgba(107, 92, 224, 0.2)',
    textPrimary: '#1a1a2e',
    textSecondary: '#555570',
    textMuted: '#8888a0',
  },
};

/* 하위 호환 — 기존 `import theme from './theme'` 유지 */
export default darkTheme;
