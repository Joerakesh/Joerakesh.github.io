import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { LogOut, Plus, FolderOpen, Award, BarChart3, Settings, Sun, Moon, User, Eye, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/components/ThemeProvider";
import ProjectsManager from "@/components/admin/ProjectsManager";
import CertificatesManager from "@/components/admin/CertificatesManager";
import AdminStats from "@/components/admin/AdminStats";
import PortfolioAnalytics from "@/components/admin/PortfolioAnalytics";
import SkillsManager from "@/components/admin/SkillsManager";

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        window.location.href = "/admin/auth";
        return;
      }

      // Check if user is admin
      const { data: adminData, error } = await supabase
        .from("admin_users")
        .select("*")
        .eq("user_id", session.user.id)
        .single();

      if (error || !adminData) {
        await supabase.auth.signOut();
        window.location.href = "/admin/auth";
        return;
      }

      setUser(session.user);
    } catch (error) {
      console.error("Auth check failed:", error);
      window.location.href = "/admin/auth";
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Signed out",
      description: "You've been successfully signed out.",
    });
    window.location.href = "/";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-foreground font-medium">Loading Admin Dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Portfolio Admin
                </h1>
                <p className="text-muted-foreground text-sm">Manage your portfolio content</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <Sun className="h-4 w-4 text-foreground" />
                <Switch
                  checked={theme === "dark"}
                  onCheckedChange={toggleTheme}
                />
                <Moon className="h-4 w-4 text-foreground" />
              </div>
              <Button 
                variant="outline" 
                onClick={() => window.open("/", "_blank")}
                className="text-foreground border-border hover:bg-accent"
              >
                <Eye className="w-4 h-4 mr-2" />
                View Portfolio
              </Button>
              <Button 
                variant="outline" 
                onClick={handleSignOut}
                className="text-foreground border-border hover:bg-accent"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-muted">
            <TabsTrigger 
              value="overview" 
              className="data-[state=active]:bg-background data-[state=active]:text-foreground text-muted-foreground"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="projects" 
              className="data-[state=active]:bg-background data-[state=active]:text-foreground text-muted-foreground"
            >
              <FolderOpen className="w-4 h-4 mr-2" />
              Projects
            </TabsTrigger>
            <TabsTrigger 
              value="skills" 
              className="data-[state=active]:bg-background data-[state=active]:text-foreground text-muted-foreground"
            >
              <Settings className="w-4 h-4 mr-2" />
              Skills
            </TabsTrigger>
            <TabsTrigger 
              value="certificates" 
              className="data-[state=active]:bg-background data-[state=active]:text-foreground text-muted-foreground"
            >
              <Award className="w-4 h-4 mr-2" />
              Certificates
            </TabsTrigger>
            <TabsTrigger 
              value="analytics" 
              className="data-[state=active]:bg-background data-[state=active]:text-foreground text-muted-foreground"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <AdminStats />
              </div>
              <div className="space-y-4">
                <Card className="bg-card border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-foreground">
                      <Plus className="w-5 h-5" />
                      Quick Actions
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Manage your content
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button 
                      className="w-full justify-start" 
                      variant="outline"
                      onClick={() => {
                        const tabs = document.querySelector('[role="tablist"]');
                        const projectTab = tabs?.querySelector('[value="projects"]') as HTMLElement;
                        projectTab?.click();
                      }}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add New Project
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => {
                        const tabs = document.querySelector('[role="tablist"]');
                        const certTab = tabs?.querySelector('[value="certificates"]') as HTMLElement;
                        certTab?.click();
                      }}
                    >
                      <Award className="w-4 h-4 mr-2" />
                      Add Certificate
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => {
                        const tabs = document.querySelector('[role="tablist"]');
                        const analyticsTab = tabs?.querySelector('[value="analytics"]') as HTMLElement;
                        analyticsTab?.click();
                      }}
                    >
                      <BarChart3 className="w-4 h-4 mr-2" />
                      View Analytics
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-card border">
                  <CardHeader>
                    <CardTitle className="text-foreground">Portfolio Tips</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Best practices for success
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="font-medium text-foreground">🎨 Visual Impact</p>
                      <p className="text-muted-foreground text-xs mt-1">Use high-quality project images</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="font-medium text-foreground">🚀 Live Demos</p>
                      <p className="text-muted-foreground text-xs mt-1">Include working project links</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="font-medium text-foreground">📝 Clear Descriptions</p>
                      <p className="text-muted-foreground text-xs mt-1">Write engaging project stories</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Card className="bg-card border">
              <CardHeader>
                <CardTitle className="text-foreground">Portfolio Status</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Current portfolio health and metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="text-foreground font-medium text-sm">Content Active</p>
                      <p className="text-muted-foreground text-xs">All systems operational</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div>
                      <p className="text-foreground font-medium text-sm">Analytics Ready</p>
                      <p className="text-muted-foreground text-xs">Data tracking enabled</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <div>
                      <p className="text-foreground font-medium text-sm">SEO Optimized</p>
                      <p className="text-muted-foreground text-xs">Search engine ready</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects">
            <ProjectsManager />
          </TabsContent>

          <TabsContent value="skills">
            <SkillsManager />
          </TabsContent>

          <TabsContent value="certificates">
            <CertificatesManager />
          </TabsContent>

          <TabsContent value="analytics">
            <PortfolioAnalytics />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
