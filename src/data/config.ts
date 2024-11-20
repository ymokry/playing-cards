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
  LG: GAP * GAP,
  MD: GAP,
} as const;

const signRank = {
  SIZE: (PPI / 3) * 2,
  X: SAFE_ZONE_OFFSET - gaps.MD,
  Y: SAFE_ZONE_OFFSET,
} as const;

const signSuit = {
  SIZE: suitSizes.MD,
  X: SAFE_ZONE_OFFSET,
  Y: SAFE_ZONE_OFFSET + signRank.SIZE + gaps.MD,
} as const;

const numericContent = {
  SIZE: suitSizes.LG,
  ACE: {
    SIZE: suitSizes.LG * 3,
    X: CONTENT_OFFSET,
    Y: CONTENT_OFFSET * 2,
  },
  COLUMNS: {
    LEFT: content.MARGIN,
    MIDDLE: content.MARGIN + suitSizes.LG,
    RIGHT: content.MARGIN + suitSizes.LG * 2,
  },
  ROWS: {
    TOP: content.MARGIN,
    CENTER_TOP: content.MARGIN + suitSizes.LG - gaps.LG,
    CENTER: content.MARGIN + suitSizes.LG,
    CENTER_BOTTOM: content.MARGIN + suitSizes.LG + gaps.LG,
    BOTTOM: content.MARGIN + suitSizes.LG * 2,
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
