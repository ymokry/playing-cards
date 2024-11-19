export const PatternTypes = {
  BACK: "back",
} as const;
export type PatternType = (typeof PatternTypes)[keyof typeof PatternTypes];

export const PatternIDs = {
  [PatternTypes.BACK]: "pb",
} as const;
