
import { User, Download, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import { toast } from "@/utils/toast-utils";
import { cn } from "@/lib/utils";

const AboutMe = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const statRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleDownloadCV = () => {
    toast.success("CV Download", "Your CV is being downloaded...");

    // Create an anchor element and trigger the download
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.target = "_blank";
    link.download = "Joe_Rakesh_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-20 px-4 transition-colors duration-300"
    >
      <div className="container mx-auto">
        <div 
          className={cn(
            "flex items-center gap-2 mb-8 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <User className="w-5 h-5 text-primary" />
          <h2 className="text-3xl font-bold text-foreground neon-text">
            About Me
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div
            className={cn(
              "space-y-6 transition-all duration-700 scroll-reveal",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
            style={{ transitionDelay: "150ms" }}
          >
            <p className="text-foreground/80 text-lg leading-relaxed">
              Hello! I'm Joe Rakesh A, a passionate full-stack developer with a
              love for creating elegant solutions to complex problems. With over
              1 years of experience in web development, I specialize in building
              modern, responsive web applications.
            </p>
            <p className="text-foreground/80 text-lg leading-relaxed">
              My approach combines technical expertise with a keen eye for
              design, ensuring that the applications I build are not only
              functional but also provide an excellent user experience. I'm
              constantly learning new technologies and methodologies to stay at
              the forefront of web development.
            </p>
            <Button
              variant="outline"
              className="mt-4 border-primary/20 text-primary hover:bg-primary/10 transition-all duration-300 button-glow"
              onClick={handleDownloadCV}
            >
              <Download className="w-4 h-4 mr-2" /> Download CV
            </Button>
          </div>
          <div
            className={cn(
              "grid grid-cols-2 gap-4 transition-all duration-1000",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            )}
            style={{ transitionDelay: "300ms" }}
          >
            {[
              { title: "1+", desc: "Years of Experience" },
              { title: "5+", desc: "Projects Completed" },
              { title: "2+", desc: "Happy Clients" },
              { title: "100%", desc: "Client Satisfaction" },
            ].map((stat, index) => (
              <div
                key={index}
                ref={(el) => (statRefs.current[index] = el)}
                className={cn(
                  "p-6 bg-card rounded-lg border border-primary/10 transform transition-transform hover:scale-105 hover:border-primary/30 card-hover neon-box",
                  isVisible ? "animate-scale-in" : "opacity-0"
                )}
                style={{ animationDelay: `${index * 150 + 450}ms` }}
              >
                <h3 className="text-xl font-bold text-primary mb-2 flex items-center">
                  {stat.title}
                </h3>
                <p className="text-foreground/80">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
