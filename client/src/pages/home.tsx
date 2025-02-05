import { motion } from "framer-motion";
import Navbar from "@/components/navbar";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Projects from "@/components/sections/projects";
import Experience from "@/components/sections/experience";
import Contact from "@/components/sections/contact";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#ECF0F1]">
      <Navbar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-16 space-y-32"
      >
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Contact />
      </motion.main>
    </div>
  );
}
