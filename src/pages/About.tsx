import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MapPin,
  Calendar,
  Eye,
  Target,
  Heart,
  Lightbulb,
  Shield,
  Users,
  Handshake,
  Award,
  BookOpen,
  Globe,
  Quote,
} from "lucide-react";
import {
  useScrollAnimation,
  useStaggeredAnimation,
} from "@/hooks/useScrollAnimation";
import executiveCEO from "@/assets/executive-ceo.jpg";
import executiveDirectorGeneral from "@/assets/executive-director-general.jpg";
import executiveSecretaryGeneral from "@/assets/executive-secretary-general.jpg";
import executiveCFO from "@/assets/executive-cfo.jpg";
import executiveProjectManager from "@/assets/executive-project-manager.jpg";
import executiveCommunications from "@/assets/executive-communications.jpg";
import aboutHeroImg from "@/assets/about-hero.jpg";

const About = () => {
  const { elementRef: detailsRef, isVisible: detailsVisible } =
    useScrollAnimation();
  const { elementRef: storyRef, isVisible: storyVisible } =
    useScrollAnimation();
  const { elementRef: founderRef, isVisible: founderVisible } =
    useScrollAnimation();
  const { elementRef: visionRef, isVisible: visionVisible } =
    useScrollAnimation();
  const { containerRef: valuesRef, visibleItems: visibleValues } =
    useStaggeredAnimation(5, 150);
  const { containerRef: pillarsRef, visibleItems: visiblePillars } =
    useStaggeredAnimation(3, 150);
  const { containerRef: teamRef, visibleItems: visibleTeam } =
    useStaggeredAnimation(10, 100);
  const { elementRef: ctaRef, isVisible: ctaVisible } = useScrollAnimation();

  const coreValues = [
    {
      icon: Award,
      title: "Professionalism",
      description:
        "Upholding integrity, excellence, and standards in every service.",
      color: "text-blue-600",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "Creating new ways to solve health challenges through technology and creativity.",
      color: "text-yellow-600",
    },
    {
      icon: Users,
      title: "Leadership",
      description:
        "Raising future health leaders through mentorship and training.",
      color: "text-emerald-600",
    },
    {
      icon: Globe,
      title: "Accessibility",
      description:
        "Ensuring healthcare, education, and resources reach everyone, everywhere.",
      color: "text-purple-600",
    },
    {
      icon: Shield,
      title: "Resilience",
      description:
        "Standing strong with communities in the face of health challenges.",
      color: "text-red-600",
    },
  ];

  const strategicPillars = [
    {
      icon: Heart,
      title: "Health (SDG 3)",
      description:
        "Community outreach programs for preventable diseases. Diagnostic excellence through the CHN. Campaigns against stigma (sickle cell, HIV, cervical cancer, mental health, etc.).",
      color: "text-red-600",
    },
    {
      icon: BookOpen,
      title: "Education (SDG 4)",
      description:
        "OPHEG Academy (training health professionals and community members). HealthFlix Studios (education through storytelling & entertainment). Scholarships, mentorship, and youth empowerment.",
      color: "text-blue-600",
    },
    {
      icon: Handshake,
      title: "Partnerships (SDG 17)",
      description:
        "Collaborating with NGOs, governments, universities, and international organizations. Creating digital health networks. Building multi-sectoral partnerships for sustainability.",
      color: "text-green-600",
    },
  ];

  const executiveTeam = [
    {
      role: "Founder/Chief Executive Officer",
      image: executiveCEO,
      name: "Leadership Team",
    },
    {
      role: "Director General",
      image: executiveDirectorGeneral,
      name: "Leadership Team",
    },
    {
      role: "Secretary General",
      image: executiveSecretaryGeneral,
      name: "Leadership Team",
    },
    {
      role: "Chief Financial Officer",
      image: executiveCFO,
      name: "Leadership Team",
    },
    {
      role: "Chief Project Manager",
      image: executiveProjectManager,
      name: "Leadership Team",
    },
    {
      role: "Communications Officer",
      image: executiveCommunications,
      name: "Leadership Team",
    },
    {
      role: "Director of Outreaches",
      image: null,
      name: "Leadership Team",
    },
    {
      role: "Auditors",
      image: null,
      name: "Support Team",
    },
    {
      role: "Advisors",
      image: null,
      name: "Advisory Board",
    },
    {
      role: "Human Resource Personnel",
      image: null,
      name: "Support Team",
    },
  ];

  return (
    <>
      <SEO
        title="About OPHEG - Our Vision, Mission & Team"
        description="Learn about Optimum Health Global's mission to transform healthcare in Africa through community outreach, innovation, and compassionate care since 2022."
        canonical="/about"
      />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={aboutHeroImg}
            alt="OPHEG healthcare team - About us hero image"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-accent/60"></div>
        </div>
        <div className="relative z-10 text-center text-white space-y-6 container animate-fade-in">
          <h1 className="display-title text-4xl font-bold md:text-6xl drop-shadow-lg">
            About OPHEG
          </h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            Health, Empowerment, Innovation
          </p>
          <p className="text-lg max-w-4xl mx-auto leading-relaxed drop-shadow-md opacity-90">
            From Silence to Voice, From Barriers to Bridges - Transforming
            healthcare access across Africa through innovative
            community-centered approaches and sustainable health solutions.
          </p>
        </div>
      </section>

      <div className="container py-16 space-y-16">
        {/* Our Story */}
        <section
          ref={storyRef}
          className={`transition-all duration-700 ${
            storyVisible ? "animate-fade-in" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="display-title text-3xl font-bold mb-4">Our Story</h2>
            <p className="text-xl font-semibold text-primary mb-6">
              From Silence to Voice, From Barriers to Bridges
            </p>
          </div>
          <Card className="card-hover">
            <CardContent className="pt-8">
              <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed space-y-6">
                <p>
                  In a world where health remains the greatest wealth, millions
                  still suffer and die from preventable and treatable
                  conditions. Too often, access to healthcare is a privilege
                  instead of a right, and stigma is a silent killer — isolating
                  patients, silencing families, and perpetuating needless loss.
                </p>
                <p>
                  <strong className="text-primary">
                    Optimum Health Global (OPHEG) was born to rewrite this
                    story.
                  </strong>
                </p>
                <p>
                  What began in Meme Division, Southwest Cameroon, as passionate
                  young health professionals walking into communities to raise
                  awareness on cervical cancer, malaria, and sickle cell, has
                  today grown into a dynamic, multi-dimensional health movement.
                </p>
                <p>
                  OPHEG is more than an NGO. It is a health ecosystem — a family
                  of healthcare workers, innovators, survivors, volunteers, and
                  educators united by one heartbeat: to bring health to every
                  community, break stigma, empower people, and ensure that no
                  one is left behind.
                </p>
                <p>
                  We believe that health is not just the absence of disease, but
                  the presence of dignity, knowledge, and empowerment. Our work
                  stretches across diagnostics, outreach, mentorship, research,
                  innovation, and education. From the HealthFlix Studios that
                  uses storytelling to educate, to the DINUP Nursing Project
                  preparing future health leaders, to the Healthbank Digital
                  System bridging gaps in medical access — OPHEG is building
                  solutions that last.
                </p>
                <div className="bg-primary/5 p-6 rounded-lg border-l-4 border-l-primary">
                  <h4 className="font-semibold text-primary mb-3">
                    Our compass is the United Nations Sustainable Development
                    Goals (SDGs):
                  </h4>
                  <ul className="space-y-2">
                    <li>
                      <strong>SDG 3: Good Health and Well-being</strong> → by
                      tackling preventable diseases, improving diagnostics,
                      reducing stigma, and promoting universal access.
                    </li>
                    <li>
                      <strong>SDG 4: Quality Education</strong> → by training
                      nurses, empowering health workers, and using innovative
                      learning tools.
                    </li>
                    <li>
                      <strong>SDG 17: Partnerships for the Goals</strong> → by
                      linking communities, governments, institutions, and
                      international networks to achieve impact together.
                    </li>
                  </ul>
                </div>
                <p>
                  We are futuristic in vision, compassionate in practice, and
                  intentional in every project. OPHEG represents a movement
                  where science meets empathy, technology meets humanity, and
                  innovation meets community needs.
                </p>
                <p className="text-primary font-semibold text-lg">
                  Our promise is bold: To help humanity overcome disease and
                  stigma, to empower people with the right knowledge and
                  choices, and to make optimum health not a dream, but a
                  reality.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Founder's Words */}
        <section
          ref={founderRef}
          className={`transition-all duration-700 ${
            founderVisible ? "animate-fade-in" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center mb-8">
            <h2 className="display-title text-3xl font-bold mb-4">
              Founder's Words
            </h2>
          </div>
          <Card className="card-hover bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20">
            <CardContent className="pt-8">
              <Quote className="h-12 w-12 text-primary mb-6 mx-auto" />
              <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed space-y-4">
                <p className="italic text-lg">
                  "When we started, we had nothing but passion — and a deep
                  conviction that our communities deserved more. We had seen
                  mothers lose children to preventable diseases, youths dying
                  from silence and stigma, and families broken because they
                  lacked access to health information and services.
                </p>
                <p className="italic text-lg">
                  Optimum Health Global was born out of that pain, but also out
                  of hope. Hope that healthcare could be different. Hope that we
                  could use innovation, education, and compassion to bridge
                  gaps. Hope that dignity could be restored to every patient.
                </p>
                <p className="italic text-lg">
                  We are not just an organization — we are a family, a movement,
                  a light for those who feel forgotten.
                </p>
                <p className="italic text-lg">
                  My dream is that one day, health in Africa will no longer be
                  defined by struggle, but by empowerment, innovation, and
                  access. That every child, every family, every community will
                  live in dignity, wellness, and knowledge.
                </p>
                <p className="italic text-lg font-semibold text-primary">
                  This is the heartbeat of OPHEG. Together, we are building
                  healthier people and healthier societies."
                </p>
              </div>
              <div className="text-center mt-8 pt-6 border-t border-primary/20">
                <p className="font-semibold text-primary">
                  — OJ Nathaniel Eben
                </p>
                <p className="text-sm text-muted-foreground">
                  Founder & CEO, Optimum Health Global (OPHEG)
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
        {/* Organization Details */}
        <section
          ref={detailsRef}
          className={`grid gap-8 md:grid-cols-3 transition-all duration-700 ${
            detailsVisible ? "animate-fade-in" : "opacity-0 translate-y-8"
          }`}
        >
          <Card className="card-hover">
            <CardHeader className="text-center">
              <Calendar className="h-12 w-12 mx-auto text-primary mb-4" />
              <CardTitle>Founded</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-2xl font-bold text-primary">
                November 22, 2022
              </p>
              <p className="text-muted-foreground mt-2">
                Establishing our mission
              </p>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardHeader className="text-center">
              <MapPin className="h-12 w-12 mx-auto text-primary mb-4" />
              <CardTitle>Head Office</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="font-semibold">Kumba</p>
              <p className="text-muted-foreground">Meme Division</p>
              <p className="text-muted-foreground">
                Southwest Region, Cameroon
              </p>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardHeader className="text-center">
              <Handshake className="h-12 w-12 mx-auto text-primary mb-4" />
              <CardTitle>Motto</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-xl font-bold text-primary">Clean Health</p>
              <p className="text-xl font-bold text-primary">Clean Society</p>
            </CardContent>
          </Card>
        </section>

        {/* Vision & Mission */}
        <section
          ref={visionRef}
          className={`grid gap-8 md:grid-cols-2 transition-all duration-700 ${
            visionVisible ? "animate-fade-in" : "opacity-0 translate-y-8"
          }`}
        >
          <Card className="card-hover border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-6 w-6 text-primary" />
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed text-muted-foreground">
                Helping Humanity and saving lives from common and endemic
                diseases coupled with negative health stigmas that tend to pose
                a threat to humans, through identifying, educating, innovating,
                empowering and helping the masses make positive health decisions
                thereby, attaining health at its optimum.
              </p>
            </CardContent>
          </Card>

          <Card className="card-hover border-l-4 border-l-accent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-6 w-6 text-accent" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed text-muted-foreground">
                Bringing accessible health to communities through education,
                innovation, and empowerment, building healthier people and
                healthier societies.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* P.I.L.A.R. Core Values */}
        <section>
          <div className="text-center mb-12">
            <h2 className="display-title text-3xl font-bold mb-4">
              Our P.I.L.A.R. Core Values
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              At OPHEG, our values form the P.I.L.A.R. that supports our mission
              to transform lives and communities across Africa.
            </p>
          </div>
          <div
            ref={valuesRef as any}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
          >
            {coreValues.map((value, index) => (
              <Card
                key={value.title}
                className={`card-hover transition-all duration-700 ${
                  visibleValues.includes(index)
                    ? "animate-fade-in animate-scale-in"
                    : "opacity-0 translate-y-8 scale-95"
                }`}
              >
                <CardHeader className="text-center pb-4">
                  <value.icon
                    className={`h-12 w-12 mx-auto mb-3 ${value.color}`}
                  />
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Strategic Pillars */}
        <section>
          <div className="text-center mb-12">
            <h2 className="display-title text-3xl font-bold mb-4">
              Strategic Pillars
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our work is built on three strategic pillars, aligned with the
              United Nations Sustainable Development Goals.
            </p>
          </div>
          <div ref={pillarsRef as any} className="grid gap-8 md:grid-cols-3">
            {strategicPillars.map((pillar, index) => (
              <Card
                key={pillar.title}
                className={`card-hover transition-all duration-700 ${
                  visiblePillars.includes(index)
                    ? "animate-fade-in animate-scale-in"
                    : "opacity-0 translate-y-8 scale-95"
                }`}
              >
                <CardHeader className="text-center">
                  <pillar.icon
                    className={`h-12 w-12 mx-auto mb-3 ${pillar.color}`}
                  />
                  <CardTitle className="text-xl">{pillar.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {pillar.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Executive Committee */}
        <section>
          <div className="text-center mb-12">
            <h2 className="display-title text-3xl font-bold mb-4">
              Executive Committee
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our dedicated leadership team brings together diverse expertise to
              guide OPHEG's mission.
            </p>
          </div>
          <div
            ref={teamRef as any}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {executiveTeam.map((member, index) => (
              <Card
                key={member.role}
                className={`card-hover text-center transition-all duration-700 ${
                  visibleTeam.includes(index)
                    ? "animate-fade-in animate-scale-in"
                    : "opacity-0 translate-y-8 scale-95"
                }`}
              >
                <CardContent className="pt-6">
                  {member.image ? (
                    <div className="h-20 w-20 mx-auto mb-4 rounded-full overflow-hidden">
                      <img
                        src={member.image}
                        alt={`${member.role} at OPHEG`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-20 w-20 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                      <Users className="h-8 w-8 text-primary" />
                    </div>
                  )}
                  <p className="font-medium text-sm">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section
          ref={ctaRef}
          className={`text-center bg-gradient-to-tr from-primary/10 to-accent/10 rounded-2xl p-12 transition-all duration-700 ${
            ctaVisible
              ? "animate-fade-in animate-scale-in"
              : "opacity-0 translate-y-8 scale-95"
          }`}
        >
          <h2 className="display-title text-3xl font-bold mb-4">
            Join Our Mission
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Learn more about our work in communities or discover how you can be
            part of our transformative healthcare initiatives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/our-works"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 rounded-md px-8 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              See Our Work
            </a>
            <a
              href="/get-involved"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 rounded-md px-8 border border-input bg-background hover:bg-accent hover:text-accent-foreground"
            >
              Get Involved
            </a>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
