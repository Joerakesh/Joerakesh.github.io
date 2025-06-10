
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  FileText, 
  Save, 
  RefreshCw, 
  Globe, 
  User, 
  Mail, 
  Phone, 
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
  Code
} from "lucide-react";

const ContentManager = () => {
  const [content, setContent] = useState({
    heroTitle: "Joseph Smith",
    heroSubtitle: "Full Stack Developer & UI/UX Designer",
    heroDescription: "Passionate about creating innovative web solutions and exceptional user experiences.",
    aboutMe: "I'm a dedicated full-stack developer with expertise in modern web technologies...",
    contactEmail: "joseph@example.com",
    contactPhone: "+1 (555) 123-4567",
    contactLocation: "San Francisco, CA",
    skills: [] as string[],
    experience: "",
    education: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      // This would typically load from a content table
      // For now, we'll use default values
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading content:", error);
      setIsLoading(false);
    }
  };

  const saveContent = async () => {
    setSaving(true);
    try {
      // Here you would save to a content management table
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate save
      
      toast({
        title: "Success",
        description: "Content updated successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save content",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const contentSections = [
    {
      title: "Hero Section",
      icon: User,
      color: "cyan",
      fields: [
        { key: "heroTitle", label: "Name/Title", icon: User },
        { key: "heroSubtitle", label: "Professional Title", icon: Briefcase },
        { key: "heroDescription", label: "Description", icon: FileText, multiline: true },
      ]
    },
    {
      title: "About Me",
      icon: FileText,
      color: "emerald",
      fields: [
        { key: "aboutMe", label: "About Description", icon: FileText, multiline: true },
      ]
    },
    {
      title: "Contact Information",
      icon: Mail,
      color: "purple",
      fields: [
        { key: "contactEmail", label: "Email", icon: Mail },
        { key: "contactPhone", label: "Phone", icon: Phone },
        { key: "contactLocation", label: "Location", icon: MapPin },
      ]
    },
  ];

  if (isLoading) {
    return (
      <div className="space-y-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="bg-slate-900/40 border-slate-700/30 backdrop-blur-md animate-pulse">
            <CardHeader>
              <div className="h-6 w-48 bg-slate-600/50 rounded" />
              <div className="h-4 w-64 bg-slate-600/50 rounded" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from({ length: 2 }).map((_, j) => (
                  <div key={j} className="h-10 bg-slate-600/50 rounded" />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Card className="bg-gradient-to-r from-slate-900/60 to-slate-800/40 border-slate-600/30 backdrop-blur-md shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white font-bold text-xl">
            <FileText className="w-6 h-6 text-cyan-400" />
            Content Management
          </CardTitle>
          <CardDescription className="text-slate-300 font-medium">
            Manage your portfolio content and personal information
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-6">
        {contentSections.map((section) => {
          const Icon = section.icon;
          const colorClasses = {
            cyan: "from-cyan-500/20 to-cyan-600/10 border-cyan-400/30",
            emerald: "from-emerald-500/20 to-emerald-600/10 border-emerald-400/30",
            purple: "from-purple-500/20 to-purple-600/10 border-purple-400/30",
          };

          return (
            <Card key={section.title} className={`bg-gradient-to-br ${colorClasses[section.color as keyof typeof colorClasses]} backdrop-blur-md shadow-lg`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white font-bold">
                  <Icon className="w-5 h-5" />
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {section.fields.map((field) => {
                  const FieldIcon = field.icon;
                  return (
                    <div key={field.key} className="space-y-2">
                      <Label className="text-white font-semibold flex items-center gap-2">
                        <FieldIcon className="w-4 h-4" />
                        {field.label}
                      </Label>
                      {field.multiline ? (
                        <Textarea
                          value={content[field.key as keyof typeof content] as string}
                          onChange={(e) => setContent(prev => ({ ...prev, [field.key]: e.target.value }))}
                          className="bg-slate-800/50 border-slate-600/30 text-white resize-none"
                          rows={4}
                        />
                      ) : (
                        <Input
                          value={content[field.key as keyof typeof content] as string}
                          onChange={(e) => setContent(prev => ({ ...prev, [field.key]: e.target.value }))}
                          className="bg-slate-800/50 border-slate-600/30 text-white"
                        />
                      )}
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="flex justify-end gap-3">
        <Button
          variant="outline"
          onClick={loadContent}
          className="border-slate-600/30 text-slate-300 hover:bg-slate-700/50"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Reset
        </Button>
        <Button
          onClick={saveContent}
          disabled={isSaving}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold"
        >
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
};

export default ContentManager;
