/**
 * 게시글 작성/수정 폼 컴포넌트.
 *
 * 제목, 카테고리, 내용, 이미지 첨부를 입력받아 게시글을 생성한다.
 *
 * 이미지 업로드 흐름:
 *   1. 사용자가 이미지 선택
 *   2. 폼 제출 시 /api/v1/images/upload 로 먼저 업로드
 *   3. 반환된 URL 목록을 게시글 데이터에 포함하여 전송
 *
 * 로컬: http://localhost:8080/images/userId/파일명.jpg
 * 서버: http://210.109.15.187/images/userId/파일명.jpg (UPLOAD_URL_PREFIX 환경변수)
 * 추후 S3 전환 시 URL 형식만 바뀌고 프론트 코드는 그대로 유지
 */

import { useState } from 'react';
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

export default function PostForm({ onSubmit, initialData, isSubmitting = false, onCancel }) {
  const [title, setTitle] = useState(() => initialData?.title ?? '');
  const [content, setContent] = useState(() => initialData?.content ?? '');
  const [category, setCategory] = useState(() => initialData?.category ?? 'FREE');
  const [errors, setErrors] = useState({});

  // 이미지 관련 상태
  const [imageFiles, setImageFiles] = useState([]);       // 선택한 File 객체 목록
  const [imagePreviews, setImagePreviews] = useState([]); // 미리보기 URL 목록
  const [isUploading, setIsUploading] = useState(false);  // 업로드 중 여부

  const validateForm = () => {
    const newErrors = {};
    const titleResult = validatePostTitle(title);
    if (!titleResult.isValid) newErrors.title = titleResult.message;
    const contentResult = validateContent(content);
    if (!contentResult.isValid) newErrors.content = contentResult.message;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 이미지 선택 핸들러
  const handleImageChange = (e) => {
    const selected = Array.from(e.target.files);
    const combined = [...imageFiles, ...selected];

    if (combined.length > MAX_IMAGE_COUNT) {
      alert(`이미지는 최대 ${MAX_IMAGE_COUNT}장까지 첨부 가능합니다.`);
      return;
    }

    setImageFiles(combined);
    setImagePreviews(combined.map((f) => URL.createObjectURL(f)));
    e.target.value = ''; // 같은 파일 재선택 가능하도록 초기화
  };

  // 이미지 제거 핸들러
  const handleImageRemove = (index) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    let imageUrls = [];

    // 이미지가 있으면 먼저 업로드 후 URL 수집
    if (imageFiles.length > 0) {
      setIsUploading(true);
      try {
        imageUrls = await uploadImages(imageFiles);
      } catch (err) {
        alert('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
        setIsUploading(false);
        return;
      } finally {
        setIsUploading(false);
      }
    }

    onSubmit({ title: title.trim(), content: content.trim(), category, imageUrls });
  };

  return (
    <S.Wrapper onSubmit={handleSubmit} noValidate>
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
        <S.Label>이미지 첨부 ({imageFiles.length}/{MAX_IMAGE_COUNT})</S.Label>

        {/* 미리보기 */}
        {imagePreviews.length > 0 && (
          <S.ImagePreviewList>
            {imagePreviews.map((src, i) => (
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

        {/* 파일 선택 버튼 */}
        {imageFiles.length < MAX_IMAGE_COUNT && (
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
        <S.SubmitBtn
          type="submit"
          disabled={isSubmitting || isUploading}
        >
          {isSubmitting ? '등록 중...' : (initialData ? '수정하기' : '등록하기')}
        </S.SubmitBtn>
      </S.Actions>
    </S.Wrapper>
  );
}