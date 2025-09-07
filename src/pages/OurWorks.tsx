import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Globe,
  Building,
  Microscope,
  GraduationCap,
  Users,
  Hospital,
  TrendingUp,
  Truck,
  Heart,
  Target,
  BookOpen,
  Stethoscope,
} from "lucide-react";
import {
  useScrollAnimation,
  useStaggeredAnimation,
} from "@/hooks/useScrollAnimation";
import mobileSurgicalTeamImg from "@/assets/mobile-surgical-team.jpg";
import medicalTrainingImg from "@/assets/medical-training.jpg";
import healthFacilityImg from "@/assets/health-facility.jpg";
import communityOutreachImg from "@/assets/outreach.jpg";
import ourWorksHeroImg from "@/assets/home-hero.jpg";

const OurWorks = () => {
  const { containerRef: impactRef, visibleItems: visibleImpact } =
    useStaggeredAnimation(5, 120);
  const { containerRef: objectivesRef, visibleItems: visibleObjectives } =
    useStaggeredAnimation(8, 100);
  const { containerRef: programsRef, visibleItems: visiblePrograms } =
    useStaggeredAnimation(4, 150);
  const { containerRef: flagshipRef, visibleItems: visibleFlagship } =
    useStaggeredAnimation(5, 130);
  const { elementRef: successRef, isVisible: successVisible } =
    useScrollAnimation();

  const objectives = [
    {
      icon: Globe,
      title: "Global Health Promotion",
      description:
        "Following the SDG3 goals to ensure healthy lives and promote well-being for all at all ages.",
      color: "bg-blue-100 text-blue-700",
      category: "Global Impact",
    },
    {
      icon: Building,
      title: "Public Health Policy Support",
      description:
        "Supporting public health and economic policies that create sustainable healthcare systems.",
      color: "bg-green-100 text-green-700",
      category: "Policy",
    },
    {
      icon: Microscope,
      title: "Health Research & Innovation",
      description:
        "Advancing medical knowledge through cutting-edge research and innovative healthcare solutions.",
      color: "bg-purple-100 text-purple-700",
      category: "Research",
    },
    {
      icon: GraduationCap,
      title: "Training Health Professionals",
      description:
        "Building capacity through comprehensive training programs for healthcare workers.",
      color: "bg-orange-100 text-orange-700",
      category: "Education",
    },
    {
      icon: Users,
      title: "Community Outreach Programs",
      description:
        "Bringing healthcare directly to underserved communities across Africa.",
      color: "bg-rose-100 text-rose-700",
      category: "Community",
    },
    {
      icon: Hospital,
      title: "Health Facilities Establishment",
      description:
        "Building and establishing modern healthcare facilities in underserved areas.",
      color: "bg-cyan-100 text-cyan-700",
      category: "Infrastructure",
    },
    {
      icon: TrendingUp,
      title: "Capacity Building",
      description:
        "Strengthening healthcare systems through strategic capacity building initiatives.",
      color: "bg-indigo-100 text-indigo-700",
      category: "Development",
    },
    {
      icon: Truck,
      title: "Mobile Surgical Team",
      description:
        "Providing essential surgical services through our mobile surgical units.",
      color: "bg-emerald-100 text-emerald-700",
      category: "Mobile Care",
    },
  ];

  const programs = [
    // {
    //   title: "Mobile Surgical Program",
    //   description:
    //     "Our mobile surgical teams bring life-saving procedures directly to remote communities.",
    //   image: mobileSurgicalTeamImg,
    //   stats: "50+ surgeries performed",
    //   features: [
    //     "Emergency procedures",
    //     "Specialized equipment",
    //     "Trained surgical teams",
    //     "Post-operative care",
    //   ],
    // },
    {
      title: "Health Flix",
      description:
        "Comprehensive training programs for healthcare workers across Cameroon.",
      image: medicalTrainingImg,
      stats: "100+ professionals trained",
      features: [
        "Modern curriculum",
        "Hands-on practice",
        "Certification programs",
        "Continuing education",
      ],
    },
    {
      title: "Diagnostic Center",
      description: "Established a modern healthcare facility in the community.",
      image: healthFacilityImg,
      // stats: "20+ facilities established",
      features: [
        "Primary healthcare",
        "Preventive services",
        "Health education",
        "Research & Innovation",
        "Community wellness",
      ],
    },
    {
      title: "Outreach Initiatives",
      description:
        "Regular community health outreach programs promoting preventive care.",
      image: communityOutreachImg,
      stats: "5,000+ people reached",
      features: [
        "Health screenings",
        "Vaccination campaigns",
        "Health education",
        "Disease prevention",
      ],
    },
  ];

  const impact = [
    { number: "50+", label: "Communities Served", icon: Users },
    { number: "5,000+", label: "Lives Impacted", icon: Heart },
    {
      number: "100+",
      label: "Healthcare Workers Trained",
      icon: GraduationCap,
    },
    { number: "50+", label: "Surgical Procedures", icon: Stethoscope },
    { number: "15+", label: "Research Projects", icon: Microscope },
  ];

  return (
    <>
      <SEO
        title="Our Work - OPHEG Programs and Impact"
        description="Discover OPHEG's comprehensive healthcare programs including mobile surgical teams, community outreach, health facility development, and professional training across Africa."
        canonical="/our-works"
      />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={ourWorksHeroImg}
            alt="OPHEG healthcare team in action - Our work hero image"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-accent/60"></div>
        </div>
        <div className="relative z-10 text-center text-white space-y-6 container animate-fade-in">
          <h1 className="display-title text-4xl font-bold md:text-6xl drop-shadow-lg">
            Our Work
          </h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            Transforming healthcare delivery across Africa through innovative
            programs, community engagement, and sustainable development
            initiatives.
          </p>
        </div>
      </section>

      <div className="container py-16 space-y-16">
        {/* Impact Statistics */}
        {/* <section>
          <div className="text-center mb-12">
            <h2 className="display-title text-3xl font-bold mb-4">
              Our Impact
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Measurable results from our commitment to improving healthcare
              access and quality.
            </p>
          </div>
          <div ref={impactRef as any} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {impact.map((stat, index) => (
              <Card
                key={stat.label}
                className={`card-hover text-center transition-all duration-700 ${visibleImpact.includes(index) ? 'animate-fade-in animate-scale-in' : 'opacity-0 translate-y-8 scale-95'}`}
              >
                <CardContent className="pt-6">
                  <stat.icon className="h-8 w-8 mx-auto mb-3 text-primary" />
                  <div className="text-2xl font-bold text-primary counter-animation">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section> */}

        {/* Core Objectives */}
        <section>
          <div className="text-center mb-12">
            <h2 className="display-title text-3xl font-bold mb-4">
              Our Core Objectives
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Strategic objectives aligned with global health goals and local
              community needs.
            </p>
          </div>
          <div
            ref={objectivesRef as any}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {objectives.map((objective, index) => (
              <Card
                key={objective.title}
                className={`card-hover transition-all duration-700 ${
                  visibleObjectives.includes(index)
                    ? "animate-fade-in animate-scale-in"
                    : "opacity-0 translate-y-8 scale-95"
                }`}
              >
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg ${objective.color}`}>
                      <objective.icon className="h-5 w-5" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {objective.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{objective.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {objective.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Key Programs */}
        <section>
          <div className="text-center mb-12">
            <h2 className="display-title text-3xl font-bold mb-4">
              Key Programs
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our flagship programs delivering transformative healthcare
              solutions across communities.
            </p>
          </div>
          <div ref={programsRef as any} className="grid gap-8 lg:grid-cols-2">
            {programs.map((program, index) => (
              <Card
                key={program.title}
                className={`card-hover overflow-hidden transition-all duration-700 ${
                  visiblePrograms.includes(index)
                    ? "animate-fade-in animate-scale-in"
                    : "opacity-0 translate-y-8 scale-95"
                }`}
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{program.title}</CardTitle>
                    <Badge variant="secondary">{program.stats}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {program.description}
                  </p>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Key Features:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {program.features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          <div className="h-1.5 w-1.5 bg-primary rounded-full" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Our Flagship Programs */}
        <section>
          <div className="text-center mb-12">
            <h2 className="display-title text-3xl font-bold mb-4">
              Our Flagship Programs
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Specialized programs targeting critical health challenges and
              community needs across Africa.
            </p>
          </div>
          <div
            ref={flagshipRef as any}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            <Card
              className={`card-hover transition-all duration-700 ${
                visibleFlagship.includes(0)
                  ? "animate-fade-in animate-scale-in"
                  : "opacity-0 translate-y-8 scale-95"
              }`}
            >
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-rose-100 text-rose-700">
                    <Heart className="h-5 w-5" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    Annual Program
                  </Badge>
                </div>
                <CardTitle className="text-lg">
                  Annual Cervical Cancer Education & Screening
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Comprehensive cervical cancer awareness, education, and free
                  screening services for women in underserved communities.
                </p>
              </CardContent>
            </Card>

            <Card
              className={`card-hover transition-all duration-700 ${
                visibleFlagship.includes(1)
                  ? "animate-fade-in animate-scale-in"
                  : "opacity-0 translate-y-8 scale-95"
              }`}
            >
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-blue-100 text-blue-700">
                    <Users className="h-5 w-5" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    Annual Festival
                  </Badge>
                </div>
                <CardTitle className="text-lg">
                  The Florence Nightingale Nurses Week Festival
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Celebrating and honoring nursing professionals while promoting
                  excellence in nursing practice and education.
                </p>
              </CardContent>
            </Card>

            <Card
              className={`card-hover transition-all duration-700 ${
                visibleFlagship.includes(2)
                  ? "animate-fade-in animate-scale-in"
                  : "opacity-0 translate-y-8 scale-95"
              }`}
            >
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-red-100 text-red-700">
                    <Microscope className="h-5 w-5" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    Health Campaign
                  </Badge>
                </div>
                <CardTitle className="text-lg">
                  Sickle Cell Campaign & Genotype Drive
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Raising awareness about sickle cell disease and providing free
                  genotype testing to promote informed health decisions.
                </p>
              </CardContent>
            </Card>

            <Card
              className={`card-hover transition-all duration-700 ${
                visibleFlagship.includes(3)
                  ? "animate-fade-in animate-scale-in"
                  : "opacity-0 translate-y-8 scale-95"
              }`}
            >
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-purple-100 text-purple-700">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    Annual Conference
                  </Badge>
                </div>
                <CardTitle className="text-lg">
                  Pastors Health Conference (PHC)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Specialized health education and wellness programs designed
                  for religious leaders and their communities.
                </p>
              </CardContent>
            </Card>

            <Card
              className={`card-hover md:col-span-2 lg:col-span-1 transition-all duration-700 ${
                visibleFlagship.includes(4)
                  ? "animate-fade-in animate-scale-in"
                  : "opacity-0 translate-y-8 scale-95"
              }`}
            >
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-green-100 text-green-700">
                    <Globe className="h-5 w-5" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    Ongoing Project
                  </Badge>
                </div>
                <CardTitle className="text-lg">H.O.P.E Project</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  (Health Outreach for People Everywhere)
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Comprehensive health outreach initiative bringing essential
                  healthcare services and education to underserved populations
                  everywhere.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* OPHEG Organization Arms */}
        <section className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8">
          <div className="text-center mb-12">
            <h2 className="display-title text-3xl font-bold mb-4">
              OPHEG Organization Arms
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our specialized divisions working collaboratively to deliver comprehensive healthcare solutions across multiple sectors.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="card-hover">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-blue-100 text-blue-700">
                    <Hospital className="h-5 w-5" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    Clinical Division
                  </Badge>
                </div>
                <CardTitle className="text-lg">Health Flix</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Our medical education and training division focuses on capacity building for healthcare professionals through innovative learning platforms and hands-on training programs.
                </p>
                <div className="space-y-2">
                  <h5 className="font-semibold text-sm">Key Activities:</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Medical simulation training</li>
                    <li>• Digital health education platforms</li>
                    <li>• Professional certification programs</li>
                    <li>• Continuing medical education (CME)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-green-100 text-green-700">
                    <Microscope className="h-5 w-5" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    Diagnostic Services
                  </Badge>
                </div>
                <CardTitle className="text-lg">Diagnostic Center</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  State-of-the-art diagnostic services providing accurate and timely medical testing to support clinical decision-making and patient care.
                </p>
                <div className="space-y-2">
                  <h5 className="font-semibold text-sm">Services Offered:</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Laboratory testing and analysis</li>
                    <li>• Medical imaging services</li>
                    <li>• Pathology services</li>
                    <li>• Preventive health screenings</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-purple-100 text-purple-700">
                    <Users className="h-5 w-5" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    Community Health
                  </Badge>
                </div>
                <CardTitle className="text-lg">Community Outreach Division</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Dedicated to bringing healthcare directly to communities through mobile health units, health education programs, and community engagement initiatives.
                </p>
                <div className="space-y-2">
                  <h5 className="font-semibold text-sm">Programs Include:</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Mobile health clinics</li>
                    <li>• Health education workshops</li>
                    <li>• Vaccination campaigns</li>
                    <li>• Community health worker training</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Detailed Program Impact Stories */}
        <section>
          <div className="text-center mb-12">
            <h2 className="display-title text-3xl font-bold mb-4">
              Program Impact Stories
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real stories of transformation and impact from our healthcare programs across Africa.
            </p>
          </div>
          
          <div className="space-y-12">
            {/* Cervical Cancer Program Story */}
            <article className="bg-card rounded-2xl p-8 shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-lg bg-rose-100 text-rose-700">
                  <Heart className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Saving Lives Through Early Detection</h3>
                  <p className="text-muted-foreground">Annual Cervical Cancer Education & Screening Program</p>
                </div>
              </div>
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Our Annual Cervical Cancer Education and Screening program has become a beacon of hope for women across underserved communities. 
                  What started as a small initiative has grown into a comprehensive healthcare intervention that has screened over 1,500 women 
                  and detected numerous cases in early stages, significantly improving survival rates.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  The program combines community education, free screening services, and follow-up care. Our mobile screening units visit remote 
                  villages where women would otherwise have no access to these life-saving services. Through partnerships with local health centers, 
                  we've created a sustainable model that continues to operate year-round.
                </p>
                <div className="grid md:grid-cols-3 gap-4 mt-6 p-4 bg-rose-50 rounded-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-rose-700">1,500+</div>
                    <div className="text-sm text-muted-foreground">Women Screened</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-rose-700">85%</div>
                    <div className="text-sm text-muted-foreground">Early Detection Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-rose-700">15</div>
                    <div className="text-sm text-muted-foreground">Communities Reached</div>
                  </div>
                </div>
              </div>
            </article>

            {/* Florence Nightingale Festival Story */}
            <article className="bg-card rounded-2xl p-8 shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-lg bg-blue-100 text-blue-700">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Celebrating Healthcare Heroes</h3>
                  <p className="text-muted-foreground">The Florence Nightingale Nurses Week Festival</p>
                </div>
              </div>
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Every year, OPHEG organizes the Florence Nightingale Nurses Week Festival, a celebration that goes beyond recognition to 
                  become a platform for professional development and community health advocacy. This annual event brings together nursing 
                  professionals from across the region to share knowledge, celebrate achievements, and strengthen the nursing profession.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  The festival features professional development workshops, awards ceremonies, health exhibitions, and community outreach 
                  activities. Nurses participate in continuing education sessions, learn about the latest healthcare technologies, and 
                  network with peers to build a stronger healthcare community.
                </p>
                <div className="grid md:grid-cols-3 gap-4 mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-700">200+</div>
                    <div className="text-sm text-muted-foreground">Nurses Participated</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-700">15</div>
                    <div className="text-sm text-muted-foreground">Workshops Conducted</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-700">5</div>
                    <div className="text-sm text-muted-foreground">Years Running</div>
                  </div>
                </div>
              </div>
            </article>

            {/* Sickle Cell Campaign Story */}
            <article className="bg-card rounded-2xl p-8 shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-lg bg-red-100 text-red-700">
                  <Microscope className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Breaking the Cycle of Sickle Cell Disease</h3>
                  <p className="text-muted-foreground">Sickle Cell Campaign & Genotype Drive</p>
                </div>
              </div>
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Sickle cell disease affects millions across Africa, yet many people remain unaware of their genotype status. Our Sickle Cell 
                  Campaign and Genotype Drive addresses this critical gap by providing free testing, genetic counseling, and education about 
                  this hereditary condition that disproportionately affects African populations.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Through community-based testing programs, we've tested over 500 individuals and provided crucial information to help families 
                  make informed decisions about family planning. Our counseling services help couples understand the genetic implications and 
                  available options, while our education campaigns work to reduce stigma associated with sickle cell disease.
                </p>
                <div className="grid md:grid-cols-3 gap-4 mt-6 p-4 bg-red-50 rounded-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-700">500+</div>
                    <div className="text-sm text-muted-foreground">Genotype Tests</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-700">150</div>
                    <div className="text-sm text-muted-foreground">Counseling Sessions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-700">25</div>
                    <div className="text-sm text-muted-foreground">Community Events</div>
                  </div>
                </div>
              </div>
            </article>

            {/* H.O.P.E Project Story */}
            <article className="bg-card rounded-2xl p-8 shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-lg bg-green-100 text-green-700">
                  <Globe className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Bringing Hope to Every Community</h3>
                  <p className="text-muted-foreground">H.O.P.E Project (Health Outreach for People Everywhere)</p>
                </div>
              </div>
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  The H.O.P.E Project represents our commitment to ensuring that geography is not a barrier to quality healthcare. This 
                  comprehensive outreach initiative brings essential health services directly to remote and underserved communities across 
                  Africa, living up to its mission of providing "Health Outreach for People Everywhere."
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Our mobile health teams travel to the most remote locations, providing primary healthcare, health education, preventive 
                  services, and emergency care. The project has established a network of community health workers who continue to provide 
                  ongoing support and serve as a bridge between communities and formal healthcare systems.
                </p>
                <div className="grid md:grid-cols-3 gap-4 mt-6 p-4 bg-green-50 rounded-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-700">50+</div>
                    <div className="text-sm text-muted-foreground">Remote Communities</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-700">3,000+</div>
                    <div className="text-sm text-muted-foreground">People Served</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-700">100+</div>
                    <div className="text-sm text-muted-foreground">Health Workers Trained</div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* Cumulative Impact */}
        <section
          ref={successRef}
          className={`text-center py-16 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl transition-all duration-1000 ${
            successVisible
              ? "animate-fade-in animate-scale-in"
              : "opacity-0 translate-y-8 scale-95"
          }`}
        >
          <h2 className="display-title text-3xl font-bold mb-4">
            Cumulative Impact
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Together, our programs have created measurable change across communities.
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                7,000+
              </div>
              <div className="text-sm text-muted-foreground">
                Total Lives Impacted
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">65+</div>
              <div className="text-sm text-muted-foreground">
                Communities Reached
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">350+</div>
              <div className="text-sm text-muted-foreground">
                Healthcare Workers Trained
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">5</div>
              <div className="text-sm text-muted-foreground">
                Major Programs Running
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <h2 className="display-title text-3xl font-bold mb-4">
            Join Our Mission
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Be part of our transformative healthcare initiatives. Whether as a
            volunteer, partner, or through accessing our services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/get-involved"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 rounded-md px-8 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Get Involved
            </a>
            <a
              href="/appointments"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 rounded-md px-8 border border-input bg-background hover:bg-accent hover:text-accent-foreground"
            >
              Book Appointment
            </a>
          </div>
        </section>
      </div>
    </>
  );
};

export default OurWorks;
