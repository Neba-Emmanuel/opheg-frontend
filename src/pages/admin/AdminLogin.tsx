import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Eye, EyeOff, ArrowUpRight, ShieldCheck } from "lucide-react";
import { useApiMutation } from "@/hooks/useApi";
import SEO from "@/components/SEO";
import "./admin.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const mutation = useApiMutation<
    { accessToken: string },
    { email: string; password: string; role?: string }
  >("/auth/login", "POST");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLoading) return;

    setIsLoading(true);

    try {
      const response = await mutation.mutateAsync({
        email,
        password,
        role: "admin",
      });
      localStorage.setItem("opheg_admin_token", response.accessToken);
      toast({
        title: "Login successful",
        description: "Welcome to OPHEG Admin Panel",
      });
      navigate("/admin/dashboard");
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Invalid credentials.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const submitting = isLoading || mutation.isPending;

  return (
    <>
      <SEO
        title="Admin Login - OPHEG"
        description="Admin panel login for OPHEG organization"
        noindex
      />
      <div className="admin-login">
        <aside className="admin-login-story">
          <Link to="/" className="admin-brand">
            <span className="admin-logo">
              <img src="/logo.png" alt="OPHEG logo" />
            </span>
            <span>
              OPHEG
              <span className="admin-brand-sub">Administration</span>
            </span>
          </Link>
          <div>
            <h1>
              Welcome back.<br />
              Let's keep <span>healthier communities</span> moving.
            </h1>
            <p>
              Sign in to review appointments, welcome new volunteers and
              partners, and share the stories behind your impact.
            </p>
          </div>
          <small>© {new Date().getFullYear()} Optimum Health Global · Taking health to the communities.</small>
        </aside>

        <div className="admin-login-form">
          <div className="admin-login-box">
            <p className="admin-eyebrow">SECURE ADMIN ACCESS</p>
            <h2>Sign in</h2>
            <p className="admin-login-hint">
              Use your OPHEG administrator credentials to continue.
            </p>

            <form onSubmit={handleLogin}>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@opheg.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={submitting}
                  autoComplete="email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={submitting}
                    autoComplete="current-password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={submitting}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>
              <Button type="submit" className="admin-login-submit" disabled={submitting}>
                {submitting ? "Signing in..." : "Sign in to dashboard"}
              </Button>
            </form>

            <div className="admin-login-note">
              <ShieldCheck size={16} />
              <span>This is a restricted area. Access is monitored.</span>
            </div>

            <Link to="/" className="admin-login-back">
              Back to public website <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
