"use client";

import { useEffect, useState } from "react";
import { Clock, CheckCircle2, X } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function AssessmentHeader({
  section,
  stepIndex,
  totalSteps,
  onExit,
}: {
  section: string;
  stepIndex: number;
  totalSteps: number;
  onExit: () => void;
}) {
  const [seconds, setSeconds] = useState(24 * 60);
  const [savedAgo, setSavedAgo] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setSavedAgo((s) => (s >= 8 ? 0 : s + 1)), 1000);
    return () => clearInterval(t);
  }, []);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-meti-cream px-4 sm:px-6 py-3.5">
      <div className="mx-auto max-w-4xl flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs text-meti-slate truncate">{section}</p>
          <div className="mt-1.5 w-40 sm:w-64">
            <Progress value={(stepIndex / totalSteps) * 100} />
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-5 shrink-0">
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-meti-slate">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
            Saved {savedAgo}s ago
          </div>
          <div className="flex items-center gap-1.5 text-sm font-mono font-medium text-meti-navy">
            <Clock className="h-3.5 w-3.5 text-meti-slate" />
            {mm}:{ss}
          </div>
          <button
            onClick={onExit}
            aria-label="Exit assessment"
            className="rounded-lg p-1.5 text-meti-slate hover:bg-meti-cream/60 hover:text-meti-navy transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
