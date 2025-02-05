import { motion } from "framer-motion";
import Navbar from "@/components/navbar";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Projects from "@/components/sections/projects";
import Experience from "@/components/sections/experience";
import Stats from "@/components/sections/stats";
import Contact from "@/components/sections/contact";

const BackgroundAnimation = () => (
  <div className="fixed inset-0 -z-10">
    <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] opacity-80" />
    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgTCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9IiMzNDk4ZGIiIHN0cm9rZS13aWR0aD0iMSIgb3BhY2l0eT0iMC4yIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')]" />
    <div className="absolute inset-0 animate-pulse bg-gradient-to-t from-transparent via-[#3498db10] to-transparent" />
  </div>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-transparent text-white">
      <BackgroundAnimation />
      <Navbar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 py-16 space-y-32 relative"
      >
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Stats />
        <Contact />
      </motion.main>
    </div>
  );
}