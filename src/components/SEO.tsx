import { useEffect } from "react";
import {
  SITE_NAME,
  TWITTER_HANDLE,
  DEFAULT_OG_IMAGE,
  absoluteUrl,
} from "@/config/site";

type SEOProps = {
  title: string;
  description?: string;
  /** Canonical path or URL. Relative paths are resolved against the site base. Defaults to the current location. */
  canonical?: string;
  /** Social share image path or URL. Defaults to the site logo. */
  image?: string;
  /** Open Graph type, e.g. "website" or "article". Defaults to "website". */
  type?: string;
  /** When true, adds a noindex,nofollow robots directive (e.g. for admin pages). */
  noindex?: boolean;
  jsonLd?: Record<string, any> | Record<string, any>[];
};

const setOrCreateMeta = (
  key: "name" | "property",
  identifier: string,
  content: string
) => {
  if (!content) return;
  let el = document.head.querySelector(
    `meta[${key}='${identifier}']`
  ) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(key, identifier);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const setOrCreateLink = (rel: string, href: string) => {
  let link = document.head.querySelector(
    `link[rel='${rel}']`
  ) as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", rel);
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
};

const SEO = ({
  title,
  description,
  canonical,
  image,
  type = "website",
  noindex = false,
  jsonLd,
}: SEOProps) => {
  useEffect(() => {
    // Resolve canonical to an absolute URL (fall back to the current path).
    const currentPath =
      typeof window !== "undefined"
        ? window.location.pathname + window.location.search
        : "/";
    const canonicalUrl = absoluteUrl(canonical || currentPath);
    const imageUrl = absoluteUrl(image || DEFAULT_OG_IMAGE);

    document.title = title;

    if (description) setOrCreateMeta("name", "description", description);

    // Robots
    setOrCreateMeta(
      "name",
      "robots",
      noindex ? "noindex, nofollow" : "index, follow"
    );

    // Open Graph
    setOrCreateMeta("property", "og:title", title);
    if (description) setOrCreateMeta("property", "og:description", description);
    setOrCreateMeta("property", "og:type", type);
    setOrCreateMeta("property", "og:url", canonicalUrl);
    setOrCreateMeta("property", "og:site_name", SITE_NAME);
    setOrCreateMeta("property", "og:image", imageUrl);

    // Twitter Card
    setOrCreateMeta("name", "twitter:card", "summary_large_image");
    setOrCreateMeta("name", "twitter:site", TWITTER_HANDLE);
    setOrCreateMeta("name", "twitter:title", title);
    if (description) setOrCreateMeta("name", "twitter:description", description);
    setOrCreateMeta("name", "twitter:image", imageUrl);

    // Canonical
    setOrCreateLink("canonical", canonicalUrl);

    // JSON-LD structured data
    const id = "seo-jsonld";
    const existing = document.getElementById(id);
    if (existing) existing.remove();
    if (jsonLd) {
      const script = document.createElement("script");
      script.id = id;
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
  }, [title, description, canonical, image, type, noindex, jsonLd]);

  return null;
};

export default SEO;
