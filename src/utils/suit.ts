import { CardSuits, type CardSuit } from "@/data/constants";

const redSuits: Readonly<CardSuit[]> = [CardSuits.DIAMONDS, CardSuits.HEARTS];

export const isRedSuit = (suit: CardSuit): boolean => redSuits.includes(suit);
export const isBlackSuit = (suit: CardSuit): boolean => !isRedSuit(suit);
