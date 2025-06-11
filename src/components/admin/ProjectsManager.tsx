
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Pencil, Trash2, ExternalLink, GripVertical, Eye, Star, TrendingUp, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ProjectForm from "./ProjectForm";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  live_link?: string;
  repo_link?: string;
  image: string;
  featured: boolean;
  created_at: string;
  order_position?: number;
}

const ProjectsManager = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [filterBy, setFilterBy] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("order");
  const [draggedProject, setDraggedProject] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("order_position", { ascending: true, nullsFirst: false })
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch projects: " + error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const { error } = await supabase
        .from("projects")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Project deleted successfully",
      });

      fetchProjects();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to delete project: " + error.message,
        variant: "destructive",
      });
    }
  };

  const handleToggleFeatured = async (id: string, featured: boolean) => {
    try {
      const { error } = await supabase
        .from("projects")
        .update({ featured: !featured })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Project ${!featured ? 'featured' : 'unfeatured'} successfully`,
      });

      fetchProjects();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update project: " + error.message,
        variant: "destructive",
      });
    }
  };

  const handleReorderProjects = async (projectId: string, newPosition: number) => {
    try {
      const { error } = await supabase
        .from("projects")
        .update({ order_position: newPosition } as any)
        .eq("id", projectId);

      if (error) throw error;

      fetchProjects();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to reorder projects: " + error.message,
        variant: "destructive",
      });
    }
  };

  const handleDragStart = (e: React.DragEvent, projectId: string) => {
    setDraggedProject(projectId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, targetProjectId: string) => {
    e.preventDefault();
    
    if (!draggedProject || draggedProject === targetProjectId) return;

    const draggedIndex = projects.findIndex(p => p.id === draggedProject);
    const targetIndex = projects.findIndex(p => p.id === targetProjectId);
    
    if (draggedIndex === -1 || targetIndex === -1) return;

    // Update order positions
    const newProjects = [...projects];
    const [draggedItem] = newProjects.splice(draggedIndex, 1);
    newProjects.splice(targetIndex, 0, draggedItem);

    // Update order_position for all affected projects
    newProjects.forEach((project, index) => {
      handleReorderProjects(project.id, index + 1);
    });

    setDraggedProject(null);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingProject(null);
    fetchProjects();
  };

  const filteredProjects = projects.filter(project => {
    if (filterBy === "featured") return project.featured;
    if (filterBy === "unfeatured") return !project.featured;
    return true;
  });

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case "title":
        return a.title.localeCompare(b.title);
      case "date":
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      case "tech":
        return b.tech.length - a.tech.length;
      default:
        return (a.order_position || 999) - (b.order_position || 999);
    }
  });

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading projects...</div>;
  }

  if (showForm) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">
            {editingProject ? "Edit Project" : "Add New Project"}
          </h2>
          <Button
            variant="outline"
            onClick={() => {
              setShowForm(false);
              setEditingProject(null);
            }}
          >
            Cancel
          </Button>
        </div>
        <ProjectForm
          project={editingProject}
          onSuccess={handleFormSuccess}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Projects Management</h2>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </div>

      {/* Portfolio Insights */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-card border">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-500" />
              <div>
                <p className="text-lg font-bold text-foreground">{projects.length}</p>
                <p className="text-xs text-muted-foreground">Total Projects</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <div>
                <p className="text-lg font-bold text-foreground">{projects.filter(p => p.featured).length}</p>
                <p className="text-xs text-muted-foreground">Featured</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-green-500" />
              <div>
                <p className="text-lg font-bold text-foreground">{projects.filter(p => p.live_link).length}</p>
                <p className="text-xs text-muted-foreground">Live Demos</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-purple-500" />
              <div>
                <p className="text-lg font-bold text-foreground">
                  {new Set(projects.flatMap(p => p.tech)).size}
                </p>
                <p className="text-xs text-muted-foreground">Technologies</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Sorting */}
      <div className="flex gap-4 items-center">
        <Select value={filterBy} onValueChange={setFilterBy}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Projects</SelectItem>
            <SelectItem value="featured">Featured Only</SelectItem>
            <SelectItem value="unfeatured">Non-Featured</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="order">Custom Order</SelectItem>
            <SelectItem value="title">Title (A-Z)</SelectItem>
            <SelectItem value="date">Date Created</SelectItem>
            <SelectItem value="tech">Tech Count</SelectItem>
          </SelectContent>
        </Select>

        <Badge variant="secondary" className="text-muted-foreground">
          {sortedProjects.length} projects
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sortedProjects.map((project, index) => (
          <Card 
            key={project.id} 
            className="overflow-hidden hover:shadow-lg transition-shadow cursor-move"
            draggable={sortBy === "order"}
            onDragStart={(e) => handleDragStart(e, project.id)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, project.id)}
          >
            <div className="aspect-video overflow-hidden relative">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              {sortBy === "order" && (
                <div className="absolute top-2 left-2 bg-background/80 p-1 rounded">
                  <GripVertical className="w-4 h-4 text-muted-foreground" />
                </div>
              )}
              <div className="absolute top-2 right-2 flex gap-1">
                {project.live_link && (
                  <Badge variant="secondary" className="text-xs">
                    <Eye className="w-3 h-3 mr-1" />
                    Live
                  </Badge>
                )}
                {project.featured && (
                  <Badge className="text-xs">
                    <Star className="w-3 h-3 mr-1" />
                    Featured
                  </Badge>
                )}
              </div>
            </div>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg line-clamp-1 text-foreground">{project.title}</CardTitle>
                <div className="flex items-center gap-1">
                  <Switch
                    checked={project.featured}
                    onCheckedChange={() => handleToggleFeatured(project.id, project.featured)}
                  />
                </div>
              </div>
              <CardDescription className="line-clamp-2 text-muted-foreground">
                {project.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-wrap gap-1 mb-4">
                {project.tech.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded"
                  >
                    {tech}
                  </span>
                ))}
                {project.tech.length > 3 && (
                  <span className="text-xs text-muted-foreground">
                    +{project.tech.length - 3} more
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setEditingProject(project);
                    setShowForm(true);
                  }}
                >
                  <Pencil className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-destructive hover:text-destructive"
                  onClick={() => handleDelete(project.id)}
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </Button>
                {project.live_link && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open(project.live_link, "_blank")}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {sortedProjects.length === 0 && (
        <Card className="text-center py-12 bg-card border">
          <CardContent>
            <p className="text-muted-foreground mb-4">No projects found</p>
            <Button onClick={() => setShowForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Project
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProjectsManager;
