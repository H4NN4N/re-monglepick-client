# monglepick-client — React 프론트엔드

> React 19 + Vite 7 + React Router v7 + axios + Zustand | 포트 5173 | npm

## 빠른 시작

```bash
cd /Users/yoonhyungjoo/Documents/monglepick/monglepick-client
cp .env.example .env           # 환경변수 설정 (최초 1회)
npm install                    # 의존성 설치
npm run dev                    # 개발 서버 (localhost:5173)
npm run build                  # 프로덕션 빌드
npm run lint                   # ESLint 검사
npm run preview                # 빌드 미리보기
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
│   ├── api/                 # axiosInstance.js (JWT interceptor)
│   ├── stores/              # useAuthStore.js (Zustand 전역 상태)
│   ├── components/          # Header, Footer, MainLayout, Loading
│   ├── constants/           # routes.js, api.js, oauth.js
│   ├── styles/              # variables.css, global.css
│   └── utils/               # storage.js, formatters.js, validators.js
└── main.jsx
```

## 환경변수 (.env)

`.env.example`을 복사하여 `.env` 생성. Vite 환경변수는 `VITE_` 접두사 필수.

| 변수 | 설명 | 기본값 |
|---|---|---|
| `VITE_API_BASE_URL` | API 기본 URL (개발: 빈 문자열, 프로덕션: 도메인) | `''` |
| `VITE_BACKEND_URL` | Spring Boot 백엔드 URL | `http://localhost:8080` |
| `VITE_AGENT_URL` | AI Agent URL | `http://localhost:8000` |
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth 클라이언트 ID | |
| `VITE_KAKAO_CLIENT_ID` | Kakao OAuth 클라이언트 ID | |
| `VITE_NAVER_CLIENT_ID` | Naver OAuth 클라이언트 ID | |
| `VITE_OAUTH_REDIRECT_BASE` | OAuth 콜백 기본 도메인 | `http://localhost:5173` |
| `VITE_TOSS_CLIENT_KEY` | Toss Payments 클라이언트 키 | |

## 코딩 컨벤션

- **상태 관리**: Zustand (`shared/stores/`) — 전역 상태(인증 등)에 사용
  - 선택적 구독(selector)으로 리렌더링 최소화: `useAuthStore((s) => s.user)`
  - SSE/AbortController 등 컴포넌트 생명주기 결합 로직은 커스텀 훅(useChat) 유지
- **HTTP**: axios 인스턴스 (`shared/api/axiosInstance.js`) 사용
  - SSE 스트리밍(chatApi)만 예외적으로 fetch API 사용
- **인증**: axios interceptor가 JWT 자동 주입 + 401 시 토큰 갱신 + 재시도
  - 인증 필수 API: `requireAuth()` 가드 호출 후 `api.get()`/`api.post()` 사용
  - 공개 API: `api.get()` 그대로 사용 (토큰 없으면 Authorization 헤더 생략)
- **스타일**: CSS Variables (`shared/styles/variables.css`), BEM 네이밍
- **라우팅**: React Router v7, PrivateRoute로 인증 보호
- **주석**: JSDoc 한국어 주석 필수
- **Key prop**: 배열 렌더링 시 index 금지, 고유값 사용
- **Cleanup**: useEffect에서 타이머/리스너 반드시 정리

## API 연동

### axios 인스턴스 사용법

```javascript
// 일반 API (토큰 있으면 자동 주입)
import api from '../../../shared/api/axiosInstance';
const data = await api.get(ENDPOINT);
const data = await api.post(ENDPOINT, body);

// 인증 필수 API (토큰 없으면 즉시 에러)
import api, { requireAuth } from '../../../shared/api/axiosInstance';
requireAuth();
const data = await api.get(ENDPOINT);
```

### 프록시 설정 (vite.config.js)

`.env`의 `VITE_BACKEND_URL`/`VITE_AGENT_URL`을 참조:
- `/api/v1/auth`, `/api/v1/users`, `/api/v1/point`, `/api/v1/payment`, `/api/v1/subscription` → Backend
- `/api/*` → AI Agent

### 엔드포인트 상수

`shared/constants/api.js` (9개 그룹, 47개)

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
