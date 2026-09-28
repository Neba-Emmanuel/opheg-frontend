import { useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Mail,
  FileText,
  Users,
  LogOut,
  LayoutDashboard,
  ArrowUpRight,
  ArrowRight,
  Heart,
  RefreshCw,
} from "lucide-react";
import SEO from "@/components/SEO";
import NewsletterManager from "@/components/admin/NewsletterManager";
import AppointmentsManager from "@/components/admin/AppointmentsManager";
import ApplicationsManager from "@/components/admin/ApplicationsManager";
import VolunteersManager from "@/components/admin/VolunteersManager";
import PostsManager from "@/components/admin/PostsManager";
import { useApplications } from "@/hooks/useApplications";
import { useAppointments } from "@/hooks/useAppointments";
import { useSubscribers } from "@/hooks/useNewsletter";
import "./admin.css";

const sections = [
  {
    id: "overview",
    label: "Overview",
    icon: LayoutDashboard,
    description:
      "A clear view of your community and what needs your attention.",
  },
  {
    id: "appointments",
    label: "Appointments",
    icon: Calendar,
    description:
      "Coordinate care, review requests, and keep appointments moving.",
  },
  {
    id: "applications",
    label: "Applications",
    icon: Users,
    description: "Meet the volunteers and partners ready to make a difference.",
  },
  {
    id: "volunteers",
    label: "Volunteer records",
    icon: Heart,
    description:
      "Contact details, skills, and availability from existing volunteers.",
  },
  {
    id: "newsletter",
    label: "Newsletter",
    icon: Mail,
    description: "Keep your community informed, connected, and inspired.",
  },
  {
    id: "posts",
    label: "Posts",
    icon: FileText,
    description: "Share the stories and updates behind your impact.",
  },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const active =
    sections.find((s) => s.id === params.get("section")) ?? sections[0];
  const select = (section: string) => setParams({ section });
  const subscribers = useSubscribers();
  const appointments = useAppointments();
  const volunteers = useApplications("volunteer");
  const partners = useApplications("partner");
  const queries = [subscribers, appointments, volunteers, partners];
  const hasError = queries.some((q) => q.isError);
  const refreshing = queries.some((q) => q.isFetching);
  const pending = appointments.data?.filter(
    (a) => a.status === "pending",
  ).length;
  const recent = [...(appointments.data ?? [])]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 4);
  useEffect(() => {
    if (!localStorage.getItem("opheg_admin_token"))
      navigate("/admin/login", { replace: true });
  }, [navigate]);
  const logout = () => {
    localStorage.removeItem("opheg_admin_token");
    navigate("/admin/login");
  };
  const stats = [
    {
      label: "Subscribers",
      value: subscribers.data?.length,
      detail: "Your newsletter community",
      icon: Mail,
      section: "newsletter",
    },
    {
      label: "Pending appointments",
      value: pending,
      detail: "Awaiting your review",
      icon: Calendar,
      section: "appointments",
    },
    {
      label: "Volunteer applications",
      value: volunteers.data?.length,
      detail: "People ready to help",
      icon: Users,
      section: "applications",
    },
    {
      label: "Partner requests",
      value: partners.data?.length,
      detail: "Connections for greater impact",
      icon: Heart,
      section: "applications",
    },
  ];
  return (
    <div className="admin-app">
      <SEO
        title={`${active.label} | OPHEG Admin`}
        description="OPHEG administration workspace"
        noindex
      />
      <a className="admin-skip" href="#admin-main">
        Skip to content
      </a>
      <aside className="admin-sidebar">
        <Link to="/admin/dashboard" className="admin-brand">
          <span className="admin-logo">
            <img src="/logo.png" alt="" />
          </span>
          <span>
            OPHEG<span className="admin-brand-sub">Administration</span>
          </span>
        </Link>
        <p className="admin-nav-label">WORKSPACE</p>
        <nav aria-label="Admin navigation">
          {sections.map((s) => (
            <Button
              key={s.id}
              variant="ghost"
              className={`admin-nav-item ${s.id === active.id ? "is-active" : ""}`}
              aria-current={s.id === active.id ? "page" : undefined}
              onClick={() => select(s.id)}
            >
              <s.icon size={18} />
              {s.label}
              {s.id === "appointments" && !!pending && (
                <span className="admin-nav-count">{pending}</span>
              )}
            </Button>
          ))}
        </nav>
        <div className="admin-sidebar-bottom">
          <div className="admin-mission">
            <Heart size={20} />
            <p>
              Small actions.
              <br />
              <strong>Healthier communities.</strong>
            </p>
            <span>Thank you for moving our mission forward.</span>
          </div>
          <Link className="admin-website" to="/">
            Visit public website <ArrowUpRight size={16} />
          </Link>
          <Button variant="ghost" className="admin-nav-item" onClick={logout}>
            <LogOut size={18} />
            Sign out
          </Button>
        </div>
      </aside>
      <div className="admin-workspace">
        <header className="admin-topbar">
          <div>
            <span className="admin-breadcrumb">Workspace / </span>
            <span>{active.label}</span>
          </div>
          <div className="admin-account">
            <span className="hidden sm:inline">OPHEG team</span>
            <span className="admin-avatar" aria-label="Administrator">
              AD
            </span>
          </div>
        </header>
        <main id="admin-main" className="admin-main" tabIndex={-1}>
          <div className="admin-page-heading">
            <div>
              <p className="admin-eyebrow">OPTIMUM HEALTH GLOBAL</p>
              <h1>
                {active.id === "overview"
                  ? "Your impact, at a glance."
                  : active.label}
              </h1>
              <p className="admin-description">{active.description}</p>
            </div>
            {active.id === "overview" && (
              <Button
                variant="outline"
                disabled={refreshing}
                onClick={() => {
                  queries.forEach((q) => {
                    void q.refetch();
                  });
                }}
              >
                <RefreshCw
                  className={`mr-2 h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
                />
                Refresh
              </Button>
            )}
          </div>
          {active.id === "overview" ? (
            <div className="space-y-7">
              {hasError && (
                <div role="alert" className="admin-error">
                  Some information could not be loaded. Refresh to try again.
                </div>
              )}
              <div className="admin-stats">
                {stats.map((s) => (
                  <Card key={s.label} className="admin-stat">
                    <CardContent>
                      <div className="admin-stat-top">
                        <span>{s.label}</span>
                        <s.icon size={18} />
                      </div>
                      <div className="admin-stat-value">{s.value ?? "—"}</div>
                      <div className="admin-stat-bottom">
                        <span>{s.detail}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={`View ${s.label}`}
                          onClick={() => select(s.section)}
                        >
                          <ArrowUpRight size={18} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="admin-overview-grid">
                <Card>
                  <CardHeader className="admin-panel-heading">
                    <div>
                      <CardTitle>Recent appointments</CardTitle>
                      <p>The latest requests from your community.</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => select("appointments")}
                    >
                      View all <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {appointments.isPending ? (
                      <div role="status" className="admin-empty">
                        Loading appointments…
                      </div>
                    ) : appointments.isError ? (
                      <div className="admin-empty">
                        Appointments are currently unavailable.
                      </div>
                    ) : recent.length === 0 ? (
                      <div className="admin-empty">
                        <Calendar size={30} />
                        <h3>A little room in the calendar</h3>
                        <p>New appointment requests will appear here.</p>
                      </div>
                    ) : (
                      <div>
                        {recent.map((a) => (
                          <div className="admin-appointment" key={a.id}>
                            <span className="admin-person-avatar">
                              {a.name.slice(0, 1).toUpperCase()}
                            </span>
                            <div className="min-w-0 flex-1">
                              <strong>{a.name}</strong>
                              <p className="truncate">{a.reason}</p>
                              <small>
                                {new Date(a.date).toLocaleDateString(
                                  undefined,
                                  { month: "short", day: "numeric" },
                                )}{" "}
                                · {a.time}
                              </small>
                            </div>
                            <Badge variant="secondary">{a.status}</Badge>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
                <Card className="admin-action-panel">
                  <CardHeader>
                    <p className="admin-eyebrow">MAKE IT HAPPEN</p>
                    <CardTitle>
                      Where will you
                      <br />
                      make a difference today?
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      {
                        id: "newsletter",
                        label: "Reach your community",
                        sub: "Write a newsletter",
                        icon: Mail,
                      },
                      {
                        id: "applications",
                        label: "Grow the team",
                        sub: "Review applications",
                        icon: Users,
                      },
                      {
                        id: "posts",
                        label: "Tell your story",
                        sub: "Manage posts",
                        icon: FileText,
                      },
                    ].map((a) => (
                      <Button
                        key={a.id}
                        variant="ghost"
                        className="admin-quick-action"
                        onClick={() => select(a.id)}
                      >
                        <a.icon size={20} />
                        <span>
                          <strong>{a.label}</strong>
                          <small>{a.sub}</small>
                        </span>
                        <ArrowUpRight size={18} />
                      </Button>
                    ))}
                  </CardContent>
                </Card>
              </div>
              <div className="admin-note">
                <Heart size={18} />
                <p>
                  Behind every request is a person. Thank you for helping bring
                  better health closer to them.
                </p>
              </div>
            </div>
          ) : (
            <div className="admin-manager">
              {active.id === "newsletter" && <NewsletterManager />}
              {active.id === "appointments" && <AppointmentsManager />}
              {active.id === "applications" && <ApplicationsManager />}
              {active.id === "posts" && <PostsManager />}
              {active.id === "volunteers" && <VolunteersManager />}
            </div>
          )}
          <footer className="admin-footer">
            <span>© {new Date().getFullYear()} OPHEG</span>
            <span>Taking health to the communities.</span>
          </footer>
        </main>
      </div>
    </div>
  );
}
