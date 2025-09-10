// src/hooks/useNewsletter.ts
import { useApiQuery, useApiMutation } from "@/hooks/useApi";

export interface Subscriber {
  id: number;
  name?: string | null;
  email: string;
  isActive: boolean;
  createdAt: string;
}

export function useSubscribers() {
  return useApiQuery<Subscriber[]>(["subscribers"], "/newsletter/subscribers");
}

export function useSendNewsletter() {
  return useApiMutation<
    any,
    { subject: string; html: string; toAll: boolean; emails?: string[] }
  >("/newsletter/send", "POST");
}

export function useSubscribe() {
  return useApiMutation<any, { email: string; name?: string }>(
    "/newsletter/subscribe",
    "POST"
  );
}

export function useUnsubscribe() {
  return useApiMutation<any, { email: string }>(
    "/newsletter/unsubscribe",
    "PATCH"
  );
}
