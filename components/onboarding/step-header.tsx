"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = ["Profile", "Product", "Assessment", "Report"];

export function StepHeader({ current }: { current: number }) {
  return (
    <ol className="flex items-center justify-center gap-2 sm:gap-4">
      {STEPS.map((step, i) => {
        const index = i + 1;
        const state = index < current ? "done" : index === current ? "active" : "pending";
        return (
          <li key={step} className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold transition-colors",
                  state === "done" && "bg-meti-mint text-meti-navy",
                  state === "active" && "bg-meti-navy text-white ring-4 ring-meti-mint/25",
                  state === "pending" && "bg-meti-cream text-meti-slate"
                )}
              >
                {state === "done" ? <Check className="h-3.5 w-3.5" /> : index}
              </span>
              <span
                className={cn(
                  "hidden sm:inline text-sm font-medium",
                  state === "pending" ? "text-meti-slate/60" : "text-meti-navy"
                )}
              >
                {step}
              </span>
            </div>
            {index < STEPS.length && <div className="h-px w-6 sm:w-10 bg-meti-slate/20" />}
          </li>
        );
      })}
    </ol>
  );
}
