"use client";
import { motion } from "framer-motion";
import { Newspaper, ArrowUpRight } from "lucide-react";
import { blogPosts } from "@/data/portfolio";
import SectionShell from "@/components/SectionShell";

export default function DailyBugle() {
  return (
    <SectionShell
      id="blog"
      issue="08"
      eyebrow="Daily Bugle"
      title="Extra! Extra! Read All About It"
      description="Stories from the web-slinger's desk — engineering deep-dives and experiments in the making. Fresh issues are being written."
      tone="blue"
      className="bg-night-2/60"
    >
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5 max-w-6xl mx-auto">
        {blogPosts.map((post, i) => (
          <motion.article
            key={post.number}
            className="group relative glass rounded-2xl overflow-hidden hover:border-electric/50 transition-colors duration-500"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Newspaper masthead strip */}
            <div className="flex items-center justify-between px-5 py-3 border-b-2 border-double border-line-bright bg-night-3/60">
              <span className="comic-title text-lg tracking-[0.15em] text-frost/90">
                THE DAILY BUGLE
              </span>
              <span className="comic-title text-sm text-spider">#{post.number}</span>
            </div>

            <div className="p-5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold bg-gold/10 border border-gold/25 rounded-full px-2.5 py-0.5">
                  {post.tag}
                </span>
                <span className="text-[10px] font-mono text-frost-dim">{post.date}</span>
              </div>
              <h3 className="mt-3 text-lg font-bold leading-snug text-frost group-hover:text-electric transition-colors">
                {post.title}
              </h3>
              <p className="mt-2 text-xs text-frost-dim leading-relaxed">{post.excerpt}</p>

              <div className="mt-5 pt-4 border-t border-line/60 flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-frost-dim">
                  {post.isPlaceholder ? "Issue in print" : "Read more"}
                </span>
                <ArrowUpRight
                  size={14}
                  className="text-frost-dim group-hover:text-electric group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                />
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <motion.p
        className="mt-8 flex items-center justify-center gap-2 text-xs text-frost-dim/80"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <Newspaper size={13} className="text-spider" />
        The press room is warming up — future-ready placeholder issues, ready for real stories.
      </motion.p>
    </SectionShell>
  );
}
