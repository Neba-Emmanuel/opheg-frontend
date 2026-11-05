export const performanceDimensions = [
  "discipline",
  "commitment",
  "teamwork",
  "respect",
  "communication",
  "leadership",
  "initiative",
  "accountability",
  "resilience",
  "professionalism",
  "adaptability",
] as const;
export const trainingStages: Record<string, string> = {
  accepted: "Accepted · awaiting training",
  training_active: "Training active",
  training_completed: "Training completed",
  final_review: "Final review",
  approved: "Approved · membership requirements pending",
  extended: "Extended training",
  not_approved: "Not approved",
  full_member: "Full OPHEGMITE",
  withdrawn: "Withdrawn",
};
export const attendanceStatuses = [
  "present",
  "late",
  "absent",
  "excused",
  "unexcused",
  "left_early",
];
export const recommendations = [
  "Strongly recommend",
  "Recommend",
  "Recommend with conditions",
  "Extend PREOP",
  "Do not recommend",
];
export const trainingBranches = [
  "Kumba",
  "Buea",
  "Limbe",
  "Douala",
  "Yaoundé",
  "Bamenda",
];
export const trainingDepartments = [
  "HLTH",
  "OUTR",
  "EDUC",
  "COMM",
  "OPER",
  "FUND",
  "GEN",
];
export function trainingCommand(input: unknown, program = false) {
  if (!input || typeof input !== "object" || Array.isArray(input))
    throw new Error("Invalid command.");
  const raw = input as Record<string, unknown>;
  const action = String(raw.action || "");
  if (
    !(
      program
        ? ["module", "edit_module", "session", "edit_session", "cancel_session"]
        : [
            "assign",
            "start",
            "extend",
            "attendance",
            "assessment",
            "complete",
            "final_review",
            "final_assessment",
            "approve",
            "not_approve",
            "convert",
          ]
    ).includes(action)
  )
    throw new Error("Choose a valid action.");
  if (!Number.isSafeInteger(raw.version) || Number(raw.version) < 0)
    throw new Error("Invalid record version.");
  const data: Record<string, unknown> = {};
  function text(key: string, max = 2000, required = true) {
    const value = raw[key];
    if (
      typeof value !== "string" ||
      value.length > max ||
      (required && !value.trim())
    )
      throw new Error(`Enter ${key} (up to ${max} characters).`);
    data[key] = value.trim();
    return value.trim();
  }
  function choice(key: string, options: readonly string[]) {
    const value = text(key, 160);
    if (!options.includes(value)) throw new Error(`Choose a valid ${key}.`);
    return value;
  }
  function number(key: string, min: number, max: number, integer = false) {
    const value = raw[key];
    if (
      typeof value !== "number" ||
      !Number.isFinite(value) ||
      value < min ||
      value > max ||
      (integer && !Number.isSafeInteger(value))
    )
      throw new Error(`Enter a valid ${key}.`);
    data[key] = value;
    return value;
  }
  function bool(key: string) {
    if (typeof raw[key] !== "boolean") throw new Error(`Confirm ${key}.`);
    data[key] = raw[key];
  }
  function date(key: string, required = true) {
    if (!required && (raw[key] === "" || raw[key] === undefined)) {
      data[key] = "";
      return null;
    }
    const value = text(key, 40);
    const parsed = Date.parse(value);
    if (!/^\d{4}-\d{2}-\d{2}T/.test(value) || !Number.isFinite(parsed))
      throw new Error(`Enter a valid ${key}.`);
    data[key] = new Date(parsed).toISOString();
    return parsed;
  }
  text("reason", 3000);
  if (action === "edit_module")
    number("moduleId", 1, Number.MAX_SAFE_INTEGER, true);
  if (action === "edit_session")
    number("sessionId", 1, Number.MAX_SAFE_INTEGER, true);
  if (["module", "edit_module"].includes(action)) {
    text("title", 160);
    text("trainer", 160);
    bool("required");
  }
  if (["session", "edit_session"].includes(action)) {
    number("moduleId", 1, Number.MAX_SAFE_INTEGER, true);
    text("title", 160);
    text("location", 300);
    bool("mandatory");
    const start = date("startsAt")!;
    const end = date("endsAt")!;
    if (end <= start) throw new Error("End time must be after start time.");
  }
  if (action === "cancel_session")
    number("sessionId", 1, Number.MAX_SAFE_INTEGER, true);
  if (action === "assign") {
    const c = text("cohort", 30);
    if (!/^Cohort [1-9][0-9]{0,8}$/.test(c))
      throw new Error("Select an existing cohort.");
    choice("branch", trainingBranches);
  }
  if (action === "attendance") {
    number("sessionId", 1, Number.MAX_SAFE_INTEGER, true);
    choice("status", attendanceStatuses);
    const arrival = date("arrival", false),
      departure = date("departure", false);
    if (arrival !== null && departure !== null && departure < arrival)
      throw new Error("Departure must follow arrival.");
    if (
      (arrival !== null && arrival > Date.now()) ||
      (departure !== null && departure > Date.now())
    )
      throw new Error("Attendance times cannot be in the future.");
    bool("evidenceProvided");
    text("feedback", 2000, false);
  }
  if (action === "assessment") {
    number("moduleId", 1, Number.MAX_SAFE_INTEGER, true);
    number("score", 0, 100);
    text("feedback");
  }
  if (action === "final_assessment") {
    choice("recommendation", recommendations);
    text("feedback");
    const ratings: Record<string, { score: number; evidence: string }> = {};
    if (
      !raw.ratings ||
      typeof raw.ratings !== "object" ||
      Array.isArray(raw.ratings)
    )
      throw new Error("Rate each performance dimension.");
    for (const key of performanceDimensions) {
      const item = (raw.ratings as Record<string, unknown>)[key] as
        | { score: unknown; evidence: unknown }
        | undefined;
      if (
        !item ||
        !Number.isInteger(item.score) ||
        Number(item.score) < 1 ||
        Number(item.score) > 5 ||
        typeof item.evidence !== "string" ||
        !item.evidence.trim() ||
        item.evidence.length > 2000
      )
        throw new Error(
          "Each final rating needs a score from 1 to 5 and evidence.",
        );
      ratings[key] = {
        score: Number(item.score),
        evidence: item.evidence.trim(),
      };
    }
    data.ratings = ratings;
  }
  if (action === "convert") {
    text("requirementsReview", 3000);
    bool("requirementsConfirmed");
    if (data.requirementsConfirmed !== true)
      throw new Error(
        "Confirm that applicable membership requirements have been reviewed.",
      );
    choice("department", trainingDepartments);
    text("country", 100);
  }
  return { action, version: Number(raw.version), data };
}
