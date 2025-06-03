import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  MapPin,
  Code,
  Briefcase,
  GraduationCap,
  Target,
  Heart,
} from "lucide-react";
import Chatbot from "@/components/Chatbot";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const journeyData = [
    {
      year: "2024 - Current",
      title: "Full Stack Web Developer",
      company: "Freelance",
      description:
        "Currently freelancing as a full stack web developer, building web applications and providing web solutions for clients.",
      icon: Briefcase,
    },
    {
      year: "2023 - Current",
      title: "Bachelor of Computer Applications",
      company: "St. Joseph's College",
      description:
        "Pursuing a Bachelor's degree in Computer Applications, focusing on web development and programming.",
      icon: GraduationCap,
    },
    {
      year: "2022",
      title: "Web Development Intern",
      company: "Edubridge India",
      description:
        "Worked as a web development intern, learning the basics of web development and building simple web applications.",
      icon: Code,
    },
    {
      year: "2006",
      title: "Born",
      company: "Tamil Nadu",
      description:
        "Born and raised in Tamil Nadu, India. Interested in technology and web development from a young age.",
      icon: MapPin,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="py-8 px-4">
        <div className="container mx-auto">
          <Link
            to="/"
            className="inline-flex items-center text-lg text-primary"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Home
          </Link>
        </div>
      </header>

      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-8">About Me</h1>
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <p className="text-lg text-foreground/80 mb-6">
                I am a passionate and creative Full Stack Web Developer with a
                strong foundation in building responsive and user-friendly web
                applications. My journey in web development started with a
                fascination for technology and a desire to create meaningful
                digital experiences.
              </p>
              <p className="text-lg text-foreground/80 mb-6">
                I am currently pursuing a Bachelor of Computer Applications at
                St. Joseph's College, Trichy, where I am honing my skills in web
                development and programming. I am also freelancing as a full
                stack web developer, building web applications and providing web
                solutions for clients.
              </p>
              <p className="text-lg text-foreground/80">
                I am always eager to learn new technologies and techniques to
                stay at the forefront of web development. I am committed to
                delivering high-quality web applications that meet the needs of
                my clients and users.
              </p>
            </div>
            <div>
              <img
                src="/about-image.jpg"
                alt="About Me"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-dark">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">My Journey</h2>
          <div className="relative">
            <div className="absolute left-1/2 top-0 h-full w-[2px] bg-primary/20 transform -translate-x-1/2"></div>
            <div className="space-y-12">
              {journeyData.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-1/2 text-right pr-4">
                    <h3 className="text-xl font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="text-primary mb-2">{item.company}</p>
                    <p className="text-white/70">{item.description}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center z-10">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="w-1/2 text-left pl-4">
                    <p className="text-primary-light text-sm">{item.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-8">My Goals</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="p-6 bg-card rounded-lg shadow-md border border-primary/10 hover:neon-box transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                Professional Growth
              </h3>
              <p className="text-foreground/80">
                Continuously enhance my skills and knowledge in web development
                to stay updated with the latest technologies and trends.
              </p>
            </div>
            <div className="p-6 bg-card rounded-lg shadow-md border border-primary/10 hover:neon-box transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                Meaningful Impact
              </h3>
              <p className="text-foreground/80">
                Contribute to projects that have a positive impact on society
                and improve people's lives through innovative web solutions.
              </p>
            </div>
            <div className="p-6 bg-card rounded-lg shadow-md border border-primary/10 hover:neon-box transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                Technical Excellence
              </h3>
              <p className="text-foreground/80">
                Master advanced web development techniques and frameworks to
                build scalable, efficient, and maintainable web applications.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Chatbot />
    </div>
  );
};

export default About;
