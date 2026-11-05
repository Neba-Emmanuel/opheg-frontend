import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useVolunteerCohorts } from "@/hooks/useVolunteerCohorts";
import { preopRequest } from "@/lib/preopApi";
import {
  trainingStages,
  trainingCommand,
  performanceDimensions,
  attendanceStatuses,
  recommendations,
  trainingBranches,
  trainingDepartments,
} from "@/lib/preopTrainingSchema";
import {
  actionLabels,
  availableActions,
  type TrainingDetail,
  type TrainingProgram,
  type Trainee,
} from "@/lib/preopTraining";
import { TrainingOverview } from "@/pages/preop/TrainingProgress";
import "@/pages/preop/preop.css";
export default function PreopTrainingManager({
  director = false,
  branch,
}: {
  director?: boolean;
  branch?: string;
}) {
  const auth = director ? "director" : "admin";
  const cohorts = useVolunteerCohorts();
  const [cohort, setCohort] = useState(""),
    [stage, setStage] = useState(""),
    [search, setSearch] = useState(""),
    [page, setPage] = useState(0),
    [tab, setTab] = useState("trainees"),
    [reload, setReload] = useState(0),
    [roster, setRoster] = useState<{ items: Trainee[]; total: number } | null>(
      null,
    ),
    [error, setError] = useState(""),
    [loading, setLoading] = useState(false),
    [selected, setSelected] = useState<number | null>(null);
  useEffect(() => {
    let live = true;
    setLoading(true);
    const timer = setTimeout(() => {
      preopRequest<{ items: Trainee[]; total: number }>(
        `${auth}/training?cohort=${encodeURIComponent(cohort)}&stage=${stage}&search=${encodeURIComponent(search)}&page=${page}`,
        {},
        auth,
      )
        .then((data) => {
          if (live) {
            setRoster(data);
            setError("");
          }
        })
        .catch((e) => {
          if (live) setError(e.message);
        })
        .finally(() => {
          if (live) setLoading(false);
        });
    }, 200);
    return () => {
      live = false;
      clearTimeout(timer);
    };
  }, [cohort, stage, search, page, reload, auth]);
  return (
    <section className="preop-admin">
      <p className="preop-message">
        {director
          ? `${branch} trainees · You can manage cohort programmes and assess trainees in your branch. Membership conversion is reserved for admins.`
          : "Follow each trainee from orientation to membership. Attendance and scores inform a human decision; there is no automatic pass mark."}
      </p>
      <nav className="preop-tabs" aria-label="Training workspace">
        <Button
          variant={tab === "trainees" ? "default" : "outline"}
          onClick={() => setTab("trainees")}
        >
          Trainees
        </Button>
        <Button
          variant={tab === "programme" ? "default" : "outline"}
          onClick={() => setTab("programme")}
        >
          Cohort programme
        </Button>
      </nav>
      <div className="preop-filters">
        <label>
          Cohort
          <select
            value={cohort}
            onChange={(e) => {
              setCohort(e.target.value);
              setPage(0);
            }}
          >
            <option value="">
              {tab === "trainees" ? "All cohorts" : "Select cohort"}
            </option>
            {cohorts.data?.map((c) => (
              <option key={c.number}>{c.name}</option>
            ))}
          </select>
        </label>
        {tab === "trainees" && (
          <>
            <label>
              Training stage
              <select
                value={stage}
                onChange={(e) => {
                  setStage(e.target.value);
                  setPage(0);
                }}
              >
                <option value="">All stages</option>
                {Object.entries(trainingStages).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Find trainee
              <input
                placeholder="Search by name"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(0);
                }}
              />
            </label>
            <Button variant="outline" onClick={() => setReload((n) => n + 1)}>
              Refresh
            </Button>
          </>
        )}
      </div>
      {cohorts.isError && (
        <p role="alert">
          Unable to load cohorts.{" "}
          <Button variant="outline" onClick={() => void cohorts.refetch()}>
            Retry
          </Button>
        </p>
      )}
      {tab === "programme" ? (
        cohort ? (
          <ProgramEditor
            key={`${cohort}-${auth}`}
            cohort={cohort}
            director={director}
          />
        ) : (
          <p className="preop-help">
            Select an existing cohort. New cohorts can be created in the Cohorts
            tab.
          </p>
        )
      ) : (
        <>
          {error && (
            <p role="alert" className="preop-error">
              {error}
            </p>
          )}
          <div className="preop-table-wrap">
            <table className="preop-table">
              <thead>
                <tr>
                  <th>Trainee</th>
                  <th>Deployment</th>
                  <th>Stage</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {!loading &&
                  roster?.items.map((t) => (
                    <tr key={t.id}>
                      <td>
                        <strong>{t.name}</strong>
                        <small className="training-subtext">
                          {t.reference}
                        </small>
                      </td>
                      <td>
                        {t.cohort || "No cohort"}
                        <small className="training-subtext">
                          {t.branch || "Branch unassigned"}
                        </small>
                      </td>
                      <td>
                        <span className="preop-badge">
                          {trainingStages[t.stage]}
                        </span>
                      </td>
                      <td>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelected(t.id)}
                        >
                          Open record
                        </Button>
                      </td>
                    </tr>
                  ))}
                {(loading || !roster?.items.length) && (
                  <tr>
                    <td colSpan={4}>
                      {loading ? "Loading trainees…" : "No trainees found."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="preop-form-footer">
            <span>{roster?.total ?? 0} trainees</span>
            <Button
              variant="outline"
              disabled={loading || page === 0}
              onClick={() => setPage((n) => n - 1)}
            >
              Previous
            </Button>
            <span>Page {page + 1}</span>
            <Button
              variant="outline"
              disabled={loading || (page + 1) * 25 >= (roster?.total || 0)}
              onClick={() => setPage((n) => n + 1)}
            >
              Next
            </Button>
          </div>
        </>
      )}
      <Dialog
        open={selected !== null}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      >
        <DialogContent className="preop-review-dialog">
          <DialogHeader>
            <DialogTitle>Training & membership record</DialogTitle>
            <DialogDescription>
              Keep evidence, feedback and decisions together throughout the
              trainee’s journey.
            </DialogDescription>
          </DialogHeader>
          {selected !== null && (
            <TraineeEditor
              key={`${selected}-${auth}`}
              id={selected}
              director={director}
              onChanged={() => setReload((n) => n + 1)}
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
function ProgramEditor({
  cohort,
  director,
}: {
  cohort: string;
  director: boolean;
}) {
  const auth = director ? "director" : "admin";
  const path = `${auth}/training/program?cohort=${encodeURIComponent(cohort)}`;
  const [program, setProgram] = useState<TrainingProgram | null>(null),
    [reload, setReload] = useState(0),
    [error, setError] = useState(""),
    [action, setAction] = useState(""),
    [initial, setInitial] = useState<Record<string, unknown>>({}),
    [busy, setBusy] = useState(false);
  useEffect(() => {
    let live = true;
    setProgram(null);
    preopRequest<TrainingProgram>(path, {}, auth)
      .then((p) => {
        if (live) {
          setProgram(p);
          setError("");
        }
      })
      .catch((e) => {
        if (live) setError(e.message);
      });
    return () => {
      live = false;
    };
  }, [path, auth, reload]);
  async function save(data: Record<string, unknown>) {
    setBusy(true);
    setError("");
    try {
      const p = await preopRequest<TrainingProgram>(
        path,
        {
          method: "POST",
          body: JSON.stringify({ ...data, action, version: program?.version }),
        },
        auth,
      );
      setProgram(p);
      setAction("");
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <div>
      {error && (
        <p className="preop-error" role="alert">
          {error}
        </p>
      )}
      <Button
        variant="outline"
        disabled={busy}
        onClick={() => {
          setAction("");
          setReload((n) => n + 1);
        }}
      >
        Reload programme
      </Button>
      {program && (
        <>
          <p className="preop-help mt-4">
            Changing the programme requires previously completed trainees to
            reopen and complete the updated programme before approval or
            conversion. Cancel a session to retain its history.
          </p>
          <div className="preop-tabs">
            <Button
              onClick={() => {
                setInitial({});
                setAction("module");
              }}
            >
              Add module
            </Button>
            <Button
              disabled={!program.modules.length}
              onClick={() => {
                setInitial({});
                setAction("session");
              }}
            >
              Schedule session
            </Button>
            <Button
              variant="outline"
              disabled={!program.sessions.some((s) => !s.cancelled)}
              onClick={() => {
                setInitial({});
                setAction("cancel_session");
              }}
            >
              Cancel session
            </Button>
          </div>
          {action && (
            <CommandForm
              key={`${action}-${String(initial.moduleId)}-${String(initial.sessionId)}`}
              initial={initial}
              action={action}
              version={program.version}
              program={program}
              busy={busy}
              onSubmit={save}
              onCancel={() => setAction("")}
              programme
            />
          )}
          <div className="training-module-grid">
            {program.modules.map((m) => (
              <article key={m.id}>
                <span className="preop-kicker">
                  {m.required ? "REQUIRED MODULE" : "OPTIONAL MODULE"}
                </span>
                <h3>{m.title}</h3>
                <p>Trainer: {m.trainer}</p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setInitial({
                      moduleId: m.id,
                      title: m.title,
                      trainer: m.trainer,
                      required: m.required,
                    });
                    setAction("edit_module");
                  }}
                >
                  Edit module
                </Button>
                {program.sessions
                  .filter((s) => s.module_id === m.id)
                  .map((s) => (
                    <div key={s.id} className="training-session">
                      <strong>{s.title}</strong>
                      <p>
                        {new Date(s.starts_at).toLocaleString()} –{" "}
                        {new Date(s.ends_at).toLocaleTimeString()}
                      </p>
                      <p>
                        {s.location} ·{" "}
                        {s.cancelled
                          ? "Cancelled"
                          : s.mandatory
                            ? "Mandatory"
                            : "Optional"}
                      </p>
                      {!s.cancelled && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setInitial({
                              sessionId: s.id,
                              moduleId: s.module_id,
                              title: s.title,
                              startsAt: s.starts_at,
                              endsAt: s.ends_at,
                              location: s.location,
                              mandatory: s.mandatory,
                            });
                            setAction("edit_session");
                          }}
                        >
                          Edit session
                        </Button>
                      )}
                    </div>
                  ))}
              </article>
            ))}
          </div>
          {!program.modules.length && (
            <p className="preop-message">
              No modules yet. Add the cohort’s training pathway to get started.
            </p>
          )}
        </>
      )}
    </div>
  );
}
function TraineeEditor({
  id,
  director,
  onChanged,
}: {
  id: number;
  director: boolean;
  onChanged: () => void;
}) {
  const auth = director ? "director" : "admin";
  const [detail, setDetail] = useState<TrainingDetail | null>(null),
    [reload, setReload] = useState(0),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false),
    [action, setAction] = useState(""),
    [tab, setTab] = useState("progress");
  useEffect(() => {
    let live = true;
    setDetail(null);
    preopRequest<TrainingDetail>(`${auth}/training/${id}`, {}, auth)
      .then((data) => {
        if (live) {
          setDetail(data);
          setError("");
        }
      })
      .catch((e) => {
        if (live) setError(e.message);
      });
    return () => {
      live = false;
    };
  }, [id, auth, reload]);
  async function save(data: Record<string, unknown>) {
    setBusy(true);
    setError("");
    try {
      const result = await preopRequest<TrainingDetail>(
        `${auth}/training/${id}`,
        {
          method: "POST",
          body: JSON.stringify({
            ...data,
            action,
            version: detail?.trainee.version,
          }),
        },
        auth,
      );
      setDetail(result);
      setAction("");
      onChanged();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <div>
      {error && (
        <p role="alert" className="preop-error">
          {error}
        </p>
      )}
      <Button
        variant="outline"
        disabled={busy}
        onClick={() => {
          setAction("");
          setReload((n) => n + 1);
        }}
      >
        Reload record
      </Button>
      {detail && (
        <>
          <div className="preop-review-heading mt-4">
            <h2>{detail.trainee.name}</h2>
            <p>
              {detail.trainee.reference} ·{" "}
              {detail.trainee.branch || "Branch unassigned"} ·{" "}
              {detail.trainee.cohort || "Cohort unassigned"}
            </p>
            <span className="preop-badge">
              {trainingStages[detail.trainee.stage]}
            </span>
          </div>
          <nav className="preop-tabs" aria-label="Trainee sections">
            {["progress", "assessments", "history"].map((t) => (
              <Button
                key={t}
                variant={tab === t ? "default" : "outline"}
                onClick={() => setTab(t)}
              >
                {t}
              </Button>
            ))}
          </nav>
          {detail.trainee.review_program_version !== null &&
            detail.trainee.review_program_version !== detail.program.version &&
            detail.trainee.stage !== "full_member" && (
              <p className="preop-error">
                The cohort programme changed after completion. Extend / reopen
                training and complete the new programme before proceeding.
              </p>
            )}
          <div className="training-actions">
            {availableActions(detail.trainee.stage, director).map((a) => (
              <Button
                disabled={busy}
                variant={a === "convert" ? "default" : "outline"}
                key={a}
                onClick={() => setAction(a)}
              >
                {actionLabels[a]}
              </Button>
            ))}
          </div>
          {action && (
            <CommandForm
              key={`${action}-${detail.trainee.version}`}
              action={action}
              version={detail.trainee.version}
              program={detail.program}
              detail={detail}
              busy={busy}
              onSubmit={save}
              onCancel={() => setAction("")}
            />
          )}
          {tab === "progress" && <TrainingOverview detail={detail} />}{" "}
          {tab === "assessments" && (
            <div className="preop-history">
              {[...detail.assessments].reverse().map((a) => (
                <article key={a.id}>
                  <span className="preop-kicker">
                    {a.kind === "final"
                      ? "FINAL ASSESSMENT"
                      : detail.program.modules.find((m) => m.id === a.module_id)
                          ?.title || "Earlier cohort module"}
                  </span>
                  <h3>{a.score !== null ? `${a.score}%` : a.recommendation}</h3>
                  <p>
                    {new Date(a.created_at).toLocaleString()} · {a.author_id}
                  </p>
                  <p>
                    <strong>Private evidence:</strong> {a.private_evidence}
                  </p>
                  {Object.entries(a.ratings || {}).map(([k, r]) => (
                    <p key={k}>
                      <strong>
                        {k} {r.score}/5:
                      </strong>{" "}
                      {r.evidence}
                    </p>
                  ))}
                  <blockquote>
                    <strong>Shared feedback</strong>
                    <p>{a.feedback}</p>
                  </blockquote>
                </article>
              ))}
              {!detail.assessments.length && (
                <p>No assessments recorded yet.</p>
              )}
            </div>
          )}
          {tab === "history" && (
            <div className="preop-history">
              <h3>Cohort history</h3>
              {detail.enrolments.map((e) => (
                <p key={e.id}>
                  {e.cohort || "Unassigned"} ·{" "}
                  {new Date(e.started_at).toLocaleDateString()} ·{" "}
                  {e.ended_at ? "Ended" : "Current"}
                </p>
              ))}
              {[...detail.events].reverse().map((e) => (
                <article key={e.id}>
                  <strong>
                    {actionLabels[e.action.replace("training_", "")] ||
                      e.action.replace(/_/g, " ")}
                  </strong>
                  <p>
                    {new Date(e.created_at).toLocaleString()} · {e.actor_id}
                  </p>
                  <p>{e.reason}</p>
                  <details>
                    <summary>Recorded change</summary>
                    <pre className="training-audit">
                      {JSON.stringify(
                        { before: e.before_state, after: e.after_state },
                        null,
                        2,
                      )}
                    </pre>
                  </details>
                </article>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
function CommandForm({
  action,
  version,
  program,
  detail,
  programme = false,
  initial = {},
  busy,
  onSubmit,
  onCancel,
}: {
  action: string;
  version: number;
  program: TrainingProgram;
  detail?: TrainingDetail;
  programme?: boolean;
  initial?: Record<string, unknown>;
  busy: boolean;
  onSubmit: (data: Record<string, unknown>) => Promise<void>;
  onCancel: () => void;
}) {
  const cohorts = useVolunteerCohorts();
  const [values, setValues] = useState<Record<string, unknown>>({
    reason: "",
    feedback: "",
    required: true,
    mandatory: true,
    evidenceProvided: false,
    requirementsConfirmed: false,
    arrival: "",
    departure: "",
    cohort: detail?.trainee.cohort || "",
    branch: detail?.trainee.branch || "",
    ...initial,
  });
  const [ratings, setRatings] = useState<
    Record<string, { score: number; evidence: string }>
  >({});
  const change = (key: string, value: unknown) =>
    setValues((v) => ({ ...v, [key]: value }));
  const payload = { ...values, ratings, action, version };
  let validation = "";
  try {
    trainingCommand(payload, programme);
  } catch (e) {
    validation = (e as Error).message;
  }
  function field(key: string, label: string, type = "text", required = true) {
    return (
      <label key={key}>
        {label}
        <input
          type={type}
          required={required}
          maxLength={key === "location" ? 300 : 160}
          value={String(values[key] ?? "")}
          onChange={(e) => {
            let value: unknown = e.target.value;
            if (type === "number")
              value = e.target.value === "" ? "" : Number(e.target.value);
            if (type === "datetime-local")
              value = e.target.value
                ? new Date(e.target.value).toISOString()
                : "";
            change(key, value);
          }}
          {...(type === "datetime-local"
            ? { value: values[key] ? localDate(String(values[key])) : "" }
            : {})}
        />
      </label>
    );
  }
  function select(
    key: string,
    label: string,
    options: { value: string; label: string }[],
    numeric = false,
  ) {
    return (
      <label key={key}>
        {label}
        <select
          value={String(values[key] ?? "")}
          required
          onChange={(e) =>
            change(
              key,
              numeric && e.target.value
                ? Number(e.target.value)
                : e.target.value,
            )
          }
        >
          <option value="">Select…</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </label>
    );
  }
  const options = (items: readonly string[]) =>
    items.map((s) => ({ value: s, label: s.replace(/_/g, " ") }));
  const checkbox = (key: string, label: string) => (
    <label className="training-checkbox" key={key}>
      <input
        type="checkbox"
        checked={values[key] === true}
        onChange={(e) => change(key, e.target.checked)}
      />
      {label}
    </label>
  );
  return (
    <form
      className="training-command"
      onSubmit={(e) => {
        e.preventDefault();
        if (!validation && !busy) void onSubmit({ ...values, ratings });
      }}
    >
      <h3>
        {actionLabels[action] ||
          (
            {
              module: "Add training module",
              edit_module: "Edit module",
              session: "Schedule training session",
              edit_session: "Edit session",
              cancel_session: "Cancel training session",
            } as Record<string, string>
          )[action]}
      </h3>
      <fieldset disabled={busy} className="preop-fieldset">
        {["module", "edit_module"].includes(action) && (
          <>
            {field("title", "Module title")}
            {field("trainer", "Assigned trainer")}
            {checkbox("required", "Required module")}
          </>
        )}
        {["session", "edit_session", "assessment"].includes(action) &&
          select(
            "moduleId",
            "Module",
            program.modules.map((m) => ({
              value: String(m.id),
              label: m.title,
            })),
            true,
          )}
        {["session", "edit_session"].includes(action) && (
          <>
            {field("title", "Session title")}
            {field("startsAt", "Starts at (your local time)", "datetime-local")}
            {field("endsAt", "Ends at (your local time)", "datetime-local")}
            {field("location", "Location or meeting instructions")}
            {checkbox("mandatory", "Mandatory session")}
          </>
        )}
        {["attendance", "cancel_session"].includes(action) &&
          select(
            "sessionId",
            "Session",
            program.sessions
              .filter(
                (s) =>
                  !s.cancelled &&
                  (action !== "attendance" ||
                    new Date(s.starts_at) <= new Date()),
              )
              .map((s) => ({
                value: String(s.id),
                label: `${s.title} · ${new Date(s.starts_at).toLocaleString()}`,
              })),
            true,
          )}
        {action === "assign" && (
          <>
            {select(
              "cohort",
              "Cohort",
              (cohorts.data || []).map((c) => ({
                value: c.name,
                label: c.name,
              })),
            )}
            {select("branch", "Branch", options(trainingBranches))}
            <p className="preop-help">
              Changing cohort retains earlier attendance and assessments. The
              current programme will be assessed separately.
            </p>
          </>
        )}
        {action === "attendance" && (
          <>
            {detail?.attendance.find(
              (a) => a.session_id === values.sessionId,
            ) && (
              <p className="preop-message">
                Current mark:{" "}
                {
                  detail.attendance.find(
                    (a) => a.session_id === values.sessionId,
                  )?.status
                }
                . This correction will preserve the previous mark in history.
                Enter the complete corrected entry.
              </p>
            )}
            {select("status", "Attendance status", options(attendanceStatuses))}
            {field("arrival", "Arrival (optional)", "datetime-local", false)}
            {field(
              "departure",
              "Departure (optional)",
              "datetime-local",
              false,
            )}
            {checkbox("evidenceProvided", "Supporting evidence was reviewed")}
          </>
        )}
        {action === "assessment" && (
          <>
            {field("score", "Score out of 100", "number")}
            <p className="preop-help">
              A new assessment preserves earlier attempts. Scores do not
              automatically pass or fail a trainee.
            </p>
          </>
        )}
        {action === "final_assessment" && (
          <>
            {select(
              "recommendation",
              "Recommendation",
              options(recommendations),
            )}
            <p className="preop-help">
              Rate 1 (poor), 2 (needs improvement), 3 (satisfactory), 4 (good),
              or 5 (excellent). Support every rating with evidence.
            </p>
            {performanceDimensions.map((d) => (
              <div className="preop-rating" key={d}>
                <label>
                  {d}
                  <select
                    value={ratings[d]?.score || ""}
                    onChange={(e) =>
                      setRatings((r) => ({
                        ...r,
                        [d]: {
                          score: Number(e.target.value),
                          evidence: r[d]?.evidence || "",
                        },
                      }))
                    }
                  >
                    <option value="">Not rated</option>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n}>{n}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Evidence for {d}
                  <textarea
                    maxLength={2000}
                    rows={3}
                    value={ratings[d]?.evidence || ""}
                    onChange={(e) =>
                      setRatings((r) => ({
                        ...r,
                        [d]: {
                          score: r[d]?.score || 0,
                          evidence: e.target.value,
                        },
                      }))
                    }
                  />
                </label>
              </div>
            ))}
          </>
        )}
        {["attendance", "assessment", "final_assessment"].includes(action) && (
          <label>
            Feedback visible to the trainee
            {action === "attendance" ? " (optional)" : ""}
            <textarea
              rows={3}
              maxLength={2000}
              value={String(values.feedback || "")}
              onChange={(e) => change("feedback", e.target.value)}
            />
          </label>
        )}
        {action === "complete" && (
          <p className="preop-message">
            Confirm that training is complete based on your review. All required
            modules must have an assessment and mandatory sessions must be
            finished with attendance recorded. There is no minimum score or
            attendance percentage.
          </p>
        )}
        {action === "approve" && (
          <p className="preop-message">
            This records approval for membership. An admin must still review
            applicable requirements and explicitly convert the record.
          </p>
        )}
        {action === "convert" && (
          <>
            <p className="preop-message">
              This creates or links the volunteer account and records full
              membership. Existing identities and matricules are preserved. New
              members receive the next available matricule, with numbers 1–5
              reserved.
            </p>
            {select(
              "department",
              "Department for a new matricule",
              options(trainingDepartments),
            )}
            {field("country", "Country of residence")}
            <label>
              Applicable membership requirements and evidence
              <textarea
                rows={4}
                maxLength={3000}
                value={String(values.requirementsReview || "")}
                onChange={(e) => change("requirementsReview", e.target.value)}
                placeholder="Record the requirements that apply, evidence reviewed, and any exemptions. If none apply, explicitly state that."
              />
            </label>
            {checkbox(
              "requirementsConfirmed",
              "I confirm the applicable requirements are satisfied or explicitly waived, and authorize membership conversion.",
            )}
          </>
        )}
        <label>
          {["attendance", "assessment", "final_assessment"].includes(action)
            ? "Private evidence / reason"
            : "Decision / change reason"}
          <textarea
            rows={3}
            maxLength={3000}
            required
            value={String(values.reason || "")}
            onChange={(e) => change("reason", e.target.value)}
          />
        </label>
        {validation && <p className="preop-field-error">{validation}</p>}
        <div className="preop-form-footer">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={busy || !!validation}>
            {busy
              ? "Saving…"
              : action === "convert"
                ? "Confirm membership conversion"
                : "Save record"}
          </Button>
        </div>
      </fieldset>
    </form>
  );
}
function localDate(iso: string) {
  const d = new Date(iso);
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16);
}
