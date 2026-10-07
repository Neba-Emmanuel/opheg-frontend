import { useRef, useState } from "react";
import { Camera, Check, FileText, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { volunteerFields, volunteerDepartments } from "@/lib/volunteerFields";
import { validateVolunteerValues } from "@/lib/volunteerValidation";
import { encodePortalPhoto, emptyCommunityProfile, portalRequest, socialLabels, type PortalMe } from "@/lib/volunteerPortal";

const groups = [...new Set(volunteerFields.map(field => field.group))];
export default function VolunteerProfileEditor({ me, onSaved }: { me: PortalMe; onSaved: (me: PortalMe) => void }) {
  const [details, setDetails] = useState(me.details);
  const [profile, setProfile] = useState({ ...emptyCommunityProfile, ...me.profile });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [touched, setTouched] = useState<Record<string,boolean>>({});
  const photoInput = useRef<HTMLInputElement>(null);
  const errors = validateVolunteerValues({ ...details, email: me.email, consent: true });
  const normalizedHandle = profile.handle.replace(/^@/, "").toLowerCase();
  if ((profile.visible && !normalizedHandle) || (normalizedHandle && !/^[a-z][a-z0-9_]{2,29}$/.test(normalizedHandle))) errors.handle = "Use 3–30 letters, numbers, or underscores, starting with a letter.";
  for (const key of Object.keys(socialLabels) as (keyof typeof socialLabels)[]) {
    if (profile[key]) { try { const url = new URL(profile[key]); if (url.protocol !== "https:" || url.username || url.password) throw new Error(); } catch { errors[key] = "Use a full https:// link."; } }
  }
  async function save(event: React.FormEvent) {
    event.preventDefault(); if (busy || Object.keys(errors).length) return;
    setBusy(true); setError(""); setSaved(false);
    try { const result = await portalRequest<PortalMe>("me", { method: "PATCH", body: JSON.stringify({ details, profile }) }); setDetails(result.details); setProfile({ ...emptyCommunityProfile, ...result.profile }); onSaved(result); setSaved(true); }
    catch (err) { setError(err instanceof Error ? err.message : "Unable to save your profile."); }
    finally { setBusy(false); }
  }
  async function upload(file?: File) {
    if (!file || busy) return;
    setBusy(true); setError(""); setSaved(false);
    try { const attachment = await encodePortalPhoto(file); const result = await portalRequest<PortalMe>("me/photo", { method: "PUT", body: JSON.stringify({ attachments: [attachment] }) }); onSaved(result); }
    catch (err) { setError(err instanceof Error ? err.message : "Unable to upload your photo."); }
    finally { setBusy(false); if (photoInput.current) photoInput.current.value = ""; }
  }
  async function download(id: string) {
    setError("");
    try { const result = await portalRequest<{url:string}>(`me/files/${id}`); const link=document.createElement("a"); link.href=result.url; link.target="_blank"; link.rel="noopener noreferrer"; link.click(); }
    catch { setError("Unable to download this attachment. Please try again."); }
  }
  return <form className="vp-editor" onSubmit={save}>
    <div className="vp-page-title"><div><p className="vp-eyebrow">MAKE IT YOURS</p><h1>Your profile. Your story.</h1><p>Keep your details current and choose what your community can see.</p></div><span className="vp-id">{me.volunteerId}</span></div>
    <section className="vp-panel vp-photo-panel"><div className="vp-avatar large">{me.photoUrl ? <img src={me.photoUrl} alt="Your profile"/> : String(details.name || "V").slice(0,1)}</div><div><h2>A familiar face.</h2><p>JPG or PNG, up to 1 MB. Your documents stay private.</p><label className="vp-photo-label"><Camera size={15}/> Change photo<input ref={photoInput} type="file" accept="image/jpeg,image/png" disabled={busy} onChange={e => void upload(e.target.files?.[0])}/></label></div></section>
    <fieldset disabled={busy} className="vp-editor-fields">
      <section className="vp-panel"><div className="vp-section-title"><span>01</span><div><h2>Your community profile</h2><p>These details can be shared with signed-in volunteers.</p></div></div>
        <div className="vp-form-grid"><label>Community handle<Input value={profile.handle} maxLength={30} placeholder="e.g. amina_health" onChange={e => {setProfile({...profile,handle:e.target.value});setSaved(false);}} aria-invalid={Boolean(errors.handle)}/><small>{errors.handle || "Your unique @handle. No spaces."}</small></label><label>About you<Textarea value={profile.bio} maxLength={600} rows={3} placeholder="What inspires you to volunteer?" onChange={e => {setProfile({...profile,bio:e.target.value});setSaved(false);}}/><small>{profile.bio.length}/600 characters</small></label>
          {Object.entries(socialLabels).map(([key,label]) => <label key={key}>{label}<Input type="url" maxLength={300} value={profile[key as keyof typeof socialLabels]} placeholder="https://…" onChange={e => {setProfile({...profile,[key]:e.target.value});setSaved(false);}} aria-invalid={Boolean(errors[key])}/>{errors[key] && <small className="vp-error">{errors[key]}</small>}</label>)}
        </div><div className="vp-sharing"><ShieldCheck size={23}/><div><h3>You choose what to share.</h3><label><input type="checkbox" checked={profile.visible} onChange={e => {setProfile({...profile,visible:e.target.checked});setSaved(false);}}/> Show my profile and social links in the volunteer directory.</label><label><input type="checkbox" checked={profile.sharePhoto} onChange={e => {setProfile({...profile,sharePhoto:e.target.checked});setSaved(false);}}/> Include my photo when my profile is visible.</label><p>Email, phone, birth date, gender, emergency contacts, and documents are never shown to other volunteers.</p></div></div>
      </section>
      {groups.map((group,index) => <section className="vp-panel" key={group}><div className="vp-section-title"><span>{String(index+2).padStart(2,"0")}</span><div><h2>{group}</h2><p>{group.includes("Emergency") ? "Optional: complete all three contact fields or leave them all blank." : "Your details help the OPHEG team support your work."}</p></div></div><div className="vp-form-grid">{volunteerFields.filter(field=>field.group===group).map(field=><label key={field.key} className={field.max>300 ? "wide" : ""}>{field.label}{field.required && " *"}
        {field.key==="gender" || field.key==="department" ? <select value={String(details[field.key] || "")} required onChange={e=>{setDetails({...details,[field.key]:e.target.value});setSaved(false);}}><option value="">Select…</option>{field.key==="gender" ? ["Male","Female"].map(g=><option key={g}>{g}</option>) : volunteerDepartments.map(d=><option key={d.code} value={d.code}>{d.label}</option>)}</select> : field.max>300 ? <Textarea rows={3} maxLength={field.max} required={field.required} value={String(details[field.key]||"")} onChange={e=>{setDetails({...details,[field.key]:e.target.value});setSaved(false);}} onBlur={()=>setTouched({...touched,[field.key]:true})} aria-invalid={Boolean(touched[field.key]&&errors[field.key])}/> : <Input value={field.key==="email" ? me.email : String(details[field.key]||"")} readOnly={field.key==="email"} type={field.key==="email" ? "email" : field.key==="dateOfBirth" ? "date" : field.key==="portfolio" ? "url" : field.key.toLowerCase().includes("phone") ? "tel" : "text"} maxLength={field.max} required={field.required} onChange={e=>{setDetails({...details,[field.key]:e.target.value});setSaved(false);}} onBlur={()=>setTouched({...touched,[field.key]:true})} aria-invalid={Boolean(touched[field.key]&&errors[field.key])}/>}
        {field.key==="email" && <small>Contact your coordinator to change your sign-in email.</small>}{touched[field.key]&&errors[field.key]&&<small className="vp-error">{errors[field.key]}</small>}
      </label>)}</div></section>)}
    </fieldset>
    {me.attachments.length>0&&<section className="vp-panel"><h2>Your private attachments</h2><div className="vp-file-list">{me.attachments.map(file=><Button key={file.id} type="button" variant="outline" onClick={()=>void download(file.id)}><FileText size={15}/>{file.name}</Button>)}</div></section>}
    <div className="vp-save-bar"><div>{error&&<p className="vp-error" role="alert">{error}</p>}{saved ? <p role="status" className="vp-saved"><Check size={16}/> Your changes are saved.</p> : <p>{Object.keys(errors).length ? `Complete or correct ${Object.keys(errors).length} field(s) before saving.` : "Ready to save your changes."}</p>}</div><Button type="submit" disabled={busy||Object.keys(errors).length>0}>{busy ? "Saving…" : "Save my profile"}</Button></div>
  </form>;
}
