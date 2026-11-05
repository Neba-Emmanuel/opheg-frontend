// PREOP v1: keep this contract identical in the frontend and backend (tested).
export interface PreopField {
  key: string;
  label: string;
  kind: string;
  required: boolean;
  max: number;
  options?: string[];
  when?: string[];
}
export interface PreopSection {
  title: string;
  description: string;
  fields: PreopField[];
}
export type PreopAnswers = Record<string, string | boolean | string[]>;
export const preopSections: PreopSection[] = [
  {
    title: "Basic identity",
    description:
      "Tell us who you are and how to reach you. Professional documents are not required at this stage.",
    fields: [
      {
        key: "fullName",
        label: "Full name",
        kind: "text",
        required: true,
        max: 160,
      },
      {
        key: "preferredName",
        label: "Preferred name",
        kind: "text",
        required: false,
        max: 160,
      },
      {
        key: "dateOfBirth",
        label: "Date of birth",
        kind: "date",
        required: true,
        max: 160,
      },
      {
        key: "phone",
        label: "Phone number (include country code)",
        kind: "tel",
        required: true,
        max: 160,
      },
      {
        key: "whatsapp",
        label: "WhatsApp number (include country code)",
        kind: "tel",
        required: true,
        max: 160,
      },
      {
        key: "town",
        label: "Current town / community",
        kind: "text",
        required: true,
        max: 160,
      },
      {
        key: "gender",
        label: "Gender",
        kind: "select",
        required: true,
        max: 160,
        options: ["Male", "Female"],
      },
      {
        key: "region",
        label: "Region",
        kind: "select",
        required: true,
        max: 160,
        options: [
          "Adamawa",
          "Centre",
          "East",
          "Far North",
          "Littoral",
          "North",
          "North-West",
          "South",
          "South-West",
          "West",
        ],
      },
      {
        key: "occupation",
        label: "Current status",
        kind: "select",
        required: true,
        max: 160,
        options: [
          "Student",
          "Employed",
          "Self-employed",
          "Unemployed",
          "Other",
        ],
      },
      {
        key: "occupationOther",
        label: "Please describe your current status",
        kind: "text",
        required: true,
        max: 160,
        when: ["occupation", "Other"],
      },
      {
        key: "institution",
        label: "School, institution, or workplace",
        kind: "text",
        required: false,
        max: 160,
      },
      {
        key: "programme",
        label: "Programme / profession (if applicable)",
        kind: "text",
        required: false,
        max: 160,
      },
    ],
  },
  {
    title: "Your connection to OPHEG",
    description:
      "Help us understand how you discovered OPHEG and your previous service experience.",
    fields: [
      {
        key: "discovery",
        label: "How did you first hear about OPHEG?",
        kind: "text",
        required: true,
        max: 160,
      },
      {
        key: "attended",
        label: "Have you attended an OPHEG activity?",
        kind: "select",
        required: true,
        max: 160,
        options: ["Yes", "No"],
      },
      {
        key: "activity",
        label: "Which activity?",
        kind: "text",
        required: true,
        max: 160,
        when: ["attended", "Yes"],
      },
      {
        key: "interacted",
        label: "Have you interacted with an OPHEGMITE?",
        kind: "select",
        required: true,
        max: 160,
        options: ["Yes", "No"],
      },
      {
        key: "memberContact",
        label: "Who did you interact with?",
        kind: "text",
        required: true,
        max: 160,
        when: ["interacted", "Yes"],
      },
      {
        key: "volunteered",
        label: "Have you volunteered with another organization?",
        kind: "select",
        required: true,
        max: 160,
        options: ["Yes", "No"],
      },
      {
        key: "previousService",
        label: "Which organization and in what capacity?",
        kind: "text",
        required: true,
        max: 160,
        when: ["volunteered", "Yes"],
      },
      {
        key: "whyOpheg",
        label: "Why did you choose OPHEG rather than another organization?",
        kind: "long",
        required: true,
        max: 2000,
      },
    ],
  },
  {
    title: "Intention & motivation",
    description:
      "Reflect on what you hope to contribute and learn. Honest answers matter more than perfect wording.",
    fields: [
      {
        key: "motivation",
        label: "Why do you want to become an OPHEGMITE?",
        kind: "long",
        required: true,
        max: 2000,
      },
      {
        key: "gain",
        label: "What do you hope to gain from OPHEG?",
        kind: "long",
        required: true,
        max: 2000,
      },
      {
        key: "contribution",
        label: "What should OPHEG gain from having you as a volunteer?",
        kind: "long",
        required: true,
        max: 2000,
      },
      {
        key: "volunteeringMeaning",
        label: "What does volunteering mean to you?",
        kind: "long",
        required: true,
        max: 2000,
      },
      {
        key: "serviceMeaning",
        label: "What does community service mean to you?",
        kind: "long",
        required: true,
        max: 2000,
      },
      {
        key: "reasons",
        label: "Your reasons for applying (select all that apply)",
        kind: "multi",
        required: true,
        max: 160,
        options: [
          "To serve communities",
          "To gain experience",
          "To develop leadership skills",
          "To expand my professional network",
          "To build my CV",
          "To meet new people",
          "To contribute my skills",
          "To gain opportunities",
          "Other",
        ],
      },
      {
        key: "primaryReason",
        label: "Your primary reason",
        kind: "select",
        required: true,
        max: 160,
        options: [
          "To serve communities",
          "To gain experience",
          "To develop leadership skills",
          "To expand my professional network",
          "To build my CV",
          "To meet new people",
          "To contribute my skills",
          "To gain opportunities",
          "Other",
        ],
      },
      {
        key: "otherReason",
        label: "Describe your other reason",
        kind: "text",
        required: false,
        max: 160,
      },
      {
        key: "noReward",
        label:
          "Would you still volunteer without a certificate, recommendation, financial reward, or professional advantage?",
        kind: "select",
        required: true,
        max: 160,
        options: ["Yes", "No", "Maybe"],
      },
      {
        key: "noRewardWhy",
        label: "Why?",
        kind: "long",
        required: true,
        max: 2000,
      },
    ],
  },
  {
    title: "Understanding the journey",
    description:
      "PREOP training is intentionally demanding. It requires discipline, consistency, teamwork, learning, sacrifice, and perseverance. Acceptance does not guarantee completion.",
    fields: [
      {
        key: "willing",
        label: "Having read the above, are you willing to proceed?",
        kind: "select",
        required: true,
        max: 160,
        options: ["Yes", "No"],
      },
      {
        key: "challenge",
        label: "What might be the most difficult part of PREOP for you?",
        kind: "long",
        required: true,
        max: 2000,
      },
      {
        key: "sacrifice",
        label: "What are you prepared to sacrifice to complete the journey?",
        kind: "long",
        required: true,
        max: 2000,
      },
      {
        key: "difficulty",
        label:
          "How do you respond when something is more difficult than expected?",
        kind: "long",
        required: true,
        max: 2000,
      },
      {
        key: "difficultExperience",
        label:
          "Describe a difficult situation you experienced and how you handled it.",
        kind: "long",
        required: true,
        max: 2000,
      },
    ],
  },
  {
    title: "Commitment & discipline",
    description:
      "Consider what you can realistically commit alongside your other responsibilities.",
    fields: [
      {
        key: "weeklyTime",
        label: "Time you can realistically dedicate each week",
        kind: "select",
        required: true,
        max: 160,
        options: [
          "Less than 2 hours",
          "2–4 hours",
          "5–7 hours",
          "8–10 hours",
          "More than 10 hours",
        ],
      },
      {
        key: "responsibilities",
        label: "What other major responsibilities occupy your time?",
        kind: "long",
        required: true,
        max: 2000,
      },
      {
        key: "consistentAttendance",
        label: "Are you prepared to attend scheduled training consistently?",
        kind: "select",
        required: true,
        max: 160,
        options: ["Yes", "No", "Unsure"],
      },
      {
        key: "missedSession",
        label: "If you miss a training session, what would you normally do?",
        kind: "long",
        required: true,
        max: 2000,
      },
      {
        key: "correction",
        label: "How do you respond when corrected by someone senior?",
        kind: "long",
        required: true,
        max: 2000,
      },
      {
        key: "workStyle",
        label: "Which statement best describes you?",
        kind: "select",
        required: true,
        max: 160,
        options: [
          "I work best when closely supervised.",
          "I can work independently once expectations are clear.",
          "I prefer complete freedom in how I work.",
          "I need regular encouragement to remain motivated.",
        ],
      },
      {
        key: "lostInterest",
        label:
          "When you commit to something and later lose interest, what do you usually do?",
        kind: "long",
        required: true,
        max: 2000,
      },
    ],
  },
  {
    title: "Character, teamwork & professionalism",
    description:
      "Explain how you would respond to each situation. Reviewers will consider your reasoning and judgment.",
    fields: [
      {
        key: "scenarioCorrection",
        label:
          "Correction: a senior member says your work is incorrect, but you believe your approach was better. What would you do?",
        kind: "long",
        required: true,
        max: 2000,
      },
      {
        key: "scenarioConflict",
        label:
          "Team conflict: you strongly disagree with another PREOP during a group assignment. How would you handle it?",
        kind: "long",
        required: true,
        max: 2000,
      },
      {
        key: "scenarioLeadership",
        label:
          "Leadership: your team leader makes a decision you disagree with that does not violate policy. What would you do?",
        kind: "long",
        required: true,
        max: 2000,
      },
      {
        key: "scenarioFailure",
        label:
          "Failure: you fail an assessment you expected to pass. What is your next step?",
        kind: "long",
        required: true,
        max: 2000,
      },
      {
        key: "scenarioAccountability",
        label:
          "Accountability: you made a mistake that could affect the team, and nobody has noticed. What would you do?",
        kind: "long",
        required: true,
        max: 2000,
      },
      {
        key: "scenarioPressure",
        label:
          "Pressure: you are exhausted and considering quitting, but your team depends on you. What would you do?",
        kind: "long",
        required: true,
        max: 2000,
      },
      {
        key: "scenarioConfidentiality",
        label:
          "Confidentiality: a friend asks about sensitive information you learned about a community member. How would you respond?",
        kind: "long",
        required: true,
        max: 2000,
      },
    ],
  },
  {
    title: "Self-awareness",
    description:
      "Share your strengths, development needs, and how you work with others.",
    fields: [
      {
        key: "strengths",
        label: "What are your three greatest strengths?",
        kind: "long",
        required: true,
        max: 2000,
      },
      {
        key: "weaknesses",
        label: "What are your three greatest weaknesses?",
        kind: "long",
        required: true,
        max: 2000,
      },
      {
        key: "improvement",
        label: "What are you currently trying to improve about yourself?",
        kind: "long",
        required: true,
        max: 2000,
      },
      {
        key: "pressure",
        label: "How do you react under pressure?",
        kind: "long",
        required: true,
        max: 2000,
      },
      {
        key: "criticism",
        label: "What type of criticism is hardest for you to accept?",
        kind: "long",
        required: true,
        max: 2000,
      },
      {
        key: "leave",
        label: "What would make you leave PREOP?",
        kind: "long",
        required: true,
        max: 2000,
      },
      {
        key: "continue",
        label: "What would make you continue when you want to quit?",
        kind: "long",
        required: true,
        max: 2000,
      },
      {
        key: "teammates",
        label: "What might teammates find difficult about working with you?",
        kind: "long",
        required: true,
        max: 2000,
      },
    ],
  },
  {
    title: "Final declarations",
    description:
      "PREOP is not full OPHEG membership. Acceptance does not guarantee completion or full membership. Training assesses commitment, discipline, professionalism, teamwork, resilience, and alignment with OPHEG values. You may withdraw voluntarily, and OPHEG may discontinue participation where necessary. Those selected for membership must subsequently complete OPHEG’s professional, administrative, and financial requirements.",
    fields: [
      {
        key: "accuracy",
        label: "I confirm my answers are accurate to the best of my knowledge.",
        kind: "check",
        required: true,
        max: 160,
      },
      {
        key: "declaration",
        label:
          "I have read and understood the declaration and agree to proceed with PREOP.",
        kind: "check",
        required: true,
        max: 160,
      },
      {
        key: "privacy",
        label:
          "I agree that OPHEG may process this application for screening, communication, and PREOP administration.",
        kind: "check",
        required: true,
        max: 160,
      },
    ],
  },
];
export const preopFields = preopSections.flatMap((section) => section.fields);
export const preopStatuses: Record<string, string> = {
  draft: "Draft",
  submitted: "Submitted",
  under_review: "Under review",
  waitlisted: "Waitlisted",
  accepted: "Accepted PREOP",
  accepted_observation: "Accepted with observation",
  rejected: "Not accepted",
  withdrawn: "Withdrawn",
};
export function visibleField(field: PreopField, answers: PreopAnswers) {
  return !field.when || answers[field.when[0]] === field.when[1];
}
export function normalizeAnswers(input: unknown): PreopAnswers {
  if (!input || typeof input !== "object" || Array.isArray(input))
    throw new Error("Invalid application answers.");
  const raw = input as Record<string, unknown>;
  const result: PreopAnswers = {};
  for (const field of preopFields) {
    const value = raw[field.key];
    if (value === undefined) continue;
    if (field.kind === "check") {
      if (typeof value !== "boolean")
        throw new Error(`${field.label}: use a checkbox.`);
      result[field.key] = value;
    } else if (field.kind === "multi") {
      if (
        !Array.isArray(value) ||
        value.length > 10 ||
        value.some((v) => typeof v !== "string" || !field.options?.includes(v))
      )
        throw new Error("Choose valid application reasons.");
      result[field.key] = [...new Set(value)];
    } else {
      if (typeof value !== "string" || value.length > field.max)
        throw new Error(`${field.label}: maximum ${field.max} characters.`);
      if (field.options && value && !field.options.includes(value))
        throw new Error(`${field.label}: choose an option from the list.`);
      result[field.key] = value.trim();
    }
  }
  for (const field of preopFields)
    if (!visibleField(field, result)) delete result[field.key];
  return result;
}
export function preopErrors(answers: PreopAnswers): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const f of preopFields) {
    if (!visibleField(f, answers)) continue;
    const v = answers[f.key];
    if (
      f.required &&
      (f.kind === "check"
        ? v !== true
        : Array.isArray(v)
          ? v.length === 0
          : typeof v !== "string" || !v.trim())
    )
      errors[f.key] = "This field is required.";
    if (typeof v === "string" && v.length > f.max)
      errors[f.key] = `Use no more than ${f.max} characters.`;
  }
  for (const key of ["phone", "whatsapp"]) {
    const v = String(answers[key] || "");
    if (
      v &&
      (!/^\+?[\d\s().-]{7,40}$/.test(v) ||
        v.replace(/\D/g, "").length < 7 ||
        v.replace(/\D/g, "").length > 15)
    )
      errors[key] = "Enter a valid phone number with country code.";
  }
  const dob = String(answers.dateOfBirth || "");
  if (dob) {
    const d = new Date(dob);
    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(dob) ||
      !Number.isFinite(d.getTime()) ||
      d.toISOString().slice(0, 10) !== dob ||
      dob < "1900-01-01" ||
      d > new Date()
    )
      errors.dateOfBirth = "Enter a valid date of birth.";
  }
  if (answers.willing && answers.willing !== "Yes")
    errors.willing =
      "You must be willing to proceed to submit. You can keep a draft while deciding.";
  if (
    answers.primaryReason &&
    (!Array.isArray(answers.reasons) ||
      !answers.reasons.includes(String(answers.primaryReason)))
  )
    errors.primaryReason = "Your primary reason must also be selected above.";
  if (
    Array.isArray(answers.reasons) &&
    answers.reasons.includes("Other") &&
    !String(answers.otherReason || "").trim()
  )
    errors.otherReason = "Describe your other reason.";
  return errors;
}
export const screeningDimensions = [
  "motivation",
  "commitment",
  "character",
] as const;
export const scenarioKeys = preopSections[5].fields.map((f) => f.key);
export interface ScreeningInput {
  decision: string;
  reason: string;
  publicMessage: string;
  cohort: string | null;
  ratings: Record<string, { score: number; evidence: string }>;
}
export function validateScreening(input: unknown): ScreeningInput {
  if (!input || typeof input !== "object")
    throw new Error("Invalid screening review.");
  const raw = input as Record<string, unknown>;
  const decision = String(raw.decision || "");
  if (
    ![
      "under_review",
      "waitlisted",
      "accepted",
      "accepted_observation",
      "rejected",
      "request_correction",
    ].includes(decision)
  )
    throw new Error("Choose a screening decision.");
  const text = (key: string, max: number) => {
    if (typeof raw[key] !== "string" || String(raw[key]).length > max)
      throw new Error(`Invalid ${key}.`);
    return String(raw[key]).trim();
  };
  const reason = text("reason", 3000);
  if (!reason)
    throw new Error("Record the evidence and reason for this decision.");
  const publicMessage = text("publicMessage", 1500);
  if (!publicMessage) throw new Error("Provide an applicant-facing message.");
  const ratings: ScreeningInput["ratings"] = {};
  const entries = raw.ratings || {};
  if (typeof entries !== "object" || Array.isArray(entries))
    throw new Error("Invalid ratings.");
  for (const key of [...screeningDimensions, ...scenarioKeys]) {
    const entry = (entries as Record<string, unknown>)[key];
    if (entry === undefined) continue;
    const v = entry as { score: unknown; evidence: unknown };
    if (
      !v ||
      !Number.isInteger(v.score) ||
      Number(v.score) < 1 ||
      Number(v.score) > 5 ||
      typeof v.evidence !== "string" ||
      !v.evidence.trim() ||
      v.evidence.length > 2000
    )
      throw new Error(
        "Every rating needs a score from 1 to 5 and supporting evidence.",
      );
    ratings[key] = { score: Number(v.score), evidence: v.evidence.trim() };
  }
  if (
    ["accepted", "accepted_observation", "rejected", "waitlisted"].includes(
      decision,
    ) &&
    screeningDimensions.some((key) => !ratings[key])
  )
    throw new Error(
      "Rate motivation, commitment, and character with supporting evidence.",
    );
  const cohort =
    raw.cohort === null || raw.cohort === "" || raw.cohort === undefined
      ? null
      : String(raw.cohort);
  if (cohort && !/^Cohort [1-9][0-9]{0,8}$/.test(cohort))
    throw new Error("Select an existing cohort.");
  return { decision, reason, publicMessage, cohort, ratings };
}
