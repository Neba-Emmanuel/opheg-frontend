// SiteFooter.jsx - Modern Footer Design
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSubscribe } from "@/hooks/useNewsletter";
import { Heart, MapPin, Mail, Phone, ArrowRight, Sparkles, Stethoscope } from "lucide-react";
import { Link } from "react-router-dom";

const SiteFooter = ({ overlap = false }: { overlap?: boolean }) => {
  const [email, setEmail] = useState("");
  const { mutate } = useSubscribe();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast({
        title: "Oops!",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    try {
      await mutate({ email });
      toast({
        title: "Welcome aboard! 🎉",
        description: "You've successfully subscribed to our newsletter.",
      });
      setEmail("");
    } catch (error) {
      toast({
        title: "Subscription Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <footer className={`relative z-10 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white ${overlap ? "-mt-3 sm:-mt-4 lg:-mt-6" : ""}`}>
      {/* Decorative Wave */}
      <div className="absolute top-0 left-0 right-0 transform -translate-y-full">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 60L48 50C96 40 192 20 288 30C384 40 480 80 576 85C672 90 768 60 864 50C960 40 1056 50 1152 55C1248 60 1344 60 1392 60L1440 60V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V60Z"
            fill="currentColor"
            className="text-slate-900"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center">
              <img
                src="/logo-full.png"
                alt="OPHEG Logo"
                className="h-10 w-auto object-contain brightness-0 invert"
              />
            </div>
            
            <p className="text-white/70 leading-relaxed">
              Taking health to the communities and ensuring a clean health and 
              clean society across Africa.
            </p>

            <div className="flex items-center gap-2 text-sm text-white/50">
              <Stethoscope className="w-4 h-4 text-blue-400" />
              <span>Founded: 22 November 2022</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-blue-400 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { name: "About Us", href: "/about" },
                { name: "Our Works", href: "/our-works" },
                { name: "Get Involved", href: "/get-involved" },
                { name: "Book Appointment", href: "/appointments" },
                { name: "Health AI", href: "/health-ai" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="flex items-center gap-2 text-white/60 hover:text-white hover:translate-x-1 transition-all duration-300 group"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -ml-6 group-hover:ml-0 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-blue-400 mb-4">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/60">
                <MapPin className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <span>Kumba, Meme Division, Southwest Region, Cameroon</span>
              </li>
              <li className="flex items-center gap-3 text-white/60">
                <Mail className="w-5 h-5 text-blue-400 shrink-0" />
                <a href="mailto:info@opheg.com" className="hover:text-white transition-colors">
                  info@opheg.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-white/60">
                <Phone className="w-5 h-5 text-blue-400 shrink-0" />
                <div className="flex flex-col">
                  <a href="tel:+237671040745" className="hover:text-white transition-colors">
                    (+237) 671 040 745
                  </a>
                  <a href="tel:+237699633721" className="hover:text-white transition-colors">
                    (+237) 699 633 721
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-blue-400 mb-4">
              Stay Updated
            </h4>
            <p className="text-white/60 mb-4 leading-relaxed">
              Subscribe to receive updates, health tips, and information about our impact.
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <div className="relative">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="w-full bg-white/10 border-white/10 text-white placeholder:text-white/40 rounded-xl pl-4 pr-12 py-3 focus:border-blue-400 focus:ring-blue-400/20 transition-all duration-300"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Sparkles className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
              </div>
              
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold rounded-xl py-3 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
              >
                Subscribe Now
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm">
              © {new Date().getFullYear()} Optimum Health Global (OPHEG). All rights reserved.
            </p>
            
            <div className="flex items-center gap-6">
              <Link to="/privacy" className="text-sm text-white/40 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-white/40 hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;