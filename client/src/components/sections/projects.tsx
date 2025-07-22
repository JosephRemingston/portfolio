import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "Serverless Media Processing Platform",
    description: "A cloud-native, serverless media processing platform that allows users to seamlessly upload, process, and manage images with real-time AI analysis.",
    image: "https://serverjoseph.s3.ap-southeast-1.amazonaws.com/ChatGPT+Image+Jul+22%2C+2025%2C+02_10_18+PM.png",
    github: "https://github.com/JosephRemingston/serverless-image-processing",
    demo: "https://serverless-image-processing-fronten.vercel.app/"
  },
  {
    title: "Project Management Tool",
    description: "Collaborative project management application with real-time updates",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
    github: "https://github.com",
    demo: "https://demo.com"
  },
  {
    title: "Social Media Dashboard",
    description: "Analytics dashboard for social media management",
    image: "https://images.unsplash.com/photo-1510759395231-72b17d622279",
    github: "https://github.com",
    demo: "https://demo.com"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-white mb-8 glow-text">Projects</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-black/40 backdrop-blur-md border-white/10 overflow-hidden group">
                <motion.div className="relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full object-contain max-h-80 transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </motion.div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-white glow-text mb-2">
                    {project.title}
                  </h3>
                  <p className="text-white/80">{project.description}</p>
                </CardContent>
                <CardFooter className="p-6 pt-0 flex gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(project.github)}
                    className="border-white/20 hover:bg-white/10"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    Code
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => window.open(project.demo)}
                    className="bg-[#3498DB] hover:bg-[#2980B9]"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Demo
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}