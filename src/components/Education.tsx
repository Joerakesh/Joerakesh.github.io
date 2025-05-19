import { BookOpen } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Education = () => {
  return (
    <section id="education" className="py-20 px-4 bg-dark">
      <div className="container mx-auto">
        <div className="flex items-center gap-2 mb-12">
          <BookOpen className="w-5 h-5 text-primary" />
          <h2 className="text-3xl font-bold text-white">Education</h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-12">
          <div className="relative pl-8">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-primary/20"></div>
            <div className="absolute left-0 top-1 w-2 h-2 rounded-full bg-primary"></div>

            <div className="bg-dark-light p-6 rounded-lg border border-primary/10">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">
                  Bachelor of Computer Applications
                </h3>
                <span className="text-primary-light text-sm">2023 - 2026</span>
              </div>
              <p className="text-primary mb-2">St. Joseph's College, Trichy</p>
              <p className="text-white/80">
                Specialized in Advanced Web Technologies and Artificial
                Intelligence
              </p>
            </div>
          </div>

          {/* <div className="relative pl-8">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-primary/20"></div>
            <div className="absolute left-0 top-1 w-2 h-2 rounded-full bg-primary"></div>

            <div className="bg-dark-light p-6 rounded-lg border border-primary/10">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">
                  Bachelor of Computer Science
                </h3>
                <span className="text-primary-light text-sm">2012 - 2016</span>
              </div>
              <p className="text-primary mb-2">MIT</p>
              <p className="text-white/80">
                Focus on Software Development and Database Management
              </p>
            </div>
          </div>

          <div className="relative pl-8">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-primary/20"></div>
            <div className="absolute left-0 top-1 w-2 h-2 rounded-full bg-primary"></div>

            <div className="bg-dark-light p-6 rounded-lg border border-primary/10">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">
                  Advanced Web Development Certification
                </h3>
                <span className="text-primary-light text-sm">2015</span>
              </div>
              <p className="text-primary mb-2">Udacity</p>
              <p className="text-white/80">
                Specialized training in modern frontend frameworks and
                responsive design
              </p>
            </div> 
          </div>*/}
        </div>
      </div>
    </section>
  );
};

export default Education;
