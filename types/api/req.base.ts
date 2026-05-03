/**
 * 요청 Data에 Page관련 공통으로 포함된 필드
 */
export interface ReqBase {
  /**
   * 요청 페이지 번호
   */
  page: number;

  /**
   * 페이지당 row 수
   */
  rows: number;
}
