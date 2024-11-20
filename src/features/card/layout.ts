import config from "@/data/config";
import { type SuitUseOptions } from "@/features/suit";
import {
  constants as rankConstants,
  type RankType,
  type RankUseOptions,
} from "@/features/rank";
import { type CourtRank, type CourtUseOptions } from "@/features/court";
import { type RectUseOptions } from "@/features/rect";
import { type PatternRectOptions } from "@/features/pattern";
import { constants as resourceConstants } from "@/features/resources";
import { constants as svgConstants } from "@/features/svg";

export type LayoutElement =
  | ({ type: typeof resourceConstants.ResourceTypes.COURT } & CourtUseOptions)
  | ({ type: typeof resourceConstants.ResourceTypes.RANK } & Omit<
      RankUseOptions,
      typeof svgConstants.AttributeNames.FILL
    >)
  | ({ type: typeof resourceConstants.ResourceTypes.SUIT } & SuitUseOptions)
  | ({
      type: typeof resourceConstants.ResourceTypes.PATTERN;
    } & PatternRectOptions)
  | ({ type: typeof resourceConstants.ResourceTypes.RECT } & RectUseOptions);

export interface Layout {
  unique?: LayoutElement[];
  mirrored?: LayoutElement[];
}

export const signLayout: Readonly<Layout> = {
  mirrored: [
    {
      type: "rank",
      size: config.sign.rank.SIZE,
      x: config.sign.rank.X,
      y: config.sign.rank.Y,
    },
    {
      type: "suit",
      size: config.sign.suit.SIZE,
      x: config.sign.suit.X,
      y: config.sign.suit.Y,
    },
  ],
};

export const courtLayout: Readonly<Layout> = {
  mirrored: [
    { type: "court", x: config.content.MARGIN, y: config.content.MARGIN },
  ],
  unique: [
    { type: "rect", x: config.content.MARGIN, y: config.content.MARGIN },
  ],
};

export const numericLayouts: Readonly<
  Record<Exclude<RankType, CourtRank>, Layout>
> = {
  [rankConstants.RanksTypes.ACE]: {
    unique: [{ type: "suit", size: 120, x: 60, y: 108 }],
  },
  [rankConstants.RanksTypes.TWO]: {
    mirrored: [
      {
        type: "suit",
        size: config.numericContent.SIZE,
        x: config.numericContent.COLUMNS.MIDDLE,
        y: config.numericContent.ROWS.TOP,
      },
    ],
  },
  [rankConstants.RanksTypes.THREE]: {
    mirrored: [
      {
        type: "suit",
        size: config.numericContent.SIZE,
        x: config.numericContent.COLUMNS.MIDDLE,
        y: config.numericContent.ROWS.TOP,
      },
    ],
    unique: [
      {
        type: "suit",
        size: config.numericContent.SIZE,
        x: config.numericContent.COLUMNS.MIDDLE,
        y: config.numericContent.ROWS.BOTTOM,
      },
    ],
  },
  [rankConstants.RanksTypes.FOUR]: {
    mirrored: [
      {
        type: "suit",
        size: config.numericContent.SIZE,
        x: config.numericContent.COLUMNS.LEFT,
        y: config.numericContent.ROWS.TOP,
      },
      {
        type: "suit",
        size: config.numericContent.SIZE,
        x: config.numericContent.COLUMNS.RIGHT,
        y: config.numericContent.ROWS.TOP,
      },
    ],
  },
  [rankConstants.RanksTypes.FIVE]: {
    mirrored: [
      {
        type: "suit",
        size: config.numericContent.SIZE,
        x: config.numericContent.COLUMNS.LEFT,
        y: config.numericContent.ROWS.TOP,
      },
      {
        type: "suit",
        size: config.numericContent.SIZE,
        x: config.numericContent.COLUMNS.RIGHT,
        y: config.numericContent.ROWS.TOP,
      },
    ],
    unique: [
      {
        type: "suit",
        size: config.numericContent.SIZE,
        x: config.numericContent.COLUMNS.MIDDLE,
        y: config.numericContent.ROWS.BOTTOM,
      },
    ],
  },
  [rankConstants.RanksTypes.SIX]: {
    mirrored: [
      {
        type: "suit",
        size: config.numericContent.SIZE,
        x: config.numericContent.COLUMNS.LEFT,
        y: config.numericContent.ROWS.TOP,
      },
      {
        type: "suit",
        size: config.numericContent.SIZE,
        x: config.numericContent.COLUMNS.RIGHT,
        y: config.numericContent.ROWS.TOP,
      },
      {
        type: "suit",
        size: config.numericContent.SIZE,
        x: config.numericContent.COLUMNS.LEFT,
        y: config.numericContent.ROWS.BOTTOM,
      },
    ],
  },
  [rankConstants.RanksTypes.SEVEN]: {
    mirrored: [
      {
        type: "suit",
        size: config.numericContent.SIZE,
        x: config.numericContent.COLUMNS.LEFT,
        y: config.numericContent.ROWS.TOP,
      },
      {
        type: "suit",
        size: config.numericContent.SIZE,
        x: config.numericContent.COLUMNS.RIGHT,
        y: config.numericContent.ROWS.TOP,
      },
      {
        type: "suit",
        size: config.numericContent.SIZE,
        x: config.numericContent.COLUMNS.LEFT,
        y: config.numericContent.ROWS.BOTTOM,
      },
    ],
    unique: [
      {
        type: "suit",
        size: config.numericContent.SIZE,
        x: config.numericContent.COLUMNS.MIDDLE,
        y: config.numericContent.ROWS.CENTER,
      },
    ],
  },
  [rankConstants.RanksTypes.EIGHT]: {
    mirrored: [
      {
        type: "suit",
        size: config.numericContent.SIZE,
        x: config.numericContent.COLUMNS.LEFT,
        y: config.numericContent.ROWS.TOP,
      },
      {
        type: "suit",
        size: config.numericContent.SIZE,
        x: config.numericContent.COLUMNS.RIGHT,
        y: config.numericContent.ROWS.TOP,
      },
      {
        type: "suit",
        size: config.numericContent.SIZE,
        x: config.numericContent.COLUMNS.LEFT,
        y: config.numericContent.ROWS.BOTTOM,
      },
      {
        type: "suit",
        size: config.numericContent.SIZE,
        x: config.numericContent.COLUMNS.MIDDLE,
        y: config.numericContent.ROWS.CENTER,
      },
    ],
  },
  [rankConstants.RanksTypes.NINE]: {
    mirrored: [
      {
        type: "suit",
        size: config.numericContent.SIZE,
        x: config.numericContent.COLUMNS.LEFT,
        y: config.numericContent.ROWS.TOP,
      },
      {
        type: "suit",
        size: config.numericContent.SIZE,
        x: config.numericContent.COLUMNS.RIGHT,
        y: config.numericContent.ROWS.TOP,
      },
      {
        type: "suit",
        size: config.numericContent.SIZE,
        x: config.numericContent.COLUMNS.LEFT,
        y: config.numericContent.ROWS.CENTER_BOTTOM,
      },
      {
        type: "suit",
        size: config.numericContent.SIZE,
        x: config.numericContent.COLUMNS.RIGHT,
        y: config.numericContent.ROWS.CENTER_BOTTOM,
      },
    ],
    unique: [
      {
        type: "suit",
        size: config.numericContent.SIZE,
        x: config.numericContent.COLUMNS.MIDDLE,
        y: config.numericContent.ROWS.BOTTOM,
      },
    ],
  },
  [rankConstants.RanksTypes.TEN]: {
    mirrored: [
      {
        type: "suit",
        size: config.numericContent.SIZE,
        x: config.numericContent.COLUMNS.LEFT,
        y: config.numericContent.ROWS.TOP,
      },
      {
        type: "suit",
        size: config.numericContent.SIZE,
        x: config.numericContent.COLUMNS.RIGHT,
        y: config.numericContent.ROWS.TOP,
      },
      {
        type: "suit",
        size: config.numericContent.SIZE,
        x: config.numericContent.COLUMNS.LEFT,
        y: config.numericContent.ROWS.CENTER_BOTTOM,
      },
      {
        type: "suit",
        size: config.numericContent.SIZE,
        x: config.numericContent.COLUMNS.RIGHT,
        y: config.numericContent.ROWS.CENTER_BOTTOM,
      },
      {
        type: "suit",
        size: config.numericContent.SIZE,
        x: config.numericContent.COLUMNS.MIDDLE,
        y: config.numericContent.ROWS.CENTER_TOP,
      },
    ],
  },
};
