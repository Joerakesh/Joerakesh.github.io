
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { FolderOpen, Award, Eye, TrendingUp, Calendar, Star } from "lucide-react";

const AdminStats = () => {
  const [stats, setStats] = useState({
    totalProjects: 0,
    featuredProjects: 0,
    totalCertificates: 0,
    portfolioCompletion: 0,
    recentActivity: 0,
    totalTech: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch projects
      const { data: projects } = await supabase
        .from("projects")
        .select("*");

      // Fetch certificates
      const { data: certificates } = await supabase
        .from("certificates")
        .select("*");

      if (projects && certificates) {
        const featuredProjects = projects.filter(p => p.featured).length;
        const projectsWithImages = projects.filter(p => p.image).length;
        const projectsWithLinks = projects.filter(p => p.live_link || p.repo_link).length;
        
        // Calculate completion percentage
        const totalItems = projects.length + certificates.length;
        const completedItems = projectsWithImages + projectsWithLinks + certificates.length;
        const completion = totalItems > 0 ? Math.round((completedItems / (totalItems * 2)) * 100) : 0;

        // Get unique technologies
        const allTech = projects.flatMap(p => p.tech || []);
        const uniqueTech = new Set(allTech);

        // Calculate recent activity (last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const recentProjects = projects.filter(p => new Date(p.created_at) > thirtyDaysAgo);
        const recentCerts = certificates.filter(c => new Date(c.created_at) > thirtyDaysAgo);

        setStats({
          totalProjects: projects.length,
          featuredProjects,
          totalCertificates: certificates.length,
          portfolioCompletion: completion,
          recentActivity: recentProjects.length + recentCerts.length,
          totalTech: uniqueTech.size,
        });
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Projects",
      value: stats.totalProjects,
      icon: FolderOpen,
      color: "blue",
      description: `${stats.featuredProjects} featured`,
    },
    {
      title: "Certificates",
      value: stats.totalCertificates,
      icon: Award,
      color: "green",
      description: "Professional credentials",
    },
    {
      title: "Portfolio Health",
      value: `${stats.portfolioCompletion}%`,
      icon: TrendingUp,
      color: "purple",
      description: "Completion status",
    },
    {
      title: "Technologies",
      value: stats.totalTech,
      icon: Star,
      color: "orange",
      description: "Unique skills showcased",
    },
    {
      title: "Recent Activity",
      value: stats.recentActivity,
      icon: Calendar,
      color: "pink",
      description: "Last 30 days",
    },
    {
      title: "Profile Views",
      value: "2.1k",
      icon: Eye,
      color: "indigo",
      description: "This month",
    },
  ];

  if (isLoading) {
    return (
      <Card className="bg-card border">
        <CardHeader>
          <CardTitle className="text-foreground">Loading Statistics...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
            <div className="h-4 bg-muted rounded w-2/3"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-card border">
        <CardHeader>
          <CardTitle className="text-foreground">Portfolio Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Portfolio Completion</span>
              <Badge variant={stats.portfolioCompletion >= 80 ? "default" : "secondary"}>
                {stats.portfolioCompletion >= 80 ? "Excellent" : stats.portfolioCompletion >= 60 ? "Good" : "Needs Work"}
              </Badge>
            </div>
            <Progress value={stats.portfolioCompletion} className="h-2" />
            <p className="text-xs text-muted-foreground">
              Your portfolio is {stats.portfolioCompletion}% complete
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="bg-card border hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default AdminStats;
