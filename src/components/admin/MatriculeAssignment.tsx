import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useVolunteerCohorts } from "@/hooks/useVolunteerCohorts";
import { apiRequest } from "@/lib/apiClient";
import type { VolunteerRecord } from "@/lib/volunteerFields";
import { matriculeCountry } from "@/lib/matriculeCountry";
export default function MatriculeAssignment({
  record,
  onSaved,
}: {
  record: VolunteerRecord;
  onSaved: () => void;
}) {
  const cohorts = useVolunteerCohorts();
  const [country, setCountry] = useState(String(record.details.country || "")),
    [cohort, setCohort] = useState(
      String(record.assigned_cohort || record.details.cohort || ""),
    ),
    [year, setYear] = useState(String(record.details.joined || "")),
    [busy, setBusy] = useState(false),
    [error, setError] = useState(""),
    [issued, setIssued] = useState("");
  if (record.volunteer_id.startsWith("OPH/")) return null;
  async function save() {
    setBusy(true);
    setError("");
    try {
      const result = await apiRequest<{ volunteerId: string }>(
        `/volunteers/${record.id}/matricule`,
        {
          auth: true,
          method: "PATCH",
          body: JSON.stringify({ country, cohort, joined: year }),
        },
      );
      setIssued(result.volunteerId);
      onSaved();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <section className="space-y-3 rounded-xl border border-blue-200 bg-blue-50 p-4">
      <h3>Issue new-format matricule</h3>
      <p className="text-sm">
        Confirm the original country, admission cohort and year. The unique
        number stays the same; these ID details remain fixed after issuance.
      </p>
      {issued ? (
        <p role="status">{issued}</p>
      ) : (
        <>
          <label className="block">
            Country
            <input
              className="block w-full rounded border p-2"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </label>
          <label className="block">
            Admission cohort
            <select
              className="block w-full rounded border p-2"
              value={cohort}
              onChange={(e) => setCohort(e.target.value)}
            >
              <option value="">Select cohort</option>
              {cohorts.data?.map((c) => (
                <option key={c.number}>{c.name}</option>
              ))}
            </select>
          </label>
          <label className="block">
            Year admitted
            <input
              className="block w-full rounded border p-2"
              type="number"
              min={2022}
              max={new Date().getUTCFullYear()}
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </label>
          <Button
            disabled={
              busy ||
              !matriculeCountry(country) ||
              !cohorts.data?.some((c) => c.name === cohort) ||
              !/^\d{4}$/.test(year) ||
              Number(year) < 2022 ||
              Number(year) > new Date().getUTCFullYear()
            }
            onClick={() => void save()}
          >
            {busy ? "Issuing…" : "Confirm and issue matricule"}
          </Button>
        </>
      )}
      {error && <p role="alert">{error}</p>}
    </section>
  );
}
