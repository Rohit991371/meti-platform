"use client";

import { useEffect, useState } from "react";
import { Video, Mic, Pause, Square, ChevronDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const BARS = Array.from({ length: 28 }, (_, i) => i);

const SAMPLE_TRANSCRIPT =
  "Thanks for the time today. Our recommendation centers on three levers: first, consolidating fulfilment nodes to cut redundant handling costs; second, renegotiating last-mile carrier contracts against updated volume tiers; third, phasing a 12-week pilot before full rollout to de-risk the transition.";

export function VideoRecorder() {
  const [phase, setPhase] = useState<"prep" | "recording" | "done">("prep");
  const [prepSeconds, setPrepSeconds] = useState(30);
  const [recordSeconds, setRecordSeconds] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);
  const [evaluating, setEvaluating] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (phase !== "prep") return;
    if (prepSeconds <= 0) {
      setPhase("recording");
      return;
    }
    const t = setTimeout(() => setPrepSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [phase, prepSeconds]);

  useEffect(() => {
    if (phase !== "recording") return;
    const t = setInterval(() => setRecordSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [phase]);

  async function submitResponse() {
    setPhase("done");
    setEvaluating(true);
    try {
      const res = await fetch("/api/assessment/evaluate-video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          candidateId: "candidate-rohit-123",
          promptId: "F16",
          transcriptText: SAMPLE_TRANSCRIPT,
          durationSeconds: recordSeconds || 60,
        }),
      });
      const data = await res.json();
      setFeedback(data.feedback || null);
    } catch {
      setFeedback(null);
    } finally {
      setEvaluating(false);
    }
  }

  const mm = String(Math.floor(recordSeconds / 60)).padStart(2, "0");
  const ss = String(recordSeconds % 60).padStart(2, "0");

  return (
    <div className="rounded-xl border-2 border-meti-slate/15 bg-white p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium text-meti-navy">
          <Video className="h-4 w-4 text-meti-slate" />
          Executive Presentation Response
        </div>
        {phase === "recording" && (
          <span className="flex items-center gap-1.5 text-xs font-mono text-rose-600">
            <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
            REC {mm}:{ss}
          </span>
        )}
      </div>

      <div className="flex aspect-video items-center justify-center rounded-lg bg-gradient-to-br from-meti-navy to-[#241634]">
        {phase === "prep" && (
          <div className="text-center text-white">
            <p className="text-4xl font-semibold">{prepSeconds}s</p>
            <p className="mt-1 text-xs text-meti-cream/70">Prep time — recording starts automatically</p>
          </div>
        )}
        {phase === "recording" && (
          <div className="flex items-end gap-0.5 h-16">
            {BARS.map((b) => (
              <span
                key={b}
                className="w-1.5 rounded-full bg-meti-mint animate-pulse"
                style={{
                  height: `${20 + ((b * 37) % 60)}%`,
                  animationDelay: `${b * 40}ms`,
                }}
              />
            ))}
          </div>
        )}
        {phase === "done" && (
          <div className="text-center text-white">
            <Mic className="mx-auto h-8 w-8 text-meti-mint mb-2" />
            <p className="text-sm">Response submitted</p>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        {phase === "recording" && (
          <button
            onClick={submitResponse}
            className="flex items-center gap-1.5 rounded-lg bg-meti-navy px-4 py-2 text-xs font-medium text-white hover:bg-[#241634]"
          >
            <Square className="h-3.5 w-3.5" /> Submit response
          </button>
        )}
        {phase === "recording" && (
          <button className="flex items-center gap-1.5 rounded-lg border border-meti-slate/25 px-4 py-2 text-xs font-medium text-meti-slate hover:text-meti-navy">
            <Pause className="h-3.5 w-3.5" /> Pause
          </button>
        )}
        {phase === "done" && (
          <button
            onClick={() => setShowTranscript((s) => !s)}
            className={cn(
              "flex items-center gap-1.5 rounded-lg border border-meti-slate/25 px-4 py-2 text-xs font-medium text-meti-slate hover:text-meti-navy",
              showTranscript && "text-meti-navy border-meti-mint"
            )}
          >
            <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", showTranscript && "rotate-180")} />
            {showTranscript ? "Hide transcript preview" : "Show transcript preview"}
          </button>
        )}
      </div>

      {showTranscript && (
        <div className="rounded-lg bg-meti-cream/50 p-3.5 text-xs text-meti-slate leading-relaxed">
          "{SAMPLE_TRANSCRIPT}"
        </div>
      )}

      {phase === "done" && (
        <div className="rounded-lg border border-meti-mint/30 bg-meti-cream/40 p-3.5 text-xs text-meti-navy flex items-start gap-2">
          {evaluating ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin mt-0.5" />
              Agent A10 scoring executive communication…
            </>
          ) : (
            <span>{feedback ?? "Response recorded."}</span>
          )}
        </div>
      )}
    </div>
  );
}
