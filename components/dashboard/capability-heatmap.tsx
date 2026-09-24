"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { COMPETENCIES, COMPETENCY_SCORES } from "@/lib/mock-data";
import { cn, levelLabel } from "@/lib/utils";

const LEVEL_COLORS = [
  "bg-meti-slate/10 text-meti-slate",
  "bg-rose-100 text-rose-700",
  "bg-amber-100 text-amber-700",
  "bg-meti-mint/30 text-meti-navy",
  "bg-meti-navy text-white",
];

export function CapabilityHeatmap() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Capability Heatmap</CardTitle>
        <CardDescription>Estimated level (L0–L4) across all 20 competencies</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[560px]">
            <thead>
              <tr className="text-left text-xs text-meti-slate border-b border-meti-slate/15">
                <th className="pb-2 font-medium">Competency</th>
                <th className="pb-2 font-medium">Group</th>
                <th className="pb-2 font-medium text-center">Level</th>
                <th className="pb-2 font-medium text-center">Benchmark</th>
                <th className="pb-2 font-medium text-right">Evidence</th>
              </tr>
            </thead>
            <tbody>
              {COMPETENCIES.map((c) => {
                const score = COMPETENCY_SCORES.find((s) => s.competencyId === c.id)!;
                return (
                  <tr key={c.id} className="border-b border-meti-slate/10 last:border-0">
                    <td className="py-2.5">
                      <span className="text-meti-navy font-medium">{c.id}</span>{" "}
                      <span className="text-meti-slate">· {c.name}</span>
                    </td>
                    <td className="py-2.5 text-xs text-meti-slate">{c.group}</td>
                    <td className="py-2.5 text-center">
                      <span
                        title={levelLabel(score.candidateLevel)}
                        className={cn(
                          "inline-flex h-6 w-9 items-center justify-center rounded-md text-xs font-semibold",
                          LEVEL_COLORS[score.candidateLevel]
                        )}
                      >
                        L{score.candidateLevel}
                      </span>
                    </td>
                    <td className="py-2.5 text-center text-xs text-meti-slate">L{score.benchmarkLevel}</td>
                    <td className="py-2.5 text-right text-xs text-meti-slate">{score.evidenceConfidence}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
