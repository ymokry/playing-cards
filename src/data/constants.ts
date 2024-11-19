import { constants as rankConstants } from "@/features/rank";
import { type constants as SuitConstants } from "@/features/suit";

export const SpecialCards = {
  BACK: "Back",
  CUT: "Cut",
} as const;
export type SpecialCard = (typeof SpecialCards)[keyof typeof SpecialCards];

export type PlayingCard = `${SuitConstants.SuitType}_${rankConstants.RankType}`;

export const Palette = {
  BLACK: "#151515",
  BLUE: "#152AAB",
  NONE: "none",
  RED: "#AB2A15",
  WHITE: "#000",
} as const;
export type Color = (typeof Palette)[keyof typeof Palette];
