import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";

const SiteHeader = () => {
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
        <nav className="hidden gap-6 md:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-primary"
                : "text-foreground/80 hover:text-foreground transition-colors"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "text-primary"
                : "text-foreground/80 hover:text-foreground transition-colors"
            }
          >
            About
          </NavLink>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-primary"
                : "text-foreground/80 hover:text-foreground transition-colors"
            }
          >
            Our Works
          </NavLink>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-primary"
                : "text-foreground/80 hover:text-foreground transition-colors"
            }
          >
            Get Involved
          </NavLink>
          {/* <NavLink to="/health-ai" className={({isActive}) => isActive ? "text-primary" : "text-foreground/80 hover:text-foreground transition-colors"}>Health AI</NavLink> */}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" className="hidden md:inline-flex">
            <Link to="#">Chat with Health AI</Link>
          </Button>
          <Button asChild variant="hero">
            <Link to="#">Book Appointment</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
