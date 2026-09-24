"use client";

import { useState } from "react";
import { Play, Pause, Captions, FileText, ListChecks } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const CHAPTERS = [
  { time: "0:00", label: "Welcome to METI" },
  { time: "1:20", label: "How evidence-based scoring works" },
  { time: "3:05", label: "Your assessment journey" },
  { time: "5:40", label: "What happens to your data" },
];

export function VideoExplainer({ onWatched }: { onWatched: () => void }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(18);
  const [showTranscript, setShowTranscript] = useState(false);

  function togglePlay() {
    setPlaying((p) => !p);
    if (!playing) {
      const next = Math.min(100, progress + 64);
      setProgress(next);
      if (next >= 80) onWatched();
    }
  }

  return (
    <Card className="overflow-hidden shadow-elevated border-meti-cream">
      <div className="relative aspect-video bg-gradient-to-br from-meti-navy via-[#2b1a41] to-meti-slate flex items-center justify-center">
        <button
          onClick={togglePlay}
          aria-label={playing ? "Pause video" : "Play video"}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-meti-mint text-meti-navy shadow-glow transition-transform hover:scale-105 focus-visible:outline-none"
        >
          {playing ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-0.5" />}
        </button>
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <Badge variant="solid">V01 · Orientation</Badge>
        </div>
        <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-black/30 px-2.5 py-1 text-[11px] text-white">
          <Captions className="h-3.5 w-3.5" /> CC
        </div>
      </div>

      <CardContent className="pt-5 space-y-4">
        <div className="flex items-center justify-between text-sm text-meti-slate">
          <span className="font-medium text-meti-navy">
            {progress >= 80 ? "Unlocked — you can proceed" : `${progress}% Watched`}
          </span>
          <button
            onClick={() => setShowTranscript((s) => !s)}
            className="flex items-center gap-1.5 text-meti-slate hover:text-meti-navy transition-colors"
          >
            <FileText className="h-3.5 w-3.5" /> Transcript
          </button>
        </div>
        <Progress value={progress} />

        {showTranscript && (
          <div className="rounded-xl bg-meti-cream/50 p-4 text-sm text-meti-slate leading-relaxed max-h-32 overflow-y-auto">
            "Welcome to METI. Over the next few minutes we'll walk through how your consulting
            capability is evaluated — using real work samples, structured cases, and an
            executive-style video response, scored by a panel of specialized AI agents and
            reviewed by human consultants for anything high-stakes."
          </div>
        )}

        <div className="grid grid-cols-2 gap-2">
          {CHAPTERS.map((c) => (
            <button
              key={c.time}
              className="flex items-center gap-2 rounded-lg border border-meti-slate/15 px-3 py-2 text-left text-xs text-meti-slate hover:border-meti-mint hover:text-meti-navy transition-colors"
            >
              <span className="font-mono text-meti-mint">{c.time}</span>
              {c.label}
            </button>
          ))}
        </div>

        {progress >= 80 && (
          <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
            <ListChecks className="h-3.5 w-3.5" />
            82% Watched — Unlocked Next Step
          </div>
        )}
      </CardContent>
    </Card>
  );
}
