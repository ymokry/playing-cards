import assert from "node:assert";
import config from "@/data/config";
import { Palette } from "@/data/constants";
import { constants as svgConstants, type UseAttributes } from "@/features/svg";
import { getParsingErrorMessage } from "@/utils/schema";

import { RectIDs, RectTypes } from "@/features/rect/data/constants";
import schema, { type RectUse, type RectDef } from "@/features/rect/schema";
import { type RectType } from "@/features/rect/types";

export type RectsRegistry = Map<RectType, Rect>;
export type RectUseOptions = Pick<
  UseAttributes,
  typeof svgConstants.AttributeNames.X | typeof svgConstants.AttributeNames.Y
>;

class Rect {
  private readonly type: RectType;

  static get registry(): RectsRegistry {
    const registry = new Map<RectType, Rect>();

    Object.values(RectTypes).forEach((rect) => {
      registry.set(rect, new Rect(rect));
    });

    return registry;
  }

  static use(type: RectType, attributes: RectUseOptions = {}): RectUse {
    const result = schema.use.safeParse({
      [svgConstants.attributesGroupName]: {
        [svgConstants.AttributeNames.XLINK_HREF]: `#${RectIDs[type]}`,
        ...attributes,
      },
    });

    assert(result.success, getParsingErrorMessage(result.error));

    return result.data;
  }

  constructor(type: RectType) {
    this.type = type;
  }

  get rect(): RectDef {
    const attributes =
      this.type === RectTypes.INNER
        ? {
            [svgConstants.AttributeNames.WIDTH]: config.content.WIDTH,
            [svgConstants.AttributeNames.HEIGHT]: config.content.HEIGHT,
            [svgConstants.AttributeNames.STROKE]: Palette.BLACK,
            [svgConstants.AttributeNames.FILL]: Palette.NONE,
          }
        : {
            [svgConstants.AttributeNames.WIDTH]: config.card.WIDTH,
            [svgConstants.AttributeNames.HEIGHT]: config.card.HEIGHT,
            [svgConstants.AttributeNames.RX]: config.card.RADIUS,
            [svgConstants.AttributeNames.RY]: config.card.RADIUS,
            [svgConstants.AttributeNames.FILL]:
              this.type === RectTypes.OUTER ? Palette.WHITE : Palette.RED,
          };

    const result = schema.rect.safeParse({
      [svgConstants.attributesGroupName]: {
        [svgConstants.AttributeNames.ID]: RectIDs[this.type],
        ...attributes,
      },
    });

    assert(result.success, getParsingErrorMessage(result.error));

    return result.data;
  }
}

export * as constants from "@/features/rect/data/constants";
export * from "@/features/rect/types";
export { default as schema, type RectDef } from "@/features/rect/schema";

export default Rect;
