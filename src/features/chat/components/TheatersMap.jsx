/**
 * TheatersMap — 영화관 카드 리스트 위에 표시되는 통합 카카오맵 (2026-05-11).
 *
 * Phase 6 외부 지도 연동의 후속 UX 개선:
 *  - 기존 TheaterCard 별 인라인 미니맵은 카드를 하나하나 펼쳐야 위치를 알 수 있어
 *    여러 영화관을 동시에 비교하기 어려웠다.
 *  - 본 컴포넌트는 모든 영화관 마커 + 사용자 위치 마커를 하나의 지도에 동시 표시 +
 *    bounds 자동 조정 + 마커 클릭 시 InfoWindow(영화관명·거리·외부 링크) 토글.
 *
 * 디자인 원칙:
 *  - useKakaoMap 훅과 동일한 SDK 로딩 경로 (loadKakaoMapSdk) 재사용 — 페이지 전체에서 1회만 로드.
 *  - SDK 키 미설정 시 hidden 처리 — TheaterCard 외부 링크 fallback 으로 충분.
 *  - theater_search 결과가 0건이면 컴포넌트 자체를 hidden — 빈 지도 노출 방지.
 *  - 마커 색상: CGV 빨강 / 롯데시네마 진빨강 / 메가박스 보라 / 기타 회색 (브랜드 컬러 매칭).
 *    카카오 기본 마커 이미지는 모두 동일 빨강이라 체인 식별이 안 되므로 SVG MarkerImage 로 대체.
 *  - 사용자 위치 마커는 useKakaoMap 의 USER_MARKER_SVG 재사용 (파랑).
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  isKakaoMapAvailable,
  loadKakaoMapSdk,
  USER_MARKER_SVG,
} from '../hooks/useKakaoMap';
import * as S from './TheatersMap.styled';

// 체인 → 마커 색상 — TheaterCard.styled.js 의 CHAIN_COLORS 와 동일 팔레트.
// 통합 지도에서 한눈에 체인을 구분하기 위해 마커 SVG 의 fill 을 체인별로 다르게 매핑한다.
const CHAIN_MARKER_COLORS = {
  CGV: '#e51937',
  롯데시네마: '#ed1c24',
  메가박스: '#592a8c',
  기타: '#888888',
};

/**
 * @param {object} props
 * @param {Array<{theater_id, name, chain, address, latitude, longitude, distance_m, place_url, booking_url}>} props.theaters
 *   - 표시할 영화관 목록 (좌표 누락 항목은 자동 스킵).
 * @param {{latitude:number, longitude:number, address?:string}|null} [props.userLocation]
 *   - 사용자 위치 (있으면 파란 마커 + bounds 포함).
 */
export default function TheatersMap({ theaters = [], userLocation = null }) {
  const containerRef = useRef(null);

  // Map 및 마커/InfoWindow 인스턴스를 ref 로 보관 — 좌표 갱신 시 재사용.
  const mapRef = useRef(null);
  const markersRef = useRef([]);          // 영화관 마커 배열 (체인별 색상)
  const userMarkerRef = useRef(null);     // 사용자 위치 마커
  const infoWindowRef = useRef(null);     // 단일 InfoWindow 인스턴스 (클릭마다 갱신)

  const [status, setStatus] = useState(isKakaoMapAvailable() ? 'idle' : 'unsupported');
  const [error, setError] = useState(null);

  // 좌표가 있는 영화관만 필터 — 카카오 응답에서 좌표 누락이 종종 발생 (사라진 영업소 등).
  const plottable = useMemo(
    () => theaters.filter((t) => t && t.latitude && t.longitude),
    [theaters],
  );

  useEffect(() => {
    // 카카오 JS 키 미설정 또는 좌표 0건 → 지도 표시 보류
    if (!isKakaoMapAvailable()) return;
    if (plottable.length === 0) return;
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;

    (async () => {
      setStatus('loading');
      setError(null);
      try {
        const kakao = await loadKakaoMapSdk();
        if (cancelled) return;

        // 최초 마운트 — Map 인스턴스 생성. 초기 center 는 첫 영화관 좌표 (이후 fitBounds 가 덮어씀).
        if (!mapRef.current) {
          mapRef.current = new kakao.maps.Map(container, {
            center: new kakao.maps.LatLng(plottable[0].latitude, plottable[0].longitude),
            level: 5,
            draggable: true,
            scrollwheel: false,  // 채팅 스크롤과 충돌 방지
          });
        }

        // 단일 InfoWindow 재사용 — 마커 클릭마다 콘텐츠/위치만 갱신.
        if (!infoWindowRef.current) {
          infoWindowRef.current = new kakao.maps.InfoWindow({ removable: true });
        }

        // 기존 마커 전부 제거 후 재구성 — theaters 가 바뀌었을 수 있으므로.
        markersRef.current.forEach((m) => m.setMap(null));
        markersRef.current = [];

        const bounds = new kakao.maps.LatLngBounds();

        // 영화관 마커 — 체인별 색상으로 구분
        for (const t of plottable) {
          const chainColor = CHAIN_MARKER_COLORS[t.chain] || CHAIN_MARKER_COLORS.기타;
          const markerImage = new kakao.maps.MarkerImage(
            'data:image/svg+xml;utf8,' + encodeURIComponent(buildChainMarkerSvg(chainColor)),
            new kakao.maps.Size(28, 38),
            { offset: new kakao.maps.Point(14, 38) },
          );
          const pos = new kakao.maps.LatLng(t.latitude, t.longitude);
          const marker = new kakao.maps.Marker({
            position: pos,
            map: mapRef.current,
            image: markerImage,
            title: t.name,
          });
          // 마커 클릭 → InfoWindow 열기 (영화관명 + 거리 + 예매/카카오맵 링크).
          // 카카오 InfoWindow 는 HTML 문자열을 그대로 렌더하므로 escape 필수.
          kakao.maps.event.addListener(marker, 'click', () => {
            const content = buildInfoWindowContent(t);
            infoWindowRef.current.setContent(content);
            infoWindowRef.current.open(mapRef.current, marker);
          });
          markersRef.current.push(marker);
          bounds.extend(pos);
        }

        // 사용자 위치 마커 — 파란색. bounds 에도 포함하여 "사용자 ↔ 영화관" 전체가 한눈에.
        if (userMarkerRef.current) {
          userMarkerRef.current.setMap(null);
          userMarkerRef.current = null;
        }
        if (userLocation?.latitude && userLocation?.longitude) {
          const userImage = new kakao.maps.MarkerImage(
            'data:image/svg+xml;utf8,' + encodeURIComponent(USER_MARKER_SVG),
            new kakao.maps.Size(24, 35),
            { offset: new kakao.maps.Point(12, 35) },
          );
          const userPos = new kakao.maps.LatLng(userLocation.latitude, userLocation.longitude);
          userMarkerRef.current = new kakao.maps.Marker({
            position: userPos,
            map: mapRef.current,
            image: userImage,
            title: '내 위치',
            zIndex: 10,  // 영화관 마커 위로 (겹칠 때 사용자 위치가 위)
          });
          bounds.extend(userPos);
        }

        // bounds 자동 조정 — 모든 마커가 화면 안에 들어오도록.
        // 마커가 1개뿐이면 fitBounds 가 zoom 을 너무 확대시킬 수 있으므로 level 보정.
        if (plottable.length === 1 && !userLocation) {
          mapRef.current.setCenter(
            new kakao.maps.LatLng(plottable[0].latitude, plottable[0].longitude),
          );
          mapRef.current.setLevel(4);
        } else {
          mapRef.current.setBounds(bounds);
        }

        setStatus('ready');
      } catch (err) {
        if (cancelled) return;
        setStatus('error');
        setError(err?.message || '지도를 불러오지 못했어요.');
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [plottable, userLocation]);

  // 키 없음 또는 표시할 영화관 없음 → 컴포넌트 자체 hidden (TheaterCard fallback 으로 충분)
  if (!isKakaoMapAvailable()) return null;
  if (plottable.length === 0) return null;

  return (
    <S.Wrapper>
      <S.Header>
        <S.Title>🗺️ 근처 영화관 위치</S.Title>
        <S.Hint>
          마커를 누르면 영화관 정보가 표시돼요
          {plottable.length < theaters.length && (
            <span> · 좌표 누락 {theaters.length - plottable.length}곳 제외</span>
          )}
        </S.Hint>
      </S.Header>
      <S.MapContainer ref={containerRef} aria-label="근처 영화관 통합 지도" />
      {status === 'loading' && <S.MapHint>지도를 불러오는 중...</S.MapHint>}
      {status === 'error' && <S.MapHint>{error || '지도를 불러오지 못했어요.'}</S.MapHint>}
    </S.Wrapper>
  );
}

/**
 * 체인별 색상 마커 SVG.
 * 카카오 기본 마커는 모두 같은 빨강이라 체인 구분이 안 되므로 직접 그린다.
 * 28×38, 앵커 (14,38) — 마커 끝점이 좌표를 가리키도록.
 */
function buildChainMarkerSvg(fillColor) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="38" viewBox="0 0 28 38">
    <path d="M14 0C6.3 0 0 6.3 0 14c0 10.5 14 24 14 24s14-13.5 14-24c0-7.7-6.3-14-14-14z" fill="${fillColor}"/>
    <circle cx="14" cy="14" r="5.5" fill="#fff"/>
  </svg>`;
}

/**
 * InfoWindow HTML 문자열 빌더.
 * 영화관명·거리·도로명주소·예매/카카오맵 외부 링크.
 * 카카오 InfoWindow 는 HTML 문자열을 그대로 렌더 → escape 필수.
 */
function buildInfoWindowContent(theater) {
  const name = escapeHtml(theater.name || '');
  const address = escapeHtml(theater.address || '');
  const distance = formatDistance(theater.distance_m);
  const placeUrl = theater.place_url || '';
  const bookingUrl = theater.booking_url || '';

  return `
    <div style="padding:10px 12px;min-width:200px;max-width:260px;font-family:inherit;color:#222;">
      <div style="font-size:14px;font-weight:700;margin-bottom:4px;">${name}</div>
      ${distance ? `<div style="font-size:12px;color:#666;margin-bottom:2px;">${distance}</div>` : ''}
      ${address ? `<div style="font-size:12px;color:#888;margin-bottom:8px;line-height:1.4;">${address}</div>` : ''}
      <div style="display:flex;gap:6px;">
        ${placeUrl ? `<a href="${escapeHtml(placeUrl)}" target="_blank" rel="noopener noreferrer" style="flex:1;padding:6px 8px;font-size:12px;text-align:center;border:1px solid #ddd;border-radius:6px;text-decoration:none;color:#444;">↗ 카카오맵</a>` : ''}
        ${bookingUrl ? `<a href="${escapeHtml(bookingUrl)}" target="_blank" rel="noopener noreferrer" style="flex:1;padding:6px 8px;font-size:12px;text-align:center;background:#7c3aed;color:#fff;border-radius:6px;text-decoration:none;">🎟️ 예매</a>` : ''}
      </div>
    </div>
  `;
}

function formatDistance(meters) {
  if (!meters || meters <= 0) return '';
  if (meters < 1000) return `${meters}m`;
  return `${(meters / 1000).toFixed(1)}km`;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
