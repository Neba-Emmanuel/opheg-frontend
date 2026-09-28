import { useEffect, useRef, useState } from "react";
import { Mail, Send, Sparkles, ArrowUpRight, CheckCircle2, Monitor, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { apiRequest } from "@/lib/apiClient";
import { SITE_URL } from "@/config/site";
import { useSendNewsletter, type EmailDraft, type EmailSendResult } from "@/hooks/useNewsletter";
import "./email-composer.css";

const templates = [
  { id: "newsletter", name: "Community letter", description: "Stories, progress & news", tag: "KEEP THEM CONNECTED", title: "Small actions. Healthier communities.", body: "Hello, OPHEG community,\n\nThank you for being part of our mission to bring better health closer to the people who need it.\n\nShare your latest community story, program update, or milestone here. Tell your readers what happened, why it matters, and how they can take part.", highlight: "Add a community highlight or an upcoming opportunity here.", buttonLabel: "Explore our work", path: "/our-works" },
  { id: "invitation", name: "Event invitation", description: "Bring your community together", tag: "MAKE IT A MOMENT", title: "Let’s make a difference, together.", body: "Hello,\n\nWe would love to have you join our next OPHEG activity.\n\nIntroduce your event here: who it is for, what participants can expect, and how their participation will help the community.", highlight: "Date: add your date\nTime: add your time and timezone\nLocation: add your venue or online link", buttonLabel: "Get involved", path: "/get-involved" },
  { id: "personal", name: "Personal message", description: "Thoughtful, direct communication", tag: "START A CONVERSATION", title: "A note from the OPHEG team.", body: "Hello,\n\nThank you for connecting with Optimum Health Global.\n\nWrite your personal message here. Share an introduction, follow up on a conversation, or explore how we can work together to support healthier communities.\n\nWe look forward to hearing from you.", highlight: "", buttonLabel: "", path: "" },
] as const;
function makeDraft(id: EmailDraft["template"]): EmailDraft {
  const template = templates.find(item => item.id === id)!;
  return { template: id, subject: "", preheader: "Better health starts with a connected community.", title: template.title, body: template.body, highlight: template.highlight, buttonLabel: template.buttonLabel, buttonUrl: template.path ? `${SITE_URL}${template.path}` : "", signature: "The OPHEG team" };
}

export default function EmailComposer({ activeCount, subscribersUnavailable }: { activeCount: number; subscribersUnavailable: boolean }) {
  const [draft, setDraft] = useState<EmailDraft>(() => makeDraft("newsletter"));
  const [toAll, setToAll] = useState(true);
  const [recipients, setRecipients] = useState("");
  const [mobile, setMobile] = useState(false);
  const [preview, setPreview] = useState<{ key: string; html: string } | null>(null);
  const [previewError, setPreviewError] = useState("");
  const [sendError, setSendError] = useState("");
  const [result, setResult] = useState<EmailSendResult | null>(null);
  const sendingRef = useRef(false);
  const send = useSendNewsletter();
  const emails = [...new Set(recipients.split(/[\s,;]+/).map(email => email.trim().toLowerCase()).filter(Boolean))];
  const invalidEmails = emails.filter(email => email.length > 254 || !/^[^\s@<>,;]+@[^\s@<>,;]+\.[^\s@<>,;]+$/.test(email));
  let validUrl = !draft.buttonUrl.trim();
  try { const url = new URL(draft.buttonUrl); validUrl = ["http:", "https:"].includes(url.protocol) && !url.username && !url.password; } catch { /* Empty URL is allowed when there is no button. */ }
  const validDraft = Boolean(draft.subject.trim() && draft.title.trim() && draft.body.trim() && validUrl && Boolean(draft.buttonUrl.trim()) === Boolean(draft.buttonLabel.trim()));
  // Preview sample subject while composing. The final send still requires a subject.
  const previewKey = JSON.stringify({ ...draft, subject: draft.subject.trim() || "Your OPHEG message", toAll });
  useEffect(() => {
    const controller = new AbortController();
    setPreviewError("");
    const timer = window.setTimeout(() => {
      void apiRequest<{ html: string }>("/newsletter/preview", { method: "POST", auth: true, signal: controller.signal, body: previewKey })
        .then(value => { if (!controller.signal.aborted) setPreview({ key: previewKey, html: value.html }); })
        .catch(error => { if (!controller.signal.aborted) setPreviewError(error instanceof Error ? error.message : "Preview unavailable."); });
    }, 400);
    return () => { window.clearTimeout(timer); controller.abort(); };
  }, [previewKey]);
  const recipientCount = toAll ? activeCount : emails.length;
  const canSend = validDraft && recipientCount > 0 && (toAll ? !subscribersUnavailable : !invalidEmails.length && emails.length <= 200) && preview?.key === previewKey && !previewError && !send.isPending && !result;
  function edit(key: keyof EmailDraft, value: string) { setDraft(previous => ({ ...previous, [key]: value })); setResult(null); setSendError(""); }
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSend || sendingRef.current) return;
    sendingRef.current = true; setSendError("");
    try { setResult(await send.mutateAsync({ ...draft, toAll, emails: toAll ? [] : emails })); }
    catch (error) { setSendError(error instanceof Error ? error.message : "Unable to send. Your draft has been kept."); }
    finally { sendingRef.current = false; }
  }
  return <section className="email-studio">
    <div className="email-studio-heading"><div><p><Sparkles size={14} /> THE OPHEG EMAIL STUDIO</p><h3>Good stories deserve<br />a beautiful delivery.</h3><span>Choose a design. Make it yours. Connect with your community.</span></div><span className="email-brand-stamp"><Mail size={24} /><small>BUILT FOR<br /><strong>CONNECTION</strong></small></span></div>
    <div className="email-template-grid" role="group" aria-label="Email template">{templates.map(template => <button key={template.id} type="button" className={`email-template ${draft.template === template.id ? "is-selected" : ""}`} aria-pressed={draft.template === template.id} disabled={send.isPending} onClick={() => { setDraft(previous => {
      const oldDefaults = makeDraft(previous.template);
      const nextDefaults = makeDraft(template.id);
      return { ...previous, template: template.id,
        title: previous.title === oldDefaults.title ? nextDefaults.title : previous.title,
        body: previous.body === oldDefaults.body ? nextDefaults.body : previous.body,
        highlight: previous.highlight === oldDefaults.highlight ? nextDefaults.highlight : previous.highlight,
        buttonLabel: previous.buttonLabel === oldDefaults.buttonLabel ? nextDefaults.buttonLabel : previous.buttonLabel,
        buttonUrl: previous.buttonUrl === oldDefaults.buttonUrl ? nextDefaults.buttonUrl : previous.buttonUrl,
      };
    }); setResult(null); }}><span className={`email-template-art is-${template.id}`}><i /><b /><em /><em /><span /></span><span className="email-template-caption"><strong>{template.name}</strong>{draft.template === template.id && <CheckCircle2 size={16} />}</span><small>{template.description}</small></button>)}</div>
    <div className="email-studio-grid">
      <form onSubmit={submit} className="email-editor">
        <fieldset disabled={send.isPending} className="space-y-6">
          <div className="email-editor-section"><h4><span>01</span>Choose your audience</h4><div className="email-audience"><label><input type="radio" name="audience" checked={toAll} onChange={() => { setToAll(true); setResult(null); }} /><span><strong>Newsletter subscribers</strong><small>{subscribersUnavailable ? "Subscriber count unavailable" : `${activeCount} active subscribers`}</small></span></label><label><input type="radio" name="audience" checked={!toAll} onChange={() => { setToAll(false); setResult(null); }} /><span><strong>Custom recipients</strong><small>Send to any email address</small></span></label></div>
          {!toAll && <div className="email-field"><label htmlFor="email-recipients">Recipient email addresses *</label><Textarea id="email-recipients" rows={3} value={recipients} required placeholder="name@example.org, another@example.org" onChange={event => { setRecipients(event.target.value); setResult(null); }} aria-invalid={invalidEmails.length > 0 || emails.length > 200} aria-describedby="recipient-help" /><p id="recipient-help">Separate addresses with commas, spaces, or new lines. Up to 200 recipients. This does not subscribe them to the newsletter.</p>{invalidEmails.length > 0 && <p role="alert" className="email-error">Invalid: {invalidEmails.join(", ")}</p>}{emails.length > 200 && <p role="alert" className="email-error">Limit your message to 200 recipients.</p>}</div>}
          </div>
          <div className="email-editor-section"><h4><span>02</span>Tell your story</h4>
            <div className="email-field"><label htmlFor="email-subject">Email subject *</label><Input id="email-subject" value={draft.subject} required maxLength={160} placeholder="A little news. A lasting impact." onChange={event => edit("subject", event.target.value)} /></div>
            <div className="email-field"><label htmlFor="email-preheader">Inbox preview text</label><Input id="email-preheader" value={draft.preheader} maxLength={200} onChange={event => edit("preheader", event.target.value)} /><p>A short introduction shown beside the subject in the inbox.</p></div>
            <div className="email-field"><label htmlFor="email-title">Main heading *</label><Input id="email-title" value={draft.title} required maxLength={180} onChange={event => edit("title", event.target.value)} /></div>
            <div className="email-field"><label htmlFor="email-body">Message *</label><Textarea id="email-body" value={draft.body} required rows={10} maxLength={20000} onChange={event => edit("body", event.target.value)} /><p>Write in plain text. Blank lines create paragraphs; the template handles styling.</p></div>
            <div className="email-field"><label htmlFor="email-highlight">{draft.template === "invitation" ? "Event details" : "Highlight box"} <small>Optional</small></label><Textarea id="email-highlight" value={draft.highlight} rows={3} maxLength={1000} onChange={event => edit("highlight", event.target.value)} /></div>
          </div>
          <div className="email-editor-section"><h4><span>03</span>Give them a next step</h4><div className="email-field"><label htmlFor="email-button">Button label</label><Input id="email-button" value={draft.buttonLabel} maxLength={60} required={Boolean(draft.buttonUrl)} onChange={event => edit("buttonLabel", event.target.value)} /></div><div className="email-field"><label htmlFor="email-link">Button destination</label><Input id="email-link" type="url" value={draft.buttonUrl} maxLength={2000} required={Boolean(draft.buttonLabel)} placeholder="https://opheg.com/…" onChange={event => edit("buttonUrl", event.target.value)} /><p>Leave both button fields empty to send without a button.</p>{(!validUrl || Boolean(draft.buttonUrl.trim()) !== Boolean(draft.buttonLabel.trim())) && <p className="email-error">Enter both a label and a valid http(s) URL, or clear both.</p>}</div><div className="email-field"><label htmlFor="email-signature">Sign-off</label><Input id="email-signature" value={draft.signature} maxLength={200} onChange={event => edit("signature", event.target.value)} /></div></div>
        </fieldset>
        {sendError && <p role="alert" className="email-error">{sendError} Your draft is still here. If the request timed out, check delivery before retrying.</p>}
        {result && <div role="status" className="email-send-result"><strong>{result.sent} of {result.total} accepted by the mail server.</strong><p>{result.total === 0 ? "No recipients were available; no email was sent." : result.failed ? `${result.failed} could not be confirmed as accepted. Check delivery before retrying.` : "Your message has been submitted for delivery."}</p>{result.failedEmails.length > 0 && <details><summary>Unconfirmed recipients</summary><p>{result.failedEmails.join(", ")}</p></details>}</div>}
        <div className="email-send-bar"><p><strong>{recipientCount} {toAll ? "subscribers" : "recipients"}</strong><br />Email addresses stay private.</p><Button type="submit" disabled={!canSend}><Send size={15} className="mr-2" />{send.isPending ? "Sending…" : result ? "Send complete" : "Send email"}</Button></div>
      </form>
      <aside className="email-preview"><div className="email-preview-heading"><span><span className="email-live-dot" /> EMAIL PREVIEW</span><div><button type="button" aria-label="Desktop preview" aria-pressed={!mobile} onClick={() => setMobile(false)}><Monitor size={16} /></button><button type="button" aria-label="Mobile preview" aria-pressed={mobile} onClick={() => setMobile(true)}><Smartphone size={16} /></button></div></div><div className="email-inbox"><span>From <strong>Optimum Health Global</strong></span><strong>{draft.subject || "Your subject goes here"}</strong><small>{draft.preheader}</small></div>{previewError ? <p role="alert" className="email-error p-5">{previewError}</p> : preview?.key !== previewKey ? <p role="status" className="p-5 text-sm text-slate-500">Updating your preview…</p> : null}<div className="email-preview-canvas"><iframe title="OPHEG email preview" sandbox="" referrerPolicy="no-referrer" srcDoc={preview?.html ?? ""} className={mobile ? "is-mobile" : ""} /></div><p className="email-preview-note"><ArrowUpRight size={13} /> Layout may vary slightly between email apps.</p></aside>
    </div>
  </section>;
}
