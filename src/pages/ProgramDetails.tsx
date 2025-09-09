import { useParams } from "react-router-dom";
import SEO from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import medicalTrainingImg from "@/assets/medical-training.jpg";
import healthFacilityImg from "@/assets/health-facility.jpg";
import communityOutreachImg from "@/assets/outreach.jpg";

const programData = {
  "health-flix": {
    title: "Health Flix",
    description: "Comprehensive training programs for healthcare workers...",
    projects: [
      {
        id: 1,
        title: "Training Impact in Bamenda",
        description:
          "A one-week intensive training that empowered local healthcare workers with modern diagnostic skills.",
        date: "2025-08-01",
        images: [medicalTrainingImg, medicalTrainingImg],
      },
      {
        id: 2,
        title: "New Certification Programs",
        description:
          "We launched new certification tracks for nurses and lab technicians to improve career growth.",
        date: "2025-08-15",
        images: [healthFacilityImg],
      },
    ],
  },
  "diagnostic-center": {
    title: "Diagnostic Center",
    description: "A modern healthcare facility established in ...",
    projects: [
      {
        id: 1,
        title: "Community Wellness Drive",
        description:
          "The diagnostic center organized free health screenings for 500+ community members.",
        date: "2025-07-20",
        images: [communityOutreachImg],
      },
    ],
  },
  "outreach-initiatives": {
    title: "Outreach Initiatives",
    description: "Regular community health outreach programs ...",
    projects: [],
  },
};

const ProgramDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const program = programData[slug as keyof typeof programData];

  if (!program) return <p>Program not found</p>;

  return (
    <>
      <SEO
        title={`${program.title} - OPHEG`}
        description={program.description}
        canonical={`/programs/${slug}`}
      />

      <div className="container py-16">
        {/* Program Info */}
        <h1 className="text-4xl font-bold mb-6">{program.title}</h1>
        <p className="text-muted-foreground mb-8">{program.description}</p>

        {/* Projects */}
        <h2 className="text-2xl font-semibold mb-4">Projects</h2>
        {program.projects.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {program.projects.map((project) => (
              <Card key={project.id} className="overflow-hidden">
                {project.images && project.images.length > 0 && (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                )}
                <CardContent className="p-4 space-y-2">
                  <h3 className="font-semibold text-lg">{project.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {project.date}
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {project.description}
                  </p>

                  {/* If you want to display multiple images */}
                  {project.images.length > 1 && (
                    <div className="flex gap-2 mt-3 overflow-x-auto">
                      {project.images.slice(1).map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          alt={`${project.title} - ${i}`}
                          className="h-20 w-32 object-cover rounded-md"
                        />
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No projects yet.</p>
        )}
      </div>
    </>
  );
};

export default ProgramDetail;
