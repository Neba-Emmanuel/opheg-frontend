import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import OurWorks from "./pages/OurWorks";
import GetInvolved from "./pages/GetInvolved";
import NotFound from "./pages/NotFound";
import Appointments from "./pages/Appointments";
import HealthAI from "./pages/HealthAI";
import ProgramDetail from "./pages/ProgramDetails";
import SiteHeader from "./components/layout/SiteHeader";
import SiteFooter from "./components/layout/SiteFooter";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SiteHeader />
        <main className="min-h-[calc(100vh-200px)]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/our-works" element={<OurWorks />} />
            <Route path="/get-involved" element={<GetInvolved />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/health-ai" element={<HealthAI />} />
            <Route path="/programs/:slug" element={<ProgramDetail />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <SiteFooter />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
