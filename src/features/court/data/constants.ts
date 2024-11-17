import { CardSuits, CardRanks } from "@/data/constants";

export const CourtIDs = {
  [`${CardSuits.CLUBS}_${CardRanks.JACK}` as const]: `ccj`,
  [`${CardSuits.DIAMONDS}_${CardRanks.JACK}` as const]: `cdj`,
  [`${CardSuits.HEARTS}_${CardRanks.JACK}` as const]: `chj`,
  [`${CardSuits.SPADES}_${CardRanks.JACK}` as const]: `csj`,
  [`${CardSuits.CLUBS}_${CardRanks.QUEEN}` as const]: `ccq`,
  [`${CardSuits.DIAMONDS}_${CardRanks.QUEEN}` as const]: `cdq`,
  [`${CardSuits.HEARTS}_${CardRanks.QUEEN}` as const]: `chq`,
  [`${CardSuits.SPADES}_${CardRanks.QUEEN}` as const]: `csq`,
  [`${CardSuits.CLUBS}_${CardRanks.KING}` as const]: `cck`,
  [`${CardSuits.DIAMONDS}_${CardRanks.KING}` as const]: `cdk`,
  [`${CardSuits.HEARTS}_${CardRanks.KING}` as const]: `chk`,
  [`${CardSuits.SPADES}_${CardRanks.KING}` as const]: `csk`,
} as const;
