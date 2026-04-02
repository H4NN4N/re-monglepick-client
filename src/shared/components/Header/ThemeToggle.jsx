/**
 * 테마 토글 버튼 컴포넌트.
 *
 * 다크 모드(달 아이콘) ↔ 라이트 모드(해 아이콘) 전환.
 * Zustand useThemeStore를 통해 전역 테마 상태를 변경한다.
 *
 * Header의 AuthSection 직전에 배치되며,
 * 데스크톱 + 모바일 메뉴 모두에서 사용 가능하다.
 */

import useThemeStore from '../../stores/useThemeStore';
import { ToggleButton, IconWrapper } from './ThemeToggle.styled';

export default function ThemeToggle() {
  /* 현재 모드 구독 + 토글 함수 */
  const mode = useThemeStore((s) => s.mode);
  const toggleMode = useThemeStore((s) => s.toggleMode);
  const isDark = mode === 'dark';

  return (
    <ToggleButton
      onClick={toggleMode}
      aria-label={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
      title={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
    >
      <IconWrapper>
        {isDark ? '🌙' : '☀️'}
      </IconWrapper>
    </ToggleButton>
  );
}
