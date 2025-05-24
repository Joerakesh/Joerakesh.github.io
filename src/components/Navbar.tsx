
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ContactForm from "./ContactForm";
import { Menu, X, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLightTheme, setIsLightTheme] = useState(false);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);

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

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 px-0 ${
        scrolled ? "py-3 glass-nav" : "py-5"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-primary neon-text">
          Joe Rakesh A
        </Link>

        <nav className="hidden md:block">
          <ul className="flex gap-8">
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
                  className="text-foreground/80 hover:text-primary transition-colors"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-foreground hover:text-primary"
            onClick={toggleTheme}
          >
            {isLightTheme ? <Moon size={20} /> : <Sun size={20} />}
          </Button>

          <Button
            className="hidden md:inline-flex bg-primary hover:bg-primary/90"
            onClick={openContactForm}
          >
            Contact Me
          </Button>

          <button
            className="md:hidden text-foreground relative z-50 transition-all duration-300"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X size={24} className="animate-fade-in" />
            ) : (
              <Menu size={24} className="animate-fade-in" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu with improved blur background and animations */}
      <div
        className={cn(
          "md:hidden fixed inset-0 z-40 transition-all duration-300",
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        aria-hidden={!isOpen}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
        }}
      >
        <div
          className={cn(
            "absolute inset-0 bg-background/60 backdrop-blur-xl transition-opacity duration-300",
            isOpen ? "opacity-100" : "opacity-0"
          )}
          style={{
            backdropFilter: "blur(20px)",
            background: "rgba(26, 31, 44, 0.9)"
          }}
        />

        <div
          className={cn(
            "absolute top-[4.5rem] left-0 w-full bg-card/60 backdrop-blur-xl border-t border-primary/10 transition-all duration-500 overflow-hidden",
            isOpen ? "max-h-[calc(100vh-4.5rem)]" : "max-h-0"
          )}
          style={{
            backdropFilter: "blur(20px)",
            background: "rgba(26, 31, 44, 0.95)"
          }}
        >
          <ul className="container mx-auto space-y-4 px-4 py-4">
            {["Home", "About", "Skills", "Projects", "Education", "Certifications"].map(
              (item, index) => (
                <li
                  key={item}
                  className={cn(
                    "transform transition-all duration-300",
                    isOpen
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0",
                    // Staggered animation delay
                    isOpen && `transition-delay-${index * 75}`
                  )}
                  style={{
                    transitionDelay: isOpen ? `${index * 75}ms` : "0ms",
                  }}
                >
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-foreground/80 hover:text-primary transition-colors block py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {item}
                  </a>
                </li>
              )
            )}
            <li
              className={cn(
                "transform transition-all duration-300",
                isOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0",
                isOpen && "transition-delay-[450ms]"
              )}
              style={{ transitionDelay: isOpen ? "450ms" : "0ms" }}
            >
              <Button
                className="w-full bg-primary hover:bg-primary/90 mt-2"
                onClick={() => {
                  setIsOpen(false);
                  openContactForm();
                }}
              >
                Contact Me
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
