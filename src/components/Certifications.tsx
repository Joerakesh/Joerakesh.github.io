import { Award, ExternalLink, Calendar, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const certificationsData = [
  {
    id: "chatgpt-web-developers",
    title: "ChatGPT for Web Developers",
    issuer: "LinkedIn",
    date: "2024",
    image: "/Certifications/chatgpt-web-developers.jpeg",
    skills: ["Web Development", "ChatGPT"],
    description:
      "Learned to use ChatGPT to generate and optimize web code, enhance UI with CSS, and build AI-powered apps using JavaScript and React.",
    credentialId:
      "c5c454abec61af420b66faa15bf7230a4bf1113fe8b994f6891314d5918385a4",
    status: "Completed",
  },
  {
    id: "microsoft-career-essentials",
    title:
      "Career Essentials in Software Development by Microsoft and LinkedIn",
    issuer: "Microsoft & LinkedIn",
    date: "2024",
    image: "/Certifications/microsoft-career-essentials.jpeg",
    skills: ["Software Development", "Programming"],
    description:
      "Comprehensive program covering essential software development skills and industry best practices.",
    credentialId:
      "fffd0e8209c878c0ef3d38081d5c1ce4fb48ef5037303bc242ab57ebfec41e2a",
    status: "Completed",
  },
  {
    id: "github-professional-certificate",
    title: "Career Essentials in GitHub Professional Certificate",
    issuer: "GitHub & LinkedIn",
    date: "2025",
    image: "/Certifications/github-professional-certificate.jpeg",
    skills: ["GitHub", "Version Control"],
    description:
      "Hands-on program covering GitHub fundamentals, version control concepts, collaborative workflows, and industry best practices for modern software development.",
    credentialId:
      "8c93ad5893f125dfb7cc8876bd43e6f710b47226d791afddccd06ac0b8655728",
    status: "Completed",
  },
];

const Certifications = () => {
  const handleCertificateClick = () => {
    // Store current scroll position before navigating
    sessionStorage.setItem(
      "portfolioScrollPosition",
      window.scrollY.toString()
    );
    // Scroll to top for the new page
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section id="certifications" className="py-20 px-4 bg-dark">
      <div className="container mx-auto">
        <div className="flex items-center gap-2 mb-12">
          <Award className="w-5 h-5 text-primary" />
          <h2 className="text-3xl font-bold text-white">Certifications</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {certificationsData.map((cert, index) => (
            <HoverCard key={cert.id}>
              <HoverCardTrigger asChild>
                <Link
                  to={`/certificate/${cert.id}`}
                  onClick={handleCertificateClick}
                  className="group block bg-dark-light rounded-xl overflow-hidden border border-primary/10 hover:border-primary/30 transition-all duration-300 card-hover"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-48 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-light/100 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center gap-2 text-white/80 text-sm mb-1">
                        <Calendar className="w-4 h-4" />
                        {cert.date}
                      </div>
                      <h3 className="font-semibold text-white line-clamp-2">
                        {cert.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 bg-dark-light border-primary/20 text-white">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-white">{cert.title}</h4>
                      <p className="text-primary text-sm">{cert.issuer}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-xs text-green-400">
                        {cert.status}
                      </span>
                    </div>
                  </div>

                  <p className="text-white/70 text-sm">{cert.description}</p>

                  <div>
                    <h5 className="text-sm font-medium text-white mb-2">
                      Skills Learned:
                    </h5>
                    <div className="flex flex-wrap gap-1">
                      {cert.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-primary/10">
                    <span className="text-xs text-white/60">
                      ID: {cert.credentialId}
                    </span>
                    <ExternalLink className="w-4 h-4 text-primary" />
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
