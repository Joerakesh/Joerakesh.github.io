
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Trash2, Star, Eye, EyeOff, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Project {
  id: string;
  title: string;
  featured: boolean;
}

interface BulkProjectActionsProps {
  projects: Project[];
  selectedProjects: string[];
  onSelectionChange: (selected: string[]) => void;
  onRefresh: () => void;
}

const BulkProjectActions = ({ 
  projects, 
  selectedProjects, 
  onSelectionChange, 
  onRefresh 
}: BulkProjectActionsProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleSelectAll = () => {
    if (selectedProjects.length === projects.length) {
      onSelectionChange([]);
    } else {
      onSelectionChange(projects.map(p => p.id));
    }
  };

  const handleBulkFeature = async (featured: boolean) => {
    setIsProcessing(true);
    try {
      const { error } = await supabase
        .from("projects")
        .update({ featured })
        .in("id", selectedProjects);

      if (error) throw error;

      toast({
        title: "Success",
        description: `${selectedProjects.length} projects ${featured ? 'featured' : 'unfeatured'}`,
      });

      onSelectionChange([]);
      onRefresh();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update projects: " + error.message,
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBulkDelete = async () => {
    if (!confirm(`Are you sure you want to delete ${selectedProjects.length} projects?`)) return;

    setIsProcessing(true);
    try {
      const { error } = await supabase
        .from("projects")
        .delete()
        .in("id", selectedProjects);

      if (error) throw error;

      toast({
        title: "Success",
        description: `${selectedProjects.length} projects deleted`,
      });

      onSelectionChange([]);
      onRefresh();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to delete projects: " + error.message,
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDuplicateProject = async () => {
    if (selectedProjects.length !== 1) {
      toast({
        title: "Error",
        description: "Please select exactly one project to duplicate",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      const { data: originalProject, error: fetchError } = await supabase
        .from("projects")
        .select("*")
        .eq("id", selectedProjects[0])
        .single();

      if (fetchError) throw fetchError;

      const { id, created_at, updated_at, order_position, ...projectData } = originalProject;
      const duplicatedProject = {
        ...projectData,
        title: `${projectData.title} (Copy)`,
        featured: false,
      };

      const { error: insertError } = await supabase
        .from("projects")
        .insert([duplicatedProject]);

      if (insertError) throw insertError;

      toast({
        title: "Success",
        description: "Project duplicated successfully",
      });

      onSelectionChange([]);
      onRefresh();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to duplicate project: " + error.message,
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (projects.length === 0) return null;

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Checkbox
              checked={selectedProjects.length === projects.length}
              onCheckedChange={handleSelectAll}
            />
            <span className="text-sm font-medium">
              Bulk Actions
            </span>
            {selectedProjects.length > 0 && (
              <Badge variant="secondary">
                {selectedProjects.length} selected
              </Badge>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      {selectedProjects.length > 0 && (
        <CardContent className="pt-0">
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleBulkFeature(true)}
              disabled={isProcessing}
            >
              <Star className="w-4 h-4 mr-1" />
              Feature Selected
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleBulkFeature(false)}
              disabled={isProcessing}
            >
              <EyeOff className="w-4 h-4 mr-1" />
              Unfeature Selected
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleDuplicateProject}
              disabled={isProcessing || selectedProjects.length !== 1}
            >
              <Copy className="w-4 h-4 mr-1" />
              Duplicate
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={handleBulkDelete}
              disabled={isProcessing}
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Delete Selected
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default BulkProjectActions;
