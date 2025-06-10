
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Award,
  Calendar,
  CheckCircle,
  ExternalLink,
  Download,
  Share2,
  Clock,
  CalendarDays,
  Shield,
  BookOpen,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string;
  skills: string[];
  description: string;
  credential_id: string;
  status: string;
  completion_date?: string;
  valid_until?: string;
  course_hours?: number;
  verify_link?: string;
  personal_note?: string;
}

const CertificateDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (id) {
      fetchCertificate();
    }
  }, [id]);

  const fetchCertificate = async () => {
    try {
      const { data, error } = await supabase
        .from("certificates")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      setCertificate(data);
    } catch (error) {
      console.error("Error fetching certificate:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackClick = () => {
    const savedPosition = sessionStorage.getItem("portfolioScrollPosition");
    navigate("/");

    if (savedPosition) {
      setTimeout(() => {
        window.scrollTo({
          top: parseInt(savedPosition, 10),
          behavior: "smooth",
        });
        sessionStorage.removeItem("portfolioScrollPosition");
      }, 100);
    }
  };

  const handleDownload = () => {
    if (!certificate) return;
    
    const imageUrl = certificate.image;
    const fileName = `${certificate.title.replace(
      /\s+/g,
      "_"
    )}_Certificate.jpg`;

    fetch(imageUrl, { mode: "cors" })
      .then((response) => response.blob())
      .then((blob) => {
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);

        toast({
          title: "Certificate Downloaded",
          description: "Your certificate has been downloaded successfully.",
        });
      })
      .catch(() => {
        toast({
          title: "Download Failed",
          description: "Unable to download the certificate image.",
          variant: "destructive",
        });
      });
  };

  const handleShare = async () => {
    if (!certificate) return;
    
    const shareUrl = window.location.href;
    const shareText = `Check out my ${certificate.title} certificate from ${certificate.issuer}!`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: certificate.title,
          text: shareText,
          url: shareUrl,
        });
        toast({
          title: "Shared Successfully",
          description: "Certificate link has been shared.",
        });
      } catch (error) {
        handleCopyToClipboard(shareUrl);
      }
    } else {
      handleCopyToClipboard(shareUrl);
    }
  };

  const handleCopyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Link Copied",
        description: "Certificate link has been copied to your clipboard.",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Please copy the link manually from the address bar.",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-white">Loading certificate details...</p>
        </div>
      </div>
    );
  }

  if (!certificate) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-xl md:text-2xl font-bold text-white mb-4">
            Certificate Not Found
          </h1>
          <button
            onClick={handleBackClick}
            className="text-primary hover:underline"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark">
      {/* Header */}
      <div className="bg-dark-light border-b border-primary/10">
        <div className="container mx-auto px-4 py-4 md:py-6">
          <button
            onClick={handleBackClick}
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </button>
          <div className="flex items-start md:items-center gap-3">
            <Award className="w-6 h-6 md:w-8 md:h-8 text-primary flex-shrink-0 mt-1 md:mt-0" />
            <div>
              <h1 className="text-xl md:text-3xl font-bold text-white leading-tight">
                {certificate.title}
              </h1>
              <p className="text-primary text-sm md:text-base">
                {certificate.issuer}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 md:py-12">
        <div className="grid lg:grid-cols-2 gap-6 md:gap-12">
          {/* Certificate Image */}
          <div className="space-y-4 md:space-y-6">
            <Card className="bg-dark-light border-primary/20 overflow-hidden">
              <CardContent className="p-0">
                <img
                  src={certificate.image}
                  alt={certificate.title}
                  className="w-full h-85"
                />
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleDownload}
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Certificate
              </Button>
              <Button
                onClick={handleShare}
                variant="outline"
                className="flex-1 sm:flex-none border-primary/20 text-primary hover:bg-primary/10"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          {/* Certificate Details */}
          <div className="space-y-4 md:space-y-6">
            <Card className="bg-dark-light border-primary/20">
              <CardHeader className="pb-3 md:pb-6">
                <CardTitle className="text-white flex items-center gap-2 text-lg md:text-xl">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  Certificate Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-white/60 text-sm mb-1">
                      <Shield className="w-4 h-4" />
                      Status
                    </div>
                    <p className="text-white font-medium text-sm md:text-base">
                      {certificate.status}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-white/60 text-sm mb-1">
                      <Calendar className="w-4 h-4" />
                      Issue Date
                    </div>
                    <p className="text-white font-medium text-sm md:text-base">
                      {certificate.date}
                    </p>
                  </div>
                </div>

                {(certificate.completion_date || certificate.valid_until || certificate.course_hours) && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                    {certificate.completion_date && (
                      <div>
                        <div className="flex items-center gap-2 text-white/60 text-sm mb-1">
                          <CheckCircle className="w-4 h-4" />
                          Completion Date
                        </div>
                        <p className="text-white font-medium text-sm md:text-base">
                          {formatDate(certificate.completion_date)}
                        </p>
                      </div>
                    )}
                    {certificate.valid_until && (
                      <div>
                        <div className="flex items-center gap-2 text-white/60 text-sm mb-1">
                          <CalendarDays className="w-4 h-4" />
                          Valid Until
                        </div>
                        <p className="text-white font-medium text-sm md:text-base">
                          {formatDate(certificate.valid_until)}
                        </p>
                      </div>
                    )}
                    {certificate.course_hours && (
                      <div className="sm:col-span-2">
                        <div className="flex items-center gap-2 text-white/60 text-sm mb-1">
                          <Clock className="w-4 h-4" />
                          Course Hours
                        </div>
                        <p className="text-white font-medium text-sm md:text-base">
                          {certificate.course_hours} hours
                        </p>
                      </div>
                    )}
                  </div>
                )}

                <div>
                  <p className="text-white/60 text-sm">Credential ID</p>
                  <p className="text-white font-medium text-sm md:text-base break-all">
                    {certificate.credential_id}
                  </p>
                </div>

                {certificate.verify_link ? (
                  <a
                    href={certificate.verify_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button
                      variant="outline"
                      className="w-full border-primary/20 text-primary hover:bg-primary/10"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Verify Certificate
                    </Button>
                  </a>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full border-primary/20 text-primary hover:bg-primary/10"
                    disabled
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Verify Certificate
                  </Button>
                )}
              </CardContent>
            </Card>

            <Card className="bg-dark-light border-primary/20">
              <CardHeader className="pb-3 md:pb-6">
                <CardTitle className="text-white flex items-center gap-2 text-lg md:text-xl">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Description
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 text-sm md:text-base leading-relaxed">
                  {certificate.description}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-dark-light border-primary/20">
              <CardHeader className="pb-3 md:pb-6">
                <CardTitle className="text-white text-lg md:text-xl">
                  Skills Learned
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {certificate.skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-primary/20 text-primary px-2 md:px-3 py-1 rounded-full text-xs md:text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {certificate.personal_note && (
              <Card className="bg-dark-light border-primary/20">
                <CardHeader className="pb-3 md:pb-6">
                  <CardTitle className="text-white flex items-center gap-2 text-lg md:text-xl">
                    <Heart className="w-5 h-5 text-red-400" />
                    Personal Note
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 text-sm md:text-base leading-relaxed">
                    {certificate.personal_note}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateDetail;
