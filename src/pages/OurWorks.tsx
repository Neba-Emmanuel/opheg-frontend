// OurWorks.jsx - Complete Redesign
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
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
  ArrowRight,
  Sparkles,
  Star,
  CheckCircle2,
  Monitor,
  Handshake,
} from "lucide-react";
import medicalTrainingImg from "@/assets/medical-training.jpg";
import healthFacilityImg from "@/assets/health-facility.jpg";
import communityOutreachImg from "@/assets/outreach.jpg";
import ourWorksHeroImg from "@/assets/home-hero.jpg";
import mentorshipImg from "@/assets/mentorship.jpg";
import trainingImg from "@/assets/training.jpg";
import { useState } from "react";

const OurWorks = () => {
  const [activeProgram, setActiveProgram] = useState<number | null>(null);

  const objectives = [
    {
      icon: Globe,
      title: "Global Health Promotion",
      description: "Following the SDG3 goals to ensure healthy lives and promote well-being for all at all ages.",
      gradient: "from-blue-500 to-cyan-500",
      category: "Global Impact",
      stats: "SDG 3",
    },
    {
      icon: Building,
      title: "Public Health Policy",
      description: "Supporting public health and economic policies that create sustainable healthcare systems.",
      gradient: "from-emerald-500 to-teal-500",
      category: "Policy",
      stats: "Advocacy",
    },
    {
      icon: Microscope,
      title: "Research & Innovation",
      description: "Advancing medical knowledge through cutting-edge research and innovative healthcare solutions.",
      gradient: "from-purple-500 to-pink-500",
      category: "Research",
      stats: "Ongoing",
    },
    {
      icon: GraduationCap,
      title: "Training Professionals",
      description: "Building capacity through comprehensive training programs for healthcare workers.",
      gradient: "from-orange-500 to-red-500",
      category: "Education",
      stats: "100+ Trained",
    },
    {
      icon: Users,
      title: "Community Outreach",
      description: "Bringing healthcare directly to underserved communities across Africa.",
      gradient: "from-rose-500 to-pink-500",
      category: "Community",
      stats: "15+ Communities",
    },
    {
      icon: Hospital,
      title: "Diagnostic Facility",
      description: "Established a modern diagnostic center with state-of-the-art laboratory and imaging services.",
      gradient: "from-cyan-500 to-blue-500",
      category: "Infrastructure",
      stats: "1 Center",
    },
    {
      icon: TrendingUp,
      title: "Capacity Building",
      description: "Strengthening healthcare systems through strategic capacity building initiatives.",
      gradient: "from-indigo-500 to-purple-500",
      category: "Development",
      stats: "Ongoing",
    },
    {
      icon: Handshake,
      title: "Partnerships",
      description: "Collaborating with organizations, institutions, and government bodies to amplify healthcare impact.",
      gradient: "from-emerald-500 to-green-500",
      category: "Collaboration",
      stats: "Growing",
    },
  ];

  const programs = [
    {
      slug: "outreach-initiatives",
      title: "Outreach Activities",
      description: "Regular community health outreach programs promoting preventive care, screenings, and wellness education.",
      image: communityOutreachImg,
      stats: "5,000+ Reached",
      gradient: "from-rose-500 to-pink-500",
      features: [
        "Health screenings",
        "Health education",
        "Disease prevention",
        "Community engagement",
      ],
    },
    {
      slug: "health-flix",
      title: "HealthFlix",
      description: "Leveraging social media applications to educate people on health issues through videos and short dramas.",
      image: medicalTrainingImg,
      stats: "2,000+ Reached",
      gradient: "from-blue-500 to-cyan-500",
      features: [
        "Evidence-based teachings",
        "Simple understanding",
        "Live & pre-recorded Q&A sessions",
        "Wider reach",
      ],
    },
    {
      slug: "diagnostic-facility",
      title: "Diagnostic Facility",
      description: "Established a modern health diagnostic center with state-of-the-art and advanced diagnostic services.",
      image: healthFacilityImg,
      stats: "Full Service",
      gradient: "from-emerald-500 to-teal-500",
      features: [
        "Laboratory investigations",
        "Imaging services",
        "Pharmacy",
        "General consultations & visiting specialists",
      ],
    },
    {
      slug: "mentorships",
      title: "Mentorships",
      description: "Structured mentorship connecting experienced professionals with emerging practitioners.",
      image: mentorshipImg,
      stats: "Growing Network",
      gradient: "from-purple-500 to-pink-500",
      features: [
        "One-on-one guidance",
        "Career development",
        "Clinical skills",
        "Leadership training",
      ],
    },
    {
      slug: "trainings",
      title: "Trainings & Empowerment",
      description: "Comprehensive training programs for healthcare workers and community volunteers to build capacity.",
      image: trainingImg,
      stats: "100+ Trained",
      gradient: "from-orange-500 to-red-500",
      features: [
        "Skill workshops",
        "Certification courses",
        "Community health workers",
        "Emergency response",
      ],
    },
  ];

  const flagshipPrograms = [
    {
      icon: Heart,
      title: "Annual Cervical Cancer Education & Screening",
      description: "Comprehensive cervical cancer awareness, education, and free screening services for women in underserved communities.",
      gradient: "from-rose-500 to-pink-500",
      badge: "Annual Program",
      impact: "500+ Screened",
    },
    {
      icon: Users,
      title: "L.A.M.P Festival",
      description: "Celebrating and honoring medical professionals especially Nurses & Midwives while promoting excellence in practice, education. Redefining the profession for better healthcare delivery.",
      gradient: "from-blue-500 to-cyan-500",
      badge: "Annual Festival",
      impact: "1,000+ Nurses & Midwives",
    },
    {
      icon: Microscope,
      title: "Sickle Cell Campaign & Genotype Drive",
      description: "Raising awareness about sickle cell disease and providing free genotype testing for informed health decisions.",
      gradient: "from-red-500 to-orange-500",
      badge: "Health Campaign",
      impact: "400+ Tested",
    },
    {
      icon: BookOpen,
      title: "Pastors Health Conference (PHC)",
      description: "Specialized health education and wellness programs designed for religious leaders and their communities.",
      gradient: "from-purple-500 to-indigo-500",
      badge: "Annual Conference",
      impact: "300+ Leaders",
    },
    {
      icon: Globe,
      title: "H.O.P.E Project",
      subtitle: "(Health Outreach for People Everywhere)",
      description: "Comprehensive health outreach initiative bringing essential healthcare services to underserved populations everywhere.",
      gradient: "from-emerald-500 to-teal-500",
      badge: "Ongoing Project",
      impact: "Multiregional",
    },
    {
      icon: Star,
      title: "Annual Picnic",
      description: "Outdoor program designed to foster mental wellness every December, reconnecting with self, caring for self.",
      gradient: "from-yellow-500 to-orange-500",
      badge: "Annual Event",
      impact: "Mental Wellness",
    },
  ];

  return (
    <>
      <SEO
        title="Our Work - OPHEG Programs and Impact"
        description="Discover OPHEG's comprehensive healthcare programs including community outreaches, diagnostic services, health education, and professional training across Africa."
        canonical="/our-works"
      />

      <div className="relative overflow-hidden">
        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={ourWorksHeroImg}
              alt="OPHEG healthcare team in action"
              className="w-full h-full object-cover scale-110 animate-subtle-zoom"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-blue-950/80 to-emerald-950/70" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
          </div>

          {/* Floating Particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-blue-400/20 rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${3 + Math.random() * 4}s`,
                }}
              />
            ))}
          </div>

          <div className="container relative z-10 mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white animate-fade-in">
                Our{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400 animate-gradient-x">
                  Work
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed animate-fade-in delay-200">
                Transforming healthcare delivery across Africa through innovative 
                programs, community engagement, and sustainable development initiatives.
              </p>

              {/* Quick Stats */}
              <div className="flex flex-wrap justify-center gap-8 pt-8 animate-fade-in delay-300">
                {[
                  { value: "6", label: "Major Programs" },
                  { value: "15+", label: "Communities" },
                  { value: "7,000+", label: "Lives Impacted" },
                ].map((stat, i) => (
                  <div key={i} className="text-center group">
                    <div className="text-3xl font-black text-white group-hover:scale-110 transition-transform">
                      {stat.value}
                    </div>
                    <div className="text-sm text-white/60">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
              <div className="w-1 h-3 bg-white/50 rounded-full animate-pulse" />
            </div>
          </div>
        </section>

        {/* Core Objectives */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-4">
                <Target className="w-4 h-4" />
                Our Focus
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-4">
                Core{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">
                  Objectives
                </span>
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Strategic objectives aligned with global health goals and local community needs
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {objectives.map((objective, index) => (
                <div
                  key={objective.title}
                  className="group relative animate-fade-in hover:scale-105 transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-300/50 transition-all duration-500 h-full border border-slate-100">
                    <div className={`absolute top-0 left-4 right-4 h-1 bg-gradient-to-r ${objective.gradient} rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
                    
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${objective.gradient} p-3 mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <objective.icon className="w-full h-full text-white" />
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs bg-slate-100">
                        {objective.category}
                      </Badge>
                      <span className="text-xs text-slate-400">{objective.stats}</span>
                    </div>
                    
                    <h3 className="font-bold text-slate-900 mb-2">{objective.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{objective.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Programs */}
        <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-600 text-sm font-medium mb-4">
                <Sparkles className="w-4 h-4" />
                What We Do
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-4">
                Key{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">
                  Programs
                </span>
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Transformative healthcare solutions delivering impact across communities
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {programs.map((program, index) => (
                <Link
                  key={program.slug}
                  to={`/programs/${program.slug}`}
                  className="group block animate-fade-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                  onMouseEnter={() => setActiveProgram(index)}
                  onMouseLeave={() => setActiveProgram(null)}
                >
                  <div className={`relative bg-white rounded-3xl overflow-hidden shadow-xl transition-all duration-500 ${
                    activeProgram === index ? 'shadow-2xl -translate-y-2' : 'shadow-slate-200/50'
                  }`}>
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={program.image}
                        alt={program.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${program.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                      
                      {/* Stats Badge */}
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-white/90 backdrop-blur-sm text-slate-900 font-semibold shadow-lg">
                          {program.stats}
                        </Badge>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                      <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-600 transition-all duration-300">
                        {program.title}
                      </h3>
                      
                      <p className="text-slate-600 mb-6 leading-relaxed">{program.description}</p>

                      {/* Features */}
                      <div className="grid grid-cols-2 gap-3 pt-6 border-t border-slate-100">
                        {program.features.map((feature) => (
                          <div key={feature} className="flex items-center gap-2 text-sm text-slate-500">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                            {feature}
                          </div>
                        ))}
                      </div>

                      {/* Learn More */}
                      <div className="mt-6 flex items-center gap-2 text-blue-600 font-semibold text-sm group-hover:gap-4 transition-all duration-300">
                        Learn More
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Flagship Programs */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 text-purple-600 text-sm font-medium mb-4">
                <Star className="w-4 h-4" />
                Featured Initiatives
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-4">
                Flagship{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
                  Programs
                </span>
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Specialized initiatives targeting critical health challenges across Africa
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {flagshipPrograms.map((program, index) => (
                <div
                  key={program.title}
                  className="group relative animate-fade-in hover:scale-105 transition-all duration-300"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="relative bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all duration-500 h-full border border-slate-100">
                    <div className={`absolute top-0 left-4 right-4 h-1 bg-gradient-to-r ${program.gradient} rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />

                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${program.gradient} p-3 mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <program.icon className="w-full h-full text-white" />
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <Badge className="bg-slate-100 text-slate-600 text-xs">
                        {program.badge}
                      </Badge>
                      <span className="text-xs text-slate-400">{program.impact}</span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-2">{program.title}</h3>
                    
                    {program.subtitle && (
                      <p className="text-sm text-slate-400 mb-2">{program.subtitle}</p>
                    )}
                    
                    <p className="text-slate-600 text-sm leading-relaxed">{program.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Statistics */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
                Our{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                  Impact
                </span>
              </h2>
              <p className="text-xl text-white/60">Measurable change across communities</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { value: "7,000+", label: "Total Lives Impacted", icon: Heart },
                { value: "15+", label: "Communities Reached", icon: Globe },
                { value: "100+", label: "Healthcare Professionals Trained", icon: Users },
                { value: "6", label: "Major Programs", icon: Star },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="group text-center animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                    <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500">
                      <stat.icon className="w-12 h-12 text-blue-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                      <div className="text-4xl font-black text-white mb-2">{stat.value}</div>
                      <div className="text-white/60">{stat.label}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="relative py-24 pb-28 sm:pb-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-cyan-500 to-emerald-500" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h2 className="text-5xl md:text-7xl font-black text-white leading-tight">
                Join Our{" "}
                <span className="relative">
                  Mission
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 20" preserveAspectRatio="none">
                    <path d="M0 10 Q 25 0, 50 10 T 100 10" stroke="#FFD700" strokeWidth="3" fill="none" />
                  </svg>
                </span>
              </h2>
              
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Be part of our transformative healthcare initiatives. Whether as a 
                volunteer, partner, or through accessing our services.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg rounded-2xl shadow-2xl shadow-blue-900/50 hover:shadow-blue-900/80 transition-all duration-300 hover:scale-105 font-bold"
                >
                  <Link to="/get-involved">
                    Get Involved
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="px-8 py-6 text-lg rounded-2xl border-2 border-white bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105 font-bold"
                >
                  <Link to="/appointments">Book Appointment</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default OurWorks;
