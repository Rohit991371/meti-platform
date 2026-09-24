"use client";

import { Download } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CANDIDATE } from "@/lib/mock-data";

export function ReportHeader() {
  const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl glass-dark px-6 py-5">
      <div className="flex items-center gap-4">
        <Avatar className="h-12 w-12">
          <AvatarFallback>{CANDIDATE.avatarInitials}</AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-lg font-semibold text-white">{CANDIDATE.fullName}</h1>
            <Badge variant="outline" className="border-meti-mint/40 text-meti-cream">
              {CANDIDATE.enterpriseId}
            </Badge>
          </div>
          <p className="text-sm text-meti-cream/70 mt-0.5">
            {CANDIDATE.targetRole} · {today} · Report v1.1
          </p>
        </div>
      </div>
      <Button className="gap-1.5 self-start sm:self-auto">
        <Download className="h-4 w-4" /> Download PDF
      </Button>
    </div>
  );
}
