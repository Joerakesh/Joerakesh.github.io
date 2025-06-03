import {
  ArrowLeft,
  User,
  Code,
  Briefcase,
  GraduationCap,
  Award,
  Target,
  Heart,
  Laptop,
  CheckCircle,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";

const About = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const skills = [
    "HTML/CSS",
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "MongoDB",
    "Express",
    "Git/GitHub",
    "Next.js",
    "Firebase",
  ];

  const journey = [
    {
      year: "2025",
      title: "Founded Joe Web Services (JWS)",
      badge: "Present",
      subtitle: "Started my own freelancing web development company",
      description:
        "Launched JWS to offer professional web development services, turning passion into entrepreneurship.",
      icon: "🚀",
      completed: false,
    },
    {
      year: "2024",
      title: "Started building real-world projects",
      subtitle: "With Acer Aspire 7 A715-79G",
      description:
        "Began working on multiple web development projects after getting my new laptop.",
      icon: "💻",
      device: "Acer Aspire 7 A715-79G",
      completed: true,
    },
    {
      year: "Late 2023",
      title: "Laptop broke down",
      subtitle: "Motherboard failure on HP ProBook 400 G4",
      description:
        "Despite the setback, continued learning through LinkedIn Learning and other platforms.",
      icon: "⚠️",
      device: "HP ProBook 400 G4 (Second-hand)",
      completed: true,
    },
    {
      year: "2023",
      title: "Started BCA @St. Joseph’s College",
      subtitle: "",
      description:
        "Began my Bachelor's in Computer Applications and enhanced my web development skills. Bought my first second-hand laptop, HP ProBook 400 G4.",
      icon: "🎓",
      device: "HP ProBook 400 G4 (Second-hand)",
      completed: true,
    },
    {
      year: "2022",
      title: "Explored Programming",
      subtitle: "During 12th Grade",
      description:
        "Learned the basics of Python and C++ while balancing academics.",
      icon: "📘",
      completed: true,
    },
    {
      year: "2021",
      title: "Learned Programming Basics",
      subtitle: "During 11th Grade",
      description:
        "Took a deeper dive into C++ and Python to understand core concepts.",
      icon: "💡",
      completed: true,
    },
    {
      year: "2018",
      title: "Explored HTML Templates",
      subtitle: "During the COVID-19 pandemic",
      description:
        "Downloaded and explored pre-built websites from FreeCSS using my father's laptop, learning structure and styling.",
      icon: "🌐",
      device: "Dell Inspiron 3000 (Father's Laptop)",
      completed: true,
    },
    {
      year: "2014",
      title: "Introduced to Web Development",
      subtitle: "Thanks to my uncle, Adrian",
      description:
        "In 4th grade, my uncle introduced me to basic HTML on my father's desktop computer, sparking my lifelong interest in the web.",
      icon: "👨‍🏫",
      device: "Intel Pentium Desktop, 2GB RAM (Father's Computer)",
      completed: true,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-primary/10 bg-background/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <Link to="/">
            <Button
              variant="ghost"
              className="text-foreground hover:text-primary"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-16 max-w-5xl mx-auto">
          {/* Text content */}
          <div className="text-center md:text-left md:flex-1">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <User className="w-6 h-6 text-primary" />
              <h1 className="text-4xl font-bold text-foreground">About Me</h1>
            </div>
            <p className="text-xl text-foreground/70 leading-relaxed max-w-xl mx-auto md:mx-0">
              I'm a passionate full-stack developer who loves creating elegant
              solutions to complex problems. Here's my journey and what drives
              me in the world of technology.
            </p>
          </div>

          {/* Image */}
          <img
            src="/Joe.jpg"
            alt="Joe Rakesh"
            className="w-48 h-48 rounded-lg object-cover"
          />
        </div>

        {/* Introduction */}
        <Card className="mb-12 border-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Heart className="w-5 h-5 text-primary" />
              Who I Am
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-foreground/80">
            <p>
              I'm Joe Rakesh, a passionate web developer with a strong
              foundation in front-end and back-end technologies. I enjoy
              building scalable and responsive web applications.
            </p>
            <p>
              I mainly work with HTML, CSS, JavaScript, and frameworks like
              React.js. I am also learning Python, and exploring full-stack
              development.
            </p>
            <p>
              I started my coding journey early with the support of my family
              and mentors, and now I run my own freelancing company called Joe
              Web Services (JWS).
            </p>
          </CardContent>
        </Card>

        {/* Current Work */}
        <Card className="mb-12 border-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Briefcase className="w-5 h-5 text-primary" />
              Current Work
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-foreground/80">
            <p>
              I’m currently running my own freelancing web development company,
              Joe Web Services (JWS), building custom websites and web
              applications for clients.
            </p>
            <p>
              I focus on delivering scalable and responsive web solutions using
              modern technologies like React.js, Next.js, HTML/CSS and
              JavaScript.
            </p>
            <p>
              Alongside client projects, I continuously improve my skills by
              learning new frameworks and development tools to provide the best
              service possible.
            </p>
          </CardContent>
        </Card>

        {/* My Skills */}
        <Card className="mb-12 border-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Code className="w-5 h-5 text-primary" />
              My Skills
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground/80 mb-6">
              Technologies I have worked with and I am familiar with:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="px-4 py-2 bg-primary/10 text-primary rounded-lg text-center font-medium hover:bg-primary/20 transition-colors"
                >
                  {skill}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* GitHub Stats */}
        {/* <Card className="mb-12 border-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Target className="w-5 h-5 text-primary" />
              GitHub Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground/80 mb-4">
              I believe in open source contribution as it is a great way to
              learn and contribute to the community.
            </p>
            <div className="text-sm text-foreground/60">
              Check out more on my GitHub profile for detailed statistics and
              contributions.
            </div>
          </CardContent>
        </Card> */}

        {/* My Journey */}
        <Card className="border-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <GraduationCap className="w-5 h-5 text-primary" />
              My Journey
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground/80 mb-8">
              Embracing my own journey, I strive to avoid comparisons and focus
              on taking small, meaningful steps every day.
            </p>

            {/* Timeline */}
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border"></div>

              <div className="space-y-8">
                {journey.map((item, index) => (
                  <div key={index} className="relative flex items-start gap-6">
                    {/* Timeline dot */}
                    <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-background border-2 border-primary/20">
                      {item.completed ? (
                        <CheckCircle className="w-6 h-6 text-primary" />
                      ) : (
                        <div className="w-3 h-3 rounded-full bg-primary animate-pulse"></div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="bg-card border border-primary/10 rounded-lg p-6 hover:border-primary/20 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold text-foreground">
                              {item.title}
                            </h3>
                            {item.badge && (
                              <span className="px-2 py-1 text-xs font-medium bg-primary text-white rounded">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <span className="text-sm text-primary font-medium">
                            {item.year}
                          </span>
                        </div>

                        {item.subtitle && (
                          <p className="text-sm text-foreground/70 mb-2 flex items-center gap-1">
                            <span className="text-lg">{item.icon}</span>
                            {item.subtitle}
                          </p>
                        )}

                        <p className="text-sm text-foreground/80 mb-3">
                          {item.description}
                        </p>

                        {item.device && (
                          <div className="flex items-center gap-2 text-xs text-foreground/60">
                            <Laptop className="w-3 h-3" />
                            {item.device}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
