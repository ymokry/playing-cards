import config from "@/data/config";
import Suit, {
  constants as suitConstants,
  type SuitType,
  type SuitUseOptions,
} from "@/features/suit";
import { constants as rankConstants } from "@/features/rank";
import { constants as svgConstants, type UseContent } from "@/features/svg";

import { type CourtCard } from "@/features/court/types";

const getCourtSuit = (type: CourtCard): SuitType => {
  const [suit] = type.split("_");

  return suit as SuitType;
};

const defaultSuit: Readonly<SuitUseOptions> = {
  size: config.suitSizes.LG,
  x: 4,
  y: 4,
};

const layouts: Readonly<Record<CourtCard, SuitUseOptions[]>> = {
  [`${suitConstants.SuitTypes.CLUBS}_${rankConstants.RanksTypes.JACK}` as const]:
    [
      defaultSuit,
      { size: config.suitSizes.SM, x: 48, y: 74 },
      { size: config.suitSizes.SM, x: 83.5, y: 84 },
      { size: config.suitSizes.SM, x: 83.5, y: 96 },
    ],
  [`${suitConstants.SuitTypes.DIAMONDS}_${rankConstants.RanksTypes.JACK}` as const]:
    [
      defaultSuit,
      { size: config.suitSizes.MD, x: 96, y: 75 },
      { size: config.suitSizes.MD, x: 103, y: 66 },
    ],
  [`${suitConstants.SuitTypes.HEARTS}_${rankConstants.RanksTypes.JACK}` as const]:
    [
      defaultSuit,
      {
        size: config.suitSizes.XS,
        x: 65,
        y: 117,
      },
      {
        size: config.suitSizes.XS,
        x: 81,
        y: 117,
      },
      {
        size: config.suitSizes.XS,
        x: 36,
        y: 80,
        transform: "rotate(-30 36 80)",
      },
      {
        size: config.suitSizes.XS,
        x: 41,
        y: 89,
        transform: "rotate(-20 41 89)",
      },
      {
        size: config.suitSizes.SM,
        x: 115,
        y: 77,
        transform: "rotate(-50 115 77)",
      },
      {
        size: config.suitSizes.SM,
        x: 125,
        y: 88,
        transform: "rotate(-35 125 88)",
      },
      {
        size: config.suitSizes.SM,
        x: 132,
        y: 100,
        transform: "rotate(-20 132 100)",
      },
    ],
  [`${suitConstants.SuitTypes.SPADES}_${rankConstants.RanksTypes.JACK}` as const]:
    [
      defaultSuit,
      {
        size: config.suitSizes.XS,
        x: 100,
        y: 62,
        transform: "rotate(35 100 62)",
      },
      {
        size: config.suitSizes.XS,
        x: 93,
        y: 73,
        transform: "rotate(35 93 73)",
      },
      {
        size: config.suitSizes.XS,
        x: 86,
        y: 84,
        transform: "rotate(35 86 84)",
      },
    ],
  [`${suitConstants.SuitTypes.CLUBS}_${rankConstants.RanksTypes.QUEEN}` as const]:
    [
      defaultSuit,
      { size: config.suitSizes.SM, x: 57, y: 78 },
      { size: config.suitSizes.SM, x: 100, y: 78 },
      { size: config.suitSizes.XS, x: 57, y: 89 },
      { size: config.suitSizes.XS, x: 111, y: 77 },
    ],
  [`${suitConstants.SuitTypes.DIAMONDS}_${rankConstants.RanksTypes.QUEEN}` as const]:
    [
      defaultSuit,
      { size: config.suitSizes.XS, x: 89, y: 84 },
      { size: config.suitSizes.XS, x: 85, y: 93 },
      { size: config.suitSizes.XS, x: 51, y: 81 },
      { size: config.suitSizes.XS, x: 60, y: 83 },
      { size: config.suitSizes.XS, x: 54, y: 91 },
    ],
  [`${suitConstants.SuitTypes.HEARTS}_${rankConstants.RanksTypes.QUEEN}` as const]:
    [
      defaultSuit,
      {
        size: config.suitSizes.XS,
        x: 116,
        y: 82,
        transform: "rotate(8 116 82)",
      },
      {
        size: config.suitSizes.XS,
        x: 106,
        y: 138,
        transform: "rotate(25 106 138)",
      },
      {
        size: config.suitSizes.XS,
        x: 114,
        y: 95,
        transform: "rotate(6 114 95)",
      },
      {
        size: config.suitSizes.XS,
        x: 113,
        y: 109,
        transform: "rotate(9 113 109)",
      },
      {
        size: config.suitSizes.XS,
        x: 111,
        y: 123,
        transform: "rotate(16 111 123)",
      },
    ],
  [`${suitConstants.SuitTypes.SPADES}_${rankConstants.RanksTypes.QUEEN}` as const]:
    [
      defaultSuit,
      {
        size: config.suitSizes.SM,
        x: 41,
        y: 84,
        transform: "rotate(40 41 84)",
      },
      {
        size: config.suitSizes.SM,
        x: 41,
        y: 97,
        transform: "rotate(40 41 97)",
      },
      {
        size: config.suitSizes.SM,
        x: 32,
        y: 108,
        transform: "rotate(40 32 108)",
      },
      {
        size: config.suitSizes.SM,
        x: 14,
        y: 107,
        transform: "rotate(40 14 107)",
      },
      {
        size: config.suitSizes.SM,
        x: 22,
        y: 119,
        transform: "rotate(40 22 119)",
      },
      {
        size: config.suitSizes.SM,
        x: 10,
        y: 120,
        transform: "rotate(40 10 120)",
      },
    ],
  [`${suitConstants.SuitTypes.CLUBS}_${rankConstants.RanksTypes.KING}` as const]:
    [
      defaultSuit,
      {
        size: config.suitSizes.SM,
        x: 105,
        y: 73,
        transform: "rotate(30 105 73)",
      },
      {
        size: config.suitSizes.SM,
        x: 98.5,
        y: 86,
        transform: "rotate(15 98.5 86)",
      },
      {
        size: config.suitSizes.SM,
        x: 95,
        y: 100,
        transform: "rotate(5 95 100)",
      },
    ],
  [`${suitConstants.SuitTypes.DIAMONDS}_${rankConstants.RanksTypes.KING}` as const]:
    [
      defaultSuit,
      { size: config.suitSizes.SM, x: 76, y: 116 },
      { size: config.suitSizes.SM, x: 68, y: 116 },
      {
        size: config.suitSizes.XS,
        x: 139,
        y: 117,
        transform: "rotate(60 139 117)",
      },
      {
        size: config.suitSizes.XS,
        x: 129,
        y: 123,
        transform: "rotate(50 129 123)",
      },
      {
        size: config.suitSizes.XS,
        x: 120.5,
        y: 131,
        transform: "rotate(40 120.5 131)",
      },
      {
        size: config.suitSizes.XS,
        x: 114,
        y: 141,
        transform: "rotate(30 114 141)",
      },
    ],
  [`${suitConstants.SuitTypes.HEARTS}_${rankConstants.RanksTypes.KING}` as const]:
    [
      defaultSuit,
      {
        size: config.suitSizes.SM,
        x: 109,
        y: 80,
        transform: "rotate(70 109 80)",
      },
      {
        size: config.suitSizes.SM,
        x: 113,
        y: 93,
        transform: "rotate(85 113 93)",
      },
      {
        size: config.suitSizes.SM,
        x: 113,
        y: 107,
        transform: "rotate(106 113 107)",
      },
      {
        size: config.suitSizes.SM,
        x: 107,
        y: 121,
        transform: "rotate(135 107 121)",
      },
    ],
  [`${suitConstants.SuitTypes.SPADES}_${rankConstants.RanksTypes.KING}` as const]:
    [
      defaultSuit,
      {
        size: config.suitSizes.SM,
        x: 50,
        y: 70,
        transform: "rotate(-12 50 70)",
      },
      {
        size: config.suitSizes.SM,
        x: 53.5,
        y: 86,
        transform: "rotate(-10 53.5 86)",
      },
      {
        size: config.suitSizes.SM,
        x: 90,
        y: 73,
        transform: "rotate(16 90 73)",
      },
      {
        size: config.suitSizes.SM,
        x: 85.5,
        y: 86,
        transform: "rotate(13 85.5 86)",
      },
    ],
};

const getCourtSuits = (courtCard: CourtCard): UseContent[] => {
  const suit = getCourtSuit(courtCard);

  return layouts[courtCard].map((options) => Suit.use(suit, options));
};

export default getCourtSuits;
