import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <section id="about" className="scroll-mt-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-[#2C3E50] mb-8">About Me</h2>
        
        <Card>
          <CardContent className="p-6">
            <p className="text-lg text-[#34495E] leading-relaxed">
              I'm a full-stack developer with 5+ years of experience building web applications.
              My passion lies in creating intuitive user interfaces and scalable backend systems.
              I specialize in modern JavaScript frameworks and have a strong foundation in cloud technologies.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div>
                <h3 className="font-semibold text-[#2C3E50] mb-2">Frontend</h3>
                <p className="text-[#34495E]">React, Vue, Angular</p>
              </div>
              <div>
                <h3 className="font-semibold text-[#2C3E50] mb-2">Backend</h3>
                <p className="text-[#34495E]">Node.js, Python, Go</p>
              </div>
              <div>
                <h3 className="font-semibold text-[#2C3E50] mb-2">Database</h3>
                <p className="text-[#34495E]">PostgreSQL, MongoDB</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}
