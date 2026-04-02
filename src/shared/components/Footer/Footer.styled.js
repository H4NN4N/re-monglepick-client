/**
 * Footer styled-components.
 *
 * 3컬럼 레이아웃 (로고/퀵링크/팀정보) + 그라데이션 구분선 + 저작권.
 * glassmorphism 배경 + 로고 gradient-text + 링크 호버 글로우.
 * 모바일에서는 1컬럼 스택으로 전환된다.
 */

import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { gradientText } from '../../styles/mixins';
import { media } from '../../styles/media';

/** 푸터 전체 컨테이너 — 글래스 배경 */
export const FooterWrapper = styled.footer`
  width: 100%;
  background-color: ${({ theme }) => theme.footer.bg};
  backdrop-filter: blur(12px) saturate(1.4);
  -webkit-backdrop-filter: blur(12px) saturate(1.4);
  border-top: none;
  padding: ${({ theme }) => `${theme.spacing.xxl} 0 ${theme.spacing.lg}`};
  margin-top: auto;
  position: relative;

  /* 상단 그라데이션 구분선 (border-top 대체) */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: ${({ theme }) => theme.gradients.primary};
    opacity: 0.5;
  }
`;

/** 내부 레이아웃 */
export const Inner = styled.div`
  max-width: ${({ theme }) => theme.layout.contentMaxWidth};
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

/** 3컬럼 레이아웃 */
export const Columns = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.xxl};

  ${media.tablet} {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.xl};
    text-align: center;
  }
`;

/** 브랜드 영역 (좌측) */
export const Brand = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};

  ${media.tablet} {
    align-items: center;
  }
`;

/** 로고 링크 */
export const LogoLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  text-decoration: none;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

/** 로고 아이콘 (몽글 캐릭터 이미지) */
export const LogoIcon = styled.img`
  width: 32px;
  height: 32px;
  object-fit: contain;
  flex-shrink: 0;
`;

/** 로고 텍스트 — 그라데이션 텍스트 */
export const LogoText = styled.span`
  font-size: ${({ theme }) => theme.typography.textLg};
  font-weight: ${({ theme }) => theme.typography.fontBold};
  ${gradientText}
`;

/** 설명 텍스트 */
export const Desc = styled.p`
  font-size: ${({ theme }) => theme.typography.textSm};
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0;
  line-height: ${({ theme }) => theme.typography.leadingRelaxed};
`;

/** 네비게이션 영역 (중앙) */
export const Nav = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};

  ${media.tablet} {
    align-items: center;
  }
`;

/** 섹션 제목 */
export const NavTitle = styled.h4`
  font-size: ${({ theme }) => theme.typography.textSm};
  font-weight: ${({ theme }) => theme.typography.fontSemibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
`;

/** 링크 — 호버 시 글로우 효과 */
export const NavLink = styled(Link)`
  font-size: ${({ theme }) => theme.typography.textSm};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-decoration: none;
  transition: color ${({ theme }) => theme.transitions.fast},
    text-shadow ${({ theme }) => theme.transitions.fast};
  line-height: ${({ theme }) => theme.typography.leadingRelaxed};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    text-shadow: ${({ theme }) => theme.shadows.glow};
  }
`;

/** 팀 정보 영역 (우측) */
export const Team = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};

  ${media.tablet} {
    align-items: center;
  }
`;

/** 팀 이름 */
export const TeamName = styled.p`
  font-size: ${({ theme }) => theme.typography.textSm};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
`;

/** 팀 이메일 */
export const TeamEmail = styled.p`
  font-size: ${({ theme }) => theme.typography.textSm};
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0;
`;

/** 구분선 — 그라데이션 */
export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: ${({ theme }) => theme.gradients.primary};
  opacity: 0.3;
`;

/** 저작권 */
export const Copyright = styled.div`
  text-align: center;

  p {
    font-size: ${({ theme }) => theme.typography.textXs};
    color: ${({ theme }) => theme.colors.textMuted};
    margin: 0;
  }
`;
