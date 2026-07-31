// NotFound.jsx - Complete Redesign
import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import {
  Home,
  Search,
  ArrowRight,
  Heart,
  Stethoscope,
  Phone,
  MapPin,
  Sparkles,
  AlertCircle,
  Compass,
} from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const quickLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "About Us", href: "/about", icon: Heart },
    { name: "Our Work", href: "/our-works", icon: Stethoscope },
    { name: "Get Involved", href: "/get-involved", icon: Sparkles },
    { name: "Book Appointment", href: "/appointments", icon: Compass },
  ];

  const helpLinks = [
    { icon: Phone, label: "Call Us", value: "+237 676 395 082" },
    { icon: MapPin, label: "Visit Us", value: "Kumba, Cameroon" },
  ];

  return (
    <>
      <SEO
        title="404 - Page Not Found | OPHEG"
        description="The page you're looking for doesn't exist. Return to Optimum Health Global's homepage or explore our healthcare services."
        canonical="/404"
      />

      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Gradient Orbs */}
          <div 
            className="absolute w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl animate-pulse"
            style={{
              left: `${mousePosition.x * 0.05}%`,
              top: `${mousePosition.y * 0.05}%`,
            }}
          />
          <div 
            className="absolute w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000"
            style={{
              right: `${(window.innerWidth - mousePosition.x) * 0.05}%`,
              bottom: `${(window.innerHeight - mousePosition.y) * 0.05}%`,
            }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl" />

          {/* Floating Particles */}
          {[...Array(30)].map((_, i) => (
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

          {/* Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        {/* Main Content */}
        <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* 404 Number */}
            <div className="relative mb-8">
              <h1 className="text-[12rem] md:text-[16rem] lg:text-[20rem] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-white/5 select-none animate-fade-in">
                404
              </h1>
              
              {/* Floating Elements Around 404 */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <div className="relative">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-3 h-3 rounded-full bg-blue-400/30 animate-ping"
                      style={{
                        left: `${Math.cos(i * Math.PI / 4) * 180}px`,
                        top: `${Math.sin(i * Math.PI / 4) * 180}px`,
                        animationDelay: `${i * 0.2}s`,
                        animationDuration: '2s',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Error Message */}
            <div className="space-y-6 animate-fade-in delay-200">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-sm">
                <AlertCircle className="w-4 h-4 text-yellow-400" />
                <span>Page Not Found</span>
              </div>

              <h2 className="text-3xl md:text-5xl font-black text-white">
                Oops! This page has{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                  wandered off
                </span>
              </h2>

              <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
                The page you're looking for doesn't exist or has been moved. 
                But don't worry — we're still here to help you achieve optimum health!
              </p>
            </div>

            {/* Quick Links Grid */}
            <div className="mt-12 animate-fade-in delay-300">
              <p className="text-white/50 text-sm mb-4">Quick Links</p>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 max-w-2xl mx-auto">
                {quickLinks.map((link, index) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="group flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center group-hover:from-blue-500/30 group-hover:to-cyan-500/30 transition-all">
                      <link.icon className="w-5 h-5 text-blue-400 group-hover:text-blue-300" />
                    </div>
                    <span className="text-sm text-white/70 group-hover:text-white transition-colors">
                      {link.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in delay-400">
              <Button
                asChild
                size="lg"
                className="group bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-6 text-lg rounded-2xl shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
              >
                <Link to="/">
                  <Home className="mr-2 w-5 h-5" />
                  Back to Home
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="px-8 py-6 text-lg rounded-2xl border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm"
              >
                <Link to="/health-ai">
                  <Sparkles className="mr-2 w-5 h-5" />
                  Chat with Health AI
                </Link>
              </Button>
            </div>

            {/* Help Section */}
            <div className="mt-12 flex flex-wrap justify-center gap-6 animate-fade-in delay-500">
              {helpLinks.map((link, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 text-white/60 hover:text-white/80 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                    <link.icon className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-white/40">{link.label}</p>
                    <p className="text-sm font-medium">{link.value}</p>
                  </div>
                </div>
              ))}
            </div>

            
          </div>
        </div>

        {/* Bottom Decorative Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path
              d="M0 60L48 50C96 40 192 20 288 30C384 40 480 80 576 85C672 90 768 60 864 50C960 40 1056 50 1152 55C1248 60 1344 60 1392 60L1440 60V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V60Z"
              fill="currentColor"
              className="text-white/5"
            />
          </svg>
        </div>
      </div>
    </>
  );
};

export default NotFound;