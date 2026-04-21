/**
 * 도장깨기 리뷰 작성/조회/재인증 페이지.
 *
 * - 작성 모드  (readOnly=false, resubmit=false): 리뷰 텍스트 입력 후 제출 → course_review 저장
 * - 읽기 모드  (readOnly=true):                  이미 제출한 리뷰를 API에서 불러와 읽기 전용으로 표시
 * - 재인증 모드 (resubmit=true):                 관리자 반려 사유 표시 + 새 리뷰 작성 후 재제출
 *
 * URL: /stamp/:courseId/review/:movieId
 *
 * @module features/roadmap/pages/StampReviewPage
 */

import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useModal } from '../../../shared/components/Modal';
import { ROUTES, buildPath } from '../../../shared/constants/routes';
import { completeMovie, getMovieReview } from '../api/roadmapApi';
import * as S from './StampReviewPage.styled';

const MAX_LENGTH = 500;

export default function StampReviewPage() {
  const { courseId, movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { showAlert } = useModal();

  /* navigate 시 state로 영화 제목/코스 제목/모드 전달받음 */
  const movieTitle = location.state?.movieTitle || '영화';
  const courseTitle = location.state?.courseTitle || '코스';
  const readOnly = location.state?.readOnly === true;
  const resubmit = location.state?.resubmit === true;
  const rejectionReason = location.state?.rejectionReason || '';

  const [reviewText, setReviewText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  /* readOnly 또는 resubmit(이전 리뷰 프리필)일 때 로딩 */
  const [isLoadingReview, setIsLoadingReview] = useState(readOnly || resubmit);
  const [reviewLoadError, setReviewLoadError] = useState(false);

  /** 읽기/재인증 모드 진입 시 기존 리뷰 로드 */
  useEffect(() => {
    if (!readOnly && !resubmit) return;
    let cancelled = false;
    async function load() {
      setIsLoadingReview(true);
      setReviewLoadError(false);
      try {
        const data = await getMovieReview(courseId, movieId);
        if (!cancelled) {
          /* 백엔드 응답 필드명이 다를 수 있으므로 여러 키를 시도 */
          const text =
            data?.review ??
            data?.content ??
            data?.reviewText ??
            data?.text ??
            (typeof data === 'string' ? data : '');
          setReviewText(text);
        }
      } catch (err) {
        if (!cancelled) {
          setReviewLoadError(true);
          if (readOnly) {
            showAlert({
              title: '리뷰 불러오기 실패',
              message: err?.message || '리뷰를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.',
              type: 'error',
            });
          }
          /* 재인증 모드는 이전 리뷰 로드 실패해도 빈 상태로 작성 가능 */
        }
      } finally {
        if (!cancelled) setIsLoadingReview(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [readOnly, resubmit, courseId, movieId, showAlert]);

  /** 뒤로가기 — 코스 상세 페이지 */
  const handleBack = () => {
    navigate(buildPath(ROUTES.STAMP_DETAIL, { id: courseId }));
  };

  /** 리뷰 제출 (작성/재인증 모드) */
  const handleSubmit = async () => {
    if (!reviewText.trim()) {
      showAlert({ title: '안내', message: '리뷰를 작성해 주세요.', type: 'info' });
      return;
    }
    setIsSubmitting(true);
    try {
      await completeMovie(courseId, movieId, reviewText.trim());
      showAlert({
        title: resubmit ? '재인증 완료!' : '도장 완료!',
        message: resubmit
          ? `'${movieTitle}' 재인증이 제출되었어요. 검토 후 반영됩니다.`
          : `'${movieTitle}' 영화 도장을 찍었어요!`,
        type: 'success',
      });
      navigate(buildPath(ROUTES.STAMP_DETAIL, { id: courseId }));
    } catch (err) {
      showAlert({
        title: '오류',
        message: err?.message || '저장에 실패했습니다.',
        type: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const pageTitle = readOnly ? '내 리뷰 보기' : resubmit ? '시청 재인증' : '도장깨기 리뷰';
  const isEditable = !readOnly;

  return (
    <S.Container>
      <S.BackLink onClick={handleBack}>← 코스로 돌아가기</S.BackLink>

      <S.Header>
        <S.CourseName>{courseTitle}</S.CourseName>
        <S.PageTitle>{pageTitle}</S.PageTitle>
        <S.MovieName>🎬 {movieTitle}</S.MovieName>
      </S.Header>

      {/* 반려 사유 배너 (재인증 모드에서만 표시) */}
      {resubmit && (
        <S.RejectionBanner>
          <S.RejectionTitle>반려 사유</S.RejectionTitle>
          <S.RejectionReason>
            {rejectionReason || '관리자가 별도 사유를 남기지 않았습니다.'}
          </S.RejectionReason>
        </S.RejectionBanner>
      )}

      <S.Card>
        <S.Label>
          {readOnly
            ? '작성한 리뷰'
            : resubmit
            ? '수정할 리뷰를 작성해 주세요.'
            : '이 영화를 보고 느낀 점을 자유롭게 적어주세요.'}
        </S.Label>
        {isEditable && !resubmit && (
          <S.Hint>
            줄거리, 인상적인 장면, 감독의 연출 방식, 배우의 연기 등
            영화와 관련된 내용이라면 무엇이든 좋아요.
          </S.Hint>
        )}
        {resubmit && (
          <S.Hint>
            반려 사유를 참고하여 리뷰를 보완한 후 다시 제출해 주세요.
          </S.Hint>
        )}

        {isLoadingReview ? (
          <S.Textarea
            value="불러오는 중..."
            readOnly
            style={{ color: 'var(--text-muted)', minHeight: 120 }}
          />
        ) : reviewLoadError && readOnly ? (
          <S.Textarea
            value="리뷰를 불러오지 못했습니다."
            readOnly
            style={{ color: 'var(--color-error, #e57373)', minHeight: 120, cursor: 'default' }}
          />
        ) : (
          <S.Textarea
            placeholder={
              readOnly
                ? '작성한 리뷰가 없어요.'
                : '예) 봉준호 감독의 계단 연출이 인상적이었어요. 빈부격차를 공간으로 표현한 방식이 탁월했습니다...'
            }
            value={reviewText}
            onChange={isEditable ? (e) => setReviewText(e.target.value) : undefined}
            readOnly={!isEditable}
            maxLength={isEditable ? MAX_LENGTH : undefined}
            autoFocus={isEditable}
            style={!isEditable ? { cursor: 'default', opacity: 0.85 } : undefined}
          />
        )}

        {isEditable && (
          <S.CharCount $warn={reviewText.length > MAX_LENGTH * 0.9}>
            {reviewText.length} / {MAX_LENGTH}
          </S.CharCount>
        )}
      </S.Card>

      <S.Actions>
        <S.CancelBtn onClick={handleBack} disabled={isSubmitting}>
          {readOnly ? '돌아가기' : '취소'}
        </S.CancelBtn>
        {isEditable && (
          <S.SubmitBtn
            onClick={handleSubmit}
            disabled={isSubmitting || !reviewText.trim()}
          >
            {isSubmitting
              ? '저장 중...'
              : resubmit
              ? '재인증 제출'
              : '도장 찍기 완료'}
          </S.SubmitBtn>
        )}
      </S.Actions>
    </S.Container>
  );
}
