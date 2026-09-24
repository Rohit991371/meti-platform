"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const DATASET = [
  { region: "North", orders: "142,300", cost_per_order: "$4.80" },
  { region: "West", orders: "118,900", cost_per_order: "$5.60" },
  { region: "South", orders: "97,200", cost_per_order: "$6.10" },
  { region: "East", orders: "104,500", cost_per_order: "$5.20" },
];

export function CaseExhibits() {
  return (
    <div className="space-y-5">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Client Brief</CardTitle>
            <Badge variant="outline">Confidential</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-meti-slate leading-relaxed">
          <p>
            <strong className="text-meti-navy">Client:</strong> A mid-size national retail
            chain, 240 stores, omnichannel fulfilment.
          </p>
          <p>
            <strong className="text-meti-navy">Situation:</strong> Fulfilment cost per order
            has risen 18% year-over-year despite flat order volumes across all four regions.
            Leadership needs a diagnosis and a 90-day action plan.
          </p>
          <p>
            <strong className="text-meti-navy">Constraint:</strong> No new capital expenditure
            approved this fiscal year — recommendations must work within the existing network.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Strategic Objectives</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-meti-slate">
            <li className="flex gap-2"><span className="text-meti-mint">•</span> Reduce cost-per-order by at least 12% within two quarters</li>
            <li className="flex gap-2"><span className="text-meti-mint">•</span> Maintain same-day delivery SLA in top 3 metro regions</li>
            <li className="flex gap-2"><span className="text-meti-mint">•</span> Avoid store or DC headcount reductions greater than 5%</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Regional Fulfilment Dataset</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-meti-slate border-b border-meti-slate/15">
                  <th className="pb-2 font-medium">Region</th>
                  <th className="pb-2 font-medium">Orders / Qtr</th>
                  <th className="pb-2 font-medium">Cost / Order</th>
                </tr>
              </thead>
              <tbody>
                {DATASET.map((row) => (
                  <tr key={row.region} className="border-b border-meti-slate/10 last:border-0">
                    <td className="py-2 text-meti-navy font-medium">{row.region}</td>
                    <td className="py-2 text-meti-slate">{row.orders}</td>
                    <td className="py-2 text-meti-slate">{row.cost_per_order}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
