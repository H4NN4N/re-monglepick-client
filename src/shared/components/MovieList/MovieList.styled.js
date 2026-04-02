/**
 * MovieList styled-components.
 *
 * glass-card 영화 카드 + hover shine 효과 + scaleIn stagger 등장 +
 * 포스터 hover scale + 보라색 glow 오버레이 + gradient 평점 배지.
 */

import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { scaleIn, cardShine } from '../../styles/animations';

/** 섹션 컨테이너 */
export const Section = styled.section`
  width: 100%;
`;

/** 섹션 제목 */
export const Title = styled.h2`
  font-size: ${({ theme }) => theme.typography.text2xl};
  font-weight: ${({ theme }) => theme.typography.fontBold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

/** 카드 그리드 — CSS Grid로 반응형 열 배치 */
export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: 640px) {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

/** 영화 카드 — glass-card + scaleIn stagger */
export const Card = styled(Link)`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  border-radius: ${({ theme }) => theme.radius.lg};
  overflow: hidden;
  background: ${({ theme }) => theme.glass.bg};
  backdrop-filter: blur(8px) saturate(1.4);
  -webkit-backdrop-filter: blur(8px) saturate(1.4);
  border: 1px solid ${({ theme }) => theme.glass.border};
  transition: transform ${({ theme }) => theme.transitions.base},
    box-shadow ${({ theme }) => theme.transitions.base},
    border-color ${({ theme }) => theme.transitions.base};
  position: relative;
  animation: ${scaleIn} 0.4s ease both;
  animation-delay: ${({ $index }) =>
    $index !== undefined ? `${0.05 + $index * 0.05}s` : '0s'};

  /* 호버 shine 효과 */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 50%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.04),
      transparent
    );
    pointer-events: none;
    z-index: 2;
  }

  &:hover::before {
    animation: ${cardShine} 0.8s ease forwards;
  }

  &:hover {
    transform: translateY(-6px);
    box-shadow: ${({ theme }) => theme.shadows.lg},
      ${({ theme }) => theme.shadows.glow};
    border-color: ${({ theme }) => theme.glass.border};
  }
`;

/** 포스터 영역 */
export const Poster = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 2 / 3;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.bgElevated};
`;

/** 포스터 이미지 — hover scale */
export const PosterImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform ${({ theme }) => theme.transitions.slow};

  ${Card}:hover & {
    transform: scale(1.08);
  }
`;

/** 포스터 플레이스홀더 */
export const PosterPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.bgElevated},
    ${({ theme }) => theme.colors.bgCard}
  );
`;

/** 플레이스홀더 아이콘 */
export const PlaceholderIcon = styled.span`
  font-size: ${({ theme }) => theme.typography.text4xl};
  opacity: 0.5;
`;

/** 플레이스홀더 텍스트 */
export const PlaceholderText = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.textXs};
  font-weight: ${({ theme }) => theme.typography.fontMedium};
`;

/** 평점 배지 — 그라데이션 배경 */
export const RatingBadge = styled.span`
  position: absolute;
  top: ${({ theme }) => theme.spacing.sm};
  right: ${({ theme }) => theme.spacing.sm};
  padding: 2px 8px;
  background: ${({ theme }) => theme.gradients.primary};
  color: white;
  font-size: ${({ theme }) => theme.typography.textXs};
  font-weight: ${({ theme }) => theme.typography.fontBold};
  border-radius: ${({ theme }) => theme.radius.sm};
`;

/** 호버 오버레이 — "자세히 보기" + glow */
export const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    ${({ theme }) => theme.colors.bgOverlay} 0%,
    ${({ theme }) => theme.colors.primaryLight} 40%,
    transparent 100%
  );
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: ${({ theme }) => theme.spacing.lg};
  opacity: 0;
  transition: opacity ${({ theme }) => theme.transitions.base};

  ${Card}:hover & {
    opacity: 1;
  }
`;

/** 오버레이 텍스트 */
export const OverlayText = styled.span`
  color: white;
  font-size: ${({ theme }) => theme.typography.textSm};
  font-weight: ${({ theme }) => theme.typography.fontSemibold};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  background: ${({ theme }) => theme.gradients.primary};
  border-radius: ${({ theme }) => theme.radius.full};
  box-shadow: ${({ theme }) => theme.shadows.glow};
`;

/** 영화 정보 영역 */
export const Info = styled.div`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  padding-bottom: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  position: relative;
`;

/** 영화 제목 */
export const Name = styled.h3`
  font-size: ${({ theme }) => theme.typography.textSm};
  font-weight: ${({ theme }) => theme.typography.fontSemibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
  line-height: ${({ theme }) => theme.typography.leadingTight};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

/** 장르 태그 영역 */
export const Genres = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
  flex-wrap: wrap;
`;

/** 장르 태그 — 글래스 스타일 */
export const GenreTag = styled.span`
  font-size: ${({ theme }) => theme.typography.textXs};
  color: ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.primaryLight};
  padding: 1px 6px;
  border-radius: ${({ theme }) => theme.radius.sm};
`;

/** 개봉 연도 */
export const Year = styled.span`
  font-size: ${({ theme }) => theme.typography.textXs};
  color: ${({ theme }) => theme.colors.textMuted};
`;
