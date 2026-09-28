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

export interface EmailDraft {
  template: "newsletter" | "invitation" | "personal";
  subject: string; preheader: string; title: string; body: string;
  highlight: string; buttonLabel: string; buttonUrl: string; signature: string;
}
export interface EmailSendResult { sent: number; failed: number; total: number; failedEmails: string[]; }
export function useSendNewsletter() {
  return useApiMutation<EmailSendResult, EmailDraft & { toAll: boolean; emails: string[] }>("/newsletter/send", "POST");
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
