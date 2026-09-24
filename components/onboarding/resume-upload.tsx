"use client";

import { useState } from "react";
import { UploadCloud, FileCheck2, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function ResumeUpload({ onExtracted }: { onExtracted: () => void }) {
  const [status, setStatus] = useState<"idle" | "parsing" | "done">("idle");
  const [dragOver, setDragOver] = useState(false);

  function simulateUpload() {
    if (status !== "idle") return;
    setStatus("parsing");
    setTimeout(() => {
      setStatus("done");
      onExtracted();
    }, 1400);
  }

  return (
    <Card
      onClick={simulateUpload}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        simulateUpload();
      }}
      className={cn(
        "cursor-pointer border-2 border-dashed transition-all duration-200",
        dragOver ? "border-meti-mint bg-meti-cream/40 scale-[1.01]" : "border-meti-slate/25 hover:border-meti-mint/60"
      )}
    >
      <CardContent className="flex flex-col items-center justify-center gap-3 py-12 text-center">
        {status === "idle" && (
          <>
            <UploadCloud className="h-9 w-9 text-meti-slate" />
            <p className="text-sm font-medium text-meti-navy">
              Drag & drop your resume, or click to upload
            </p>
            <p className="text-xs text-meti-slate">Supports PDF and DOCX · Max 10MB</p>
          </>
        )}
        {status === "parsing" && (
          <>
            <Loader2 className="h-9 w-9 text-meti-mint animate-spin" />
            <p className="text-sm font-medium text-meti-navy">Extracting profile data…</p>
            <p className="text-xs text-meti-slate">Agent A03 · Resume Intelligence Agent</p>
          </>
        )}
        {status === "done" && (
          <>
            <FileCheck2 className="h-9 w-9 text-emerald-500" />
            <p className="text-sm font-medium text-meti-navy">Rohit_Gupta_Resume.pdf parsed</p>
            <p className="text-xs text-meti-slate">Profile auto-populated below — review and edit as needed.</p>
          </>
        )}
      </CardContent>
    </Card>
  );
}
