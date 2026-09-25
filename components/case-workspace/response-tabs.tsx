"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, UploadCloud, Lock, Sparkles, FileText } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const DEFAULT_MEMO =
  "Recommend a three-lever plan: (1) consolidate South-region fulfilment nodes, (2) renegotiate carrier contracts against 2026 volume tiers, (3) pilot a 12-week phased rollout before full network change to protect SLA commitments.";

export function ResponseTabs({
  onChange,
}: {
  onChange?: (data: { issues: string[]; memoText: string; aiMode: "closed" | "assisted" }) => void;
}) {
  const [issues, setIssues] = useState([
    "Fulfilment cost breakdown by region shows disproportionate rise in South (+26%)",
    "Last-mile carrier contracts unchanged since 2023 despite volume tier eligibility",
  ]);
  const [newIssue, setNewIssue] = useState("");
  const [memoText, setMemoText] = useState(DEFAULT_MEMO);
  const [aiMode, setAiMode] = useState<"closed" | "assisted">("closed");

  useEffect(() => {
    onChange?.({ issues, memoText, aiMode });
  }, [issues, memoText, aiMode, onChange]);

  function addIssue() {
    if (!newIssue.trim()) return;
    setIssues((prev) => [...prev, newIssue.trim()]);
    setNewIssue("");
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-medium text-meti-navy">Your structured response</p>
          <button
            onClick={() => setAiMode((m) => (m === "closed" ? "assisted" : "closed"))}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
              aiMode === "closed" ? "bg-meti-slate/10 text-meti-slate" : "bg-meti-mint/20 text-meti-navy"
            )}
          >
            {aiMode === "closed" ? <Lock className="h-3 w-3" /> : <Sparkles className="h-3 w-3" />}
            {aiMode === "closed" ? "Closed AI Mode" : "AI-Assisted Mode (prompts logged)"}
          </button>
        </div>

        <Tabs defaultValue="issue-tree">
          <TabsList className="flex-wrap h-auto">
            <TabsTrigger value="issue-tree">Issue Tree</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            <TabsTrigger value="artifacts">Artifacts</TabsTrigger>
          </TabsList>

          <TabsContent value="issue-tree" className="space-y-3">
            {issues.map((issue, i) => (
              <div key={i} className="flex items-start gap-2 rounded-lg border border-meti-slate/15 px-3.5 py-2.5">
                <span className="mt-0.5 text-xs font-mono text-meti-mint">{i + 1}.</span>
                <p className="flex-1 text-sm text-meti-navy">{issue}</p>
                <button
                  onClick={() => setIssues((prev) => prev.filter((_, idx) => idx !== i))}
                  aria-label="Remove hypothesis"
                  className="text-meti-slate/50 hover:text-rose-500"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
            <div className="flex gap-2">
              <Textarea
                value={newIssue}
                onChange={(e) => setNewIssue(e.target.value)}
                placeholder="Add a hypothesis or issue-tree branch…"
                className="min-h-[44px] py-2.5"
              />
              <Button variant="outline" size="icon" onClick={addIssue} aria-label="Add hypothesis">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="recommendations">
            <Textarea
              value={memoText}
              onChange={(e) => setMemoText(e.target.value)}
              placeholder="Write your executive summary memo here…"
              className="min-h-[220px]"
            />
            <p className="mt-2 text-xs text-meti-slate">
              Scored by Agent A09 (Case Assessment) and A10 (Communication) for structure and executive clarity.
            </p>
          </TabsContent>

          <TabsContent value="artifacts">
            <div className="rounded-xl border-2 border-dashed border-meti-slate/25 px-6 py-10 text-center hover:border-meti-mint/60 transition-colors cursor-pointer">
              <UploadCloud className="mx-auto h-8 w-8 text-meti-slate mb-2" />
              <p className="text-sm font-medium text-meti-navy">Upload mini-deck or value chain diagram</p>
              <p className="text-xs text-meti-slate mt-1">PPTX, PDF, or PNG · Max 25MB</p>
            </div>
            <div className="mt-3 flex items-center gap-2 rounded-lg bg-meti-cream/50 px-3 py-2 text-xs text-meti-navy">
              <FileText className="h-3.5 w-3.5" />
              value-chain-redesign-v2.pdf
              <Badge variant="success" className="ml-auto">Uploaded</Badge>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
