export type ApiGetResponse<T> =
  | {
      data: T;
    }
  | ApiErrorResponse;

export type ApiErrorResponse = {
  error: string;
};
