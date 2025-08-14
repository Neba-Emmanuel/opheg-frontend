import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Calendar, Eye, Target, Heart, Lightbulb, Shield, Users, Handshake } from "lucide-react";

const About = () => {
  const coreValues = [
    {
      icon: Eye,
      title: "Vision",
      description: "We act with purpose, guided by a clear mission to build a healthier, empowered, and more equitable future for all.",
      color: "text-blue-600"
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We embrace new ideas, technology, and creative solutions to expand access, improve care, and deliver impact in hard-to-reach communities.",
      color: "text-yellow-600"
    },
    {
      icon: Shield,
      title: "Transparency",
      description: "We are open, honest, and accountable in every action—building trust with our patients, partners, and the public.",
      color: "text-emerald-600"
    },
    {
      icon: Users,
      title: "Accessibility",
      description: "We are committed to breaking barriers so that essential health services reach everyone, everywhere, without discrimination.",
      color: "text-purple-600"
    },
    {
      icon: Heart,
      title: "Love",
      description: "We serve with compassion and empathy, putting humanity first and ensuring care is delivered with heart.",
      color: "text-red-600"
    }
  ];

  const executiveTeam = [
    "Founder/Chief Executive Officer",
    "Director General",
    "Secretary General",
    "Chief Financial Officer",
    "Chief Project Manager",
    "Communications Officer",
    "Director of Outreaches",
    "Auditors",
    "Advisors",
    "Human Resource Personnel"
  ];

  return (
    <>
      <SEO
        title="About OPHEG - Our Vision, Mission & Team"
        description="Learn about Optimum Health Global's mission to transform healthcare in Africa through community outreach, innovation, and compassionate care since 2022."
        canonical="/about"
      />

      <div className="container py-16 space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <h1 className="display-title text-4xl font-bold md:text-5xl">About OPHEG</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Optimum Health Global is dedicated to transforming healthcare access across Africa through 
            innovative community-centered approaches and sustainable health solutions.
          </p>
        </section>

        {/* Organization Details */}
        <section className="grid gap-8 md:grid-cols-3">
          <Card className="card-hover">
            <CardHeader className="text-center">
              <Calendar className="h-12 w-12 mx-auto text-primary mb-4" />
              <CardTitle>Founded</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-2xl font-bold text-primary">November 22, 2022</p>
              <p className="text-muted-foreground mt-2">Establishing our mission</p>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardHeader className="text-center">
              <MapPin className="h-12 w-12 mx-auto text-primary mb-4" />
              <CardTitle>Head Office</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="font-semibold">Kumba</p>
              <p className="text-muted-foreground">Meme Division</p>
              <p className="text-muted-foreground">Southwest Region, Cameroon</p>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardHeader className="text-center">
              <Handshake className="h-12 w-12 mx-auto text-primary mb-4" />
              <CardTitle>Motto</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-xl font-bold text-primary">Clean Health</p>
              <p className="text-xl font-bold text-primary">Clean Society</p>
            </CardContent>
          </Card>
        </section>

        {/* Vision & Mission */}
        <section className="grid gap-8 md:grid-cols-2">
          <Card className="card-hover border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-6 w-6 text-primary" />
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed text-muted-foreground">
                Helping Humanity and saving lives from common and endemic diseases, coupled with negative 
                health stigmas that puts a threat to human lives through identifying, educating, empowering 
                and helping the masses make positive health decisions to adopt a healthy behavior, thereby 
                attaining health at its optimum.
              </p>
            </CardContent>
          </Card>

          <Card className="card-hover border-l-4 border-l-accent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-6 w-6 text-accent" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed text-muted-foreground">
                Taking health to the communities and ensuring a clean health and clean society.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* VITAL Core Values */}
        <section>
          <div className="text-center mb-12">
            <h2 className="display-title text-3xl font-bold mb-4">Our VITAL Core Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              At OPHEG, our values are VITAL to transforming lives and communities across Africa.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {coreValues.map((value, index) => (
              <Card key={value.title} className={`card-hover fade-in-up stagger-${index + 1}`}>
                <CardHeader className="text-center pb-4">
                  <value.icon className={`h-12 w-12 mx-auto mb-3 ${value.color}`} />
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Executive Committee */}
        <section>
          <div className="text-center mb-12">
            <h2 className="display-title text-3xl font-bold mb-4">Executive Committee</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our dedicated leadership team brings together diverse expertise to guide OPHEG's mission.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {executiveTeam.map((role, index) => (
              <Card key={role} className={`card-hover text-center fade-in-up stagger-${(index % 5) + 1}`}>
                <CardContent className="pt-6">
                  <div className="h-16 w-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <p className="font-medium text-sm">{role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-gradient-to-tr from-primary/10 to-accent/10 rounded-2xl p-12">
          <h2 className="display-title text-3xl font-bold mb-4">Join Our Mission</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Learn more about our work in communities or discover how you can be part of our 
            transformative healthcare initiatives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/our-works"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 rounded-md px-8 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              See Our Work
            </a>
            <a
              href="/get-involved"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 rounded-md px-8 border border-input bg-background hover:bg-accent hover:text-accent-foreground"
            >
              Get Involved
            </a>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;