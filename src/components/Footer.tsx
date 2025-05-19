import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-16 px-4 border-t border-primary/10 bg-dark">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
              Joe Rakesh A
            </h3>
            <p className="text-neutral-light max-w-xs">
              Building digital experiences with modern web technologies.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            <div>
              <h4 className="font-medium mb-4 text-primary">Links</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#hero"
                    className="text-neutral hover:text-primary transition-colors inline-flex items-center gap-1"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="text-neutral hover:text-primary transition-colors inline-flex items-center gap-1"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#skills"
                    className="text-neutral hover:text-primary transition-colors inline-flex items-center gap-1"
                  >
                    Skills
                  </a>
                </li>
                <li>
                  <a
                    href="#projects"
                    className="text-neutral hover:text-primary transition-colors inline-flex items-center gap-1"
                  >
                    Projects
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-4 text-primary">Contact</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="mailto:joe.rakesh@example.com"
                    className="text-neutral hover:text-primary transition-colors inline-flex items-center gap-2"
                  >
                    <Mail size={16} />
                    <span>Email</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/joerakesh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral hover:text-primary transition-colors inline-flex items-center gap-2"
                  >
                    <Github size={16} />
                    <span>GitHub</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/joe-rakesh-27b082286/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral hover:text-primary transition-colors inline-flex items-center gap-2"
                  >
                    <Linkedin size={16} />
                    <span>LinkedIn</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-primary/10 mt-12 pt-8 text-center text-neutral">
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
            <p>&copy; {currentYear} Joe Rakesh A. All rights reserved.</p>
            <div className="flex items-center gap-1"></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
