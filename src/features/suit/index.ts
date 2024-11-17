import assert from "node:assert";
import { CardSuits, type CardSuit } from "@/data/constants";
import Svg, {
  constants as svgConstants,
  type schema as SVGSchema,
} from "@/features/svg";
import { getAsset } from "@/utils/file";
import { getColorBySuit } from "@/utils/palette";
import { getParsingErrorMessage } from "@/utils/schema";

import { SuitIDs } from "@/features/suit/data/constants";
import schema, {
  type SuitSVG,
  type SuitSymbol,
  type SuitUse,
} from "@/features/suit/schema";

export type SuitsRegistry = Map<CardSuit, Suit>;
type SuitUseOptions = Required<
  Pick<
    SVGSchema.UseAttributes,
    typeof svgConstants.AttributeNames.X | typeof svgConstants.AttributeNames.Y
  >
> &
  Pick<
    SVGSchema.UseAttributes,
    typeof svgConstants.AttributeNames.TRANSFORM
  > & { size: number };

class Suit {
  private readonly type: CardSuit;
  private resource: SuitSVG | null = null;

  static get registry(): SuitsRegistry {
    const registry = new Map<CardSuit, Suit>();

    Object.values(CardSuits).forEach((suit) => {
      registry.set(suit, new Suit(suit));
    });

    return registry;
  }

  static use(type: CardSuit, { size, ...attributes }: SuitUseOptions): SuitUse {
    const result = schema.use.safeParse({
      [svgConstants.attributesGroupName]: {
        [svgConstants.AttributeNames.XLINK_HREF]: `#${SuitIDs[type]}`,
        [svgConstants.AttributeNames.WIDTH]: size,
        [svgConstants.AttributeNames.HEIGHT]: size,
        ...attributes,
      },
    });

    assert(result.success, getParsingErrorMessage(result.error));

    return result.data;
  }

  constructor(type: CardSuit) {
    this.type = type;
  }

  async prepare(): Promise<void> {
    assert(!this.resource, "Should only be prepared once");

    const file = getAsset({ type: "suit", suit: this.type });
    const canRead = await file.exists();

    assert(canRead, `Cannot find ${file.name} asset`);

    const fileContent = await file.text();
    const svg = Svg.parse(fileContent);

    const result = schema.svg.safeParse(svg);

    assert(result.success, getParsingErrorMessage(result.error));

    this.resource = result.data;
  }

  get symbol(): SuitSymbol {
    assert(this.resource, "Must be prepared before use");

    const resourceContent = this.resource[svgConstants.ElementNames.SVG];
    const resourceAttributes =
      resourceContent[svgConstants.attributesGroupName];
    const resourcePathAttributes =
      resourceContent[svgConstants.ElementNames.PATH][
        svgConstants.attributesGroupName
      ];

    const result = schema.symbol.safeParse({
      [svgConstants.attributesGroupName]: {
        [svgConstants.AttributeNames.ID]: SuitIDs[this.type],
        [svgConstants.AttributeNames.VIEW_BOX]:
          resourceAttributes[svgConstants.AttributeNames.VIEW_BOX],
      },
      [svgConstants.ElementNames.PATH]: {
        [svgConstants.attributesGroupName]: {
          [svgConstants.AttributeNames.FILL]: getColorBySuit(this.type),
          [svgConstants.AttributeNames.D]:
            resourcePathAttributes[svgConstants.AttributeNames.D],
        },
      },
    });

    assert(result.success, getParsingErrorMessage(result.error));

    return result.data;
  }
}

export * as constants from "@/features/suit/data/constants";
export { default as schema, type SuitSymbol } from "@/features/suit/schema";

export default Suit;
