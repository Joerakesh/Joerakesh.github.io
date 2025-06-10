
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutMe from "@/components/AboutMe";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import Achievements from "@/components/Achievements";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import Chatbot from "@/components/Chatbot";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollIndicator from "@/components/ScrollIndicator";
import { Toaster } from "@/components/ui/toaster";

const Index = () => {
  return (
    <main className="min-h-screen">
      <ScrollIndicator />
      <Navbar />
      <Hero />
      <AboutMe />
      <Skills />
      <Education />
      <Projects />
      <Certifications />
      <Achievements />
      <Footer />
      <ContactForm />
      <Chatbot />
      <ScrollToTop />
      <Toaster />
    </main>
  );
};

export default Index;
