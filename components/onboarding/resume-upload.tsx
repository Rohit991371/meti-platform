// "use client";

// import { useState } from "react";
// import { UploadCloud, FileCheck2, Loader2 } from "lucide-react";
// import { Card, CardContent } from "@/components/ui/card";
// import { cn } from "@/lib/utils";

// export function ResumeUpload({ onExtracted }: { onExtracted: (data?: any) => void }) {
//   const [status, setStatus] = useState<"idle" | "parsing" | "done">("idle");
//   const [dragOver, setDragOver] = useState(false);

//   async function simulateUpload() {
//     if (status !== "idle") return;
//     setStatus("parsing");
//     try {
//       const res = await fetch("/api/onboarding/parse-resume", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           resumeText:
//             "Rohit Gupta, MBA IIM. 6 years experience at Deloitte and EY in Strategy & Business Transformation and Enterprise AI Advisory.",
//         }),
//       });
//       const data = await res.json();
//       setStatus("done");
//       onExtracted(data);
//     } catch {
//       setStatus("done");
//       onExtracted();
//     }
//   }

//   return (
//     <Card
//       onClick={simulateUpload}
//       onDragOver={(e) => {
//         e.preventDefault();
//         setDragOver(true);
//       }}
//       onDragLeave={() => setDragOver(false)}
//       onDrop={(e) => {
//         e.preventDefault();
//         setDragOver(false);
//         simulateUpload();
//       }}
//       className={cn(
//         "cursor-pointer border-2 border-dashed transition-all duration-200",
//         dragOver ? "border-meti-mint bg-meti-cream/40 scale-[1.01]" : "border-meti-slate/25 hover:border-meti-mint/60"
//       )}
//     >
//       <CardContent className="flex flex-col items-center justify-center gap-3 py-12 text-center">
//         {status === "idle" && (
//           <>
//             <UploadCloud className="h-9 w-9 text-meti-slate" />
//             <p className="text-sm font-medium text-meti-navy">
//               Drag & drop your resume, or click to upload
//             </p>
//             <p className="text-xs text-meti-slate">Supports PDF and DOCX · Max 10MB</p>
//           </>
//         )}
//         {status === "parsing" && (
//           <>
//             <Loader2 className="h-9 w-9 text-meti-mint animate-spin" />
//             <p className="text-sm font-medium text-meti-navy">Extracting profile data…</p>
//             <p className="text-xs text-meti-slate">Agent A03 · Resume Intelligence Agent</p>
//           </>
//         )}
//         {status === "done" && (
//           <>
//             <FileCheck2 className="h-9 w-9 text-emerald-500" />
//             <p className="text-sm font-medium text-meti-navy">Rohit_Gupta_Resume.pdf parsed</p>
//             <p className="text-xs text-meti-slate">Profile auto-populated below — review and edit as needed.</p>
//           </>
//         )}
//       </CardContent>
//     </Card>
//   );
// }




"use client";

import { useRef, useState } from "react";
import { UploadCloud, FileCheck2, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function ResumeUpload({ onExtracted }: { onExtracted: (data?: any) => void }) {
  const [status, setStatus] = useState<"idle" | "parsing" | "done">("idle");
  const [dragOver, setDragOver] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setFileName(file.name);
    setStatus("parsing");

    let resumeText = "";
    if (file.type === "text/plain" || file.name.endsWith(".txt")) {
      resumeText = await file.text();
    } else {
      // PDF/DOCX binary parsing isn't wired client-side in this build — send what we can
      // (file name + size) so the API still gets a real signal rather than a canned string.
      resumeText = `Resume file uploaded: ${file.name} (${Math.round(file.size / 1024)}KB). Content type: ${file.type || "unknown"}.`;
    }

    try {
      const res = await fetch("/api/onboarding/parse-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText }),
      });
      const data = await res.json();
      setStatus("done");
      onExtracted(data);
    } catch {
      setStatus("done");
      onExtracted();
    }
  }

  return (
    <Card
      onClick={() => status === "idle" && fileInputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files?.[0];
        if (file && status === "idle") handleFile(file);
      }}
      className={cn(
        "cursor-pointer border-2 border-dashed transition-all duration-200",
        dragOver ? "border-meti-mint bg-meti-cream/40 scale-[1.01]" : "border-meti-slate/25 hover:border-meti-mint/60"
      )}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".txt,.pdf,.docx"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
      <CardContent className="flex flex-col items-center justify-center gap-3 py-12 text-center">
        {status === "idle" && (
          <>
            <UploadCloud className="h-9 w-9 text-meti-slate" />
            <p className="text-sm font-medium text-meti-navy">
              Drag & drop your resume, or click to upload
            </p>
            <p className="text-xs text-meti-slate">.txt gets full content parsing · PDF/DOCX supported with limited extraction in this build</p>
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
            <p className="text-sm font-medium text-meti-navy">{fileName ?? "Resume"} parsed</p>
            <p className="text-xs text-meti-slate">Profile auto-populated below — review and edit as needed.</p>
          </>
        )}
      </CardContent>
    </Card>
  );
}