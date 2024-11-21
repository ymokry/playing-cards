import Suit, { type SuitType } from "@/features/suit";
import Rank, { type RankType } from "@/features/rank";
import Court, { type CourtCard } from "@/features/court";
import Rect, { constants as rectConstants } from "@/features/rect";
import { constants as resourceConstants } from "@/features/resources";
import { constants as svgConstants, type SVGContent } from "@/features/svg";

import { type LayoutElement } from "@/features/card/layout";
import accumulateElements from "@/features/card/utils/accumulateElements";

type Elements = Omit<
  SVGContent,
  | typeof svgConstants.attributesGroupName
  | typeof svgConstants.ElementNames.DEFS
>;

interface GetElementsOptions {
  initial?: boolean;
  suit: SuitType;
  rank: RankType;
}

const getElements = (
  elements: LayoutElement[],
  options: GetElementsOptions
): Elements => {
  const content: Elements = {
    ...(options.initial && {
      [svgConstants.ElementNames.USE]: Rect.use(rectConstants.RectTypes.OUTER),
    }),
  };

  elements.forEach((item) => {
    switch (item.type) {
      case resourceConstants.ResourceTypes.COURT: {
        accumulateElements(
          content,
          svgConstants.ElementNames.USE,
          Court.use(`${options.suit}_${options.rank}` as CourtCard, item)
        );

        break;
      }
      case resourceConstants.ResourceTypes.RANK: {
        accumulateElements(
          content,
          svgConstants.ElementNames.USE,
          Rank.use(options.rank, {
            ...item,
            [svgConstants.AttributeNames.STROKE]: Suit.getColorBySuit(
              options.suit
            ),
          })
        );

        break;
      }
      case resourceConstants.ResourceTypes.RECT: {
        accumulateElements(
          content,
          svgConstants.ElementNames.USE,
          Rect.use(rectConstants.RectTypes.INNER, item)
        );

        break;
      }
      case resourceConstants.ResourceTypes.SUIT: {
        accumulateElements(
          content,
          svgConstants.ElementNames.USE,
          Suit.use(options.suit, item)
        );

        break;
      }
      default: {
        break;
      }
    }
  });

  return content;
};

export default getElements;
