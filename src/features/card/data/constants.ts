import config from "@/data/config";
import { constants as svgConstants } from "@/features/svg";

export const CardTypes = {
  PLAYING: "playing",
  BACK: "back",
  CUT: "cut",
} as const;
export type CardType = (typeof CardTypes)[keyof typeof CardTypes];

export const ROOT_ATTRIBUTES = {
  [svgConstants.AttributeNames.XMLNS]:
    svgConstants.AttributeDefaults[svgConstants.AttributeNames.XMLNS],
  [svgConstants.AttributeNames.XMLNS_XLINK]:
    svgConstants.AttributeDefaults[svgConstants.AttributeNames.XMLNS_XLINK],
  [svgConstants.AttributeNames.VIEW_BOX]:
    `0 0 ${config.card.WIDTH} ${config.card.HEIGHT}`,
} as const;

export const GROUP_ID = "g";
