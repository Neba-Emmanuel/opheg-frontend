import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import {
  ArrowRight,
  HeartHandshake,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SEO from "@/components/SEO";
import { PORTAL_TOKEN_KEY, portalRequest } from "@/lib/volunteerPortal";
import "./portal.css";

export default function VolunteerLogin() {
  const [linkToken, setLinkToken] = useState(
    () => new URLSearchParams(window.location.hash.slice(1)).get("token") || "",
  );
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const cache = useQueryClient();
  useEffect(() => {
    if (window.location.hash)
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search,
      );
  }, []);
  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      if (linkToken) {
        const result = await portalRequest<{ token: string }>(
          "verify",
          { method: "POST", body: JSON.stringify({ token: linkToken }) },
          false,
        );
        sessionStorage.setItem(PORTAL_TOKEN_KEY, result.token);
        cache.removeQueries({ queryKey: ["volunteer-portal"] });
        navigate("/volunteers", { replace: true });
      } else {
        const result = await portalRequest<{ message: string }>(
          "request-link",
          { method: "POST", body: JSON.stringify({ email }) },
          false,
        );
        setMessage(result.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <main className="vp vp-login">
      <SEO
        title="Volunteer sign in | OPHEG"
        description="Your OPHEG volunteer community"
        noindex
      />
      <section className="vp-login-story vp-pattern">
        <Link to="/" className="vp-login-logo">
          <img src="/logo-full.png" alt="OPHEG" />
        </Link>
        <div className="vp-login-copy">
          <span className="vp-eyebrow">
            <Sparkles size={14} /> PEOPLE. PURPOSE. POSSIBILITY.
          </span>
          <h1>
            Good people.
            <br />
            Great things.
            <br />
            <em>Together.</em>
          </h1>
          <p>
            Your skills have a place. Your voice has a home. Welcome to the
            community bringing health closer to everyone.
          </p>
          <div className="vp-story-badge">
            <HeartHandshake size={30} />
            <span>
              One mission.
              <br />
              <strong>Countless ways to make a difference.</strong>
            </span>
          </div>
        </div>
        <p className="vp-story-footer">
          OPTIMUM HEALTH GLOBAL <span>Taking health to the communities.</span>
        </p>
      </section>
      <section className="vp-login-form">
        <div>
          <span className="vp-icon-tile">
            <HeartHandshake size={25} />
          </span>
          <p className="vp-eyebrow">THE VOLUNTEER COMMUNITY</p>
          <h2>{linkToken ? "You’re one step away." : "Welcome home."}</h2>
          <p>
            {linkToken
              ? "Confirm below to securely open your volunteer portal."
              : "Sign in to keep your profile up to date and connect with the people beside you."}
          </p>
          <form onSubmit={submit}>
            {!linkToken && (
              <label>
                Your volunteer email
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  maxLength={160}
                  required
                  disabled={busy}
                />
              </label>
            )}
            {message && (
              <div className="vp-notice" role="status">
                <Mail size={20} />
                <p>{message}</p>
              </div>
            )}
            {error && (
              <p role="alert" className="vp-error">
                {error}
              </p>
            )}
            <Button
              type="submit"
              disabled={
                busy ||
                (!linkToken && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
              }
            >
              {busy
                ? "Just a moment…"
                : linkToken
                  ? "Open my volunteer portal"
                  : "Email me a sign-in link"}
              <ArrowRight size={17} />
            </Button>
            {linkToken && (
              <button
                type="button"
                className="vp-text-button"
                onClick={() => {
                  setLinkToken("");
                  setError("");
                }}
              >
                Request a new link
              </button>
            )}
          </form>
          <div className="vp-login-assurance">
            <ShieldCheck size={17} />
            <span>
              No password to remember. Your private link expires after 15
              minutes.
            </span>
          </div>
          <p className="vp-login-help">
            Use the email on your existing volunteer record. Need to register
            your details?{" "}
            <Link to="/volunteer-information">Complete your profile</Link>.
          </p>
          <Link to="/" className="vp-back-link">
            ← Back to OPHEG
          </Link>
        </div>
      </section>
    </main>
  );
}
