import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ContactForm from "./ContactForm";
import {
  Menu,
  X,
  Sun,
  Moon,
  Download,
  Github,
  Linkedin,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLightTheme, setIsLightTheme] = useState(false);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Check if user has a theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      setIsLightTheme(true);
      document.body.classList.add("light");
    } else {
      document.body.classList.add("dark");
    }

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    if (isLightTheme) {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
      localStorage.setItem("theme", "light");
    }
    setIsLightTheme(!isLightTheme);
  };

  const openContactForm = () => {
    const contactButton = document.getElementById("open-contact-dialog");
    if (contactButton) {
      contactButton.click();
    }
  };

  // Enhanced search with fuzzy matching
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();

      // Define sections with multiple keywords
      const sectionKeywords = {
        home: ["home", "main", "top", "start", "intro", "landing"],
        about: [
          "about",
          "bio",
          "profile",
          "me",
          "myself",
          "person",
          "info",
          "information",
        ],
        skills: [
          "skill",
          "skills",
          "tech",
          "technology",
          "programming",
          "coding",
          "development",
          "abilities",
          "expertise",
        ],
        education: [
          "education",
          "study",
          "school",
          "college",
          "university",
          "degree",
          "academic",
          "learning",
        ],
        projects: [
          "project",
          "projects",
          "work",
          "portfolio",
          "apps",
          "applications",
          "websites",
        ],
        certifications: [
          "certificate",
          "certification",
          "certifications",
          "credential",
          "credentials",
          "award",
          "awards",
        ],
        achievements: [
          "achievement",
          "achievements",
          "accomplish",
          "accomplishments",
          "success",
          "milestone",
        ],
      };

      // Find matching section
      let matchedSection = null;
      let maxMatches = 0;

      for (const [section, keywords] of Object.entries(sectionKeywords)) {
        const matches = keywords.filter(
          (keyword) =>
            keyword.includes(searchLower) ||
            searchLower.includes(keyword) ||
            // Check for partial matches (at least 3 characters)
            (searchLower.length >= 3 &&
              keyword.includes(searchLower.substring(0, 3))) ||
            (keyword.length >= 3 &&
              searchLower.includes(keyword.substring(0, 3)))
        ).length;

        if (matches > maxMatches) {
          maxMatches = matches;
          matchedSection = section;
        }
      }

      // If we found a match, scroll to it
      if (matchedSection && maxMatches > 0) {
        const element = document.getElementById(matchedSection);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          setSearchOpen(false);
          setSearchTerm("");
          setIsOpen(false); // Close mobile menu
        }
      } else {
        // If no match found, show a brief feedback
        console.log("No matching section found for:", searchTerm);
      }
    }
  };

  const downloadResume = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Joe_Rakesh_A_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleNavClick = () => {
    setIsOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        scrolled
          ? "py-2 md:py-3 glass-nav backdrop-blur-md bg-background/80 border-b border-border/50"
          : "py-3 md:py-5 bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-lg md:text-xl font-bold text-primary neon-text hover:scale-105 transition-transform"
        >
          Joe Rakesh A
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:block">
          <ul className="flex gap-6 xl:gap-8">
            {[
              "Home",
              "About",
              "Skills",
              "Education",
              "Projects",
              "Certifications",
              "Achievements",
            ].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="text-foreground/80 hover:text-primary transition-all duration-300 hover:scale-105 relative group text-sm xl:text-base"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-1 lg:gap-2">
          {/* Search */}
          <div className="relative">
            {searchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search sections..."
                  className="w-32 lg:w-40 h-8 text-sm"
                  autoFocus
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchTerm("");
                  }}
                >
                  <X size={16} />
                </Button>
              </form>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-foreground hover:text-primary"
                onClick={() => setSearchOpen(true)}
              >
                <Search size={16} />
              </Button>
            )}
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-foreground hover:text-primary"
              onClick={() =>
                window.open("https://github.com/joerakesh", "_blank")
              }
            >
              <Github size={16} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-foreground hover:text-primary"
              onClick={() =>
                window.open(
                  "https://www.linkedin.com/in/joe-rakesh-27b082286/",
                  "_blank"
                )
              }
            >
              <Linkedin size={16} />
            </Button>
          </div>

          {/* Download Resume */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-foreground hover:text-primary"
            onClick={downloadResume}
            title="Download Resume"
          >
            <Download size={16} />
          </Button>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-foreground hover:text-primary"
            onClick={toggleTheme}
          >
            {isLightTheme ? <Moon size={16} /> : <Sun size={16} />}
          </Button>

          {/* Contact Button */}
          <Button
            className="bg-primary hover:bg-primary/90 h-8 px-3 lg:px-4 text-sm"
            onClick={openContactForm}
          >
            Contact Me
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-foreground relative z-50 transition-all duration-300 p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X size={20} className="animate-fade-in" />
          ) : (
            <Menu size={20} className="animate-fade-in" />
          )}
        </button>
      </div>

      {/* Mobile/Tablet menu overlay */}
      <div
        className={cn(
          "md:hidden fixed inset-0 z-40 transition-all duration-300",
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        aria-hidden={!isOpen}
      >
        {/* Backdrop */}
        <div
          className={cn(
            "absolute inset-0 bg-background/95 backdrop-blur-xl transition-opacity duration-300",
            isOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setIsOpen(false)}
        />

        {/* Menu content */}
        <div
          className={cn(
            "absolute top-[4rem] left-0 w-full bg-card/95 backdrop-blur-xl border-t border-primary/10 transition-all duration-500 overflow-hidden shadow-lg",
            isOpen ? "max-h-[calc(100vh-4rem)]" : "max-h-0"
          )}
        >
          <div className="container mx-auto px-4 py-6 space-y-6 overflow-y-auto max-h-[calc(100vh-8rem)]">
            {/* Search in mobile */}
            <div>
              <form onSubmit={handleSearch} className="flex gap-2">
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search sections..."
                  className="flex-1"
                />
                <Button type="submit" size="sm">
                  <Search size={16} />
                </Button>
              </form>
            </div>

            {/* Navigation Links */}
            <nav>
              <ul className="space-y-4">
                {[
                  "Home",
                  "About",
                  "Skills",
                  "Projects",
                  "Education",
                  "Certifications",
                  "Achievements",
                ].map((item, index) => (
                  <li
                    key={item}
                    className={cn(
                      "transform transition-all duration-300",
                      isOpen
                        ? "translate-y-0 opacity-100"
                        : "translate-y-4 opacity-0"
                    )}
                    style={{
                      transitionDelay: isOpen ? `${index * 75}ms` : "0ms",
                    }}
                  >
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="text-foreground/80 hover:text-primary transition-colors block py-2 text-lg font-medium"
                      onClick={handleNavClick}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Mobile Actions */}
            <div className="pt-4 border-t border-primary/10 space-y-4">
              {/* Action buttons */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    downloadResume();
                    setIsOpen(false);
                  }}
                  className="flex-1"
                >
                  <Download size={16} className="mr-2" />
                  Resume
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    toggleTheme();
                    setIsOpen(false);
                  }}
                  className="flex-1"
                >
                  {isLightTheme ? (
                    <Moon size={16} className="mr-2" />
                  ) : (
                    <Sun size={16} className="mr-2" />
                  )}
                  Theme
                </Button>
              </div>

              {/* Social links */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    window.open(
                      "https://github.com/joerakeshdeveloper",
                      "_blank"
                    );
                    setIsOpen(false);
                  }}
                  className="flex-1"
                >
                  <Github size={16} className="mr-2" />
                  GitHub
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    window.open(
                      "https://linkedin.com/in/joe-rakesh-a",
                      "_blank"
                    );
                    setIsOpen(false);
                  }}
                  className="flex-1"
                >
                  <Linkedin size={16} className="mr-2" />
                  LinkedIn
                </Button>
              </div>

              {/* Contact button */}
              <Button
                className="w-full bg-primary hover:bg-primary/90"
                onClick={() => {
                  setIsOpen(false);
                  openContactForm();
                }}
              >
                Contact Me
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
