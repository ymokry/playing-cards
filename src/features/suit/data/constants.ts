export const SuitTypes = {
  SPADES: "S",
  HEARTS: "H",
  DIAMONDS: "D",
  CLUBS: "C",
} as const;
export type SuitType = (typeof SuitTypes)[keyof typeof SuitTypes];

export const SuitIDs = {
  [SuitTypes.CLUBS]: "sc",
  [SuitTypes.DIAMONDS]: "sd",
  [SuitTypes.HEARTS]: "sh",
  [SuitTypes.SPADES]: "ss",
} as const;
