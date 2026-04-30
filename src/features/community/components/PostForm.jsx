/**
 * 게시글 작성/수정 폼 컴포넌트.
 *
 * 제목, 카테고리, 내용, 이미지 첨부를 입력받아 게시글을 생성한다.
 *
 * 임시저장:
 *   - 편집 모드(initialData 있음)에서는 비활성.
 *   - 입력 후 3초 디바운스로 localStorage에 자동 저장.
 *   - 이미지는 base64로 변환해 저장 (총 3MB 이하일 때만 포함).
 *   - 폼 진입 시 기존 draft가 있으면 복원 배너를 표시한다.
 *   - 등록/수정 완료 시 draft를 삭제한다.
 */

import { useState, useEffect, useRef } from 'react';
import { validatePostTitle, validateContent } from '../../../shared/utils/validators';
import { uploadImages } from '../api/communityApi';
import * as S from './PostForm.styled';

const CATEGORY_OPTIONS = [
  { value: 'FREE', label: '자유' },
  { value: 'DISCUSSION', label: '토론' },
  { value: 'RECOMMENDATION', label: '추천' },
  { value: 'NEWS', label: '뉴스' },
];

const MAX_IMAGE_COUNT = 5;
const DRAFT_KEY = 'community_post_draft';
// base64 인코딩은 원본보다 ~33% 크므로 3MB 기준으로 설정
const DRAFT_MAX_IMAGE_BYTES = 3 * 1024 * 1024;

function formatSavedAt(date) {
  if (!date) return '';
  const diff = Math.floor((Date.now() - date.getTime()) / 1000);
  if (diff < 10) return '방금 저장됨';
  if (diff < 60) return `${diff}초 전 저장됨`;
  const mins = Math.floor(diff / 60);
  return `${mins}분 전 저장됨`;
}

/** File → base64 data URL */
function readFileAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/** base64 data URL → File */
function base64ToFile(dataUrl, index) {
  const [header, data] = dataUrl.split(',');
  const mime = header.match(/:(.*?);/)[1];
  const ext = mime.split('/')[1] || 'jpg';
  const binary = atob(data);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new File([bytes], `draft_image_${index}.${ext}`, { type: mime });
}

export default function PostForm({ onSubmit, initialData, isSubmitting = false, onCancel }) {
  const isEditMode = !!initialData;

  const [title, setTitle]       = useState(() => initialData?.title ?? '');
  const [content, setContent]   = useState(() => initialData?.content ?? '');
  const [category, setCategory] = useState(() => initialData?.category ?? 'FREE');
  const [errors, setErrors]     = useState({});

  // 이미지: base64 data URL 배열 (신규 선택 및 draft 복원 모두 동일하게 관리)
  const [imageBase64s, setImageBase64s] = useState([]);
  const [isUploading, setIsUploading]   = useState(false);

  // 임시저장 관련 상태
  const [draftStatus, setDraftStatus] = useState('idle'); // 'idle' | 'saving' | 'saved'
  const [savedAt, setSavedAt]         = useState(null);
  const [showBanner, setShowBanner]   = useState(false);
  const saveTimerRef = useRef(null);
  const idleTimerRef = useRef(null);

  // 마운트 시 기존 draft 확인
  useEffect(() => {
    if (isEditMode) return;
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (parsed.title?.trim() || parsed.content?.trim() || parsed.images?.length) {
        setShowBanner(true);
      }
    } catch { /* localStorage 접근 불가 환경 — 무시 */ }
  }, [isEditMode]);

  // 3초 디바운스 자동 저장 (이미지 포함)
  useEffect(() => {
    if (isEditMode) return;
    if (!title && !content && imageBase64s.length === 0) return;

    clearTimeout(saveTimerRef.current);
    clearTimeout(idleTimerRef.current);
    setDraftStatus('saving');

    saveTimerRef.current = setTimeout(() => {
      try {
        // base64 총 용량 계산 (base64 length * 0.75 ≈ 실제 바이트)
        const totalBytes = imageBase64s.reduce((sum, b64) => sum + b64.length * 0.75, 0);
        const images = totalBytes <= DRAFT_MAX_IMAGE_BYTES ? imageBase64s : [];

        localStorage.setItem(
          DRAFT_KEY,
          JSON.stringify({ title, content, category, savedAt: new Date().toISOString(), images }),
        );
        setSavedAt(new Date());
        setDraftStatus('saved');
      } catch { /* localStorage 저장 실패 — 무시 */ }
      idleTimerRef.current = setTimeout(() => setDraftStatus('idle'), 2000);
    }, 3000);

    return () => {
      clearTimeout(saveTimerRef.current);
      clearTimeout(idleTimerRef.current);
    };
  }, [title, content, category, imageBase64s, isEditMode]);

  const restoreDraft = () => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (parsed.title    !== undefined) setTitle(parsed.title);
      if (parsed.content  !== undefined) setContent(parsed.content);
      if (parsed.category !== undefined) setCategory(parsed.category);
      if (parsed.images?.length)         setImageBase64s(parsed.images);
      if (parsed.savedAt) setSavedAt(new Date(parsed.savedAt));
    } catch { /* localStorage 접근 불가 환경 — 무시 */ }
    setShowBanner(false);
  };

  const discardDraft = () => {
    localStorage.removeItem(DRAFT_KEY);
    setShowBanner(false);
  };

  const validateForm = () => {
    const newErrors = {};
    const titleResult = validatePostTitle(title);
    if (!titleResult.isValid) newErrors.title = titleResult.message;
    const contentResult = validateContent(content);
    if (!contentResult.isValid) newErrors.content = contentResult.message;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = async (e) => {
    const selected = Array.from(e.target.files);
    if (imageBase64s.length + selected.length > MAX_IMAGE_COUNT) {
      alert(`이미지는 최대 ${MAX_IMAGE_COUNT}장까지 첨부 가능합니다.`);
      return;
    }
    try {
      const newBase64s = await Promise.all(selected.map(readFileAsBase64));
      setImageBase64s((prev) => [...prev, ...newBase64s]);
    } catch {
      alert('이미지를 읽는 중 오류가 발생했습니다.');
    }
    e.target.value = '';
  };

  const handleImageRemove = (index) => {
    setImageBase64s((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    let imageUrls = [];
    if (imageBase64s.length > 0) {
      setIsUploading(true);
      try {
        const files = imageBase64s.map((b64, i) => base64ToFile(b64, i));
        imageUrls = await uploadImages(files);
      } catch {
        alert('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
        setIsUploading(false);
        return;
      } finally {
        setIsUploading(false);
      }
    }

    localStorage.removeItem(DRAFT_KEY);
    onSubmit({ title: title.trim(), content: content.trim(), category, imageUrls });
  };

  return (
    <S.Wrapper onSubmit={handleSubmit} noValidate>

      {/* 임시저장 상태 인디케이터 — 상단 */}
      {!isEditMode && (draftStatus !== 'idle' || savedAt) && (
        <S.DraftStatusBar>
          {draftStatus === 'saving' && (
            <><S.DraftDot /><span>저장 중...</span></>
          )}
          {draftStatus === 'saved' && <span>자동저장 완료</span>}
          {draftStatus === 'idle' && savedAt && <span>{formatSavedAt(savedAt)}</span>}
        </S.DraftStatusBar>
      )}

      {/* 임시저장 복원 배너 */}
      {showBanner && (
        <S.DraftBanner>
          <S.DraftBannerBody>
            <S.DraftBannerTitle>이전에 작성 중인 글이 있어요</S.DraftBannerTitle>
            <S.DraftBannerSub>임시저장된 내용을 불러올까요?</S.DraftBannerSub>
            <S.DraftBannerBtns>
              <S.DraftRestoreBtn type="button" onClick={restoreDraft}>불러오기</S.DraftRestoreBtn>
              <S.DraftDiscardBtn type="button" onClick={discardDraft}>버리기</S.DraftDiscardBtn>
            </S.DraftBannerBtns>
          </S.DraftBannerBody>
          <S.DraftBannerClose type="button" onClick={() => setShowBanner(false)}>✕</S.DraftBannerClose>
        </S.DraftBanner>
      )}

      {/* 카테고리 선택 */}
      <S.Field>
        <S.Label>카테고리</S.Label>
        <S.Categories>
          {CATEGORY_OPTIONS.map((opt) => (
            <S.CategoryBtn
              key={opt.value}
              type="button"
              $active={category === opt.value}
              onClick={() => setCategory(opt.value)}
              disabled={isSubmitting}
            >
              {opt.label}
            </S.CategoryBtn>
          ))}
        </S.Categories>
      </S.Field>

      {/* 제목 입력 */}
      <S.Field>
        <S.Label htmlFor="post-title">제목</S.Label>
        <S.Input
          id="post-title"
          type="text"
          $error={!!errors.title}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력하세요"
          disabled={isSubmitting}
          maxLength={100}
        />
        {errors.title && <S.ErrorMsg>{errors.title}</S.ErrorMsg>}
      </S.Field>

      {/* 내용 입력 */}
      <S.Field>
        <S.Label htmlFor="post-content">내용</S.Label>
        <S.Textarea
          id="post-content"
          $error={!!errors.content}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용을 입력하세요 (10자 이상)"
          disabled={isSubmitting}
          rows={10}
          maxLength={5000}
        />
        <S.CharCount>
          <span>{content.length} / 5,000</span>
        </S.CharCount>
        {errors.content && <S.ErrorMsg>{errors.content}</S.ErrorMsg>}
      </S.Field>

      {/* 이미지 첨부 */}
      <S.Field>
        <S.Label>이미지 첨부 ({imageBase64s.length}/{MAX_IMAGE_COUNT})</S.Label>
        {imageBase64s.length > 0 && (
          <S.ImagePreviewList>
            {imageBase64s.map((src, i) => (
              <S.ImagePreviewItem key={i}>
                <img src={src} alt={`첨부 이미지 ${i + 1}`} />
                <S.ImageRemoveBtn
                  type="button"
                  onClick={() => handleImageRemove(i)}
                  disabled={isSubmitting || isUploading}
                >
                  ✕
                </S.ImageRemoveBtn>
              </S.ImagePreviewItem>
            ))}
          </S.ImagePreviewList>
        )}
        {imageBase64s.length < MAX_IMAGE_COUNT && (
          <S.ImageUploadLabel>
            📷 이미지 추가
            <input
              type="file"
              accept="image/jpeg,image/png,image/gif,image/webp"
              multiple
              onChange={handleImageChange}
              disabled={isSubmitting || isUploading}
              style={{ display: 'none' }}
            />
          </S.ImageUploadLabel>
        )}
        {isUploading && <S.UploadingMsg>이미지 업로드 중...</S.UploadingMsg>}
      </S.Field>

      {/* 버튼 영역 */}
      <S.Actions>
        {onCancel && (
          <S.CancelBtn
            type="button"
            onClick={onCancel}
            disabled={isSubmitting || isUploading}
          >
            취소
          </S.CancelBtn>
        )}
        <S.SubmitBtn type="submit" disabled={isSubmitting || isUploading}>
          {isSubmitting ? '등록 중...' : (initialData ? '수정하기' : '등록하기')}
        </S.SubmitBtn>
      </S.Actions>

    </S.Wrapper>
  );
}
