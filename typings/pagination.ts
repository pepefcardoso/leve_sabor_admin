export interface PaginationParams {
  page: number;
  per_page: number;
}

export interface PaginationResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  total: number;
}

export type ApiResponse<T> = {
  data: T;
  message?: string;
};
