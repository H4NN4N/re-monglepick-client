/**
 * 정보구조도(IA) 모달 컴포넌트.
 *
 * monglepick-ia.jsx 기반으로 서비스 전체 정보 구조(IA)를 트리 형태로 시각화한다.
 * 모달 오버레이 + ESC 닫기 + 스크롤 잠금 지원.
 */

import { useState, useCallback, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

/* ── IA 데이터 (정보구조도 전체 트리) ── */
const IA_DATA = {
  id: 'root',
  label: '몽글픽',
  desc: 'AI 기반 한국 영화 추천 서비스',
  icon: '🎬',
  color: '#FF6B35',
  children: [
    {
      id: 'home', label: '홈', desc: '메인 랜딩 페이지', icon: '🏠', color: '#4ECDC4',
      children: [
        { id: 'home-banner', label: '히어로 배너', desc: '추천 영화 캐러셀', icon: '🖼️' },
        { id: 'home-personalized', label: '맞춤 추천', desc: 'AI 개인화 추천 섹션', icon: '🤖' },
        { id: 'home-trending', label: '실시간 트렌드', desc: '인기 급상승 영화', icon: '🔥' },
        { id: 'home-genre', label: '장르별 큐레이션', desc: '장르 기반 영화 모음', icon: '🎭' },
        { id: 'home-new', label: '신작 알림', desc: '최신 개봉작 정보', icon: '🆕' },
      ],
    },
    {
      id: 'search', label: '탐색 / 검색', desc: '영화 검색 및 필터링', icon: '🔍', color: '#45B7D1',
      children: [
        {
          id: 'search-ai', label: 'AI 자연어 검색', desc: '대화형 영화 검색', icon: '💬',
          children: [
            { id: 'search-ai-chat', label: '챗봇 대화', desc: '멀티턴 대화 기반 추천', icon: '🗣️' },
            { id: 'search-ai-context', label: '상황 기반 추천', desc: '기분/상황별 영화 추천', icon: '🎯' },
          ],
        },
        {
          id: 'search-filter', label: '상세 필터 검색', desc: '조건 기반 검색', icon: '⚙️',
          children: [
            { id: 'filter-genre', label: '장르 필터', desc: '액션, 드라마, 코미디 등', icon: '🏷️' },
            { id: 'filter-year', label: '연도 필터', desc: '개봉연도 범위 선택', icon: '📅' },
            { id: 'filter-rating', label: '평점 필터', desc: '최소 평점 설정', icon: '⭐' },
            { id: 'filter-cast', label: '출연진 필터', desc: '배우/감독 기반 검색', icon: '🎬' },
          ],
        },
        { id: 'search-keyword', label: '키워드 검색', desc: 'Elasticsearch 기반', icon: '🔤' },
        { id: 'search-similar', label: '유사 영화 탐색', desc: '벡터 유사도 기반', icon: '🔗' },
      ],
    },
    {
      id: 'movie', label: '영화 상세', desc: '개별 영화 정보 페이지', icon: '🎥', color: '#96CEB4',
      children: [
        { id: 'movie-info', label: '기본 정보', desc: '포스터, 줄거리, 출연진, 감독', icon: 'ℹ️' },
        { id: 'movie-review', label: '리뷰 / 평점', desc: '사용자 리뷰 및 AI 요약', icon: '📝' },
        { id: 'movie-ott', label: 'OTT 정보', desc: '시청 가능 플랫폼 안내', icon: '📺' },
        { id: 'movie-related', label: '연관 영화', desc: 'Neo4j 그래프 기반 추천', icon: '🔀' },
        { id: 'movie-behind', label: '비하인드 / 트리비아', desc: 'RAG 기반 부가 정보', icon: '🎞️' },
        { id: 'movie-trailer', label: '예고편', desc: '영상 미리보기', icon: '▶️' },
      ],
    },
    {
      id: 'recommend', label: 'AI 추천', desc: '멀티 에이전트 추천 시스템', icon: '🧠', color: '#FFEAA7',
      children: [
        {
          id: 'rec-agents', label: '추천 에이전트', desc: 'LangGraph 멀티 에이전트', icon: '🤖',
          children: [
            { id: 'agent-profile', label: '프로필 분석 Agent', desc: '사용자 취향 분석', icon: '👤' },
            { id: 'agent-content', label: '콘텐츠 분석 Agent', desc: '영화 콘텐츠 분석', icon: '📊' },
            { id: 'agent-collab', label: '협업 필터링 Agent', desc: '유사 사용자 기반', icon: '👥' },
            { id: 'agent-context', label: '컨텍스트 Agent', desc: '시간/상황 기반 추천', icon: '🌐' },
          ],
        },
        { id: 'rec-daily', label: '오늘의 추천', desc: '일일 맞춤 추천 리스트', icon: '📋' },
        { id: 'rec-theme', label: '테마별 추천', desc: '큐레이션 테마 추천', icon: '🎨' },
        { id: 'rec-taste', label: '취향 분석 리포트', desc: '사용자 취향 시각화', icon: '📈' },
      ],
    },
    {
      id: 'community', label: '커뮤니티', desc: '사용자 소통 공간', icon: '👥', color: '#DDA0DD',
      children: [
        { id: 'comm-review', label: '리뷰 게시판', desc: '영화 리뷰 작성/공유', icon: '✍️' },
        { id: 'comm-discussion', label: '토론방', desc: '영화 주제 토론', icon: '💬' },
        { id: 'comm-list', label: '공유 리스트', desc: '사용자 추천 리스트 공유', icon: '📋' },
        { id: 'comm-challenge', label: '영화 챌린지', desc: '시청 챌린지 이벤트', icon: '🏆' },
      ],
    },
    {
      id: 'mypage', label: '마이페이지', desc: '개인 설정 및 활동 관리', icon: '👤', color: '#F8B500',
      children: [
        {
          id: 'my-profile', label: '프로필 관리', desc: '계정 및 취향 설정', icon: '⚙️',
          children: [
            { id: 'profile-info', label: '기본 정보', desc: '닉네임, 프로필 이미지', icon: '📛' },
            { id: 'profile-taste', label: '취향 설정', desc: '선호 장르/감독/분위기', icon: '🎯' },
            { id: 'profile-noti', label: '알림 설정', desc: '추천/신작 알림 관리', icon: '🔔' },
          ],
        },
        {
          id: 'my-activity', label: '활동 기록', desc: '시청 및 활동 이력', icon: '📊',
          children: [
            { id: 'act-watched', label: '시청 기록', desc: '본 영화 목록', icon: '👁️' },
            { id: 'act-rated', label: '평가 기록', desc: '평점 준 영화 목록', icon: '⭐' },
            { id: 'act-review', label: '작성 리뷰', desc: '내가 쓴 리뷰 관리', icon: '📝' },
          ],
        },
        { id: 'my-wishlist', label: '위시리스트', desc: '찜한 영화 목록', icon: '❤️' },
        { id: 'my-collection', label: '내 컬렉션', desc: '커스텀 영화 모음집', icon: '📁' },
      ],
    },
    {
      id: 'admin', label: '관리자', desc: '서비스 운영 관리', icon: '🛡️', color: '#E17055',
      children: [
        { id: 'admin-dashboard', label: '대시보드', desc: '서비스 현황 모니터링', icon: '📊' },
        { id: 'admin-movie', label: '영화 데이터 관리', desc: '영화 CRUD / 크롤링 관리', icon: '🎬' },
        { id: 'admin-user', label: '사용자 관리', desc: '회원 관리 / 제재', icon: '👥' },
        { id: 'admin-agent', label: 'AI 에이전트 관리', desc: 'LangSmith 모니터링', icon: '🤖' },
        { id: 'admin-content', label: '콘텐츠 관리', desc: '리뷰/게시글 관리', icon: '📋' },
        { id: 'admin-stats', label: '통계 / 분석', desc: '사용자 행동 분석', icon: '📈' },
      ],
    },
    {
      id: 'auth', label: '인증', desc: '로그인 / 회원가입', icon: '🔐', color: '#A29BFE',
      children: [
        { id: 'auth-login', label: '로그인', desc: '이메일/소셜 로그인', icon: '🔑' },
        { id: 'auth-register', label: '회원가입', desc: '가입 및 취향 온보딩', icon: '📝' },
        { id: 'auth-social', label: '소셜 로그인', desc: '카카오/네이버/구글', icon: '🌐' },
        { id: 'auth-recover', label: '계정 복구', desc: '비밀번호 재설정', icon: '🔄' },
      ],
    },
  ],
};

/* ── 유틸: 노드 수 / 리프 수 / 최대 깊이 계산 ── */
function countNodes(node) {
  let c = 1;
  if (node.children) node.children.forEach(ch => (c += countNodes(ch)));
  return c;
}
function countLeaves(node) {
  if (!node.children || node.children.length === 0) return 1;
  let c = 0;
  node.children.forEach(ch => (c += countLeaves(ch)));
  return c;
}
function getMaxDepth(node, d = 0) {
  if (!node.children || node.children.length === 0) return d;
  return Math.max(...node.children.map(ch => getMaxDepth(ch, d + 1)));
}

/* ── 트리 노드 재귀 렌더 ── */
function TreeNode({ node, depth = 0, parentColor, isLast, onSelect, selectedId }) {
  const [expanded, setExpanded] = useState(depth < 1);
  const hasChildren = node.children && node.children.length > 0;
  const nodeColor = node.color || parentColor || '#888';
  const isSelected = selectedId === node.id;

  const toggle = useCallback((e) => {
    e.stopPropagation();
    if (hasChildren) setExpanded(p => !p);
    onSelect(node);
  }, [hasChildren, node, onSelect]);

  return (
    <TreeNodeWrap $depth={depth}>
      {/* 수직 연결선 */}
      {depth > 0 && <TreeVLine $color={parentColor} $isLast={isLast} />}
      {/* 수평 연결선 */}
      {depth > 0 && <TreeHLine $color={parentColor} />}

      {/* 노드 본체 */}
      <TreeNodeBody onClick={toggle} $selected={isSelected} $color={nodeColor}>
        {/* 아이콘 */}
        <TreeIcon $depth={depth} $color={nodeColor} $selected={isSelected}>
          {node.icon}
        </TreeIcon>
        {/* 라벨 + 설명 */}
        <TreeLabel>
          <TreeLabelTitle $depth={depth} $color={nodeColor} $hasChildren={hasChildren}>
            {node.label}
          </TreeLabelTitle>
          <TreeLabelDesc>{node.desc}</TreeLabelDesc>
        </TreeLabel>
        {/* 확장/축소 화살표 */}
        {hasChildren && (
          <TreeArrow $color={nodeColor} $expanded={expanded}>▶</TreeArrow>
        )}
      </TreeNodeBody>

      {/* 자식 노드 */}
      {hasChildren && expanded && (
        <TreeChildren>
          {node.children.map((child, i) => (
            <TreeNode
              key={child.id}
              node={child}
              depth={depth + 1}
              parentColor={nodeColor}
              isLast={i === node.children.length - 1}
              onSelect={onSelect}
              selectedId={selectedId}
            />
          ))}
        </TreeChildren>
      )}
    </TreeNodeWrap>
  );
}

/* ══════════════════════════════════════════
   메인 모달 컴포넌트
   ══════════════════════════════════════════ */

export default function IAModal({ isOpen, onClose }) {
  const [selected, setSelected] = useState(null);

  /* ESC 키 닫기 + body 스크롤 잠금 */
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  /* 통계 값 계산 */
  const totalNodes = countNodes(IA_DATA);
  const totalLeaves = countLeaves(IA_DATA);
  const maxDepth = getMaxDepth(IA_DATA);
  const topLevelCount = IA_DATA.children.length;

  return (
    <Overlay onClick={onClose}>
      <ModalBox onClick={e => e.stopPropagation()}>
        {/* 닫기 버튼 */}
        <CloseBtn onClick={onClose}>&times;</CloseBtn>

        {/* 헤더 */}
        <ModalHeader>
          <HeaderBadge>📐 Information Architecture</HeaderBadge>
          <HeaderTitle>몽글픽 정보구조도</HeaderTitle>
          <HeaderDesc>AI 기반 한국 영화 추천 서비스 · 전체 서비스 구조</HeaderDesc>
        </ModalHeader>

        {/* 통계 카드 */}
        <StatsGrid>
          {[
            { label: '주요 메뉴', value: topLevelCount, color: '#4ECDC4' },
            { label: '전체 노드', value: totalNodes, color: '#45B7D1' },
            { label: '최종 페이지', value: totalLeaves, color: '#96CEB4' },
            { label: '최대 깊이', value: `${maxDepth + 1}단계`, color: '#FFEAA7' },
          ].map(s => (
            <StatCard key={s.label}>
              <StatValue $color={s.color}>{s.value}</StatValue>
              <StatLabel>{s.label}</StatLabel>
            </StatCard>
          ))}
        </StatsGrid>

        {/* 범례 */}
        <Legend>
          <LegendLabel>메뉴 구조:</LegendLabel>
          {IA_DATA.children.map(ch => (
            <LegendTag key={ch.id} $color={ch.color}>
              {ch.icon} {ch.label}
            </LegendTag>
          ))}
        </Legend>

        {/* 트리 */}
        <TreeContainer>
          <TreeNode
            node={IA_DATA}
            onSelect={setSelected}
            selectedId={selected?.id}
          />
        </TreeContainer>

        {/* 선택된 노드 상세 */}
        {selected && selected.id !== 'root' && (
          <SelectedDetail $color={selected.color}>
            <span style={{ fontSize: 22 }}>{selected.icon}</span>
            <div>
              <SelectedTitle $color={selected.color}>{selected.label}</SelectedTitle>
              <SelectedDesc>{selected.desc}</SelectedDesc>
              {selected.children && (
                <SelectedSub>하위 항목 {selected.children.length}개 포함</SelectedSub>
              )}
            </div>
          </SelectedDetail>
        )}

        {/* 기반 기술 스택 */}
        <TechMapping>
          <TechMappingTitle>🛠️ 기반 기술 스택 매핑</TechMappingTitle>
          <TechChips>
            {[
              { name: 'Spring Boot', area: 'Backend API', color: '#6DB33F' },
              { name: 'FastAPI', area: 'AI Service', color: '#009688' },
              { name: 'LangGraph', area: 'Multi-Agent', color: '#FF6B35' },
              { name: 'Qdrant', area: 'Vector Search', color: '#DC382C' },
              { name: 'Elasticsearch', area: 'Full-text Search', color: '#FEC514' },
              { name: 'Neo4j', area: 'Graph DB', color: '#008CC1' },
              { name: 'Redis', area: 'Cache/Session', color: '#D82C20' },
              { name: 'MySQL', area: 'Primary DB', color: '#4479A1' },
            ].map(t => (
              <TechChip key={t.name} $color={t.color}>
                <span style={{ fontWeight: 700 }}>{t.name}</span>
                <span style={{ color: '#8A8680', marginLeft: 6 }}>{t.area}</span>
              </TechChip>
            ))}
          </TechChips>
        </TechMapping>

        <ModalFooter>
          몽글픽 IA v1.0 · 클릭하여 노드 탐색 · 화살표로 하위 구조 확장/축소
        </ModalFooter>
      </ModalBox>
    </Overlay>
  );
}

/* ══════════════════════════════════════════
   styled-components
   ══════════════════════════════════════════ */

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;
const slideUp = keyframes`
  from { opacity: 0; transform: translateY(40px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
`;

/* 오버레이 — 전체 화면 반투명 배경 */
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  animation: ${fadeIn} 0.2s ease;
`;

/* 모달 박스 */
const ModalBox = styled.div`
  position: relative;
  width: 100%;
  max-width: 900px;
  max-height: 85vh;
  overflow-y: auto;
  background: #1A1816;
  border-radius: 20px;
  border: 1px solid rgba(255, 107, 53, 0.2);
  padding: 36px 28px 28px;
  animation: ${slideUp} 0.3s ease;
  color: #E8E6E3;
  font-family: 'Noto Sans KR', sans-serif;

  /* 스크롤바 스타일 */
  &::-webkit-scrollbar { width: 6px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }

  @media (max-width: 600px) {
    padding: 28px 16px 16px;
    max-height: 90vh;
  }
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 16px;
  right: 18px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #aaa;
  font-size: 26px;
  width: 38px;
  height: 38px;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  &:hover { background: rgba(255, 255, 255, 0.15); color: #fff; }
`;

/* ── 헤더 ── */
const ModalHeader = styled.div`
  text-align: center;
  margin-bottom: 28px;
`;
const HeaderBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 5px 14px;
  border-radius: 100px;
  background: rgba(255, 107, 53, 0.1);
  border: 1px solid rgba(255, 107, 53, 0.2);
  font-size: 12px;
  color: #FF6B35;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 14px;
`;
const HeaderTitle = styled.h2`
  font-size: 28px;
  font-weight: 900;
  margin: 0;
  background: linear-gradient(135deg, #FF6B35, #FFEAA7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.03em;
  @media (max-width: 600px) { font-size: 22px; }
`;
const HeaderDesc = styled.p`
  color: #8A8680;
  font-size: 14px;
  margin-top: 6px;
`;

/* ── 통계 ── */
const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-bottom: 24px;
  @media (max-width: 600px) { grid-template-columns: repeat(2, 1fr); }
`;
const StatCard = styled.div`
  background: #222019;
  border-radius: 12px;
  padding: 14px 10px;
  text-align: center;
  border: 1px solid #2A2824;
`;
const StatValue = styled.div`
  font-size: 24px;
  font-weight: 800;
  color: ${p => p.$color};
  letter-spacing: -0.02em;
`;
const StatLabel = styled.div`
  font-size: 11px;
  color: #8A8680;
  margin-top: 2px;
  font-weight: 500;
`;

/* ── 범례 ── */
const Legend = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px 14px;
  background: #222019;
  border-radius: 10px;
  border: 1px solid #2A2824;
`;
const LegendLabel = styled.span`
  font-size: 11px;
  color: #8A8680;
  font-weight: 600;
  margin-right: 4px;
`;
const LegendTag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 9px;
  border-radius: 6px;
  background: ${p => p.$color + '18'};
  border: 1px solid ${p => p.$color + '33'};
  font-size: 11px;
  color: ${p => p.$color};
  font-weight: 600;
`;

/* ── 트리 ── */
const TreeContainer = styled.div`
  background: #222019;
  border-radius: 16px;
  border: 1px solid #2A2824;
  padding: 20px 16px;
`;

const TreeNodeWrap = styled.div`
  margin-left: ${p => p.$depth === 0 ? 0 : 28}px;
  position: relative;
`;
const TreeVLine = styled.div`
  position: absolute;
  left: -20px;
  top: 0;
  bottom: ${p => p.$isLast ? '50%' : 0};
  width: 1px;
  background: ${p => (p.$color || '#888') + '33'};
`;
const TreeHLine = styled.div`
  position: absolute;
  left: -20px;
  top: 20px;
  width: 16px;
  height: 1px;
  background: ${p => (p.$color || '#888') + '33'};
`;
const TreeNodeBody = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 7px 12px;
  margin-bottom: 3px;
  border-radius: 10px;
  cursor: pointer;
  position: relative;
  background: ${p => p.$selected ? p.$color + '18' : 'transparent'};
  border: 1.5px solid ${p => p.$selected ? p.$color + '55' : 'transparent'};
  transition: all 0.2s ease;
  &:hover {
    background: ${p => p.$selected ? p.$color + '18' : p.$color + '0D'};
  }
`;
const TreeIcon = styled.div`
  width: ${p => p.$depth === 0 ? 44 : 32}px;
  height: ${p => p.$depth === 0 ? 44 : 32}px;
  border-radius: ${p => p.$depth === 0 ? 14 : 8}px;
  background: linear-gradient(135deg, ${p => p.$color + '22'}, ${p => p.$color + '44'});
  border: 2px solid ${p => p.$color + '66'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${p => p.$depth === 0 ? 20 : 14}px;
  flex-shrink: 0;
  box-shadow: ${p => p.$selected ? `0 0 12px ${p.$color}33` : 'none'};
  transition: all 0.2s ease;
`;
const TreeLabel = styled.div`
  flex: 1;
  min-width: 0;
`;
const TreeLabelTitle = styled.div`
  font-weight: ${p => p.$depth === 0 ? 800 : p.$hasChildren ? 700 : 500};
  font-size: ${p => p.$depth === 0 ? 18 : p.$hasChildren ? 14 : 13}px;
  color: ${p => p.$depth === 0 ? p.$color : '#E8E6E3'};
  letter-spacing: ${p => p.$depth === 0 ? '-0.02em' : 0};
`;
const TreeLabelDesc = styled.div`
  font-size: 11px;
  color: #8A8680;
  margin-top: 1px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const TreeArrow = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 5px;
  background: ${p => p.$color + '22'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: ${p => p.$color};
  font-weight: 700;
  flex-shrink: 0;
  transform: ${p => p.$expanded ? 'rotate(90deg)' : 'rotate(0deg)'};
  transition: transform 0.2s ease;
`;
const TreeChildren = styled.div`
  overflow: hidden;
`;

/* ── 선택 상세 ── */
const SelectedDetail = styled.div`
  margin-top: 14px;
  padding: 16px 18px;
  background: #222019;
  border-radius: 12px;
  border: 1px solid ${p => (p.$color || '#444') + '44'};
  display: flex;
  align-items: flex-start;
  gap: 12px;
`;
const SelectedTitle = styled.div`
  font-weight: 700;
  font-size: 15px;
  color: ${p => p.$color || '#E8E6E3'};
`;
const SelectedDesc = styled.p`
  color: #AAA8A3;
  font-size: 13px;
  margin: 4px 0 0;
  line-height: 1.6;
`;
const SelectedSub = styled.div`
  margin-top: 8px;
  font-size: 12px;
  color: #8A8680;
`;

/* ── 기술 스택 ── */
const TechMapping = styled.div`
  margin-top: 20px;
  padding: 18px;
  background: #222019;
  border-radius: 12px;
  border: 1px solid #2A2824;
`;
const TechMappingTitle = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: #E8E6E3;
  margin-bottom: 12px;
`;
const TechChips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;
const TechChip = styled.div`
  padding: 5px 11px;
  border-radius: 7px;
  background: ${p => p.$color + '15'};
  border: 1px solid ${p => p.$color + '33'};
  font-size: 11.5px;
  line-height: 1.5;
  color: ${p => p.$color};
`;

const ModalFooter = styled.div`
  text-align: center;
  margin-top: 24px;
  font-size: 11px;
  color: #5A5854;
`;
