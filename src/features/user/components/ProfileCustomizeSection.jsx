/**
 * 프로필 꾸미기 섹션 — 2026-04-27 신규.
 *
 * 마이페이지 "꾸미기" 탭에서 사용자가 보유한 아바타·배지를 한 화면에 모아 보고
 * 클릭 한 번으로 장착/해제할 수 있도록 한다.
 *
 * <h3>구성</h3>
 * <ul>
 *   <li>좌측 미리보기 카드 — 현재 착용 중인 아바타 + 배지 합성 + 닉네임</li>
 *   <li>우측 보유 슬롯 — 아바타 그리드 + 배지 그리드 (2개 섹션)</li>
 * </ul>
 *
 * <h3>장착 흐름</h3>
 * <ol>
 *   <li>슬롯 클릭 → onEquip(userItem) 호출 → 부모(MyPage) 가 equipItem API 호출</li>
 *   <li>부모가 미리보기/equipped state 갱신 → 슬롯 재렌더</li>
 *   <li>같은 카테고리 기존 장착물은 Backend 가 자동 해제</li>
 * </ol>
 *
 * <p>장착 중 슬롯은 active 보더 + 체크 아이콘 표시. 해제는 "착용 해제" 버튼 또는
 * 다른 슬롯 클릭으로 가능.</p>
 *
 * @param {Object}   props
 * @param {Array}    props.avatars         보유 아바타 UserItem 배열
 * @param {Array}    props.badges          보유 배지 UserItem 배열
 * @param {Object}   props.equippedAvatar  현재 착용 아바타 (없으면 null)
 * @param {Object}   props.equippedBadge   현재 착용 배지 (없으면 null)
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
 * 아이템 카드 1개 — 클릭 시 onClick.
 *
 * 이미지 로드 실패 시 placeholder 이모지로 fallback. 장착 중이면 active 보더 + 체크.
 * 만료된 아이템(expired=true)은 흐림 + 비활성.
 */
function ItemCard({ item, equipped, onClick }) {
  const [imgErrored, setImgErrored] = useState(false);
  const showImage = item.imageUrl && !imgErrored;
  const expired = item.expired || item.status === 'EXPIRED';

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
          <S.SlotPlaceholder>{item.category === 'badge' ? '⭐' : '🎭'}</S.SlotPlaceholder>
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

export default function ProfileCustomizeSection({
  avatars = [],
  badges = [],
  equippedAvatar,
  equippedBadge,
  user,
  fallbackAvatar,
  onEquip,
  onUnequip,
  onGoShop,
  loading = false,
}) {
  /* 미리보기에 사용할 아바타 — 착용 아바타 > 업로드 프로필 이미지 > 닉네임 이니셜 */
  const previewAvatarUrl = equippedAvatar?.imageUrl || fallbackAvatar || null;
  const previewInitial = user?.nickname?.charAt(0) || 'U';
  const hasAnyItem = avatars.length > 0 || badges.length > 0;

  return (
    <S.Section aria-labelledby="customize-section-title">
      <S.SectionHeader>
        <S.SectionTitle id="customize-section-title">프로필 꾸미기</S.SectionTitle>
        <S.SectionDesc>
          포인트로 교환한 아바타·배지를 클릭하면 즉시 적용됩니다. 같은 슬롯 안에서 기존 착용 아이템은 자동으로 해제돼요.
        </S.SectionDesc>
      </S.SectionHeader>

      <S.Grid>
        {/* ── 좌측 미리보기 카드 ── */}
        <S.PreviewCard>
          <S.PreviewLabel>미리보기</S.PreviewLabel>
          <S.PreviewAvatar>
            {previewAvatarUrl ? (
              <img src={previewAvatarUrl} alt="아바타 미리보기" />
            ) : (
              <S.PreviewInitial>{previewInitial}</S.PreviewInitial>
            )}
            {/* 우상단 배지 오버레이 */}
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
          <S.PreviewNickname>{user?.nickname || '나'}</S.PreviewNickname>
          <S.PreviewMeta>
            <span>아바타</span>
            <strong>{equippedAvatar?.itemName || '미적용'}</strong>
          </S.PreviewMeta>
          <S.PreviewMeta>
            <span>배지</span>
            <strong>{equippedBadge?.itemName || '미적용'}</strong>
          </S.PreviewMeta>

          {(equippedAvatar || equippedBadge) && (
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
            </S.UnequipRow>
          )}
        </S.PreviewCard>

        {/* ── 우측 보유 슬롯 ── */}
        <S.SlotsColumn>
          {/* 아바타 섹션 */}
          <S.SlotSection>
            <S.SlotSectionTitle>
              아바타 <S.SlotCount>{avatars.length}</S.SlotCount>
            </S.SlotSectionTitle>
            {loading ? (
              <S.EmptyHint>불러오는 중...</S.EmptyHint>
            ) : avatars.length === 0 ? (
              <S.EmptyHint>
                보유한 아바타가 없어요. 포인트 상점에서 교환할 수 있어요.
              </S.EmptyHint>
            ) : (
              <S.SlotGrid>
                {avatars.map((item) => (
                  <ItemCard
                    key={item.userItemId}
                    item={item}
                    equipped={equippedAvatar?.userItemId === item.userItemId}
                    onClick={onEquip}
                  />
                ))}
              </S.SlotGrid>
            )}
          </S.SlotSection>

          {/* 배지 섹션 */}
          <S.SlotSection>
            <S.SlotSectionTitle>
              배지 <S.SlotCount>{badges.length}</S.SlotCount>
            </S.SlotSectionTitle>
            {loading ? (
              <S.EmptyHint>불러오는 중...</S.EmptyHint>
            ) : badges.length === 0 ? (
              <S.EmptyHint>
                보유한 배지가 없어요. 포인트 상점에서 교환할 수 있어요.
              </S.EmptyHint>
            ) : (
              <S.SlotGrid>
                {badges.map((item) => (
                  <ItemCard
                    key={item.userItemId}
                    item={item}
                    equipped={equippedBadge?.userItemId === item.userItemId}
                    onClick={onEquip}
                  />
                ))}
              </S.SlotGrid>
            )}
          </S.SlotSection>

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
