// Home.jsx - Complete Redesign
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
  ArrowRight,
  Sparkles,
  Phone,
  MapPin,
  ChevronDown,
  Star,
} from "lucide-react";
import communityOutreachImg from "@/assets/outreach.jpg";
import heroHomeImg from "@/assets/home-hero.jpg";

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const stats = [
    { number: "5,000+", label: "Lives Touched", icon: Heart, color: "from-rose-500 to-pink-500" },
    { number: "50+", label: "Communities", icon: Users, color: "from-blue-500 to-cyan-500" },
    { number: "100+", label: "Professionals Trained", icon: Stethoscope, color: "from-emerald-500 to-teal-500" },
    { number: "20+", label: "Health Facilities", icon: Shield, color: "from-violet-500 to-purple-500" },
  ];

  const services = [
    {
      icon: Heart,
      title: "Community Outreach",
      description: "Bringing healthcare directly to rural and underserved communities with mobile clinics and surgical teams.",
      gradient: "from-rose-400 via-pink-400 to-rose-300",
      stat: "15+ Active Programs",
    },
    {
      icon: Globe,
      title: "Health Education",
      description: "Comprehensive health education and disease prevention programs empowering communities with knowledge.",
      gradient: "from-blue-400 via-cyan-400 to-blue-300",
      stat: "100K+ Educated",
    },
    {
      icon: TrendingUp,
      title: "Research & Innovation",
      description: "Advancing healthcare through cutting-edge research and technological innovation for African communities.",
      gradient: "from-emerald-400 via-teal-400 to-emerald-300",
      stat: "10+ Studies",
    },
  ];

  const testimonials = [
    {
      name: "Marie T.",
      role: "Community Health Worker",
      text: "OPHEG transformed how we deliver healthcare in our village. The mobile clinic is a game-changer!",
      rating: 5,
    },
    {
      name: "Dr. Emmanuel K.",
      role: "Medical Director",
      text: "The training programs have elevated our local healthcare standards tremendously.",
      rating: 5,
    },
    {
      name: "Sarah N.",
      role: "Patient",
      text: "I received life-saving surgery right in my community. OPHEG is truly a blessing.",
      rating: 5,
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
        description="Helping humanity and saving lives through community health, outreach, research, and training across Africa."
        canonical="/"
        jsonLd={jsonLd}
      />

      <div className="relative overflow-hidden">
        {/* Hero Section - Modern Split Design */}
        <section
          ref={heroRef}
          className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900"
        >
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-500/5 rounded-full blur-3xl" />
            
            {/* Floating Particles */}
            {[...Array(20)].map((_, i) => (
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
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-8 animate-fade-in">
                {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-sm">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  <span>Transforming Healthcare Since 2022</span>
                </div> */}

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight">
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400 animate-gradient-x">
                    Clean Health
                  </span>
                  <span className="block text-white mt-2">
                    Clean Society
                  </span>
                </h1>

                <p className="text-xl text-white/70 leading-relaxed max-w-lg">
                  Taking health to the communities and ensuring a clean health 
                  and clean society across Africa.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-6 text-lg rounded-2xl shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
                  >
                    <Link to="/appointments">
                      Book Appointment
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="px-8 py-6 text-lg rounded-2xl border-2 border-white/30 bg-white/10 text-white hover:bg-white/20 hover:border-white/50 transition-all duration-300 backdrop-blur-sm"
                  >
                    <Link to="/health-ai">
                      <Sparkles className="mr-2 w-5 h-5" />
                      Health AI Assistant
                    </Link>
                  </Button>
                </div>

                {/* Trust Indicators */}
                <div className="flex gap-8 pt-8 border-t border-white/10">
                  <div>
                    <div className="text-3xl font-bold text-white">2+</div>
                    <div className="text-sm text-white/50">Years of Impact</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white">24/7</div>
                    <div className="text-sm text-white/50">AI Support</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white">Free</div>
                    <div className="text-sm text-white/50">Consultations</div>
                  </div>
                </div>
              </div>

              {/* Right Visual */}
              <div className="relative animate-fade-in delay-300">
                <div className="relative">
                  {/* Main Image Card */}
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500">
                    <img
                      src={heroHomeImg}
                      alt="Healthcare in Africa"
                      className="w-full h-[500px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/50 to-transparent" />
                  </div>

                  {/* Floating Stats Cards */}
                  <div className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                        <Users className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-slate-900">5,000+</div>
                        <div className="text-sm text-slate-500">Patients Helped</div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute -top-6 -right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                        <Star className="w-6 h-6 text-blue-600 fill-blue-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-slate-900">4.9/5</div>
                        <div className="text-sm text-slate-500">Community Rating</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-8 h-8 text-white/50" />
          </div>
        </section>

        {/* Stats Section - Curved Design */}
        <section className="relative py-20 bg-white">
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-slate-900 to-transparent" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="group relative animate-fade-in hover:scale-105 transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-200/80 transition-all duration-500">
                    {/* Gradient Accent Bar */}
                    <div className={`absolute top-0 left-6 right-6 h-1 bg-gradient-to-r ${stat.color} rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
                    
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} p-4 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <stat.icon className="w-full h-full text-white" />
                    </div>
                    
                    <div className="text-4xl font-black text-slate-900 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-600 transition-all duration-300">
                      {stat.number}
                    </div>
                    
                    <div className="text-slate-600 font-medium">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section - Card Grid with Hover Effects */}
        <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-4">
                <Sparkles className="w-4 h-4" />
                What We Do
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-4">
                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">Services</span>
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Comprehensive healthcare solutions designed to meet the unique needs of African communities.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div
                  key={service.title}
                  className="group relative animate-fade-in"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="relative bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-300/50 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                    {/* Hover Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                    
                    {/* Icon */}
                    <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} p-4 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <service.icon className="w-full h-full text-white" />
                    </div>

                    <h3 className="text-2xl font-bold text-slate-900 mb-3">
                      {service.title}
                    </h3>
                    
                    <p className="text-slate-600 mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                      <span className="text-sm font-semibold text-blue-600">{service.stat}</span>
                      <Link
                        to="/our-works"
                        className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all duration-300"
                      >
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black text-white mb-4">
                Voices of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Impact</span>
              </h2>
              <p className="text-xl text-white/60">Stories from the communities we serve</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="group animate-fade-in"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300">
                    {/* Quote Icon */}
                    <div className="text-6xl text-blue-400/20 font-serif mb-4">"</div>
                    
                    {/* Stars */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>

                    <p className="text-white/80 text-lg leading-relaxed mb-6">
                      {testimonial.text}
                    </p>

                    <div className="flex items-center gap-3 pt-6 border-t border-white/10">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-white font-bold">
                        {testimonial.name[0]}
                      </div>
                      <div>
                        <div className="font-semibold text-white">{testimonial.name}</div>
                        <div className="text-sm text-white/50">{testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Community Impact Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8 animate-fade-in">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-600 text-sm font-medium">
                  <Globe className="w-4 h-4" />
                  Our Mission
                </div>
                
                <h2 className="text-5xl md:text-6xl font-black text-slate-900 leading-tight">
                  Transforming{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">
                    Communities
                  </span>
                </h2>
                
                <div className="space-y-4">
                  <p className="text-lg text-slate-600 leading-relaxed">
                    Since our founding in November 2022, OPHEG has been at the forefront 
                    of community healthcare transformation. We bring essential medical 
                    services directly to underserved communities, breaking down barriers 
                    to healthcare access.
                  </p>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    Our comprehensive approach includes mobile surgical teams, health 
                    education programs, and sustainable facility development to ensure 
                    lasting positive impact.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button
                    asChild
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-6 text-lg rounded-2xl shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/50 transition-all duration-300"
                  >
                    <Link to="/about">
                      Learn More About Us
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="px-8 py-6 text-lg rounded-2xl border-2 border-slate-300 hover:border-emerald-500 hover:text-emerald-600 transition-all duration-300"
                  >
                    <Link to="/our-works">See Our Work</Link>
                  </Button>
                </div>
              </div>

              <div className="relative animate-fade-in">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                  <img
                    src={communityOutreachImg}
                    alt="OPHEG community health outreach"
                    className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
                  
                  {/* Overlay Stats */}
                  <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-2xl font-bold text-slate-900">50+</div>
                        <div className="text-sm text-slate-600">Communities Reached</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-slate-900">100%</div>
                        <div className="text-sm text-slate-600">Impact Rating</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-slate-900">Free</div>
                        <div className="text-sm text-slate-600">Healthcare Access</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section - Bold and Modern */}
        <section className="relative py-24 pb-28 sm:pb-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-cyan-500 to-emerald-500" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
              <h2 className="text-5xl md:text-7xl font-black text-white leading-tight">
                Ready to Make a{" "}
                <span className="relative">
                  Difference
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 20" preserveAspectRatio="none">
                    <path d="M0 10 Q 25 0, 50 10 T 100 10" stroke="#FFD700" strokeWidth="3" fill="none" />
                  </svg>
                </span>
                ?
              </h2>
              
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Join us in our mission to bring quality healthcare to every community. 
                Whether you need medical care or want to contribute to our cause, 
                we're here to help.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg rounded-2xl shadow-2xl shadow-blue-900/50 hover:shadow-blue-900/80 transition-all duration-300 hover:scale-105 font-bold"
                >
                  <Link to="/appointments">
                    Schedule Your Appointment
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

export default Home;