// Appointments.jsx - Complete Redesign
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SEO from "@/components/SEO";
import { useCreateAppointment } from "@/hooks/useAppointments";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Mail,
  Phone,
  FileText,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Heart,
  Stethoscope,
  Shield,
  Star,
  ChevronRight,
  X,
  AlertCircle,
  CalendarCheck,
  ClipboardList,
} from "lucide-react";
import { Link } from "react-router-dom";

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
  const { toast } = useToast();
  const createAppointment = useCreateAppointment();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
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
    () => items.sort((a, b) => b.createdAt - a.createdAt),
    [items]
  );

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
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
        description: "Some fields are invalid or missing.",
        variant: "destructive",
      });
      return;
    }

    try {
      setErrors({});
      await createAppointment.mutateAsync({
        name: form.fullName,
        email: form.email,
        phone: form.phone,
        date: form.date,
        time: form.time,
        location: form.location,
        reason: form.reason,
      });

      setItems((prev) => [form, ...prev]);
      setSubmitted(true);

      toast({
        title: "Appointment Scheduled Successfully! 🎉",
        description: `${form.fullName} · ${form.date} at ${form.time}`,
      });

      setTimeout(() => {
        setSubmitted(false);
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
      }, 2000);
    } catch (err: any) {
      toast({
        title: "Submission Failed",
        description: err.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  const remove = (id: string) =>
    setItems((prev) => prev.filter((i) => i.id !== id));

  const benefits = [
    {
      icon: Heart,
      title: "Community-Focused Care",
      description: "Stigma-free healthcare aligned with SDG3 goals",
      gradient: "from-rose-500 to-pink-500",
    },
    {
      icon: Stethoscope,
      title: "Expert Consultation",
      description: "Qualified healthcare professionals at your service",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Shield,
      title: "Follow-up Support",
      description: "Optional programs and referrals for continued care",
      gradient: "from-emerald-500 to-teal-500",
    },
  ];

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

      <div className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white">
        {/* Hero Header */}
        <section className="relative py-16 bg-gradient-to-br from-blue-600 via-cyan-500 to-emerald-500 overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-sm animate-fade-in">
                <CalendarCheck className="w-4 h-4" />
                <span>Quick & Easy Scheduling</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white animate-fade-in">
                Book an{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                  Appointment
                </span>
              </h1>
              
              <p className="text-xl text-white/80 max-w-2xl mx-auto animate-fade-in delay-200">
                Schedule your consultation with our healthcare team. We'll confirm 
                your appointment via phone or email within 24 hours.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Form Section - Main Focus */}
            <div className="lg:col-span-2">
              <div className="relative">
                {/* Form Card */}
                <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 animate-fade-in">
                  {/* Form Header */}
                  <div className="p-8 bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                    <div className="flex items-center gap-3 mb-2">
                      <ClipboardList className="w-8 h-8" />
                      <h2 className="text-3xl font-black">Schedule Your Visit</h2>
                    </div>
                    <p className="text-white/80">Fill in the details below and we'll get back to you</p>
                  </div>

                  {/* Form Body */}
                  <div className="p-8">
                    {submitted ? (
                      <div className="text-center py-12 space-y-6">
                        <div className="relative">
                          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-teal-400 flex items-center justify-center mx-auto animate-bounce-subtle">
                            <CheckCircle className="w-12 h-12 text-white" />
                          </div>
                          <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center animate-pulse">
                            <Star className="w-5 h-5 text-white fill-white" />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-3xl font-black text-slate-900 mb-2">Appointment Booked!</h3>
                          <p className="text-slate-600 text-lg">
                            We'll confirm your appointment within 24 hours.
                          </p>
                        </div>
                        <Button
                          onClick={() => setSubmitted(false)}
                          className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-6 text-lg rounded-2xl shadow-xl shadow-blue-500/25 hover:shadow-blue-500/50 transition-all duration-300"
                        >
                          Book Another Appointment
                          <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                      </div>
                    ) : (
                      <form onSubmit={submit} className="space-y-6">
                        {/* Full Name */}
                        <div>
                          <label className="flex items-center gap-2 text-slate-700 font-semibold mb-2">
                            <User className="w-4 h-4 text-blue-500" />
                            Full Name *
                          </label>
                          <Input
                            name="fullName"
                            value={form.fullName}
                            onChange={onChange}
                            placeholder="Enter your full name"
                            required
                            className={`rounded-xl h-12 ${errors.fullName ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
                          />
                          {errors.fullName && (
                            <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" /> {errors.fullName}
                            </p>
                          )}
                        </div>

                        {/* Email & Phone */}
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="flex items-center gap-2 text-slate-700 font-semibold mb-2">
                              <Mail className="w-4 h-4 text-blue-500" />
                              Email *
                            </label>
                            <Input
                              name="email"
                              type="email"
                              value={form.email}
                              onChange={onChange}
                              placeholder="your@email.com"
                              required
                              className={`rounded-xl h-12 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
                            />
                            {errors.email && (
                              <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" /> {errors.email}
                              </p>
                            )}
                          </div>
                          <div>
                            <label className="flex items-center gap-2 text-slate-700 font-semibold mb-2">
                              <Phone className="w-4 h-4 text-blue-500" />
                              Phone *
                            </label>
                            <Input
                              name="phone"
                              value={form.phone}
                              onChange={onChange}
                              placeholder="+237 XXX XXX XXX"
                              required
                              className={`rounded-xl h-12 ${errors.phone ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
                            />
                            {errors.phone && (
                              <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" /> {errors.phone}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Date & Time */}
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="flex items-center gap-2 text-slate-700 font-semibold mb-2">
                              <Calendar className="w-4 h-4 text-blue-500" />
                              Preferred Date *
                            </label>
                            <Input
                              name="date"
                              type="date"
                              value={form.date}
                              onChange={onChange}
                              required
                              className={`rounded-xl h-12 ${errors.date ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
                            />
                            {errors.date && (
                              <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" /> {errors.date}
                              </p>
                            )}
                          </div>
                          <div>
                            <label className="flex items-center gap-2 text-slate-700 font-semibold mb-2">
                              <Clock className="w-4 h-4 text-blue-500" />
                              Preferred Time *
                            </label>
                            <Input
                              name="time"
                              type="time"
                              value={form.time}
                              onChange={onChange}
                              required
                              className={`rounded-xl h-12 ${errors.time ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
                            />
                            {errors.time && (
                              <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" /> {errors.time}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Location */}
                        <div>
                          <label className="flex items-center gap-2 text-slate-700 font-semibold mb-2">
                            <MapPin className="w-4 h-4 text-blue-500" />
                            Location *
                          </label>
                          <Input
                            name="location"
                            value={form.location}
                            onChange={onChange}
                            placeholder="e.g., Kumba Health Center"
                            required
                            className={`rounded-xl h-12 ${errors.location ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
                          />
                          {errors.location && (
                            <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" /> {errors.location}
                            </p>
                          )}
                        </div>

                        {/* Reason */}
                        <div>
                          <label className="flex items-center gap-2 text-slate-700 font-semibold mb-2">
                            <FileText className="w-4 h-4 text-blue-500" />
                            Reason for Visit *
                          </label>
                          <Textarea
                            name="reason"
                            value={form.reason}
                            onChange={onChange}
                            rows={4}
                            placeholder="Briefly describe your health concern or reason for appointment"
                            required
                            className={`rounded-xl ${errors.reason ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
                          />
                          {errors.reason && (
                            <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" /> {errors.reason}
                            </p>
                          )}
                        </div>

                        {/* Submit Button */}
                        <Button
                          type="submit"
                          disabled={createAppointment.isPending}
                          className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-6 text-lg font-bold rounded-2xl shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/50 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {createAppointment.isPending ? (
                            <span className="flex items-center gap-2">
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              Scheduling...
                            </span>
                          ) : (
                            <span className="flex items-center gap-2">
                              Schedule Appointment
                              <ArrowRight className="w-5 h-5" />
                            </span>
                          )}
                        </Button>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar - Benefits & Appointments */}
            <div className="space-y-6">
              {/* What to Expect */}
              <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200 animate-fade-in delay-200">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">What to Expect</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex gap-3 group hover:scale-105 transition-transform duration-300">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center shrink-0 shadow-lg group-hover:shadow-xl transition-shadow`}>
                          <benefit.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900 text-sm">{benefit.title}</h4>
                          <p className="text-xs text-slate-500">{benefit.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Your Appointments */}
              <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200 animate-fade-in delay-300">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">Your Appointments</h3>
                    </div>
                    {upcoming.length > 0 && (
                      <span className="text-xs font-semibold bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">
                        {upcoming.length} Upcoming
                      </span>
                    )}
                  </div>
                  
                  {upcoming.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3">
                        <Calendar className="w-8 h-8 text-slate-400" />
                      </div>
                      <p className="text-slate-500 text-sm">No appointments yet.</p>
                      <p className="text-slate-400 text-xs mt-1">Book your first appointment today!</p>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                      {upcoming.map((appointment) => (
                        <div
                          key={appointment.id}
                          className="group relative bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-4 border border-slate-200 hover:border-blue-200 hover:shadow-lg transition-all duration-300"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                                <User className="w-4 h-4 text-white" />
                              </div>
                              <div>
                                <p className="font-semibold text-slate-900 text-sm">{appointment.fullName}</p>
                                <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                                  <Calendar className="w-3 h-3" />
                                  {appointment.date}
                                </div>
                              </div>
                            </div>
                            <button
                              onClick={() => remove(appointment.id)}
                              className="w-6 h-6 rounded-full bg-red-50 hover:bg-red-100 flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100"
                            >
                              <X className="w-3 h-3 text-red-500" />
                            </button>
                          </div>
                          
                          <div className="space-y-1 text-xs text-slate-500">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {appointment.time}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {appointment.location}
                            </div>
                          </div>
                          
                          <p className="mt-2 text-xs text-slate-600 bg-white/50 rounded-lg p-2">
                            {appointment.reason}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Help */}
              <div className="relative bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl shadow-xl overflow-hidden animate-fade-in delay-400">
                <div className="p-6 text-white text-center">
                  <Heart className="w-10 h-10 mx-auto mb-3 text-white/80" />
                  <h3 className="font-bold text-lg mb-2">Need Immediate Help?</h3>
                  <p className="text-white/80 text-sm mb-4">
                    Chat with our Health AI assistant for quick health guidance.
                  </p>
                  <Button
                    asChild
                    variant="secondary"
                    className="w-full bg-white text-blue-600 hover:bg-blue-50 rounded-xl"
                  >
                    <Link to="/health-ai">
                      <Sparkles className="mr-2 w-4 h-4" />
                      Chat with Health AI
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Appointments;