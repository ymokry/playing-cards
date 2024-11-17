import { CardSuits } from "@/data/constants";

export const SuitIDs = {
  [CardSuits.CLUBS]: "sc",
  [CardSuits.DIAMONDS]: "sd",
  [CardSuits.HEARTS]: "sh",
  [CardSuits.SPADES]: "ss",
} as const;
