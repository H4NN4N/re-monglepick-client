/**
 * 몽글픽 초기 기획서 모달 컴포넌트.
 *
 * 프로젝트의 초기 기획 의도, 서비스 개요, 핵심 기능, 기술 스택,
 * 팀 구성, 목표 등을 요약하여 보여주는 전체화면 모달이다.
 * ESC 닫기 + body 스크롤 잠금 지원.
 */

import { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

/* ══════════════════════════════════════════
   기획서 섹션 데이터
   ══════════════════════════════════════════ */

/** 프로젝트 개요 */
const PROJECT_OVERVIEW = {
  name: '몽글픽 (MongglePick)',
  fullName: 'RAG 기반 파인튜닝 LLM(EXAONE 4.0 LoRA) AI 컨텐츠 추천 플랫폼',
  period: '2026.02 ~ 2026.04 (약 10주)',
  team: '2조 — 4인',
  goal: '사용자 행동 패턴과 자체 데이터를 결합하여 최적의 콘텐츠를 제안하는 AI 영화 추천 플랫폼',
};

/** 기획 의도 */
const PLANNING_INTENT = [
  {
    icon: '🎯',
    title: '기존 추천 시스템의 한계',
    desc: '단순 장르 필터링이나 협업 필터링만으로는 사용자의 감정, 상황, 맥락을 반영한 추천이 어렵습니다. 몽글픽은 LLM을 활용해 자연어로 대화하며 진짜 맞춤 추천을 제공합니다.',
  },
  {
    icon: '🧠',
    title: 'RAG + 파인튜닝 LLM 기반',
    desc: 'Retrieval-Augmented Generation(RAG)으로 117만 편 영화 데이터에서 정확한 정보를 검색하고, EXAONE 4.0 LoRA 파인튜닝으로 한국어에 특화된 자연스러운 응답을 생성합니다.',
  },
  {
    icon: '🎮',
    title: '게임화된 사용자 경험',
    desc: '영화 월드컵, 도장깨기 플레이리스트, 업적 시스템, AI 퀴즈 등 재미있는 방식으로 취향을 분석하고, 포인트/리워드로 지속적인 참여를 유도합니다.',
  },
  {
    icon: '🤝',
    title: '커뮤니티 중심 영화 문화',
    desc: '리뷰 공유, 토론, 시네마 소울메이트 매칭으로 영화를 함께 즐기는 문화를 만들어갑니다.',
  },
];

/** 핵심 기능 목록 */
const CORE_FEATURES = [
  { icon: '💬', title: 'AI 채팅 추천', desc: '감정/상황 기반 자연어 대화로 영화 추천 (LangGraph 16노드)', color: '#7c6cf0' },
  { icon: '🎭', title: '감정 분석', desc: 'LLM 의도+감정 분류 모델로 사용자 기분 파악', color: '#ef476f' },
  { icon: '🔍', title: '하이브리드 검색', desc: 'Qdrant(벡터) + ES(BM25) + Neo4j(그래프) → RRF 통합', color: '#118ab2' },
  { icon: '⚔️', title: '영화 월드컵', desc: '이지선다 방식으로 취향 정밀 분석', color: '#ffd166' },
  { icon: '🏆', title: '도장깨기 로드맵', desc: 'AI가 테마별 15편 커리큘럼 생성 + 퀴즈 검증', color: '#06d6a0' },
  { icon: '🖼️', title: '포스터 분석', desc: '이미지 업로드 → AI가 분위기/장르 파악 후 유사 영화 추천', color: '#a78bfa' },
  { icon: '📊', title: '협업 필터링', desc: '26M 시청 이력 기반 CF + 콘텐츠 기반(CBF) 동적 가중치', color: '#f97316' },
  { icon: '👥', title: '시네마 소울메이트', desc: '취향 유사도 TOP 10 유저 매칭 + 그룹 추천', color: '#4ECDC4' },
];

/** 기술 스택 요약 */
const TECH_STACK = [
  { category: 'AI / LLM', items: ['EXAONE 4.0 32B (Ollama)', 'Qwen 3.5 35B', 'EXAONE 1.2B (vLLM)', 'Upstage Solar API', 'LangGraph StateGraph'], color: '#7c6cf0' },
  { category: 'Backend', items: ['Spring Boot 3 (Java 21)', 'FastAPI + uvicorn', 'JWT + OAuth2', 'Toss Payments'], color: '#ef476f' },
  { category: 'Database', items: ['MySQL 8.0 (85 tables)', 'Qdrant (Vector 4096D)', 'Neo4j 5 (Graph)', 'Elasticsearch 8.17', 'Redis 7'], color: '#118ab2' },
  { category: 'Frontend', items: ['React 18 + Vite', 'styled-components', 'Zustand', 'SSE 스트리밍'], color: '#06d6a0' },
  { category: 'Infra', items: ['카카오 클라우드 4-VM', 'Docker Compose', 'Nginx + SSL', 'GitHub Actions CI/CD'], color: '#ffd166' },
  { category: '관찰성', items: ['LangSmith (Agent 추적)', 'Prometheus + Grafana', 'ELK Stack (8.13)', 'Alertmanager'], color: '#a78bfa' },
];

/** 팀원 구성 */
const TEAM_MEMBERS = [
  { name: '윤형주', role: 'Backend · AI Engineer', area: 'AI Agent 4종, 결제/포인트/리워드, 관리자 83 EP, 인프라', color: '#7c6cf0' },
  { name: '김민규', role: 'Team Lead · Backend', area: '인증(JWT/OAuth2), 사용자 관리, 플레이리스트, 관리자 11 EP', color: '#ef476f' },
  { name: '정한나', role: 'Search & Recommendation', area: '검색/추천 FastAPI 서비스, 영화 Like(write-behind), 온보딩', color: '#06d6a0' },
  { name: '이민수', role: 'Community & Social', area: '커뮤니티 CRUD, 댓글/신고/혐오표현, AI 퀴즈, 관리자 9 EP', color: '#ffd166' },
];

/** 서비스 아키텍처 */
const SERVICES = [
  { name: 'monglepick-agent', port: '8000', tech: 'FastAPI + LangGraph + Ollama', desc: 'AI Agent 서비스' },
  { name: 'monglepick-backend', port: '8080', tech: 'Spring Boot 3 + JPA + JWT', desc: '메인 백엔드 API' },
  { name: 'monglepick-recommend', port: '8001', tech: 'FastAPI + SQLAlchemy + Redis', desc: '추천/검색 서비스' },
  { name: 'monglepick-client', port: '5173', tech: 'React + Vite', desc: '사용자 클라이언트' },
  { name: 'monglepick-admin', port: '5174', tech: 'React + Vite', desc: '관리자 대시보드' },
];

/** 데이터 규모 */
const DATA_SCALE = [
  { value: '1.17M', label: 'TMDB 영화 데이터' },
  { value: '910K', label: '5DB 적재 데이터' },
  { value: '26M', label: '시청 이력 (Kaggle)' },
  { value: '85', label: 'RDB 테이블' },
  { value: '261', label: 'WBS 요구사항' },
  { value: '332', label: '자동 테스트' },
];

/* ══════════════════════════════════════════
   메인 컴포넌트
   ══════════════════════════════════════════ */

export default function PlanningModal({ isOpen, onClose }) {
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

  return (
    <Overlay onClick={onClose}>
      <ModalBox onClick={e => e.stopPropagation()}>
        <CloseBtn onClick={onClose}>&times;</CloseBtn>

        {/* ── 프로젝트 타이틀 ── */}
        <Header>
          <HeaderBadge>📋 Initial Planning</HeaderBadge>
          <HeaderTitle>몽글픽 초기 기획서</HeaderTitle>
          <HeaderSubtitle>{PROJECT_OVERVIEW.fullName}</HeaderSubtitle>
          <HeaderMeta>
            <MetaItem><MetaLabel>기간</MetaLabel>{PROJECT_OVERVIEW.period}</MetaItem>
            <MetaDot />
            <MetaItem><MetaLabel>팀</MetaLabel>{PROJECT_OVERVIEW.team}</MetaItem>
          </HeaderMeta>
        </Header>

        {/* ── 기획 의도 ── */}
        <Section>
          <SectionTitle>기획 의도</SectionTitle>
          <IntentGrid>
            {PLANNING_INTENT.map(item => (
              <IntentCard key={item.title}>
                <IntentIcon>{item.icon}</IntentIcon>
                <IntentTitle>{item.title}</IntentTitle>
                <IntentDesc>{item.desc}</IntentDesc>
              </IntentCard>
            ))}
          </IntentGrid>
        </Section>

        {/* ── 핵심 기능 ── */}
        <Section>
          <SectionTitle>핵심 기능 (8대 기능)</SectionTitle>
          <FeatureGrid>
            {CORE_FEATURES.map(f => (
              <FeatureCard key={f.title} $color={f.color}>
                <FeatureIcon $color={f.color}>{f.icon}</FeatureIcon>
                <div>
                  <FeatureName>{f.title}</FeatureName>
                  <FeatureDesc>{f.desc}</FeatureDesc>
                </div>
              </FeatureCard>
            ))}
          </FeatureGrid>
        </Section>

        {/* ── 서비스 아키텍처 ── */}
        <Section>
          <SectionTitle>서비스 구성 (5개 마이크로서비스)</SectionTitle>
          <ServiceTable>
            <thead>
              <tr>
                <Th>서비스</Th>
                <Th>포트</Th>
                <Th>기술 스택</Th>
                <Th className="hide-mobile">설명</Th>
              </tr>
            </thead>
            <tbody>
              {SERVICES.map(s => (
                <tr key={s.name}>
                  <Td $bold>{s.name}</Td>
                  <Td $mono>:{s.port}</Td>
                  <Td>{s.tech}</Td>
                  <Td className="hide-mobile">{s.desc}</Td>
                </tr>
              ))}
            </tbody>
          </ServiceTable>
        </Section>

        {/* ── 기술 스택 ── */}
        <Section>
          <SectionTitle>기술 스택</SectionTitle>
          <TechGrid>
            {TECH_STACK.map(cat => (
              <TechCard key={cat.category} $color={cat.color}>
                <TechCatTitle $color={cat.color}>{cat.category}</TechCatTitle>
                <TechItems>
                  {cat.items.map(item => (
                    <TechItem key={item} $color={cat.color}>
                      <TechDot $color={cat.color} />
                      {item}
                    </TechItem>
                  ))}
                </TechItems>
              </TechCard>
            ))}
          </TechGrid>
        </Section>

        {/* ── 데이터 규모 ── */}
        <Section>
          <SectionTitle>데이터 규모</SectionTitle>
          <DataGrid>
            {DATA_SCALE.map(d => (
              <DataCard key={d.label}>
                <DataValue>{d.value}</DataValue>
                <DataLabel>{d.label}</DataLabel>
              </DataCard>
            ))}
          </DataGrid>
        </Section>

        {/* ── 팀 구성 ── */}
        <Section>
          <SectionTitle>팀 구성</SectionTitle>
          <TeamGrid>
            {TEAM_MEMBERS.map(m => (
              <TeamCard key={m.name} $color={m.color}>
                <TeamAvatar $color={m.color}>{m.name.charAt(0)}</TeamAvatar>
                <div>
                  <TeamName>{m.name}</TeamName>
                  <TeamRole $color={m.color}>{m.role}</TeamRole>
                  <TeamArea>{m.area}</TeamArea>
                </div>
              </TeamCard>
            ))}
          </TeamGrid>
        </Section>

        {/* ── 프로젝트 목표 ── */}
        <Section>
          <SectionTitle>프로젝트 목표</SectionTitle>
          <GoalList>
            {[
              '감정/상황/취향을 종합 분석하는 AI 채팅 추천 시스템 구현',
              'RAG 기반 하이브리드 검색 (벡터 + 키워드 + 그래프) 파이프라인 구축',
              'EXAONE 4.0 LoRA 파인튜닝으로 한국어 특화 LLM 서빙',
              '게임화(월드컵/도장깨기/업적)와 포인트 경제 시스템으로 사용자 리텐션 확보',
              '5개 마이크로서비스 + 5개 DB 기반 확장 가능한 아키텍처 설계',
              'Prometheus + Grafana + ELK 기반 운영 관찰성 확보',
            ].map((goal, i) => (
              <GoalItem key={i}>
                <GoalNum>{String(i + 1).padStart(2, '0')}</GoalNum>
                <GoalText>{goal}</GoalText>
              </GoalItem>
            ))}
          </GoalList>
        </Section>

        <ModalFooter>
          몽글픽 초기 기획서 · 2026.02 ~ 2026.04 · 스나이퍼팩토리 2조
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

const ModalBox = styled.div`
  position: relative;
  width: 100%;
  max-width: 920px;
  max-height: 85vh;
  overflow-y: auto;
  background: #0f0f1a;
  border-radius: 20px;
  border: 1px solid rgba(124, 108, 240, 0.2);
  padding: 36px 28px 28px;
  animation: ${slideUp} 0.3s ease;
  color: #e8e8f0;
  font-family: 'Noto Sans KR', sans-serif;

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
const Header = styled.div`
  text-align: center;
  margin-bottom: 32px;
`;
const HeaderBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 5px 14px;
  border-radius: 100px;
  background: rgba(124, 108, 240, 0.1);
  border: 1px solid rgba(124, 108, 240, 0.25);
  font-size: 12px;
  color: #7c6cf0;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 14px;
`;
const HeaderTitle = styled.h2`
  font-size: 28px;
  font-weight: 900;
  margin: 0;
  background: linear-gradient(135deg, #7c6cf0, #06d6a0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.03em;
  @media (max-width: 600px) { font-size: 22px; }
`;
const HeaderSubtitle = styled.p`
  color: #8888a0;
  font-size: 13px;
  margin-top: 8px;
  line-height: 1.5;
`;
const HeaderMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 12px;
`;
const MetaItem = styled.span`
  font-size: 13px;
  color: #b0b0c0;
`;
const MetaLabel = styled.span`
  color: #7c6cf0;
  font-weight: 600;
  margin-right: 6px;
`;
const MetaDot = styled.span`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #555;
`;

/* ── 섹션 공통 ── */
const Section = styled.div`
  margin-bottom: 28px;
`;
const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 800;
  color: #e8e8f0;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  &::before {
    content: '';
    width: 4px;
    height: 20px;
    border-radius: 2px;
    background: linear-gradient(180deg, #7c6cf0, #06d6a0);
    flex-shrink: 0;
  }
`;

/* ── 기획 의도 ── */
const IntentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  @media (max-width: 600px) { grid-template-columns: 1fr; }
`;
const IntentCard = styled.div`
  background: rgba(26, 26, 46, 0.6);
  border: 1px solid rgba(124, 108, 240, 0.12);
  border-radius: 14px;
  padding: 18px;
`;
const IntentIcon = styled.div`
  font-size: 28px;
  margin-bottom: 8px;
`;
const IntentTitle = styled.div`
  font-weight: 700;
  font-size: 14px;
  margin-bottom: 6px;
`;
const IntentDesc = styled.div`
  font-size: 12.5px;
  color: #9999b0;
  line-height: 1.7;
`;

/* ── 핵심 기능 ── */
const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  @media (max-width: 600px) { grid-template-columns: 1fr; }
`;
const FeatureCard = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px;
  border-radius: 12px;
  background: rgba(26, 26, 46, 0.5);
  border: 1px solid ${p => p.$color + '20'};
  transition: border-color 0.2s;
  &:hover { border-color: ${p => p.$color + '50'}; }
`;
const FeatureIcon = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: ${p => p.$color + '18'};
  border: 1px solid ${p => p.$color + '30'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
`;
const FeatureName = styled.div`
  font-weight: 700;
  font-size: 13.5px;
  margin-bottom: 3px;
`;
const FeatureDesc = styled.div`
  font-size: 12px;
  color: #8888a0;
  line-height: 1.5;
`;

/* ── 서비스 테이블 ── */
const ServiceTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 12.5px;
  .hide-mobile {
    @media (max-width: 600px) { display: none; }
  }
`;
const Th = styled.th`
  text-align: left;
  padding: 10px 12px;
  border-bottom: 1px solid rgba(124, 108, 240, 0.15);
  color: #7c6cf0;
  font-weight: 700;
  font-size: 11.5px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;
const Td = styled.td`
  padding: 10px 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  color: ${p => p.$bold ? '#e8e8f0' : '#9999b0'};
  font-weight: ${p => p.$bold ? 600 : 400};
  font-family: ${p => p.$mono ? "'JetBrains Mono', monospace" : 'inherit'};
  font-size: ${p => p.$mono ? '12px' : '12.5px'};
`;

/* ── 기술 스택 ── */
const TechGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  @media (max-width: 768px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 480px) { grid-template-columns: 1fr; }
`;
const TechCard = styled.div`
  background: rgba(26, 26, 46, 0.5);
  border: 1px solid ${p => p.$color + '18'};
  border-radius: 12px;
  padding: 16px;
`;
const TechCatTitle = styled.div`
  font-weight: 700;
  font-size: 13px;
  color: ${p => p.$color};
  margin-bottom: 10px;
`;
const TechItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
const TechItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #b0b0c0;
`;
const TechDot = styled.span`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: ${p => p.$color};
  flex-shrink: 0;
`;

/* ── 데이터 규모 ── */
const DataGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  @media (max-width: 768px) { grid-template-columns: repeat(3, 1fr); }
  @media (max-width: 480px) { grid-template-columns: repeat(2, 1fr); }
`;
const DataCard = styled.div`
  text-align: center;
  padding: 16px 8px;
  border-radius: 12px;
  background: rgba(26, 26, 46, 0.5);
  border: 1px solid rgba(124, 108, 240, 0.1);
`;
const DataValue = styled.div`
  font-size: 22px;
  font-weight: 800;
  background: linear-gradient(135deg, #7c6cf0, #06d6a0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
const DataLabel = styled.div`
  font-size: 11px;
  color: #8888a0;
  margin-top: 4px;
`;

/* ── 팀 구성 ── */
const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  @media (max-width: 600px) { grid-template-columns: 1fr; }
`;
const TeamCard = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  border-radius: 14px;
  background: rgba(26, 26, 46, 0.5);
  border: 1px solid ${p => p.$color + '20'};
`;
const TeamAvatar = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: ${p => p.$color};
  color: ${p => p.$color === '#ffd166' ? '#0a0a14' : '#fff'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 800;
  flex-shrink: 0;
`;
const TeamName = styled.div`
  font-weight: 700;
  font-size: 14px;
`;
const TeamRole = styled.div`
  font-size: 12px;
  color: ${p => p.$color};
  font-weight: 600;
  margin-top: 2px;
`;
const TeamArea = styled.div`
  font-size: 12px;
  color: #8888a0;
  margin-top: 4px;
  line-height: 1.5;
`;

/* ── 프로젝트 목표 ── */
const GoalList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const GoalItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 14px 16px;
  border-radius: 12px;
  background: rgba(26, 26, 46, 0.4);
  border: 1px solid rgba(124, 108, 240, 0.08);
`;
const GoalNum = styled.div`
  font-size: 20px;
  font-weight: 800;
  color: rgba(124, 108, 240, 0.3);
  min-width: 30px;
  font-family: 'Inter', sans-serif;
`;
const GoalText = styled.div`
  font-size: 13.5px;
  color: #c0c0d0;
  line-height: 1.6;
  padding-top: 2px;
`;

const ModalFooter = styled.div`
  text-align: center;
  margin-top: 24px;
  font-size: 11px;
  color: #5A5854;
`;
