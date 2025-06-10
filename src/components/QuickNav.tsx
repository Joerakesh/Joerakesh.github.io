
import { useState } from "react";
import { Menu, X, User, Briefcase, Award, GraduationCap, Mail, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

const QuickNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { icon: User, label: "About", href: "#about" },
    { icon: Briefcase, label: "Projects", href: "#projects" },
    { icon: Award, label: "Certifications", href: "#certifications" },
    { icon: GraduationCap, label: "Education", href: "#education" },
    { icon: Trophy, label: "Achievements", href: "#achievements" },
    { icon: Mail, label: "Contact", href: "#contact" },
  ];

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
      <div className={`transition-all duration-300 ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"}`}>
        <div className="bg-dark-light/90 backdrop-blur-sm border border-primary/20 rounded-xl p-2 mb-4 shadow-lg">
          {navItems.map((item, index) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.href)}
              className="flex items-center gap-3 w-full p-3 text-white/70 hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200 group"
              style={{ animationDelay: `${index * 0.1}s` }}
              aria-label={`Navigate to ${item.label} section`}
            >
              <item.icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
      
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="sm"
        className="bg-primary hover:bg-primary/90 shadow-lg w-12 h-12 rounded-full p-0 transition-all duration-300 hover:scale-110"
        aria-label="Toggle quick navigation"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>
    </div>
  );
};

export default QuickNav;
