import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import OurWorks from "./pages/OurWorks";
import GetInvolved from "./pages/GetInvolved";
import NotFound from "./pages/NotFound";
import Appointments from "./pages/Appointments";
import HealthAI from "./pages/HealthAI";
import ProgramDetail from "./pages/ProgramDetails";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import SocialMediaPage from "./pages/SocialMediaPage";
import SiteHeader from "./components/layout/SiteHeader";
import SiteFooter from "./components/layout/SiteFooter";

const queryClient = new QueryClient();

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const shouldOverlapFooter = ["/", "/about", "/our-works", "/get-involved"].includes(location.pathname);

  return (
    <>
      <SiteHeader />
      <main className={`min-h-[calc(100vh-200px)] ${shouldOverlapFooter ? "pb-0" : "pb-12 sm:pb-16 lg:pb-20"}`}>
        {children}
      </main>
      <SiteFooter overlap={shouldOverlapFooter} />
    </>
  );
};

const SocialMediaLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className="min-h-screen">{children}</main>
    </>
  );
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Admin Routes (no header/footer) */}
          <Route path="/admin">
            <Route
              path="login"
              element={
                <AdminLayout>
                  <AdminLogin />
                </AdminLayout>
              }
            />
            <Route
              path="dashboard"
              element={
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              }
            />
          </Route>

          {/* Social Media Page (custom layout) */}
          <Route
            path="/social-platforms"
            element={
              <SocialMediaLayout>
                <SocialMediaPage />
              </SocialMediaLayout>
            }
          />

          {/* Main Website Routes (with header/footer) */}
          <Route
            path="/"
            element={
              <MainLayout>
                <Home />
              </MainLayout>
            }
          />
          <Route
            path="/about"
            element={
              <MainLayout>
                <About />
              </MainLayout>
            }
          />
          <Route
            path="/our-works"
            element={
              <MainLayout>
                <OurWorks />
              </MainLayout>
            }
          />
          <Route
            path="/get-involved"
            element={
              <MainLayout>
                <GetInvolved />
              </MainLayout>
            }
          />
          <Route
            path="/appointments"
            element={
              <MainLayout>
                <Appointments />
              </MainLayout>
            }
          />
          <Route
            path="/health-ai"
            element={
              <MainLayout>
                <HealthAI />
              </MainLayout>
            }
          />
          <Route
            path="/programs/:slug"
            element={
              <MainLayout>
                <ProgramDetail />
              </MainLayout>
            }
          />

          {/* Catch-all 404 Route */}
          <Route
            path="*"
            element={
              <NotFound />
            }
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
