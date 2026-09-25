"use client";

import { useCallback, useState } from "react";
import { ArrowRight, FolderKanban, Loader2 } from "lucide-react";
import { CaseExhibits } from "./case-exhibits";
import { ResponseTabs } from "./response-tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { ScreenId } from "@/lib/types";

export function CaseWorkspaceScreen({ onNavigate }: { onNavigate: (screen: ScreenId) => void }) {
  const [caseData, setCaseData] = useState<{ issues: string[]; memoText: string; aiMode: "closed" | "assisted" } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = useCallback(
    (data: { issues: string[]; memoText: string; aiMode: "closed" | "assisted" }) => setCaseData(data),
    []
  );

  async function submitCase() {
    setSubmitting(true);
    try {
      await fetch("/api/case/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          candidateId: "candidate-rohit-123",
          issueTreeJson: caseData?.issues ?? [],
          memoText: caseData?.memoText ?? "",
          aiMode: caseData?.aiMode === "assisted" ? "AI_ASSISTED" : "CLOSED_AI",
        }),
      });
    } catch {
      // Zero-crash: proceed to dashboard even if scoring API is unreachable.
    } finally {
      setSubmitting(false);
      onNavigate("dashboard");
    }
  }

  return (
    <div className="min-h-screen bg-[#fafffd]">
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-meti-cream px-4 sm:px-6 py-3.5">
        <div className="mx-auto max-w-6xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FolderKanban className="h-4 w-4 text-meti-slate" />
            <span className="text-sm font-medium text-meti-navy">Case Challenge · Fulfilment Cost Diagnostic</span>
          </div>
          <Badge variant="outline">Module F15–F18</Badge>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 md:py-10">
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto pr-1">
            <CaseExhibits />
          </div>
          <div>
            <ResponseTabs onChange={handleChange} />
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <Button size="lg" onClick={submitCase} disabled={submitting} className="gap-1.5">
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Scoring submission…
              </>
            ) : (
              <>
                Submit case & view report
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
