export const RectTypes = {
  CUT: "c",
  OUTER: "o",
  INNER: "i",
} as const;

export const RectIDs = {
  [RectTypes.CUT]: "rcc",
  [RectTypes.OUTER]: "rco",
  [RectTypes.INNER]: "rci",
};
