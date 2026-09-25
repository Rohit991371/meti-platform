"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CANDIDATE } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const PRACTICE_AREAS = [
  "Strategy & Business Transformation",
  "Value Chain Optimization",
  "Operating Model / TOM Design",
  "Enterprise AI Advisory",
  "Change Management",
  "Financial Advisory",
];

const profileSchema = z.object({
  fullName: z.string().min(2, "Enter your full name"),
  education: z.string().min(2, "Enter your highest qualification"),
  yearsExperience: z.coerce.number().min(0).max(50),
  email: z.string().email("Enter a valid email"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export function ProfileForm({
  visible,
  onContinue,
  extractedData,
}: {
  visible: boolean;
  onContinue: () => void;
  extractedData?: any;
}) {
  const [selectedAreas, setSelectedAreas] = useState<string[]>(CANDIDATE.practiceAreas);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: CANDIDATE.fullName,
      education: CANDIDATE.education,
      yearsExperience: CANDIDATE.yearsExperience,
      email: CANDIDATE.email,
    },
  });

  useEffect(() => {
    if (extractedData) {
      reset({
        fullName: extractedData.fullName || CANDIDATE.fullName,
        education: extractedData.education || CANDIDATE.education,
        yearsExperience: extractedData.experienceYears ?? CANDIDATE.yearsExperience,
        email: CANDIDATE.email,
      });
      if (Array.isArray(extractedData.practiceAreas) && extractedData.practiceAreas.length) {
        setSelectedAreas(extractedData.practiceAreas);
      }
    }
  }, [extractedData, reset]);

  function toggleArea(area: string) {
    setSelectedAreas((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
    );
  }

  if (!visible) return null;

  return (
    <motion.form
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onSubmit={handleSubmit(onContinue)}
      className="space-y-6"
    >
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <Label htmlFor="fullName">Full name</Label>
          <Input id="fullName" {...register("fullName")} />
          {errors.fullName && <p className="text-xs text-rose-600">{errors.fullName.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register("email")} />
          {errors.email && <p className="text-xs text-rose-600">{errors.email.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="education">Education</Label>
          <Input id="education" {...register("education")} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="yearsExperience">Years of experience</Label>
          <Input id="yearsExperience" type="number" {...register("yearsExperience")} />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label>Past companies</Label>
        <div className="flex flex-wrap gap-2">
          {CANDIDATE.pastCompanies.map((c) => (
            <span key={c} className="rounded-full bg-meti-cream px-3 py-1 text-xs font-medium text-meti-navy">
              {c}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label>Target consulting practice areas</Label>
        <p className="text-xs text-meti-slate">Select all that apply — this adapts your assessment questions.</p>
        <div className="flex flex-wrap gap-2 pt-1">
          {PRACTICE_AREAS.map((area) => {
            const active = selectedAreas.includes(area);
            return (
              <button
                type="button"
                key={area}
                onClick={() => toggleArea(area)}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all",
                  active
                    ? "border-meti-mint bg-meti-mint/20 text-meti-navy"
                    : "border-meti-slate/25 text-meti-slate hover:border-meti-slate/50"
                )}
              >
                {area}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label>Primary industries</Label>
        <div className="flex flex-wrap gap-2">
          {CANDIDATE.primaryIndustries.map((c) => (
            <span key={c} className="rounded-full bg-meti-slate/10 px-3 py-1 text-xs font-medium text-meti-slate">
              {c}
            </span>
          ))}
        </div>
      </div>

      <Button type="submit" size="lg" className="w-full sm:w-auto">
        Continue to product selection
      </Button>
    </motion.form>
  );
}
