import { constants as suitConstants } from "@/features/suit";

const redSuits: Readonly<suitConstants.SuitType[]> = [
  suitConstants.SuitTypes.DIAMONDS,
  suitConstants.SuitTypes.HEARTS,
];

export const isRedSuit = (suit: suitConstants.SuitType): boolean =>
  redSuits.includes(suit);
export const isBlackSuit = (suit: suitConstants.SuitType): boolean =>
  !isRedSuit(suit);
