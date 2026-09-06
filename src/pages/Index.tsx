import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty("--mouse-x", `${x}%`);
      el.style.setProperty("--mouse-y", `${y}%`);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: "Optimum Health Global (OPHEG)",
    slogan: "Healthier People · Healthier Society",
    foundingDate: "2022-11-22",
    areaServed: "Cameroon and Africa",
    url: typeof window !== "undefined" ? window.location.origin : "",
    logo: "/logo-full.png",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kumba",
      addressRegion: "Southwest Region",
      addressCountry: "Cameroon",
    },
  };

  return (
    <>
      <SEO
        title="Optimum Health Global (OPHEG) –Healthier People, Healthier society"
        description="Helping humanity and saving lives through community health, outreach, research, and training across Africa. Book an appointment or chat with our Health AI."
        canonical="/"
        jsonLd={jsonLd}
      />

      <section ref={heroRef} className="bg-hero">
        <div className="container flex min-h-[70vh] flex-col items-center justify-center gap-6 py-16 text-center">
          <img
            src="/logo-full.png"
            alt="Optimum Health Global logo"
            className="h-20 w-20 rounded-full"
            loading="eager"
          />
          <h1 className="display-title text-4xl font-extrabold md:text-6xl">
            Optimum Health Global (OPHEG)
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground md:text-xl">
            Taking health to the communities and ensuring a healthier people and 
            healthier society.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" variant="hero">
              <Link to="/appointments">Book an Appointment</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/health-ai">Chat with Health AI</Link>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Motto: Healthier People · Healthier Society
          </p>
        </div>
      </section>

      <main className="container space-y-20 py-16">
        <section id="mission" className="grid gap-8 md:grid-cols-2">
          <article className="rounded-lg border bg-card p-6 shadow-sm">
            <h2 className="display-title mb-2 text-2xl">Vision</h2>
            <p className="text-muted-foreground">
              Helping Humanity and saving lives from common and endemic
              diseases, coupled with negative health stigmas that puts a threat
              to human lives through identifying, educating, empowering and
              helping the masses make positive health decisions to adopt a
              healthy behavior, thereby attaining health at its optimum.
            </p>
          </article>
          <article className="rounded-lg border bg-card p-6 shadow-sm">
            <h2 className="display-title mb-2 text-2xl">Mission</h2>
            <p className="text-muted-foreground">
              Taking health to the communities and ensuring a healthier people and 
              healthier society.
            </p>
          </article>
        </section>

        <section id="values">
          <h2 className="display-title text-2xl">Our VITAL Core Values</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {[
              {
                title: "Vision",
                desc: "We act with purpose to build a healthier, equitable future.",
              },
              {
                title: "Innovation",
                desc: "We embrace new ideas and technology to expand access and impact.",
              },
              {
                title: "Transparency",
                desc: "We are open, honest, and accountable in every action.",
              },
              {
                title: "Accessibility",
                desc: "We break barriers so essential services reach everyone.",
              },
              {
                title: "Love",
                desc: "We serve with compassion and empathy—humanity first.",
              },
            ].map((v) => (
              <div
                key={v.title}
                className="rounded-lg border bg-card p-5 shadow-sm transition-shadow hover:shadow-[var(--shadow-elegant)]"
              >
                <h3 className="font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="objectives">
          <h2 className="display-title text-2xl">Objectives</h2>
          <ul className="mt-4 grid list-disc gap-2 pl-5 text-muted-foreground md:grid-cols-2">
            {[
              "Global health promotion following the SDG3 goals.",
              "Support of public health and economic policies.",
              "Health research and innovation.",
              "Training health professionals.",
              "Community outreach programs.",
              "Establishment of Health facilities.",
              "Capacity building.",
              "Establishment of a mobile surgical team.",
            ].map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="display-title text-2xl">Executive Committee</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Founder",
              "Director General",
              "DEO",
              "Secretary General",
              "Adviser",
              "Finance",
              "Branch Director",
              "Divisional Officers",
            ].map((role) => (
              <div
                key={role}
                className="rounded-lg border bg-card p-4 text-sm text-muted-foreground"
              >
                {role}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border bg-secondary/20 p-8 text-center">
          <h2 className="display-title text-2xl">
            Ready to take a positive health step?
          </h2>
          <p className="mt-2 text-muted-foreground">
            Book an appointment with our team or get instant guidance from our
            Health AI.
          </p>
          <div className="mt-4 flex justify-center gap-3">
            <Button asChild variant="hero">
              <Link to="/appointments">Book Appointment</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/health-ai">Chat with Health AI</Link>
            </Button>
          </div>
        </section>
      </main>
    </>
  );
};

export default Index;
