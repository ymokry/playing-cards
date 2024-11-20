import config from "@/data/config";
import { type SuitType } from "@/features/suit";
import { type RankType } from "@/features/rank";
import Court from "@/features/court";
import Rect, { constants as rectConstants } from "@/features/rect";
import Pattern, { constants as patternConstants } from "@/features/pattern";
import Resources from "@/features/resources";
import SVG, {
  constants as svgConstants,
  type SVGElement,
  type SymbolContent,
  type RectWithIDContent,
} from "@/features/svg";

import {
  CardTypes,
  type CardType,
  ROOT_ATTRIBUTES,
  GROUP_ID,
} from "@/features/card/data/constants";
import {
  type Layout,
  courtLayout,
  signLayout,
  numericLayouts,
} from "@/features/card/layout";
import getComposedLayout from "@/features/card/utils/getComposedLayout";
import accumulateElements from "@/features/card/utils/accumulateElements";
import getElements from "@/features/card/utils/getElements";

interface PlayingCardDefs {
  symbols: [SymbolContent, ...SymbolContent[]];
  rects: [RectWithIDContent, ...RectWithIDContent[]];
}

const getPlayingCard = (suit: SuitType, rank: RankType): SVGElement => {
  const defs: PlayingCardDefs = {
    symbols: [Resources.getRank(rank), Resources.getSuit(suit)],
    rects: [Resources.getRect(rectConstants.RectTypes.OUTER)],
  };

  let layout: Required<Layout>;

  if (Court.isCourtRank(rank)) {
    defs.symbols.push(Resources.getCourt(`${suit}_${rank}`));
    defs.rects.push(Resources.getRect(rectConstants.RectTypes.INNER));

    layout = getComposedLayout(signLayout, courtLayout);
  } else {
    layout = getComposedLayout(signLayout, numericLayouts[rank]);
  }

  const elements = getElements(layout.unique, { initial: true, suit, rank });

  accumulateElements(elements, svgConstants.ElementNames.G, {
    [svgConstants.attributesGroupName]: {
      [svgConstants.AttributeNames.ID]: GROUP_ID,
    },
    ...getElements(layout.mirrored, { suit, rank }),
  });

  accumulateElements(elements, svgConstants.ElementNames.USE, {
    [svgConstants.attributesGroupName]: {
      [svgConstants.AttributeNames.XLINK_HREF]: `#${GROUP_ID}`,
      [svgConstants.AttributeNames.TRANSFORM]:
        `rotate(180 ${config.card.WIDTH / 2} ${config.card.HEIGHT / 2})`,
    },
  });

  return {
    [svgConstants.ElementNames.SVG]: {
      [svgConstants.attributesGroupName]: ROOT_ATTRIBUTES,
      [svgConstants.ElementNames.DEFS]: {
        [svgConstants.ElementNames.RECT]: defs.rects,
        [svgConstants.ElementNames.SYMBOL]: defs.symbols,
      },
      ...elements,
    },
  };
};

const getBackCard = (): SVGElement => ({
  [svgConstants.ElementNames.SVG]: {
    [svgConstants.attributesGroupName]: ROOT_ATTRIBUTES,
    [svgConstants.ElementNames.DEFS]: {
      [svgConstants.ElementNames.RECT]: Resources.getRect(
        rectConstants.RectTypes.OUTER
      ),
      [svgConstants.ElementNames.PATTERN]: Resources.getPattern(
        patternConstants.PatternTypes.BACK
      ),
    },
    [svgConstants.ElementNames.USE]: Rect.use(rectConstants.RectTypes.OUTER),
    [svgConstants.ElementNames.RECT]: Pattern.use(
      patternConstants.PatternTypes.BACK,
      {
        height: config.safeZone.HEIGHT,
        width: config.safeZone.WIDTH,
        x: config.safeZone.MARGIN,
        y: config.safeZone.MARGIN,
        radius: config.card.RADIUS,
      }
    ),
  },
});

const getCutCard = (): SVGElement => ({
  [svgConstants.ElementNames.SVG]: {
    [svgConstants.attributesGroupName]: ROOT_ATTRIBUTES,
    [svgConstants.ElementNames.DEFS]: {
      [svgConstants.ElementNames.RECT]: Resources.getRect(
        rectConstants.RectTypes.CUT
      ),
    },
    [svgConstants.ElementNames.USE]: Rect.use(rectConstants.RectTypes.CUT),
  },
});

type GetCardOptions =
  | { type: Exclude<CardType, typeof CardTypes.PLAYING> }
  | { type: typeof CardTypes.PLAYING; suit: SuitType; rank: RankType };

export default {
  get: (options: GetCardOptions) => {
    let layout: SVGElement;

    switch (options.type) {
      case CardTypes.PLAYING: {
        layout = getPlayingCard(options.suit, options.rank);
        break;
      }
      case CardTypes.BACK: {
        layout = getBackCard();
        break;
      }
      case CardTypes.CUT: {
        layout = getCutCard();
        break;
      }
    }

    return SVG.stringify(layout);
  },
};
