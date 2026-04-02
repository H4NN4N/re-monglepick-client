/**
 * SupportPage styled-components.
 *
 * 고객센터 페이지의 4개 섹션 레이아웃:
 *   1. FAQ (자주 묻는 질문) — 카테고리 필터 + 검색 + 아코디언 + 피드백
 *   2. 도움말 — 카테고리별 도움말 문서 카드 그리드
 *   3. 문의하기 — 상담 티켓 생성 폼
 *   4. 내 문의 내역 — 내 티켓 목록 + 상태 배지
 *
 * CSS 변수 → theme 객체로 전환.
 * 공유 믹스인/애니메이션/미디어쿼리 활용.
 */

import styled, { keyframes } from 'styled-components';
import { fadeInUp, cardShine } from '../../../shared/styles/animations';
import { gradientText } from '../../../shared/styles/mixins';
import { media } from '../../../shared/styles/media';

/* ═══════════════════════════════════
   로컬 keyframes
   ═══════════════════════════════════ */

/** FAQ 답변 / 도움말 상세 등장 — 위에서 아래로 페이드인 */
const supportFadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

/* ═══════════════════════════════════
   페이지 컨테이너
   ═══════════════════════════════════ */

/** 페이지 최외곽 래퍼 */
export const Page = styled.div`
  min-height: calc(100vh - ${({ theme }) => theme.layout.headerHeight} - ${({ theme }) => theme.layout.footerHeight});
  background-color: ${({ theme }) => theme.colors.bgMain};
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};

  ${media.tablet} {
    padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.sm};
  }
`;

/** 내부 컨테이너 — 최대 폭 제한 + 페이지 등장 애니메이션 */
export const Inner = styled.div`
  max-width: ${({ theme }) => theme.layout.contentMaxWidth};
  margin: 0 auto;
  animation: ${fadeInUp} 0.5s ease forwards;
`;

/* ═══════════════════════════════════
   페이지 헤더
   ═══════════════════════════════════ */

/** 헤더 래퍼 */
export const Header = styled.header`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

/** 페이지 제목 — gradient-text */
export const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.text3xl};
  font-weight: ${({ theme }) => theme.typography.fontBold};
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
  ${gradientText}

  ${media.tablet} {
    font-size: ${({ theme }) => theme.typography.text2xl};
  }
`;

/** 서브타이틀 */
export const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.textBase};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
`;

/* ═══════════════════════════════════
   탭 네비게이션 (섹션 전환)
   ═══════════════════════════════════ */

/** 탭 네비게이션 바 */
export const Nav = styled.nav`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderDefault};
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

/**
 * 탭 버튼.
 * $isActive prop이 true이면 primary 색상 + gradient 하단 보더.
 */
export const NavBtn = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: none;
  border: none;
  color: ${({ $isActive, theme }) => $isActive ? theme.colors.primary : theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.textBase};
  font-weight: ${({ theme }) => theme.typography.fontMedium};
  cursor: pointer;
  white-space: nowrap;
  border-bottom: 2px solid ${({ $isActive }) => $isActive ? 'currentColor' : 'transparent'};
  border-image: ${({ $isActive, theme }) => $isActive ? `${theme.gradients.primary} 1` : 'none'};
  /* text-shadow glow — theme 토큰으로 대체 */
  text-shadow: ${({ $isActive, theme }) => $isActive ? theme.shadows.glow : 'none'};
  transition: color ${({ theme }) => theme.transitions.fast},
    border-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  ${media.tablet} {
    padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme }) => theme.typography.textSm};
  }
`;

/* ═══════════════════════════════════
   공통 섹션
   ═══════════════════════════════════ */

/** 섹션 래퍼 */
export const SectionWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

/** 섹션 제목 */
export const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.textXl};
  font-weight: ${({ theme }) => theme.typography.fontSemibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
`;

/* ═══════════════════════════════════
   카테고리 필터 탭
   ═══════════════════════════════════ */

/** 카테고리 탭 래퍼 */
export const CategoryTabs = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;

  ${media.tablet} {
    /* 모바일에서 가로 스크롤 */
    overflow-x: auto;
    flex-wrap: nowrap;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

/**
 * 카테고리 탭 버튼.
 * $isActive prop이 true이면 gradient 배경 + 흰 글씨.
 */
export const CategoryTab = styled.button`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background: ${({ $isActive, theme }) => $isActive ? theme.gradients.primary : theme.colors.bgCard};
  border: 1px solid ${({ $isActive, theme }) => $isActive ? 'transparent' : theme.colors.borderDefault};
  border-radius: ${({ theme }) => theme.radius.full};
  color: ${({ $isActive, theme }) => $isActive ? 'white' : theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.textSm};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  /* 활성 탭 glow — glows.primary 토큰으로 대체 */
  box-shadow: ${({ $isActive, theme }) => $isActive ? theme.glows.primary : 'none'};
  flex-shrink: 0;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

/* ═══════════════════════════════════
   검색 바
   ═══════════════════════════════════ */

/** 검색 바 래퍼 (position: relative로 아이콘 절대 위치 지원) */
export const Search = styled.div`
  position: relative;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

/** 검색 아이콘 */
export const SearchIcon = styled.span`
  position: absolute;
  left: ${({ theme }) => theme.spacing.sm};
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.textLg};
  pointer-events: none;
`;

/** 검색 입력창 */
export const SearchInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.sm}
    ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.bgInput};
  border: 1px solid ${({ theme }) => theme.colors.borderDefault};
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.textBase};
  outline: none;
  transition: border-color ${({ theme }) => theme.transitions.fast};
  box-sizing: border-box;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  /* 포커스 — glow */
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.glows.primary};
  }
`;

/* ═══════════════════════════════════
   FAQ 아코디언
   ═══════════════════════════════════ */

/** FAQ 목록 래퍼 */
export const FaqList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

/**
 * FAQ 아이템 — glass-card + hover border glow.
 * $isOpen prop이 true이면 열린 상태 스타일.
 */
export const FaqItem = styled.div`
  background: ${({ theme }) => theme.glass.bg};
  backdrop-filter: blur(8px) saturate(1.4);
  -webkit-backdrop-filter: blur(8px) saturate(1.4);
  border: 1px solid ${({ theme }) => theme.glass.border};
  border-radius: ${({ theme }) => theme.radius.md};
  overflow: hidden;
  transition: border-color ${({ theme }) => theme.transitions.base},
    box-shadow ${({ theme }) => theme.transitions.base};

  &:hover {
    /* hover border — glass.border 토큰으로 대체 */
    border-color: ${({ theme }) => theme.glass.border};
    /* hover shadow — shadows.glow 토큰으로 대체 */
    box-shadow: ${({ theme }) => theme.shadows.glow};
  }
`;

/** FAQ 질문 버튼 */
export const FaqQuestion = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.textBase};
  font-weight: ${({ theme }) => theme.typography.fontMedium};
  text-align: left;
  cursor: pointer;
  gap: ${({ theme }) => theme.spacing.sm};

  &:hover {
    background-color: ${({ theme }) => theme.colors.bgElevated};
  }

  ${media.tablet} {
    padding: ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme }) => theme.typography.textSm};
  }
`;

/** 카테고리 배지 (FAQ 질문 내부) */
export const FaqCategoryBadge = styled.span`
  flex-shrink: 0;
  padding: 2px ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.radius.full};
  font-size: ${({ theme }) => theme.typography.textXs};
  font-weight: ${({ theme }) => theme.typography.fontMedium};

  ${media.mobile} {
    display: none;
  }
`;

/** 질문 텍스트 */
export const FaqQuestionText = styled.span`
  flex: 1;
  line-height: ${({ theme }) => theme.typography.leadingNormal};
`;

/**
 * 토글 아이콘.
 * $isOpen prop이 true이면 180도 회전.
 */
export const FaqToggle = styled.span`
  flex-shrink: 0;
  font-size: ${({ theme }) => theme.typography.textLg};
  color: ${({ theme }) => theme.colors.textMuted};
  transition: transform ${({ theme }) => theme.transitions.fast};
  transform: ${({ $isOpen }) => $isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
`;

/** FAQ 답변 영역 — 등장 애니메이션 */
export const FaqAnswer = styled.div`
  padding: 0 ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.md};
  animation: ${supportFadeIn} 0.2s ease;

  ${media.tablet} {
    padding: 0 ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.sm};
  }
`;

/** FAQ 답변 텍스트 */
export const FaqAnswerText = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.textSm};
  line-height: ${({ theme }) => theme.typography.leadingRelaxed};
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
  white-space: pre-line;
`;

/** FAQ 피드백 영역 */
export const FaqFeedback = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding-top: ${({ theme }) => theme.spacing.sm};
  border-top: 1px solid ${({ theme }) => theme.colors.borderDefault};
`;

/** FAQ 피드백 라벨 */
export const FaqFeedbackLabel = styled.span`
  font-size: ${({ theme }) => theme.typography.textXs};
  color: ${({ theme }) => theme.colors.textMuted};
`;

/**
 * FAQ 피드백 버튼.
 * $isSelected prop이 true이면 primary 배경 강조.
 */
export const FaqFeedbackBtn = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background: ${({ $isSelected, theme }) =>
    $isSelected ? theme.colors.primaryLight : 'none'};
  border: 1px solid ${({ $isSelected, theme }) =>
    $isSelected ? theme.colors.primary : theme.colors.borderDefault};
  border-radius: ${({ theme }) => theme.radius.sm};
  color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.colors.primary : theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.textXs};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

/* ═══════════════════════════════════
   빈 상태
   ═══════════════════════════════════ */

/** 빈 상태 래퍼 */
export const Empty = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.textMuted};
`;

/** 빈 상태 아이콘 */
export const EmptyIcon = styled.div`
  font-size: ${({ theme }) => theme.typography.text4xl};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  opacity: 0.5;
`;

/** 빈 상태 텍스트 */
export const EmptyText = styled.p`
  font-size: ${({ theme }) => theme.typography.textBase};
  margin: 0;
`;

/* ═══════════════════════════════════
   도움말 카드 그리드
   ═══════════════════════════════════ */

/** 도움말 카드 그리드 */
export const HelpGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};

  ${media.tablet} {
    grid-template-columns: 1fr;
  }
`;

/**
 * 도움말 카드 — glass-card + hover shine.
 * ::before 슈도엘리먼트로 빛 지나가기 효과.
 */
export const HelpCard = styled.div`
  background: ${({ theme }) => theme.glass.bg};
  backdrop-filter: blur(8px) saturate(1.4);
  -webkit-backdrop-filter: blur(8px) saturate(1.4);
  border: 1px solid ${({ theme }) => theme.glass.border};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: ${({ theme }) => theme.spacing.md};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  position: relative;
  overflow: hidden;

  /* hover shine */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 50%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent);
    pointer-events: none;
  }

  &:hover::before {
    animation: ${cardShine} 0.8s ease forwards;
  }

  &:hover {
    /* hover border — glass.border 토큰으로 대체 */
    border-color: ${({ theme }) => theme.glass.border};
    transform: translateY(-4px);
    /* hover glow — glows.primary 토큰으로 대체 */
    box-shadow: ${({ theme }) => theme.shadows.lg}, ${({ theme }) => theme.glows.primary};
  }

  ${media.mobile} {
    padding: ${({ theme }) => theme.spacing.sm};
  }
`;

/** 도움말 카드 헤더 */
export const HelpCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

/** 도움말 카드 제목 */
export const HelpCardTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.textBase};
  font-weight: ${({ theme }) => theme.typography.fontSemibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
  flex: 1;
  line-height: ${({ theme }) => theme.typography.leadingTight};
`;

/** 도움말 카드 조회수 */
export const HelpCardViews = styled.span`
  font-size: ${({ theme }) => theme.typography.textXs};
  color: ${({ theme }) => theme.colors.textMuted};
  flex-shrink: 0;
  margin-left: ${({ theme }) => theme.spacing.sm};
`;

/** 도움말 카드 카테고리 배지 */
export const HelpCardCategory = styled.span`
  display: inline-block;
  padding: 2px ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.radius.full};
  font-size: ${({ theme }) => theme.typography.textXs};
  font-weight: ${({ theme }) => theme.typography.fontMedium};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

/** 도움말 카드 미리보기 텍스트 — 2줄 말줄임 */
export const HelpCardPreview = styled.p`
  font-size: ${({ theme }) => theme.typography.textSm};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: ${({ theme }) => theme.typography.leadingNormal};
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

/* ═══════════════════════════════════
   도움말 상세 (expanded content)
   ═══════════════════════════════════ */

/** 도움말 상세 패널 — 등장 애니메이션 */
export const HelpDetail = styled.div`
  background-color: ${({ theme }) => theme.colors.bgCard};
  border: 1px solid ${({ theme }) => theme.colors.borderDefault};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  animation: ${supportFadeIn} 0.2s ease;

  ${media.tablet} {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

/** 도움말 상세 헤더 */
export const HelpDetailHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

/** 도움말 상세 제목 */
export const HelpDetailTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.textXl};
  font-weight: ${({ theme }) => theme.typography.fontSemibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
  flex: 1;
`;

/** 도움말 상세 닫기 버튼 */
export const HelpDetailClose = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.textXl};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.xs};
  line-height: 1;
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

/** 도움말 상세 본문 */
export const HelpDetailContent = styled.div`
  font-size: ${({ theme }) => theme.typography.textBase};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: ${({ theme }) => theme.typography.leadingRelaxed};
  white-space: pre-line;
`;

/* ═══════════════════════════════════
   문의하기 폼
   ═══════════════════════════════════ */

/** 티켓 폼 — glass-card */
export const TicketForm = styled.form`
  background: ${({ theme }) => theme.glass.bg};
  backdrop-filter: blur(8px) saturate(1.4);
  -webkit-backdrop-filter: blur(8px) saturate(1.4);
  border: 1px solid ${({ theme }) => theme.glass.border};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: ${({ theme }) => theme.spacing.lg};

  ${media.tablet} {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

/** 폼 그룹 (라벨 + 입력 세트) */
export const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

/** 폼 라벨 */
export const FormLabel = styled.label`
  display: block;
  font-size: ${({ theme }) => theme.typography.textSm};
  font-weight: ${({ theme }) => theme.typography.fontMedium};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

/** 필수 항목 표시 */
export const FormRequired = styled.span`
  color: ${({ theme }) => theme.colors.error};
  margin-left: 2px;
`;

/** 폼 셀렉트 — 커스텀 화살표 */
export const FormSelect = styled.select`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.bgInput};
  border: 1px solid ${({ theme }) => theme.colors.borderDefault};
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.textBase};
  outline: none;
  cursor: pointer;
  transition: border-color ${({ theme }) => theme.transitions.fast};
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%238888a0' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right ${({ theme }) => theme.spacing.sm} center;
  padding-right: ${({ theme }) => theme.spacing.xl};

  /* 포커스 — glow */
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.glows.primary};
  }
`;

/** 폼 텍스트 입력 */
export const FormInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.bgInput};
  border: 1px solid ${({ theme }) => theme.colors.borderDefault};
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.textBase};
  outline: none;
  transition: border-color ${({ theme }) => theme.transitions.fast};
  box-sizing: border-box;

  /* 포커스 — glow */
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.glows.primary};
  }
`;

/** 폼 텍스트에어리어 */
export const FormTextarea = styled.textarea`
  width: 100%;
  min-height: 150px;
  padding: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.bgInput};
  border: 1px solid ${({ theme }) => theme.colors.borderDefault};
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.textBase};
  font-family: inherit;
  outline: none;
  resize: vertical;
  transition: border-color ${({ theme }) => theme.transitions.fast};
  box-sizing: border-box;

  /* 포커스 — glow */
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.glows.primary};
  }
`;

/** 폼 힌트 텍스트 */
export const FormHint = styled.p`
  font-size: ${({ theme }) => theme.typography.textXs};
  color: ${({ theme }) => theme.colors.textMuted};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

/** 폼 에러 텍스트 */
export const FormError = styled.p`
  font-size: ${({ theme }) => theme.typography.textXs};
  color: ${({ theme }) => theme.colors.error};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

/**
 * 글자수 카운터.
 * $isOver prop이 true이면 error 색상으로 표시.
 */
export const FormCharCount = styled.p`
  font-size: ${({ theme }) => theme.typography.textXs};
  color: ${({ $isOver, theme }) => $isOver ? theme.colors.error : theme.colors.textMuted};
  text-align: right;
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

/** 폼 제출 버튼 — gradient + glow hover */
export const SubmitBtn = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.gradients.primary};
  border: none;
  border-radius: ${({ theme }) => theme.radius.md};
  color: white;
  font-size: ${({ theme }) => theme.typography.textBase};
  font-weight: ${({ theme }) => theme.typography.fontSemibold};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover:not(:disabled) {
    box-shadow: ${({ theme }) => theme.glows.primary};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

/* ═══════════════════════════════════
   문의 성공 메시지
   ═══════════════════════════════════ */

/** 문의 성공 패널 */
export const TicketSuccess = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.bgCard};
  border: 1px solid ${({ theme }) => theme.colors.success};
  border-radius: ${({ theme }) => theme.radius.md};
`;

/** 성공 아이콘 */
export const TicketSuccessIcon = styled.div`
  font-size: ${({ theme }) => theme.typography.text4xl};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.success};
`;

/** 성공 제목 */
export const TicketSuccessTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.textXl};
  font-weight: ${({ theme }) => theme.typography.fontSemibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
`;

/** 성공 설명 텍스트 */
export const TicketSuccessText = styled.p`
  font-size: ${({ theme }) => theme.typography.textSm};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
`;

/** 성공 후 돌아가기 버튼 */
export const TicketSuccessBtn = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.primary};
  border: none;
  border-radius: ${({ theme }) => theme.radius.md};
  color: white;
  font-size: ${({ theme }) => theme.typography.textSm};
  font-weight: ${({ theme }) => theme.typography.fontMedium};
  cursor: pointer;
  transition: background-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }
`;

/* ═══════════════════════════════════
   로그인 유도
   ═══════════════════════════════════ */

/** 로그인 유도 패널 */
export const LoginPrompt = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.bgCard};
  border: 1px solid ${({ theme }) => theme.colors.borderDefault};
  border-radius: ${({ theme }) => theme.radius.md};
`;

/** 로그인 유도 텍스트 */
export const LoginPromptText = styled.p`
  font-size: ${({ theme }) => theme.typography.textBase};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
`;

/** 로그인 유도 링크 버튼 */
export const LoginPromptLink = styled.a`
  display: inline-block;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.primary};
  border: none;
  border-radius: ${({ theme }) => theme.radius.md};
  color: white;
  font-size: ${({ theme }) => theme.typography.textSm};
  font-weight: ${({ theme }) => theme.typography.fontMedium};
  text-decoration: none;
  transition: background-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }
`;

/* ═══════════════════════════════════
   티켓 목록
   ═══════════════════════════════════ */

/** 티켓 목록 래퍼 */
export const TicketList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

/** 티켓 아이템 */
export const TicketItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.bgCard};
  border: 1px solid ${({ theme }) => theme.colors.borderDefault};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: ${({ theme }) => theme.spacing.md};
  gap: ${({ theme }) => theme.spacing.sm};

  ${media.tablet} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

/** 티켓 정보 영역 */
export const TicketInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

/** 티켓 제목 — 말줄임 처리 */
export const TicketTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.textBase};
  font-weight: ${({ theme }) => theme.typography.fontMedium};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

/** 티켓 메타 정보 (카테고리 + 날짜) */
export const TicketMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`;

/** 티켓 카테고리 배지 */
export const TicketCategoryBadge = styled.span`
  padding: 2px ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.radius.full};
  font-size: ${({ theme }) => theme.typography.textXs};
  font-weight: ${({ theme }) => theme.typography.fontMedium};
`;

/** 티켓 날짜 */
export const TicketDate = styled.span`
  font-size: ${({ theme }) => theme.typography.textXs};
  color: ${({ theme }) => theme.colors.textMuted};
`;

/**
 * 티켓 상태 배지.
 * $status prop 값에 따라 색상이 달라진다:
 *   OPEN → info, IN_PROGRESS → warning, RESOLVED → success, CLOSED → muted
 */
export const TicketStatus = styled.span`
  flex-shrink: 0;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radius.full};
  font-size: ${({ theme }) => theme.typography.textXs};
  font-weight: ${({ theme }) => theme.typography.fontSemibold};

  ${({ $status, theme }) => {
    switch ($status) {
      case 'OPEN':
        return `
          background-color: ${theme.colors.infoBg};
          color: ${theme.colors.info};
        `;
      case 'IN_PROGRESS':
        return `
          background-color: ${theme.colors.warningBg};
          color: ${theme.colors.warning};
        `;
      case 'RESOLVED':
        return `
          background-color: ${theme.colors.successBg};
          color: ${theme.colors.success};
        `;
      case 'CLOSED':
        return `
          background-color: rgba(85, 85, 112, 0.15);
          color: ${theme.colors.textMuted};
        `;
      default:
        return `
          background-color: ${theme.colors.bgElevated};
          color: ${theme.colors.textMuted};
        `;
    }
  }}

  ${media.tablet} {
    align-self: flex-start;
  }
`;

/* ═══════════════════════════════════
   페이지네이션
   ═══════════════════════════════════ */

/** 페이지네이션 래퍼 */
export const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

/** 페이지네이션 버튼 */
export const PaginationBtn = styled.button`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.bgCard};
  border: 1px solid ${({ theme }) => theme.colors.borderDefault};
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.textSm};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

/** 페이지네이션 정보 텍스트 */
export const PaginationInfo = styled.span`
  font-size: ${({ theme }) => theme.typography.textSm};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

/* ═══════════════════════════════════
   글로벌 에러 메시지
   ═══════════════════════════════════ */

/** 글로벌 에러 배너 */
export const ErrorMsg = styled.div`
  background-color: ${({ theme }) => theme.colors.errorBg};
  border: 1px solid ${({ theme }) => theme.colors.error};
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ theme }) => theme.colors.error};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.textSm};
`;
