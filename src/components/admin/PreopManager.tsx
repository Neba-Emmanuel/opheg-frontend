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
import { preopRequest, type PreopDetail } from "@/lib/preopApi";
import {
  preopStatuses,
  screeningDimensions,
  validateScreening,
  type ScreeningInput,
} from "@/lib/preopSchema";
import { ApplicationAnswers } from "@/pages/preop/PreopApplication";
interface Directory {
  items: {
    id: number;
    reference: string;
    status: string;
    fullName: string;
    town: string;
  }[];
  total: number;
  counts: { total: number; review: number; accepted: number };
}
const label = (status: string) =>
  status === "draft"
    ? "Corrections requested"
    : preopStatuses[status] || status.replace(/_/g, " ");
export default function PreopManager() {
  const [data, setData] = useState<Directory | null>(null),
    [search, setSearch] = useState(""),
    [status, setStatus] = useState(""),
    [page, setPage] = useState(0),
    [refresh, setRefresh] = useState(0),
    [error, setError] = useState(""),
    [loading, setLoading] = useState(true),
    [selected, setSelected] = useState<number | null>(null);
  useEffect(() => {
    let live = true;
    const controller = new AbortController();
    setLoading(true);
    const timer = setTimeout(() => {
      preopRequest<Directory>(
        `admin/applications?search=${encodeURIComponent(search)}&status=${status}&page=${page}`,
        { signal: controller.signal },
        "admin",
      )
        .then((result) => {
          if (live) {
            setData(result);
            setError("");
          }
        })
        .catch((cause) => {
          if (live) setError(cause.message);
        })
        .finally(() => {
          if (live) setLoading(false);
        });
    }, 250);
    return () => {
      live = false;
      controller.abort();
      clearTimeout(timer);
    };
  }, [search, status, page, refresh]);
  return (
    <div className="preop-admin">
      <div className="preop-metrics">
        {[
          ["Applications received", data?.counts.total],
          ["Awaiting decision", data?.counts.review],
          ["Accepted into PREOP", data?.counts.accepted],
        ].map(([name, value]) => (
          <article key={name}>
            <span>{name}</span>
            <strong>{value ?? "—"}</strong>
          </article>
        ))}
      </div>
      <div className="preop-filters">
        <label>
          Find applicant
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
            }}
            placeholder="Search by name"
          />
        </label>
        <label>
          Status
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(0);
            }}
          >
            <option value="">All statuses</option>
            {Object.keys(preopStatuses).map((s) => (
              <option value={s} key={s}>
                {label(s)}
              </option>
            ))}
          </select>
        </label>
        <Button variant="outline" onClick={() => setRefresh((n) => n + 1)}>
          Refresh
        </Button>
      </div>
      {error && (
        <p role="alert" className="preop-error">
          {error}
        </p>
      )}
      <div className="preop-table-wrap">
        <table className="preop-table">
          <thead>
            <tr>
              <th>Applicant</th>
              <th>Reference</th>
              <th>Town</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {!loading &&
              data?.items.map((item) => (
                <tr key={item.id}>
                  <td>
                    <strong>{item.fullName || "Applicant"}</strong>
                  </td>
                  <td>{item.reference}</td>
                  <td>{item.town}</td>
                  <td>
                    <span className="preop-badge">{label(item.status)}</span>
                  </td>
                  <td>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelected(item.id)}
                    >
                      Review
                    </Button>
                  </td>
                </tr>
              ))}
            {(loading || !data?.items.length) && (
              <tr>
                <td colSpan={5}>
                  {loading ? "Loading applications…" : "No applications found."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="preop-form-footer">
        <span>{data?.total ?? 0} applications</span>
        <Button
          variant="outline"
          disabled={page === 0 || loading}
          onClick={() => setPage((n) => n - 1)}
        >
          Previous
        </Button>
        <span>Page {page + 1}</span>
        <Button
          variant="outline"
          disabled={loading || (page + 1) * 25 >= (data?.total ?? 0)}
          onClick={() => setPage((n) => n + 1)}
        >
          Next
        </Button>
      </div>
      <Dialog
        open={selected !== null}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      >
        <DialogContent className="preop-review-dialog">
          <DialogHeader>
            <DialogTitle>PREOP application review</DialogTitle>
            <DialogDescription>
              Review submitted evidence and record a decision. Acceptance is
              separate from full membership.
            </DialogDescription>
          </DialogHeader>
          {selected !== null && (
            <Review
              key={selected}
              id={selected}
              onChange={() => setRefresh((n) => n + 1)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
function Review({ id, onChange }: { id: number; onChange: () => void }) {
  const [detail, setDetail] = useState<PreopDetail | null>(null),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false),
    [reload, setReload] = useState(0),
    [tab, setTab] = useState("application"),
    [snapshot, setSnapshot] = useState(0),
    [decision, setDecision] = useState("under_review"),
    [reason, setReason] = useState(""),
    [publicMessage, setPublicMessage] = useState(""),
    [cohort, setCohort] = useState(""),
    [ratings, setRatings] = useState<ScreeningInput["ratings"]>({});
  const cohorts = useVolunteerCohorts();
  useEffect(() => {
    let live = true;
    const controller = new AbortController();
    setDetail(null);
    preopRequest<PreopDetail>(`admin/applications/${id}`, { signal: controller.signal }, "admin")
      .then((value) => {
        if (live) {
          setDetail(value);
          setError("");
          setSnapshot(0);
        }
      })
      .catch((cause) => {
        if (live) setError(cause.message);
      });
    return () => {
      live = false;
      controller.abort();
    };
  }, [id, reload]);
  const payload = {
    decision,
    reason,
    publicMessage,
    cohort: cohort || null,
    ratings,
  };
  let validation = "";
  try {
    validateScreening(payload);
  } catch (cause) {
    validation = (cause as Error).message;
  }
  async function submit() {
    if (!detail) return;
    setBusy(true);
    try {
      const result = await preopRequest<PreopDetail>(
        `admin/applications/${id}/screen`,
        {
          method: "POST",
          body: JSON.stringify({ ...payload, version: detail.version }),
        },
        "admin",
      );
      setDetail(result);
      setReason("");
      setPublicMessage("");
      setRatings({});
      setTab("history");
      setError("");
      onChange();
    } catch (cause) {
      setError((cause as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="preop-admin">
      {error && (
        <div role="alert" className="preop-error">
          {error}
          <Button variant="outline" onClick={() => setReload((n) => n + 1)}>
            Reload record
          </Button>
        </div>
      )}
      {detail ? (
        <>
          <div className="preop-review-heading">
            <h2>{String(detail.answers.fullName)}</h2>
            <p>
              {detail.email} · {detail.reference}
            </p>
            <span className="preop-badge">{label(detail.status)}</span>
            <small>Permanent person ID: {detail.person_id}</small>
            {detail.volunteer && (
              <p>Existing volunteer: {detail.volunteer.volunteer_id}</p>
            )}
          </div>
          <nav className="preop-tabs" aria-label="Review sections">
            {["application", "screening", "history"].map((t) => (
              <Button
                key={t}
                variant={tab === t ? "default" : "outline"}
                onClick={() => setTab(t)}
              >
                {t}
              </Button>
            ))}
          </nav>
          {tab === "application" && (
            <>
              <label>
                Submitted version
                <select
                  value={snapshot}
                  onChange={(e) => setSnapshot(Number(e.target.value))}
                >
                  {detail.submissions.map((s, i) => (
                    <option key={s.id} value={i}>
                      Version {s.version} ·{" "}
                      {new Date(s.submitted_at).toLocaleString()}
                    </option>
                  ))}
                </select>
              </label>
              <ApplicationAnswers
                answers={
                  detail.submissions[snapshot]?.answers || detail.answers
                }
              />
            </>
          )}
          {tab === "screening" &&
            (["submitted", "under_review", "waitlisted", "rejected"].includes(
              detail.status,
            ) ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  void submit();
                }}
              >
                <fieldset disabled={busy} className="preop-fieldset">
                  <label>
                    Decision
                    <select
                      value={decision}
                      onChange={(e) => setDecision(e.target.value)}
                    >
                      {[
                        "under_review",
                        "request_correction",
                        ...(detail.status === "rejected"
                          ? []
                          : [
                              "waitlisted",
                              "accepted",
                              "accepted_observation",
                              "rejected",
                            ]),
                      ].map((s) => (
                        <option key={s} value={s}>
                          {label(s)}
                        </option>
                      ))}
                    </select>
                  </label>
                  <p className="preop-help">
                    Scores support a human decision. Use 1 (limited evidence)
                    through 5 (strong evidence); explain each rating. Final
                    decisions require all three dimensions.
                  </p>
                  {screeningDimensions.map((d) => (
                    <div className="preop-rating" key={d}>
                      <label>
                        {d}
                        <select
                          value={ratings[d]?.score || ""}
                          onChange={(e) =>
                            setRatings((old) => ({
                              ...old,
                              [d]: {
                                score: Number(e.target.value),
                                evidence: old[d]?.evidence || "",
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
                        Evidence from the application
                        <textarea
                          rows={3}
                          maxLength={2000}
                          value={ratings[d]?.evidence || ""}
                          onChange={(e) =>
                            setRatings((old) => ({
                              ...old,
                              [d]: {
                                score: old[d]?.score || 0,
                                evidence: e.target.value,
                              },
                            }))
                          }
                        />
                      </label>
                    </div>
                  ))}
                  <label>
                    Private reviewer reason
                    <textarea
                      required
                      rows={4}
                      maxLength={3000}
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                    />
                  </label>
                  <label>
                    Message visible to the applicant
                    <textarea
                      required
                      rows={3}
                      maxLength={1500}
                      value={publicMessage}
                      onChange={(e) => setPublicMessage(e.target.value)}
                    />
                  </label>
                  {["accepted", "accepted_observation"].includes(decision) && (
                    <label>
                      Training cohort (optional)
                      <select
                        value={cohort}
                        onChange={(e) => setCohort(e.target.value)}
                      >
                        <option value="">Not assigned yet</option>
                        {cohorts.data?.map((c) => (
                          <option key={c.number}>{c.name}</option>
                        ))}
                      </select>
                      {cohorts.isError && (
                        <small>
                          Could not load cohorts. Retry before assigning one.
                        </small>
                      )}
                    </label>
                  )}
                  <p className="preop-help">
                    This decision and its evidence become a permanent record.
                  </p>
                  {validation && (
                    <p className="preop-field-error">{validation}</p>
                  )}
                  <Button type="submit" disabled={busy || !!validation}>
                    {busy ? "Saving…" : "Record decision"}
                  </Button>
                </fieldset>
              </form>
            ) : (
              <p className="preop-message">
                {detail.status === "draft"
                  ? "Waiting for the applicant to correct and resubmit. Earlier submissions remain available."
                  : "Screening is closed for this application."}
              </p>
            ))}
          {tab === "history" && (
            <div className="preop-history">
              {detail.reviews.map((r) => (
                <article key={`r${r.id}`}>
                  <span className="preop-kicker">
                    SCREENING · {new Date(r.created_at).toLocaleString()}
                  </span>
                  <h3>{label(r.decision)}</h3>
                  <p>
                    <strong>Reviewer:</strong> {r.author_id}
                  </p>
                  <p>
                    <strong>Private reason:</strong> {r.reason}
                  </p>
                  {Object.entries(r.ratings).map(([key, value]) => (
                    <p key={key}>
                      <strong>
                        {key}: {value.score}/5
                      </strong>{" "}
                      — {value.evidence}
                    </p>
                  ))}
                  <blockquote>
                    <strong>Applicant message</strong>
                    <p>{r.public_message}</p>
                  </blockquote>
                </article>
              ))}
              <h3>Audit trail</h3>
              {detail.events.map((e) => (
                <article key={`e${e.id}`}>
                  <strong>{label(e.action)}</strong>
                  <p>
                    {new Date(e.created_at).toLocaleString()} · {e.actor_type} ·{" "}
                    {e.actor_id}
                  </p>
                  <p>
                    {String(e.before_state?.status || "Started")} →{" "}
                    {String(e.after_state?.status || "")}
                  </p>
                  {e.reason && <p>{e.reason}</p>}
                </article>
              ))}
            </div>
          )}
        </>
      ) : (
        !error && <p role="status">Loading record…</p>
      )}
    </div>
  );
}
