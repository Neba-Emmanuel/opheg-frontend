import { volunteerDepartments, volunteerFields } from "./volunteerFields.ts";

export function validateVolunteerValues(values: Record<string, unknown>, now = new Date()): Record<string, string> {
  const errors: Record<string, string> = {};
  const text = (key: string) => typeof values[key] === "string" ? (values[key] as string).trim() : "";
  for (const field of volunteerFields) {
    if (field.required && !text(field.key)) errors[field.key] = `${field.label} is required.`;
    else if (text(field.key).length > field.max) errors[field.key] = `Use no more than ${field.max} characters.`;
  }
  if (text("email") && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text("email"))) errors.email = "Enter a valid email address, such as name@example.org.";
  for (const key of ["phone", "alternatePhone", "emergencyPhone"]) {
    const value = text(key);
    if (value && (!/^\+?[\d\s().-]{7,40}$/.test(value) || value.replace(/\D/g, "").length < 7 || value.replace(/\D/g, "").length > 15)) errors[key] = "Enter a phone number with 7–15 digits, including the country code.";
  }
  if (text("joined") && (!/^\d{4}$/.test(text("joined")) || Number(text("joined")) < 2022 || Number(text("joined")) > now.getFullYear())) errors.joined = `Enter a year from 2022 to ${now.getFullYear()}.`;
  if (text("dateOfBirth")) {
    const value = text("dateOfBirth");
    const date = new Date(value);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || !Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== value || value < "1900-01-01" || date > now) errors.dateOfBirth = "Enter a valid birth date that is not in the future.";
  }
  if (text("portfolio")) {
    try { if (!["https:", "http:"].includes(new URL(text("portfolio")).protocol)) throw new Error(); }
    catch { errors.portfolio = "Enter a full website address beginning with https:// or http://."; }
  }
  const emergency = ["emergencyName", "emergencyRelationship", "emergencyPhone"];
  if (emergency.some(key => text(key))) {
    for (const key of emergency) if (!text(key)) errors[key] = "Complete all three emergency contact fields, or leave all three blank.";
  }
  if (text("gender") && !["Male", "Female"].includes(text("gender"))) errors.gender = "Select Male or Female.";
  if (text("department") && !volunteerDepartments.some(department => department.code === text("department"))) errors.department = "Select a department from the list.";
  if (values.consent !== true) errors.consent = "Please give your consent before submitting.";
  return errors;
}

export function validateAttachmentMetadata(photo: Pick<File, "name" | "size"> | null, documents: Pick<File, "name" | "size">[]): Record<string, string> {
  const errors: Record<string, string> = {};
  if (documents.length > 3) errors.documents = "Choose no more than three PDF documents.";
  const files = [...(photo ? [{ file: photo, key: "photo" }] : []), ...documents.map(file => ({ file, key: "documents" }))];
  for (const { file, key } of files) {
    if (!file.size || file.size > 1048576) errors[key] = "Each file must be non-empty and no larger than 1 MB.";
    else if (file.name.length > 180 || /[\\/]/.test(file.name) || [...file.name].some(character => character.charCodeAt(0) < 32)) errors[key] = "Use a filename under 181 characters without slashes or control characters.";
    else if (!(key === "photo" ? /\.(jpe?g|png)$/i : /\.pdf$/i).test(file.name)) errors[key] = key === "photo" ? "Choose a JPG or PNG photo." : "Choose PDF documents only.";
  }
  if (files.reduce((total, { file }) => total + file.size, 0) > 2621440) errors.attachments = "The combined size of all attachments must not exceed 2.5 MB.";
  return errors;
}

export async function validateAttachmentContents(photo: File | null, documents: File[]): Promise<Record<string, string>> {
  const errors = validateAttachmentMetadata(photo, documents);
  if (Object.keys(errors).length) return errors;
  await Promise.all([...(photo ? [{ file: photo, key: "photo" }] : []), ...documents.map(file => ({ file, key: "documents" }))].map(async ({ file, key }) => {
    try {
      const bytes = new Uint8Array(await file.slice(0, 8).arrayBuffer());
      const jpg = bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255;
      const png = [137, 80, 78, 71, 13, 10, 26, 10].every((value, index) => bytes[index] === value);
      const pdf = new TextDecoder().decode(bytes.slice(0, 5)) === "%PDF-";
      const valid = key === "photo" ? (/\.png$/i.test(file.name) ? png : jpg) : pdf;
      if (!valid) errors[key] = "The file content does not match its extension. Choose a valid file.";
    } catch { errors[key] = "This file could not be read. Please select it again."; }
  }));
  return errors;
}
