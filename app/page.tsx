"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DemoSwitcher } from "@/components/layout/demo-switcher";
import { LandingScreen } from "@/components/landing/landing-screen";
import { OnboardingScreen } from "@/components/onboarding/onboarding-screen";
import { CatalogueScreen } from "@/components/catalogue/catalogue-screen";
import { AssessmentScreen } from "@/components/assessment/assessment-screen";
import { CaseWorkspaceScreen } from "@/components/case-workspace/case-workspace-screen";
import { DashboardScreen } from "@/components/dashboard/dashboard-screen";
import { AdminScreen } from "@/components/admin/admin-screen";
import { TooltipProvider } from "@/components/ui/tooltip";
import type { ScreenId } from "@/lib/types";

export default function Home() {
  const [screen, setScreen] = useState<ScreenId>("landing");

  function navigate(next: ScreenId) {
    setScreen(next);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }

  return (
    <TooltipProvider delayDuration={200}>
      <main className="min-h-screen">
        <DemoSwitcher active={screen} onChange={navigate} />

        <AnimatePresence mode="wait">
          <motion.div
            key={screen}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {screen === "landing" && <LandingScreen onNavigate={navigate} />}
            {screen === "onboarding" && <OnboardingScreen onNavigate={navigate} />}
            {screen === "catalogue" && <CatalogueScreen onNavigate={navigate} />}
            {screen === "assessment" && <AssessmentScreen onNavigate={navigate} />}
            {screen === "case-workspace" && <CaseWorkspaceScreen onNavigate={navigate} />}
            {screen === "dashboard" && <DashboardScreen onNavigate={navigate} />}
            {screen === "admin" && <AdminScreen onNavigate={navigate} />}
          </motion.div>
        </AnimatePresence>
      </main>
    </TooltipProvider>
  );
}
