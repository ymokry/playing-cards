import assert from "node:assert";
import {
  CardSuits,
  type CardRank,
  CourtRanks,
  type CourtRank,
  type CourtCard,
} from "@/data/constants";
import Svg, {
  constants as svgConstants,
  type schema as SVGSchema,
} from "@/features/svg";
import { getAsset } from "@/utils/file";
import { getParsingErrorMessage } from "@/utils/schema";

import { CourtIDs } from "@/features/court/data/constants";
import schema, {
  type CourtSVG,
  type CourtSymbol,
  type CourtUse,
} from "@/features/court/schema";
import setCourtColor from "@/features/court/utils/setCourtColor";

export type CourtsRegistry = Map<CourtCard, Court>;
type RankUseOptions = Required<
  Pick<
    SVGSchema.UseAttributes,
    typeof svgConstants.AttributeNames.X | typeof svgConstants.AttributeNames.Y
  >
>;

class Court {
  private readonly type: CourtCard;
  private resource: CourtSVG | null = null;

  static get registry(): CourtsRegistry {
    const registry = new Map<CourtCard, Court>();

    Object.values(CardSuits).forEach((suit) => {
      CourtRanks.forEach((rank) => {
        const court = `${suit}_${rank}` as const;

        registry.set(court, new Court(court));
      });
    });

    return registry;
  }

  static use(type: CourtCard, options: RankUseOptions): CourtUse {
    const result = schema.use.safeParse({
      [svgConstants.attributesGroupName]: {
        [svgConstants.AttributeNames.XLINK_HREF]: `#${CourtIDs[type]}`,
        ...options,
      },
    });

    assert(result.success, getParsingErrorMessage(result.error));

    return result.data;
  }

  static isCourtRank(type: CardRank): boolean {
    return CourtRanks.includes(type as CourtRank);
  }

  constructor(type: CourtCard) {
    this.type = type;
  }

  async prepare(): Promise<void> {
    assert(!this.resource, "Should only be prepared once");

    const file = getAsset({ type: "court", court: this.type });
    const canRead = await file.exists();

    assert(canRead, `Cannot find ${file.name} asset`);

    const fileContent = await file.text();
    const svg = Svg.parse(setCourtColor(fileContent));

    const result = schema.svg.safeParse(svg);

    assert(result.success, getParsingErrorMessage(result.error));

    this.resource = result.data;
  }

  get symbol(): CourtSymbol {
    assert(this.resource, "Must be prepared before use");

    const resourceContent = this.resource[svgConstants.ElementNames.SVG];
    const {
      [svgConstants.AttributeNames.XMLNS]: _drop,
      ...resourceAttributes
    } = resourceContent[svgConstants.attributesGroupName];

    const result = schema.symbol.safeParse({
      [svgConstants.attributesGroupName]: {
        [svgConstants.AttributeNames.ID]: CourtIDs[this.type],
        ...resourceAttributes,
      },
      [svgConstants.ElementNames.PATH]:
        resourceContent[svgConstants.ElementNames.PATH],
    });

    assert(result.success, getParsingErrorMessage(result.error));

    return result.data;
  }
}

export * as constants from "@/features/court/data/constants";
export { default as schema, type CourtSymbol } from "@/features/court/schema";

export default Court;
