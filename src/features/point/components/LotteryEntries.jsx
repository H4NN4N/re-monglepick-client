/**
 * 영화 티켓 응모 현황 섹션 컴포넌트 (2026-04-28 신규).
 *
 * <p>응모권(APPLY_MOVIE_TICKET) 사용 시 자동 발급된 entry 의 회차/결과를 사용자에게 노출한다.
 * Backend GET /api/v1/users/me/lottery/entries 의 응답을 그대로 페이징 테이블로 표시한다.</p>
 *
 * <h3>표시 정책</h3>
 * <ul>
 *   <li>회차 (YYYY-MM) — monospace 로 강조</li>
 *   <li>결과 — PENDING(노랑), WON(초록), LOST(회색) pill</li>
 *   <li>응모 시각 / 추첨 시각 — 추첨 전엔 "추첨 대기" 표기</li>
 * </ul>
 *
 * <h3>운영 메시지</h3>
 * <p>매월 1일 0시(KST) 자동 추첨이라는 안내를 상단 Notice 박스로 노출한다.
 * 당첨 시 외부 채널(이메일 등)으로 영화티켓이 발송된다는 점도 함께 설명한다.</p>
 *
 * @param {Object} props
 * @param {Object} props.entries     - 응모 페이지 데이터 {content, totalPages, totalElements, page}
 * @param {number} props.currentPage - 0-indexed 현재 페이지
 * @param {boolean} props.isLoading  - 로딩 상태
 * @param {Function} props.onPageChange - 페이지 변경 핸들러
 * @param {Function} props.formatNumber - 숫자 포맷터
 * @param {Function} props.formatDate   - 날짜 포맷터
 */

import Loading from '../../../shared/components/Loading/Loading';
import * as S from './LotteryEntries.styled';

/** entry status → 한국어 표시 라벨 */
const STATUS_LABEL = {
  PENDING: '추첨 대기',
  WON: '당첨',
  LOST: '미당첨',
};

export default function LotteryEntries({
  entries,
  currentPage,
  isLoading,
  onPageChange,
  formatNumber,
  formatDate,
}) {
  const total = entries?.totalElements ?? 0;
  const items = entries?.content ?? [];
  const totalPages = entries?.totalPages ?? 0;

  return (
    <S.Section>
      <S.SectionTitle>
        영화 티켓 응모 현황
        {total > 0 && <S.TitleCount>({formatNumber(total)}건)</S.TitleCount>}
      </S.SectionTitle>

      <S.Notice>
        응모권을 사용하면 해당 월(<strong>YYYY-MM</strong>) 회차에 자동으로 응모됩니다.
        매월 <strong>1일 0시</strong> 직전 월 회차의 추첨이 진행되며, 당첨 시 가입 이메일로 영화티켓이 발송됩니다.
        한 회차에 응모권을 여러 개 사용하면 그만큼 당첨 확률이 누적됩니다.
      </S.Notice>

      {isLoading ? (
        <Loading message="응모 현황 로딩 중..." />
      ) : items.length === 0 ? (
        <S.Empty>
          <p>아직 응모한 내역이 없습니다.</p>
          <p>상점에서 응모권을 교환한 뒤 "내 아이템" 탭에서 사용해보세요.</p>
        </S.Empty>
      ) : (
        <>
          <S.TableWrapper>
            <S.Table>
              <thead>
                <tr>
                  <S.Th>회차</S.Th>
                  <S.Th>결과</S.Th>
                  <S.Th>응모 일시</S.Th>
                  <S.Th>추첨 일시</S.Th>
                </tr>
              </thead>
              <tbody>
                {items.map((entry) => (
                  <S.Tr key={entry.entryId}>
                    <S.CycleCell>{entry.cycleYearMonth}</S.CycleCell>
                    <S.Td>
                      <S.StatusPill $status={entry.status}>
                        {STATUS_LABEL[entry.status] ?? entry.status}
                      </S.StatusPill>
                    </S.Td>
                    <S.DateCell>{formatDate(entry.enrolledAt)}</S.DateCell>
                    <S.DateCell>
                      {entry.drawnAt ? formatDate(entry.drawnAt) : '추첨 대기'}
                    </S.DateCell>
                  </S.Tr>
                ))}
              </tbody>
            </S.Table>
          </S.TableWrapper>

          {totalPages > 1 && (
            <S.Pagination>
              <S.PaginationBtn
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 0}
              >
                이전
              </S.PaginationBtn>
              <S.PaginationInfo>
                {currentPage + 1} / {totalPages}
              </S.PaginationInfo>
              <S.PaginationBtn
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage + 1 >= totalPages}
              >
                다음
              </S.PaginationBtn>
            </S.Pagination>
          )}
        </>
      )}
    </S.Section>
  );
}
