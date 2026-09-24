"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Hero({ onStart }: { onStart: () => void }) {
  return (
    <section className="relative overflow-hidden bg-meti-navy px-6 pb-20 pt-28 md:pt-36 md:pb-28">
      <div
        className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, #65DCD5 0%, transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute bottom-[-20%] left-[-10%] h-[420px] w-[420px] rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #D9FFF4 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="outline" className="border-meti-mint/40 text-meti-cream mb-6 gap-1.5 py-1.5">
            <Sparkles className="h-3 w-3 text-meti-mint" />
            Modus Enterprise Transformation
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="text-4xl md:text-6xl font-display font-semibold leading-[1.08] text-white"
        >
          Consulting readiness, proven with
          <span className="text-gradient-mint"> evidence, not claims</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12 }}
          className="mx-auto mt-6 max-w-2xl text-base md:text-lg text-meti-cream/80"
        >
          METI evaluates management consulting talent across 20 enterprise competencies using
          real case work, executive video responses, and AI-calibrated scoring — reviewed by
          human consultants before any high-stakes call is made.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Button size="lg" onClick={onStart} className="group">
            Start Free Assessment
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
          <Button size="lg" variant="outline" className="border-meti-cream/30 text-meti-cream hover:bg-white/5">
            Watch how scoring works
          </Button>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/10 pt-8"
        >
          {[
            ["20", "Core competencies scored"],
            ["20", "Specialized AI scoring agents"],
            ["92%", "Avg. evidence confidence"],
            ["100%", "Human-reviewed high-stakes calls"],
          ].map(([value, label]) => (
            <div key={label} className="text-left">
              <dt className="text-2xl md:text-3xl font-semibold text-meti-mint">{value}</dt>
              <dd className="mt-1 text-xs md:text-sm text-meti-cream/70">{label}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
