// GetInvolved.jsx - Complete Redesign
import { useState, useRef, useEffect } from "react";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  UserCheck,
  Building2,
  Heart,
  Microscope,
  GraduationCap,
  Stethoscope,
  Users,
  Handshake,
  Globe,
  FileText,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Zap,
  Star,
  Clock,
  AlertCircle,
  Send,
  X,
} from "lucide-react";
import volunteersWorkingImg from "@/assets/volunteers-working.jpg";
import partnershipsImg from "@/assets/partnerships.jpg";
import getInvolvedHeroImg from "@/assets/get-involved-hero.jpg";
import { useToast } from "@/hooks/use-toast";
import { useCreateApplication } from "@/hooks/useApplications";
import { Link } from "react-router-dom";

const GetInvolved = () => {
  const [activeForm, setActiveForm] = useState<"volunteer" | "partner" | null>(null);
  const [activeTab, setActiveTab] = useState<"volunteer" | "partner">("volunteer");
  const createApplication = useCreateApplication();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    experience: "",
    organization: "",
    message: "",
  });
  const { toast } = useToast();

  const formRef = useRef<HTMLDivElement | null>(null);
  const topRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (activeForm && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [activeForm]);

  const handleCancel = () => {
    setActiveForm(null);
    setErrors({});
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const volunteerOpportunities = [
    {
      icon: Stethoscope,
      title: "Medical Volunteers",
      description: "Doctors, nurses, lab technicians, and medical specialists providing direct patient care",
      requirements: [
        "Valid medical license or proof of study",
        "No minimum experience required",
        "Commitment to community service",
      ],
      commitment: "Flexible duration",
      urgency: "high",
      gradient: "from-rose-500 to-pink-500",
    },
    {
      icon: Users,
      title: "Community Health Workers",
      description: "Support community outreach programs and health education initiatives",
      requirements: [
        "Health education background",
        "Local language skills",
        "Community engagement experience",
      ],
      commitment: "Flexible duration",
      urgency: "medium",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: FileText,
      title: "Administrative Support",
      description: "Help with project management, documentation, and operational support",
      requirements: [
        "Administrative experience",
        "Computer skills",
        "Organizational abilities",
      ],
      commitment: "Flexible duration",
      urgency: "medium",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      icon: Microscope,
      title: "Field Researchers",
      description: "Conduct health research and data collection in community settings",
      requirements: [
        "Research background",
        "Data analysis skills",
        "Field work experience",
      ],
      commitment: "Flexible duration",
      urgency: "low",
      gradient: "from-purple-500 to-indigo-500",
    },
    {
      icon: GraduationCap,
      title: "Content Creators & Digital Skills",
      description: "Create health education content, manage social media, develop digital tools and software solutions",
      requirements: [
        "Content creation or tech skills",
        "Creative mindset",
        "Passion for health education",
      ],
      commitment: "Flexible duration",
      urgency: "medium",
      gradient: "from-orange-500 to-red-500",
    },
  ];

  const currentNeeds = [
    {
      category: "Medical Equipment",
      items: ["Reagents and diagnostic kits", "Diagnostic equipment", "Mobile clinic vehicles"],
      icon: Stethoscope,
      gradient: "from-blue-500 to-cyan-500",
      urgency: "Critical",
    },
    {
      category: "Human Resources",
      items: ["Doctors, nurses, lab technicians", "Content creators, data analysts", "Community health coordinators"],
      icon: Users,
      gradient: "from-emerald-500 to-teal-500",
      urgency: "High",
    },
    {
      category: "Funding",
      items: ["Program implementation", "Infrastructure development", "Training materials"],
      icon: Heart,
      gradient: "from-rose-500 to-pink-500",
      urgency: "Ongoing",
    },
    {
      category: "Partnerships",
      items: ["Technology providers", "Educational institutions", "Government agencies"],
      icon: Handshake,
      gradient: "from-purple-500 to-indigo-500",
      urgency: "Strategic",
    },
  ];

  const validateForm = (type: "volunteer" | "partner") => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Full Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";
    if (!formData.location.trim()) newErrors.location = "Location is required.";

    if (type === "partner" && !formData.organization.trim()) {
      newErrors.organization = "Organization is required.";
    }
    if (type === "volunteer" && !formData.experience.trim()) {
      newErrors.experience = "Relevant experience is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async (type: "volunteer" | "partner") => {
    if (!validateForm(type)) return;

    try {
      await createApplication.mutateAsync({
        type,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        organization: formData.organization,
        interest: formData.experience,
        message: formData.message,
      });

      setSubmitted(true);
      toast({
        title: "Application Submitted Successfully! 🎉",
        description: `Thank you for your interest in ${
          type === "volunteer" ? "volunteering" : "partnering"
        } with OPHEG. We'll contact you within 48 hours.`,
      });
      
      setTimeout(() => {
        setActiveForm(null);
        setSubmitted(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          location: "",
          experience: "",
          organization: "",
          message: "",
        });
        setErrors({});
      }, 2000);
    } catch (err: any) {
      toast({
        title: "Submission Failed",
        description: err.message || "Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <SEO
        title="Get Involved - Volunteer & Partnership Opportunities"
        description="Join OPHEG's mission to transform healthcare in Africa. Discover volunteer opportunities and partnership programs for individuals and organizations committed to community health."
        canonical="/get-involved"
      />

      <div className="relative overflow-hidden" ref={topRef}>
        {/* Hero Section - Inspiring Design */}
        <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-purple-950">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={getInvolvedHeroImg}
              alt="Get involved with OPHEG"
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-blue-950/80 to-purple-950/70" />
          </div>

          {/* Floating Particles */}
          <div className="absolute inset-0 overflow-hidden">
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
          </div>

          <div className="container relative z-10 mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-8 animate-fade-in">
                {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-sm">
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                  <span>Join Our Movement</span>
                </div> */}

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white">
                  Get{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 animate-gradient-x">
                    Involved
                  </span>
                </h1>

                <p className="text-xl text-white/70 leading-relaxed max-w-lg">
                  Join our mission to transform healthcare in Africa. Whether you're 
                  an individual looking to volunteer or an organization seeking 
                  partnership, there's a place for you in our community.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={() => setActiveForm("volunteer")}
                    size="lg"
                    className="group bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-6 text-lg rounded-2xl shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
                  >
                    Become a Volunteer
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button
                    onClick={() => setActiveForm("partner")}
                    size="lg"
                    variant="outline"
                    className="px-8 py-6 text-lg rounded-2xl border-2 border-white/30 bg-white/10 text-white hover:bg-white/20 hover:border-white/50 transition-all duration-300 backdrop-blur-sm"
                  >
                    Partner With Us
                  </Button>
                </div>

                {/* Quick Stats */}
                <div className="flex gap-8 pt-8 border-t border-white/10">
                  <div>
                    <div className="text-3xl font-bold text-white">100+</div>
                    <div className="text-sm text-white/50">Volunteers</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white">5+</div>
                    <div className="text-sm text-white/50">Programs</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white">5,000+</div>
                    <div className="text-sm text-white/50">Reached</div>
                  </div>
                </div>
              </div>

              {/* Right Visual */}
              <div className="relative animate-fade-in delay-300 hidden lg:block">
                <div className="relative">
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                    <img
                      src={volunteersWorkingImg}
                      alt="Volunteers making impact"
                      className="w-full h-[500px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/50 to-transparent" />
                  </div>

                  {/* Floating Card */}
                  <div className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-slate-900">Join Us</div>
                        <div className="text-sm text-slate-500">Make an Impact</div>
                      </div>
                    </div>
                  </div>
                </div>
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

        {/* Opportunity Tabs */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-4">
                <Zap className="w-4 h-4" />
                Choose Your Path
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-4">
                Ways to{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">
                  Contribute
                </span>
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Whether you're an individual or organization, there are many ways to make a difference
              </p>
            </div>

            {/* Tab Switcher */}
            <div className="flex justify-center mb-12">
              <div className="inline-flex bg-slate-100 rounded-2xl p-1">
                <button
                  onClick={() => setActiveTab("volunteer")}
                  className={`px-8 py-3 rounded-xl text-lg font-semibold transition-all duration-300 ${
                    activeTab === "volunteer"
                      ? "bg-white text-blue-600 shadow-lg"
                      : "text-slate-600 hover:text-blue-600"
                  }`}
                >
                  <UserCheck className="inline w-5 h-5 mr-2" />
                  Volunteer
                </button>
                <button
                  onClick={() => setActiveTab("partner")}
                  className={`px-8 py-3 rounded-xl text-lg font-semibold transition-all duration-300 ${
                    activeTab === "partner"
                      ? "bg-white text-purple-600 shadow-lg"
                      : "text-slate-600 hover:text-purple-600"
                  }`}
                >
                  <Handshake className="inline w-5 h-5 mr-2" />
                  Partner
                </button>
              </div>
            </div>

            {/* Volunteer Opportunities */}
            {activeTab === "volunteer" && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {volunteerOpportunities.map((opportunity, index) => (
                  <div
                    key={opportunity.title}
                    className="group relative animate-fade-in hover:scale-105 transition-all duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all duration-500 h-full border border-slate-100">
                      {/* Gradient Top Bar */}
                      <div className={`absolute top-0 left-4 right-4 h-1 bg-gradient-to-r ${opportunity.gradient} rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
                      
                      {/* Icon */}
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${opportunity.gradient} p-3 mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <opportunity.icon className="w-full h-full text-white" />
                      </div>

                      {/* Urgency Badge */}
                      <div className="flex items-center gap-2 mb-3">
                        <Badge className={`${
                          opportunity.urgency === 'high' ? 'bg-red-100 text-red-700' :
                          opportunity.urgency === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {opportunity.urgency === 'high' ? '🔴 Urgent' :
                           opportunity.urgency === 'medium' ? '🟡 Active' : '🟢 Open'}
                        </Badge>
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 mb-2">{opportunity.title}</h3>
                      <p className="text-slate-600 text-sm mb-4">{opportunity.description}</p>

                      {/* Requirements */}
                      <div className="mb-4">
                        <h4 className="font-semibold text-sm mb-2 text-slate-700">Requirements:</h4>
                        <ul className="space-y-2">
                          {opportunity.requirements.map((req) => (
                            <li key={req} className="flex items-start gap-2 text-sm text-slate-500">
                              <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Commitment */}
                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <Clock className="w-4 h-4" />
                          {opportunity.commitment}
                        </div>
                        <Button
                          onClick={() => setActiveForm("volunteer")}
                          size="sm"
                          className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-xl"
                        >
                          Apply Now
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Partnership Opportunities */}
            {activeTab === "partner" && (
              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {[
                  {
                    icon: Building2,
                    title: "Corporate Partnerships",
                    description: "Align your brand with healthcare impact and community transformation.",
                    benefits: ["Brand visibility", "CSR fulfillment", "Employee engagement"],
                    gradient: "from-purple-500 to-indigo-500",
                  },
                  {
                    icon: GraduationCap,
                    title: "Academic Partnerships",
                    description: "Collaborate on research, training, and health education programs.",
                    benefits: ["Research opportunities", "Student programs", "Joint publications"],
                    gradient: "from-blue-500 to-cyan-500",
                  },
                  {
                    icon: Globe,
                    title: "NGO Collaborations",
                    description: "Join forces with other organizations to amplify health impact.",
                    benefits: ["Resource sharing", "Network expansion", "Program scaling"],
                    gradient: "from-emerald-500 to-teal-500",
                  },
                ].map((partner, index) => (
                  <div
                    key={partner.title}
                    className="group relative animate-fade-in hover:scale-105 transition-all duration-300"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="relative bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all duration-500 h-full border border-slate-100">
                      <div className={`absolute top-0 left-4 right-4 h-1 bg-gradient-to-r ${partner.gradient} rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
                      
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${partner.gradient} p-4 mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <partner.icon className="w-full h-full text-white" />
                      </div>

                      <h3 className="text-2xl font-bold text-slate-900 mb-3">{partner.title}</h3>
                      <p className="text-slate-600 mb-6">{partner.description}</p>

                      <div className="mb-6">
                        <h4 className="font-semibold text-sm mb-3 text-slate-700">Benefits:</h4>
                        <ul className="space-y-2">
                          {partner.benefits.map((benefit) => (
                            <li key={benefit} className="flex items-center gap-2 text-sm text-slate-500">
                              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button
                        onClick={() => setActiveForm("partner")}
                        className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white rounded-xl"
                      >
                        Partner With Us
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Current Needs - Urgent Calls to Action */}
        <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-600 text-sm font-medium mb-4">
                <AlertCircle className="w-4 h-4" />
                Urgent Needs
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-4">
                Current{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-500">
                  Needs
                </span>
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Areas where we're actively seeking support to expand our impact
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {currentNeeds.map((need, index) => (
                <div
                  key={need.category}
                  className="group relative animate-fade-in hover:scale-105 transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all duration-500 h-full">
                    <div className={`absolute top-0 left-4 right-4 h-1 bg-gradient-to-r ${need.gradient} rounded-full`} />
                    
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${need.gradient} p-3 mb-4 shadow-lg`}>
                      <need.icon className="w-full h-full text-white" />
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="font-bold text-slate-900">{need.category}</h3>
                      <Badge className="bg-red-100 text-red-700 text-xs">
                        {need.urgency}
                      </Badge>
                    </div>

                    <ul className="space-y-2">
                      {need.items.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Application Form - Modern Modal Style */}
        {activeForm && (
          <section ref={formRef} className="py-24 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
                  {/* Form Header */}
                  <div className={`p-8 text-white ${
                    activeForm === "volunteer"
                      ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                      : "bg-gradient-to-r from-purple-500 to-indigo-500"
                  }`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-3xl font-black">
                          {activeForm === "volunteer" ? "Volunteer Application" : "Partnership Inquiry"}
                        </h2>
                        <p className="text-white/80 mt-2">
                          {activeForm === "volunteer"
                            ? "Join our team of dedicated healthcare volunteers"
                            : "Let's work together to transform healthcare"}
                        </p>
                      </div>
                      <button
                        onClick={handleCancel}
                        className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Form Body */}
                  <div className="p-8">
                    {submitted ? (
                      <div className="text-center py-12 space-y-4">
                        <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
                          <CheckCircle className="w-10 h-10 text-emerald-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900">Application Submitted!</h3>
                        <p className="text-slate-600">Thank you for your interest. We'll be in touch soon.</p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <Label htmlFor="name" className="text-slate-700 font-semibold mb-2 block">
                              Full Name *
                            </Label>
                            <Input
                              id="name"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              placeholder="Your full name"
                              className={`rounded-xl ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
                            />
                            {errors.name && (
                              <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" /> {errors.name}
                              </p>
                            )}
                          </div>

                          <div>
                            <Label htmlFor="email" className="text-slate-700 font-semibold mb-2 block">
                              Email *
                            </Label>
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              placeholder="your@email.com"
                              className={`rounded-xl ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                            />
                            {errors.email && (
                              <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" /> {errors.email}
                              </p>
                            )}
                          </div>

                          <div>
                            <Label htmlFor="phone" className="text-slate-700 font-semibold mb-2 block">
                              Phone *
                            </Label>
                            <Input
                              id="phone"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              placeholder="+237 XXX XXX XXX"
                              className={`rounded-xl ${errors.phone ? 'border-red-500 focus:ring-red-500' : ''}`}
                            />
                            {errors.phone && (
                              <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" /> {errors.phone}
                              </p>
                            )}
                          </div>

                          <div>
                            <Label htmlFor="location" className="text-slate-700 font-semibold mb-2 block">
                              Location *
                            </Label>
                            <Input
                              id="location"
                              value={formData.location}
                              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                              placeholder="City, Country"
                              className={`rounded-xl ${errors.location ? 'border-red-500 focus:ring-red-500' : ''}`}
                            />
                            {errors.location && (
                              <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" /> {errors.location}
                              </p>
                            )}
                          </div>

                          {activeForm === "partner" && (
                            <div>
                              <Label htmlFor="organization" className="text-slate-700 font-semibold mb-2 block">
                                Organization *
                              </Label>
                              <Input
                                id="organization"
                                value={formData.organization}
                                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                                placeholder="Organization name"
                                className={`rounded-xl ${errors.organization ? 'border-red-500 focus:ring-red-500' : ''}`}
                              />
                              {errors.organization && (
                                <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                                  <AlertCircle className="w-3 h-3" /> {errors.organization}
                                </p>
                              )}
                            </div>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="experience" className="text-slate-700 font-semibold mb-2 block">
                            {activeForm === "volunteer" ? "Relevant Experience *" : "Partnership Interest *"}
                          </Label>
                          <Textarea
                            id="experience"
                            value={formData.experience}
                            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                            placeholder={
                              activeForm === "volunteer"
                                ? "Describe your relevant skills and experience"
                                : "Describe your partnership interests and goals"
                            }
                            className={`rounded-xl min-h-[120px] ${errors.experience ? 'border-red-500 focus:ring-red-500' : ''}`}
                          />
                          {errors.experience && (
                            <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" /> {errors.experience}
                            </p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="message" className="text-slate-700 font-semibold mb-2 block">
                            Additional Message
                          </Label>
                          <Textarea
                            id="message"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            placeholder="Any additional information you'd like to share"
                            className="rounded-xl min-h-[100px]"
                          />
                        </div>

                        <div className="flex gap-4 pt-4">
                          <Button
                            onClick={() => handleFormSubmit(activeForm)}
                            className={`flex-1 py-6 text-lg font-semibold rounded-xl ${
                              activeForm === "volunteer"
                                ? "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                                : "bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
                            } text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105`}
                            disabled={createApplication.isPending}
                          >
                            {createApplication.isPending ? (
                              "Submitting..."
                            ) : (
                              <>
                                <Send className="mr-2 w-5 h-5" />
                                Submit Application
                              </>
                            )}
                          </Button>
                          <Button
                            onClick={handleCancel}
                            variant="outline"
                            className="px-6 rounded-xl"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Contact Information */}
        <section className="py-24 pb-28 sm:pb-32 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
                Have{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                  Questions?
                </span>
              </h2>
              <p className="text-xl text-white/60 max-w-2xl mx-auto">
                We're here to help you find the right opportunity
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { icon: Mail, label: "Email", value: "opheg.com", gradient: "from-blue-500 to-cyan-500" },
                { icon: Phone, label: "Phone", value: "+237 671 040 745", gradient: "from-emerald-500 to-teal-500" },
                { icon: MapPin, label: "Location", value: "Kumba, Cameroon", gradient: "from-purple-500 to-pink-500" },
              ].map((contact, index) => (
                <div
                  key={index}
                  className="group relative animate-fade-in hover:scale-105 transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 text-center">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${contact.gradient} p-4 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <contact.icon className="w-full h-full text-white" />
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2">{contact.label}</h3>
                    <p className="text-white/70">{contact.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center mt-16">
              <Button
                asChild
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg rounded-2xl shadow-2xl shadow-blue-900/50 hover:shadow-blue-900/80 transition-all duration-300 hover:scale-105 font-bold"
              >
                <Link to="/appointments">
                  Book an Appointment
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default GetInvolved;