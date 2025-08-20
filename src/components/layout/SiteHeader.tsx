import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";

const SiteHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Our Works", href: "#" },
    { name: "Get Involved", href: "#" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Optimum Health Global (OPHEG) logo showing a stethoscope around a globe"
            className="h-9 w-9 rounded-full"
            loading="eager"
          />
          <span className="display-title text-lg font-semibold">OPHEG</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden gap-6 md:flex">
          {navigationItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                isActive
                  ? "text-primary"
                  : "text-foreground/80 hover:text-foreground transition-colors"
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="outline" className="hidden md:inline-flex">
            <Link to="/health-ai">Chat with Health AI</Link>
          </Button>
          <Button asChild variant="hero" className="hidden sm:inline-flex">
            <Link to="/appointments">Book Appointment</Link>
          </Button>

          {/* Mobile Menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4">
                <div className="flex items-center gap-3 pb-4 border-b">
                  <img
                    src="/logo.png"
                    alt="OPHEG logo"
                    className="h-8 w-8 rounded-full"
                  />
                  <span className="display-title text-lg font-semibold">
                    OPHEG
                  </span>
                </div>

                {navigationItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `text-lg py-2 px-3 rounded-md transition-colors ${
                        isActive
                          ? "text-primary bg-primary/10"
                          : "text-foreground/80 hover:text-foreground hover:bg-accent"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}

                <div className="flex flex-col gap-3 pt-4 border-t">
                  <Button
                    asChild
                    variant="outline"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Link to="/health-ai">Chat with Health AI</Link>
                  </Button>
                  <Button
                    asChild
                    variant="hero"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Link to="/appointments">Book Appointment</Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
