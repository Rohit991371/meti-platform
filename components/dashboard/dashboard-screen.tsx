"use client";

import { ArrowRight } from "lucide-react";
import { ReportHeader } from "./report-header";
import { MetricTiles } from "./metric-tiles";
import { CompetencyRadar } from "./competency-radar";
import { CapabilityHeatmap } from "./capability-heatmap";
import { ValuesWheel } from "./values-wheel";
import { ReportSwitcher } from "./report-switcher";
import { CopilotDrawer } from "@/components/ai-copilot/copilot-drawer";
import { Button } from "@/components/ui/button";
import type { ScreenId } from "@/lib/types";

export function DashboardScreen({ onNavigate }: { onNavigate: (screen: ScreenId) => void }) {
  return (
    <div className="min-h-screen bg-[#fafffd] px-4 sm:px-6 py-24 md:py-28 pb-28">
      <div className="mx-auto max-w-6xl space-y-6">
        <ReportHeader />
        <MetricTiles />

        <div className="grid lg:grid-cols-2 gap-6">
          <CompetencyRadar />
          <ValuesWheel />
        </div>

        <CapabilityHeatmap />
        <ReportSwitcher />

        <div className="flex justify-end">
          <Button variant="outline" onClick={() => onNavigate("admin")} className="gap-1.5">
            View admin & governance panel
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <CopilotDrawer />
    </div>
  );
}
