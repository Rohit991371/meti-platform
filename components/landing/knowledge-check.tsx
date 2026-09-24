"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const QUESTIONS = [
  {
    prompt: "How does METI weigh self-reported claims versus demonstrated evidence?",
    options: [
      "Self-reported claims and evidence are weighted equally",
      "Demonstrated evidence (cases, videos, work samples) is weighted significantly higher",
    ],
    correct: 1,
  },
  {
    prompt: "Can a human consultant override an AI-generated score?",
    options: [
      "No, AI scores are always final",
      "Yes — high-stakes decisions require human consultant confirmation",
    ],
    correct: 1,
  },
];

export function KnowledgeCheck({
  open,
  onOpenChange,
  onComplete,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: () => void;
}) {
  const [answers, setAnswers] = useState<(number | null)[]>([null, null]);

  const allAnswered = answers.every((a) => a !== null);
  const allCorrect = answers.every((a, i) => a === QUESTIONS[i].correct);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Quick readiness check</DialogTitle>
          <DialogDescription>
            Two questions to confirm you understand how the assessment works before we begin.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          {QUESTIONS.map((q, qi) => (
            <div key={q.prompt}>
              <p className="text-sm font-medium text-meti-navy mb-2">{q.prompt}</p>
              <div className="space-y-2">
                {q.options.map((opt, oi) => (
                  <button
                    key={opt}
                    onClick={() =>
                      setAnswers((a) => a.map((v, i) => (i === qi ? oi : v)))
                    }
                    className={cn(
                      "w-full rounded-lg border px-3.5 py-2.5 text-left text-sm transition-all",
                      answers[qi] === oi
                        ? "border-meti-mint bg-meti-cream/60 text-meti-navy font-medium"
                        : "border-meti-slate/20 text-meti-slate hover:border-meti-slate/40"
                    )}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {allAnswered && !allCorrect && (
          <p className="text-xs text-amber-600">
            One or more answers don't match the assessment guidance — review and try again.
          </p>
        )}

        <DialogFooter>
          <Button
            disabled={!allAnswered || !allCorrect}
            onClick={onComplete}
            className="gap-1.5"
          >
            <CheckCircle2 className="h-4 w-4" />
            Confirm and continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
