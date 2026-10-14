import { useVolunteerCohorts, type VolunteerCohort } from "@/hooks/useVolunteerCohorts";
import { Eye, MoreHorizontal, MessageSquare, Users, UserX, Plus, GraduationCap, MapPin, LockKeyhole, Clock, CheckCircle2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import "./volunteer-register.css";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { apiRequest } from "@/lib/apiClient";
import {
  volunteerFields, volunteerBranches,
  type VolunteerAttachment,
  type VolunteerRecord,
} from "@/lib/volunteerFields";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function statusOf(record: VolunteerRecord) {
  return record.admin_status ?? (["inactive", "on leave"].includes(String(record.details.status).trim().toLowerCase()) ? "inactive" : "active");
}

function MembershipStatus({ record, saved, startInactive = false }: { record: VolunteerRecord; saved: (patch: Partial<VolunteerRecord>) => void; startInactive?: boolean }) {
  const [open, setOpen] = useState(startInactive);
  const [reason, setReason] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function save(status: "active" | "inactive") {
    setBusy(true); setError("");
    try {
      const patch = await apiRequest<Partial<VolunteerRecord>>(`/volunteers/${record.id}/status`, { method: "PATCH", auth: true, body: JSON.stringify({ status, reason: reason.trim() }) });
      saved(patch); setOpen(false); setReason("");
    } catch { setError("Unable to save status. Please try again."); }
    finally { setBusy(false); }
  }
  return <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50/50 p-4">
    <h3 className="font-semibold">Membership status</h3>
    <div className="mt-3 flex flex-wrap gap-2">
      <Button variant={statusOf(record) === "active" ? "default" : "outline"} disabled={busy || statusOf(record) === "active"} onClick={() => void save("active")}>Active</Button>
      <Button variant={statusOf(record) === "inactive" ? "default" : "outline"} disabled={busy} onClick={() => { setReason(record.inactive_reason || ""); setError(""); setOpen(true); }}>Inactive</Button>
    </div>
    {statusOf(record) === "inactive" && record.inactive_reason && <p className="mt-3 whitespace-pre-wrap break-words text-sm">Reason: {record.inactive_reason}</p>}
    {record.status_changed_at && <p className="mt-2 text-xs text-slate-500">Updated {new Date(record.status_changed_at).toLocaleString()}</p>}
    {error && !open && <p role="alert" className="mt-2 text-sm text-red-700">{error}</p>}
    <Dialog open={open} onOpenChange={(value) => { if (!busy) setOpen(value); }}>
      <DialogContent className="vr-modal">
        <DialogHeader className="vr-modal-header"><DialogTitle>Mark volunteer inactive</DialogTitle><DialogDescription>Enter why {String(record.details.name)} is inactive. This reason is visible to administrators.</DialogDescription></DialogHeader>
        <form onSubmit={(event) => { event.preventDefault(); if (reason.trim() && !busy) void save("inactive"); }} className="space-y-4">
          <label className="block text-sm font-medium">Reason (required)
            <textarea autoFocus required maxLength={500} value={reason} onChange={(event) => setReason(event.target.value)} placeholder="For example: resigned, dismissed, personal leave…" className="mt-2 min-h-28 w-full rounded-md border bg-white p-3" disabled={busy} />
          </label>
          <p className="text-xs text-slate-500">{reason.length}/500 characters</p>
          {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
          <DialogFooter><Button type="button" variant="outline" disabled={busy} onClick={() => setOpen(false)}>Cancel</Button><Button type="submit" disabled={busy || !reason.trim()}>{busy ? "Saving…" : "Save inactive status"}</Button></DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  </div>;
}

function VolunteerPhoto({ record, compact = false }: { record: VolunteerRecord; compact?: boolean }) {
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
      <Avatar className={compact ? "h-9 w-9 shrink-0 border border-white shadow-sm" : "h-20 w-20 rounded-2xl border-2 border-white shadow-sm ring-1 ring-emerald-200"}>
        {preview.data?.url && <AvatarImage key={preview.data.url} src={preview.data.url} alt={`${name}'s profile photo`} className="object-cover" />}
        <AvatarFallback className="bg-gradient-to-br from-blue-100 to-emerald-100 text-sm font-bold text-blue-800" aria-label={`${name}: photo unavailable`}>
          {initials || "V"}
        </AvatarFallback>
      </Avatar>
      {!compact && !photo && <span className="text-xs text-slate-500">No photo</span>}
      {!compact && photo && preview.isPending && <span className="text-xs text-slate-500">Loading photo…</span>}
      {!compact && preview.isError && <span className="text-xs text-slate-500">Photo unavailable</span>}
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


interface ProgressComment { id: number; body: string; author_id: string; created_at: string; }
function ProgressMonitor({ id }: { id: number }) {
  const [body, setBody] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const client = useQueryClient();
  const comments = useQuery({queryKey:["volunteer-comments",id],queryFn:()=>apiRequest<ProgressComment[]>(`/volunteers/${id}/comments`,{auth:true})});
  async function save() {
    setBusy(true); setError("");
    try {
      const entry = await apiRequest<ProgressComment>(`/volunteers/${id}/comments`, {auth:true,method:"POST",body:JSON.stringify({body:body.trim()})});
      client.setQueryData<ProgressComment[]>(["volunteer-comments",id], current => [entry,...(current || [])]); setBody("");
    } catch {setError("Unable to save comment. Please try again.");} finally {setBusy(false);}
  }
  return <section className="vr-progress">
    <header className="vr-progress-heading"><div><span className="vr-progress-kicker">VOLUNTEER DEVELOPMENT</span><h3>Progress journal</h3><p>Observations, achievements, and support that shape this volunteer’s journey.</p></div><span className="vr-private"><LockKeyhole size={12} aria-hidden="true"/> Admin only</span></header>
    <form onSubmit={e=>{e.preventDefault();if(body.trim()&&!busy)void save();}} className="vr-comment-composer">
      <label className="block"><span className="vr-composer-label"><MessageSquare size={16} aria-hidden="true"/> Add to the record</span><textarea required maxLength={3000} value={body} disabled={busy} onChange={e=>setBody(e.target.value)} placeholder="What went well? What needs support? Record an observation or a next step…"/></label>
      <div className="vr-composer-footer"><span>{body.length.toLocaleString()} / 3,000 characters</span><Button disabled={busy||!body.trim()}><Plus size={15} aria-hidden="true"/>{busy?"Saving…":"Save entry"}</Button></div>
      {error&&<p role="alert" className="text-sm text-red-700">{error}</p>}
    </form>
    <div className="vr-journal-title"><h4><Clock size={15} aria-hidden="true"/> Record history</h4><span>Newest first</span></div>
    {comments.isPending?<p role="status" className="vr-journal-empty">Loading the volunteer’s record…</p>:comments.isError?<div role="alert" className="vr-journal-empty">Unable to load history. <Button variant="outline" size="sm" onClick={()=>void comments.refetch()}>Retry</Button></div>:comments.data?.length ? <ol className="vr-timeline" aria-label="Volunteer progress entries">{comments.data.map((comment,index)=><li key={comment.id} className={index===0?"is-latest":""}>
      <span className="vr-timeline-dot" aria-hidden="true"><CheckCircle2 size={13}/></span>
      <article className="vr-journal-entry">
        <header><div className="vr-entry-date"><time dateTime={comment.created_at}>{new Date(comment.created_at).toLocaleDateString(undefined,{day:"numeric",month:"short",year:"numeric"})}</time><span>{new Date(comment.created_at).toLocaleTimeString(undefined,{hour:"2-digit",minute:"2-digit"})}</span></div>{index===0&&<span className="vr-latest-badge">Latest entry</span>}</header>
        <p className="vr-entry-body">{comment.body}</p>
        <footer><span className="vr-author-avatar" aria-hidden="true">AD</span><div><strong>Administrator</strong><span className="vr-author-id">Author ID: {comment.author_id}</span></div><span className="vr-entry-number">Entry #{comment.id}</span></footer>
      </article>
    </li>)}</ol>:<div className="vr-journal-empty"><MessageSquare size={26} aria-hidden="true"/><strong>A story waiting to be recorded</strong><p>Add the first observation to start this volunteer’s progress journal.</p></div>}
  </section>;
}
function CohortAssignment({record,saved}:{record:VolunteerRecord;saved:(patch:Partial<VolunteerRecord>)=>void}) {
  const cohorts=useVolunteerCohorts();
  const [cohort,setCohort]=useState(record.assigned_cohort || String(record.details.cohort||""));
  const [busy,setBusy]=useState(false);const [error,setError]=useState("");const [done,setDone]=useState(false);
  async function save(){setBusy(true);setError("");setDone(false);try{saved(await apiRequest<Partial<VolunteerRecord>>(`/volunteers/${record.id}/cohort`,{auth:true,method:"PATCH",body:JSON.stringify({cohort})}));setDone(true);}catch{setError("Unable to assign cohort. Try again.");}finally{setBusy(false);}}
  return <section className="space-y-3"><label className="block font-medium">Assigned cohort<select className="mt-2 block w-full rounded-lg border p-3" value={cohort} disabled={busy||cohorts.isPending||cohorts.isError} onChange={e=>{setCohort(e.target.value);setDone(false);}}><option value="">Select an existing cohort</option>{cohorts.data?.map(c=><option key={c.number} value={c.name}>{c.name}</option>)}</select>{cohorts.isError&&<button onClick={()=>void cohorts.refetch()}>Unable to load cohorts. Retry</button>}</label><p className="text-sm text-slate-500">Create new cohorts from the Cohorts tab. Admin assignment takes priority over the cohort entered on the application.</p><Button disabled={busy||!cohorts.data?.some(c=>c.name===cohort)} onClick={()=>void save()}>{busy?"Saving…":"Save cohort"}</Button>{done&&<p role="status">Cohort saved.</p>}{error&&<p role="alert">{error}</p>}</section>;
}
function CertificateList({value}:{value:unknown}) {
  try { const rows=JSON.parse(String(value||"[]")) as {kind:string;title:string;institution:string;year:string}[];return <ul className="space-y-2">{rows.map((row,i)=><li key={i} className="rounded border p-3">{row.kind}: {row.title} · {row.institution} · {row.year}</li>)}</ul>; } catch {return <p>Certificate details unavailable.</p>;}
}
function BranchAssignment({record,director,saved}:{record:VolunteerRecord;director:boolean;saved:(patch:Partial<VolunteerRecord>)=>void}) {
  const [branch,setBranch]=useState(record.director_branch || String(record.details.branch||""));
  const [busy,setBusy]=useState(false);const [error,setError]=useState("");const [done,setDone]=useState("");
  async function save(value:string|null){setBusy(true);setError("");setDone("");try{const patch=await apiRequest<Partial<VolunteerRecord>>(`/volunteers/${record.id}/${director?"director":"branch"}`,{auth:true,method:"PATCH",body:JSON.stringify({branch:value})});saved(patch);setDone(value===null?"Branch director role removed.":director?"Branch director assigned.":"Branch updated.");}catch{setError("Unable to save this assignment. Try again.");}finally{setBusy(false);}}
  return <section className="space-y-4"><h3 className="font-semibold">{director?"Branch director appointment":"Assign volunteer branch"}</h3><p className="text-sm text-slate-600">{director?"This volunteer will lead the selected branch, view its volunteer records, and manage all cohorts using their existing volunteer login.":"Choose the town where this volunteer serves. For a director, this also updates their area of access."}</p>
    {record.details.previousRegion&&<p className="rounded-lg bg-blue-50 p-3 text-sm">Previous region: {String(record.details.previousRegion)}. Confirm the correct town before assigning.</p>}
    <label className="block">Branch<select className="mt-2 block w-full rounded border p-3" value={branch} disabled={busy} onChange={e=>{setBranch(e.target.value);setDone("");}}><option value="">Select a branch</option>{volunteerBranches.map(b=><option key={b}>{b}</option>)}</select></label>
    <div className="flex flex-wrap gap-2"><Button disabled={busy||!volunteerBranches.includes(branch)} onClick={()=>void save(branch)}>{busy?"Saving…":director?"Save director appointment":"Save branch"}</Button>{director&&record.director_branch&&<Button variant="outline" disabled={busy} onClick={()=>void save(null)}>Remove director role</Button>}</div>
    {done&&<p role="status" className="text-sm text-emerald-700">{done}</p>}{error&&<p role="alert" className="text-red-700">{error}</p>}
  </section>;
}
function CreateCohort() {
  const [open,setOpen]=useState(false); const [busy,setBusy]=useState(false); const [error,setError]=useState(""); const [created,setCreated]=useState("");
  const client=useQueryClient();
  async function create(){setBusy(true);setError("");try{const row=await apiRequest<VolunteerCohort>("/cohorts",{auth:true,method:"POST"});await client.invalidateQueries({queryKey:["volunteer-cohorts"]});setCreated(row.name);setOpen(false);}catch{setError("Unable to confirm creation. Refresh the cohort list before retrying.");}finally{setBusy(false);}}
  return <><Button onClick={()=>{setError("");setOpen(true);}} className="gap-2 bg-blue-600 hover:bg-blue-700"><Plus size={16}/>Create cohort</Button>{created&&<p role="status" className="text-sm text-emerald-700">{created} created.</p>}
    <Dialog open={open} onOpenChange={value=>{if(!busy)setOpen(value);}}><DialogContent className="vr-modal"><DialogHeader className="vr-modal-header"><DialogTitle>Create a cohort</DialogTitle><DialogDescription>The system assigns the next available cohort number automatically. The new cohort will appear in registration forms and admin dropdowns, ready for volunteers to join.</DialogDescription></DialogHeader>{error&&<p role="alert" className="text-red-700">{error}</p>}<DialogFooter><Button variant="outline" disabled={busy} onClick={()=>setOpen(false)}>Cancel</Button><Button disabled={busy} onClick={()=>void create()}>{busy?"Creating…":"Create cohort"}</Button></DialogFooter></DialogContent></Dialog>
  </>;
}
const cohortOf=(record:VolunteerRecord)=>record.assigned_cohort || String(record.details.cohort||"");
export default function VolunteersManager({cohortsOnly=false}:{cohortsOnly?:boolean}) {
  const [search,setSearch]=useState("");const [status,setStatus]=useState("all");const [branch,setBranch]=useState("all");const [cohort,setCohort]=useState("all");
  const [selection,setSelection]=useState<{id:number;action:"view"|"status"|"comments"|"cohort"|"director"|"branch"}|null>(null);
  const client=useQueryClient();
  const records=useQuery({queryKey:["volunteer-records"],queryFn:()=>apiRequest<VolunteerRecord[]>("/volunteers",{auth:true}),refetchOnMount:"always"});
  const cohorts=useVolunteerCohorts();
  const [page,setPage]=useState(1);
  const all=records.data||[];
  const activeBranches = new Set(all.filter(record=>statusOf(record)==="active" && volunteerBranches.includes(String(record.details.branch))).map(record=>String(record.details.branch))).size;
  const summary = [
    {label:"Total volunteers",value:records.isPending||records.isError?"—":all.length,hint:"All registered volunteer records",icon:Users},
    {label:"Cohorts",value:cohorts.isPending||cohorts.isError?"—":cohorts.data?.length??0,hint:"Created training cohorts",icon:GraduationCap},
    {label:"Active branches",value:records.isPending||records.isError?"—":activeBranches,hint:"Towns with active volunteers",icon:MapPin},
  ];
  const cohortOptions = (cohorts.data||[]).map(c=>c.name);
  const filtered=all.filter(record=>(status==="all"||statusOf(record)===status)&&(branch==="all"||(branch==="unassigned"?!volunteerBranches.includes(String(record.details.branch)):record.details.branch===branch))&&(cohort==="all"||(cohort==="unassigned"?!cohortOf(record):cohortOf(record)===cohort))&&[record.volunteer_id,record.details.name,record.details.email,record.details.city,record.details.skills].join(" ").toLowerCase().includes(search.trim().toLowerCase()));
  const pages=Math.max(1,Math.ceil(filtered.length/15));
  const currentPage=Math.min(page,pages);
  const visible=filtered.slice((currentPage-1)*15,currentPage*15);
  const selected=all.find(record=>record.id===selection?.id);
  const patch=(update:Partial<VolunteerRecord>)=>client.setQueryData<VolunteerRecord[]>(["volunteer-records"],current=>current?.map(record=>record.id===selected?.id?{...record,...update}:record));
  return <section className="volunteer-register space-y-5">
    <div className="vr-summary" aria-label="Volunteer management totals">
      {summary.map(item=><div key={item.label} className="admin-mgr-stat"><div className="admin-mgr-stat-top"><span>{item.label}</span><item.icon size={18} aria-hidden="true"/></div><div className="admin-mgr-stat-value">{item.value}</div><p className="admin-mgr-stat-hint">{item.hint}</p></div>)}
    </div>
    <div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-xl font-bold text-blue-900">{cohortsOnly?"Cohort management":"Volunteer register"}</h2><p className="text-sm text-slate-500">{cohortsOnly?"Arrange volunteers into training cohorts and track their development.":"Profiles, deployment, membership, and progress in one place."}</p></div><div className="flex flex-wrap items-center gap-3">{cohortsOnly&&<CreateCohort/>}<Button asChild variant="outline"><Link to="/volunteer-information">Open public form</Link></Button></div></div>

    <div className="grid gap-3 rounded-xl border bg-slate-50 p-4 sm:grid-cols-2 xl:grid-cols-4">
      <label className="text-sm font-medium">Search<Input value={search} onChange={e=>{setSearch(e.target.value);setPage(1);}} placeholder="Name, ID, email, skills…"/></label>
      <label className="text-sm font-medium">Status<select className="block w-full rounded border bg-white p-2" value={status} onChange={e=>{setStatus(e.target.value);setPage(1);}}><option value="all">All statuses</option><option value="active">Active</option><option value="inactive">Inactive</option></select></label>
      <label className="text-sm font-medium">Branch<select className="block w-full rounded border bg-white p-2" value={branch} onChange={e=>{setBranch(e.target.value);setPage(1);}}><option value="all">All branches</option><option value="unassigned">Needs branch assignment</option>{volunteerBranches.map(b=><option key={b}>{b}</option>)}</select></label>
      <label className="text-sm font-medium">Cohort<select className="block w-full rounded border bg-white p-2" value={cohort} onChange={e=>{setCohort(e.target.value);setPage(1);}}><option value="all">All cohorts</option><option value="unassigned">Unassigned</option>{cohortOptions.map(c=><option key={c}>{c}</option>)}</select></label>
    </div>
    {cohorts.isError&&<p role="alert">Unable to load cohorts. <button onClick={()=>void cohorts.refetch()}>Retry</button></p>}
    <div className="flex items-center justify-between"><p className="text-sm text-slate-500">{filtered.length} of {all.length} volunteers</p><Button variant="outline" disabled={records.isFetching} onClick={()=>void records.refetch()}>Refresh</Button></div>
    {records.isPending?<p role="status">Loading volunteers…</p>:records.isError?<p role="alert">Unable to load volunteers. Refresh to try again.</p>:<>
      <div className="vr-table-scroll"><table className="vr-table"><caption className="sr-only">Volunteer records and administrative actions</caption><thead><tr>{["Matricule","Volunteer","Branch","Cohort","Status","Actions"].map(h=><th key={h} scope="col">{h}</th>)}</tr></thead><tbody>{visible.map(record=><tr key={record.id}>
        <td className="vr-id">{record.volunteer_id}</td>
        <td><div className="vr-person"><VolunteerPhoto record={record} compact/><div><strong>{String(record.details.name)}</strong>{record.director_branch&&<span className="vr-director-badge">Director · {record.director_branch}</span>}<span className="vr-secondary">{String(record.details.email)}</span><span className="vr-mobile-details"><span>{record.volunteer_id}</span><span>{String(record.details.branch||"No branch")} · {cohortOf(record)||"No cohort"}</span></span></div></div></td>
        <td>{String(record.details.branch||"—")}</td><td>{cohortOf(record)||"Unassigned"}</td>
        <td><span className={`vr-status ${statusOf(record)}`}><span aria-hidden="true"/>{statusOf(record)==="active"?"Active":"Inactive"}</span></td>
        <td><div className="vr-actions"><Button size="icon" variant="ghost" aria-label={`View ${record.details.name}`} title="View profile" onClick={()=>setSelection({id:record.id,action:"view"})}><Eye size={16}/></Button><DropdownMenu><DropdownMenuTrigger asChild><Button size="icon" variant="ghost" aria-label={`Actions for ${record.details.name}`}><MoreHorizontal size={18}/></Button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuItem onSelect={()=>setSelection({id:record.id,action:"view"})}><Eye className="mr-2 h-4 w-4"/>View profile</DropdownMenuItem><DropdownMenuItem onSelect={()=>setSelection({id:record.id,action:"status"})}><UserX className="mr-2 h-4 w-4"/>{statusOf(record)==="active"?"Mark inactive":"Change status"}</DropdownMenuItem><DropdownMenuItem onSelect={()=>setSelection({id:record.id,action:"comments"})}><MessageSquare className="mr-2 h-4 w-4"/>Write comment</DropdownMenuItem><DropdownMenuItem onSelect={()=>setSelection({id:record.id,action:"cohort"})}><Users className="mr-2 h-4 w-4"/>Assign cohort</DropdownMenuItem><DropdownMenuItem onSelect={()=>setSelection({id:record.id,action:"branch"})}><MapPin className="mr-2 h-4 w-4"/>Assign branch</DropdownMenuItem><DropdownMenuItem onSelect={()=>setSelection({id:record.id,action:"director"})}><Users className="mr-2 h-4 w-4"/>{record.director_branch?"Manage branch director":"Make branch director"}</DropdownMenuItem></DropdownMenuContent></DropdownMenu></div></td>
      </tr>)}</tbody></table>{filtered.length===0&&<p className="p-8 text-center text-slate-500">No volunteers match these filters.</p>}</div>
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500"><span>Showing {filtered.length?(currentPage-1)*15+1:0}–{Math.min(currentPage*15,filtered.length)} of {filtered.length}</span><nav aria-label="Volunteer table pages" className="flex items-center gap-3"><Button size="sm" variant="ghost" disabled={currentPage===1} onClick={()=>setPage(currentPage-1)}>Previous</Button><span>Page {currentPage} of {pages}</span><Button size="sm" variant="ghost" disabled={currentPage===pages} onClick={()=>setPage(currentPage+1)}>Next</Button></nav></div>
    </>}
    <Dialog open={Boolean(selected)} onOpenChange={open=>{if(!open)setSelection(null);}}><DialogContent className="vr-modal max-h-[90vh] max-w-3xl overflow-y-auto"><DialogHeader className="vr-modal-header"><DialogTitle>{String(selected?.details.name||"Volunteer")}</DialogTitle><DialogDescription>{selected?.volunteer_id} · {selection?.action==="comments"?"Private progress record":"Volunteer management"}</DialogDescription></DialogHeader>
      {selected&&selection?.action==="view"&&<><div className="flex items-center gap-4"><VolunteerPhoto record={selected}/><span>{String(selected.details.role||"")}</span></div><dl className="grid gap-4 sm:grid-cols-2">{volunteerFields.map(field=><div key={field.key}><dt className="text-xs text-slate-500">{field.label}</dt><dd className="whitespace-pre-wrap break-words">{String(selected.details[field.key]||"Not provided")}</dd></div>)}</dl><h3 className="font-semibold">Certificates & documents</h3><CertificateList value={selected.details.certificateEntries}/>{selected.attachments?.map(file=><AttachmentDownload key={file.id} recordId={selected.id} file={file}/>)}<PortalAccess record={selected} refresh={()=>void records.refetch()}/><ProgressMonitor id={selected.id}/></>}
      {selected&&selection?.action==="status"&&<MembershipStatus key={selected.id} record={selected} saved={patch} startInactive={statusOf(selected)==="active"}/>}
      {selected&&selection?.action==="comments"&&<ProgressMonitor key={selected.id} id={selected.id}/>}
      {selected&&selection?.action==="cohort"&&<CohortAssignment key={selected.id} record={selected} saved={patch}/>}
      {selected&&(selection?.action==="director"||selection?.action==="branch")&&<BranchAssignment key={`${selected.id}-${selection.action}`} record={selected} director={selection.action==="director"} saved={patch}/>}
    </DialogContent></Dialog>
  </section>;
}
