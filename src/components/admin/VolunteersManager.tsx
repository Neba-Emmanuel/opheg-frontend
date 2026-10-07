import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { apiRequest } from "@/lib/apiClient";
import {
  volunteerFields,
  type VolunteerAttachment,
  type VolunteerRecord,
} from "@/lib/volunteerFields";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function VolunteerPhoto({ record }: { record: VolunteerRecord }) {
  const photo = record.attachments?.find((file) => file.kind === "photo");
  const name = String(record.details.name || "Volunteer");
  const initials = name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
  const preview = useQuery({
    queryKey: ["admin-volunteer-photo", record.id, photo?.id],
    queryFn: () => apiRequest<{ url: string }>(`/volunteers/${record.id}/files/${photo!.id}`, { auth: true }),
    enabled: Boolean(photo),
    staleTime: 45_000,
    gcTime: 60_000,
    retry: 1,
  });
  return (
    <span className="flex shrink-0 flex-col items-center gap-2">
      <Avatar className="h-20 w-20 rounded-2xl border-2 border-white shadow-sm ring-1 ring-emerald-200 sm:h-24 sm:w-24">
        {preview.data?.url && <AvatarImage key={preview.data.url} src={preview.data.url} alt={`${name}'s profile photo`} className="object-cover" />}
        <AvatarFallback className="rounded-2xl bg-gradient-to-br from-blue-100 to-emerald-100 text-xl font-bold text-blue-800" aria-label={`${name}: photo unavailable`}>
          {initials || "V"}
        </AvatarFallback>
      </Avatar>
      {!photo && <span className="text-xs text-slate-500">No photo</span>}
      {photo && preview.isPending && <span className="text-xs text-slate-500">Loading photo…</span>}
      {preview.isError && <span className="text-xs text-slate-500">Photo unavailable</span>}
    </span>
  );
}

function AttachmentDownload({
  recordId,
  file,
}: {
  recordId: number;
  file: VolunteerAttachment;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  async function download() {
    setLoading(true);
    setError("");
    try {
      const { url } = await apiRequest<{ url: string }>(
        `/volunteers/${recordId}/files/${file.id}`,
        { auth: true },
      );
      const link = document.createElement("a");
      link.href = url;
      link.rel = "noopener noreferrer";
      link.target = "_blank";
      link.click();
    } catch {
      setError("Unable to open this file. Try again.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div>
      <Button
        variant="outline"
        disabled={loading}
        onClick={() => void download()}
        className="h-auto max-w-full whitespace-normal text-left"
      >
        {loading
          ? "Preparing…"
          : `Download ${file.kind === "photo" ? "photo" : "document"}: ${file.name}`}{" "}
        ({Math.ceil(file.size / 1024)} KB)
      </Button>
      {error && (
        <p role="alert" className="text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

function PortalAccess({ record, refresh }: { record: VolunteerRecord; refresh: () => void }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function toggle() {
    setBusy(true); setError("");
    try { await apiRequest(`/volunteers/${record.id}/access`, { method: "PATCH", auth: true, body: JSON.stringify({ disabled: !record.portal?.disabled }) }); refresh(); }
    catch { setError("Unable to change portal access. Try again."); }
    finally { setBusy(false); }
  }
  return <div className="mt-5 rounded-lg border bg-slate-50 p-4"><h3 className="font-semibold">Volunteer portal</h3>{record.portal ? <><p className="my-2 text-sm">{record.portal.disabled ? "Access suspended" : "Access active"} · {record.portal.profile?.handle ? `@${record.portal.profile.handle}` : "No handle yet"} · {record.portal.profile?.visible ? "Directory sharing enabled" : "Profile private"}</p><Button variant="outline" disabled={busy} onClick={() => void toggle()}>{busy ? "Updating…" : record.portal.disabled ? "Restore portal access" : "Suspend portal access"}</Button></> : <p className="mt-2 text-sm">Not activated. The volunteer can request a sign-in link using the email on this record.</p>}{error && <p role="alert" className="text-sm text-red-700">{error}</p>}</div>;
}

export default function VolunteersManager() {
  const [search, setSearch] = useState("");
  const records = useQuery({
    queryKey: ["volunteer-records"],
    queryFn: () => apiRequest<VolunteerRecord[]>("/volunteers", { auth: true }),
    refetchOnMount: "always",
  });
  const filtered = (records.data ?? []).filter((record) =>
    [record.volunteer_id, ...Object.values(record.details)]
      .join(" ")
      .toLowerCase()
      .includes(search.trim().toLowerCase()),
  );
  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p>Existing volunteer information, newest submissions first.</p>
        <Button asChild variant="outline">
          <Link to="/volunteer-information">Open public form</Link>
        </Button>
      </div>
      <label className="block">
        <span className="mb-2 block text-sm font-medium">
          Search volunteers
        </span>
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Volunteer ID, name, email, location, skills…"
        />
      </label>
      <Button
        variant="outline"
        disabled={records.isFetching}
        onClick={() => void records.refetch()}
      >
        {records.isFetching ? "Refreshing…" : "Refresh records"}
      </Button>
      {records.isPending ? (
        <p role="status">Loading volunteer records…</p>
      ) : records.isError ? (
        <p role="alert" className="admin-error">
          Unable to load volunteer records. Check your admin session and try
          refreshing.
        </p>
      ) : (
        <>
          <p className="text-sm text-slate-500">
            {filtered.length} of {records.data?.length ?? 0} submissions. Repeat
            submissions are retained for review.
          </p>
          {filtered.length === 0 ? (
            <div className="admin-empty">
              {search
                ? "No volunteers match your search."
                : "No volunteer information submitted yet. Share the public form to get started."}
            </div>
          ) : (
            filtered.map((record) => (
              <details
                key={record.id}
                className="rounded-xl border bg-white p-5"
              >
                <summary className="cursor-pointer rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">
                  <span className="inline-flex w-full items-start gap-4 align-top">
                    <VolunteerPhoto record={record} />
                    <span className="min-w-0 flex-1">
                  <span className="mb-2 block font-mono text-sm font-semibold text-blue-700">
                    {record.volunteer_id || "ID not yet assigned"}
                  </span>
                  <strong className="block break-words text-lg text-slate-900">{String(record.details.name)}</strong>
                  <span className="mt-1 block break-all text-sm text-slate-600">
                    {String(record.details.email)}
                  </span>
                  <span className="mt-2 block text-sm text-slate-500">
                    {String(record.details.role)} ·{" "}
                    {String(record.details.city)} · Received{" "}
                    {new Date(record.created_at).toLocaleString()}
                  </span>
                    </span>
                  </span>
                </summary>
                <div className="mt-5 space-y-3">
                  <h3 className="font-semibold">Photo & documents</h3>
                  {record.attachments?.length ? (
                    record.attachments.map((file) => (
                      <AttachmentDownload
                        key={file.id}
                        recordId={record.id}
                        file={file}
                      />
                    ))
                  ) : (
                    <p className="text-sm text-slate-500">
                      No attachments provided.
                    </p>
                  )}
                </div>
                <dl className="mt-5 grid gap-5 sm:grid-cols-2">
                  {volunteerFields.map((field) => (
                    <div
                      key={field.key}
                      className={field.max > 250 ? "sm:col-span-2" : ""}
                    >
                      <dt className="text-sm text-slate-500">{field.label}</dt>
                      <dd className="mt-1 whitespace-pre-wrap break-words">
                        {String(record.details[field.key] || "Not provided")}
                      </dd>
                    </div>
                  ))}
                  <div>
                    <dt className="text-sm text-slate-500">
                      Consent to store and use details
                    </dt>
                    <dd>
                      {record.details.consent === true
                        ? "Given at submission"
                        : "Not recorded"}
                    </dd>
                  </div>
                </dl>
              </details>
            ))
          )}
        </>
      )}
    </section>
  );
}
