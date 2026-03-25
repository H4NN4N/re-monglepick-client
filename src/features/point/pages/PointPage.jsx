/**
 * 포인트 관리 페이지 컴포넌트.
 *
 * 사용자의 포인트 현황을 종합적으로 관리하는 단일 스크롤 페이지.
 * 4개 섹션으로 구성된다:
 *   1. BalanceCard — 잔액, 등급, 총 획득 포인트
 *   2. AttendanceCalendar — 달력 그리드, 연속 출석, 출석 버튼
 *   3. ItemExchange — 카테고리별 아이템 목록, 교환 기능
 *   4. PointHistory — 적립/차감 내역 테이블 (페이징)
 *
 * 비인증 사용자는 PrivateRoute에 의해 로그인 페이지로 리다이렉트된다.
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
/* 인증 Context 훅 — app/providers에서 가져옴 */
import { useAuth } from '../../../app/providers/AuthProvider';
/* 포인트 API — 같은 feature 내의 pointApi에서 가져옴 */
import {
  getBalance,
  getPointHistory,
  checkAttendance,
  getAttendanceStatus,
  getPointItems,
  exchangeItem,
} from '../api/pointApi';
/* 라우트 경로 상수 — shared/constants에서 가져옴 */
import { ROUTES } from '../../../shared/constants/routes';
/* 로딩 스피너 — shared/components에서 가져옴 */
import Loading from '../../../shared/components/Loading/Loading';
/* 하위 컴포넌트 — 같은 feature 내의 components에서 가져옴 */
import BalanceCard from '../components/BalanceCard';
import AttendanceCalendar from '../components/AttendanceCalendar';
import ItemExchange from '../components/ItemExchange';
import PointHistory from '../components/PointHistory';
import './PointPage.css';

/** 한 페이지에 표시할 이력 건수 */
const HISTORY_PAGE_SIZE = 10;

/**
 * 숫자를 천 단위 콤마가 포함된 문자열로 포맷팅한다.
 *
 * @param {number} num - 포맷팅할 숫자
 * @returns {string} 콤마가 포함된 문자열 (예: 1,500)
 */
function formatNumber(num) {
  if (num == null) return '0';
  return Number(num).toLocaleString('ko-KR');
}

/**
 * ISO 날짜 문자열을 'YYYY.MM.DD' 형식으로 변환한다.
 *
 * @param {string} dateString - ISO 날짜 문자열
 * @returns {string} 포맷팅된 날짜 문자열
 */
function formatDate(dateString) {
  if (!dateString) return '-';
  const date = new Date(dateString);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}.${m}.${d}`;
}

export default function PointPage() {
  /* ── 상태 관리 ── */

  /* 포인트 잔액 정보 (balance, grade, totalEarned) */
  const [balanceInfo, setBalanceInfo] = useState(null);
  /* 출석 현황 (currentStreak, totalDays, checkedToday, monthlyDates) */
  const [attendanceStatus, setAttendanceStatus] = useState(null);
  /* 출석 체크 결과 (애니메이션 표시용) */
  const [attendanceResult, setAttendanceResult] = useState(null);
  /* 포인트 아이템 목록 */
  const [items, setItems] = useState([]);
  /* 현재 선택된 아이템 카테고리 */
  const [selectedCategory, setSelectedCategory] = useState('전체');
  /* 포인트 이력 (Spring Page 응답) */
  const [history, setHistory] = useState({ content: [], totalPages: 0, totalElements: 0 });
  /* 현재 이력 페이지 번호 (0-indexed) */
  const [historyPage, setHistoryPage] = useState(0);

  /* 로딩 상태 */
  const [isLoadingBalance, setIsLoadingBalance] = useState(true);
  const [isLoadingAttendance, setIsLoadingAttendance] = useState(true);
  const [isLoadingItems, setIsLoadingItems] = useState(true);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  /* 출석 체크 처리 중 */
  const [isCheckingAttendance, setIsCheckingAttendance] = useState(false);
  /* 아이템 교환 처리 중 (itemId 별) */
  const [exchangingItemId, setExchangingItemId] = useState(null);

  /* 에러 메시지 */
  const [error, setError] = useState(null);

  /* setTimeout cleanup 용 ref (메모리 누수 방지) */
  const attendanceTimerRef = useRef(null);
  const errorTimerRef = useRef(null);
  useEffect(() => {
    return () => {
      if (attendanceTimerRef.current) clearTimeout(attendanceTimerRef.current);
      if (errorTimerRef.current) clearTimeout(errorTimerRef.current);
    };
  }, []);

  /* 인증 상태 및 네비게이션 */
  const { isAuthenticated, user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();

  /* ── 데이터 로드 ── */

  /**
   * 포인트 잔액 정보를 로드한다.
   * 컴포넌트 마운트 시 및 포인트 변동 후 호출된다.
   */
  const loadBalance = useCallback(async () => {
    if (!user?.id) {
      setIsLoadingBalance(false);
      return;
    }
    setIsLoadingBalance(true);
    try {
      const data = await getBalance();
      setBalanceInfo(data);
    } catch (err) {
      console.error('잔액 조회 실패:', err);
      setBalanceInfo({ balance: 0, grade: 'BRONZE', totalEarned: 0 });
    } finally {
      setIsLoadingBalance(false);
    }
  }, [user?.id]);

  /**
   * 출석 현황을 로드한다.
   */
  const loadAttendanceStatus = useCallback(async () => {
    if (!user?.id) return;
    setIsLoadingAttendance(true);
    try {
      const data = await getAttendanceStatus();
      setAttendanceStatus(data);
    } catch (err) {
      console.error('출석 현황 조회 실패:', err);
      setAttendanceStatus({
        currentStreak: 0,
        totalDays: 0,
        checkedToday: false,
        monthlyDates: [],
      });
    } finally {
      setIsLoadingAttendance(false);
    }
  }, [user?.id]);

  /**
   * 포인트 아이템 목록을 로드한다.
   * 카테고리 변경 시 호출된다.
   */
  const loadItems = useCallback(async () => {
    setIsLoadingItems(true);
    try {
      const category = selectedCategory === '전체' ? undefined : selectedCategory;
      const data = await getPointItems(category);
      setItems(Array.isArray(data) ? data : data?.content || []);
    } catch (err) {
      console.error('아이템 목록 조회 실패:', err);
      setItems([]);
    } finally {
      setIsLoadingItems(false);
    }
  }, [selectedCategory]);

  /**
   * 포인트 이력을 로드한다.
   * 페이지 변경 시 호출된다.
   */
  const loadHistory = useCallback(async () => {
    if (!user?.id) return;
    setIsLoadingHistory(true);
    try {
      const data = await getPointHistory({
        page: historyPage,
        size: HISTORY_PAGE_SIZE,
      });
      setHistory({
        content: data?.content || [],
        totalPages: data?.totalPages || 0,
        totalElements: data?.totalElements || 0,
      });
    } catch (err) {
      console.error('포인트 이력 조회 실패:', err);
      setHistory({ content: [], totalPages: 0, totalElements: 0 });
    } finally {
      setIsLoadingHistory(false);
    }
  }, [user?.id, historyPage]);

  /* 컴포넌트 마운트 시 모든 데이터 로드 */
  useEffect(() => {
    if (isAuthenticated && user?.id) {
      loadBalance();
      loadAttendanceStatus();
    }
  }, [isAuthenticated, user?.id, loadBalance, loadAttendanceStatus]);

  /* 카테고리 변경 시 아이템 재로드 */
  useEffect(() => {
    if (isAuthenticated) {
      loadItems();
    }
  }, [isAuthenticated, loadItems]);

  /* 페이지 변경 시 이력 재로드 */
  useEffect(() => {
    if (isAuthenticated && user?.id) {
      loadHistory();
    }
  }, [isAuthenticated, user?.id, loadHistory]);

  /* ── 이벤트 핸들러 ── */

  /**
   * 출석 체크 버튼 클릭 핸들러.
   * 출석 성공 시 잔액과 출석 현황을 갱신한다.
   */
  const handleCheckAttendance = async () => {
    if (!user?.id || isCheckingAttendance) return;
    setIsCheckingAttendance(true);
    setAttendanceResult(null);
    setError(null);

    try {
      const result = await checkAttendance();
      setAttendanceResult(result);
      await Promise.all([loadBalance(), loadAttendanceStatus()]);

      /* 3초 후 애니메이션 숨김 */
      if (attendanceTimerRef.current) clearTimeout(attendanceTimerRef.current);
      attendanceTimerRef.current = setTimeout(() => setAttendanceResult(null), 3000);
    } catch (err) {
      setError(err.message || '출석 체크에 실패했습니다.');
      if (errorTimerRef.current) clearTimeout(errorTimerRef.current);
      errorTimerRef.current = setTimeout(() => setError(null), 3000);
    } finally {
      setIsCheckingAttendance(false);
    }
  };

  /**
   * 아이템 교환 버튼 클릭 핸들러.
   * 확인 다이얼로그 후 교환을 수행한다.
   *
   * @param {Object} item - 교환할 아이템 객체
   */
  const handleExchangeItem = async (item) => {
    if (!user?.id || exchangingItemId) return;

    const confirmed = window.confirm(
      `'${item.name}'을(를) ${formatNumber(item.price)}P로 교환하시겠습니까?`
    );
    if (!confirmed) return;

    setExchangingItemId(item.itemId);
    setError(null);

    try {
      const result = await exchangeItem(item.itemId);
      alert(`'${result.itemName || item.name}' 교환 완료! 잔액: ${formatNumber(result.balanceAfter)}P`);
      await loadBalance();
    } catch (err) {
      setError(err.message || '아이템 교환에 실패했습니다.');
      if (errorTimerRef.current) clearTimeout(errorTimerRef.current);
      errorTimerRef.current = setTimeout(() => setError(null), 3000);
    } finally {
      setExchangingItemId(null);
    }
  };

  /**
   * 충전하기 버튼 클릭 — 결제 페이지로 이동.
   */
  const handleNavigatePayment = () => {
    navigate(ROUTES.PAYMENT);
  };

  /* ── 렌더링 ── */

  /* 인증 로딩 중 */
  if (authLoading) {
    return <Loading message="인증 확인 중..." fullPage />;
  }

  return (
    <div className="point-page">
      <div className="point-page__inner">
        {/* 페이지 제목 */}
        <h1 className="point-page__title">포인트 관리</h1>

        {/* 글로벌 에러 메시지 */}
        {error && (
          <div className="point-page__error" role="alert">
            {error}
          </div>
        )}

        {/* 섹션 1: 포인트 요약 */}
        <BalanceCard
          balanceInfo={balanceInfo}
          isLoading={isLoadingBalance}
          onNavigatePayment={handleNavigatePayment}
          formatNumber={formatNumber}
        />

        {/* 섹션 2: 출석 체크 */}
        <AttendanceCalendar
          attendanceStatus={attendanceStatus}
          attendanceResult={attendanceResult}
          isLoading={isLoadingAttendance}
          isCheckingAttendance={isCheckingAttendance}
          onCheckAttendance={handleCheckAttendance}
        />

        {/* 섹션 3: 아이템 교환 */}
        <ItemExchange
          items={items}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          isLoading={isLoadingItems}
          exchangingItemId={exchangingItemId}
          balance={balanceInfo?.balance || 0}
          onExchangeItem={handleExchangeItem}
          formatNumber={formatNumber}
        />

        {/* 섹션 4: 포인트 이력 */}
        <PointHistory
          history={history}
          historyPage={historyPage}
          isLoading={isLoadingHistory}
          onPageChange={setHistoryPage}
          formatNumber={formatNumber}
          formatDate={formatDate}
        />
      </div>
    </div>
  );
}
