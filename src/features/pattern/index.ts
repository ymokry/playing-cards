import assert from "node:assert";
import { Palette } from "@/data/constants";
import Svg, {
  constants as svgConstants,
  type RectAttributes,
} from "@/features/svg";
import { getAsset } from "@/utils/file";
import { getParsingErrorMessage } from "@/utils/schema";

import { PatternIDs, PatternTypes } from "@/features/pattern/data/constants";
import schema, {
  type PatternSVG,
  type PatternDef,
  type PatternRect,
} from "@/features/pattern/schema";
import { type PatternType } from "@/features/pattern/types";

export type PatternRegistry = Map<PatternType, Pattern>;
export type PatternRectOptions = Required<
  Pick<
    RectAttributes,
    | typeof svgConstants.AttributeNames.WIDTH
    | typeof svgConstants.AttributeNames.HEIGHT
    | typeof svgConstants.AttributeNames.X
    | typeof svgConstants.AttributeNames.Y
  >
> & { radius?: number };

class Pattern {
  private readonly type: PatternType;
  private resource: PatternSVG | null = null;

  static get registry(): PatternRegistry {
    const registry = new Map<PatternType, Pattern>();

    Object.values(PatternTypes).forEach((pattern) => {
      registry.set(pattern, new Pattern(pattern));
    });

    return registry;
  }

  static use(
    type: PatternType,
    { radius, ...attributes }: PatternRectOptions
  ): PatternRect {
    const result = schema.rect.safeParse({
      [svgConstants.attributesGroupName]: {
        [svgConstants.AttributeNames.FILL]: `url(#${PatternIDs[type]})`,
        ...attributes,
        ...(Boolean(radius) && {
          [svgConstants.AttributeNames.RX]: radius,
          [svgConstants.AttributeNames.RY]: radius,
        }),
      },
    });

    assert(result.success, getParsingErrorMessage(result.error));

    return result.data;
  }

  constructor(type: PatternType) {
    this.type = type;
  }

  async prepare(): Promise<void> {
    assert(!this.resource, "Should only be prepared once");

    const file = getAsset({ type: "pattern", pattern: this.type });
    const canRead = await file.exists();

    assert(canRead, `Cannot find ${file.name} asset`);

    const fileContent = await file.text();
    const svg = Svg.parse(fileContent);

    const result = schema.svg.safeParse(svg);

    assert(result.success, getParsingErrorMessage(result.error));

    this.resource = result.data;
  }

  get pattern(): PatternDef {
    assert(this.resource, "Must be prepared before use");

    const resourceContent = this.resource[svgConstants.ElementNames.SVG];
    const resourceAttributes =
      resourceContent[svgConstants.attributesGroupName];
    const resourcePathAttributes =
      resourceContent[svgConstants.ElementNames.PATH][
        svgConstants.attributesGroupName
      ];

    const result = schema.pattern.safeParse({
      [svgConstants.attributesGroupName]: {
        [svgConstants.AttributeNames.ID]: PatternIDs[this.type],
        [svgConstants.AttributeNames.WIDTH]:
          resourceAttributes[svgConstants.AttributeNames.WIDTH],
        [svgConstants.AttributeNames.HEIGHT]:
          resourceAttributes[svgConstants.AttributeNames.HEIGHT],
        [svgConstants.AttributeNames.PATTERN_UNITS]:
          svgConstants.PatternUnits.USER_SPACE,
      },
      [svgConstants.ElementNames.PATH]: {
        [svgConstants.attributesGroupName]: {
          [svgConstants.AttributeNames.D]:
            resourcePathAttributes[svgConstants.AttributeNames.D],
          [svgConstants.AttributeNames.FILL]: Palette.RED,
          ...(resourcePathAttributes[svgConstants.AttributeNames.FILL_RULE] && {
            [svgConstants.AttributeNames.FILL_RULE]:
              resourcePathAttributes[svgConstants.AttributeNames.FILL_RULE],
          }),
        },
      },
    });

    assert(result.success, getParsingErrorMessage(result.error));

    return result.data;
  }
}

export * as constants from "@/features/pattern/data/constants";
export * from "@/features/pattern/types";
export { default as schema, type PatternDef } from "@/features/pattern/schema";

export default Pattern;
