import { constants as rankConstants } from "@/features/rank";
import { constants as suitConstants } from "@/features/suit";

export const CourtRanks = [
  rankConstants.RanksTypes.JACK,
  rankConstants.RanksTypes.QUEEN,
  rankConstants.RanksTypes.KING,
] as const;
export type CourtRank = (typeof CourtRanks)[number];

export const CourtIDs = {
  [`${suitConstants.SuitTypes.CLUBS}_${rankConstants.RanksTypes.JACK}` as const]: `ccj`,
  [`${suitConstants.SuitTypes.DIAMONDS}_${rankConstants.RanksTypes.JACK}` as const]: `cdj`,
  [`${suitConstants.SuitTypes.HEARTS}_${rankConstants.RanksTypes.JACK}` as const]: `chj`,
  [`${suitConstants.SuitTypes.SPADES}_${rankConstants.RanksTypes.JACK}` as const]: `csj`,
  [`${suitConstants.SuitTypes.CLUBS}_${rankConstants.RanksTypes.QUEEN}` as const]: `ccq`,
  [`${suitConstants.SuitTypes.DIAMONDS}_${rankConstants.RanksTypes.QUEEN}` as const]: `cdq`,
  [`${suitConstants.SuitTypes.HEARTS}_${rankConstants.RanksTypes.QUEEN}` as const]: `chq`,
  [`${suitConstants.SuitTypes.SPADES}_${rankConstants.RanksTypes.QUEEN}` as const]: `csq`,
  [`${suitConstants.SuitTypes.CLUBS}_${rankConstants.RanksTypes.KING}` as const]: `cck`,
  [`${suitConstants.SuitTypes.DIAMONDS}_${rankConstants.RanksTypes.KING}` as const]: `cdk`,
  [`${suitConstants.SuitTypes.HEARTS}_${rankConstants.RanksTypes.KING}` as const]: `chk`,
  [`${suitConstants.SuitTypes.SPADES}_${rankConstants.RanksTypes.KING}` as const]: `csk`,
} as const;

export type CourtCard = `${suitConstants.SuitType}_${CourtRank}`;
