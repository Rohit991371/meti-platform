"use client";

import { ArrowRight, FolderKanban } from "lucide-react";
import { CaseExhibits } from "./case-exhibits";
import { ResponseTabs } from "./response-tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { ScreenId } from "@/lib/types";

export function CaseWorkspaceScreen({ onNavigate }: { onNavigate: (screen: ScreenId) => void }) {
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
            <ResponseTabs />
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <Button size="lg" onClick={() => onNavigate("dashboard")} className="gap-1.5">
            Submit case & view report
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
