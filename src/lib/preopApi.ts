import { API_URL } from "./apiClient";
import type { PreopAnswers, ScreeningInput } from "./preopSchema";
export const PREOP_TOKEN = "opheg_preop_session";
export interface PreopApplication {
  id: number;
  reference: string;
  status: string;
  answers: PreopAnswers;
  version: number;
  email: string;
  updated_at: string;
  submitted_at: string | null;
  accepted_at: string | null;
  public_message: string;
  timeline: { id: number; action: string; created_at: string }[];
  enrolments: {
    cohort: string | null;
    standing: string;
    started_at: string;
    ended_at: string | null;
  }[];
}
export interface PreopDetail extends PreopApplication {
  person_id: string;
  submissions: {
    id: number;
    version: number;
    answers: PreopAnswers;
    submitted_at: string;
  }[];
  reviews: {
    id: number;
    author_id: string;
    decision: string;
    reason: string;
    public_message: string;
    ratings: ScreeningInput["ratings"];
    created_at: string;
    rubric_version: number;
  }[];
  events: {
    id: number;
    actor_type: string;
    actor_id: string;
    action: string;
    before_state: Record<string, unknown>;
    after_state: Record<string, unknown>;
    reason: string;
    created_at: string;
  }[];
  volunteer: { id: number; volunteer_id: string } | null;
}
export class PreopApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public fields?: Record<string, string>,
  ) {
    super(message);
  }
}
export async function preopRequest<T>(
  path: string,
  options: RequestInit = {},
  auth: "applicant" | "admin" | "director" | "none" = "applicant",
): Promise<T> {
  const token =
    auth === "admin"
      ? localStorage.getItem("opheg_admin_token")
      : auth === "director"
        ? sessionStorage.getItem("opheg_volunteer_session")
        : auth === "applicant"
          ? sessionStorage.getItem(PREOP_TOKEN)
          : null;
  const response = await fetch(`${API_URL}/preop/${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  const body = await response
    .json()
    .catch(() => ({ message: "Unable to read the server response." }));
  if (!response.ok) {
    if (auth === "applicant" && response.status === 401) {
      sessionStorage.removeItem(PREOP_TOKEN);
    }
    throw new PreopApiError(
      body.message || "Unable to complete your request.",
      response.status,
      body.fields,
    );
  }
  return body;
}
