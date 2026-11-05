import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { preopRequest } from "@/lib/preopApi";
import { trainingStages } from "@/lib/preopTrainingSchema";
import type { TrainingDetail } from "@/lib/preopTraining";
export function TrainingOverview({ detail }: { detail: TrainingDetail }) {
  const { program, summary, attendance, assessments, membership } = detail;
  return (
    <div className="training-overview">
      {membership && (
        <div className="training-membership">
          <span className="preop-kicker">FULL OPHEGMITE</span>
          <h3>{membership.matricule}</h3>
          <p>
            Membership recorded on{" "}
            {new Date(membership.created_at).toLocaleDateString()}.
          </p>
          <a href="/volunteers/login">Open volunteer login →</a>
        </div>
      )}
      <div className="preop-metrics">
        <article>
          <span>Required modules assessed</span>
          <strong>
            {summary.assessedModules}/{summary.requiredModules}
          </strong>
        </article>
        <article>
          <span>Attendance</span>
          <strong>
            {summary.attendancePercent === null
              ? "—"
              : `${summary.attendancePercent}%`}
          </strong>
        </article>
        <article>
          <span>Average recorded score</span>
          <strong>
            {summary.averageScore === null ? "—" : `${summary.averageScore}%`}
          </strong>
        </article>
      </div>
      <p className="preop-help">
        Attendance covers completed mandatory sessions: present, late and left
        early count as attended; excused sessions are excluded. Unmarked
        sessions count as missed until recorded. Scores and attendance inform a
        human decision; they do not automatically determine membership.
      </p>
      {(summary.unmarked > 0 || summary.upcoming > 0) && (
        <p className="preop-message">
          {summary.unmarked} mandatory session(s) awaiting attendance ·{" "}
          {summary.upcoming} upcoming mandatory session(s)
        </p>
      )}
      <h3 className="training-section-title">Training modules</h3>
      <div className="training-module-grid">
        {program.modules.map((m) => {
          const assessment = [...assessments]
            .reverse()
            .find((a) => a.module_id === m.id);
          return (
            <article key={m.id}>
              <span className="preop-kicker">
                {m.required ? "REQUIRED" : "OPTIONAL"}
              </span>
              <h3>{m.title}</h3>
              <p>Trainer: {m.trainer}</p>
              <span className="preop-badge">
                {assessment
                  ? `Assessed · ${assessment.score}%`
                  : "Assessment pending"}
              </span>
              {assessment?.feedback && (
                <p className="training-feedback">{assessment.feedback}</p>
              )}
            </article>
          );
        })}
      </div>
      {!program.modules.length && (
        <p className="preop-help">
          The cohort’s programme has not been scheduled yet.
        </p>
      )}
      <h3 className="training-section-title">Sessions & attendance</h3>
      <div className="preop-table-wrap">
        <table className="preop-table">
          <thead>
            <tr>
              <th>Session</th>
              <th>When & where</th>
              <th>Attendance</th>
            </tr>
          </thead>
          <tbody>
            {program.sessions.map((s) => {
              const mark = attendance.find((a) => a.session_id === s.id);
              return (
                <tr key={s.id}>
                  <td>
                    <strong>{s.title}</strong>
                    <small className="training-subtext">
                      {s.cancelled
                        ? "Cancelled"
                        : s.mandatory
                          ? "Mandatory"
                          : "Optional"}
                    </small>
                  </td>
                  <td>
                    {new Date(s.starts_at).toLocaleString()}
                    <small className="training-subtext">{s.location}</small>
                  </td>
                  <td>
                    {mark?.status.replace(/_/g, " ") ||
                      (s.cancelled ? "—" : "Not recorded")}
                    {mark?.arrival && (
                      <small className="training-subtext">
                        Arrived {new Date(mark.arrival).toLocaleTimeString()}
                      </small>
                    )}
                    {mark?.departure && (
                      <small className="training-subtext">
                        Left {new Date(mark.departure).toLocaleTimeString()}
                      </small>
                    )}
                    {mark?.feedback && (
                      <p className="training-feedback">{mark.feedback}</p>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <h3 className="training-section-title">Assessment feedback</h3>
      <div className="preop-history">
        {[...assessments].reverse().map((a) => (
          <article key={a.id}>
            <strong>
              {a.kind === "final"
                ? "Final assessment"
                : program.modules.find((m) => m.id === a.module_id)?.title ||
                  "Earlier cohort assessment"}
            </strong>
            <p>
              {new Date(a.created_at).toLocaleString()}
              {a.score !== null ? ` · ${a.score}%` : ""}
            </p>
            <p>{a.feedback}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
export default function TrainingProgress({
  onMembership,
}: {
  onMembership?: (member: boolean) => void;
}) {
  const [detail, setDetail] = useState<TrainingDetail | null>(null),
    [loading, setLoading] = useState(true),
    [error, setError] = useState(""),
    [reload, setReload] = useState(0);
  useEffect(() => {
    let live = true;
    setLoading(true);
    preopRequest<TrainingDetail | null>("training")
      .then((data) => {
        if (live) {
          setDetail(data);
          setError("");
          onMembership?.(!!data?.membership);
        }
      })
      .catch((e) => {
        if (live) setError(e.message);
      })
      .finally(() => {
        if (live) setLoading(false);
      });
    return () => {
      live = false;
    };
  }, [reload, onMembership]);
  return (
    <section className="preop-admin training-personal">
      <div className="preop-workspace-top">
        <div>
          <span className="preop-kicker">YOUR DEVELOPMENT</span>
          <h2>Training & membership</h2>
        </div>
        <Button
          variant="outline"
          disabled={loading}
          onClick={() => setReload((n) => n + 1)}
        >
          Refresh training
        </Button>
      </div>
      {loading ? (
        <p role="status">Loading your training record…</p>
      ) : error ? (
        <p role="alert" className="preop-error">
          {error}
        </p>
      ) : detail ? (
        <>
          <p className="preop-message">
            <strong>{trainingStages[detail.trainee.stage]}</strong>
            <br />
            {detail.trainee.cohort || "Cohort assignment pending"} ·{" "}
            {detail.trainee.branch || "Branch assignment pending"}
          </p>
          <TrainingOverview detail={detail} />
        </>
      ) : (
        <p className="preop-help">
          Your training record becomes available after PREOP acceptance.
        </p>
      )}
    </section>
  );
}
