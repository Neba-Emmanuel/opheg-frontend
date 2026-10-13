import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { CertificateEntry } from "@/lib/certificates";

export default function VolunteerCertificates({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  let rows: CertificateEntry[] = [];
  try { const parsed = JSON.parse(value || "[]"); if (Array.isArray(parsed)) rows = parsed; } catch { /* Legacy empty value. */ }
  const update = (index: number, patch: Partial<CertificateEntry>) => onChange(JSON.stringify(rows.map((row, i) => i === index ? {...row, ...patch} : row)));
  return <section className="my-6 space-y-4 rounded-xl border border-blue-100 bg-white p-5">
    <h3 className="text-lg font-semibold text-blue-900">Work & educational certificates</h3>
    <p className="text-sm text-slate-600">Add each certificate separately. Upload supporting PDFs in the documents section.</p>
    {rows.map((row, index) => <fieldset key={index} className="grid gap-3 rounded-lg border p-4 sm:grid-cols-2">
      <legend className="px-2 font-medium">Certificate {index+1}</legend>
      <label>Type<select className="block w-full rounded border p-2" value={row.kind} onChange={e => update(index, {kind: e.target.value})}><option>Education</option><option>Work</option></select></label>
      <label>Certificate / qualification<Input required maxLength={200} value={row.title} onChange={e => update(index, {title:e.target.value})}/></label>
      <label>Institution / employer<Input required maxLength={200} value={row.institution} onChange={e => update(index, {institution:e.target.value})}/></label>
      <label>Year completed<Input required inputMode="numeric" maxLength={4} value={row.year} onChange={e => update(index, {year:e.target.value})}/></label>
      <Button type="button" variant="outline" onClick={() => onChange(JSON.stringify(rows.filter((_, i) => i !== index)))}>Remove certificate {index+1}</Button>
    </fieldset>)}
    <Button type="button" variant="outline" disabled={rows.length >= 50} onClick={() => onChange(JSON.stringify([...rows, {kind:"Education",title:"",institution:"",year:""}]))}>+ Add another certificate</Button>
    <p className="text-xs text-slate-500">{rows.length} of 50 certificate entries</p>
  </section>;
}
