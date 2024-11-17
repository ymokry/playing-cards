import assert from "node:assert";
import { type CardSuit } from "@/data/constants";
import Svg, {
  schema as svgSchema,
  constants as svgConstants,
} from "@/features/svg";
import { getAsset } from "@/utils/file";
import { getColorBySuit } from "@/utils/palette";
import { getParsingErrorMessage } from "@/utils/schema";

import { SuitIDs } from "@/features/suit/data/constants";
import schema, { type SuitSVG, type SuitSymbol } from "@/features/suit/schema";

class Suit {
  private readonly type: CardSuit;
  private resource: SuitSVG | null = null;

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
      [svgConstants.ElementNames.SYMBOL]: {
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
      },
    });

    assert(result.success, getParsingErrorMessage(result.error));

    return result.data;
  }
}

export * as constants from "@/features/suit/data/constants";
export { default as schema, type SuitSymbol } from "@/features/suit/schema";

export default Suit;