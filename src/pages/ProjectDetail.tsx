
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Folder,
  ExternalLink,
  Github,
  Calendar,
  Users,
  Target,
  Lightbulb,
  Clock,
  UserCheck,
  Zap,
  BookOpen,
  AlertTriangle,
  CheckCircle,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { getTechIcon } from "@/utils/techIcons";

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  live_link?: string;
  repo_link?: string;
  image: string;
  featured: boolean;
  duration?: string;
  role?: string;
  team?: string;
  key_features?: string[];
  story?: string;
  challenges?: string;
  solutions?: string;
  learnings?: string;
}

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (id) {
      fetchProject();
    }
  }, [id]);

  const fetchProject = async () => {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      setProject(data);
    } catch (error) {
      console.error("Error fetching project:", error);
    } finally {
      setIsLoading(false);
    }
  };

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-white">Loading project details...</p>
        </div>
      </div>
    );
  }

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
                {project.description}
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
              {project.live_link && (
                <a
                  href={project.live_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Live Project
                  </Button>
                </a>
              )}
              {project.repo_link && (
                <a
                  href={project.repo_link}
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
            {/* Project Overview */}
            <Card className="bg-dark-light border-primary/20">
              <CardHeader className="pb-3 md:pb-6">
                <CardTitle className="text-white flex items-center gap-2 text-lg md:text-xl">
                  <Target className="w-5 h-5 text-primary" />
                  Project Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
                  {project.duration && (
                    <div>
                      <div className="flex items-center gap-2 text-white/60 text-sm mb-1">
                        <Clock className="w-4 h-4" />
                        Duration
                      </div>
                      <p className="text-white font-medium text-sm md:text-base">
                        {project.duration}
                      </p>
                    </div>
                  )}
                  {project.role && (
                    <div>
                      <div className="flex items-center gap-2 text-white/60 text-sm mb-1">
                        <UserCheck className="w-4 h-4" />
                        Role
                      </div>
                      <p className="text-white font-medium text-sm md:text-base">
                        {project.role}
                      </p>
                    </div>
                  )}
                  {project.team && (
                    <div>
                      <div className="flex items-center gap-2 text-white/60 text-sm mb-1">
                        <Users className="w-4 h-4" />
                        Team
                      </div>
                      <p className="text-white font-medium text-sm md:text-base">
                        {project.team}
                      </p>
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-white/80 text-sm md:text-base leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Technologies Used */}
            <Card className="bg-dark-light border-primary/20">
              <CardHeader className="pb-3 md:pb-6">
                <CardTitle className="text-white text-lg md:text-xl">
                  Technologies Used
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {project.tech.map((tech) => (
                    <div
                      key={tech}
                      className="flex items-center gap-2 bg-primary/20 text-primary px-3 py-2 rounded-full text-xs md:text-sm"
                    >
                      <img
                        src={getTechIcon(tech)}
                        alt={tech}
                        className="w-4 h-4"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                      {tech}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Key Features */}
            {project.key_features && project.key_features.length > 0 && (
              <Card className="bg-dark-light border-primary/20">
                <CardHeader className="pb-3 md:pb-6">
                  <CardTitle className="text-white flex items-center gap-2 text-lg md:text-xl">
                    <Zap className="w-5 h-5 text-primary" />
                    Key Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {project.key_features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-white/80 text-sm md:text-base">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Project Status */}
            <Card className="bg-dark-light border-primary/20">
              <CardHeader className="pb-3 md:pb-6">
                <CardTitle className="text-white text-lg md:text-xl">
                  Project Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    project.featured 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {project.featured ? 'Featured Project' : 'Regular Project'}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Sections */}
        {(project.story || project.challenges || project.solutions || project.learnings) && (
          <div className="mt-12 space-y-6">
            {/* The Story Behind the Project */}
            {project.story && (
              <Card className="bg-dark-light border-primary/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2 text-lg md:text-xl">
                    <BookOpen className="w-5 h-5 text-primary" />
                    The Story Behind the Project
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 text-sm md:text-base leading-relaxed">
                    {project.story}
                  </p>
                </CardContent>
              </Card>
            )}

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Challenges Faced */}
              {project.challenges && (
                <Card className="bg-dark-light border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2 text-lg md:text-xl">
                      <AlertTriangle className="w-5 h-5 text-yellow-400" />
                      Challenges Faced
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/80 text-sm md:text-base leading-relaxed">
                      {project.challenges}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Solutions Implemented */}
              {project.solutions && (
                <Card className="bg-dark-light border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2 text-lg md:text-xl">
                      <Lightbulb className="w-5 h-5 text-blue-400" />
                      Solutions Implemented
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/80 text-sm md:text-base leading-relaxed">
                      {project.solutions}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* What I Learned */}
            {project.learnings && (
              <Card className="bg-dark-light border-primary/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2 text-lg md:text-xl">
                    <GraduationCap className="w-5 h-5 text-green-400" />
                    What I Learned
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 text-sm md:text-base leading-relaxed">
                    {project.learnings}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;
