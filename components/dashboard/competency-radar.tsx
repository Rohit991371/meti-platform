"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { COMPETENCY_SCORES, RADAR_GROUPS } from "@/lib/mock-data";

function average(ids: string[]) {
  const rows = COMPETENCY_SCORES.filter((s) => ids.includes(s.competencyId));
  const candidate = rows.reduce((sum, r) => sum + r.candidateLevel, 0) / rows.length;
  const benchmark = rows.reduce((sum, r) => sum + r.benchmarkLevel, 0) / rows.length;
  return { candidate: Number((candidate * 25).toFixed(1)), benchmark: Number((benchmark * 25).toFixed(1)) };
}

const data = RADAR_GROUPS.map((g) => {
  const { candidate, benchmark } = average(g.competencyIds);
  return { axis: g.group, Candidate: candidate, "Target Role Benchmark": benchmark };
});

export function CompetencyRadar() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>C01–C20 Competency Radar</CardTitle>
        <CardDescription>Candidate capability vs. target role benchmark, scaled 0–100</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-72 md:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={data} outerRadius="72%">
              <PolarGrid stroke="#43637E33" />
              <PolarAngleAxis dataKey="axis" tick={{ fill: "#321E48", fontSize: 11 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "#43637E", fontSize: 9 }} />
              <Radar
                name="Candidate"
                dataKey="Candidate"
                stroke="#321E48"
                fill="#321E48"
                fillOpacity={0.25}
                strokeWidth={2}
              />
              <Radar
                name="Target Role Benchmark"
                dataKey="Target Role Benchmark"
                stroke="#65DCD5"
                fill="#65DCD5"
                fillOpacity={0.35}
                strokeWidth={2}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: "1px solid #D9FFF4", fontSize: 12 }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
