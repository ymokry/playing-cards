import { CardRanks } from "@/data/constants";

export const RankIDs = {
  [CardRanks.ACE]: "ra",
  [CardRanks.TWO]: "r2",
  [CardRanks.THREE]: "r3",
  [CardRanks.FOUR]: "r4",
  [CardRanks.FIVE]: "r5",
  [CardRanks.SIX]: "r6",
  [CardRanks.SEVEN]: "r7",
  [CardRanks.EIGHT]: "r8",
  [CardRanks.NINE]: "r9",
  [CardRanks.TEN]: "r10",
  [CardRanks.JACK]: "rj",
  [CardRanks.QUEEN]: "rq",
  [CardRanks.KING]: "rk",
} as const;
