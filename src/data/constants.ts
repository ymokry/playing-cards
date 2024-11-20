export const Palette = {
  BLACK: "#151515",
  NONE: "none",
  RED: "#AB2A15",
  WHITE: "#fff",
} as const;
export type Color = (typeof Palette)[keyof typeof Palette];
