import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "E-commerce Platform",
    description: "A full-stack e-commerce solution with real-time inventory management",
    image: "https://images.unsplash.com/photo-1508873535684-277a3cbcc4e8",
    github: "https://github.com",
    demo: "https://demo.com"
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
        <h2 className="text-3xl font-bold text-[#2C3E50] mb-8">Projects</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-[#2C3E50] mb-2">
                    {project.title}
                  </h3>
                  <p className="text-[#34495E]">{project.description}</p>
                </CardContent>
                <CardFooter className="p-6 pt-0 flex gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(project.github)}
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
