"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Zap } from "lucide-react";
import { AssessmentHeader } from "./assessment-header";
import { SelectQuestion } from "./select-question";
import { RankQuestion } from "./rank-question";
import { VideoRecorder } from "./video-recorder";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ASSESSMENT_QUESTIONS } from "@/lib/mock-data";
import type { ScreenId } from "@/lib/types";

export function AssessmentScreen({ onNavigate }: { onNavigate: (screen: ScreenId) => void }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [selections, setSelections] = useState<Record<string, string[]>>({});
  const question = ASSESSMENT_QUESTIONS[stepIndex];
  const isLast = stepIndex === ASSESSMENT_QUESTIONS.length - 1;

  function toggleOption(optionId: string) {
    setSelections((prev) => {
      const current = prev[question.id] ?? [];
      if (question.type === "single-select") return { ...prev, [question.id]: [optionId] };
      const next = current.includes(optionId)
        ? current.filter((o) => o !== optionId)
        : [...current, optionId];
      return { ...prev, [question.id]: next };
    });
  }

  function goNext() {
    if (isLast) {
      onNavigate("case-workspace");
      return;
    }
    setStepIndex((i) => i + 1);
  }

  return (
    <div className="min-h-screen bg-[#fafffd]">
      <AssessmentHeader
        section={question.section}
        stepIndex={stepIndex + 1}
        totalSteps={ASSESSMENT_QUESTIONS.length}
        onExit={() => onNavigate("catalogue")}
      />

      <div className="mx-auto max-w-2xl px-6 py-10 md:py-14">
        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.28 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="outline">{question.moduleCode}</Badge>
              {question.type === "adaptive-scenario" && (
                <Badge className="gap-1">
                  <Zap className="h-3 w-3" /> Adaptive follow-up
                </Badge>
              )}
            </div>

            <h2 className="text-xl md:text-2xl font-semibold text-meti-navy leading-snug">
              {question.prompt}
            </h2>
            {question.helperText && (
              <p className="mt-2 text-sm text-meti-slate">{question.helperText}</p>
            )}

            <div className="mt-6">
              {(question.type === "single-select" ||
                question.type === "multi-select" ||
                question.type === "adaptive-scenario") &&
                question.options && (
                  <SelectQuestion
                    question={question}
                    selected={selections[question.id] ?? []}
                    onToggle={toggleOption}
                  />
                )}
              {question.type === "rank-4" && question.options && (
                <RankQuestion options={question.options} />
              )}
              {question.type === "video-response" && <VideoRecorder />}
            </div>

            <div className="mt-8 flex items-center justify-between">
              <Button
                variant="ghost"
                disabled={stepIndex === 0}
                onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
                className="gap-1.5"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
              <Button onClick={goNext} className="gap-1.5">
                {isLast ? "Continue to case study" : "Next"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
