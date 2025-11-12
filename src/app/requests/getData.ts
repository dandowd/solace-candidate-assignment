import { ApiGetResponse, ApiErrorResponse } from "@/types/ApiResponse";

/**
 * @param url The API endpoint to fetch data from
 * @throws Error if the fetch fails or the response is not ok
 * @returns The data from the API response
 */
export const getData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  const contentType = response.headers.get("content-type") ?? "";

  if (!contentType.includes("application/json")) {
    // Pop a toast error message or redirect to an error page in a real app
    throw new Error(`Unexpected content type: ${contentType || "unknown"}`);
  }

  const body: ApiGetResponse<T> = await response.json();

  if (!response.ok) {
    const maybeError = (body as ApiErrorResponse).error;
    throw new Error(maybeError || response.statusText);
  }

  if ("error" in body) {
    // Pop a toast error message or redirect to an error page in a real app
    throw new Error(body.error);
  }

  if ("data" in body) {
    return body.data;
  }

  throw new Error("No data in response");
};
