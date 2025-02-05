import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/20 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <motion.a
          href="#"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-2xl font-bold text-white relative"
        >
          <span className="relative z-10">Portfolio</span>
          <motion.div
            className="absolute inset-0 bg-blue-500/20 rounded-lg -z-10"
            whileHover={{ scale: 1.2, opacity: 0.8 }}
          />
        </motion.a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <motion.button
              key={item.name}
              whileHover={{ y: -2, color: "#3498DB" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection(item.href)}
              className="text-white/90 hover:text-white transition-colors relative group"
            >
              {item.name}
              <motion.div
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-500 scale-x-0 origin-left"
                initial={false}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          ))}
        </div>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="text-white">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent className="bg-[#1a1a2e]/95 backdrop-blur-lg border-white/10">
            <div className="flex flex-col space-y-4 mt-8">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 4, color: "#3498DB" }}
                  onClick={() => scrollToSection(item.href)}
                  className="text-left text-lg text-white/90 hover:text-white transition-colors"
                >
                  {item.name}
                </motion.button>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </motion.header>
  );
}