"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Target, ShieldCheck, FileCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SCORE_INDICES } from "@/lib/mock-data";

export function MetricTiles() {
  const [scores, setScores] = useState(SCORE_INDICES);

  useEffect(() => {
    fetch("/api/dashboard/candidate-rohit-123")
      .then((res) => res.json())
      .then((data) => {
        if (data?.scores) {
          setScores({
            cci: data.scores.cci,
            cpi: data.scores.cpi,
            criLabel: data.scores.cri,
            criScore: data.scores.cci, // composite proxy for display
            evidenceConfidence: data.scores.evidenceConfidence,
          });
        }
      })
      .catch(() => {
        /* keep mock fallback */
      });
  }, []);

  const TILES = [
    { label: "Consulting Capability Index", code: "CCI", value: `${scores.cci} / 100`, icon: TrendingUp, detail: "Weighted technical competence" },
    { label: "Consulting Potential Index", code: "CPI", value: `${scores.cpi} / 100`, icon: Target, detail: "Growth agility & learning velocity" },
    { label: "Client Readiness Index", code: "CRI", value: scores.criLabel, icon: ShieldCheck, detail: `Composite score ${scores.criScore} / 100` },
    { label: "Evidence Confidence", code: "EC", value: `${scores.evidenceConfidence}%`, icon: FileCheck, detail: "High sample verification" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {TILES.map((tile, i) => {
        const Icon = tile.icon;
        return (
          <motion.div
            key={tile.code}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
          >
            <Card className="h-full hover:-translate-y-0.5 transition-transform duration-200">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-semibold tracking-wide text-meti-slate">{tile.code}</span>
                  <Icon className="h-4 w-4 text-meti-mint" />
                </div>
                <p className="text-xl md:text-2xl font-semibold text-meti-navy leading-tight">{tile.value}</p>
                <p className="mt-1 text-xs text-meti-slate">{tile.label}</p>
                <p className="mt-2 text-[11px] text-meti-slate/70">{tile.detail}</p>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
