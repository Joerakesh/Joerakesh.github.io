import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  ArrowLeft,
  Folder,
  ExternalLink,
  Github,
  Calendar,
  Users,
  Target,
  Lightbulb,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const projectsData = [
  {
    id: "engzine",
    title: "Engzine",
    subtitle: "Digital Magazine Platform",
    description:
      "e-Magazine Website for the Department of English, St. Joseph's College, Trichy.",
    detailedDescription:
      "Engzine is a comprehensive digital magazine platform designed specifically for the Department of English at St. Joseph's College, Trichy. The platform serves as a showcase for student literary works, faculty publications, and departmental achievements.",
    tech: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    liveLink: "https://sjctni.edu/Department/ENGZINE",
    repoLink: null,
    image: "/Projects/engzine.jpeg",
    duration: "2 months",
    role: "Front End Developer",
    team: "Solo Project",
    story:
      "My English professor approached me with the idea of turning the department’s print magazine into a modern website. The goal was to make it more accessible, showcase student and faculty work, and reach a wider audience. We also aimed to get an ISSN to officially recognize it as a digital publication.",
    challenges: [
      "Creating an intuitive content management system for non-technical users",
      "Designing a responsive layout that works across all devices",
      "Implementing SEO optimization to increase visibility",
      "Ensuring fast loading times with image-heavy content",
    ],
    solutions: [
      "Used CSS Grid and Flexbox for responsive design",
      "Implemented proper meta tags and structured data",
      "Optimized images using modern compression techniques",
      "Took steps to protect team images from easy downloading",
    ],
    learnings: [
      "Gained experience in client communication and requirement gathering",
      "Learned the importance of user-centered design",
      "Developed skills in performance optimization",
      "Understanding of content management best practices",
    ],
    features: [
      "Responsive magazine layout",
      "Article categorization system",
      "Social media integration",
      "Archive system for past issues",
    ],
  },
  {
    id: "mergen",
    title: "Mergen",
    subtitle: "Academic Journal Platform",
    description:
      "e-Journal Website for the Department of English, St. Joseph's College, Trichy.",
    detailedDescription:
      "Mergen is an academic journal platform that facilitates the publication and distribution of scholarly articles, research papers, and academic discussions within the English department.",
    tech: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    liveLink: "https://sjctni.edu/Department/Mergen",
    repoLink: "https://github.com/joerakesh/mergen",
    image: "/Projects/mergen.jpg",
    duration: "1 months",
    role: "Frontend Developer",
    team: "Solo Project",
    story:
      "Following the success of Engzine, the department requested an academic journal platform to complement their magazine. They needed a more formal, research-oriented platform that could handle peer review processes and maintain academic standards.",
    challenges: [
      "Implementing a peer review workflow system",
      "Designing a professional academic interface",
    ],
    solutions: ["Used a clean, professional design with academic conventions"],
    learnings: ["Understanding of academic publishing workflows"],
    features: [
      "Article submission system",
      "Peer review workflow",
      "User role management",
      "Document versioning",
      "Citation management",
    ],
  },
  {
    id: "ai-interview",
    title: "AI Interview",
    subtitle: "AI-Powered Interview Preparation",
    description:
      "An AI Platform for preparing Mock Interview sessions with real-time feedback.",
    detailedDescription:
      "AI Interview is a comprehensive platform that uses artificial intelligence to conduct mock interviews, providing real-time feedback and personalized improvement suggestions to help users prepare for job interviews.",
    tech: ["Next.js", "Firebase", "Gemini AI", "Vapi AI", "TailwindCSS"],
    liveLink: "https://interview-ai-sooty.vercel.app/",
    repoLink: "https://github.com/Joerakesh/interview_ai",
    image: "/Projects/ai_interview.png",
    duration: "3 weeks",
    role: "Full Stack Developer",
    team: "Solo Project",
    story:
      "Inspired by the challenges many students face in interview preparation, I wanted to create an accessible AI-powered platform that could provide personalized interview practice. The goal was to democratize interview preparation and help reduce anxiety through repeated practice. I started with a tutorial from JavaScript Mastery to lay the foundation, but soon encountered real-world challenges—like generating custom APIs and integrating Vapi AI for voice interaction. Working through these hurdles gave me a deeper understanding of AI workflows and full-stack development.",
    challenges: [
      "Integrating multiple AI services for natural conversation",
      "Creating realistic interview scenarios",
      "Implementing real-time speech recognition and synthesis",
      "Designing an effective feedback system",
    ],
    solutions: [
      "Combined Gemini AI for question generation with Vapi AI for voice processing",
      "Created a comprehensive question bank across different domains",
      "Implemented WebRTC for real-time audio processing",
      "Developed an analytics dashboard for performance tracking",
    ],
    learnings: [
      "Advanced knowledge of AI integration in web applications",
      "Experience with real-time audio processing",
      "Understanding of user experience in AI interactions",
      "Skills in performance analytics and data visualization",
    ],
    features: [
      "AI-powered mock interviews",
      "Real-time feedback system",
      "Performance analytics",
      "Custom interview scenarios",
      "Progress tracking",
    ],
  },
  {
    id: "movie-app",
    title: "Movie App",
    subtitle: "Mobile Movie Discovery Platform",
    description:
      "A comprehensive Movie App that displays detailed movie information with user favorites.",
    detailedDescription:
      "A mobile-first movie discovery application built with React Native that provides users with comprehensive movie information, ratings, reviews, and personal watchlist management.",
    tech: ["React Native", "TailwindCSS", "TMDB API", "AppWrite"],
    liveLink:
      "https://expo.dev/accounts/joerakesh/projects/movie-app/builds/6b6333f0-5de2-45c0-925f-af2059f187b1",
    repoLink: "https://github.com/Joerakesh/movie-app",
    image: "/Projects/movie-app.jpg",
    duration: "3 months",
    role: "Mobile Developer",
    team: "Solo Project",
    story:
      "This project was born from my passion for movies and mobile development. I wanted to create a seamless movie discovery experience that could work offline and provide personalized recommendations based on user preferences.",
    challenges: [
      "Handling large amounts of movie data efficiently",
      "Implementing smooth infinite scrolling",
      "Creating an intuitive mobile interface",
      "Managing offline functionality and data caching",
    ],
    solutions: [
      "Implemented pagination and lazy loading for performance",
      "Used FlatList with optimized rendering for smooth scrolling",
      "Designed a mobile-first interface with intuitive gestures",
      "Implemented AsyncStorage for offline data persistence",
    ],
    learnings: [
      "Mobile development best practices with React Native",
      "API integration and data management strategies",
      "Mobile UI/UX design principles",
      "Performance optimization for mobile applications",
    ],
    features: [
      "Movie search and discovery",
      "Detailed movie information",
      "Personal watchlist",
      "Offline functionality",
      "User ratings and reviews",
    ],
  },
];

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projectsData.find((proj) => proj.id === id);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleBackClick = () => {
    const savedPosition = sessionStorage.getItem("portfolioScrollPosition");
    navigate("/");

    if (savedPosition) {
      setTimeout(() => {
        window.scrollTo({
          top: parseInt(savedPosition, 10),
          behavior: "smooth",
        });
        sessionStorage.removeItem("portfolioScrollPosition");
      }, 100);
    }
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-xl md:text-2xl font-bold text-white mb-4">
            Project Not Found
          </h1>
          <button
            onClick={handleBackClick}
            className="text-primary hover:underline"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark">
      {/* Header */}
      <div className="bg-dark-light border-b border-primary/10">
        <div className="container mx-auto px-4 py-4 md:py-6">
          <button
            onClick={handleBackClick}
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </button>
          <div className="flex items-start md:items-center gap-3">
            <Folder className="w-6 h-6 md:w-8 md:h-8 text-primary flex-shrink-0 mt-1 md:mt-0" />
            <div>
              <h1 className="text-xl md:text-3xl font-bold text-white leading-tight">
                {project.title}
              </h1>
              <p className="text-primary text-sm md:text-base">
                {project.subtitle}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 md:py-12">
        <div className="grid lg:grid-cols-2 gap-6 md:gap-12">
          {/* Project Image & Actions */}
          <div className="space-y-4 md:space-y-6">
            <Card className="bg-dark-light border-primary/20 overflow-hidden">
              <CardContent className="p-0">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 md:h-80 object-cover"
                />
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button className="w-full bg-primary hover:bg-primary/90">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Live Project
                </Button>
              </a>
              {project.repoLink && (
                <a
                  href={project.repoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none"
                >
                  <Button
                    variant="outline"
                    className="w-full border-primary/20 text-primary hover:bg-primary/10"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    View Code
                  </Button>
                </a>
              )}
            </div>
          </div>

          {/* Project Details */}
          <div className="space-y-4 md:space-y-6">
            <Card className="bg-dark-light border-primary/20">
              <CardHeader className="pb-3 md:pb-6">
                <CardTitle className="text-white flex items-center gap-2 text-lg md:text-xl">
                  <Target className="w-5 h-5 text-primary" />
                  Project Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
                  <div>
                    <p className="text-white/60 text-sm">Duration</p>
                    <p className="text-white font-medium text-sm md:text-base">
                      {project.duration}
                    </p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Role</p>
                    <p className="text-white font-medium text-sm md:text-base">
                      {project.role}
                    </p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Team</p>
                    <p className="text-white font-medium text-sm md:text-base">
                      {project.team}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-white/80 text-sm md:text-base leading-relaxed">
                    {project.detailedDescription}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-dark-light border-primary/20">
              <CardHeader className="pb-3 md:pb-6">
                <CardTitle className="text-white text-lg md:text-xl">
                  Technologies Used
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="bg-primary/20 text-primary px-2 md:px-3 py-1 rounded-full text-xs md:text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-dark-light border-primary/20">
              <CardHeader className="pb-3 md:pb-6">
                <CardTitle className="text-white text-lg md:text-xl">
                  Key Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {project.features.map((feature, index) => (
                    <li
                      key={index}
                      className="text-white/80 text-sm md:text-base flex items-start gap-2"
                    >
                      <span className="text-primary mt-1">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Story Section */}
        <div className="mt-8 md:mt-12 space-y-6 md:space-y-8">
          <Card className="bg-dark-light border-primary/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2 text-xl md:text-2xl">
                <Users className="w-6 h-6 text-primary" />
                The Story Behind the Project
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/80 text-sm md:text-base leading-relaxed">
                {project.story}
              </p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-dark-light border-primary/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2 text-lg md:text-xl">
                  <Target className="w-5 h-5 text-red-400" />
                  Challenges Faced
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {project.challenges.map((challenge, index) => (
                    <li
                      key={index}
                      className="text-white/80 text-sm md:text-base flex items-start gap-2"
                    >
                      <span className="text-red-400 mt-1">•</span>
                      {challenge}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-dark-light border-primary/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2 text-lg md:text-xl">
                  <Lightbulb className="w-5 h-5 text-yellow-400" />
                  Solutions Implemented
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {project.solutions.map((solution, index) => (
                    <li
                      key={index}
                      className="text-white/80 text-sm md:text-base flex items-start gap-2"
                    >
                      <span className="text-yellow-400 mt-1">•</span>
                      {solution}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-dark-light border-primary/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2 text-xl md:text-2xl">
                <Calendar className="w-6 h-6 text-green-400" />
                What I Learned
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid md:grid-cols-2 gap-3">
                {project.learnings.map((learning, index) => (
                  <li
                    key={index}
                    className="text-white/80 text-sm md:text-base flex items-start gap-2"
                  >
                    <span className="text-green-400 mt-1">•</span>
                    {learning}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
