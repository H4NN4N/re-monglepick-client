/**
 * 커뮤니티 게시글 목록 컴포넌트.
 *
 * 게시글들을 리스트 형태로 표시한다.
 * 각 항목은 제목, 작성자, 작성일, 댓글 수 등을 보여준다.
 * 클릭 시 게시글 상세 페이지로 이동한다.
 *
 * 개선 사항:
 * - 좌측 카테고리 컬러 바 (4px border-left)
 * - 메타 정보에 이모지 아이콘 추가
 * - 빈 상태에 EmptyState 컴포넌트 적용
 * - 로딩 시 Skeleton 표시
 *
 * @param {Object} props
 * @param {Array} props.posts - 게시글 배열
 * @param {boolean} [props.loading=false] - 로딩 상태
 */

import { Link } from 'react-router-dom';
/* 포맷팅 유틸 — shared/utils에서 가져옴 */
import { formatRelativeTime, truncateText } from '../../../shared/utils/formatters';
/* 스켈레톤 로더 — shared/components에서 가져옴 */
import Skeleton from '../../../shared/components/Skeleton/Skeleton';
/* 빈 상태 컴포넌트 — shared/components에서 가져옴 */
import EmptyState from '../../../shared/components/EmptyState/EmptyState';
import './PostList.css';

export default function PostList({ posts = [], loading = false }) {
  // 로딩 중 — 스켈레톤 3개 표시
  if (loading) {
    return (
      <div className="post-list">
        {[1, 2, 3].map((n) => (
          <div key={n} className="post-list__skeleton">
            <Skeleton variant="text" height="16px" width="60px" />
            <Skeleton variant="text" height="20px" width="80%" />
            <Skeleton variant="text" height="14px" width="100%" />
            <Skeleton variant="text" height="12px" width="40%" />
          </div>
        ))}
      </div>
    );
  }

  // 게시글이 없을 때 — EmptyState 컴포넌트
  if (!posts || posts.length === 0) {
    return (
      <EmptyState
        icon="📝"
        title="아직 작성된 게시글이 없습니다"
        description="첫 번째 게시글을 작성해 보세요!"
      />
    );
  }

  return (
    <div className="post-list">
      {posts.map((post) => (
        <article
          key={post.id}
          className={`post-list__item post-list__item--${post.category || 'free'}`}
        >
          <Link to={`/community/${post.id}`} className="post-list__link">
            {/* 게시글 헤더 — 카테고리 + 작성 시간 */}
            <div className="post-list__item-header">
              {post.category && (
                <span className={`post-list__category post-list__category--${post.category}`}>
                  {post.category === 'review' ? '리뷰' :
                   post.category === 'question' ? '질문' : '자유'}
                </span>
              )}
              <span className="post-list__time">
                📅 {formatRelativeTime(post.createdAt)}
              </span>
            </div>

            {/* 제목 */}
            <h3 className="post-list__title">{post.title}</h3>

            {/* 내용 미리보기 */}
            <p className="post-list__preview">
              {truncateText(post.content, 120)}
            </p>

            {/* 하단 메타 정보 — 이모지 아이콘 추가 */}
            <div className="post-list__meta">
              {/* 작성자 */}
              <span className="post-list__author">
                👤 {post.author?.nickname || '익명'}
              </span>

              {/* 통계 (좋아요, 댓글) */}
              <div className="post-list__stats">
                {post.likeCount !== undefined && (
                  <span className="post-list__stat">
                    ❤️ {post.likeCount}
                  </span>
                )}
                {post.commentCount !== undefined && (
                  <span className="post-list__stat">
                    💬 {post.commentCount}
                  </span>
                )}
              </div>
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}
