import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { SiGoogle, SiMeta, SiAmazon } from "react-icons/si";

const experiences = [
  {
    company: "Google",
    role: "Senior Software Engineer",
    period: "2020 - Present",
    description: "Led development of cloud-based solutions and internal tools",
    icon: SiGoogle
  },
  {
    company: "Meta",
    role: "Software Engineer",
    period: "2018 - 2020",
    description: "Worked on scalable web applications and developer tools",
    icon: SiMeta
  },
  {
    company: "Amazon",
    role: "Junior Developer",
    period: "2016 - 2018",
    description: "Developed and maintained e-commerce platforms",
    icon: SiAmazon
  }
];

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="section-heading">Experience</h2>

        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-black/40 backdrop-blur-md border-white/10 hover:bg-black/50 transition-colors">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="p-3 bg-[#3498DB]/20 rounded-lg">
                    <exp.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white glow-text">
                      {exp.role}
                    </h3>
                    <p className="text-[#3498DB] font-medium">{exp.company}</p>
                    <p className="text-sm text-white/60 mt-1">{exp.period}</p>
                    <p className="text-white/80 mt-2">{exp.description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}