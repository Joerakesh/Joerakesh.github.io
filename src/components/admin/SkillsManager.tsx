
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Code, Database, Palette, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: number;
  created_at: string;
}

const SkillsManager = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newSkill, setNewSkill] = useState({
    name: "",
    category: "frontend",
    proficiency: 80
  });
  const { toast } = useToast();

  const categories = [
    { value: "frontend", label: "Frontend", icon: Code, color: "bg-blue-500" },
    { value: "backend", label: "Backend", icon: Database, color: "bg-green-500" },
    { value: "design", label: "Design", icon: Palette, color: "bg-purple-500" },
    { value: "tools", label: "Tools", icon: Globe, color: "bg-orange-500" }
  ];

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const { data, error } = await supabase
        .from("skills")
        .select("*")
        .order("category", { ascending: true })
        .order("proficiency", { ascending: false });

      if (error) throw error;
      setSkills(data || []);
    } catch (error: any) {
      console.log("Error fetching skills:", error.message);
      // If skills table doesn't exist or there's an error, just set empty array
      setSkills([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddSkill = async () => {
    if (!newSkill.name.trim()) {
      toast({
        title: "Error",
        description: "Please enter a skill name",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from("skills")
        .insert([newSkill]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Skill added successfully",
      });

      setNewSkill({ name: "", category: "frontend", proficiency: 80 });
      setShowForm(false);
      fetchSkills();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to add skill: " + error.message,
        variant: "destructive",
      });
    }
  };

  const handleDeleteSkill = async (id: string) => {
    try {
      const { error } = await supabase
        .from("skills")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Skill deleted successfully",
      });

      fetchSkills();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to delete skill",
        variant: "destructive",
      });
    }
  };

  const getCategoryIcon = (category: string) => {
    const cat = categories.find(c => c.value === category);
    return cat ? cat.icon : Code;
  };

  const getCategoryColor = (category: string) => {
    const cat = categories.find(c => c.value === category);
    return cat ? cat.color : "bg-gray-500";
  };

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading skills...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Skills Management</h2>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Skill
        </Button>
      </div>

      {/* Skills Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        {categories.map((category) => {
          const categorySkills = skills.filter(s => s.category === category.value);
          const avgProficiency = categorySkills.length > 0 
            ? Math.round(categorySkills.reduce((sum, skill) => sum + skill.proficiency, 0) / categorySkills.length)
            : 0;
          
          const Icon = category.icon;
          
          return (
            <Card key={category.value} className="bg-card border">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-lg ${category.color}`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-foreground">{categorySkills.length}</p>
                    <p className="text-xs text-muted-foreground">{category.label}</p>
                    <p className="text-xs text-muted-foreground">Avg: {avgProficiency}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Add Skill Form */}
      {showForm && (
        <Card className="bg-card border">
          <CardHeader>
            <CardTitle className="text-foreground">Add New Skill</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="skillName" className="text-foreground">Skill Name</Label>
              <Input
                id="skillName"
                value={newSkill.name}
                onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                placeholder="e.g., React, Node.js, Figma"
              />
            </div>
            <div>
              <Label htmlFor="category" className="text-foreground">Category</Label>
              <Select value={newSkill.category} onValueChange={(value) => setNewSkill({ ...newSkill, category: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-foreground">Proficiency: {newSkill.proficiency}%</Label>
              <Slider
                value={[newSkill.proficiency]}
                onValueChange={(value) => setNewSkill({ ...newSkill, proficiency: value[0] })}
                max={100}
                min={10}
                step={5}
                className="mt-2"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAddSkill}>Add Skill</Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Skills List */}
      <div className="grid gap-4">
        {categories.map((category) => {
          const categorySkills = skills.filter(s => s.category === category.value);
          if (categorySkills.length === 0) return null;

          const Icon = category.icon;

          return (
            <Card key={category.value} className="bg-card border">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <div className={`p-1 rounded ${category.color}`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  {category.label} Skills
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                  {categorySkills.map((skill) => (
                    <div key={skill.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-foreground">{skill.name}</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeleteSkill(skill.id)}
                            className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-background rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${category.color}`}
                              style={{ width: `${skill.proficiency}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground">{skill.proficiency}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {skills.length === 0 && (
        <Card className="text-center py-12 bg-card border">
          <CardContent>
            <p className="text-muted-foreground mb-4">No skills added yet</p>
            <Button onClick={() => setShowForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Skill
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SkillsManager;
