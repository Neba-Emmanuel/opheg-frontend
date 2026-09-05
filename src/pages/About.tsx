// About.jsx - Complete Redesign
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
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
  ArrowRight,
  Sparkles,
  Star,
  Zap,
  ChevronRight,
} from "lucide-react";
import aboutHeroImg from "@/assets/about-hero.jpg";
import { useState, useEffect } from "react";

const About = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activePillar, setActivePillar] = useState<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const coreValues = [
    {
      icon: Award,
      title: "Professionalism",
      description: "Upholding integrity, excellence, and standards in every service.",
      color: "from-blue-500 to-cyan-500",
      gradient: "bg-gradient-to-br from-blue-50 to-cyan-50",
      iconBg: "bg-gradient-to-br from-blue-500 to-cyan-500",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Creating new ways to solve health challenges through technology and creativity.",
      color: "from-yellow-500 to-amber-500",
      gradient: "bg-gradient-to-br from-yellow-50 to-amber-50",
      iconBg: "bg-gradient-to-br from-yellow-500 to-amber-500",
    },
    {
      icon: Users,
      title: "Leadership",
      description: "Raising future health leaders through mentorship and training.",
      color: "from-emerald-500 to-teal-500",
      gradient: "bg-gradient-to-br from-emerald-50 to-teal-50",
      iconBg: "bg-gradient-to-br from-emerald-500 to-teal-500",
    },
    {
      icon: Globe,
      title: "Accessibility",
      description: "Ensuring healthcare, education, and resources reach everyone, everywhere.",
      color: "from-purple-500 to-pink-500",
      gradient: "bg-gradient-to-br from-purple-50 to-pink-50",
      iconBg: "bg-gradient-to-br from-purple-500 to-pink-500",
    },
    {
      icon: Shield,
      title: "Resilience",
      description: "Standing strong with communities in the face of health challenges.",
      color: "from-red-500 to-rose-500",
      gradient: "bg-gradient-to-br from-red-50 to-rose-50",
      iconBg: "bg-gradient-to-br from-red-500 to-rose-500",
    },
  ];

  const strategicPillars = [
    {
      icon: Heart,
      title: "Health (SDG 3)",
      description: "Community outreach programs for preventable diseases. Diagnostic excellence through the CHN. Campaigns against stigma.",
      color: "from-rose-500 to-pink-500",
      stats: ["50+ Communities", "5000+ Lives", "100+ Programs"],
    },
    {
      icon: BookOpen,
      title: "Education (SDG 4)",
      description: "OPHEG Academy training health professionals. HealthFlix Studios for education through storytelling.",
      color: "from-blue-500 to-cyan-500",
      stats: ["100+ Trained", "10+ Courses", "5+ Studios"],
    },
    {
      icon: Handshake,
      title: "Partnerships (SDG 17)",
      description: "Collaborating with NGOs, governments, universities, and international organizations.",
      color: "from-emerald-500 to-teal-500",
      stats: ["20+ Partners", "5+ Countries", "Global Network"],
    },
  ];

  return (
    <>
      <SEO
        title="About OPHEG - Our Vision, Mission & Team"
        description="Learn about Optimum Health Global's mission to transform healthcare in Africa through community outreach, innovation, and compassionate care since 2022."
        canonical="/about"
      />

      <div className="relative overflow-hidden">
        {/* Hero Section - Dramatic Overlay */}
        <section className="relative min-h-[80vh] flex items-center overflow-hidden">
          {/* Background Image with Parallax */}
          <div className="absolute inset-0">
            <img
              src={aboutHeroImg}
              alt="OPHEG healthcare team"
              className="w-full h-full object-cover scale-110 animate-subtle-zoom"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-blue-950/80 to-emerald-950/70" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
          </div>

          {/* Floating Particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
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
              {/* Badge */}
              {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-sm animate-fade-in">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span>Established November 22, 2022</span>
              </div> */}

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white animate-fade-in">
                About{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400 animate-gradient-x">
                  OPHEG
                </span>
              </h1>

              <div className="space-y-4 animate-fade-in delay-200">
                <p className="text-2xl md:text-3xl font-bold text-white/90">
                  Health, Empowerment, Innovation
                </p>
                <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
                  From Silence to Voice, From Barriers to Bridges — Transforming 
                  healthcare access across Africa through innovative 
                  community-centered approaches and sustainable health solutions.
                </p>
              </div>

              {/* Quick Stats */}
              <div className="flex flex-wrap justify-center gap-6 pt-8 animate-fade-in delay-300">
                {[
                  { value: "2+", label: "Years of Impact" },
                  { value: "50+", label: "Communities" },
                  { value: "5000+", label: "Lives Touched" },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-3xl font-black text-white">{stat.value}</div>
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

        {/* Organization Details - Floating Cards */}
        <section className="relative -mt-20 pb-20 bg-gradient-to-b from-transparent to-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Calendar,
                  title: "Founded",
                  value: "November 22, 2022",
                  subtitle: "Our journey begins",
                  gradient: "from-blue-500 to-cyan-500",
                },
                {
                  icon: MapPin,
                  title: "Head Office",
                  value: "Kumba, Cameroon",
                  subtitle: "Meme Division, Southwest Region",
                  gradient: "from-emerald-500 to-teal-500",
                },
                {
                  icon: Star,
                  title: "Motto",
                  value: "Clean Health · Clean Society",
                  subtitle: "Our guiding principle",
                  gradient: "from-purple-500 to-pink-500",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="group relative bg-white rounded-3xl p-8 shadow-2xl shadow-slate-200/50 hover:shadow-slate-300/50 hover:-translate-y-2 transition-all duration-500 animate-fade-in"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className={`absolute top-0 left-6 right-6 h-1 bg-gradient-to-r ${item.gradient} rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
                  
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} p-3 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className="w-full h-full text-white" />
                  </div>
                  
                  <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    {item.title}
                  </h3>
                  
                  <p className="text-xl font-bold text-slate-900 mb-1">{item.value}</p>
                  <p className="text-sm text-slate-500">{item.subtitle}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story - Immersive Timeline */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-4">
                  <BookOpen className="w-4 h-4" />
                  Our Journey
                </div>
                <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-4">
                  Our{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">
                    Story
                  </span>
                </h2>
                <p className="text-xl text-slate-600">From Silence to Voice, From Barriers to Bridges</p>
              </div>

              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 via-cyan-500 to-emerald-500 hidden md:block" />

                <div className="space-y-12">
                  {[
                    {
                      title: "The Beginning",
                      content: "In a world where health remains the greatest wealth, millions still suffer and die from preventable and treatable conditions. Too often, access to healthcare is a privilege instead of a right.",
                    },
                    {
                      title: "Our Mission",
                      content: "Optimum Health Global (OPHEG) was born to rewrite this story. What began in Meme Division, Southwest Cameroon, as passionate young health professionals walking into communities to raise awareness on cervical cancer, malaria, and sickle cell.",
                    },
                    {
                      title: "Our Growth",
                      content: "Today OPHEG has grown into a dynamic, multi-dimensional health movement — a family of healthcare workers, innovators, survivors, volunteers, and educators united by one heartbeat.",
                    },
                  ].map((item, index) => (
                    <div key={index} className="relative pl-20 animate-fade-in" style={{ animationDelay: `${index * 200}ms` }}>
                      <div className="absolute left-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-black text-xl shadow-xl">
                        {index + 1}
                      </div>
                      <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl p-8 shadow-lg">
                        <h3 className="text-2xl font-bold text-slate-900 mb-3">{item.title}</h3>
                        <p className="text-slate-600 leading-relaxed">{item.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Founder's Words - Featured Quote */}
        <section className="relative py-24 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.5),transparent_70%)]" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-sm mb-6">
                  <Quote className="w-4 h-4" />
                  Founder's Vision
                </div>
              </div>

              <div className="grid md:grid-cols-[auto_1fr] gap-10 items-center">
                {/* Founder Image */}
                <div className="flex justify-center md:justify-start">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl blur-xl opacity-30" />
                    <img
                      src="/OJ Nathaniel.JPG"
                      alt="OJ Nathaniel Eben - Founder & CEO"
                      className="relative w-48 h-60 md:w-56 md:h-72 rounded-2xl object-cover shadow-2xl ring-2 ring-white/20"
                    />
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full px-4 py-1.5 shadow-lg">
                      <p className="text-white text-xs font-bold whitespace-nowrap">Founder & CEO</p>
                    </div>
                  </div>
                </div>

                {/* Quote Text */}
                <div className="relative">
                  <Quote className="absolute -top-6 -left-2 w-16 h-16 text-blue-400/20" />

                  <div className="space-y-5 text-white/80 text-lg leading-relaxed">
                    <p className="text-xl md:text-2xl font-medium text-white italic">
                      "When we started, we had nothing but passion — and a deep conviction 
                      that our communities deserved more. We had seen mothers lose children 
                      to preventable diseases, youths dying from silence and stigma."
                    </p>
                    
                    <p className="text-xl md:text-2xl font-medium text-white italic">
                      "Optimum Health Global was born out of that pain, but also out of hope. 
                      Hope that healthcare could be different. Hope that we could use 
                      innovation, education, and compassion to bridge gaps."
                    </p>
                    
                    <p className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                      "This is the heartbeat of OPHEG. Together, we are building healthier 
                      people and healthier societies."
                    </p>
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/10">
                    <p className="text-white font-bold text-lg">OJ Nathaniel Eben</p>
                    <p className="text-white/60 text-sm">Founder & CEO, Optimum Health Global</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission - Side by Side */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Vision Card */}
              <div className="group relative bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 p-4 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Eye className="w-full h-full text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h3>
                <p className="text-slate-600 leading-relaxed">
                  Helping Humanity and saving lives from common and endemic diseases 
                  coupled with negative health stigmas that tend to pose a threat to 
                  humans, through identifying, educating, innovating, empowering and 
                  helping the masses make positive health decisions thereby, attaining 
                  health at its optimum.
                </p>
              </div>

              {/* Mission Card */}
              <div className="group relative bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 p-4 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-full h-full text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h3>
                <p className="text-slate-600 leading-relaxed">
                  Bringing accessible health to communities through education, 
                  innovation, and empowerment, building healthier people and healthier 
                  societies.
                </p>

                {/* SDG Goals */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {["SDG 3", "SDG 4", "SDG 17"].map((sdg) => (
                    <span key={sdg} className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium">
                      {sdg}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* P.I.L.A.R. Core Values - Interactive Cards */}
        <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 text-purple-600 text-sm font-medium mb-4">
                <Shield className="w-4 h-4" />
                Our Foundation
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-4">
                Our{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
                  P.I.L.A.R.
                </span>{" "}
                Core Values
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                The pillars that support our mission to transform lives and communities across Africa.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
              {coreValues.map((value, index) => (
                <div
                  key={value.title}
                  className="group relative animate-fade-in hover:scale-105 transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`relative ${value.gradient} rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 h-full`}>
                    <div className={`w-14 h-14 rounded-2xl ${value.iconBg} p-3 mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <value.icon className="w-full h-full text-white" />
                    </div>
                    
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{value.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{value.description}</p>
                    
                    {/* Letter Badge */}
                    <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/50 flex items-center justify-center text-sm font-bold text-slate-600">
                      {value.title[0]}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Strategic Pillars - Expandable Cards */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-600 text-sm font-medium mb-4">
                <Zap className="w-4 h-4" />
                Our Strategy
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-4">
                Strategic{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">
                  Pillars
                </span>
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Aligned with the United Nations Sustainable Development Goals
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {strategicPillars.map((pillar, index) => (
                <div
                  key={pillar.title}
                  className="group relative animate-fade-in"
                  style={{ animationDelay: `${index * 200}ms` }}
                  onMouseEnter={() => setActivePillar(index)}
                  onMouseLeave={() => setActivePillar(null)}
                >
                  <div className={`relative bg-white rounded-3xl p-8 shadow-xl transition-all duration-500 ${
                    activePillar === index ? 'shadow-2xl -translate-y-4' : 'shadow-slate-200/50'
                  }`}>
                    {/* Gradient Border */}
                    <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${pillar.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                    
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${pillar.color} p-4 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <pillar.icon className="w-full h-full text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">{pillar.title}</h3>
                    <p className="text-slate-600 leading-relaxed mb-6">{pillar.description}</p>
                    
                    {/* Stats */}
                    <div className="space-y-2 pt-6 border-t border-slate-100">
                      {pillar.stats.map((stat, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-slate-500">
                          <ChevronRight className="w-4 h-4 text-emerald-500" />
                          {stat}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership Structure - Org Tree */}
        <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-4">
                <Users className="w-4 h-4" />
                Our Team
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-4">
                Leadership{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">
                  Structure
                </span>
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Dedicated leadership guiding OPHEG's mission
              </p>
            </div>

            {/* Leadership Tree */}
            <div className="max-w-4xl mx-auto">
              {/* Level 1 - Founder */}
              <div className="flex justify-center">
                <div className="relative bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl px-10 py-5 text-center shadow-xl shadow-blue-500/20">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mx-auto mb-2">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-white font-bold text-lg">Founder</p>
                  <p className="text-white/70 text-sm">OJ Nathaniel Eben</p>
                </div>
              </div>

              {/* Connector */}
              <div className="flex justify-center">
                <div className="w-0.5 h-8 bg-gradient-to-b from-blue-400 to-slate-300" />
              </div>

              {/* Level 2 - Director General */}
              <div className="flex justify-center">
                <div className="relative bg-gradient-to-br from-blue-600 to-blue-500 rounded-2xl px-10 py-4 text-center shadow-lg shadow-blue-500/20">
                  <p className="text-white font-bold text-base">Director General</p>
                  <p className="text-white/70 text-xs">DG</p>
                </div>
              </div>

              {/* Connector */}
              <div className="flex justify-center">
                <div className="w-0.5 h-8 bg-slate-300" />
              </div>
              <div className="mx-auto w-full max-w-3xl border-t border-slate-300" />

              {/* Level 3 - reports to DG */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
                {[
                  { title: "DEO", subtitle: "Director of Executive Operations", icon: Shield },
                  { title: "Secretary General", subtitle: "SG", icon: BookOpen },
                  { title: "Adviser", subtitle: "Advisory", icon: Users },
                  { title: "Finance", subtitle: "Finance Office", icon: Globe },
                ].map((role) => (
                  <div key={role.title} className="flex flex-col items-center">
                    {/* stub connector up to the horizontal line */}
                    <div className="w-0.5 h-8 -mt-8 bg-slate-300" />
                    <div className="relative bg-white rounded-xl px-4 py-4 text-center shadow-md border border-slate-200 hover:shadow-lg hover:border-blue-200 transition-all duration-300 w-full mt-0">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center mx-auto mb-2">
                        <role.icon className="w-4 h-4 text-blue-600" />
                      </div>
                      <p className="text-slate-900 font-bold text-sm leading-tight">{role.title}</p>
                      <p className="text-slate-400 text-xs mt-0.5">{role.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Connector from Secretary General down to Branch Director */}
              <div className="flex justify-center">
                <div className="w-0.5 h-8 bg-slate-300" />
              </div>

              {/* Level 4 - Branch Director (under SG) */}
              <div className="flex justify-center">
                <div className="relative bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl px-8 py-4 text-center shadow-md border border-slate-200">
                  <p className="text-slate-800 font-bold text-sm">Branch Director</p>
                  <p className="text-slate-400 text-xs mt-0.5">Branch Leadership</p>
                </div>
              </div>

              {/* Connector */}
              <div className="flex justify-center">
                <div className="w-0.5 h-8 bg-slate-300" />
              </div>
              <div className="mx-auto w-full max-w-md border-t border-slate-300" />

              {/* Level 5 - under Branch Director */}
              <div className="grid grid-cols-2 gap-6 max-w-md mx-auto pt-8">
                {[
                  { title: "Branch Director B", subtitle: "Sub-branch", icon: Handshake },
                  { title: "Divisional Officers", subtitle: "Divisions", icon: Users },
                ].map((role) => (
                  <div key={role.title} className="flex flex-col items-center">
                    <div className="w-0.5 h-8 -mt-8 bg-slate-300" />
                    <div className="relative bg-white rounded-xl px-4 py-4 text-center shadow-md border border-slate-200 hover:shadow-lg hover:border-blue-200 transition-all duration-300 w-full">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-100 to-blue-50 flex items-center justify-center mx-auto mb-2">
                        <role.icon className="w-4 h-4 text-slate-500" />
                      </div>
                      <p className="text-slate-800 font-semibold text-xs leading-tight">{role.title}</p>
                      <p className="text-slate-400 text-xs mt-0.5">{role.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action - Bold Banner */}
        <section className="relative py-24 pb-48 sm:pb-32 overflow-hidden">
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
                Learn more about our work in communities or discover how you can be 
                part of our transformative healthcare initiatives.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg rounded-2xl shadow-2xl shadow-blue-900/50 hover:shadow-blue-900/80 transition-all duration-300 hover:scale-105 font-bold"
                >
                  <Link to="/our-works">
                    See Our Work
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="px-8 py-6 text-lg rounded-2xl border-2 border-white bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105 font-bold"
                >
                  <Link to="/get-involved">Get Involved</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;