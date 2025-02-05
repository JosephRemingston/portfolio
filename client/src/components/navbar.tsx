import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
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
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
        isScrolled ? "bg-white/80 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <motion.a
          href="#"
          whileHover={{ scale: 1.05 }}
          className="text-2xl font-bold text-[#2C3E50]"
        >
          Portfolio
        </motion.a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <motion.button
              key={item.name}
              whileHover={{ y: -2 }}
              onClick={() => scrollToSection(item.href)}
              className="text-[#34495E] hover:text-[#3498DB] transition-colors"
            >
              {item.name}
            </motion.button>
          ))}
        </div>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col space-y-4 mt-8">
              {navItems.map((item) => (
                <motion.button
                  key={item.name}
                  whileHover={{ x: 4 }}
                  onClick={() => scrollToSection(item.href)}
                  className="text-left text-lg text-[#34495E] hover:text-[#3498DB] transition-colors"
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
