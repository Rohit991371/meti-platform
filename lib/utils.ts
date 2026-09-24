import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function clampScore(value: number, min = 0, max = 100) {
  return Math.min(max, Math.max(min, value));
}

export function levelLabel(level: number) {
  const labels = ["L0 · Not Evident", "L1 · Emerging", "L2 · Developing", "L3 · Proficient", "L4 · Advanced"];
  return labels[level] ?? labels[0];
}
