export const RanksTypes = {
  ACE: "A",
  TWO: "2",
  THREE: "3",
  FOUR: "4",
  FIVE: "5",
  SIX: "6",
  SEVEN: "7",
  EIGHT: "8",
  NINE: "9",
  TEN: "10",
  JACK: "J",
  QUEEN: "Q",
  KING: "K",
} as const;
export type RankType = (typeof RanksTypes)[keyof typeof RanksTypes];

export const RankIDs = {
  [RanksTypes.ACE]: "ra",
  [RanksTypes.TWO]: "r2",
  [RanksTypes.THREE]: "r3",
  [RanksTypes.FOUR]: "r4",
  [RanksTypes.FIVE]: "r5",
  [RanksTypes.SIX]: "r6",
  [RanksTypes.SEVEN]: "r7",
  [RanksTypes.EIGHT]: "r8",
  [RanksTypes.NINE]: "r9",
  [RanksTypes.TEN]: "r10",
  [RanksTypes.JACK]: "rj",
  [RanksTypes.QUEEN]: "rq",
  [RanksTypes.KING]: "rk",
} as const;
