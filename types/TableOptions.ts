import type {
  VDataTable,
  VDataTableHeaders,
  VDataTableFooter,
  VDataTableRows,
  VDataTableRow,
  VDataTableVirtual,
  VDataTableServer
} from 'vuetify/components/VDataTable';
type ReadonlyHeaders = VDataTable['$props']['headers'];
type UnwrapReadonlyArray<A> = A extends Readonly<Array<infer I>> ? I : never;
export type TableHeaders = UnwrapReadonlyArray<ReadonlyHeaders>;

export interface SortBy<T> {
  key: keyof T;
  order: 'asc' | 'desc';
}
export interface Params<T> {
  page: number;
  itemsPerPage: number;
  sortBy: SortBy<T>[];
  search: Partial<T>;
}
export interface Response1<T> {
  items: T[];
  total: number;
}
export interface TableOptions<T> {
  headers: TableHeaders[];
  sortBy: SortBy<T>[];
  items: T[];
  loading: boolean;
  page: number;
  itemsPerPage: number;
  search: string;
  searchs: Partial<T>;
  itemsLength: number;
}
