import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  const skills = [
    {
      category: "Web3 Development",
      items: ["Ethereum", "Solidity", "Hardhat", "Smart Contracts", "Ethers.js", "Web3.js"]
    },
    {
      category: "Backend Development",
      items: ["Node.js", "Express.js", "Python", "Flask", "Django", "REST APIs", "GraphQL"]
    },
    {
      category: "Database & DevOps",
      items: ["PostgreSQL", "MongoDB", "MySQL", "Docker", "AWS", "Git"]
    }
  ];

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
            <p className="text-lg text-[#34495E] leading-relaxed mb-8">
              With a strong foundation in blockchain technologies, I'm committed to exploring the endless possibilities of Web3. 
              My projects often involve integrating crypto wallets, tokenizing assets, and creating secure, transparent systems 
              that redefine how users interact with technology. Beyond Web3, I excel in traditional backend development, 
              designing APIs, server-side architectures, and database solutions to power dynamic, data-driven applications.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mt-8">
              {skills.map((skillSet) => (
                <div key={skillSet.category}>
                  <h3 className="font-semibold text-[#2C3E50] mb-2">{skillSet.category}</h3>
                  <p className="text-[#34495E]">{skillSet.items.join(", ")}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t">
              <h3 className="font-semibold text-[#2C3E50] mb-2">Education</h3>
              <p className="text-[#34495E]">
                BTech in Computer Science and Engineering<br />
                VIT-AP University, Amaravati, Andhra Pradesh
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}