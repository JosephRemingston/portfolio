import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { SiGithub, SiLeetcode } from "react-icons/si";

export default function Stats() {
  return (
    <section id="stats" className="scroll-mt-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="section-heading">My Stats</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* GitHub Stats */}
          <Card className="bg-black/40 backdrop-blur-md border-white/10 overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <SiGithub className="h-6 w-6 text-white" />
                <h3 className="text-xl font-semibold text-white glow-text">GitHub Stats</h3>
              </div>
              <div className="space-y-4">
                <img
                  src="https://github-readme-stats.vercel.app/api?username=JosephRemingston&show_icons=true&theme=radical&hide_border=true&bg_color=0d1117"
                  alt="GitHub Stats"
                  className="w-full"
                />
                <img
                  src="https://github-readme-streak-stats.herokuapp.com/?user=JosephRemingston&theme=radical&hide_border=true&background=0d1117"
                  alt="GitHub Streak"
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>

          {/* LeetCode Stats */}
          <Card className="bg-black/40 backdrop-blur-md border-white/10 overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <SiLeetcode className="h-6 w-6 text-white" />
                <h3 className="text-xl font-semibold text-white glow-text">LeetCode Stats</h3>
              </div>
              <img
                src="https://leetcard.jacoblin.cool/JosephRemingston?theme=dark&font=Roboto&ext=heatmap"
                alt="LeetCode Stats"
                className="w-full"
              />
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </section>
  );
}