// src/types.ts
export type Era = "1970s" | "1980s" | "1990s" | "2000s" | "2010s" | "2020s";

export type Car = {
  id: number;
  name: string;
  era: Era;
  brand?: string;
  [key: string]: any; // optional extra fields
};

export const eraDescriptions: Record<Era, string> = {
  "1970s": "The wedge era — raw power, dramatic lines, no driver aids.",
  "1980s": "Excess personified — turbos, strakes, and TV fame.",
  "1990s": "Engineering purity — naturally aspirated masterpieces.",
  "2000s": "The hypercar arms race begins — 1000 hp becomes reality.",
  "2010s": "Electrification arrives — hybrid hypercars redefine limits.",
  "2020s": "The electric revolution — speed without combustion.",
};