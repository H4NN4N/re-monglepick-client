import styled, { keyframes } from 'styled-components';
import { glassCard, gradientText } from '../../../shared/styles/mixins';
import { media } from '../../../shared/styles/media';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulseGlow = keyframes`
  0%, 100% {
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
  50% {
    box-shadow: ${({ theme }) => theme.shadows.lg}, ${({ theme }) => theme.glows.primary};
  }
`;

export const Container = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.layout.contentMaxWidth};
  margin: 0 auto;
  padding: ${({ theme }) => `${theme.spacing.xl} ${theme.spacing.lg} ${theme.spacing.xxxl}`};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
  animation: ${fadeIn} 0.35s ease;

  ${media.tablet} {
    padding: ${({ theme }) => `${theme.spacing.lg} ${theme.spacing.md} ${theme.spacing.xxxl}`};
  }
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const PageTitle = styled.h1`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.text3xl};
  font-weight: ${({ theme }) => theme.typography.fontBold};
  ${gradientText}
`;

export const Subtitle = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.textBase};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const FeaturedSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 220px));
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.lg};

  ${media.desktop} {
    grid-template-columns: repeat(auto-fit, minmax(170px, 210px));
  }

  ${media.tablet} {
    grid-template-columns: repeat(auto-fit, minmax(150px, 190px));
  }
`;

export const CategoryItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const CategoryPoster = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  background:
    radial-gradient(circle at top, ${({ theme }) => theme.colors.primaryLight}, transparent 58%),
    ${({ theme }) => theme.colors.bgElevated};
  transition:
    transform ${({ theme }) => theme.transitions.base},
    filter ${({ theme }) => theme.transitions.base};
`;

export const CategoryPosterFallback = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background:
    radial-gradient(circle at top, ${({ theme }) => theme.colors.primaryLight}, transparent 58%),
    ${({ theme }) => theme.colors.bgElevated};
  font-size: clamp(52px, 7vw, 72px);
  line-height: 1;
  transition:
    transform ${({ theme }) => theme.transitions.base},
    filter ${({ theme }) => theme.transitions.base};
`;

export const CategoryOverlay = styled.div`
  position: absolute;
  inset: 0;
  background:
    linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.1) 0%,
      ${({ $disabled, theme }) => ($disabled ? 'rgba(10, 10, 18, 0.68)' : theme.colors.primary)} 100%
    );
  opacity: ${({ $disabled }) => ($disabled ? 0.84 : 0.78)};
  transition: opacity ${({ theme }) => theme.transitions.base};
`;

export const CategoryCard = styled.button`
  position: relative;
  width: 100%;
  aspect-ratio: 2 / 3;
  border: 1px solid ${({ theme }) => theme.colors.borderDefault};
  border-radius: ${({ theme }) => theme.radius.xl};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.bgSecondary};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  transition:
    transform ${({ theme }) => theme.transitions.base},
    box-shadow ${({ theme }) => theme.transitions.base},
    border-color ${({ theme }) => theme.transitions.base};

  ${CategoryPoster} {
    filter: ${({ $disabled }) => ($disabled ? 'grayscale(1)' : 'none')};
  }

  ${CategoryPosterFallback} {
    filter: ${({ $disabled }) => ($disabled ? 'grayscale(1)' : 'none')};
  }

  &:hover {
    ${({ $disabled, theme }) => (!$disabled ? `
      transform: translateY(-4px);
      border-color: ${theme.colors.primary};
      box-shadow: ${theme.shadows.xl}, ${theme.glows.primary};
    ` : '')}
  }

  &:hover ${CategoryPoster} {
    ${({ $disabled }) => (!$disabled ? 'transform: scale(1.06); filter: blur(2px);' : '')}
  }

  &:hover ${CategoryPosterFallback} {
    ${({ $disabled }) => (!$disabled ? 'transform: scale(1.06); filter: blur(1px);' : '')}
  }

  &:hover ${CategoryOverlay} {
    ${({ $disabled }) => (!$disabled ? 'opacity: 0.9;' : '')}
  }
`;

export const CategoryTitle = styled.span`
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.lg};
  color: #fff;
  font-size: ${({ theme }) => theme.typography.textXl};
  font-weight: ${({ theme }) => theme.typography.fontBold};
  line-height: ${({ theme }) => theme.typography.leadingTight};
  text-shadow: 0 2px 16px rgba(0, 0, 0, 0.48);
  text-align: center;
`;

export const CategoryDescription = styled.p`
  margin: 0;
  min-height: 20px;
  font-size: ${({ theme }) => theme.typography.textSm};
  color: ${({ theme }) => theme.colors.textSecondary};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const SelectionPanel = styled.section`
  ${glassCard}
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const SelectionTitle = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.textXl};
  font-weight: ${({ theme }) => theme.typography.fontBold};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const SelectionMeta = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.textSm};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: ${({ theme }) => theme.typography.leadingNormal};
`;

export const RoundChoiceRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const RoundChoiceButton = styled.button`
  min-width: 88px;
  padding: 12px 16px;
  border-radius: ${({ theme }) => theme.radius.full};
  border: 1px solid ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.borderDefault)};
  background: ${({ $active, theme }) => ($active ? theme.colors.primaryLight : theme.colors.bgCard)};
  color: ${({ $active, theme }) => ($active ? theme.colors.textPrimary : theme.colors.textSecondary)};
  font-size: ${({ theme }) => theme.typography.textSm};
  font-weight: ${({ theme }) => theme.typography.fontSemibold};
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

export const PrimaryActionButton = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  width: 100%;
  min-height: 52px;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.gradients.primary};
  color: #fff;
  font-size: ${({ theme }) => theme.typography.textBase};
  font-weight: ${({ theme }) => theme.typography.fontBold};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  transition: transform ${({ theme }) => theme.transitions.fast}, opacity ${({ theme }) => theme.transitions.fast};

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    opacity: 0.94;
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`;

export const SecondaryActionButton = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 52px;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.colors.bgCard};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.textBase};
  font-weight: ${({ theme }) => theme.typography.fontSemibold};
  border: 1px solid ${({ theme }) => theme.colors.borderDefault};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const MoreLinkButton = styled.button`
  width: fit-content;
  align-self: center;
  margin-top: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.textSm};
  font-weight: ${({ theme }) => theme.typography.fontSemibold};
  text-decoration: underline;
  text-underline-offset: 3px;

  &:hover {
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

export const ExtraSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const ExtraSectionTitle = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.textLg};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const DividerRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const DividerLine = styled.div`
  flex: 1;
  height: 1px;
  background: ${({ theme }) => theme.colors.borderDefault};
`;

export const DividerText = styled.span`
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.textSm};
`;

export const CustomEntrySection = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const CustomBuilderToggle = styled.button`
  width: 100%;
  min-height: 64px;
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radius.xl};
  border: 1px dashed ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.borderDefault)};
  background:
    radial-gradient(circle at top, ${({ theme }) => theme.colors.primaryLight}, transparent 65%),
    ${({ theme }) => theme.colors.bgSecondary};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.textLg};
  font-weight: ${({ theme }) => theme.typography.fontBold};
  transition: all ${({ theme }) => theme.transitions.base};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

export const CustomBuilderPanel = styled.section`
  ${glassCard}
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const GenreChipGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const GenreChip = styled.button`
  padding: 10px 14px;
  border-radius: ${({ theme }) => theme.radius.full};
  border: 1px solid ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.borderDefault)};
  background: ${({ $active, theme }) => ($active ? theme.colors.primaryLight : theme.colors.bgCard)};
  color: ${({ $active, theme }) => ($active ? theme.colors.textPrimary : theme.colors.textSecondary)};
  font-size: ${({ theme }) => theme.typography.textSm};
  font-weight: ${({ theme }) => theme.typography.fontMedium};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

export const BuilderSummary = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.bgSecondary};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.textSm};
  line-height: ${({ theme }) => theme.typography.leadingNormal};
`;

export const BattleSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const RoundStatus = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
`;

export const RoundBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 88px;
  height: 38px;
  padding: 0 16px;
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.gradients.primary};
  color: #fff;
  font-size: ${({ theme }) => theme.typography.textSm};
  font-weight: ${({ theme }) => theme.typography.fontBold};
`;

export const RoundCounter = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.textSm};
`;

export const ProgressTrack = styled.div`
  width: 100%;
  height: 10px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.bgSecondary};
  overflow: hidden;
`;

export const ProgressFill = styled.div`
  height: 100%;
  border-radius: inherit;
  background: ${({ theme }) => theme.gradients.primary};
  transition: width ${({ theme }) => theme.transitions.base};
`;

export const BattleGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 280px) auto minmax(0, 280px);
  gap: ${({ theme }) => theme.spacing.lg};
  align-items: center;
  justify-content: center;

  ${media.tablet} {
    grid-template-columns: 1fr;
    justify-items: center;
  }
`;

export const MovieCard = styled.button`
  position: relative;
  display: flex;
  flex-direction: column;
  width: min(100%, 280px);
  border-radius: ${({ theme }) => theme.radius.xl};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.bgSecondary};
  border: 1px solid ${({ theme }) => theme.colors.borderDefault};
  transition: transform ${({ theme }) => theme.transitions.base}, box-shadow ${({ theme }) => theme.transitions.base};

  &:hover:not(:disabled) {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.xl}, ${({ theme }) => theme.glows.primary};
  }

  &:hover:not(:disabled) [data-role='movie-poster'],
  &:focus-visible [data-role='movie-poster'] {
    transform: scale(1.04);
    filter: blur(3px) brightness(0.42) saturate(0.82);
  }

  &:hover:not(:disabled) [data-role='movie-overview-overlay'],
  &:focus-visible [data-role='movie-overview-overlay'] {
    opacity: 1;
  }

  &:disabled {
    cursor: wait;
    opacity: 0.8;
  }
`;

export const MoviePosterFrame = styled.div`
  position: relative;
  overflow: hidden;
`;

export const MoviePoster = styled.img.attrs({
  'data-role': 'movie-poster',
})`
  width: 100%;
  aspect-ratio: 2 / 3;
  object-fit: cover;
  background:
    radial-gradient(circle at top, ${({ theme }) => theme.colors.primaryLight}, transparent 58%),
    ${({ theme }) => theme.colors.bgElevated};
  transition:
    transform ${({ theme }) => theme.transitions.base},
    filter ${({ theme }) => theme.transitions.base};
`;

export const MovieOverviewOverlay = styled.div.attrs({
  'data-role': 'movie-overview-overlay',
})`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.lg};
  background:
    linear-gradient(
      180deg,
      rgba(6, 8, 16, 0.18) 0%,
      rgba(6, 8, 16, 0.74) 36%,
      rgba(6, 8, 16, 0.92) 100%
    );
  color: #fff;
  opacity: 0;
  transition: opacity ${({ theme }) => theme.transitions.base};
  pointer-events: none;
`;

export const MovieOverviewLabel = styled.span`
  display: inline-flex;
  width: fit-content;
  align-items: center;
  padding: 6px 10px;
  border-radius: ${({ theme }) => theme.radius.full};
  background: rgba(255, 255, 255, 0.14);
  color: rgba(255, 255, 255, 0.92);
  font-size: ${({ theme }) => theme.typography.textXs};
  font-weight: ${({ theme }) => theme.typography.fontBold};
  letter-spacing: 0.02em;
`;

export const MovieOverviewText = styled.p`
  margin: 0;
  color: rgba(255, 255, 255, 0.96);
  font-size: ${({ theme }) => theme.typography.textSm};
  line-height: 1.6;
  text-shadow: 0 2px 16px rgba(0, 0, 0, 0.45);
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 7;
  -webkit-box-orient: vertical;
`;

export const MovieInfo = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: 6px;
  text-align: left;
`;

export const MovieName = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.textLg};
  font-weight: ${({ theme }) => theme.typography.fontBold};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const MovieMeta = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.textSm};
  line-height: ${({ theme }) => theme.typography.leadingNormal};
`;

export const VsBadge = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.error};
  color: #fff;
  font-size: ${({ theme }) => theme.typography.textLg};
  font-weight: ${({ theme }) => theme.typography.fontBold};
  animation: ${pulseGlow} 1.8s ease-in-out infinite;

  ${media.tablet} {
    justify-self: center;
  }
`;

export const ResultSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

export const ResultHero = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const ResultLabel = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.textSm};
  font-weight: ${({ theme }) => theme.typography.fontBold};
`;

export const WinnerCard = styled.div`
  ${glassCard}
  padding: ${({ theme }) => theme.spacing.md};
  display: grid;
  grid-template-columns: 180px minmax(0, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};
  align-items: center;

  ${media.tablet} {
    grid-template-columns: 1fr;
  }
`;

export const RunnerUpSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const RunnerUpCard = styled.div`
  ${glassCard}
  padding: ${({ theme }) => theme.spacing.md};
  display: grid;
  grid-template-columns: 120px minmax(0, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};
  align-items: center;

  ${media.tablet} {
    grid-template-columns: 1fr;
  }
`;

export const ResultPoster = styled.img`
  width: 100%;
  aspect-ratio: 2 / 3;
  border-radius: ${({ theme }) => theme.radius.lg};
  object-fit: cover;
  background:
    radial-gradient(circle at top, ${({ theme }) => theme.colors.primaryLight}, transparent 58%),
    ${({ theme }) => theme.colors.bgElevated};
`;

export const ResultInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const ResultMovieTitle = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.text2xl};
  font-weight: ${({ theme }) => theme.typography.fontBold};
`;

export const PreferenceSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const SectionTitle = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.textLg};
  font-weight: ${({ theme }) => theme.typography.fontBold};
`;

export const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const PreferenceTag = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 8px 12px;
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.textSm};
  font-weight: ${({ theme }) => theme.typography.fontSemibold};
`;

export const PreferenceList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const PreferenceItem = styled.div`
  display: grid;
  grid-template-columns: 88px minmax(0, 1fr) 52px;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;

  ${media.mobile} {
    grid-template-columns: 72px minmax(0, 1fr) 44px;
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

export const PreferenceGenre = styled.span`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.textSm};
  font-weight: ${({ theme }) => theme.typography.fontSemibold};
`;

export const PreferenceBarTrack = styled.div`
  width: 100%;
  height: 12px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.bgSecondary};
  overflow: hidden;
`;

export const PreferenceBarFill = styled.div`
  height: 100%;
  border-radius: inherit;
  background: ${({ theme }) => theme.gradients.primary};
`;

export const PreferenceScore = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.textSm};
  text-align: right;
`;

export const ResultActionRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing.md};

  ${media.tablet} {
    grid-template-columns: 1fr;
  }
`;

export const StatusText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.textSm};
`;

export const ErrorText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.typography.textSm};
`;

export const EmptyState = styled.div`
  ${glassCard}
  padding: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.textSm};
  text-align: center;
`;

export const CategoryModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.lg};
  background: rgba(8, 10, 20, 0.72);
  backdrop-filter: blur(10px);

  ${media.tablet} {
    padding: ${({ theme }) => theme.spacing.md};
    align-items: stretch;
  }
`;

export const CategoryModalCard = styled.div`
  ${glassCard}
  width: min(1120px, 100%);
  max-height: min(88vh, 920px);
  padding: ${({ theme }) => theme.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  overflow: hidden;

  ${media.tablet} {
    max-height: none;
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

export const CategoryModalHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};

  ${media.tablet} {
    flex-direction: column;
  }
`;

export const CategoryModalTitle = styled.h2`
  margin: 0 0 6px;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.text2xl};
  font-weight: ${({ theme }) => theme.typography.fontBold};
`;

export const CategoryModalDesc = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.textSm};
  line-height: ${({ theme }) => theme.typography.leadingNormal};
`;

export const CategoryModalCloseButton = styled.button`
  flex-shrink: 0;
  min-height: 42px;
  padding: 0 ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radius.full};
  border: 1px solid ${({ theme }) => theme.colors.borderDefault};
  background: ${({ theme }) => theme.colors.bgCard};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.textSm};
  font-weight: ${({ theme }) => theme.typography.fontSemibold};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const CategorySearchInput = styled.input`
  width: 100%;
  min-height: 52px;
  padding: 0 ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radius.full};
  border: 1px solid ${({ theme }) => theme.colors.borderDefault};
  background: ${({ theme }) => theme.colors.bgSecondary};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.textBase};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primaryLight};
  }
`;

export const CategoryModalGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 220px));
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.lg};
  overflow-y: auto;
  padding-right: 4px;

  ${media.desktop} {
    grid-template-columns: repeat(auto-fit, minmax(170px, 210px));
  }

  ${media.tablet} {
    grid-template-columns: repeat(auto-fit, minmax(150px, 190px));
  }
`;
