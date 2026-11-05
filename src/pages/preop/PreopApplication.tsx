import { storeSession } from "@/lib/authSession";
import TrainingProgress from "./TrainingProgress";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  LockKeyhole,
  Save,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import SEO from "@/components/SEO";
import {
  preopErrors,
  preopSections,
  preopStatuses,
  visibleField,
  type PreopAnswers,
} from "@/lib/preopSchema";
import {
  PREOP_TOKEN,
  preopRequest,
  PreopApiError,
  type PreopApplication as Application,
} from "@/lib/preopApi";
import "./preop.css";

export function ApplicationAnswers({ answers }: { answers: PreopAnswers }) {
  return (
    <div className="preop-answer-list">
      {preopSections.map((section) => (
        <details key={section.title}>
          <summary>{section.title}</summary>
          <dl>
            {section.fields
              .filter((field) => visibleField(field, answers))
              .map((field) => (
                <div key={field.key}>
                  <dt>{field.label}</dt>
                  <dd>
                    {Array.isArray(answers[field.key])
                      ? (answers[field.key] as string[]).join(", ")
                      : typeof answers[field.key] === "boolean"
                        ? answers[field.key]
                          ? "Agreed"
                          : "Not agreed"
                        : String(answers[field.key] || "Not provided")}
                  </dd>
                </div>
              ))}
          </dl>
        </details>
      ))}
    </div>
  );
}
function Workspace({
  initial,
  onReload,
  onLogout,
}: {
  initial: Application;
  onReload: () => void;
  onLogout: () => void;
}) {
  const [application, setApplication] = useState(initial);
  const [isMember, setIsMember] = useState(false);
  const [answers, setAnswers] = useState(initial.answers);
  const [step, setStep] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [saveState, setSaveState] = useState("All changes saved");
  const [conflict, setConflict] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [withdrawReason, setWithdrawReason] = useState("");
  const answerRef = useRef(answers);
  const versionRef = useRef(initial.version);
  const dirty = useRef(false);
  const editNumber = useRef(0);
  const flight = useRef<Promise<void> | null>(null);
  const blocked = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const errors = preopErrors(answers);
  const draft = application.status === "draft";
  const save = useCallback(async function persist(): Promise<void> {
    if (blocked.current)
      throw new Error("Reload the saved application before continuing.");
    if (flight.current) {
      await flight.current;
      if (dirty.current) await persist();
      return;
    }
    if (!dirty.current) return;
    const revision = editNumber.current;
    const snapshot = answerRef.current;
    setSaveState("Saving…");
    const work = (async () => {
      try {
        const result = await preopRequest<Application>("me", {
          method: "PATCH",
          body: JSON.stringify({
            version: versionRef.current,
            answers: snapshot,
          }),
        });
        versionRef.current = result.version;
        setApplication(result);
        if (editNumber.current === revision) dirty.current = false;
        setSaveState(dirty.current ? "Unsaved changes" : "All changes saved");
        setError("");
      } catch (cause) {
        setSaveState("Changes not saved");
        if (
          cause instanceof PreopApiError &&
          (cause.status === 409 || cause.status === 401)
        ) {
          blocked.current = true;
          setConflict(true);
        }
        setError((cause as Error).message);
        throw cause;
      }
    })();
    flight.current = work;
    try {
      await work;
    } finally {
      flight.current = null;
    }
  }, []);
  useEffect(() => {
    if (!draft || !dirty.current || blocked.current) return;
    timer.current = setTimeout(() => {
      void save().catch(() => {});
    }, 1200);
    return () => clearTimeout(timer.current);
  }, [answers, draft, save]);
  useEffect(() => {
    const warn = (event: BeforeUnloadEvent) => {
      if (
        (dirty.current || flight.current) &&
        sessionStorage.getItem(PREOP_TOKEN)
      ) {
        event.preventDefault();
        event.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, []);
  function change(key: string, value: string | boolean | string[]) {
    const next = { ...answerRef.current, [key]: value };
    answerRef.current = next;
    editNumber.current++;
    dirty.current = true;
    setAnswers(next);
    setSaveState("Unsaved changes");
  }
  async function move(next: number) {
    setBusy(true);
    clearTimeout(timer.current);
    try {
      await save();
      setStep(next);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      /* Error remains visible. */
    } finally {
      setBusy(false);
    }
  }
  async function submit() {
    setBusy(true);
    clearTimeout(timer.current);
    try {
      await save();
      const result = await preopRequest<Application>("submit", {
        method: "POST",
        body: JSON.stringify({
          version: versionRef.current,
          answers: answerRef.current,
        }),
      });
      versionRef.current = result.version;
      dirty.current = false;
      setApplication(result);
      setError("");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (cause) {
      setError((cause as Error).message);
      if (cause instanceof PreopApiError && cause.status === 409) {
        blocked.current = true;
        setConflict(true);
      }
    } finally {
      setBusy(false);
    }
  }
  async function logout() {
    setBusy(true);
    clearTimeout(timer.current);
    try {
      if (draft && !blocked.current) await save();
      await preopRequest("logout", { method: "POST" });
      sessionStorage.removeItem(PREOP_TOKEN);
      onLogout();
    } catch (cause) {
      if (cause instanceof PreopApiError && cause.status === 401) {
        sessionStorage.removeItem(PREOP_TOKEN);
        onLogout();
      } else setError((cause as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function withdraw() {
    setBusy(true);
    try {
      const result = await preopRequest<Application>("withdraw", {
        method: "POST",
        body: JSON.stringify({
          version: versionRef.current,
          reason: withdrawReason,
        }),
      });
      versionRef.current = result.version;
      setApplication(result);
      setWithdrawOpen(false);
      setError("");
    } catch (cause) {
      setError((cause as Error).message);
    } finally {
      setBusy(false);
    }
  }
  const section = preopSections[step];
  const completed = preopSections.filter((s) =>
    s.fields
      .filter((f) => visibleField(f, answers))
      .every((f) => !errors[f.key]),
  ).length;
  return (
    <>
      <div className="preop-workspace-top">
        <div>
          <span className="preop-reference">{application.reference}</span>
          <p>{application.email}</p>
        </div>
        <Button variant="outline" disabled={busy} onClick={() => void logout()}>
          {draft ? "Save & sign out" : "Sign out"}
        </Button>
      </div>
      {application.public_message && (
        <div className="preop-message">
          <strong>Message from OPHEG</strong>
          <p>{application.public_message}</p>
        </div>
      )}
      {error && (
        <div role="alert" className="preop-error">
          {error}
          {conflict && (
            <>
              <p>
                Your local answers have not been overwritten. Reloading will
                replace them with the saved version.
              </p>
              <Button variant="outline" onClick={onReload}>
                Reload saved application
              </Button>
            </>
          )}
        </div>
      )}
      {draft ? (
        <div className="preop-layout">
          <aside className="preop-steps">
            <p className="preop-kicker">YOUR APPLICATION</p>
            <h2>One step at a time.</h2>
            <p>{completed} of 8 sections complete</p>
            <div
              className="preop-progress"
              aria-label="Application progress"
              role="progressbar"
              aria-valuenow={completed}
              aria-valuemin={0}
              aria-valuemax={8}
            >
              <span style={{ width: `${(completed / 8) * 100}%` }} />
            </div>
            <nav aria-label="Application sections">
              {preopSections.map((s, i) => (
                <button
                  key={s.title}
                  aria-current={step === i ? "step" : undefined}
                  disabled={busy || conflict}
                  onClick={() => void move(i)}
                >
                  <span>{i + 1}</span>
                  {s.title}
                </button>
              ))}
            </nav>
            <p className="preop-save-status" role="status">
              <Save size={14} />
              {saveState}
            </p>
            <small>
              Your draft is saved to your account. Return using an email link on
              any device.
            </small>
          </aside>
          <form
            className="preop-form"
            onSubmit={(event) => {
              event.preventDefault();
              if (
                step === 7 &&
                !Object.keys(errors).length &&
                !busy &&
                !conflict
              )
                void submit();
            }}
          >
            <header>
              <span className="preop-kicker">SECTION {step + 1} OF 8</span>
              <h2>{section.title}</h2>
              <p>{section.description}</p>
            </header>
            <fieldset disabled={busy || conflict} className="preop-fieldset">
              {section.fields
                .filter((f) => visibleField(f, answers))
                .map((field) => (
                  <div className="preop-field" key={field.key}>
                    {field.kind === "check" ? (
                      <label className="preop-check">
                        <input
                          type="checkbox"
                          checked={answers[field.key] === true}
                          onChange={(e) => change(field.key, e.target.checked)}
                        />
                        <span>{field.label} *</span>
                      </label>
                    ) : field.kind === "multi" ? (
                      <fieldset>
                        <legend>{field.label} *</legend>
                        <div className="preop-options">
                          {field.options?.map((option) => (
                            <label key={option}>
                              <input
                                type="checkbox"
                                checked={
                                  Array.isArray(answers[field.key]) &&
                                  (answers[field.key] as string[]).includes(
                                    option,
                                  )
                                }
                                onChange={(e) => {
                                  const old = Array.isArray(answers[field.key])
                                    ? (answers[field.key] as string[])
                                    : [];
                                  change(
                                    field.key,
                                    e.target.checked
                                      ? [...old, option]
                                      : old.filter((v) => v !== option),
                                  );
                                }}
                              />
                              {option}
                            </label>
                          ))}
                        </div>
                      </fieldset>
                    ) : (
                      <>
                        <label htmlFor={`preop-${field.key}`}>
                          {field.label}
                          {field.required ? " *" : " (optional)"}
                        </label>
                        {field.kind === "select" ? (
                          <select
                            id={`preop-${field.key}`}
                            value={String(answers[field.key] || "")}
                            onChange={(e) => change(field.key, e.target.value)}
                          >
                            <option value="">Select…</option>
                            {field.options?.map((o) => (
                              <option key={o}>{o}</option>
                            ))}
                          </select>
                        ) : field.kind === "long" ? (
                          <textarea
                            id={`preop-${field.key}`}
                            rows={5}
                            maxLength={field.max}
                            value={String(answers[field.key] || "")}
                            onChange={(e) => change(field.key, e.target.value)}
                          />
                        ) : (
                          <Input
                            id={`preop-${field.key}`}
                            type={
                              field.kind === "date"
                                ? "date"
                                : field.kind === "tel"
                                  ? "tel"
                                  : "text"
                            }
                            maxLength={field.max}
                            value={String(answers[field.key] || "")}
                            onChange={(e) => change(field.key, e.target.value)}
                          />
                        )}
                      </>
                    )}
                    {errors[field.key] && (
                      <small className="preop-field-error">
                        {errors[field.key]}
                      </small>
                    )}
                  </div>
                ))}
            </fieldset>
            {step === 7 && (
              <>
                <div className="preop-review">
                  <ShieldCheck size={20} />
                  <p>
                    Submission locks your answers for review. Acceptance starts
                    PREOP—it does not grant full OPHEG membership.
                  </p>
                </div>
                {Object.keys(errors).length > 0 && (
                  <p role="status" className="preop-field-error">
                    Complete {Object.keys(errors).length} required or invalid
                    field(s) before submitting. Use the section navigation to
                    return to your answers.
                  </p>
                )}
                <ApplicationAnswers answers={answers} />
              </>
            )}
            <footer className="preop-form-footer">
              <Button
                type="button"
                variant="outline"
                disabled={busy || conflict || step === 0}
                onClick={() => void move(step - 1)}
              >
                <ChevronLeft size={16} />
                Back
              </Button>
              <Button
                type="button"
                variant="outline"
                disabled={busy || conflict}
                onClick={() => void move(step)}
              >
                Save progress
              </Button>
              {step < 7 ? (
                <Button
                  type="button"
                  disabled={busy || conflict}
                  onClick={() => void move(step + 1)}
                >
                  Save & continue
                  <ArrowRight size={16} />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={busy || conflict || Object.keys(errors).length > 0}
                >
                  {busy ? "Submitting…" : "Submit application"}
                </Button>
              )}
            </footer>
          </form>
        </div>
      ) : (
        <section className="preop-status-card">
          <span className="preop-status-icon">
            <Check size={30} />
          </span>
          <h2>
            {isMember ? "Full OPHEGMITE" : preopStatuses[application.status]}
          </h2>
          <p>
            {isMember
              ? "Your membership has been recorded. You can now use your volunteer account to complete your profile and connect with the community."
              : ["accepted", "accepted_observation"].includes(
                    application.status,
                  )
                ? "You have been accepted into PREOP. This is not full membership. OPHEG will communicate the next training steps."
                : "Your application is saved. Return here to check messages and your screening status."}
          </p>
          {application.enrolments
            .filter((e) => !e.ended_at && e.cohort)
            .map((e) => (
              <p key={e.started_at}>
                <strong>Assigned cohort: {e.cohort}</strong>
              </p>
            ))}
          <Button variant="outline" onClick={onReload}>
            Refresh status
          </Button>
          <TrainingProgress onMembership={setIsMember} />
          <h3>Your journey</h3>
          <ol className="preop-public-timeline">
            {application.timeline.map((event) => (
              <li key={event.id}>
                <time>{new Date(event.created_at).toLocaleString()}</time>
                <strong>
                  {preopStatuses[event.action] ||
                    (
                      {
                        application_created: "Application started",
                        request_correction: "Corrections requested",
                      } as Record<string, string>
                    )[event.action] ||
                    event.action}
                </strong>
              </li>
            ))}
          </ol>
          <ApplicationAnswers answers={application.answers} />
          {!isMember &&
            [
              "submitted",
              "under_review",
              "waitlisted",
              "accepted",
              "accepted_observation",
            ].includes(application.status) && (
              <Button variant="outline" onClick={() => setWithdrawOpen(true)}>
                Withdraw my application
              </Button>
            )}
        </section>
      )}
      <Dialog
        open={withdrawOpen}
        onOpenChange={(open) => {
          if (!busy) setWithdrawOpen(open);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Withdraw from PREOP?</DialogTitle>
            <DialogDescription>
              Your application and history will be retained. Withdrawal does not
              delete your record.
            </DialogDescription>
          </DialogHeader>
          <label>
            Reason
            <textarea
              className="mt-2 w-full rounded border p-3"
              value={withdrawReason}
              maxLength={1500}
              onChange={(e) => setWithdrawReason(e.target.value)}
            />
          </label>
          <Button
            disabled={busy || !withdrawReason.trim()}
            onClick={() => void withdraw()}
          >
            Confirm withdrawal
          </Button>
          {error && <p role="alert">{error}</p>}
        </DialogContent>
      </Dialog>
    </>
  );
}
export default function PreopApplication() {
  const [session, setSession] = useState(() =>
    Boolean(sessionStorage.getItem(PREOP_TOKEN)),
  );
  const [linkToken, setLinkToken] = useState(
    () => new URLSearchParams(window.location.hash.slice(1)).get("token") || "",
  );
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(0);
  useEffect(() => {
    if (linkToken)
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search,
      );
  }, [linkToken]);
  useEffect(() => {
    if (!session || linkToken) return;
    let live = true;
    setLoading(true);
    preopRequest<Application>("me")
      .then((data) => {
        if (live) {
          setApplication(data);
          setError("");
        }
      })
      .catch((cause) => {
        if (live) {
          setError(cause.message);
          if (cause instanceof PreopApiError && cause.status === 401)
            setSession(false);
        }
      })
      .finally(() => {
        if (live) setLoading(false);
      });
    return () => {
      live = false;
    };
  }, [session, linkToken, reload]);
  async function request() {
    setBusy(true);
    setError("");
    try {
      const result = await preopRequest<{ message: string }>(
        "request-link",
        { method: "POST", body: JSON.stringify({ email }) },
        "none",
      );
      setMessage(result.message);
    } catch (cause) {
      setError((cause as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function verify() {
    setBusy(true);
    setError("");
    try {
      const result = await preopRequest<{ token: string; expiresAt: string }>(
        "verify",
        { method: "POST", body: JSON.stringify({ token: linkToken }) },
        "none",
      );
      storeSession("preop", result.token, result.expiresAt);
      setSession(true);
      setLinkToken("");
      setApplication(null);
    } catch (cause) {
      setError((cause as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="preop-page">
      <SEO
        title="PREOP application | OPHEG"
        description="Start your journey of service with OPHEG."
        noindex
      />
      <header className="preop-brandbar">
        <a href="/">
          <img src="/logo.png" alt="OPHEG" />
          <strong>
            OPHEG <span>PREOP</span>
          </strong>
        </a>
        <a href="/volunteers/login">Existing volunteer login</a>
      </header>
      <main className="preop-shell">
        <section className="preop-hero">
          <span className="preop-kicker">PURPOSE. COMMITMENT. COMMUNITY.</span>
          <h1>
            Your journey of service
            <br />
            <em>starts with intention.</em>
          </h1>
          <p>
            PREOP is the entry and training pathway toward OPHEG membership.
            Tell us who you are, why you want to serve, and what you are ready
            to contribute.
          </p>
        </section>
        {error && (
          <p role="alert" className="preop-error">
            {error}
          </p>
        )}
        {linkToken ? (
          <section className="preop-access">
            <LockKeyhole size={30} />
            <h2>Open your application</h2>
            <p>Confirm to use your private, single-use email link.</p>
            <Button disabled={busy} onClick={() => void verify()}>
              {busy ? "Opening…" : "Continue securely"}
            </Button>
            <Button
              variant="ghost"
              disabled={busy}
              onClick={() => setLinkToken("")}
            >
              Request a different link
            </Button>
          </section>
        ) : !session ? (
          <section className="preop-access">
            <h2>Start or resume</h2>
            <p>
              No password needed. Verify your email to save your progress and
              return from another device.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                void request();
              }}
            >
              <label>
                Email address
                <Input
                  type="email"
                  required
                  maxLength={160}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />
              </label>
              <Button disabled={busy || !email.trim()}>
                {busy ? "Sending…" : "Email my access link"}
                <ArrowRight size={16} />
              </Button>
            </form>
            {message && (
              <p role="status" className="preop-message">
                {message}
              </p>
            )}
            <small>
              We use this email for secure access and application communication.
              Your detailed professional profile is only requested later in the
              membership process.
            </small>
          </section>
        ) : loading ? (
          <p role="status" className="preop-access">
            Loading your application…
          </p>
        ) : application ? (
          <Workspace
            key={`${application.id}-${reload}`}
            initial={application}
            onReload={() => {
              setApplication(null);
              setReload((n) => n + 1);
            }}
            onLogout={() => {
              setApplication(null);
              setSession(false);
            }}
          />
        ) : (
          <Button onClick={() => setReload((n) => n + 1)}>
            Retry loading application
          </Button>
        )}
      </main>
      <footer className="preop-site-footer">
        OPHEG · For the love of humanity.
      </footer>
    </div>
  );
}
