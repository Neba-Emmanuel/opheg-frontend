// SiteHeader.jsx - Redesigned Header with Glass Morphism
import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Sparkles, Stethoscope } from "lucide-react";
import { useState, useEffect } from "react";

const SiteHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Our Works", href: "/our-works" },
    { name: "Get Involved", href: "/get-involved" },
    { name: "Volunteer Portal", href: "/volunteers" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-lg shadow-slate-200/20"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center group">
          <img
            src="/logo-full.png"
            alt="OPHEG Logo"
            className="h-10 w-auto object-contain"
            loading="eager"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden gap-1 xl:flex">
          {navigationItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? "text-blue-600 bg-blue-50"
                    : "text-slate-600 hover:text-blue-600 hover:bg-slate-50"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Button
            asChild
            variant="ghost"
            className="hidden md:inline-flex hover:bg-blue-50 hover:text-blue-600 transition-all duration-300"
          >
            <Link to="/health-ai">
              <Sparkles className="mr-2 h-4 w-4" />
              Health AI
            </Link>
          </Button>
          
          <Button
            asChild
            className="hidden sm:inline-flex bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 rounded-xl"
          >
            <Link to="/appointments">
              <Stethoscope className="mr-2 h-4 w-4" />
              Book Appointment
            </Link>
          </Button>

          {/* Mobile Menu Trigger */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="xl:hidden hover:bg-slate-100 rounded-xl"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            
            <SheetContent
              side="right"
              className="w-[300px] sm:w-[400px] bg-gradient-to-b from-white to-blue-50 p-0"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Menu Header */}
                <div className="flex items-center p-6 border-b border-slate-200">
                  <img
                    src="/logo-full.png"
                    alt="OPHEG Logo"
                    className="h-10 w-auto object-contain"
                  />
                </div>

                {/* Mobile Navigation */}
                <nav className="flex-1 p-6 space-y-2">
                  {navigationItems.map((item, index) => (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl text-lg font-semibold transition-all duration-300 ${
                          isActive
                            ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
                            : "text-slate-700 hover:bg-slate-100"
                        }`
                      }
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="w-2 h-2 rounded-full bg-current" />
                      {item.name}
                    </NavLink>
                  ))}
                </nav>

                {/* Mobile Action Buttons */}
                <div className="p-6 space-y-3 border-t border-slate-200">
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg shadow-blue-500/25 rounded-xl py-6 text-lg font-semibold"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Link to="/appointments">
                      <Stethoscope className="mr-2 h-5 w-5" />
                      Book Appointment
                    </Link>
                  </Button>
                  
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-2 border-blue-200 text-blue-600 hover:bg-blue-50 rounded-xl py-6 text-lg font-semibold"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Link to="/health-ai">
                      <Sparkles className="mr-2 h-5 w-5" />
                      Chat with Health AI
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;