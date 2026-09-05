/**
 * Site-wide constants used for SEO (canonical URLs, Open Graph, Twitter Cards).
 *
 * The base URL can be overridden per environment via `VITE_SITE_URL`.
 * When you move to a custom domain, set VITE_SITE_URL and everything
 * (canonical tags, OG URLs, sitemap references) stays consistent.
 */
export const SITE_URL = (
  import.meta.env.VITE_SITE_URL || "https://opheg.com"
).replace(/\/+$/, "");

export const SITE_NAME = "Optimum Health Global (OPHEG)";

export const SITE_DESCRIPTION =
  "OPHEG is an African health NGO delivering community care, outreach, training, and appointments. Book a visit or chat with our Health AI.";

/** Default social share image (absolute URL resolved at runtime). */
export const DEFAULT_OG_IMAGE = "/logo.png";

export const TWITTER_HANDLE = "@opheg";

/**
 * Resolve a possibly-relative path to an absolute URL against SITE_URL.
 * Absolute URLs (http/https) are returned unchanged.
 */
export function absoluteUrl(path?: string): string {
  if (!path) return SITE_URL;
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}
