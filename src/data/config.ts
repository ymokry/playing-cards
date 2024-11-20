/* 
  Standard card size is 2.5" / 3.5", with 96 PPI it's 240px / 336px
  to avoid fractional values, the dimensions will be increased by 2,
  with a respective reduction of the PPI.

  Result:
    Size: 5" / 7x
    PPI: 48
    Size (px): 240px / 336px
*/
const PPI = 48;

const card = {
  WIDTH: PPI * 5,
  HEIGHT: PPI * 7,
  RADIUS: PPI / 4,
} as const;

const SAFE_ZONE_OFFSET = PPI / 4;
const safeZone = {
  WIDTH: card.WIDTH - SAFE_ZONE_OFFSET * 2,
  HEIGHT: card.HEIGHT - SAFE_ZONE_OFFSET * 2,
  MARGIN: SAFE_ZONE_OFFSET,
} as const;

const CONTENT_OFFSET = PPI;
const content = {
  WIDTH: card.WIDTH - CONTENT_OFFSET * 2,
  HEIGHT: card.WIDTH - CONTENT_OFFSET * 2,
  MARGIN: CONTENT_OFFSET,
} as const;

const suitSizes = {
  LG: PPI,
  MD: PPI / 2,
  SM: PPI / 4,
  XS: PPI / 8,
} as const;

const GAP = PPI / SAFE_ZONE_OFFSET;
const gaps = {
  LG: GAP * 8,
  MD: GAP * 6,
  XM: GAP * 4,
  XS: GAP,
} as const;

const signRank = {
  SIZE: (PPI / 3) * 2,
  X: SAFE_ZONE_OFFSET - GAP,
  Y: SAFE_ZONE_OFFSET,
} as const;

const signSuit = {
  SIZE: suitSizes.MD,
  X: SAFE_ZONE_OFFSET,
  Y: SAFE_ZONE_OFFSET + signRank.SIZE + GAP,
} as const;

const CENTER_ROW = content.MARGIN + suitSizes.LG * 2;
const BOTTOM_ROW = content.MARGIN + suitSizes.LG * 4;
const numericContent = {
  SIZE: suitSizes.LG,
  ACE: suitSizes.LG * 3,
  COLUMNS: {
    LEFT: content.MARGIN,
    MIDDLE: content.MARGIN + suitSizes.LG,
    RIGHT: content.MARGIN + suitSizes.LG * 2,
  },
  ROWS: {
    TOP: content.MARGIN,
    TOP_CENTER: content.MARGIN + gaps.LG,
    TOP_BOTTOM: content.MARGIN + suitSizes.LG,
    CENTER_TOP: CENTER_ROW - gaps.LG,
    CENTER: CENTER_ROW,
    CENTER_BOTTOM: CENTER_ROW + gaps.LG,
    BOTTOM_TOP: content.MARGIN + suitSizes.LG * 3,
    BOTTOM_CENTER: BOTTOM_ROW - gaps.LG,
    BOTTOM: BOTTOM_ROW,
  },
} as const;

export default {
  card,
  safeZone,
  content,
  suitSizes,
  sign: { rank: signRank, suit: signSuit },
  numericContent,
};
