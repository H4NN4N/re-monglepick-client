# monglepick-client — React 프론트엔드

> React 19 + Vite 7 + React Router v7 | 포트 5173 | npm

## 빠른 시작

```bash
cd /Users/yoonhyungjoo/Documents/monglepick/monglepick-client
npm run dev              # 개발 서버 (localhost:5173)
npm run build            # 프로덕션 빌드
npm run lint             # ESLint 검사
npm run preview          # 빌드 미리보기
```

## 프로젝트 구조 (Feature-Sliced Design)

```
src/
├── app/
│   ├── App.jsx              # BrowserRouter (11개 라우트) + AuthProvider
│   └── providers/AuthProvider.jsx  # JWT Context (login/logout/useAuth)
├── features/                # 피처 모듈 (13개)
│   ├── landing/             # 랜딩 페이지
│   ├── auth/                # 로그인/회원가입/OAuth 콜백
│   ├── chat/                # AI 채팅 (SSE + 포인트 연동)
│   ├── home/                # 홈 (추천 질문, 인기 영화)
│   ├── search/              # 검색 (키워드+필터)
│   ├── movie/               # 영화 상세
│   ├── community/           # 커뮤니티 (게시판)
│   ├── review/              # 리뷰
│   ├── user/                # 마이페이지
│   ├── point/               # 포인트 (잔액/출석/아이템/이력)
│   ├── payment/             # 결제/구독 (Toss Payments)
│   ├── support/             # 고객센터 (FAQ/도움말/티켓)
│   └── error/               # 404 NotFoundPage
├── shared/
│   ├── components/          # Header, Footer, MainLayout, Loading
│   ├── constants/           # routes.js, api.js, oauth.js
│   ├── styles/              # variables.css, global.css
│   └── utils/               # fetchWithAuth.js, storage.js, formatters.js, validators.js
└── main.jsx
```

## 코딩 컨벤션

- **상태 관리**: Context API만 사용 (Redux/Zustand 금지)
- **HTTP**: Fetch API + fetchWithAuth 래퍼 (axios 금지)
- **스타일**: CSS Variables (`shared/styles/variables.css`), CSS Modules
- **인증**: fetchWithAuth → 401 시 자동 토큰 갱신 → 실패 시 logout
- **라우팅**: React Router v7, PrivateRoute로 인증 보호
- **주석**: JSDoc 한국어 주석 필수
- **Key prop**: 배열 렌더링 시 index 금지, 고유값 사용
- **Cleanup**: useEffect에서 타이머/리스너 반드시 정리

## API 연동

- **프록시 설정** (vite.config.js):
  - `/api/v1/auth`, `/api/v1/users`, `/api/v1/point`, `/api/v1/payment`, `/api/v1/subscription` → Backend :8080
  - `/api/*` → AI Agent :8000
- **엔드포인트 상수**: `shared/constants/api.js` (9개 그룹, 47개)

## SSE 이벤트 (채팅)

| 이벤트 | 처리 |
|--------|------|
| session | localStorage 저장 |
| status | 상태 인디케이터 |
| movie_card | 영화 카드 렌더링 |
| clarification | 힌트 칩 버튼 |
| token | 텍스트 스트리밍 |
| point_update | 포인트 바 표시 |
| done | 완료 처리 |
| error | 에러 배너 |

## 빌드 확인

코드 수정 후 반드시 `npm run build` 실행하여 빌드 성공 확인
