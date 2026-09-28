import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { apiRequest } from "@/lib/apiClient";
import { volunteerFields, type VolunteerAttachment, type VolunteerRecord } from "@/lib/volunteerFields";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function AttachmentDownload({ recordId, file }: { recordId: number; file: VolunteerAttachment }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  async function download() {
    setLoading(true); setError("");
    try {
      const { url } = await apiRequest<{ url: string }>(`/volunteers/${recordId}/files/${file.id}`, { auth: true });
      const link = document.createElement("a");
      link.href = url; link.rel = "noopener noreferrer"; link.target = "_blank"; link.click();
    } catch { setError("Unable to open this file. Try again."); }
    finally { setLoading(false); }
  }
  return <div><Button variant="outline" disabled={loading} onClick={() => void download()} className="h-auto max-w-full whitespace-normal text-left">{loading ? "Preparing…" : `Download ${file.kind === "photo" ? "photo" : "document"}: ${file.name}`} ({Math.ceil(file.size / 1024)} KB)</Button>{error && <p role="alert" className="text-sm text-red-700">{error}</p>}</div>;
}

export default function VolunteersManager() {
  const [search, setSearch] = useState("");
  const records = useQuery({ queryKey: ["volunteer-records"], queryFn: () => apiRequest<VolunteerRecord[]>("/volunteers", { auth: true }), refetchOnMount: "always" });
  const filtered = (records.data ?? []).filter(record => [record.volunteer_id, ...Object.values(record.details)].join(" ").toLowerCase().includes(search.trim().toLowerCase()));
  return <section className="space-y-5">
    <div className="flex flex-wrap items-center justify-between gap-3"><p>Existing volunteer information, newest submissions first.</p><Button asChild variant="outline"><Link to="/volunteer-information">Open public form</Link></Button></div>
    <label className="block"><span className="mb-2 block text-sm font-medium">Search volunteers</span><Input value={search} onChange={event => setSearch(event.target.value)} placeholder="Volunteer ID, name, email, location, skills…" /></label>
    <Button variant="outline" disabled={records.isFetching} onClick={() => void records.refetch()}>{records.isFetching ? "Refreshing…" : "Refresh records"}</Button>
    {records.isPending ? <p role="status">Loading volunteer records…</p> : records.isError ? <p role="alert" className="admin-error">Unable to load volunteer records. Check your admin session and try refreshing.</p> : <>
      <p className="text-sm text-slate-500">{filtered.length} of {records.data?.length ?? 0} submissions. Repeat submissions are retained for review.</p>
      {filtered.length === 0 ? <div className="admin-empty">{search ? "No volunteers match your search." : "No volunteer information submitted yet. Share the public form to get started."}</div> : filtered.map(record => <details key={record.id} className="rounded-xl border bg-white p-5">
        <summary className="cursor-pointer"><span className="mb-2 block font-mono text-sm font-semibold text-blue-700">{record.volunteer_id || "ID not yet assigned"}</span><strong>{String(record.details.name)}</strong><span className="ml-3 break-all text-sm text-slate-600">{String(record.details.email)}</span><p className="mt-2 text-sm text-slate-500">{String(record.details.role)} · {String(record.details.city)} · Received {new Date(record.created_at).toLocaleString()}</p></summary>
        <div className="mt-5 space-y-3"><h3 className="font-semibold">Photo & documents</h3>{record.attachments?.length ? record.attachments.map(file => <AttachmentDownload key={file.id} recordId={record.id} file={file} />) : <p className="text-sm text-slate-500">No attachments provided.</p>}</div>
        <dl className="mt-5 grid gap-5 sm:grid-cols-2">{volunteerFields.map(field => <div key={field.key} className={field.max > 250 ? "sm:col-span-2" : ""}><dt className="text-sm text-slate-500">{field.label}</dt><dd className="mt-1 whitespace-pre-wrap break-words">{String(record.details[field.key] || "Not provided")}</dd></div>)}<div><dt className="text-sm text-slate-500">Consent to store and use details</dt><dd>{record.details.consent === true ? "Given at submission" : "Not recorded"}</dd></div></dl>
      </details>)}
    </>}
  </section>;
}
