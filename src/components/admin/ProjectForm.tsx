
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import ImageUpload from "./ImageUpload";

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

interface ProjectFormProps {
  project?: Project | null;
  onSuccess: () => void;
}

const ProjectForm = ({ project, onSuccess }: ProjectFormProps) => {
  const [formData, setFormData] = useState({
    title: project?.title || "",
    description: project?.description || "",
    tech: project?.tech?.join(", ") || "",
    live_link: project?.live_link || "",
    repo_link: project?.repo_link || "",
    image: project?.image || "",
    featured: project?.featured || false,
    duration: project?.duration || "",
    role: project?.role || "",
    team: project?.team || "",
    key_features: project?.key_features?.join(", ") || "",
    story: project?.story || "",
    challenges: project?.challenges || "",
    solutions: project?.solutions || "",
    learnings: project?.learnings || "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const techArray = formData.tech
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t.length > 0);

      const keyFeaturesArray = formData.key_features
        .split(",")
        .map((f) => f.trim())
        .filter((f) => f.length > 0);

      const projectData = {
        title: formData.title,
        description: formData.description,
        tech: techArray,
        live_link: formData.live_link || null,
        repo_link: formData.repo_link || null,
        image: formData.image,
        featured: formData.featured,
        duration: formData.duration || null,
        role: formData.role || null,
        team: formData.team || null,
        key_features: keyFeaturesArray.length > 0 ? keyFeaturesArray : null,
        story: formData.story || null,
        challenges: formData.challenges || null,
        solutions: formData.solutions || null,
        learnings: formData.learnings || null,
        updated_at: new Date().toISOString(),
      };

      if (project) {
        const { error } = await supabase
          .from("projects")
          .update(projectData)
          .eq("id", project.id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Project updated successfully",
        });
      } else {
        const { error } = await supabase
          .from("projects")
          .insert([projectData]);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Project created successfully",
        });
      }

      onSuccess();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {project ? "Edit Project" : "Add New Project"}
          {formData.featured && (
            <Badge variant="secondary">Featured</Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                  placeholder="Enter project title"
                />
              </div>

              <div className="space-y-2">
                <ImageUpload
                  value={formData.image}
                  onChange={(value) => setFormData({ ...formData, image: value })}
                  folder="Projects"
                  label="Project Image"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
                rows={3}
                placeholder="Describe your project"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="live_link">Live Demo URL</Label>
                <Input
                  id="live_link"
                  value={formData.live_link}
                  onChange={(e) =>
                    setFormData({ ...formData, live_link: e.target.value })
                  }
                  placeholder="https://example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="repo_link">Repository URL</Label>
                <Input
                  id="repo_link"
                  value={formData.repo_link}
                  onChange={(e) =>
                    setFormData({ ...formData, repo_link: e.target.value })
                  }
                  placeholder="https://github.com/username/repo"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, featured: checked })
                }
              />
              <Label htmlFor="featured">Featured Project</Label>
            </div>
          </div>

          {/* Project Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Project Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData({ ...formData, duration: e.target.value })
                  }
                  placeholder="3 months"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  placeholder="Full Stack Developer"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="team">Team</Label>
                <Input
                  id="team"
                  value={formData.team}
                  onChange={(e) =>
                    setFormData({ ...formData, team: e.target.value })
                  }
                  placeholder="Solo Project / Team of 3"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tech">Technologies * (comma-separated)</Label>
              <Input
                id="tech"
                value={formData.tech}
                onChange={(e) =>
                  setFormData({ ...formData, tech: e.target.value })
                }
                required
                placeholder="React, TypeScript, Node.js"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="key_features">Key Features (comma-separated)</Label>
              <Input
                id="key_features"
                value={formData.key_features}
                onChange={(e) =>
                  setFormData({ ...formData, key_features: e.target.value })
                }
                placeholder="Responsive Design, Real-time Updates, AI Integration"
              />
            </div>
          </div>

          {/* Project Story */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Project Story</h3>
            
            <div className="space-y-2">
              <Label htmlFor="story">The Story Behind the Project</Label>
              <Textarea
                id="story"
                value={formData.story}
                onChange={(e) =>
                  setFormData({ ...formData, story: e.target.value })
                }
                rows={3}
                placeholder="Tell the story behind this project..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="challenges">Challenges Faced</Label>
              <Textarea
                id="challenges"
                value={formData.challenges}
                onChange={(e) =>
                  setFormData({ ...formData, challenges: e.target.value })
                }
                rows={3}
                placeholder="What challenges did you face during development?"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="solutions">Solutions Implemented</Label>
              <Textarea
                id="solutions"
                value={formData.solutions}
                onChange={(e) =>
                  setFormData({ ...formData, solutions: e.target.value })
                }
                rows={3}
                placeholder="How did you solve those challenges?"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="learnings">What I Learned</Label>
              <Textarea
                id="learnings"
                value={formData.learnings}
                onChange={(e) =>
                  setFormData({ ...formData, learnings: e.target.value })
                }
                rows={3}
                placeholder="What did you learn from this project?"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading
                ? "Saving..."
                : project
                ? "Update Project"
                : "Create Project"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProjectForm;
