"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StepHeader } from "@/components/onboarding/step-header";
import { PRODUCT_OFFERS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import type { ProductTier, ScreenId } from "@/lib/types";

export function CatalogueScreen({ onNavigate }: { onNavigate: (screen: ScreenId) => void }) {
  const [selected, setSelected] = useState<ProductTier>("COMBO-A");

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
      <div className="mb-10">
        <StepHeader current={2} />
      </div>

      <div className="text-center mb-10">
        <h1 className="text-2xl md:text-3xl font-semibold text-meti-navy">Choose your assessment path</h1>
        <p className="mt-2 text-meti-slate">Pick a track — you can always add the other later.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {PRODUCT_OFFERS.map((offer, i) => {
          const isSelected = selected === offer.tier;
          return (
            <motion.div
              key={offer.tier}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <Card
                onClick={() => setSelected(offer.tier)}
                className={cn(
                  "relative h-full cursor-pointer transition-all duration-200 hover:-translate-y-1",
                  isSelected ? "border-meti-mint shadow-glow" : "hover:shadow-md"
                )}
              >
                {offer.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="solid" className="gap-1 px-3 py-1">
                      <Sparkles className="h-3 w-3 text-meti-mint" /> Recommended
                    </Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{offer.name}</CardTitle>
                  <p className="text-3xl font-semibold text-meti-navy pt-2">
                    ${offer.price}
                    <span className="text-sm font-normal text-meti-slate"> / assessment</span>
                  </p>
                  <p className="text-sm text-meti-slate pt-1">{offer.focus}</p>
                </CardHeader>
                <CardContent className="space-y-2.5">
                  {offer.includes.map((item) => (
                    <div key={item} className="flex items-start gap-2 text-sm text-meti-navy">
                      <Check className="h-4 w-4 text-meti-mint mt-0.5 shrink-0" />
                      {item}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-8 rounded-xl border border-meti-mint/30 bg-meti-cream/40 px-5 py-4 text-sm text-meti-navy">
        Completing your assessment unlocks the option to purchase the{" "}
        <strong>USD 250 Detailed Intelligence Report</strong> — a full 25–40 page report with a
        12–16 week personalized development roadmap.
      </div>

      <div className="mt-8 flex justify-center">
        <Button size="lg" onClick={() => onNavigate("assessment")} className="gap-1.5">
          Continue with {PRODUCT_OFFERS.find((o) => o.tier === selected)?.name}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
