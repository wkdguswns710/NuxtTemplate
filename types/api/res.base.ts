/**
 * 수신 Data에 공통으로 포함된 필드
 */
export interface ResBaseApi {
  code: number;
  message: string;
}

export interface PageInfo {
  totalcount: number;
}

// TODO: 서버 Response 구조
export interface ResBaseDataApi<T> extends ResBaseApi {
  data: T;
}

export interface ResPageDataApi<T> extends ResBaseDataApi<T> {
  pageInfo?: PageInfo;
}
