import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import { apiRequest } from "@/lib/apiClient";

// Generic GET hook
export function useApiQuery<T>(
  key: string[],
  endpoint: string,
  options?: UseQueryOptions<T>
) {
  return useQuery<T>({
    queryKey: key,
    queryFn: () => apiRequest<T>(endpoint, { auth: true }),
    ...options,
  });
}

// Generic POST/PUT/PATCH/DELETE hook
export function useApiMutation<T, V = any>(
  endpoint: string | ((variables: V) => string),
  method: "POST" | "PUT" | "PATCH" | "DELETE",
  options?: UseMutationOptions<T, Error, V>
) {
  return useMutation<T, Error, V>({
    mutationFn: (variables: V) => {
      const finalEndpoint =
        typeof endpoint === "function" ? endpoint(variables) : endpoint;

      return apiRequest<T>(finalEndpoint, {
        method,
        body: JSON.stringify(variables),
        auth: true,
      });
    },
    ...options,
  });
}
