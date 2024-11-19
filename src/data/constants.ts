import { type RankType } from "@/features/rank";
import { type SuitType } from "@/features/suit";

export const SpecialCards = {
  BACK: "Back",
  CUT: "Cut",
} as const;
export type SpecialCard = (typeof SpecialCards)[keyof typeof SpecialCards];

export type PlayingCard = `${SuitType}_${RankType}`;

export const CardOuter = {
  WIDTH: 240,
  HEIGHT: 336,
  RADIUS: 12,
} as const;

export const CardInner = {
  WIDTH: 168,
  HEIGHT: 260,
} as const;

export const Palette = {
  BLACK: "#151515",
  BLUE: "#152AAB",
  NONE: "none",
  RED: "#AB2A15",
  WHITE: "#fff",
} as const;
export type Color = (typeof Palette)[keyof typeof Palette];
