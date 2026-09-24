"use client";

import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  PolarAngleAxis,
  Tooltip,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SCHWARTZ_VALUES } from "@/lib/mock-data";

const GROUP_COLORS: Record<string, string> = {
  "Openness to Change": "#65DCD5",
  "Self-Enhancement": "#321E48",
  Conservation: "#43637E",
  "Self-Transcendence": "#9FE8E2",
};

const data = [...SCHWARTZ_VALUES]
  .sort((a, b) => b.score - a.score)
  .map((v) => ({ ...v, fill: GROUP_COLORS[v.group] }));

const HIGHER_ORDER = ["Openness to Change", "Self-Enhancement", "Conservation", "Self-Transcendence"];

export function ValuesWheel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Schwartz-Informed Values</CardTitle>
        <CardDescription>Relative priority across 10 basic human values</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-72 md:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              data={data}
              innerRadius="18%"
              outerRadius="100%"
              startAngle={90}
              endAngle={-270}
            >
              <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
              <RadialBar background dataKey="score" cornerRadius={8} />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: "1px solid #D9FFF4", fontSize: 12 }}
                formatter={(value: number, _name, props) => [`${value}`, props.payload.name]}
              />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5">
          {data.map((v) => (
            <div key={v.id} className="flex items-center gap-2 text-xs text-meti-slate">
              <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ background: v.fill }} />
              {v.name}
              <span className="ml-auto font-medium text-meti-navy">{v.score}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {HIGHER_ORDER.map((g) => (
            <Badge key={g} variant="outline" className="gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ background: GROUP_COLORS[g] }} />
              {g}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
