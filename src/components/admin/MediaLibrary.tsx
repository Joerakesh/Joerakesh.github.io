
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  Image, 
  Search, 
  Grid, 
  List, 
  Trash2, 
  Download, 
  Eye, 
  Upload,
  Filter,
  FolderOpen,
  Calendar,
  File,
  BarChart3,
  TrendingUp,
  ImageIcon,
  Award
} from "lucide-react";

interface MediaFile {
  name: string;
  id: string;
  size?: number;
  created_at?: string;
  updated_at?: string;
  last_accessed_at?: string;
  metadata?: any;
  url?: string;
  usage_count?: number;
  used_in?: string[];
}

interface MediaStats {
  totalFiles: number;
  totalSize: number;
  imageFiles: number;
  usageStats: {
    projects: number;
    certificates: number;
    content: number;
  };
}

const MediaLibrary = () => {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [stats, setStats] = useState<MediaStats>({
    totalFiles: 0,
    totalSize: 0,
    imageFiles: 0,
    usageStats: { projects: 0, certificates: 0, content: 0 }
  });
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [filterType, setFilterType] = useState<"all" | "images" | "unused">("all");
  const { toast } = useToast();

  useEffect(() => {
    loadFilesAndStats();
  }, []);

  const loadFilesAndStats = async () => {
    try {
      // Load storage files
      const { data: storageFiles, error: storageError } = await supabase.storage
        .from('portfolio-images')
        .list('', {
          limit: 100,
          offset: 0,
        });

      if (storageError) throw storageError;

      // Load projects and certificates to check image usage
      const [projectsResponse, certificatesResponse] = await Promise.all([
        supabase.from("projects").select("image, title"),
        supabase.from("certificates").select("image, title")
      ]);

      const projects = projectsResponse.data || [];
      const certificates = certificatesResponse.data || [];

      // Create usage map
      const usageMap = new Map<string, string[]>();
      
      projects.forEach(project => {
        if (project.image) {
          const fileName = project.image.split('/').pop() || project.image;
          if (!usageMap.has(fileName)) usageMap.set(fileName, []);
          usageMap.get(fileName)?.push(`Project: ${project.title}`);
        }
      });

      certificates.forEach(cert => {
        if (cert.image) {
          const fileName = cert.image.split('/').pop() || cert.image;
          if (!usageMap.has(fileName)) usageMap.set(fileName, []);
          usageMap.get(fileName)?.push(`Certificate: ${cert.title}`);
        }
      });

      // Transform files with usage data
      const transformedFiles: MediaFile[] = (storageFiles || []).map(file => {
        const usedIn = usageMap.get(file.name) || [];
        return {
          name: file.name,
          id: file.id || file.name,
          size: file.metadata?.size || 0,
          created_at: file.created_at,
          updated_at: file.updated_at,
          last_accessed_at: file.last_accessed_at,
          metadata: file.metadata,
          url: getFileUrl(file.name),
          usage_count: usedIn.length,
          used_in: usedIn,
        };
      });

      // Calculate stats
      const totalSize = transformedFiles.reduce((sum, file) => sum + (file.size || 0), 0);
      const imageFiles = transformedFiles.filter(file => 
        file.name.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)
      ).length;

      const newStats: MediaStats = {
        totalFiles: transformedFiles.length,
        totalSize,
        imageFiles,
        usageStats: {
          projects: projects.length,
          certificates: certificates.length,
          content: 0 // Could be extended for other content types
        }
      };

      setFiles(transformedFiles);
      setStats(newStats);
    } catch (error) {
      console.error("Error loading files:", error);
      toast({
        title: "Error",
        description: "Failed to load media files",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteFile = async (fileName: string) => {
    try {
      const { error } = await supabase.storage
        .from('portfolio-images')
        .remove([fileName]);

      if (error) throw error;

      setFiles(prev => prev.filter(f => f.name !== fileName));
      toast({
        title: "Success",
        description: "File deleted successfully",
      });
      
      // Reload stats
      loadFilesAndStats();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete file",
        variant: "destructive",
      });
    }
  };

  const getFileUrl = (fileName: string) => {
    const { data } = supabase.storage
      .from('portfolio-images')
      .getPublicUrl(fileName);
    return data.publicUrl;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = 
      filterType === "all" || 
      (filterType === "images" && file.name.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) ||
      (filterType === "unused" && (file.usage_count || 0) === 0);
    
    return matchesSearch && matchesFilter;
  });

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
      <Card className="bg-card border shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground font-bold text-xl">
            <Image className="w-6 h-6 text-primary" />
            Media Library
          </CardTitle>
          <CardDescription className="text-muted-foreground font-medium">
            Manage your portfolio images and media files
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-card border">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <FolderOpen className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.totalFiles}</p>
                <p className="text-sm text-muted-foreground">Total Files</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <ImageIcon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.imageFiles}</p>
                <p className="text-sm text-muted-foreground">Images</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{formatFileSize(stats.totalSize)}</p>
                <p className="text-sm text-muted-foreground">Total Size</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.usageStats.projects + stats.usageStats.certificates}</p>
                <p className="text-sm text-muted-foreground">In Use</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border shadow-lg">
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search media files..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-background border"
                />
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as "all" | "images" | "unused")}
                className="px-3 py-2 bg-background border rounded-md text-sm"
              >
                <option value="all">All Files</option>
                <option value="images">Images Only</option>
                <option value="unused">Unused Files</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="border-primary/30 text-primary">
                <FolderOpen className="w-3 h-3 mr-1" />
                {filteredFiles.length} files
              </Badge>
              <Badge variant="outline" className="border-primary/30 text-primary">
                <Calendar className="w-3 h-3 mr-1" />
                Last updated today
              </Badge>
            </div>
            {selectedFiles.length > 0 && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  selectedFiles.forEach(deleteFile);
                  setSelectedFiles([]);
                }}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Selected ({selectedFiles.length})
              </Button>
            )}
          </div>

          {viewMode === "grid" ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredFiles.map((file) => (
                <div key={file.id} className="group relative">
                  <div className="aspect-square rounded-lg overflow-hidden bg-muted border hover:border-primary/40 transition-colors">
                    <img
                      src={file.url}
                      alt={file.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder.svg';
                      }}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="flex gap-2">
                        <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive" 
                          className="h-8 w-8 p-0"
                          onClick={() => deleteFile(file.name)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    {(file.usage_count || 0) > 0 && (
                      <div className="absolute top-2 right-2">
                        <Badge variant="secondary" className="text-xs">
                          Used {file.usage_count}x
                        </Badge>
                      </div>
                    )}
                  </div>
                  <div className="mt-2">
                    <p className="text-foreground text-sm font-medium truncate">{file.name}</p>
                    <p className="text-muted-foreground text-xs">{formatFileSize(file.size || 0)}</p>
                    {file.used_in && file.used_in.length > 0 && (
                      <p className="text-primary text-xs truncate mt-1">{file.used_in[0]}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredFiles.map((file) => (
                <div key={file.id} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 border hover:bg-muted transition-colors">
                  <img
                    src={file.url}
                    alt={file.name}
                    className="w-12 h-12 object-cover rounded"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder.svg';
                    }}
                  />
                  <div className="flex-1">
                    <p className="text-foreground font-medium">{file.name}</p>
                    <p className="text-muted-foreground text-sm">
                      {formatFileSize(file.size || 0)} • {file.created_at ? new Date(file.created_at).toLocaleDateString() : 'Unknown date'}
                    </p>
                    {file.used_in && file.used_in.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {file.used_in.slice(0, 2).map((usage, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {usage}
                          </Badge>
                        ))}
                        {file.used_in.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{file.used_in.length - 2} more
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => deleteFile(file.name)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredFiles.length === 0 && (
            <div className="text-center py-12">
              <File className="w-16 h-16 text-primary/50 mx-auto mb-4" />
              <p className="text-foreground font-medium text-lg">No files found</p>
              <p className="text-muted-foreground text-sm">Upload some images to get started</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MediaLibrary;
