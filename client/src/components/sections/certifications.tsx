import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award } from "lucide-react";

const certifications = [
  {
    title: "The Complete Web Developement BootCamp",
    issuer: "Udemy",
    date: "2023",
    skills: ["Nodejs", "Reactjs", "APIs" , "GraphQl"],
  },
  {
    title : "Machine Learning",
    issuer : "Stanford Online - Coursera",
    date : "2023",
    skills : ["Regression" , "Neural Networks" , "Scikit-learn" , "Deep Learning"],
  }
];

export default function Certifications() {
  return (
    <section id="certifications" className="scroll-mt-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="section-heading">Certifications</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-black/40 backdrop-blur-md border-white/10 h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Award className="h-6 w-6 text-[#3498DB]" />
                    <h3 className="text-xl font-semibold text-white glow-text">
                      {cert.title}
                    </h3>
                  </div>
                  <p className="text-[#3498DB] font-medium mb-2">{cert.issuer}</p>
                  <p className="text-white/60 text-sm mb-4">{cert.date}</p>
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="bg-white/10 hover:bg-white/20 text-white"
                      >
                        {skill}
                      </Badge>
                    ))}
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
