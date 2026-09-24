"use client";

import { cn } from "@/lib/utils";
import type { ScreenId } from "@/lib/types";
import {
  Rocket,
  UserPlus,
  ShoppingBag,
  ClipboardList,
  FolderKanban,
  LayoutDashboard,
  ShieldCheck,
} from "lucide-react";

const SCREENS: { id: ScreenId; label: string; icon: React.ElementType }[] = [
  { id: "landing", label: "Landing", icon: Rocket },
  { id: "onboarding", label: "Onboarding", icon: UserPlus },
  { id: "catalogue", label: "Catalogue", icon: ShoppingBag },
  { id: "assessment", label: "Assessment", icon: ClipboardList },
  { id: "case-workspace", label: "Case Study", icon: FolderKanban },
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "admin", label: "Admin", icon: ShieldCheck },
];

export function DemoSwitcher({
  active,
  onChange,
}: {
  active: ScreenId;
  onChange: (id: ScreenId) => void;
}) {
  return (
    <>
      {/* Desktop / tablet top bar */}
      <nav
        aria-label="Demo screen switcher"
        className="hidden md:flex fixed top-4 left-1/2 -translate-x-1/2 z-50 items-center gap-1 rounded-2xl glass-dark px-2 py-2 shadow-elevated"
      >
        {SCREENS.map((screen) => {
          const Icon = screen.icon;
          const isActive = active === screen.id;
          return (
            <button
              key={screen.id}
              onClick={() => onChange(screen.id)}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "relative flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-medium transition-all duration-200",
                isActive
                  ? "bg-meti-mint text-meti-navy shadow-glow"
                  : "text-meti-cream/80 hover:text-white hover:bg-white/10"
              )}
            >
              <Icon className="h-3.5 w-3.5" aria-hidden="true" />
              {screen.label}
            </button>
          );
        })}
      </nav>

      {/* Mobile bottom nav */}
      <nav
        aria-label="Demo screen switcher"
        className="md:hidden fixed bottom-0 inset-x-0 z-50 glass-dark border-t border-meti-mint/20 px-1 py-2 pb-[env(safe-area-inset-bottom,8px)]"
      >
        <div className="flex overflow-x-auto no-scrollbar gap-1 px-1">
          {SCREENS.map((screen) => {
            const Icon = screen.icon;
            const isActive = active === screen.id;
            return (
              <button
                key={screen.id}
                onClick={() => onChange(screen.id)}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex min-w-[64px] flex-col items-center gap-1 rounded-xl px-2 py-1.5 text-[10px] font-medium transition-colors",
                  isActive ? "bg-meti-mint text-meti-navy" : "text-meti-cream/70"
                )}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {screen.label}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
