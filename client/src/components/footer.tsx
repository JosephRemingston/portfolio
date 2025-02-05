import { motion } from "framer-motion";
import { SiGithub, SiLinkedin, SiInstagram } from "react-icons/si";

export default function Footer() {
  const socials = [
    {
      name: "GitHub",
      icon: SiGithub,
      href: "https://github.com/JosephRemingston",
    },
    {
      name: "LinkedIn",
      icon: SiLinkedin,
      href: "https://linkedin.com/in/joseph-remingston", // Update with actual LinkedIn URL
    },
    {
      name: "Instagram",
      icon: SiInstagram,
      href: "https://instagram.com/joseph.remingston", // Update with actual Instagram URL
    },
  ];

  return (
    <footer className="py-8 mt-32 border-t border-white/10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center space-y-4"
        >
          <div className="flex items-center space-x-6">
            {socials.map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-white/80 hover:text-[#3498DB] transition-colors"
              >
                <social.icon className="h-6 w-6" />
              </motion.a>
            ))}
          </div>
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} Joseph Remingston. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
