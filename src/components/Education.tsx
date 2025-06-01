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
                Specialized in Advanced Web Technologies and Programming
                Languages
              </p>
            </div>
          </div>

          <div className="relative pl-8">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-primary/20"></div>
            <div className="absolute left-0 top-1 w-2 h-2 rounded-full bg-primary"></div>

            <div className="bg-dark-light p-6 rounded-lg border border-primary/10">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">
                  Higher Secondary (XII) - Computer Science
                </h3>
                <span className="text-primary-light text-sm">2021 - 2023</span>
              </div>
              <p className="text-primary mb-2">
                Adaikala Annai Higher Secondary School, Viriyur{" "}
              </p>
              <div className="flex items-center gap-4 mb-2">
                <span className="text-white/80">Grade: 75%</span>
                <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">
                  Computer Science
                </span>
              </div>
              <p className="text-white/80">
                Focused on Computer Science fundamentals, programming basics,
                and mathematics
              </p>
            </div>
          </div>

          <div className="relative pl-8">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-primary/20"></div>
            <div className="absolute left-0 top-1 w-2 h-2 rounded-full bg-primary"></div>

            <div className="bg-dark-light p-6 rounded-lg border border-primary/10">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">
                  Secondary (X) - SSLC
                </h3>
                <span className="text-primary-light text-sm">2020 - 2021</span>
              </div>
              <p className="text-primary mb-2">
                Government High School, Palayanur
              </p>
              <div className="flex items-center gap-4 mb-2">
                {/* <span className="text-white/80">All Pass</span> */}
                <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">
                  Mathematics, Science & Social Science
                </span>
              </div>
              <p className="text-white/80">
                Strong foundation in Science, Mathematics, and English
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
