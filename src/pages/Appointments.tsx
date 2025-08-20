import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SEO from "@/components/SEO";

const AppointmentSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().min(6),
  date: z.string().min(1),
  time: z.string().min(1),
  location: z.string().min(2),
  reason: z.string().min(5),
});

type Appointment = z.infer<typeof AppointmentSchema> & {
  id: string;
  createdAt: number;
};

const storageKey = "opheg_appointments";

const Appointments = () => {
  const { toast } = useToast();
  const [form, setForm] = useState<Appointment>({
    id: crypto.randomUUID(),
    fullName: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    location: "Kumba",
    reason: "",
    createdAt: Date.now(),
  });

  const [items, setItems] = useState<Appointment[]>(() => {
    const raw = localStorage.getItem(storageKey);
    return raw ? (JSON.parse(raw) as Appointment[]) : [];
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(items));
  }, [items]);

  const upcoming = useMemo(
    () => items.sort((a, b) => a.date.localeCompare(b.date)),
    [items]
  );

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = AppointmentSchema.safeParse(form);
    if (!parsed.success) {
      toast({
        title: "Please fix the highlighted fields",
        description: parsed.error.issues.map((i) => i.path.join(".")) + "",
      });
      return;
    }
    setItems((prev) => [form, ...prev]);
    toast({
      title: "Appointment scheduled",
      description: `${form.fullName} · ${form.date} ${form.time}`,
    });
    setForm({
      id: crypto.randomUUID(),
      fullName: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      location: "Kumba",
      reason: "",
      createdAt: Date.now(),
    });
  };

  const remove = (id: string) =>
    setItems((prev) => prev.filter((i) => i.id !== id));

  return (
    <>
      <SEO
        title="Book an Appointment – OPHEG"
        description="Schedule a community health appointment with Optimum Health Global (OPHEG)."
        canonical="/appointments"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ScheduleAction",
          agent: { "@type": "NGO", name: "Optimum Health Global (OPHEG)" },
          name: "Book an appointment",
        }}
      />

      <div className="container grid gap-10 py-12 md:grid-cols-2">
        <section className="rounded-lg border bg-card p-6 shadow-sm">
          <h1 className="display-title mb-1 text-3xl">Book an Appointment</h1>
          <p className="mb-6 text-sm text-muted-foreground">
            We’ll confirm via phone or email.
          </p>
          <form onSubmit={submit} className="grid gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium">
                Full name
              </label>
              <Input
                name="fullName"
                value={form.fullName}
                onChange={onChange}
                required
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium">Email</label>
                <Input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={onChange}
                  placeholder="optional"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Phone</label>
                <Input
                  name="phone"
                  value={form.phone}
                  onChange={onChange}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium">Date</label>
                <Input
                  name="date"
                  type="date"
                  value={form.date}
                  onChange={onChange}
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Time</label>
                <Input
                  name="time"
                  type="time"
                  value={form.time}
                  onChange={onChange}
                  required
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Location</label>
              <Input
                name="location"
                value={form.location}
                onChange={onChange}
                placeholder="e.g., Kumba Health Center"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Reason</label>
              <Textarea
                name="reason"
                value={form.reason}
                onChange={onChange}
                rows={4}
                required
              />
            </div>
            <Button type="submit" variant="hero" className="mt-2">
              Schedule
            </Button>
          </form>
        </section>

        <aside className="space-y-4">
          <div className="rounded-lg border bg-secondary/30 p-6">
            <h2 className="display-title text-xl">What to expect</h2>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
              <li>Community-focused, stigma-free care aligned with SDG3.</li>
              <li>Outreach and counseling tailored to your needs.</li>
              <li>Optional follow-up programs and referrals.</li>
            </ul>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <h2 className="display-title text-xl">Your Appointments</h2>
            {upcoming.length === 0 ? (
              <p className="mt-2 text-sm text-muted-foreground">
                No appointments yet.
              </p>
            ) : (
              <ul className="mt-4 space-y-3 text-sm">
                {upcoming.map((a) => (
                  <li
                    key={a.id}
                    className="flex items-center justify-between rounded-md border p-3"
                  >
                    <div>
                      <div className="font-medium">{a.fullName}</div>
                      <div className="text-muted-foreground">
                        {a.date} · {a.time} · {a.location}
                      </div>
                    </div>
                    <Button variant="outline" onClick={() => remove(a.id)}>
                      Cancel
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>
      </div>
    </>
  );
};

export default Appointments;
