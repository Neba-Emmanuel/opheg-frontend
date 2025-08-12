import { useEffect } from "react";

type SEOProps = {
  title: string;
  description?: string;
  canonical?: string;
  jsonLd?: Record<string, any> | Record<string, any>[];
};

const setOrCreateMeta = (key: "name" | "property", identifier: string, content: string) => {
  if (!content) return;
  let el = document.head.querySelector(`meta[${key}='${identifier}']`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(key, identifier);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const SEO = ({ title, description, canonical, jsonLd }: SEOProps) => {
  useEffect(() => {
    document.title = title;
    if (description) setOrCreateMeta("name", "description", description);
    setOrCreateMeta("property", "og:title", title);
    if (description) setOrCreateMeta("property", "og:description", description);

    if (canonical) {
      let link = document.head.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", canonical);
    }

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
  }, [title, description, canonical, jsonLd]);

  return null;
};

export default SEO;
