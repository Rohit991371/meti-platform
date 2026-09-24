"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, CheckCircle2, AlertTriangle, Unlock, Circle, CircleDot } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  TOP_STRENGTHS,
  PRIORITY_GAPS,
  ROADMAP,
  TARGET_ROLE_MATCHES,
  COMPETENCIES,
} from "@/lib/mock-data";
import { cn } from "@/lib/utils";

function competencyName(id: string) {
  return COMPETENCIES.find((c) => c.id === id)?.name ?? id;
}

export function ReportSwitcher() {
  const [unlocked, setUnlocked] = useState(false);
  const [view, setView] = useState<"summary" | "detailed">("summary");

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <CardTitle>Findings & Development Plan</CardTitle>
          <div className="inline-flex rounded-xl bg-meti-cream/70 p-1">
            <button
              onClick={() => setView("summary")}
              className={cn(
                "rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all",
                view === "summary" ? "bg-meti-navy text-white" : "text-meti-navy"
              )}
            >
              Summary
            </button>
            <button
              onClick={() => setView("detailed")}
              className={cn(
                "flex items-center gap-1 rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all",
                view === "detailed" ? "bg-meti-navy text-white" : "text-meti-navy"
              )}
            >
              {!unlocked && <Lock className="h-3 w-3" />}
              Detailed (USD 250)
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
          {view === "summary" && (
            <motion.div
              key="summary"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="grid md:grid-cols-2 gap-6"
            >
              <div>
                <p className="text-sm font-semibold text-meti-navy mb-3 flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Top 3 Strengths
                </p>
                <div className="space-y-2.5">
                  {TOP_STRENGTHS.map((s) => (
                    <div key={s.competencyId} className="rounded-lg bg-emerald-50 px-3.5 py-2.5">
                      <p className="text-xs font-semibold text-emerald-800">
                        {s.competencyId} · {competencyName(s.competencyId)}
                      </p>
                      <p className="text-xs text-emerald-700 mt-0.5">{s.note}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-meti-navy mb-3 flex items-center gap-1.5">
                  <AlertTriangle className="h-4 w-4 text-amber-500" /> 3 Priority Gaps
                </p>
                <div className="space-y-2.5">
                  {PRIORITY_GAPS.map((g) => (
                    <div key={g.competencyId} className="rounded-lg bg-amber-50 px-3.5 py-2.5">
                      <p className="text-xs font-semibold text-amber-800">
                        {g.competencyId} · {competencyName(g.competencyId)}
                      </p>
                      <p className="text-xs text-amber-700 mt-0.5">{g.note}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2 rounded-xl border border-meti-mint/30 bg-meti-cream/40 px-4 py-3.5 flex items-center justify-between flex-wrap gap-3">
                <div>
                  <p className="text-sm font-semibold text-meti-navy">High-level readiness recommendation</p>
                  <p className="text-xs text-meti-slate mt-0.5">
                    Ready for Senior Path roles with targeted development in TOM governance and risk controls.
                  </p>
                </div>
                {!unlocked && (
                  <Button size="sm" onClick={() => { setUnlocked(true); setView("detailed"); }} className="gap-1.5">
                    <Unlock className="h-3.5 w-3.5" /> Unlock Detailed Report
                  </Button>
                )}
              </div>
            </motion.div>
          )}

          {view === "detailed" && !unlocked && (
            <motion.div
              key="locked"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center gap-3 py-12 text-center"
            >
              <Lock className="h-8 w-8 text-meti-slate" />
              <p className="text-sm font-medium text-meti-navy">
                Unlock the USD 250 Detailed Intelligence Report
              </p>
              <p className="text-xs text-meti-slate max-w-sm">
                Includes your full 12–16 week roadmap, weekly milestones, learning-module links,
                and Target Role Match scores.
              </p>
              <Button onClick={() => setUnlocked(true)} className="gap-1.5">
                <Unlock className="h-4 w-4" /> Unlock now
              </Button>
            </motion.div>
          )}

          {view === "detailed" && unlocked && (
            <motion.div
              key="detailed"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >
              <div>
                <p className="text-sm font-semibold text-meti-navy mb-3">12–16 Week Development Roadmap</p>
                <ol className="space-y-3">
                  {ROADMAP.map((m) => (
                    <li key={m.week} className="flex gap-3 rounded-lg border border-meti-slate/15 px-3.5 py-3">
                      {m.status === "complete" && <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />}
                      {m.status === "in-progress" && <CircleDot className="h-4 w-4 text-meti-mint mt-0.5 shrink-0" />}
                      {m.status === "upcoming" && <Circle className="h-4 w-4 text-meti-slate/40 mt-0.5 shrink-0" />}
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-semibold text-meti-slate">{m.week}</span>
                          <span className="text-sm font-medium text-meti-navy">{m.title}</span>
                          <Badge variant="outline" className="text-[10px]">
                            {m.focusCompetencies.join(", ")}
                          </Badge>
                        </div>
                        <p className="text-xs text-meti-slate mt-0.5">{m.description}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div>
                <p className="text-sm font-semibold text-meti-navy mb-3">Target Role Match</p>
                <div className="space-y-2.5">
                  {TARGET_ROLE_MATCHES.map((r) => (
                    <div key={r.role} className="flex items-center gap-3">
                      <span className="w-44 shrink-0 text-xs text-meti-navy">{r.role}</span>
                      <div className="h-2 flex-1 rounded-full bg-meti-cream overflow-hidden">
                        <div
                          className="h-full rounded-full bg-meti-mint transition-all duration-700"
                          style={{ width: `${r.matchPercent}%` }}
                        />
                      </div>
                      <span className="w-10 shrink-0 text-right text-xs font-semibold text-meti-navy">
                        {r.matchPercent}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
