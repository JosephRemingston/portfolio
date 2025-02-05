import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-[#2C3E50] mb-4">
            Hi, I'm Joseph Remingston
          </h1>
          <p className="text-xl text-[#34495E] mb-8">
            A dedicated Web3 and Backend Developer with a passion for crafting innovative and impactful digital solutions, specializing in blockchain technology and full-stack systems.
          </p>
          <Button
            onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-[#3498DB] hover:bg-[#2980B9] text-white"
          >
            Learn More <ArrowDown className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative aspect-square"
        >
          <img
            src="https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa"
            alt="Profile"
            className="rounded-full object-cover shadow-xl"
          />
        </motion.div>
      </div>
    </section>
  );
}