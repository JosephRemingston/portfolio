import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { CalendarDays } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { type BlogPost } from "@shared/schema";

export default function Blog() {
  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  return (
    <section id="blog" className="scroll-mt-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="section-heading">Blog</h2>

        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="bg-black/40 backdrop-blur-md border-white/10">
                <CardContent className="p-6 animate-pulse">
                  <div className="h-6 w-2/3 bg-white/20 rounded mb-4" />
                  <div className="h-4 w-1/4 bg-white/20 rounded mb-4" />
                  <div className="h-20 w-full bg-white/20 rounded" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {posts?.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Card className="bg-black/40 backdrop-blur-md border-white/10 hover:bg-black/50 transition-colors">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-white glow-text mb-2">
                      {post.title}
                    </h3>
                    <div className="flex items-center text-white/60 text-sm mb-4">
                      <CalendarDays className="h-4 w-4 mr-2" />
                      {new Date(post.createdAt).toLocaleDateString()}
                    </div>
                    <p className="text-white/80 mb-4">{post.excerpt}</p>
                    <Button
                      variant="link"
                      className="text-[#3498DB] hover:text-[#2980B9] p-0"
                      onClick={() => {
                        // TODO: Implement blog post detail view
                        console.log(`View blog post ${post.id}`);
                      }}
                    >
                      Read More →
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}
