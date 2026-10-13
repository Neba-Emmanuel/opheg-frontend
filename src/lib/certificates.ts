export interface CertificateEntry { kind: string; title: string; institution: string; year: string; }
export function validateCertificates(value: unknown): CertificateEntry[] {
  if (value === undefined || value === "") return [];
  if (typeof value !== "string" || value.length > 50000) throw new Error("Invalid certificates.");
  let rows: unknown;
  try { rows = JSON.parse(value); } catch { throw new Error("Invalid certificates."); }
  if (!Array.isArray(rows) || rows.length > 50) throw new Error("Add up to 50 certificates.");
  return rows.map(row => {
    if (!row || typeof row !== "object" || !["Work", "Education"].includes(row.kind) || typeof row.title !== "string" || !row.title.trim() || row.title.length > 200 || typeof row.institution !== "string" || !row.institution.trim() || row.institution.length > 200 || typeof row.year !== "string" || !/^\d{4}$/.test(row.year) || Number(row.year) < 1900 || Number(row.year) > new Date().getFullYear()) throw new Error("Complete each certificate with its title, institution / employer, and valid completion year.");
    return {kind: row.kind, title: row.title.trim(), institution: row.institution.trim(), year: row.year};
  });
}
