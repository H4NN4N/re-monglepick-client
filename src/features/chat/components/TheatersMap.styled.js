/**
 * TheatersMap 스타일 (2026-05-11).
 *
 * 영화관 카드 리스트 위쪽에 16:9 비율로 표시되는 통합 지도.
 * 너비는 부모(ChatMovieCards) 의 가용 폭에 맞춰지며, 모바일/데스크탑 모두 동일 UX.
 */

import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 8px;
  /* 채팅 메시지 가로 폭 대비 적당히 — 카드 리스트와 동일한 최대 폭 사용.
     ChatMovieCards 가 가로 스크롤이지만 본 컴포넌트는 그 위에 별도로 배치되므로
     가로 스크롤 컨테이너 바깥에 위치하도록 ChatWindow 에서 형제로 렌더. */
  width: 100%;
`;

export const Header = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  padding: 0 2px;
`;

export const Title = styled.h4`
  margin: 0;
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const Hint = styled.div`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.textMuted};

  & > span {
    margin-left: 4px;
  }
`;

export const MapContainer = styled.div`
  width: 100%;
  /* 16:9 비율 — 위성 사진처럼 너무 정사각형이면 답답하고, 가로로 길면 위치 식별 어려움.
     CSS aspect-ratio 로 부모 폭에 자동 비례. */
  aspect-ratio: 16 / 9;
  min-height: 220px;
  max-height: 360px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.borderDefault};
  background-color: ${({ theme }) => theme.colors.bgTertiary};
  position: relative;
`;

export const MapHint = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textMuted};
  background-color: ${({ theme }) => theme.colors.bgSecondary};
  pointer-events: none;
`;
