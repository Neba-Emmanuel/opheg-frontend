export interface TrainingModule {
  id: number;
  title: string;
  trainer: string;
  required: boolean;
  cohort: string;
}
export interface TrainingSession {
  id: number;
  module_id: number;
  title: string;
  starts_at: string;
  ends_at: string;
  location: string;
  mandatory: boolean;
  cancelled: boolean;
}
export interface TrainingProgram {
  cohort: string | null;
  version: number;
  modules: TrainingModule[];
  sessions: TrainingSession[];
}
export interface Trainee {
  id: number;
  person_id?: string;
  reference: string;
  version: number;
  name: string;
  stage: string;
  branch: string | null;
  cohort: string | null;
  review_program_version: number | null;
}
export interface Assessment {
  id: number;
  module_id: number | null;
  kind: string;
  score: number | null;
  ratings?: Record<string, { score: number; evidence: string }>;
  recommendation?: string;
  private_evidence?: string;
  feedback: string;
  author_id?: string;
  created_at: string;
}
export interface Attendance {
  session_id: number;
  status: string;
  arrival: string | null;
  departure: string | null;
  feedback: string;
  private_note?: string;
  evidence_provided?: boolean;
  author_id?: string;
  updated_at: string;
}
export interface TrainingDetail {
  trainee: Trainee;
  program: TrainingProgram;
  attendance: Attendance[];
  assessments: Assessment[];
  summary: {
    requiredModules: number;
    assessedModules: number;
    averageScore: number | null;
    attendancePercent: number | null;
    sessionsDue: number;
    attended: number;
    unmarked: number;
    upcoming: number;
    late: number;
  };
  membership: {
    volunteer_record_id: number;
    created_at: string;
    matricule: string;
  } | null;
  events: {
    id: number;
    action: string;
    actor_id: string;
    reason: string;
    created_at: string;
    before_state: Record<string, unknown>;
    after_state: Record<string, unknown>;
  }[];
  enrolments: {
    id: number;
    cohort: string;
    standing: string;
    started_at: string;
    ended_at: string | null;
  }[];
}
export const actionLabels: Record<string, string> = {
  assign: "Assign cohort & branch",
  start: "Start training",
  extend: "Extend / reopen training",
  attendance: "Record / correct attendance",
  assessment: "Add module assessment",
  complete: "Complete training",
  final_review: "Open final review",
  final_assessment: "Record final assessment",
  approve: "Approve for membership",
  not_approve: "Do not approve",
  convert: "Convert to full membership",
};
export function availableActions(stage: string, director = false) {
  const actions: Record<string, string[]> = {
    accepted: ["assign", "start"],
    training_active: [
      "attendance",
      "assessment",
      "complete",
      "assign",
      "extend",
    ],
    extended: ["attendance", "assessment", "start", "complete", "assign"],
    training_completed: ["final_review", "extend"],
    final_review: ["final_assessment", "approve", "not_approve", "extend"],
    approved: ["convert", "extend"],
    not_approved: ["extend", "assign"],
  };
  return (actions[stage] || []).filter(
    (a) => !director || !["assign", "convert"].includes(a),
  );
}
