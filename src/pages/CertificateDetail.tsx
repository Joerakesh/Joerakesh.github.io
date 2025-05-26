import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  ArrowLeft,
  Award,
  Calendar,
  CheckCircle,
  ExternalLink,
  Download,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const certificationsData = [
  {
    id: "chatgpt-web-developers",
    title: "ChatGPT for Web Developers",
    issuer: "LinkedIn",
    date: "2024",
    image: "/Certifications/chatgpt-web-developers.jpeg",
    skills: ["Web Development", "ChatGPT"],
    description:
      "Learned to use ChatGPT to generate and optimize web code, enhance UI with CSS, and build AI-powered apps using JavaScript and React.",
    credentialId:
      "c5c454abec61af420b66faa15bf7230a4bf1113fe8b994f6891314d5918385a4",
    status: "Completed",
    personalNote:
      "Really interesting course—I took notes on how to use ChatGPT to streamline front-end development tasks, write cleaner JavaScript, and even prototype full components in React. The sections on AI-assisted debugging and CSS styling shortcuts were especially practical.",
    completionDate: "July 11, 2024",
    validUntil: "Lifetime",
    courseHours: "2 hours 29 minutes",
    certUrl:
      "https://www.linkedin.com/learning/certificates/c5c454abec61af420b66faa15bf7230a4bf1113fe8b994f6891314d5918385a4?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BNicBxWcmRmyyBP%2FNsJBkEQ%3D%3D",
  },
  {
    id: "microsoft-career-essentials",
    title:
      "Career Essentials in Software Development by Microsoft and LinkedIn",
    issuer: "Microsoft & LinkedIn",
    date: "2024",
    image: "/Certifications/microsoft-career-essentials.jpeg",
    skills: ["Software Development", "Programming"],
    description:
      "Comprehensive program covering essential software development skills and industry best practices.",
    credentialId:
      "fffd0e8209c878c0ef3d38081d5c1ce4fb48ef5037303bc242ab57ebfec41e2a",
    status: "Completed",
    personalNote:
      "Took detailed notes on software development fundamentals, debugging techniques, and programming best practices. The practical projects helped reinforce key concepts like modular coding and clean architecture. The real value came from seeing how these skills apply across both front-end and back-end development.",
    completionDate: "July 17, 2024",
    validUntil: "Lifetime",
    courseHours: "8 hours 20 minutes",
    certUrl:
      "https://www.linkedin.com/learning/certificates/fffd0e8209c878c0ef3d38081d5c1ce4fb48ef5037303bc242ab57ebfec41e2a",
  },
  {
    id: "github-professional-certificate",
    title: "Career Essentials in GitHub Professional Certificate",
    issuer: "GitHub & LinkedIn",
    date: "2025",
    image: "/Certifications/github-professional-certificate.jpeg",
    skills: ["GitHub", "Version Control"],
    description:
      "Hands-on program covering GitHub fundamentals, version control concepts, collaborative workflows, and industry best practices for modern software development.",
    credentialId:
      "8c93ad5893f125dfb7cc8876bd43e6f710b47226d791afddccd06ac0b8655728",
    status: "Completed",
    personalNote:
      "Really insightful course—took a lot of notes on branching strategies, pull request workflows, and how teams manage collaboration on GitHub. The section on handling merge conflicts and reviewing code effectively stood out the most to me.",
    completionDate: "May 26, 2025",
    validUntil: "Lifetime",
    courseHours: "4 hours 18 minutes",
    certUrl:
      "https://www.linkedin.com/learning/certificates/8c93ad5893f125dfb7cc8876bd43e6f710b47226d791afddccd06ac0b8655728",
  },
];

const CertificateDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const certificate = certificationsData.find((cert) => cert.id === id);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleBackClick = () => {
    // Get stored scroll position
    const savedPosition = sessionStorage.getItem("portfolioScrollPosition");

    // Navigate back to home using React Router
    navigate("/");

    // After navigation, restore scroll position
    if (savedPosition) {
      setTimeout(() => {
        window.scrollTo({
          top: parseInt(savedPosition, 10),
          behavior: "smooth",
        });
        // Clean up stored position
        sessionStorage.removeItem("portfolioScrollPosition");
      }, 100);
    }
  };

  const handleDownload = () => {
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
        // If sharing fails, fall back to copying to clipboard
        handleCopyToClipboard(shareUrl);
      }
    } else {
      // Fallback to copying to clipboard
      handleCopyToClipboard(shareUrl);
    }
  };

  const handleCopyToClipboard = async (text) => {
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

  if (!certificate) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">
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
        <div className="container mx-auto px-4 py-6">
          <button
            onClick={handleBackClick}
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </button>
          <div className="flex items-center gap-3">
            <Award className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold text-white">
                {certificate.title}
              </h1>
              <p className="text-primary">{certificate.issuer}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Certificate Image */}
          <div className="space-y-6">
            <Card className="bg-dark-light border-primary/20 overflow-hidden">
              <CardContent className="p-0">
                <img
                  src={certificate.image}
                  alt={certificate.title}
                  className="w-full h-85 "
                />
              </CardContent>
            </Card>

            <div className="flex gap-3">
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
                className="border-primary/20 text-primary hover:bg-primary/10"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          {/* Certificate Details */}
          <div className="space-y-6">
            <Card className="bg-dark-light border-primary/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  Certificate Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-white/60 text-sm">Status</p>
                    <p className="text-white font-medium">
                      {certificate.status}
                    </p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Completion Date</p>
                    <p className="text-white font-medium">
                      {certificate.completionDate}
                    </p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Valid Until</p>
                    <p className="text-white font-medium">
                      {certificate.validUntil}
                    </p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Course Hours</p>
                    <p className="text-white font-medium">
                      {certificate.courseHours}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-white/60 text-sm">Credential ID</p>
                  <p className="text-white font-medium">
                    {certificate.credentialId}
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="w-full border-primary/20 text-primary hover:bg-primary/10"
                  onClick={() => window.open(certificate.certUrl, "_blank")}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Verify Certificate
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-dark-light border-primary/20">
              <CardHeader>
                <CardTitle className="text-white">Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/80">{certificate.description}</p>
              </CardContent>
            </Card>

            <Card className="bg-dark-light border-primary/20">
              <CardHeader>
                <CardTitle className="text-white">Skills Learned</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {certificate.skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-dark-light border-primary/20">
              <CardHeader>
                <CardTitle className="text-white">Personal Note</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 italic">
                  "{certificate.personalNote}"
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateDetail;
