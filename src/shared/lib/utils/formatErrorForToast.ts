import { ActionErrorResponse } from "@/shared/types/action.types";

export function formatErrorForToast({
  status,
  error,
}: Omit<ActionErrorResponse, "status"> &
  Partial<Pick<ActionErrorResponse, "status">>) {
  return error.errors
    ? Object.entries(error.errors).reduce(
        (acc, [key, value]) =>
          acc +
          `${key.replace(key[0], key[0].toUpperCase())}: ${value.replace(":", "")},`,
        "",
      )
    : error.message;
}
