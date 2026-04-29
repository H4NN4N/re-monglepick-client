/**
 * 프로필 꾸미기 섹션 — 2026-04-28 v3.5 6슬롯 합성으로 확장.
 *
 * <p>마이페이지 "꾸미기" 탭에서 사용자가 보유한 6 카테고리 아이템(아바타·배지·프레임·배경·
 * 칭호·이펙트) 을 한 화면에서 보고 클릭 한 번으로 장착/해제할 수 있도록 한다.</p>
 *
 * <h3>구성</h3>
 * <ul>
 *   <li>좌측 미리보기 카드 — 6슬롯을 z-index 레이어로 합성 (배경→아바타→프레임→이펙트→텍스트)</li>
 *   <li>우측 보유 슬롯 — 카테고리별 그리드 (6개 섹션, 보유 아이템이 있는 카테고리만 노출)</li>
 * </ul>
 *
 * <h3>장착 흐름</h3>
 * <ol>
 *   <li>슬롯 클릭 → onEquip(userItem) 호출 → 부모(MyPage) 가 equipItem API 호출</li>
 *   <li>부모가 미리보기/equipped state 갱신 → 슬롯 재렌더</li>
 *   <li>같은 카테고리 기존 장착물은 Backend 가 자동 해제</li>
 * </ol>
 *
 * <h3>이펙트 매핑</h3>
 * <p>이펙트 PointItem 의 itemName 또는 imageUrl 끝부분을 읽어 effectKey 로 변환한다 ({@link resolveEffectKey}).
 * 매핑 키: popcorn / sparkle / film / pulse. 미인식 시 pulse 로 fallback.</p>
 *
 * @param {Object}   props
 * @param {Array}    [props.avatars]         보유 아바타 UserItem 배열
 * @param {Array}    [props.badges]          보유 배지 UserItem 배열
 * @param {Array}    [props.frames]          보유 프레임 UserItem 배열 (2026-04-28 신규)
 * @param {Array}    [props.backgrounds]     보유 배경 UserItem 배열 (2026-04-28 신규)
 * @param {Array}    [props.titles]          보유 칭호 UserItem 배열 (2026-04-28 신규)
 * @param {Array}    [props.effects]         보유 이펙트 UserItem 배열 (2026-04-28 신규)
 * @param {Object|null} props.equippedAvatar    현재 착용 아바타
 * @param {Object|null} props.equippedBadge     현재 착용 배지
 * @param {Object|null} [props.equippedFrame]      현재 착용 프레임 (2026-04-28 신규)
 * @param {Object|null} [props.equippedBackground] 현재 착용 배경 (2026-04-28 신규)
 * @param {Object|null} [props.equippedTitle]      현재 착용 칭호 (2026-04-28 신규)
 * @param {Object|null} [props.equippedEffect]     현재 착용 이펙트 (2026-04-28 신규)
 * @param {Object}   props.user            사용자 (닉네임 표시)
 * @param {string}   props.fallbackAvatar  업로드된 프로필 이미지 URL (아바타 미장착 시 사용)
 * @param {Function} props.onEquip         (userItem) => Promise — 장착
 * @param {Function} props.onUnequip       (userItem) => Promise — 해제
 * @param {Function} props.onGoShop        () => void — 보유 0건일 때 상점 이동 CTA
 * @param {boolean}  props.loading         초기 로딩 중
 */

import { useState } from 'react';
import * as S from './ProfileCustomizeSection.styled';

/**
 * 카테고리별 표시 메타 — 슬롯 섹션 헤더 라벨 + placeholder 이모지.
 *
 * 운영자 등록 시점에 imageUrl 이 비어 있는 경우의 fallback 도 여기서 결정한다.
 */
const CATEGORY_META = {
  avatar:     { label: '아바타',  emoji: '🎭' },
  badge:      { label: '배지',    emoji: '⭐' },
  frame:      { label: '프레임',  emoji: '🖼️' },
  background: { label: '배경',    emoji: '🎬' },
  title:      { label: '칭호',    emoji: '🏆' },
  effect:     { label: '이펙트',  emoji: '✨' },
};

/**
 * 이펙트 PointItem 으로부터 effectKey 를 결정한다.
 *
 * 운영자가 등록한 이펙트는 EFFECT_GENERIC 타입을 공유하므로 별도 식별자가 없다.
 * itemName 또는 imageUrl 끝부분에 popcorn/sparkle/film/pulse 키워드가 포함돼 있으면 매핑.
 * 매핑 실패 시 pulse 로 fallback (가장 안전한 기본 효과).
 *
 * @param {Object|null} effectItem — 보유 이펙트 UserItem
 * @returns {string} effectKey — popcorn / sparkle / film / pulse
 */
function resolveEffectKey(effectItem) {
  if (!effectItem) return null;
  const haystack = `${effectItem.itemName || ''} ${effectItem.imageUrl || ''}`.toLowerCase();
  if (haystack.includes('popcorn')) return 'popcorn';
  if (haystack.includes('sparkle')) return 'sparkle';
  if (haystack.includes('film'))    return 'film';
  return 'pulse';
}

/**
 * 아이템 카드 1개 — 클릭 시 onClick.
 *
 * 이미지 로드 실패 시 카테고리별 placeholder 이모지로 fallback. 장착 중이면 active 보더 + 체크.
 * 만료된 아이템(expired=true)은 흐림 + 비활성.
 */
function ItemCard({ item, equipped, onClick }) {
  const [imgErrored, setImgErrored] = useState(false);
  const showImage = item.imageUrl && !imgErrored;
  const expired = item.expired || item.status === 'EXPIRED';
  const placeholder = CATEGORY_META[item.category]?.emoji || '🎁';

  return (
    <S.SlotButton
      type="button"
      $active={equipped}
      $disabled={expired}
      disabled={expired}
      onClick={() => !expired && onClick?.(item)}
      aria-pressed={equipped}
      title={expired ? `${item.itemName} (만료됨)` : item.itemName}
    >
      <S.SlotThumb>
        {showImage ? (
          <img src={item.imageUrl} alt={item.itemName} onError={() => setImgErrored(true)} />
        ) : (
          <S.SlotPlaceholder>{placeholder}</S.SlotPlaceholder>
        )}
        {equipped && <S.EquippedTick aria-hidden="true">✓</S.EquippedTick>}
      </S.SlotThumb>
      <S.SlotName>{item.itemName}</S.SlotName>
      {item.expiresAt && !expired && (
        <S.SlotMeta>{formatExpiresAt(item.expiresAt)}</S.SlotMeta>
      )}
      {expired && <S.SlotMeta $warning>만료됨</S.SlotMeta>}
    </S.SlotButton>
  );
}

/**
 * 만료일 포맷 — 7일 이내면 "n일 남음", 그 외에는 "YYYY-MM-DD 까지".
 */
function formatExpiresAt(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return '';
  const diffDays = Math.ceil((d.getTime() - Date.now()) / 86400000);
  if (diffDays <= 0) return '오늘 만료';
  if (diffDays <= 7) return `${diffDays}일 남음`;
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} 까지`;
}

/**
 * 슬롯 섹션 — 카테고리별 보유 그리드를 일관된 형태로 렌더한다 (DRY).
 *
 * 보유 아이템 0건이면 EmptyHint 표시. 카테고리별로 다른 메시지를 노출하되 공통 시각 양식 유지.
 */
function SlotSection({ category, items, equippedItem, onEquip, loading }) {
  const meta = CATEGORY_META[category] || { label: category, emoji: '🎁' };
  return (
    <S.SlotSection>
      <S.SlotSectionTitle>
        <span aria-hidden="true">{meta.emoji}</span>
        {meta.label}
        <S.SlotCount>{items.length}</S.SlotCount>
      </S.SlotSectionTitle>
      {loading ? (
        <S.EmptyHint>불러오는 중...</S.EmptyHint>
      ) : items.length === 0 ? (
        <S.EmptyHint>
          보유한 {meta.label}이(가) 없어요. 포인트 상점에서 교환할 수 있어요.
        </S.EmptyHint>
      ) : (
        <S.SlotGrid>
          {items.map((item) => (
            <ItemCard
              key={item.userItemId}
              item={item}
              equipped={equippedItem?.userItemId === item.userItemId}
              onClick={onEquip}
            />
          ))}
        </S.SlotGrid>
      )}
    </S.SlotSection>
  );
}

export default function ProfileCustomizeSection({
  avatars = [],
  badges = [],
  frames = [],
  backgrounds = [],
  titles = [],
  effects = [],
  equippedAvatar,
  equippedBadge,
  equippedFrame,
  equippedBackground,
  equippedTitle,
  equippedEffect,
  user,
  fallbackAvatar,
  onEquip,
  onUnequip,
  onGoShop,
  loading = false,
}) {
  /* 미리보기 아바타 — 착용 아바타 > 업로드 프로필 이미지 > 닉네임 이니셜 */
  const previewAvatarUrl = equippedAvatar?.imageUrl || fallbackAvatar || null;
  const previewInitial = user?.nickname?.charAt(0) || 'U';
  const hasAnyItem = avatars.length + badges.length + frames.length
    + backgrounds.length + titles.length + effects.length > 0;
  const effectKey = resolveEffectKey(equippedEffect);

  return (
    <S.Section aria-labelledby="customize-section-title">
      <S.SectionHeader>
        <S.SectionTitle id="customize-section-title">프로필 꾸미기</S.SectionTitle>
        <S.SectionDesc>
          포인트로 교환한 아이템 6종(아바타·배지·프레임·배경·칭호·이펙트)을 자유롭게 조합해 보세요.
          같은 카테고리 안에서 새로 장착하면 기존 아이템은 자동으로 해제돼요.
        </S.SectionDesc>
      </S.SectionHeader>

      <S.Grid>
        {/* ── 좌측 미리보기 카드 (6슬롯 z-index 합성) ── */}
        <S.PreviewCard>
          {/* z-index 0: 배경 레이어 (배경 미장착 시 렌더 안 함) */}
          {equippedBackground?.imageUrl && (
            <S.PreviewBackgroundLayer $url={equippedBackground.imageUrl} aria-hidden="true" />
          )}

          <S.PreviewLabel>미리보기</S.PreviewLabel>

          {/* z-index 1: 아바타 본체 (프레임 장착 시 자체 border 투명 처리) */}
          <S.PreviewAvatar $hasFrame={!!equippedFrame?.imageUrl}>
            {previewAvatarUrl ? (
              <img src={previewAvatarUrl} alt="아바타 미리보기" />
            ) : (
              <S.PreviewInitial>{previewInitial}</S.PreviewInitial>
            )}

            {/* z-index 2: 프레임 오버레이 */}
            {equippedFrame?.imageUrl && (
              <S.PreviewFrameOverlay aria-hidden="true">
                <img src={equippedFrame.imageUrl} alt="" />
              </S.PreviewFrameOverlay>
            )}

            {/* z-index 3: 이펙트 오버레이 (이미지가 있으면 합성, 없으면 keyframes 만 적용) */}
            {equippedEffect && (
              <S.PreviewEffectOverlay $effectKey={effectKey} aria-hidden="true">
                {equippedEffect.imageUrl && (
                  <img src={equippedEffect.imageUrl} alt="" />
                )}
              </S.PreviewEffectOverlay>
            )}

            {/* 우상단 배지 칩 (기존 위치 유지) */}
            {equippedBadge && (
              <S.PreviewBadge title={equippedBadge.itemName}>
                {equippedBadge.imageUrl ? (
                  <img src={equippedBadge.imageUrl} alt={equippedBadge.itemName} />
                ) : (
                  <span aria-hidden="true">⭐</span>
                )}
              </S.PreviewBadge>
            )}
          </S.PreviewAvatar>

          {/* 칭호 — 닉네임 위 */}
          {equippedTitle && (
            <S.PreviewTitle title={equippedTitle.itemName}>
              {equippedTitle.itemName}
            </S.PreviewTitle>
          )}

          <S.PreviewNickname>{user?.nickname || '나'}</S.PreviewNickname>

          {/* 6슬롯 미니 메타 */}
          <S.PreviewMeta>
            <span>아바타</span>
            <strong>{equippedAvatar?.itemName || '미적용'}</strong>
          </S.PreviewMeta>
          <S.PreviewMeta>
            <span>배지</span>
            <strong>{equippedBadge?.itemName || '미적용'}</strong>
          </S.PreviewMeta>
          <S.PreviewMeta>
            <span>프레임</span>
            <strong>{equippedFrame?.itemName || '미적용'}</strong>
          </S.PreviewMeta>
          <S.PreviewMeta>
            <span>배경</span>
            <strong>{equippedBackground?.itemName || '미적용'}</strong>
          </S.PreviewMeta>
          <S.PreviewMeta>
            <span>칭호</span>
            <strong>{equippedTitle?.itemName || '미적용'}</strong>
          </S.PreviewMeta>
          <S.PreviewMeta>
            <span>이펙트</span>
            <strong>{equippedEffect?.itemName || '미적용'}</strong>
          </S.PreviewMeta>

          {/* 해제 버튼 — 장착된 슬롯만 노출 */}
          {(equippedAvatar || equippedBadge || equippedFrame
            || equippedBackground || equippedTitle || equippedEffect) && (
            <S.UnequipRow>
              {equippedAvatar && (
                <S.UnequipBtn type="button" onClick={() => onUnequip?.(equippedAvatar)}>
                  아바타 해제
                </S.UnequipBtn>
              )}
              {equippedBadge && (
                <S.UnequipBtn type="button" onClick={() => onUnequip?.(equippedBadge)}>
                  배지 해제
                </S.UnequipBtn>
              )}
              {equippedFrame && (
                <S.UnequipBtn type="button" onClick={() => onUnequip?.(equippedFrame)}>
                  프레임 해제
                </S.UnequipBtn>
              )}
              {equippedBackground && (
                <S.UnequipBtn type="button" onClick={() => onUnequip?.(equippedBackground)}>
                  배경 해제
                </S.UnequipBtn>
              )}
              {equippedTitle && (
                <S.UnequipBtn type="button" onClick={() => onUnequip?.(equippedTitle)}>
                  칭호 해제
                </S.UnequipBtn>
              )}
              {equippedEffect && (
                <S.UnequipBtn type="button" onClick={() => onUnequip?.(equippedEffect)}>
                  이펙트 해제
                </S.UnequipBtn>
              )}
            </S.UnequipRow>
          )}
        </S.PreviewCard>

        {/* ── 우측 보유 슬롯 (6 카테고리) ── */}
        <S.SlotsColumn>
          <SlotSection
            category="avatar"
            items={avatars}
            equippedItem={equippedAvatar}
            onEquip={onEquip}
            loading={loading}
          />
          <SlotSection
            category="badge"
            items={badges}
            equippedItem={equippedBadge}
            onEquip={onEquip}
            loading={loading}
          />
          <SlotSection
            category="frame"
            items={frames}
            equippedItem={equippedFrame}
            onEquip={onEquip}
            loading={loading}
          />
          <SlotSection
            category="background"
            items={backgrounds}
            equippedItem={equippedBackground}
            onEquip={onEquip}
            loading={loading}
          />
          <SlotSection
            category="title"
            items={titles}
            equippedItem={equippedTitle}
            onEquip={onEquip}
            loading={loading}
          />
          <SlotSection
            category="effect"
            items={effects}
            equippedItem={equippedEffect}
            onEquip={onEquip}
            loading={loading}
          />

          {/* 보유 0건일 때 상점 CTA */}
          {!loading && !hasAnyItem && (
            <S.ShopCta type="button" onClick={onGoShop}>
              포인트 상점으로 이동
            </S.ShopCta>
          )}
        </S.SlotsColumn>
      </S.Grid>
    </S.Section>
  );
}
