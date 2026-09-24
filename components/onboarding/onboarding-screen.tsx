"use client";

import { useState } from "react";
import { Mail, Building2 } from "lucide-react";
import { StepHeader } from "./step-header";
import { ResumeUpload } from "./resume-upload";
import { ProfileForm } from "./profile-form";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { ScreenId } from "@/lib/types";

export function OnboardingScreen({ onNavigate }: { onNavigate: (screen: ScreenId) => void }) {
  const [authed, setAuthed] = useState(false);
  const [extracted, setExtracted] = useState(false);

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 md:py-20">
      <div className="mb-10">
        <StepHeader current={1} />
      </div>

      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-meti-navy">
          Let's set up your profile
        </h1>
        <p className="mt-2 text-meti-slate">
          Sign in, then upload your resume so we can pre-fill your details.
        </p>
      </div>

      {!authed && (
        <Card className="mb-6">
          <CardContent className="pt-6 space-y-3">
            <p className="text-sm font-medium text-meti-navy mb-1">Sign in to continue</p>
            <Button variant="outline" className="w-full justify-start gap-3" onClick={() => setAuthed(true)}>
              <Mail className="h-4 w-4" /> Continue with Email OTP
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3" onClick={() => setAuthed(true)}>
              <Building2 className="h-4 w-4" /> Continue with Enterprise SSO
            </Button>
          </CardContent>
        </Card>
      )}

      {authed && (
        <div className="space-y-6">
          <ResumeUpload onExtracted={() => setExtracted(true)} />
          <ProfileForm visible={extracted} onContinue={() => onNavigate("catalogue")} />
        </div>
      )}
    </div>
  );
}
