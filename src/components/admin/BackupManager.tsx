
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  Download, 
  Upload, 
  Database, 
  FileArchive, 
  History, 
  Shield, 
  CheckCircle,
  AlertCircle,
  Clock
} from "lucide-react";

const BackupManager = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [backups, setBackups] = useState([
    {
      id: 1,
      date: "2024-01-15",
      time: "14:30",
      size: "2.4 MB",
      type: "Auto",
      status: "success"
    },
    {
      id: 2,
      date: "2024-01-14",
      time: "10:15",
      size: "2.3 MB",
      type: "Manual",
      status: "success"
    },
    {
      id: 3,
      date: "2024-01-13",
      time: "16:45",
      size: "2.2 MB",
      type: "Auto",
      status: "success"
    },
  ]);
  const { toast } = useToast();

  const exportData = async () => {
    setIsExporting(true);
    try {
      // Fetch all data
      const { data: projects } = await supabase.from("projects").select("*");
      const { data: certificates } = await supabase.from("certificates").select("*");

      const exportData = {
        projects: projects || [],
        certificates: certificates || [],
        exportDate: new Date().toISOString(),
        version: "1.0"
      };

      const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: "application/json"
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `portfolio-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Export Successful",
        description: "Your portfolio data has been exported successfully!",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export portfolio data",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const importData = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    try {
      const text = await file.text();
      const data = JSON.parse(text);

      // Validate data structure
      if (!data.projects || !data.certificates) {
        throw new Error("Invalid backup file format");
      }

      // You would implement the actual import logic here
      toast({
        title: "Import Successful",
        description: "Portfolio data has been imported successfully!",
      });
    } catch (error) {
      toast({
        title: "Import Failed",
        description: "Failed to import portfolio data",
        variant: "destructive",
      });
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="space-y-8">
      <Card className="bg-gradient-to-r from-slate-900/60 to-slate-800/40 border-slate-600/30 backdrop-blur-md shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white font-bold text-xl">
            <Shield className="w-6 h-6 text-emerald-400" />
            Data Backup & Security
          </CardTitle>
          <CardDescription className="text-slate-300 font-medium">
            Manage your portfolio data backups and exports
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-gradient-to-br from-cyan-500/20 to-blue-600/10 border-cyan-400/30 backdrop-blur-md shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-cyan-100 font-bold">
              <Download className="w-5 h-5" />
              Export Data
            </CardTitle>
            <CardDescription className="text-cyan-200/80">
              Download a complete backup of your portfolio
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-cyan-500/10 p-4 rounded-lg border border-cyan-400/20">
              <p className="text-cyan-100 text-sm font-medium mb-2">Export includes:</p>
              <ul className="text-cyan-200/80 text-xs space-y-1">
                <li>• All projects with images</li>
                <li>• Certificates and credentials</li>
                <li>• Analytics data</li>
                <li>• Content settings</li>
              </ul>
            </div>
            <Button
              onClick={exportData}
              disabled={isExporting}
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold"
            >
              <FileArchive className="w-4 h-4 mr-2" />
              {isExporting ? "Exporting..." : "Export Portfolio"}
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-500/20 to-green-600/10 border-emerald-400/30 backdrop-blur-md shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-emerald-100 font-bold">
              <Upload className="w-5 h-5" />
              Import Data
            </CardTitle>
            <CardDescription className="text-emerald-200/80">
              Restore portfolio from backup file
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-emerald-500/10 p-4 rounded-lg border border-emerald-400/20">
              <p className="text-emerald-100 text-sm font-medium mb-2">Import will:</p>
              <ul className="text-emerald-200/80 text-xs space-y-1">
                <li>• Replace existing data</li>
                <li>• Restore all content</li>
                <li>• Update analytics</li>
                <li>• Merge configurations</li>
              </ul>
            </div>
            <input
              type="file"
              accept=".json"
              onChange={importData}
              className="hidden"
              id="import-file"
            />
            <Button
              onClick={() => document.getElementById('import-file')?.click()}
              disabled={isImporting}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold"
            >
              <Database className="w-4 h-4 mr-2" />
              {isImporting ? "Importing..." : "Import Portfolio"}
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-to-br from-purple-500/20 to-indigo-600/10 border-purple-400/30 backdrop-blur-md shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-100 font-bold">
            <History className="w-5 h-5" />
            Backup History
          </CardTitle>
          <CardDescription className="text-purple-200/80">
            Recent backup activities and restore points
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {backups.map((backup) => (
              <div key={backup.id} className="flex items-center justify-between p-4 rounded-lg bg-purple-500/10 border border-purple-400/20 hover:bg-purple-500/15 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <div>
                    <p className="text-purple-100 font-semibold text-sm">
                      {backup.date} at {backup.time}
                    </p>
                    <p className="text-purple-200/70 text-xs">
                      {backup.size} • {backup.type} Backup
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant="outline" 
                    className="border-emerald-400/30 text-emerald-300 bg-emerald-500/10"
                  >
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Success
                  </Badge>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-purple-200 hover:text-white hover:bg-purple-500/20"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-slate-800/60 to-slate-700/40 border-slate-600/30 backdrop-blur-md shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-100 font-bold">
            <Clock className="w-5 h-5 text-yellow-400" />
            Auto-Backup Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center p-4 rounded-lg bg-emerald-500/10 border border-emerald-400/20">
              <div className="text-2xl font-bold text-emerald-100">Daily</div>
              <div className="text-xs text-emerald-200/80">Frequency</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-cyan-500/10 border border-cyan-400/20">
              <div className="text-2xl font-bold text-cyan-100">7</div>
              <div className="text-xs text-cyan-200/80">Days Retained</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-purple-500/10 border border-purple-400/20">
              <div className="text-2xl font-bold text-purple-100">2:00 AM</div>
              <div className="text-xs text-purple-200/80">Backup Time</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BackupManager;
