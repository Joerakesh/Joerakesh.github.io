
import { useState, useEffect } from "react";
import { Folder, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  live_link?: string;
  repo_link?: string;
  image: string;
  featured: boolean;
  order_position?: number;
}

const ProjectSkeleton = () => (
  <div className="bg-dark rounded-xl overflow-hidden border border-primary/10">
    <Skeleton className="h-48 w-full bg-dark-light" />
    <div className="p-6">
      <Skeleton className="h-6 w-3/4 mb-2 bg-dark-light" />
      <Skeleton className="h-4 w-full mb-1 bg-dark-light" />
      <Skeleton className="h-4 w-2/3 mb-4 bg-dark-light" />
      <div className="flex flex-wrap gap-2 mb-6">
        <Skeleton className="h-6 w-16 rounded-full bg-dark-light" />
        <Skeleton className="h-6 w-20 rounded-full bg-dark-light" />
        <Skeleton className="h-6 w-14 rounded-full bg-dark-light" />
      </div>
      <div className="flex flex-wrap gap-2">
        <Skeleton className="h-8 flex-1 bg-dark-light" />
        <Skeleton className="h-8 w-20 bg-dark-light" />
        <Skeleton className="h-8 flex-1 bg-dark-light" />
      </div>
    </div>
  </div>
);

const Projects = () => {
  const [projectsList, setProjectsList] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("featured", true)
        .order("order_position", { ascending: true, nullsFirst: false })
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProjectsList(data || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProjectClick = () => {
    sessionStorage.setItem(
      "portfolioScrollPosition",
      window.scrollY.toString()
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Helper function to get the correct image path - check if it's from Supabase storage or local
  const getImagePath = (imagePath: string) => {
    // If it's already a full URL (from Supabase storage), return as is
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    // If it contains 'portfolio-images', it's likely a Supabase storage reference
    if (imagePath.includes('portfolio-images')) {
      const fileName = imagePath.split('/').pop();
      const { data } = supabase.storage
        .from('portfolio-images')
        .getPublicUrl(fileName || imagePath);
      return data.publicUrl;
    }
    
    // If the path starts with /Projects/, return as is (local files)
    if (imagePath.startsWith('/Projects/')) {
      return imagePath;
    }
    
    // If it doesn't start with /, add it
    if (!imagePath.startsWith('/')) {
      return `/${imagePath}`;
    }
    
    return imagePath;
  };

  return (
    <section id="projects" className="py-20 px-4 bg-dark-light">
      <div className="container mx-auto">
        <div className="flex items-center gap-2 mb-12">
          <Folder className="w-5 h-5 text-primary" />
          <h2 className="text-3xl font-bold text-white">Projects</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Show skeleton loading
            Array.from({ length: 6 }).map((_, index) => (
              <ProjectSkeleton key={index} />
            ))
          ) : (
            projectsList.map((project, index) => (
              <div
                key={project.id}
                className="bg-dark rounded-xl overflow-hidden border border-primary/10 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-2 hover:border-primary/30 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={getImagePath(project.image)}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      console.error('Image failed to load:', project.image);
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder.svg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 transition-colors duration-300 group-hover:text-primary">
                    {project.title}
                  </h3>
                  <p className="text-white/70 mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full transition-all duration-300 hover:bg-primary/20 hover:scale-105"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href={project.live_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                      aria-label={`View live demo of ${project.title}`}
                    >
                      <Button
                        size="sm"
                        className="w-full bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" /> Live Demo
                      </Button>
                    </a>
                    {project.repo_link && (
                      <a
                        href={project.repo_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View source code of ${project.title}`}
                      >
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-primary/20 text-primary hover:bg-primary/10 transition-all duration-300 hover:scale-105"
                        >
                          <Github className="w-4 h-4 mr-2" /> Code
                        </Button>
                      </a>
                    )}
                    <Link
                      to={`/project/${project.id}`}
                      onClick={handleProjectClick}
                      className="flex-1"
                      aria-label={`View details of ${project.title}`}
                    >
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full border-primary/20 text-primary hover:bg-primary/10 transition-all duration-300 hover:scale-105"
                      >
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {!isLoading && projectsList.length === 0 && (
          <div className="text-center py-12">
            <Folder className="w-16 h-16 text-primary/50 mx-auto mb-4" />
            <p className="text-white/70 text-lg">No featured projects available</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
