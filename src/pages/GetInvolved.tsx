import { useState } from "react";
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
  CheckCircle
} from "lucide-react";
import volunteersWorkingImg from "@/assets/volunteers-working.jpg";
import partnershipsImg from "@/assets/partnerships.jpg";
import { useToast } from "@/hooks/use-toast";

const GetInvolved = () => {
  const [activeForm, setActiveForm] = useState<'volunteer' | 'partner' | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    experience: '',
    motivation: '',
    organization: '',
    partnershipType: '',
    message: ''
  });
  const { toast } = useToast();

  const volunteerOpportunities = [
    {
      icon: Stethoscope,
      title: "Medical Volunteers",
      description: "Doctors, nurses, and medical specialists providing direct patient care",
      requirements: ["Valid medical license", "2+ years experience", "Commitment to community service"],
      commitment: "3-6 months",
      urgency: "high"
    },
    {
      icon: Users,
      title: "Community Health Workers",
      description: "Support community outreach programs and health education initiatives",
      requirements: ["Health education background", "Local language skills", "Community engagement experience"],
      commitment: "6-12 months",
      urgency: "medium"
    },
    {
      icon: FileText,
      title: "Administrative Support",
      description: "Help with project management, documentation, and operational support",
      requirements: ["Administrative experience", "Computer skills", "Organizational abilities"],
      commitment: "3+ months",
      urgency: "medium"
    },
    {
      icon: Microscope,
      title: "Field Researchers",
      description: "Conduct health research and data collection in community settings",
      requirements: ["Research background", "Data analysis skills", "Field work experience"],
      commitment: "6+ months",
      urgency: "low"
    },
    {
      icon: GraduationCap,
      title: "Training Coordinators",
      description: "Develop and deliver training programs for healthcare professionals",
      requirements: ["Education/training background", "Curriculum development", "Teaching experience"],
      commitment: "6+ months",
      urgency: "medium"
    }
  ];

  const partnershipTypes = [
    {
      icon: Building2,
      title: "Healthcare Institutions",
      description: "Hospitals, clinics, and medical centers seeking collaboration",
      benefits: ["Resource sharing", "Knowledge exchange", "Expanded reach"],
      examples: ["Medical equipment sharing", "Staff exchange programs", "Joint research initiatives"]
    },
    {
      icon: GraduationCap,
      title: "Educational Organizations",
      description: "Universities, schools, and training institutions",
      benefits: ["Research collaboration", "Student placements", "Curriculum development"],
      examples: ["Medical student rotations", "Research partnerships", "Educational programs"]
    },
    {
      icon: Globe,
      title: "International NGOs",
      description: "Global organizations working in healthcare and development",
      benefits: ["Funding opportunities", "Best practice sharing", "Advocacy support"],
      examples: ["Joint grant applications", "Program implementation", "Policy advocacy"]
    },
    {
      icon: Building2,
      title: "Corporate Sponsors",
      description: "Businesses supporting healthcare initiatives through CSR",
      benefits: ["Funding support", "Equipment donations", "Employee volunteering"],
      examples: ["Medical equipment donations", "Infrastructure funding", "Skills-based volunteering"]
    }
  ];

  const currentNeeds = [
    { category: "Medical Equipment", items: ["Surgical instruments", "Diagnostic equipment", "Mobile clinic vehicles"] },
    { category: "Human Resources", items: ["Experienced surgeons", "Nurse educators", "Community health coordinators"] },
    { category: "Funding", items: ["Program implementation", "Infrastructure development", "Training materials"] },
    { category: "Partnerships", items: ["Technology providers", "Educational institutions", "Government agencies"] }
  ];

  const handleFormSubmit = (type: 'volunteer' | 'partner') => {
    // Simulate form submission
    toast({
      title: "Application Submitted Successfully!",
      description: `Thank you for your interest in ${type === 'volunteer' ? 'volunteering' : 'partnering'} with OPHEG. We'll contact you within 48 hours.`,
    });
    setActiveForm(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      location: '',
      experience: '',
      motivation: '',
      organization: '',
      partnershipType: '',
      message: ''
    });
  };

  return (
    <>
      <SEO
        title="Get Involved - Volunteer & Partnership Opportunities"
        description="Join OPHEG's mission to transform healthcare in Africa. Discover volunteer opportunities and partnership programs for individuals and organizations committed to community health."
        canonical="/get-involved"
      />

      <div className="container py-16 space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <h1 className="display-title text-4xl font-bold md:text-5xl">Get Involved</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Join our mission to transform healthcare in Africa. Whether you're an individual looking to volunteer 
            or an organization seeking partnership opportunities, there's a place for you in our community.
          </p>
        </section>

        {/* Overview Cards */}
        <section className="grid gap-8 md:grid-cols-2">
          <Card className="card-hover overflow-hidden">
            <div className="aspect-video overflow-hidden">
              <img
                src={volunteersWorkingImg}
                alt="Volunteers working together"
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="h-6 w-6 text-primary" />
                Volunteer Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Make a direct impact on communities by contributing your skills and time to our healthcare initiatives.
              </p>
              <Button 
                onClick={() => setActiveForm('volunteer')} 
                className="w-full"
                variant="default"
              >
                Apply to Volunteer
              </Button>
            </CardContent>
          </Card>

          <Card className="card-hover overflow-hidden">
            <div className="aspect-video overflow-hidden">
              <img
                src={partnershipsImg}
                alt="Partnership collaboration"
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Handshake className="h-6 w-6 text-primary" />
                Partnership Programs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Collaborate with us to expand healthcare access and create sustainable health solutions.
              </p>
              <Button 
                onClick={() => setActiveForm('partner')} 
                className="w-full"
                variant="outline"
              >
                Become a Partner
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Volunteer Opportunities */}
        <section>
          <div className="text-center mb-12">
            <h2 className="display-title text-3xl font-bold mb-4">Volunteer Opportunities</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Use your skills and passion to make a lasting impact on healthcare delivery in African communities.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {volunteerOpportunities.map((opportunity, index) => (
              <Card key={opportunity.title} className={`card-hover fade-in-up stagger-${(index % 5) + 1}`}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <opportunity.icon className="h-8 w-8 text-primary" />
                    <Badge 
                      variant={opportunity.urgency === 'high' ? 'destructive' : opportunity.urgency === 'medium' ? 'default' : 'secondary'}
                    >
                      {opportunity.urgency} priority
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{opportunity.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {opportunity.description}
                  </p>
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Requirements:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {opportunity.requirements.map((req) => (
                        <li key={req} className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Commitment:</span>
                    <Badge variant="secondary">{opportunity.commitment}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Partnership Types */}
        <section>
          <div className="text-center mb-12">
            <h2 className="display-title text-3xl font-bold mb-4">Partnership Opportunities</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Collaborate with OPHEG to amplify impact and create sustainable healthcare solutions.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {partnershipTypes.map((partnership, index) => (
              <Card key={partnership.title} className={`card-hover fade-in-up stagger-${(index % 4) + 1}`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <partnership.icon className="h-6 w-6 text-primary" />
                    {partnership.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    {partnership.description}
                  </p>
                  <div>
                    <h4 className="font-semibold mb-2">Benefits:</h4>
                    <div className="flex flex-wrap gap-2">
                      {partnership.benefits.map((benefit) => (
                        <Badge key={benefit} variant="secondary" className="text-xs">
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Examples:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {partnership.examples.map((example) => (
                        <li key={example} className="flex items-start gap-2">
                          <Heart className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Current Needs */}
        <section className="bg-gradient-to-tr from-primary/10 to-accent/10 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="display-title text-3xl font-bold mb-4">Current Needs</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Areas where we're actively seeking support to expand our impact.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {currentNeeds.map((need, index) => (
              <Card key={need.category} className="text-center">
                <CardHeader>
                  <CardTitle className="text-lg">{need.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {need.items.map((item) => (
                      <li key={item} className="text-sm text-muted-foreground">
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Application Forms */}
        {activeForm && (
          <section className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>
                  {activeForm === 'volunteer' ? 'Volunteer Application' : 'Partnership Inquiry'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+237 XXX XXX XXX"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="City, Country"
                    />
                  </div>
                </div>
                {activeForm === 'partner' && (
                  <div>
                    <Label htmlFor="organization">Organization</Label>
                    <Input
                      id="organization"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      placeholder="Organization name"
                    />
                  </div>
                )}
                <div>
                  <Label htmlFor="experience">
                    {activeForm === 'volunteer' ? 'Relevant Experience' : 'Partnership Interest'}
                  </Label>
                  <Textarea
                    id="experience"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    placeholder={activeForm === 'volunteer' 
                      ? "Describe your relevant skills and experience" 
                      : "Describe your partnership interests and goals"
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="message">Additional Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Any additional information you'd like to share"
                  />
                </div>
                <div className="flex gap-4">
                  <Button 
                    onClick={() => handleFormSubmit(activeForm)} 
                    className="flex-1"
                  >
                    Submit Application
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveForm(null)}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Contact Information */}
        <section className="text-center">
          <h2 className="display-title text-3xl font-bold mb-4">Questions?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Have questions about volunteering or partnership opportunities? We're here to help.
          </p>
          <div className="grid gap-4 md:grid-cols-3 max-w-2xl mx-auto">
            <div className="flex items-center gap-2 justify-center">
              <Mail className="h-4 w-4 text-primary" />
              <span className="text-sm">volunteer@opheg.org</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <Phone className="h-4 w-4 text-primary" />
              <span className="text-sm">+237 XXX XXX XXX</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-sm">Kumba, Cameroon</span>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default GetInvolved;