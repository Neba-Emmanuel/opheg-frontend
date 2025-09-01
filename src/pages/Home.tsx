import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";
import {
  Heart,
  Users,
  Shield,
  Stethoscope,
  Globe,
  TrendingUp,
} from "lucide-react";
import communityOutreachImg from "@/assets/outreach.jpg";
import heroHomeImg from "@/assets/home-hero.jpg";
import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/useScrollAnimation";

const Home = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Scroll animation hooks
  const { elementRef: statsRef, isVisible: statsVisible } = useScrollAnimation();
  const { elementRef: servicesRef, isVisible: servicesVisible } = useScrollAnimation();
  const { elementRef: impactRef, isVisible: impactVisible } = useScrollAnimation();
  const { containerRef: statsContainerRef, visibleItems: visibleStats } = useStaggeredAnimation(4, 150);

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
    setIsVisible(true);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  const stats = [
    { number: "5000+", label: "Lives Impacted", icon: Heart },
    { number: "50+", label: "Communities Served", icon: Users },
    {
      number: "100+",
      label: "Health Professionals Trained",
      icon: Stethoscope,
    },
    { number: "20+", label: "Health Facilities", icon: Shield },
  ];

  const services = [
    // {
    //   icon: Stethoscope,
    //   title: "Medical Consultations",
    //   description:
    //     "Expert healthcare consultations from qualified professionals",
    // },
    {
      icon: Heart,
      title: "Community Outreach",
      description:
        "Bringing healthcare directly to rural and underserved communities",
    },
    {
      icon: Globe,
      title: "Health Education",
      description:
        "Comprehensive health education and disease prevention programs",
    },
    {
      icon: TrendingUp,
      title: "Research & Innovation",
      description:
        "Advancing healthcare through research and technological innovation",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: "Optimum Health Global (OPHEG)",
    slogan: "Clean health · Clean society",
    foundingDate: "2022-11-22",
    areaServed: "Cameroon and Africa",
    url: typeof window !== "undefined" ? window.location.origin : "",
    logo: "/logo.png",
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
        title="Optimum Health Global (OPHEG) – Clean Health, Clean Society"
        description="Helping humanity and saving lives through community health, outreach, research, and training across Africa. Book an appointment or chat with our Health AI."
        canonical="/"
        jsonLd={jsonLd}
      />

      <section
        ref={heroRef}
        className="relative overflow-hidden min-h-[80vh]"
        style={{
          backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.7), rgba(59, 130, 246, 0.8)), url(${heroHomeImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container flex min-h-[80vh] flex-col items-center justify-center gap-8 py-16 text-center relative z-10">
          <div className={`floating-element transform transition-all duration-1000 ${isVisible ? "animate-scale-in" : "opacity-0"}`}>
            <img
              src="/logo.png"
              alt="Optimum Health Global logo"
              className="h-24 w-24 rounded-full shadow-lg animate-pulse-glow"
              loading="eager"
            />
          </div>
          <div
            className={`space-y-4 transform transition-all duration-700 ${isVisible ? "animate-fade-in stagger-1" : "opacity-0 translate-y-10"}`}
          >
            <h1 className="display-title text-4xl font-extrabold md:text-6xl lg:text-7xl text-white animate-gradient-shift bg-gradient-to-r from-white via-blue-100 to-white bg-[length:200%_100%]">
              Optimum Health Global
            </h1>
            <p className="text-lg text-white/90 font-medium animate-bounce-subtle">OPHEG</p>
          </div>
          <p
            className={`max-w-3xl text-lg text-white/90 md:text-xl leading-relaxed transform transition-all duration-700 ${
              isVisible ? "animate-fade-in stagger-2" : "opacity-0 translate-y-10"
            }`}
          >
            Taking health to the communities and ensuring a clean health and
            clean society across Africa.
          </p>
          <div
            className={`flex flex-col gap-4 sm:flex-row transform transition-all duration-700 ${
              isVisible ? "animate-fade-in stagger-3" : "opacity-0 translate-y-10"
            }`}
          >
            <Button
              asChild
              size="lg"
              variant="hero"
              className="text-lg px-8 py-4 btn-hover press-effect transform hover:scale-110 transition-all duration-300 animate-heartbeat"
            >
              <Link to="/appointments">Book an Appointment</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-lg px-8 py-4 btn-hover press-effect transform hover:scale-110 transition-all duration-300 hover:animate-shake"
            >
              <Link to="/health-ai">Chat with Health AI</Link>
            </Button>
          </div>
          <p
            className={`text-sm text-white/80 italic transform transition-all duration-700 ${
              isVisible ? "animate-fade-in stagger-4" : "opacity-0 translate-y-10"
            }`}
          >
            Motto: Clean health · Clean society
          </p>
        </div>
      </section>

      <main className="container space-y-24 py-20">
        {/* Statistics Section */}
        <section ref={statsRef as any} className={`text-center transform transition-all duration-1000 ${statsVisible ? 'animate-fade-in' : 'opacity-0 translate-y-20'}`}>
          <h2 className="display-title text-3xl font-bold mb-4 animate-gradient-shift bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] bg-clip-text text-transparent">Our Impact</h2>
          <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
            Making a real difference in communities across Africa through
            dedicated healthcare services.
          </p>
          <div ref={statsContainerRef as any} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`card-hover rounded-xl bg-card p-8 shadow-sm transform transition-all duration-700 ${
                  visibleStats.includes(index) ? 'animate-scale-in opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <stat.icon className={`h-12 w-12 mx-auto mb-4 text-primary transition-all duration-500 ${visibleStats.includes(index) ? 'animate-bounce-subtle' : ''}`} />
                <div className={`text-3xl font-bold text-primary transition-all duration-700 ${visibleStats.includes(index) ? 'counter-animation' : ''}`}>
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Services Section */}
        <section ref={servicesRef as any} className={`transform transition-all duration-1000 ${servicesVisible ? 'animate-fade-in' : 'opacity-0 translate-y-20'}`}>
          <div className="text-center mb-12">
            <h2 className="display-title text-3xl font-bold mb-4 animate-gradient-shift bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] bg-clip-text text-transparent">
              Our Services
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive healthcare solutions designed to meet the unique
              needs of African communities.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <div
                key={service.title}
                className={`card-hover rounded-xl bg-card p-6 shadow-sm transform transition-all duration-700 hover:rotate-1 ${
                  servicesVisible ? `animate-slide-in-up stagger-${index + 1}` : 'opacity-0 translate-y-10'
                }`}
              >
                <service.icon className="h-10 w-10 text-primary mb-4 animate-float" />
                <h3 className="font-semibold mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Community Impact Section */}
        <section ref={impactRef as any} className={`grid gap-12 md:grid-cols-2 items-center transform transition-all duration-1000 ${impactVisible ? 'animate-fade-in' : 'opacity-0 translate-y-20'}`}>
          <div className={`space-y-6 transform transition-all duration-700 ${impactVisible ? 'animate-slide-in-left' : 'opacity-0 -translate-x-10'}`}>
            <h2 className="display-title text-3xl font-bold animate-gradient-shift bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] bg-clip-text text-transparent">
              Transforming Communities
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Since our founding in November 2022, OPHEG has been at the
              forefront of community healthcare transformation. We bring
              essential medical services directly to underserved communities,
              breaking down barriers to healthcare access.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our comprehensive approach includes mobile surgical teams, health
              education programs, and sustainable facility development to ensure
              lasting positive impact.
            </p>
            <div className="flex gap-4">
              <Button asChild variant="default" className="btn-hover press-effect transform hover:scale-105 transition-all duration-300">
                <Link to="/about">Learn More About Us</Link>
              </Button>
              <Button asChild variant="outline" className="btn-hover press-effect transform hover:scale-105 transition-all duration-300">
                <Link to="/our-works">See Our Work</Link>
              </Button>
            </div>
          </div>
          <div className={`card-hover transform transition-all duration-700 hover:rotate-2 ${impactVisible ? 'animate-slide-in-right' : 'opacity-0 translate-x-10'}`}>
            <img
              src={communityOutreachImg}
              alt="OPHEG community health outreach"
              className="rounded-xl shadow-lg w-full h-[400px] object-cover animate-pulse-glow"
            />
          </div>
        </section>

        {/* Call to Action */}
        <section className="rounded-2xl bg-gradient-to-tr from-primary/10 to-accent/10 p-12 text-center transform transition-all duration-1000 hover:scale-105 animate-gradient-shift">
          <h2 className="display-title text-3xl font-bold mb-4 animate-bounce-subtle">
            Ready to Make a Difference?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join us in our mission to bring quality healthcare to every
            community. Whether you need medical care or want to contribute to
            our cause, we're here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="hero" className="btn-hover press-effect transform hover:scale-110 transition-all duration-300 animate-pulse-glow">
              <Link to="/appointments">Schedule Your Appointment</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="btn-hover press-effect transform hover:scale-110 transition-all duration-300 hover:animate-shake">
              <Link to="/get-involved">Get Involved</Link>
            </Button>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
