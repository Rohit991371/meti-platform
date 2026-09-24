"use client";

import { CheckCircle2, AlertTriangle, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CALIBRATION_METRICS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function CalibrationPanel() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-meti-mint" />
          <CardTitle>Calibration & Fairness Dashboard</CardTitle>
        </div>
        <CardDescription>Real-time governance metrics across all scoring agents</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CALIBRATION_METRICS.map((m) => (
            <div
              key={m.label}
              className={cn(
                "rounded-xl border px-4 py-3.5",
                m.status === "good" && "border-emerald-200 bg-emerald-50/60",
                m.status === "watch" && "border-amber-200 bg-amber-50/60",
                m.status === "alert" && "border-rose-200 bg-rose-50/60"
              )}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-medium text-meti-slate">{m.label}</span>
                {m.status === "good" && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />}
                {m.status === "watch" && <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />}
                {m.status === "alert" && <AlertTriangle className="h-3.5 w-3.5 text-rose-600" />}
              </div>
              <p className="text-lg font-semibold text-meti-navy">{m.value}</p>
              <p className="mt-1 text-[11px] text-meti-slate/80 leading-snug">{m.detail}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-2">
          <Badge variant="success" className="gap-1.5">
            <ShieldCheck className="h-3 w-3" /> Protected Field Exclusion Verified
          </Badge>
          <Badge variant="outline">No facial recognition in pipeline</Badge>
        </div>
      </CardContent>
    </Card>
  );
}
