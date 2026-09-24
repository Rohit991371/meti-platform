"use client";

import { useState } from "react";
import { Hero } from "./hero";
import { VideoExplainer } from "./video-explainer";
import { KnowledgeCheck } from "./knowledge-check";
import { Button } from "@/components/ui/button";
import type { ScreenId } from "@/lib/types";

export function LandingScreen({ onNavigate }: { onNavigate: (screen: ScreenId) => void }) {
  const [watched, setWatched] = useState(false);
  const [checkOpen, setCheckOpen] = useState(false);

  return (
    <div>
      <Hero onStart={() => document.getElementById("orientation")?.scrollIntoView({ behavior: "smooth" })} />

      <section id="orientation" className="mx-auto max-w-3xl px-6 py-16 md:py-20">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-meti-navy">
            Start with a short orientation
          </h2>
          <p className="mt-2 text-meti-slate">
            Watch V01 to understand how your assessment works before diagnostics begin.
          </p>
        </div>

        <VideoExplainer onWatched={() => setWatched(true)} />

        <div className="mt-8 flex justify-center">
          <Button
            size="lg"
            disabled={!watched}
            onClick={() => setCheckOpen(true)}
            className="gap-1.5"
          >
            Continue to readiness check
          </Button>
        </div>
        {!watched && (
          <p className="mt-3 text-center text-xs text-meti-slate">
            Watch at least 80% of the orientation video to unlock the next step.
          </p>
        )}
      </section>

      <KnowledgeCheck
        open={checkOpen}
        onOpenChange={setCheckOpen}
        onComplete={() => {
          setCheckOpen(false);
          onNavigate("onboarding");
        }}
      />
    </div>
  );
}
