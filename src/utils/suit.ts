import { type SuitType, constants as suitConstants } from "@/features/suit";

const redSuits: Readonly<SuitType[]> = [
  suitConstants.SuitTypes.DIAMONDS,
  suitConstants.SuitTypes.HEARTS,
];

export const isRedSuit = (suit: SuitType): boolean => redSuits.includes(suit);
export const isBlackSuit = (suit: SuitType): boolean => !isRedSuit(suit);
