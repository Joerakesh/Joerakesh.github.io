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
  Github,
} from "lucide-react";
import Chatbot from "@/components/Chatbot";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const journeyData = [
    // {
    //   year: "Feb 2025 - Present",
    //   title: "Full Stack Engineer",
    //   company: "Catalyst by Zoho",
    //   description:
    //     "Currently working on scalable frontend banking services with multiple framework support. Contributing to developing SOEs, testing framework adapters, plugins, and developer tools.",
    //   icon: Briefcase,
    // },
    {
      year: "Jun 2023 - Present",
      title: "Bachelor's Degree Completed",
      company: "St. Joseph's College",
      description:
        "Graduated with a Bachelor's degree in Computer Science and Engineering, building a strong foundation for my career.",
      icon: GraduationCap,
    },
    {
      year: "Mar 2022",
      title: "Project Trainee",
      company: "Zoho Corporation",
      description:
        "Gained hands-on experience working on real-world projects and learning industry best practices in a professional environment.",
      icon: Code,
    },
    {
      year: "Jul 2021",
      title: "Web Development Intern",
      company: "Grids and Guides",
      description:
        "Started my professional journey by working on web development projects and learning the fundamentals of software development.",
      icon: Briefcase,
    },
    {
      year: "Jan 2020",
      title: "Started Freelancing",
      company: "Self-Employed",
      description:
        "Began taking on freelance projects to gain experience and fund my education. Used earnings to upgrade my laptop (Honor MagicBook, AMD Ryzen 5, 8GB, 256GB SSD).",
      icon: Code,
    },
    {
      year: "Aug 2018",
      title: "College Studies",
      company: "St. Joseph's College",
      description:
        "Began formal education in Computer Science and Engineering, laying the foundation for my career in technology.",
      icon: GraduationCap,
    },
    {
      year: "~ 2016",
      title: "First Line of Code",
      company: "Self-Learning",
      description:
        "Wrote my first line of code during higher secondary school years, sparking my passion for programming and technology.",
      icon: Code,
    },
  ];

  const skills = [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "MongoDB",
    "Express",
    "HTML/CSS",
    "Git/GitHub",
    "Docker",
    "AWS",
    "Next.js",
    "Firebase",
    "Java",
    "Spring Boot",
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
          <p className="text-xl text-primary mb-12">
            I'm a passionate full-stack developer who loves creating elegant
            solutions to complex problems. Here's my journey and what drives me
            in the world of technology.
          </p>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Who I Am
              </h2>
              <p className="text-lg text-foreground/80 mb-6">
                I'm Joe Rakesh, a self-driven and career-oriented developer
                passionate about crafting high-quality, scalable web
                applications. I specialize in front-end development, building
                responsive websites and web interfaces.
              </p>
              <p className="text-lg text-foreground/80 mb-6">
                I primarily work with technologies like React.js, TypeScript,
                Java, Spring Boot and so on. I love coding in my free time and
                constantly seek opportunities to enhance my skills, which
                allowed me to work on new projects with like-minded people.
              </p>

              {/* <h3 className="text-xl font-bold text-foreground mb-4">Current Work</h3>
              <p className="text-lg text-foreground/80 mb-6">
                I'm currently architecting a scalable frontend banking service with support for 
                multiple frameworks on the Catalyst talent platform. Apart from that, I contribute 
                to developing SOEs, testing framework adapters, plugins, and developer tools.
              </p> */}
            </div>
            <div>
              <img
                src="/Joe.jpg"
                alt="Joe Rakesh"
                className="rounded-lg shadow-lg w-full max-w-md mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-card">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-8">My Skills</h2>
          <p className="text-lg text-foreground/80 mb-6">
            Technologies I have worked with and I am familiar with:
          </p>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-primary/10 text-primary rounded-full border border-primary/20 hover:bg-primary/20 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="mt-8 p-6 bg-background rounded-lg border border-primary/10">
            <div className="flex items-center gap-2 mb-4">
              <Github className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-bold text-foreground">
                GitHub Stats
              </h3>
            </div>
            <p className="text-foreground/80">
              I believe in open source contribution as it is a great way to
              learn and contribute to the community. Check out more on my GitHub
              profile for detailed statistics and contributions.
            </p>
          </div>
        </div>
      </section>

      {/* <section className="py-16 px-4 bg-dark">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">My Journey</h2>
          <p className="text-white/80 mb-12 text-lg">
            Embracing my own journey, I strive to avoid comparisons and focus on
            taking small, meaningful steps every day.
          </p>
          <div className="relative">
            <div className="absolute left-1/2 top-0 h-full w-[2px] bg-primary/20 transform -translate-x-1/2"></div>
            <div className="space-y-12">
              {journeyData.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-1/2 text-right pr-8">
                    <h3 className="text-xl font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="text-primary mb-2">{item.company}</p>
                    <p className="text-white/70">{item.description}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center z-10 border-2 border-primary/30">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="w-1/2 text-left pl-8">
                    <p className="text-primary-light text-sm font-medium">
                      {item.year}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section> */}

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
