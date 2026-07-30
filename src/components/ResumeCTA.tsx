"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FileText, Download } from "lucide-react";
import SatwikCharacter from "@/components/character/SatwikCharacter";

export default function ResumeCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section className="px-6 lg:px-10 py-20 lg:py-32">
      <div ref={ref} className="max-w-4xl mx-auto">
        <div className="bg-surface border border-border rounded-2xl p-8 lg:p-12 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <SatwikCharacter state="waving" size={180} interactive={false} />
          </motion.div>

          <div className="flex-1 text-center lg:text-left">
            <motion.h3
              className="text-2xl lg:text-3xl font-bold tracking-[-0.02em] text-fg"
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              Want the full story?
            </motion.h3>
            <motion.p
              className="mt-2 text-fg-secondary"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              Take a look at my resume for the complete picture.
            </motion.p>

            <motion.div
              className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <a
                href="/Satwik_Mishra_Off_Campus.pdf"
                target="_blank"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-white text-sm font-medium rounded-full hover:bg-accent-dark transition-colors"
              >
                <FileText size={15} />
                View Resume
              </a>
              <a
                href="/Satwik_Mishra_Off_Campus.pdf"
                download
                className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-border text-fg text-sm font-medium rounded-full hover:border-accent hover:text-accent transition-all duration-300"
              >
                <Download size={15} />
                Download
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
