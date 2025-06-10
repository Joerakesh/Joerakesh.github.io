
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, Code, Eye, Target, Award } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line } from "recharts";

const PortfolioAnalytics = () => {
  const [analytics, setAnalytics] = useState({
    completion: 0,
    techDiversity: 0,
    visualAppeal: 0,
    engagement: 0,
    projectsData: [],
    techStackData: [],
    timelineData: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const { data: projects } = await supabase
        .from("projects")
        .select("*");

      const { data: certificates } = await supabase
        .from("certificates")
        .select("*");

      if (projects && certificates) {
        // Calculate metrics
        const totalProjects = projects.length;
        const projectsWithImages = projects.filter(p => p.image).length;
        const projectsWithDescription = projects.filter(p => p.description && p.description.length > 50).length;
        const completion = Math.round(((projectsWithImages + projectsWithDescription + certificates.length) / ((totalProjects * 2) + 10)) * 100);

        const allTech = projects.flatMap(p => p.tech || []);
        const uniqueTech = new Set(allTech);
        const techDiversity = Math.min(Math.round((uniqueTech.size / 15) * 100), 100);

        const visualAppeal = Math.round((projectsWithImages / Math.max(totalProjects, 1)) * 100);

        const projectsWithLinks = projects.filter(p => p.live_link || p.repo_link).length;
        const engagement = Math.round((projectsWithLinks / Math.max(totalProjects, 1)) * 100);

        // Prepare chart data
        const techStackData = Array.from(uniqueTech).slice(0, 8).map(tech => ({
          name: tech,
          count: allTech.filter(t => t === tech).length,
        }));

        const projectsData = projects.slice(0, 5).map(project => ({
          name: project.title.slice(0, 10) + (project.title.length > 10 ? '...' : ''),
          tech: project.tech?.length || 0,
          featured: project.featured ? 1 : 0,
        }));

        // Timeline data
        const monthlyData = projects.reduce((acc, project) => {
          const month = new Date(project.created_at).toLocaleDateString('en-US', { month: 'short' });
          acc[month] = (acc[month] || 0) + 1;
          return acc;
        }, {});

        const timelineData = Object.entries(monthlyData).map(([month, count]) => ({
          month,
          projects: count,
        }));

        setAnalytics({
          completion,
          techDiversity,
          visualAppeal,
          engagement,
          projectsData,
          techStackData,
          timelineData,
        });
      }
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const analyticsCards = [
    {
      title: "Portfolio Completion",
      value: analytics.completion,
      description: "Overall completeness",
      icon: Target,
      suggestions: analytics.completion < 70 ? ["Add more project details", "Include certificates"] : ["Portfolio looks great!"]
    },
    {
      title: "Tech Diversity",
      value: analytics.techDiversity,
      description: "Technology variety",
      icon: Code,
      suggestions: analytics.techDiversity < 60 ? ["Add backend projects", "Include mobile development"] : ["Great tech stack!"]
    },
    {
      title: "Visual Appeal",
      value: analytics.visualAppeal,
      description: "Projects with images",
      icon: Eye,
      suggestions: analytics.visualAppeal < 80 ? ["Add screenshots", "Include demo videos"] : ["Excellent presentation!"]
    },
    {
      title: "Engagement",
      value: analytics.engagement,
      description: "Projects with links",
      icon: TrendingUp,
      suggestions: analytics.engagement < 70 ? ["Add live demos", "Include GitHub links"] : ["Perfect setup!"]
    }
  ];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card className="bg-card border animate-pulse">
          <CardHeader>
            <div className="h-6 w-48 bg-muted rounded" />
            <div className="h-4 w-64 bg-muted rounded" />
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Card className="bg-card border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <BarChart3 className="w-6 h-6" />
            Portfolio Analytics
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Performance insights and recommendations
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {analyticsCards.map((item) => {
          const Icon = item.icon;
          
          return (
            <Card key={item.title} className="bg-card border">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base text-foreground">
                    {item.title}
                  </CardTitle>
                  <Icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <CardDescription className="text-muted-foreground">
                  {item.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-foreground">{item.value}%</span>
                    <Badge variant={item.value >= 80 ? "default" : item.value >= 60 ? "secondary" : "outline"}>
                      {item.value >= 80 ? "Excellent" : item.value >= 60 ? "Good" : "Needs Work"}
                    </Badge>
                  </div>
                  <Progress value={item.value} className="h-2" />
                </div>
                
                <div className="space-y-1">
                  <p className="text-xs font-medium text-foreground">Suggestions:</p>
                  {item.suggestions.map((suggestion, index) => (
                    <p key={index} className="text-xs text-muted-foreground">
                      • {suggestion}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="bg-card border">
          <CardHeader>
            <CardTitle className="text-foreground">Tech Stack Usage</CardTitle>
            <CardDescription className="text-muted-foreground">Most used technologies</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                count: {
                  label: "Usage Count",
                  color: "hsl(var(--primary))",
                },
              }}
              className="h-[200px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analytics.techStackData}>
                  <XAxis dataKey="name" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                  <YAxis tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="bg-card border">
          <CardHeader>
            <CardTitle className="text-foreground">Project Timeline</CardTitle>
            <CardDescription className="text-muted-foreground">Projects created over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                projects: {
                  label: "Projects",
                  color: "hsl(var(--primary))",
                },
              }}
              className="h-[200px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analytics.timelineData}>
                  <XAxis dataKey="month" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                  <YAxis tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="projects" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Award className="w-5 h-5" />
            Portfolio Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <div className="text-2xl font-bold text-foreground">{analytics.projectsData.length}</div>
              <div className="text-xs text-muted-foreground">Active Projects</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <div className="text-2xl font-bold text-foreground">{analytics.techStackData.length}</div>
              <div className="text-xs text-muted-foreground">Technologies</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <div className="text-2xl font-bold text-foreground">{Math.round(analytics.completion * 0.8)}</div>
              <div className="text-xs text-muted-foreground">Quality Score</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <div className="text-2xl font-bold text-foreground">{Math.round(analytics.engagement * 0.9)}</div>
              <div className="text-xs text-muted-foreground">Engagement Score</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioAnalytics;
