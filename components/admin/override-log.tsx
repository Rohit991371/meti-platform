"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { OVERRIDE_LOG } from "@/lib/mock-data";

type ApiRow = {
  id: string;
  candidate_id: string;
  competency_code: string;
  old_score: number;
  new_score: number;
  reviewer_name: string;
  reason: string;
  timestamp: string;
};

export function OverrideLog() {
  const [rows, setRows] = useState<ApiRow[] | null>(null);

  useEffect(() => {
    fetch("/api/admin/overrides")
      .then((res) => res.json())
      .then((data) => setRows(data.overrides ?? []))
      .catch(() => setRows(null));
  }, []);

  const entries =
    rows && rows.length > 0
      ? rows.map((r) => ({
          id: r.id,
          candidate: r.candidate_id,
          competency: r.competency_code,
          aiScore: r.old_score,
          humanScore: r.new_score,
          reviewer: r.reviewer_name,
          reason: r.reason,
          date: new Date(r.timestamp).toLocaleDateString(),
        }))
      : OVERRIDE_LOG;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Human Assessor Override Log</CardTitle>
        <CardDescription>Recent AI-to-human score adjustments, with reviewer rationale</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[720px]">
            <thead>
              <tr className="text-left text-xs text-meti-slate border-b border-meti-slate/15">
                <th className="pb-2 font-medium">Candidate</th>
                <th className="pb-2 font-medium">Competency</th>
                <th className="pb-2 font-medium text-center">AI Score</th>
                <th className="pb-2 font-medium text-center">Human Score</th>
                <th className="pb-2 font-medium">Reviewer</th>
                <th className="pb-2 font-medium">Reason</th>
                <th className="pb-2 font-medium text-right">Date</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => {
                const changed = entry.aiScore !== entry.humanScore;
                return (
                  <tr key={entry.id} className="border-b border-meti-slate/10 last:border-0 align-top">
                    <td className="py-3 text-meti-navy font-medium whitespace-nowrap">{entry.candidate}</td>
                    <td className="py-3">
                      <Badge variant="outline">{entry.competency}</Badge>
                    </td>
                    <td className="py-3 text-center text-meti-slate">L{entry.aiScore}</td>
                    <td className="py-3 text-center">
                      <span className={changed ? "font-semibold text-meti-navy" : "text-meti-slate"}>
                        L{entry.humanScore}
                      </span>
                    </td>
                    <td className="py-3 text-meti-slate whitespace-nowrap">{entry.reviewer}</td>
                    <td className="py-3 text-meti-slate max-w-xs">{entry.reason}</td>
                    <td className="py-3 text-right text-xs text-meti-slate whitespace-nowrap">{entry.date}</td>
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
