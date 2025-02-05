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
        <h2 className="text-3xl font-bold text-[#2C3E50] mb-8">Experience</h2>

        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="p-3 bg-[#ECF0F1] rounded-lg">
                    <exp.icon className="h-6 w-6 text-[#2C3E50]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#2C3E50]">
                      {exp.role}
                    </h3>
                    <p className="text-[#3498DB] font-medium">{exp.company}</p>
                    <p className="text-sm text-[#34495E] mt-1">{exp.period}</p>
                    <p className="text-[#34495E] mt-2">{exp.description}</p>
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