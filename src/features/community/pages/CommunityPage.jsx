/**
 * 커뮤니티 페이지 컴포넌트.
 *
 * 게시글과 리뷰를 탭으로 전환하여 표시한다.
 * - 게시글 탭: PostList + PostForm (새 글 작성)
 * - 리뷰 탭: 안내 메시지 (EmptyState)
 *
 * 개선 사항:
 * - 탭 활성 시 하단 3px 그라데이션 바
 * - 탭 호버 시 배경색 변화
 * - 글쓰기 버튼을 우하단 FAB(Floating Action Button) 스타일로 변경
 * - 리뷰 탭에 EmptyState 컴포넌트 적용
 *
 * 인증된 사용자는 새 게시글을 작성할 수 있다.
 */

import { useState, useEffect } from 'react';
/* 커뮤니티 API — 같은 feature 내의 communityApi에서 가져옴 */
import { getPosts, createPost } from '../api/communityApi';
/* 인증 Context 훅 — app/providers에서 가져옴 */
import { useAuth } from '../../../app/providers/AuthProvider';
/* 게시글 목록/작성 컴포넌트 — 같은 feature 내의 components에서 가져옴 */
import PostList from '../components/PostList';
import PostForm from '../components/PostForm';
/* 빈 상태 컴포넌트 — shared/components에서 가져옴 */
import EmptyState from '../../../shared/components/EmptyState/EmptyState';
import './CommunityPage.css';

/** 탭 정의 */
const TABS = [
  { id: 'posts', label: '게시글' },
  { id: 'reviews', label: '리뷰' },
];

export default function CommunityPage() {
  // 현재 활성 탭
  const [activeTab, setActiveTab] = useState('posts');
  // 게시글 목록
  const [posts, setPosts] = useState([]);
  // 로딩 상태
  const [isLoading, setIsLoading] = useState(true);
  // 글 작성 폼 표시 여부
  const [showForm, setShowForm] = useState(false);
  // 글 작성 중 상태
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { isAuthenticated } = useAuth();

  /**
   * 게시글 목록을 로드한다.
   */
  useEffect(() => {
    async function loadPosts() {
      setIsLoading(true);
      try {
        const result = await getPosts({ page: 1, size: 20 });
        setPosts(result?.posts || []);
      } catch {
        // API 미구현 시 빈 배열
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    }

    if (activeTab === 'posts') {
      loadPosts();
    }
  }, [activeTab]);

  /**
   * 게시글 작성 제출 핸들러.
   *
   * @param {Object} postData - 게시글 데이터 ({ title, content, category })
   */
  const handleCreatePost = async (postData) => {
    setIsSubmitting(true);
    try {
      const newPost = await createPost(postData);
      // 새 게시글을 목록 맨 앞에 추가
      setPosts((prev) => [newPost, ...prev]);
      setShowForm(false);
    } catch (err) {
      alert(err.message || '게시글 작성에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="community-page">
      <div className="community-page__inner">
        {/* 페이지 헤더 */}
        <div className="community-page__header">
          <h1 className="community-page__title">커뮤니티</h1>
          <p className="community-page__desc">영화에 대한 이야기를 나눠보세요</p>
        </div>

        {/* 탭 네비게이션 — 활성 탭에 그라데이션 하단 바 */}
        <div className="community-page__tabs">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`community-page__tab ${activeTab === tab.id ? 'community-page__tab--active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 탭 콘텐츠 — fade-in 애니메이션 적용 */}
        <div className="community-page__content" key={activeTab}>
          {activeTab === 'posts' && (
            <>
              {/* 글 작성 폼 */}
              {showForm && (
                <PostForm
                  onSubmit={handleCreatePost}
                  isSubmitting={isSubmitting}
                  onCancel={() => setShowForm(false)}
                />
              )}

              {/* 게시글 목록 */}
              <PostList posts={posts} loading={isLoading} />
            </>
          )}

          {activeTab === 'reviews' && (
            <EmptyState
              icon="📝"
              title="리뷰를 작성해보세요"
              description="영화 상세 페이지에서 리뷰를 작성할 수 있습니다"
            />
          )}
        </div>
      </div>

      {/* FAB (Floating Action Button) — 인증된 사용자가 게시글 탭에서만 표시 */}
      {isAuthenticated && activeTab === 'posts' && !showForm && (
        <button
          className="community-page__fab"
          onClick={() => setShowForm(true)}
          aria-label="새 글 작성"
        >
          +
        </button>
      )}
    </div>
  );
}
