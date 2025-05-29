
import { Code, Layers, Server } from "lucide-react";

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend",
      icon: Layers,
      skills: [
        {
          name: "React",
          description: "4+ years of experience building complex web applications with React. Proficient in hooks, context, and modern React patterns. Built multiple production applications serving thousands of users."
        },
        {
          name: "JavaScript/TypeScript",
          description: "Strong foundation in modern JavaScript (ES6+) and TypeScript. Experience with async programming, advanced concepts, and building scalable applications with type safety."
        },
        {
          name: "HTML/CSS",
          description: "Solid understanding of semantic HTML and modern CSS. Experienced with Flexbox, Grid, animations, and responsive design principles. Comfortable with CSS preprocessors and frameworks."
        }
      ]
    },
    {
      title: "Backend",
      icon: Server,
      skills: [
        {
          name: "Node.js",
          description: "Experience building RESTful APIs and server-side applications. Comfortable with npm ecosystem, middleware patterns, and asynchronous programming in Node.js environment."
        },
        {
          name: "Express",
          description: "Built several web applications using Express.js framework. Understanding of routing, middleware, error handling, and API development best practices."
        },
        {
          name: "MongoDB",
          description: "Working knowledge of NoSQL databases with MongoDB. Experience with data modeling, aggregation pipelines, and database optimization for web applications."
        }
      ]
    },
    {
      title: "Tools & Others",
      icon: Code,
      skills: [
        {
          name: "Git/GitHub",
          description: "Proficient in version control with Git. Experienced with collaborative workflows, branching strategies, pull requests, and maintaining clean commit history."
        },
        {
          name: "Docker",
          description: "Basic understanding of containerization with Docker. Experience with creating Dockerfiles, managing containers, and deploying applications in containerized environments."
        },
        {
          name: "AWS",
          description: "Foundational knowledge of cloud services with AWS. Familiar with EC2, S3, and basic cloud architecture patterns. Currently expanding knowledge through hands-on projects."
        }
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 px-4 bg-dark-light">
      <div className="container mx-auto">
        <div className="flex items-center gap-2 mb-12">
          <Code className="w-5 h-5 text-primary" />
          <h2 className="text-3xl font-bold text-white">Skills & Experience</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="p-8 bg-dark rounded-xl border border-primary/10">
              <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-6">
                <category.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-white mb-6">{category.title}</h3>
              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <h4 className="text-white font-semibold mb-2">{skill.name}</h4>
                    <p className="text-white/70 text-sm leading-relaxed">{skill.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
