// ProgramDetail.jsx - Complete Redesign
import { useParams, Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  ArrowLeft,
  ArrowRight,
  Heart,
  Users,
  Target,
  Sparkles,
  Clock,
  MapPin,
  Share2,
  Bookmark,
  ChevronRight,
  Image as ImageIcon,
  Play,
  Star,
  Zap,
  CheckCircle,
  Search,
} from "lucide-react";
import { useState } from "react";
import medicalTrainingImg from "@/assets/medical-training.jpg";
import healthFacilityImg from "@/assets/health-facility.jpg";
import communityOutreachImg from "@/assets/outreach.jpg";

const programData = {
  "health-flix": {
    title: "Health Flix",
    description: "Digital platform for educating communities and health workers alike on health issues through engaging content and modern curriculum.",
    longDescription: "Health Flix represents OPHEG's commitment to innovative health education. This digital platform delivers comprehensive training programs, certification courses, and continuing education resources to healthcare professionals and community members across Africa.",
    gradient: "from-blue-500 to-cyan-500",
    icon: Play,
    stats: {
      trained: "100+",
      courses: "10+",
      communities: "25+",
    },
    features: [
      "Modern curriculum development",
      "Hands-on practical training",
      "Professional certification programs",
      "Continuing education credits",
      "Digital learning resources",
      "Community health education",
    ],
    projects: [
      {
        id: 1,
        title: "Training Impact in Bamenda",
        description: "A one-week intensive training that empowered local healthcare workers with modern diagnostic skills. The program included hands-on workshops, simulation exercises, and certification exams.",
        date: "2025-08-01",
        location: "Bamenda, Northwest Region",
        impact: "50+ Healthcare Workers Trained",
        images: [medicalTrainingImg, healthFacilityImg],
        highlights: [
          "Intensive diagnostic training",
          "Hands-on workshops",
          "Professional certification",
          "Community outreach component",
        ],
      },
      {
        id: 2,
        title: "New Certification Programs",
        description: "We launched new certification tracks for nurses and lab technicians to improve career growth and healthcare delivery standards in the region.",
        date: "2025-08-15",
        location: "Kumba, Southwest Region",
        impact: "30+ Professionals Certified",
        images: [healthFacilityImg],
        highlights: [
          "Nursing certification track",
          "Lab technician program",
          "Career advancement support",
          "Quality assurance training",
        ],
      },
    ],
  },
  "diagnostic-center": {
    title: "Diagnostic Center",
    description: "A modern healthcare facility established to provide advanced diagnostic services to the community.",
    longDescription: "Our diagnostic center represents a significant milestone in bringing quality healthcare closer to underserved communities. Equipped with modern laboratory equipment and staffed by trained professionals, the center provides essential diagnostic services that were previously inaccessible to many.",
    gradient: "from-emerald-500 to-teal-500",
    icon: Target,
    stats: {
      patients: "500+",
      tests: "1000+",
      accuracy: "99%",
    },
    features: [
      "Advanced laboratory diagnostics",
      "Ultrasonography services",
      "Primary healthcare consultations",
      "Preventive health screenings",
      "Pharmacy services",
      "Health education programs",
    ],
    projects: [
      {
        id: 1,
        title: "Community Wellness Drive",
        description: "The diagnostic center organized free health screenings for 500+ community members, providing essential tests and health education to underserved populations.",
        date: "2025-07-20",
        location: "Kumba, Southwest Region",
        impact: "500+ Community Members Screened",
        images: [communityOutreachImg],
        highlights: [
          "Free health screenings",
          "Blood pressure checks",
          "Diabetes testing",
          "Health education sessions",
        ],
      },
    ],
  },
  "outreach-initiatives": {
    title: "Outreach Initiatives",
    description: "Regular community health outreach programs promoting preventive care and wellness.",
    longDescription: "Our outreach initiatives bring healthcare directly to the doorsteps of communities that need it most. Through mobile clinics, health education campaigns, and community partnerships, we're breaking down barriers to healthcare access.",
    gradient: "from-rose-500 to-pink-500",
    icon: Heart,
    stats: {
      reached: "5000+",
      programs: "15+",
      volunteers: "200+",
    },
    features: [
      "Health screenings",
      "Vaccination campaigns",
      "Health education",
      "Disease prevention",
      "Maternal health",
      "Child health services",
    ],
    projects: [],
  },
};

const ProgramDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const program = programData[slug as keyof typeof programData];
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeProject, setActiveProject] = useState<number | null>(null);

  if (!program) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white">
        <div className="text-center space-y-6">
          <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center mx-auto">
            <Search className="w-12 h-12 text-slate-400" />
          </div>
          <h1 className="text-4xl font-black text-slate-900">Program Not Found</h1>
          <p className="text-slate-600">The program you're looking for doesn't exist.</p>
          <Button asChild className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-6 text-lg rounded-2xl shadow-xl">
            <Link to="/our-works">
              <ArrowLeft className="mr-2 w-5 h-5" />
              Back to Programs
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`${program.title} - OPHEG`}
        description={program.description}
        canonical={`/programs/${slug}`}
      />

      <div className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white">
        {/* Hero Section */}
        <section className={`relative py-24 bg-gradient-to-br ${program.gradient} overflow-hidden`}>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />
          
          <div className="container mx-auto px-4 relative z-10">
            {/* Back Button */}
            <Link
              to="/our-works"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Back to Programs
            </Link>

            <div className="max-w-4xl">
              {/* Program Icon */}
              <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6">
                <program.icon className="w-10 h-10 text-white" />
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6">
                {program.title}
              </h1>

              <p className="text-xl text-white/80 max-w-2xl leading-relaxed mb-8">
                {program.description}
              </p>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-6">
                {Object.entries(program.stats).map(([key, value]) => (
                  <div key={key} className="text-center">
                    <div className="text-3xl font-black text-white">{value}</div>
                    <div className="text-sm text-white/60 capitalize">{key}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-16">
              {/* About Section */}
              <section className="animate-fade-in">
                <h2 className="text-3xl font-black text-slate-900 mb-6">About This Program</h2>
                <div className="prose prose-lg max-w-none text-slate-600 leading-relaxed">
                  <p>{program.longDescription}</p>
                </div>
              </section>

              {/* Features Grid */}
              <section className="animate-fade-in delay-200">
                <h2 className="text-3xl font-black text-slate-900 mb-6">Key Features</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {program.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 group hover:scale-105"
                    >
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${program.gradient} flex items-center justify-center shrink-0`}>
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-slate-700 font-medium text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Projects Section */}
              {program.projects.length > 0 && (
                <section className="animate-fade-in delay-300">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-black text-slate-900">Projects & Impact</h2>
                    <Badge className="bg-slate-100 text-slate-600">
                      {program.projects.length} Project{program.projects.length > 1 ? 's' : ''}
                    </Badge>
                  </div>

                  <div className="space-y-8">
                    {program.projects.map((project, index) => (
                      <div
                        key={project.id}
                        className="group relative bg-white rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all duration-500"
                        onMouseEnter={() => setActiveProject(index)}
                        onMouseLeave={() => setActiveProject(null)}
                      >
                        {/* Project Image Gallery */}
                        {project.images && project.images.length > 0 && (
                          <div className="relative h-80 overflow-hidden">
                            <img
                              src={project.images[0]}
                              alt={project.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className={`absolute inset-0 bg-gradient-to-t ${program.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                            
                            {/* Image Counter */}
                            {project.images.length > 1 && (
                              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium text-slate-700 shadow-lg">
                                <ImageIcon className="inline w-4 h-4 mr-1" />
                                {project.images.length} images
                              </div>
                            )}
                          </div>
                        )}

                        <div className="p-8">
                          {/* Project Meta */}
                          <div className="flex flex-wrap gap-4 mb-4 text-sm text-slate-500">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-blue-500" />
                              {project.date}
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-emerald-500" />
                              {project.location}
                            </div>
                            <div className="flex items-center gap-2">
                              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                              {project.impact}
                            </div>
                          </div>

                          <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-600 transition-all duration-300">
                            {project.title}
                          </h3>

                          <p className="text-slate-600 leading-relaxed mb-6">
                            {project.description}
                          </p>

                          {/* Project Highlights */}
                          <div className="grid sm:grid-cols-2 gap-3 pt-6 border-t border-slate-100">
                            {project.highlights.map((highlight, i) => (
                              <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                                <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${program.gradient}`} />
                                {highlight}
                              </div>
                            ))}
                          </div>

                          {/* Additional Images */}
                          {project.images.length > 1 && (
                            <div className="flex gap-3 mt-6 overflow-x-auto pb-2">
                              {project.images.slice(1).map((img, i) => (
                                <button
                                  key={i}
                                  onClick={() => setSelectedImage(img)}
                                  className="relative group/image shrink-0"
                                >
                                  <img
                                    src={img}
                                    alt={`${project.title} - ${i + 1}`}
                                    className="h-24 w-36 object-cover rounded-xl ring-2 ring-transparent hover:ring-blue-500 transition-all duration-300"
                                  />
                                  <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/20 rounded-xl transition-colors flex items-center justify-center">
                                    <Play className="w-6 h-6 text-white opacity-0 group-hover/image:opacity-100 transition-opacity" />
                                  </div>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Empty State for Projects */}
              {program.projects.length === 0 && (
                <section className="animate-fade-in">
                  <div className="text-center py-16 bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl border border-slate-200">
                    <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                      <Zap className="w-10 h-10 text-slate-400" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-700 mb-2">Projects Coming Soon</h3>
                    <p className="text-slate-500 max-w-md mx-auto">
                      We're working on exciting new projects for this program. Check back soon for updates!
                    </p>
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Program Info Card */}
              <div className="sticky top-24 space-y-6">
                <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200 animate-fade-in">
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-4">Program Info</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${program.gradient} flex items-center justify-center`}>
                          <Target className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">Status</p>
                          <p className="font-semibold text-slate-900">Active</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                          <Clock className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">Duration</p>
                          <p className="font-semibold text-slate-900">Ongoing</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                          <Users className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">Beneficiaries</p>
                          <p className="font-semibold text-slate-900">Community Members</p>
                        </div>
                      </div>
                    </div>

                    {/* Share & Save Buttons */}
                    <div className="flex gap-3 mt-6 pt-6 border-t border-slate-100">
                      <Button variant="outline" className="flex-1 rounded-xl">
                        <Share2 className="mr-2 w-4 h-4" />
                        Share
                      </Button>
                      <Button variant="outline" className="flex-1 rounded-xl">
                        <Bookmark className="mr-2 w-4 h-4" />
                        Save
                      </Button>
                    </div>
                  </div>
                </div>

                {/* CTA Card */}
                <div className={`relative bg-gradient-to-br ${program.gradient} rounded-3xl shadow-xl overflow-hidden animate-fade-in delay-200`}>
                  <div className="p-6 text-white text-center">
                    <Sparkles className="w-10 h-10 mx-auto mb-3 text-white/80" />
                    <h3 className="font-bold text-lg mb-2">Support This Program</h3>
                    <p className="text-white/80 text-sm mb-4">
                      Help us expand our impact and reach more communities.
                    </p>
                    <Button
                      asChild
                      variant="secondary"
                      className="w-full bg-white text-slate-900 hover:bg-slate-50 rounded-xl"
                    >
                      <Link to="/get-involved">
                        Get Involved
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Image Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-5xl max-h-[90vh]">
              <img
                src={selectedImage}
                alt="Project image"
                className="max-w-full max-h-[90vh] object-contain rounded-2xl"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProgramDetail;