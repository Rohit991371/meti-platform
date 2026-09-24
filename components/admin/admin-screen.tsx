"use client";

import { ArrowLeft } from "lucide-react";
import { CalibrationPanel } from "./calibration-panel";
import { OverrideLog } from "./override-log";
import { Button } from "@/components/ui/button";
import type { ScreenId } from "@/lib/types";

export function AdminScreen({ onNavigate }: { onNavigate: (screen: ScreenId) => void }) {
  return (
    <div className="min-h-screen bg-meti-navy px-4 sm:px-6 py-24 md:py-28 pb-28">
      <div className="mx-auto max-w-6xl space-y-6">
        <div>
          <Button
            variant="ghost"
            onClick={() => onNavigate("dashboard")}
            className="text-meti-cream hover:bg-white/10 hover:text-white gap-1.5 mb-4"
          >
            <ArrowLeft className="h-4 w-4" /> Back to candidate report
          </Button>
          <h1 className="text-2xl md:text-3xl font-semibold text-white">Admin & Governance Control Panel</h1>
          <p className="mt-1.5 text-sm text-meti-cream/70">Stage 20 · Calibration, fairness, and human review oversight</p>
        </div>

        <CalibrationPanel />
        <OverrideLog />
      </div>
    </div>
  );
}
