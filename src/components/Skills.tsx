import { Code, Layers, Server } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const Skills = () => {
  return (
    <section id="skills" className="py-20 px-4 bg-dark-light">
      <div className="container mx-auto">
        <div className="flex items-center gap-2 mb-12">
          <Code className="w-5 h-5 text-primary" />
          <h2 className="text-3xl font-bold text-white">Skills</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12">
          {/* Frontend */}
          <div className="p-8 bg-dark rounded-xl border border-primary/10">
            <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-6">
              <Layers className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Frontend</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-white/80">React</span>
                  <span className="text-primary">95%</span>
                </div>
                <Progress value={95} className="h-2 bg-dark-light" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-white/80">JavaScript/TypeScript</span>
                  <span className="text-primary">90%</span>
                </div>
                <Progress value={90} className="h-2 bg-dark-light" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-white/80">HTML/CSS</span>
                  <span className="text-primary">85%</span>
                </div>
                <Progress value={85} className="h-2 bg-dark-light" />
              </div>
            </div>
          </div>
          
          {/* Backend */}
          <div className="p-8 bg-dark rounded-xl border border-primary/10">
            <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-6">
              <Server className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Backend</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-white/80">Node.js</span>
                  <span className="text-primary">85%</span>
                </div>
                <Progress value={85} className="h-2 bg-dark-light" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-white/80">Express</span>
                  <span className="text-primary">80%</span>
                </div>
                <Progress value={80} className="h-2 bg-dark-light" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-white/80">MongoDB</span>
                  <span className="text-primary">75%</span>
                </div>
                <Progress value={75} className="h-2 bg-dark-light" />
              </div>
            </div>
          </div>
          
          {/* Other */}
          <div className="p-8 bg-dark rounded-xl border border-primary/10">
            <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-6">
              <Code className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Tools & Others</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-white/80">Git/GitHub</span>
                  <span className="text-primary">90%</span>
                </div>
                <Progress value={90} className="h-2 bg-dark-light" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-white/80">Docker</span>
                  <span className="text-primary">70%</span>
                </div>
                <Progress value={70} className="h-2 bg-dark-light" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-white/80">AWS</span>
                  <span className="text-primary">65%</span>
                </div>
                <Progress value={65} className="h-2 bg-dark-light" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
