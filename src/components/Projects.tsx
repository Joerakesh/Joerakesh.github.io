import { Folder, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const Projects = () => {
  const projectsList = [
    {
      title: "Engzine",
      description:
        "e-Magazine Website for the Department of English, St. Joseph's College, Trichy.",
      tech: ["HTML", "CSS", "JS"],
      liveLink: "https://sjctni.edu/Department/ENGZINE",
      repoLink: "https://github.com/joerakesh/ecommerce",
      image: "/Projects/engzine.jpeg",
    },
    {
      title: "Mergen",
      description:
        "e-Journnal Website for the Department of English, St. Joseph's College, Trichy.",
      tech: ["HTML", "CSS", "JS"],
      liveLink: "https://sjctni.edu/Department/Mergen",
      repoLink: "https://github.com/joerakesh/mergen",
      image: "/Projects/mergen.jpg",
    },
    {
      title: "AI Interview",
      description: "An AI Platform for preparing Mock Interview.",
      tech: ["Next.js", "Firebase", "Gemini AI", "Vapi AI"],
      liveLink: "https://interview-ai-sooty.vercel.app/",
      repoLink: "https://github.com/Joerakesh/interview_ai",
      image: "/Projects/ai_interview.png",
    },
    {
      title: "Movie App",
      description: "A Movie App shows movie details.",
      tech: ["React Native", "TailwindCSS", "TMDB", "AppWrite"],
      liveLink:
        "https://expo.dev/accounts/joerakesh/projects/movie-app/builds/6b6333f0-5de2-45c0-925f-af2059f187b1",
      repoLink: "https://github.com/Joerakesh/movie-app",
      image: "/Projects/movie-app.jpg",
    },
  ];

  return (
    <section id="projects" className="py-20 px-4 bg-dark-light">
      <div className="container mx-auto">
        <div className="flex items-center gap-2 mb-12">
          <Folder className="w-5 h-5 text-primary" />
          <h2 className="text-3xl font-bold text-white">Projects</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsList.map((project, index) => (
            <div
              key={index}
              className="bg-dark rounded-xl overflow-hidden border border-primary/10 transition-all hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-white/70 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      size="sm"
                      className="bg-primary hover:bg-primary/90"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" /> Live
                    </Button>
                  </a>
                  <a
                    href={project.repoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-primary/20 text-primary hover:bg-primary/10"
                    >
                      <Github className="w-4 h-4 mr-2" /> Code
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
