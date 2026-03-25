/**
 * 출석 체크 섹션 컴포넌트.
 *
 * 출석 통계(연속/총 출석), 보너스 안내, 달력 그리드,
 * 출석 결과 애니메이션, 출석 체크 버튼을 표시한다.
 *
 * @param {Object} props
 * @param {Object|null} props.attendanceStatus - 출석 현황 {currentStreak, totalDays, checkedToday, monthlyDates}
 * @param {Object|null} props.attendanceResult - 출석 결과 {earnedPoints, streakCount}
 * @param {boolean} props.isLoading - 로딩 상태
 * @param {boolean} props.isCheckingAttendance - 출석 체크 처리 중
 * @param {Function} props.onCheckAttendance - 출석 체크 핸들러
 */

import Loading from '../../../shared/components/Loading/Loading';
import './AttendanceCalendar.css';

/** 요일 라벨 (달력 그리드 헤더용) */
const WEEKDAY_LABELS = ['일', '월', '화', '수', '목', '금', '토'];

/**
 * 이번 달의 달력 그리드 데이터를 생성한다.
 * 빈 셀(이전/다음 달)을 포함하여 7열 그리드를 구성한다.
 *
 * @param {number} year - 연도
 * @param {number} month - 월 (1-12)
 * @returns {Array<{day: number|null, dateStr: string|null}>} 달력 셀 배열
 */
function generateCalendarGrid(year, month) {
  /* 해당 월의 첫날과 마지막 날 계산 */
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);
  const startDayOfWeek = firstDay.getDay();
  const totalDays = lastDay.getDate();

  const grid = [];

  /* 첫 주의 빈 셀 (이전 달) */
  for (let i = 0; i < startDayOfWeek; i++) {
    grid.push({ day: null, dateStr: null });
  }

  /* 해당 월의 날짜 셀 */
  for (let d = 1; d <= totalDays; d++) {
    const mm = String(month).padStart(2, '0');
    const dd = String(d).padStart(2, '0');
    grid.push({ day: d, dateStr: `${year}-${mm}-${dd}` });
  }

  return grid;
}

export default function AttendanceCalendar({
  attendanceStatus,
  attendanceResult,
  isLoading,
  isCheckingAttendance,
  onCheckAttendance,
}) {
  /* 현재 날짜 기준 달력 데이터 */
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  const calendarGrid = generateCalendarGrid(currentYear, currentMonth);
  const todayStr = `${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

  /* 출석 날짜 Set (빠른 조회용) */
  const checkedDatesSet = new Set(attendanceStatus?.monthlyDates || []);

  return (
    <section className="point-page__section point-page__attendance">
      <h2 className="point-page__section-title">출석 체크</h2>

      {isLoading ? (
        <Loading message="출석 현황 로딩 중..." />
      ) : (
        <div className="point-page__attendance-content">
          {/* 출석 통계 */}
          <div className="point-page__attendance-stats">
            <div className="point-page__attendance-stat">
              <span className="point-page__attendance-stat-value">
                {attendanceStatus?.currentStreak || 0}일
              </span>
              <span className="point-page__attendance-stat-label">연속 출석</span>
            </div>
            <div className="point-page__attendance-stat">
              <span className="point-page__attendance-stat-value">
                {attendanceStatus?.totalDays || 0}일
              </span>
              <span className="point-page__attendance-stat-label">총 출석</span>
            </div>
          </div>

          {/* 보너스 안내 */}
          <div className="point-page__attendance-bonus-info">
            <span className="point-page__attendance-bonus-tag">기본 10P</span>
            <span className="point-page__attendance-bonus-tag point-page__attendance-bonus-tag--highlight">
              7일 연속 30P
            </span>
            <span className="point-page__attendance-bonus-tag point-page__attendance-bonus-tag--premium">
              30일 연속 60P
            </span>
          </div>

          {/* 달력 그리드 */}
          <div className="point-page__calendar">
            {/* 달력 헤더 — 현재 월 표시 */}
            <div className="point-page__calendar-header">
              <span className="point-page__calendar-month">
                {currentYear}년 {currentMonth}월
              </span>
            </div>

            {/* 요일 라벨 */}
            <div className="point-page__calendar-weekdays">
              {WEEKDAY_LABELS.map((label) => (
                <div key={label} className="point-page__calendar-weekday">
                  {label}
                </div>
              ))}
            </div>

            {/* 날짜 셀 */}
            <div className="point-page__calendar-grid">
              {calendarGrid.map((cell, idx) => {
                /* 빈 셀 (이전/다음 달) */
                if (!cell.day) {
                  return <div key={`empty-${idx}`} className="point-page__calendar-cell point-page__calendar-cell--empty" />;
                }

                /* 출석 여부 */
                const isChecked = checkedDatesSet.has(cell.dateStr);
                /* 오늘 날짜 여부 */
                const isToday = cell.dateStr === todayStr;

                return (
                  <div
                    key={cell.dateStr}
                    className={[
                      'point-page__calendar-cell',
                      isChecked ? 'point-page__calendar-cell--checked' : '',
                      isToday ? 'point-page__calendar-cell--today' : '',
                    ].join(' ')}
                  >
                    <span className="point-page__calendar-day">{cell.day}</span>
                    {isChecked && (
                      <span className="point-page__calendar-check-icon" aria-label="출석 완료">
                        &#10003;
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 출석 체크 결과 애니메이션 */}
          {attendanceResult && (
            <div className="point-page__attendance-result" role="status">
              <span className="point-page__attendance-result-points">
                +{attendanceResult.earnedPoints}P
              </span>
              <span className="point-page__attendance-result-text">
                {attendanceResult.streakCount}일 연속 출석!
              </span>
            </div>
          )}

          {/* 출석 체크 버튼 */}
          <button
            className={[
              'point-page__attendance-btn',
              attendanceStatus?.checkedToday ? 'point-page__attendance-btn--disabled' : '',
            ].join(' ')}
            onClick={onCheckAttendance}
            disabled={attendanceStatus?.checkedToday || isCheckingAttendance}
          >
            {isCheckingAttendance
              ? '출석 체크 중...'
              : attendanceStatus?.checkedToday
                ? '오늘 출석 완료'
                : '출석 체크'}
          </button>
        </div>
      )}
    </section>
  );
}
