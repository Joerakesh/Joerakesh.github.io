
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X, Image, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  folder: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
}

const ImageUpload = ({ value, onChange, folder, label, required = false, disabled = false }: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string>(value);
  const { toast } = useToast();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Error",
        description: "Please select an image file",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Error",
        description: "Image size must be less than 5MB",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    try {
      // Generate unique filename
      const fileExtension = file.name.split('.').pop();
      const fileName = `${folder.toLowerCase()}-${Date.now()}.${fileExtension}`;
      const filePath = `${folder}/${fileName}`;

      // Upload file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('portfolio-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data } = supabase.storage
        .from('portfolio-images')
        .getPublicUrl(filePath);

      const publicUrl = data.publicUrl;
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setPreview(result);
      };
      reader.readAsDataURL(file);

      // Update the form data with the new image URL
      onChange(publicUrl);
      
      toast({
        title: "Success",
        description: "Image uploaded successfully!",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to upload image: " + error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = async () => {
    if (value && value.includes('portfolio-images')) {
      try {
        // Extract file path from URL
        const urlParts = value.split('/');
        const fileName = urlParts[urlParts.length - 1];
        const folderName = urlParts[urlParts.length - 2];
        const filePath = `${folderName}/${fileName}`;
        
        if (filePath) {
          await supabase.storage
            .from('portfolio-images')
            .remove([filePath]);
        }
      } catch (error) {
        console.error('Error removing file:', error);
      }
    }
    
    setPreview("");
    onChange("");
  };

  // Display the actual uploaded image if available, fallback to preview
  const displayImage = value || preview;

  return (
    <div className="space-y-4">
      <Label htmlFor={`image-upload-${folder}`} className="text-white font-semibold text-lg">
        {label} {required && <span className="text-red-400">*</span>}
      </Label>
      
      <div className="space-y-4">
        {displayImage && (
          <div className="relative w-full max-w-xs">
            <div className="relative overflow-hidden rounded-xl border-2 border-cyan-400/30 bg-slate-800/50 backdrop-blur-sm shadow-lg hover:shadow-cyan-500/20 transition-all duration-300">
              <img
                src={displayImage}
                alt="Uploaded preview"
                className="w-full h-40 object-cover transition-transform hover:scale-105"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder.svg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              {value && (
                <div className="absolute top-2 left-2 bg-emerald-500/90 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Uploaded
                </div>
              )}
            </div>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2 h-8 w-8 p-0 bg-red-500/90 hover:bg-red-600 backdrop-blur-sm"
              onClick={handleRemove}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
        
        <div className="flex items-center gap-3">
          <Input
            id={`image-upload-${folder}`}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploading || disabled}
            className="flex-1 bg-slate-800/50 border-cyan-400/30 text-white file:bg-slate-700 file:text-white file:border-cyan-400/30 hover:bg-slate-700/50 transition-colors"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={uploading || disabled}
            className="whitespace-nowrap bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-400/30 text-cyan-100 hover:from-cyan-500/30 hover:to-blue-500/30 transition-all font-semibold"
          >
            <Upload className="h-4 w-4 mr-2" />
            {uploading ? "Uploading..." : "Select Image"}
          </Button>
        </div>
        
        {value && !preview && (
          <div className="flex items-center gap-2 text-sm text-cyan-200 bg-slate-800/30 p-3 rounded-lg border border-cyan-400/30">
            <Image className="h-4 w-4 text-emerald-400" />
            <span className="font-medium text-white">Current: {value.split('/').pop()}</span>
          </div>
        )}
        
        <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/30 p-3 rounded-lg border border-cyan-400/20">
          <p className="text-xs text-cyan-200 font-medium">
            📸 Upload high-quality images (max 5MB) • Supported: JPEG, PNG, WebP, GIF
          </p>
          <p className="text-xs text-slate-300 mt-1">
            Images are securely stored and optimized for your portfolio
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
