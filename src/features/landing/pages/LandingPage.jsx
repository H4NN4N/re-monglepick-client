/**
 * 몽글픽 랜딩 페이지 컴포넌트.
 *
 * 서비스 소개 + 팀 소개 + 기능 소개 + 기술 스택 + 데이터 규모 + 진행 현황을 포함한다.
 * 글래스모피즘 + 파티클 + 스크롤 애니메이션 기반 화려한 UI를 제공한다.
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../shared/constants/routes';
import './LandingPage.css';

/* ── 피처 데이터 ── */
const FEATURES = [
  { icon: '🎭', title: '감정 기반 AI 추천', desc: '"오늘 좀 우울해" 한 마디면 충분해요. 기분을 읽고 딱 맞는 영화를 골라드려요.', tag: 'AI 채팅', color: '#ef476f' },
  { icon: '⚔️', title: '영화 월드컵', desc: '이지선다로 나의 취향을 정밀하게 파악해요. 고를수록 추천이 정확해져요.', tag: '취향 분석', color: '#ffd166' },
  { icon: '🏆', title: '도장깨기 플레이리스트', desc: 'AI가 테마별 영화 로드맵을 짜드려요. 완주하면 뱃지도 드려요!', tag: '게임화', color: '#06d6a0' },
  { icon: '👥', title: '시네마 소울메이트', desc: '취향이 비슷한 유저를 찾아드려요. 함께 볼 영화 고르는 그룹 추천도 가능해요.', tag: '소셜', color: '#118ab2' },
  { icon: '🎲', title: '블라인드 데이트 추천', desc: '제목은 숨기고 힌트만! 뜻밖의 명작을 발견하는 즐거움을 드려요.', tag: '서프라이즈', color: '#a78bfa' },
  { icon: '🎬', title: 'AI 퀴즈 & 씬 맞추기', desc: '매일 새로운 영화 퀴즈와 스틸컷 맞추기 게임으로 커뮤니티가 살아있어요.', tag: '커뮤니티', color: '#f97316' },
];

/* ── 플로팅 무비카드 데이터 ── */
const MOVIE_CARDS = [
  { title: '인셉션', genre: 'SF · 스릴러', rating: '8.8', year: '2010', style: { top: 0, left: 20, rot: -2, dur: 3.5, delay: 0 } },
  { title: '기생충', genre: '드라마 · 스릴러', rating: '8.5', year: '2019', style: { top: 20, right: 0, rot: 3, dur: 4, delay: 0.5 } },
  { title: '어바웃 타임', genre: '로맨스 · 드라마', rating: '7.8', year: '2013', style: { top: 210, left: 40, rot: 1, dur: 3.8, delay: 0.3 } },
  { title: '라라랜드', genre: '뮤지컬 · 로맨스', rating: '8.0', year: '2016', style: { top: 250, right: 10, rot: -3, dur: 4.2, delay: 0.8 } },
];

/* ── 팀원 데이터 ── */
const TEAM_MEMBERS = [
  {
    initials: 'YH', name: '윤형주', role: 'Backend Developer · AI Engineer', color: '#7c6cf0',
    desc: 'AI Agent 전체 설계 및 구현, LangGraph 기반 대화형 추천 시스템, 데이터 파이프라인(117만건), 인프라 구축(Docker/CI-CD/Nginx) 총괄',
    tags: ['LangGraph', 'FastAPI', 'Docker', 'Ollama', 'RAG', 'CI/CD'],
    progress: 85, req: 'REQ_040, REQ_052~065, REQ_089, REQ_118~121 · 인프라 전체',
  },
  {
    initials: 'MG', name: '김민규', role: 'Team Lead · Backend Developer', color: '#ef476f',
    desc: 'Spring Boot 백엔드 핵심 기능 개발. 회원가입/로그인 인증 시스템, 마이페이지, 플레이리스트, 도장깨기 코스 등 사용자 경험의 근간을 담당',
    tags: ['Spring Boot', 'JWT', 'JPA', 'MySQL', 'Security'],
    progress: 45, req: 'REQ_001, REQ_006~030, REQ_090~117 · 약 40건',
  },
  {
    initials: 'HN', name: '정한나', role: 'Search & Recommendation', color: '#06d6a0',
    desc: 'FastAPI 기반 검색/추천 서비스 단독 개발. 영화 검색, 온보딩(이상형 월드컵), 개인화 추천 목록, 영화 상세 정보 등 사용자 발견 경험 전체를 책임',
    tags: ['FastAPI', 'Python', 'Redis', 'SQLAlchemy'],
    progress: 60, req: 'REQ_002~005, REQ_066~088 · 약 28건',
  },
  {
    initials: 'MS', name: '이민수', role: 'Community & Social', color: '#ffd166',
    desc: '커뮤니티 생태계 전담 개발. 게시글 CRUD, 댓글/대댓글, 좋아요, AI 영화 퀴즈, 같이보기 파티, AI 자동 리뷰 등 소셜 기능 구현',
    tags: ['Spring Boot', 'JPA', 'REST API', 'WebSocket'],
    progress: 35, req: 'REQ_031~047 · 커뮤니티/퀴즈/파티/AI리뷰',
  },
];

export default function LandingPage() {
  /* ── 피처 자동 순환 상태 ── */
  const [activeFeature, setActiveFeature] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const particlesRef = useRef(null);
  const featureTimerRef = useRef(null);

  /* 스크롤 시 네비게이션 배경 변경 */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* 파티클 생성 — 마운트 시 1회 */
  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;
    const colors = ['#7c6cf0', '#06d6a0', '#ef476f', '#a78bfa'];
    for (let i = 0; i < 30; i++) {
      const p = document.createElement('div');
      p.className = 'lp-particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.animationDelay = Math.random() * 8 + 's';
      p.style.animationDuration = (6 + Math.random() * 6) + 's';
      const size = (2 + Math.random() * 4) + 'px';
      p.style.width = size;
      p.style.height = size;
      p.style.background = colors[Math.floor(Math.random() * colors.length)];
      container.appendChild(p);
    }
    return () => { container.innerHTML = ''; };
  }, []);

  /* 피처 자동 전환 타이머 */
  useEffect(() => {
    featureTimerRef.current = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % FEATURES.length);
    }, 3000);
    return () => clearInterval(featureTimerRef.current);
  }, []);

  /* 피처 수동 선택 — 타이머 리셋 */
  const selectFeature = useCallback((idx) => {
    setActiveFeature(idx);
    clearInterval(featureTimerRef.current);
    featureTimerRef.current = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % FEATURES.length);
    }, 3000);
  }, []);

  /* Intersection Observer — 스크롤 등장 + 프로그레스 바 */
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('lp-visible');
          /* 프로그레스 바 애니메이션 트리거 */
          entry.target.querySelectorAll('.lp-progress-fill').forEach(bar => {
            bar.style.width = bar.dataset.width + '%';
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.lp-reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* 부드러운 앵커 스크롤 핸들러 */
  const scrollTo = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const f = FEATURES[activeFeature];

  return (
    <div className="lp">
      {/* 배경 오브 */}
      <div className="lp-bg-orb lp-bg-orb--1" />
      <div className="lp-bg-orb lp-bg-orb--2" />
      <div className="lp-bg-orb lp-bg-orb--3" />

      {/* ── 네비게이션 ── */}
      <nav className={`lp-nav${scrolled ? ' lp-nav--scrolled' : ''}`}>
        <div className="lp-nav__logo">
          <img src="/mongle-transparent.png" alt="몽글픽" className="lp-nav__logo-img" />
          <span>MONGLEPICK</span>
        </div>
        <div className="lp-nav__links">
          <a href="#lp-features" onClick={e => scrollTo(e, 'lp-features')}>기능 소개</a>
          <a href="#lp-howto" onClick={e => scrollTo(e, 'lp-howto')}>사용방법</a>
          <a href="#lp-team" onClick={e => scrollTo(e, 'lp-team')}>팀 소개</a>
          <a href="#lp-tech" onClick={e => scrollTo(e, 'lp-tech')}>기술</a>
          <a href="#lp-progress" onClick={e => scrollTo(e, 'lp-progress')}>진행현황</a>
          <Link to={ROUTES.HOME} className="lp-nav__cta">시작하기</Link>
        </div>
      </nav>

      {/* ── 히어로 ── */}
      <section className="lp-hero" id="lp-hero">
        <div className="lp-hero__grid" />
        <div className="lp-hero__particles" ref={particlesRef} />

        <div className="lp-hero__layout">
          {/* 좌측 텍스트 */}
          <div>
            <div className="lp-hero__badge">
              <span className="lp-hero__badge-dot" />
              AI 영화 추천 서비스
            </div>
            <h1 className="lp-hero__title">
              오늘 기분에<br />
              <span>딱 맞는 영화</span><br />
              AI가 골라드려요
            </h1>
            <p className="lp-hero__desc">
              "오늘 좀 우울한데..." 한 마디면 충분해요.<br />
              몽글픽이 당신의 감정과 취향을 읽고,<br />
              지금 꼭 봐야 할 영화를 찾아드립니다.
            </p>
            <div className="lp-hero__cta">
              <Link to={ROUTES.HOME} className="lp-btn lp-btn--primary">무료로 시작하기 &rarr;</Link>
              <a href="#lp-features" onClick={e => scrollTo(e, 'lp-features')} className="lp-btn lp-btn--glass">서비스 둘러보기</a>
            </div>
            <div className="lp-hero__checks">
              <span><span className="lp-check-icon">&#10003;</span> 무료 서비스(부분 유료)</span>
              <span><span className="lp-check-icon">&#10003;</span> 소셜 로그인</span>
              <span><span className="lp-check-icon">&#10003;</span> OTT 연동</span>
            </div>
          </div>

          {/* 우측 플로팅 무비카드 */}
          <div className="lp-hero__cards">
            {MOVIE_CARDS.map((m) => (
              <div
                key={m.title}
                className="lp-movie-float"
                style={{
                  top: m.style.top, left: m.style.left, right: m.style.right,
                  '--rot': m.style.rot + 'deg', '--dur': m.style.dur + 's', '--delay': m.style.delay + 's',
                }}
              >
                <div className="lp-movie-float__poster">🎬</div>
                <div className="lp-movie-float__title">{m.title}</div>
                <div className="lp-movie-float__genre">{m.genre}</div>
                <div className="lp-movie-float__meta">
                  <span className="lp-movie-float__rating">⭐ {m.rating}</span>
                  <span className="lp-movie-float__year">{m.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI 채팅 데모 ── */}
      <section className="lp-chat-demo" id="lp-chat-demo">
        <div className="lp-container">
          <div className="lp-chat-demo__layout">
            <div className="lp-reveal">
              <div className="lp-section-label">AI Chat</div>
              <h2 className="lp-section-title">말만 하면<br />바로 추천해드려요</h2>
              <p className="lp-section-subtitle" style={{ marginBottom: 24 }}>
                복잡한 필터 설정 없이 지금 기분을 자연어로 말해보세요.
                감정 분석 AI가 오늘 당신에게 맞는 영화를 찾아드려요.
              </p>
              <p className="lp-section-subtitle">
                LangGraph 기반 대화 흐름이 의도를 분류하고,
                감정을 분석하고, 취향을 추출해
                SSE 스트리밍으로 실시간 응답합니다.
              </p>
            </div>

            {/* 채팅 UI 목업 */}
            <div className="lp-chat-window lp-reveal lp-reveal-delay-2">
              <div className="lp-chat-window__header">
                <img src="/mongle-transparent.png" alt="몽글픽" className="lp-chat-window__avatar" />
                <span className="lp-chat-window__name">몽글 AI</span>
                <div className="lp-chat-window__status" />
              </div>
              <div className="lp-chat-bubble lp-chat-bubble--user">
                오늘 좀 우울한데... 힐링되는 영화 추천해줘
              </div>
              <div className="lp-chat-bubble lp-chat-bubble--ai">
                감정이 느껴지네요 🌙 따뜻하게 위로받을 수 있는 영화들을 골라봤어요.
              </div>
              <div className="lp-chat-reco-cards">
                <div className="lp-chat-reco-card">
                  <div className="lp-chat-reco-card__title">어바웃 타임</div>
                  <div className="lp-chat-reco-card__genre">로맨스</div>
                  <div className="lp-chat-reco-card__bottom">
                    <span className="lp-chat-reco-card__rating">⭐ 7.8</span>
                    <span className="lp-chat-reco-card__ott">▶ OTT</span>
                  </div>
                </div>
                <div className="lp-chat-reco-card">
                  <div className="lp-chat-reco-card__title">인사이드 아웃</div>
                  <div className="lp-chat-reco-card__genre">애니메이션</div>
                  <div className="lp-chat-reco-card__bottom">
                    <span className="lp-chat-reco-card__rating">⭐ 8.1</span>
                    <span className="lp-chat-reco-card__ott">▶ OTT</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 핵심 기능 ── */}
      <section className="lp-features" id="lp-features">
        <div className="lp-container">
          <div className="lp-features__header lp-reveal">
            <div className="lp-section-label">Key Features</div>
            <h2 className="lp-section-title">
              영화를 더 즐겁게 만드는<br />
              <span className="lp-gradient-text">모든 것</span>이 담겨있어요
            </h2>
          </div>

          {/* 피처 필 */}
          <div className="lp-features__pills lp-reveal">
            {FEATURES.map((ft, i) => (
              <button
                key={ft.title}
                className={`lp-feature-pill${activeFeature === i ? ' active' : ''}`}
                style={{ '--pill-color': ft.color, '--pill-bg': ft.color + '1f' }}
                onClick={() => selectFeature(i)}
              >
                {ft.icon} {ft.title}
              </button>
            ))}
          </div>

          {/* 피처 상세 */}
          <div className="lp-feature-display lp-reveal" style={{ borderColor: f.color + '33' }}>
            <div className="lp-feature-display__icon">{f.icon}</div>
            <div>
              <div className="lp-feature-display__tag" style={{ background: f.color + '22', color: f.color }}>{f.tag}</div>
              <h3 className="lp-feature-display__title">{f.title}</h3>
              <p className="lp-feature-display__desc">{f.desc}</p>
            </div>
          </div>

          {/* 미니 그리드 */}
          <div className="lp-features__mini-grid lp-reveal">
            {FEATURES.map((ft, i) => (
              <div key={ft.title} className={`lp-feature-mini${activeFeature === i ? ' active' : ''}`} onClick={() => selectFeature(i)}>
                <div className="lp-feature-mini__icon">{ft.icon}</div>
                <div className="lp-feature-mini__title">{ft.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 사용 방법 3스텝 ── */}
      <section className="lp-howto" id="lp-howto">
        <div className="lp-container">
          <div className="lp-howto__header lp-reveal">
            <div className="lp-section-label">How it works</div>
            <h2 className="lp-section-title">
              단 3단계로<br />
              <span className="lp-gradient-text">오늘의 영화</span>를 찾아요
            </h2>
          </div>
          <div className="lp-howto__steps lp-reveal">
            {[
              { icon: '🎯', num: '01', title: '취향 설정', desc: '장르를 고르고 영화 월드컵으로\n나만의 성향을 알아가요' },
              { icon: '💬', num: '02', title: 'AI와 대화', desc: '오늘 기분, 상황, 원하는 분위기를\n자연어로 말해보세요' },
              { icon: '🍿', num: '03', title: '바로 감상', desc: 'OTT 바로가기, 영화관 예약까지\n한 번에 연결해드려요' },
            ].map((s) => (
              <div className="lp-step-card" key={s.num}>
                <div className="lp-step-card__circle">{s.icon}</div>
                <div className="lp-step-card__num">{s.num}</div>
                <h3 className="lp-step-card__title">{s.title}</h3>
                <p className="lp-step-card__desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 차별점 ── */}
      <section className="lp-diff">
        <div className="lp-container">
          <div className="lp-diff__box lp-reveal">
            <div>
              <div className="lp-section-label">Why Monglepick</div>
              <h2 className="lp-section-title" style={{ marginBottom: 20 }}>
                다른 추천 서비스와<br />무엇이 다를까요?
              </h2>
              <p className="lp-section-subtitle">
                단순한 장르 필터링이 아니에요. 감정, 상황, 취향을
                종합적으로 분석해 진짜 맞춤 추천을 드려요.
              </p>
            </div>
            <div className="lp-diff__items">
              {[
                { icon: '🧠', text: '감정 분석 기반 AI 추천', sub: 'LLM 기반 의도+감정 통합 분류 모델 적용' },
                { icon: '🎮', text: '게임화된 취향 분석', sub: '영화 월드컵 이지선다로 재미있게' },
                { icon: '💞', text: '시네마 소울메이트 매칭', sub: '취향 유사도 TOP 10 유저 연결' },
                { icon: '📺', text: 'OTT 통합 연동', sub: '넷플릭스, 왓챠, 디즈니+ 등 한번에' },
              ].map((d) => (
                <div className="lp-diff-item" key={d.text}>
                  <span className="lp-diff-item__icon">{d.icon}</span>
                  <div>
                    <div className="lp-diff-item__text">{d.text}</div>
                    <div className="lp-diff-item__sub">{d.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 팀 소개 ── */}
      <section className="lp-team" id="lp-team">
        <div className="lp-container">
          <div className="lp-team__header lp-reveal">
            <div className="lp-section-label">Our Team</div>
            <h2 className="lp-section-title">몽글픽을 만드는 사람들</h2>
            <p className="lp-section-subtitle" style={{ margin: '0 auto' }}>
              각자의 전문 영역에서 하나의 목표를 향해 달리고 있습니다
            </p>
          </div>

          <div className="lp-team__grid">
            {TEAM_MEMBERS.map((m, i) => (
              <div className={`lp-team-card lp-reveal lp-reveal-delay-${i + 1}`} key={m.name} style={{ '--card-accent': m.color }}>
                <div className="lp-team-card__top">
                  <div className="lp-team-card__avatar" style={{ background: m.color, color: m.color === '#ffd166' ? '#0a0a14' : '#fff' }}>
                    {m.initials}
                  </div>
                  <div className="lp-team-card__info">
                    <h3>{m.name}</h3>
                    <div className="lp-team-card__role" style={{ color: m.color }}>{m.role}</div>
                  </div>
                </div>
                <p className="lp-team-card__desc">{m.desc}</p>
                <div className="lp-team-card__tags">
                  {m.tags.map((t, j) => (
                    <span className="lp-tag" key={j} style={{ background: m.color + '18', borderColor: m.color + '30', color: m.color }}>{t}</span>
                  ))}
                </div>
                <div className="lp-team-card__progress">
                  <div className="lp-progress-header">
                    <span className="lp-progress-label">구현 진행률</span>
                    <span className="lp-progress-value" style={{ color: m.color }}>{m.progress}%</span>
                  </div>
                  <div className="lp-progress-bar">
                    <div className="lp-progress-fill" data-width={m.progress} style={{ background: `linear-gradient(90deg, ${m.color}, var(--lp-accent-cyan))` }} />
                  </div>
                </div>
                <div className="lp-team-card__req" style={{ background: m.color + '12', borderColor: m.color + '25', color: m.color }}>{m.req}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 기술 스택 ── */}
      <section className="lp-tech" id="lp-tech">
        <div className="lp-container">
          <div className="lp-tech__header lp-reveal">
            <div className="lp-section-label">Tech Stack</div>
            <h2 className="lp-section-title">검증된 기술의 조합</h2>
          </div>
          <div className="lp-tech__categories">
            {[
              { title: 'AI / LLM', dot: '#7c6cf0', items: ['EXAONE 4.0 32B (한국어 생성)', 'Qwen 3.5 35B (의도/감정/이미지)', 'Upstage Solar (임베딩 4096D)', 'LangGraph StateGraph', 'LangSmith Tracing', 'Ollama (Apple Silicon Metal)'] },
              { title: 'Backend', dot: '#ef476f', items: ['Spring Boot 4.0.3 (Java 21)', 'FastAPI + uvicorn', 'JWT Authentication', 'SSE Streaming', 'structlog Logging'] },
              { title: 'Database (5)', dot: '#118ab2', items: ['MySQL 8.0 (36 Tables)', 'Qdrant (Vector, 4096D)', 'Neo4j 5 (Graph)', 'Elasticsearch 8.17 (Nori)', 'Redis 7 (Cache + Session)'] },
              { title: 'Infrastructure', dot: '#06d6a0', items: ['Docker Compose (Multi VM)', 'Nginx (SSL + SSE Proxy)', 'GitHub Actions CI/CD', 'Prometheus + Grafana + Loki', 'Kakao Cloud (4 VM)'] },
            ].map((cat, i) => (
              <div className={`lp-tech-category lp-reveal lp-reveal-delay-${i + 1}`} key={cat.title}>
                <h3 className="lp-tech-category__title">{cat.title}</h3>
                <div className="lp-tech-category__items">
                  {cat.items.map((item, j) => (
                    <div className="lp-tech-item" key={j}>
                      <span className="lp-tech-item__dot" style={{ background: cat.dot }} />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 데이터 규모 ── */}
      <section className="lp-data">
        <div className="lp-container">
          <div className="lp-data__header lp-reveal">
            <div className="lp-section-label">Data Scale</div>
            <h2 className="lp-section-title">117만 편의 영화 데이터</h2>
            <p className="lp-section-subtitle" style={{ margin: '0 auto' }}>
              TMDB, KOBIS, KMDb, Kaggle 4개 소스에서 수집한 방대한 데이터
            </p>
          </div>
          <div className="lp-data__grid">
            {[
              { value: '1.17M', label: 'TMDB 영화 데이터', sub: '25.6GB JSONL, 39개 필드' },
              { value: '157K', label: '현재 DB 적재', sub: '5개 DB 동기화' },
              { value: '26M', label: '시청 이력 레코드', sub: '270K 유저 기반 CF' },
              { value: '117K', label: 'KOBIS 영화', sub: '영화진흥위원회 API' },
              { value: '43K', label: 'KMDb 영화', sub: '한국영화데이터베이스' },
              { value: '586K', label: 'Redis 캐시 키', sub: 'CF 캐시 975MB' },
            ].map((d, i) => (
              <div className={`lp-data-card lp-reveal lp-reveal-delay-${(i % 4) + 1}`} key={d.label}>
                <div className="lp-data-card__value">{d.value}</div>
                <div className="lp-data-card__label">{d.label}</div>
                <div className="lp-data-card__sub">{d.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 진행 현황 ── */}
      <section className="lp-timeline" id="lp-progress">
        <div className="lp-container">
          <div className="lp-timeline__header lp-reveal">
            <div className="lp-section-label">Progress</div>
            <h2 className="lp-section-title">구현 여정</h2>
          </div>
          <div className="lp-timeline__list lp-reveal">
            {[
              { dot: 'done', title: 'Phase 0~1 — 스캐폴딩 + 데이터 파이프라인', desc: 'FastAPI 구조, Docker Compose, TMDB/Kaggle/KOBIS/KMDb 수집, 하이브리드 RAG', badge: 'done' },
              { dot: 'done', title: 'Phase 2~3 — LLM 체인 + Chat Agent', desc: '6개 LLM 체인, LangGraph 13노드 StateGraph, SSE/sync API, 148 tests', badge: 'done' },
              { dot: 'done', title: 'Phase 4 — 추천 엔진 + 보안 강화', desc: '7노드 CF+CBF+MMR, VLM 이미지 분석, 세션 영속화, 보안 강화 — 308 tests', badge: 'done' },
              { dot: 'active', title: '전체 재적재', desc: 'TMDB 1.17M건 스트리밍 배치 → 3DB 적재 (run_full_reload.py)', badge: 'active' },
              { dot: '', title: 'Phase 5~8', desc: 'SSE 최적화, LangChain Tools, 콘텐츠 분석, 테스트 & 최적화', badge: 'pending' },
            ].map((item) => (
              <div className="lp-timeline-item" key={item.title}>
                <div className={`lp-timeline-item__dot${item.dot ? ` lp-timeline-item__dot--${item.dot}` : ''}`} />
                <div className="lp-timeline-item__content">
                  <h4>{item.title} <span className={`lp-timeline-badge lp-timeline-badge--${item.badge}`}>
                    {item.badge === 'done' ? '완료' : item.badge === 'active' ? '진행 중' : '예정'}
                  </span></h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="lp-cta" id="lp-cta">
        <div className="lp-container lp-reveal">
          <div className="lp-cta__icon">🎬</div>
          <h2 className="lp-cta__title">
            오늘 밤 볼 영화,<br />
            <span className="lp-gradient-text">지금 바로 찾아볼까요?</span>
          </h2>
          <p className="lp-cta__desc">
            회원가입하고 나만의 영화 취향을 분석해보세요.<br />
            카카오, 구글, 네이버로 10초 만에 시작할 수 있어요.
          </p>
          <div className="lp-cta__buttons">
            <Link to={ROUTES.CHAT} className="lp-btn lp-btn--primary" style={{ fontSize: '1.05rem', padding: '16px 40px' }}>무료로 시작하기 &rarr;</Link>
            <a href="#lp-features" onClick={e => scrollTo(e, 'lp-features')} className="lp-btn lp-btn--glass" style={{ fontSize: '1.05rem', padding: '16px 40px' }}>더 알아보기</a>
          </div>
          <p className="lp-cta__sub">신용카드 불필요 · 언제든지 탈퇴 가능</p>
        </div>
      </section>

      {/* ── 푸터 ── */}
      <footer className="lp-footer">
        <div className="lp-container lp-footer__inner">
          <span className="lp-footer__text"><span>MONGLEPICK</span> — AI Movie Recommendation Platform</span>
          <div className="lp-footer__links">
            <span>이용약관</span>
            <span>개인정보처리방침</span>
            <span>고객센터</span>
          </div>
          <span className="lp-footer__text">&copy; 2026 몽글픽. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
