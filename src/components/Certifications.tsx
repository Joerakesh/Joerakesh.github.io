
import { useState, useEffect } from "react";
import { Award, ExternalLink, Calendar, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
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
}

const CertificateSkeleton = () => (
  <div className="bg-dark-light rounded-xl overflow-hidden border border-primary/10">
    <div className="relative">
      <Skeleton className="w-full h-48 bg-dark" />
      <div className="absolute top-4 right-4">
        <Skeleton className="w-16 h-6 rounded-full bg-dark" />
      </div>
      <div className="absolute bottom-4 left-4 right-4">
        <Skeleton className="h-4 w-20 mb-2 bg-dark" />
        <Skeleton className="h-5 w-3/4 mb-1 bg-dark" />
        <Skeleton className="h-4 w-1/2 bg-dark" />
      </div>
    </div>
  </div>
);

const Certifications = () => {
  const [certificationsData, setCertificationsData] = useState<Certificate[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCertifications();
  }, []);

  const fetchCertifications = async () => {
    try {
      const { data, error } = await supabase
        .from("certificates")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setCertificationsData(data || []);
    } catch (error) {
      console.error("Error fetching certificates:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCertificateClick = () => {
    sessionStorage.setItem(
      "portfolioScrollPosition",
      window.scrollY.toString()
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Helper function to get the correct image path
  const getImagePath = (imagePath: string) => {
    // If the path starts with /Certifications/, return as is
    if (imagePath.startsWith('/Certifications/')) {
      return imagePath;
    }
    // If it doesn't start with /, add it
    if (!imagePath.startsWith('/')) {
      return `/${imagePath}`;
    }
    return imagePath;
  };

  return (
    <section id="certifications" className="py-20 px-4 bg-dark">
      <div className="container mx-auto">
        <div className="flex items-center gap-2 mb-12">
          <Award className="w-5 h-5 text-primary" />
          <h2 className="text-3xl font-bold text-white">Certifications</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading ? (
            // Show skeleton loading
            Array.from({ length: 8 }).map((_, index) => (
              <CertificateSkeleton key={index} />
            ))
          ) : (
            certificationsData.map((cert, index) => (
              <HoverCard key={cert.id}>
                <HoverCardTrigger asChild>
                  <Link
                    to={`/certificate/${cert.id}`}
                    onClick={handleCertificateClick}
                    className="group block bg-dark-light rounded-xl overflow-hidden border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    aria-label={`View certificate details for ${cert.title}`}
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={getImagePath(cert.image)}
                        alt={`${cert.title} certificate`}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          console.error('Certificate image failed to load:', cert.image);
                          const target = e.target as HTMLImageElement;
                          target.src = '/placeholder.svg';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-light/80 via-transparent to-transparent" />
                      <div className="absolute top-4 right-4">
                        <div className="flex items-center gap-1 bg-green-500/20 backdrop-blur-sm rounded-full px-2 py-1">
                          <CheckCircle className="w-3 h-3 text-green-400" />
                          <span className="text-xs text-green-400 font-medium">
                            {cert.status}
                          </span>
                        </div>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center gap-2 text-white/80 text-sm mb-1">
                          <Calendar className="w-4 h-4" />
                          {cert.date}
                        </div>
                        <h3 className="font-semibold text-white line-clamp-2 group-hover:text-primary transition-colors duration-300">
                          {cert.title}
                        </h3>
                        <p className="text-primary text-sm font-medium">{cert.issuer}</p>
                      </div>
                    </div>
                  </Link>
                </HoverCardTrigger>
                <HoverCardContent className="w-80 bg-dark-light border-primary/20 text-white">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-white">{cert.title}</h4>
                        <p className="text-primary text-sm">{cert.issuer}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-xs text-green-400">
                          {cert.status}
                        </span>
                      </div>
                    </div>

                    <p className="text-white/70 text-sm">{cert.description}</p>

                    <div>
                      <h5 className="text-sm font-medium text-white mb-2">
                        Skills Learned:
                      </h5>
                      <div className="flex flex-wrap gap-1">
                        {cert.skills.map((skill) => (
                          <span
                            key={skill}
                            className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-primary/10">
                      <span className="text-xs text-white/60">
                        ID: {cert.credential_id}
                      </span>
                      <ExternalLink className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            ))
          )}
        </div>

        {!isLoading && certificationsData.length === 0 && (
          <div className="text-center py-12">
            <Award className="w-16 h-16 text-primary/50 mx-auto mb-4" />
            <p className="text-white/70 text-lg">No certifications available</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Certifications;
