import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SEO from "@/components/SEO";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCreateAppointment } from "@/hooks/useAppointments";

const AppointmentSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email().or(z.literal("")),
  phone: z.string().min(8).optional(),
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
  const { elementRef: formRef, isVisible: formVisible } = useScrollAnimation();
  const { elementRef: sidebarRef, isVisible: sidebarVisible } =
    useScrollAnimation();
  const { toast } = useToast();
  const createAppointment = useCreateAppointment();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState<Appointment>({
    id: crypto.randomUUID(),
    fullName: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    location: "Optimum Health Global Center",
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

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = AppointmentSchema.safeParse(form);

    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);

      toast({
        title: "Please fix the highlighted fields",
        description: "Some fields are invalid.",
        variant: "destructive",
      });
      return;
    }

    try {
      setErrors({});
      // 🔗 call backend
      await createAppointment.mutateAsync({
        name: form.fullName,
        email: form.email,
        phone: form.phone,
        date: form.date,
        time: form.time,
        location: form.location,
        reason: form.reason,
      });

      // Keep local storage in sync for offline feel
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
        location: "Optimum Health Global Center",
        reason: "",
        createdAt: Date.now(),
      });
    } catch (err: any) {
      toast({
        title: "Submission failed",
        description: err.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
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
        <section
          ref={formRef}
          className={`rounded-lg border bg-card p-6 shadow-sm transition-all duration-700 ${
            formVisible
              ? "animate-fade-in animate-scale-in"
              : "opacity-0 translate-y-8 scale-95"
          }`}
        >
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
                className={errors.fullName ? "border-red-500" : ""}
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium">Email</label>
                <Input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={onChange}
                  required
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Phone</label>
                <Input
                  name="phone"
                  value={form.phone}
                  onChange={onChange}
                  required
                  className={errors.phone ? "border-red-500" : ""}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                )}
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
                  className={errors.date ? "border-red-500" : ""}
                />
                {errors.date && (
                  <p className="mt-1 text-sm text-red-500">{errors.date}</p>
                )}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Time</label>
                <Input
                  name="time"
                  type="time"
                  value={form.time}
                  onChange={onChange}
                  required
                  className={errors.time ? "border-red-500" : ""}
                />
                {errors.time && (
                  <p className="mt-1 text-sm text-red-500">{errors.time}</p>
                )}
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
                className={errors.location ? "border-red-500" : ""}
              />
              {errors.location && (
                <p className="mt-1 text-sm text-red-500">{errors.location}</p>
              )}
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Reason</label>
              <Textarea
                name="reason"
                value={form.reason}
                onChange={onChange}
                rows={4}
                required
                className={errors.reason ? "border-red-500" : ""}
              />
              {errors.reason && (
                <p className="mt-1 text-sm text-red-500">{errors.reason}</p>
              )}
            </div>

            <Button
              type="submit"
              variant="hero"
              className="mt-2"
              disabled={createAppointment.isPending}
            >
              {createAppointment.isPending
                ? "Scheduling..."
                : "Shedule Appointment"}
            </Button>
          </form>
        </section>

        <aside
          ref={sidebarRef}
          className={`space-y-4 transition-all duration-700 ${
            sidebarVisible ? "animate-fade-in" : "opacity-0 translate-y-8"
          }`}
        >
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
                      <div className="text-muted-foreground">{a.reason}</div>
                    </div>
                    {/* <Button variant="outline" onClick={() => remove(a.id)}>
                      Cancel
                    </Button> */}
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
