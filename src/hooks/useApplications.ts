// src/hooks/useApplications.ts
import { useApiQuery, useApiMutation } from "@/hooks/useApi";
import { useQueryClient } from "@tanstack/react-query";

export interface Application {
  id: number;
  type: "volunteer" | "partner";
  name: string;
  email: string;
  phone?: string;
  interest: string;
  organization?: string;
  location?: string;
  message?: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export function useApplications(type?: "volunteer" | "partner") {
  return useApiQuery<Application[]>(
    ["applications", type || "all"],
    type ? `/applications?type=${type}` : "/applications"
  );
}

export function useCreateApplication() {
  const queryClient = useQueryClient();

  return useApiMutation<Application, Partial<Application>>(
    "/applications",
    "POST",
    {
      onSuccess: () => {
        // Invalidate both volunteer and partner queries so both tabs refresh
        queryClient.invalidateQueries({ queryKey: ["applications"] });
      },
    }
  );
}

export function useUpdateApplication() {
  const queryClient = useQueryClient();

  return useApiMutation<any, { id: number; status: string }>(
    ({ id }) => `/applications/${id}`,
    "PATCH",
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["applications"] });
      },
    }
  );
}
