"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AssessmentQuestion } from "@/lib/types";

export function SelectQuestion({
  question,
  selected,
  onToggle,
}: {
  question: AssessmentQuestion;
  selected: string[];
  onToggle: (optionId: string) => void;
}) {
  const isMulti = question.type === "multi-select";

  return (
    <div className="space-y-3">
      {question.options?.map((opt) => {
        const active = selected.includes(opt.id);
        return (
          <button
            key={opt.id}
            onClick={() => onToggle(opt.id)}
            className={cn(
              "w-full rounded-xl border-2 px-4 py-3.5 text-left transition-all duration-200",
              active
                ? "border-meti-mint bg-meti-cream/50 shadow-glow"
                : "border-meti-slate/15 bg-white hover:border-meti-slate/30"
            )}
          >
            <div className="flex items-start gap-3">
              <span
                className={cn(
                  "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border-2 transition-colors",
                  isMulti ? "rounded-md" : "rounded-full",
                  active ? "border-meti-mint bg-meti-mint" : "border-meti-slate/30 bg-white"
                )}
              >
                {active && <Check className="h-3.5 w-3.5 text-meti-navy" />}
              </span>
              <span>
                <span className="block text-sm font-medium text-meti-navy">{opt.label}</span>
                {opt.description && (
                  <span className="block mt-0.5 text-xs text-meti-slate">{opt.description}</span>
                )}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
