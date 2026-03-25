/**
 * 404 Not Found 페이지 컴포넌트.
 *
 * 존재하지 않는 URL에 접근했을 때 표시되는 에러 페이지.
 * App.jsx의 catch-all 라우트(<Route path="*">)에서 렌더링된다.
 *
 * 개선 사항:
 * - 404 숫자 fade-in + scale 애니메이션
 * - 배경에 떠다니는 필름 프레임 이모지 (CSS float 애니메이션)
 * - "영화 검색" 링크 추가
 */

import { Link } from 'react-router-dom';
import { ROUTES } from '../../../shared/constants/routes';
import './NotFoundPage.css';

export default function NotFoundPage() {
  return (
    <div className="not-found">
      {/* 배경 떠다니는 이모지 장식 */}
      <span className="not-found__float not-found__float--1" aria-hidden="true">🎬</span>
      <span className="not-found__float not-found__float--2" aria-hidden="true">🎞️</span>
      <span className="not-found__float not-found__float--3" aria-hidden="true">🍿</span>
      <span className="not-found__float not-found__float--4" aria-hidden="true">🎭</span>

      <div className="not-found__inner">
        {/* 404 코드 — fade-in + scale 애니메이션 */}
        <h1 className="not-found__code">404</h1>

        {/* 안내 메시지 */}
        <p className="not-found__message">
          요청하신 페이지를 찾을 수 없습니다.
        </p>
        <p className="not-found__description">
          주소가 잘못되었거나, 더 이상 존재하지 않는 페이지입니다.
        </p>

        {/* 액션 링크들 */}
        <div className="not-found__actions">
          {/* 홈으로 이동 버튼 */}
          <Link to={ROUTES.HOME} className="not-found__home-link">
            홈으로 돌아가기
          </Link>
          {/* 영화 검색 링크 */}
          <Link to={ROUTES.SEARCH} className="not-found__search-link">
            🔍 영화 검색
          </Link>
        </div>
      </div>
    </div>
  );
}
