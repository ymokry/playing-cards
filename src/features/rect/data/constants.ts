export const RectTypes = {
  OUTER: "o",
  INNER: "i",
} as const;

export const RectIDs = {
  [RectTypes.OUTER]: "rco",
  [RectTypes.INNER]: "rci",
};
