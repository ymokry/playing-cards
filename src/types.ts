import { CardRanks, CardSuits } from "@/constants";

export type CardRank = (typeof CardRanks)[keyof typeof CardRanks];
export type CardSuit = (typeof CardSuits)[keyof typeof CardSuits];
export type PlayingCard = `${CardSuit}_${CardRank}`;
