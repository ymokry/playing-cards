import assert from "node:assert";
import { CardRanks, type CardRank } from "@/data/constants";
import Svg, { constants as svgConstants } from "@/features/svg";
import { getAsset } from "@/utils/file";
import { getParsingErrorMessage } from "@/utils/schema";

import { RankIDs } from "@/features/rank/data/constants";
import schema, { type RankSVG, type RankSymbol } from "@/features/rank/schema";

export type RanksRegistry = Map<CardRank, Rank>;

class Rank {
  private readonly type: CardRank;
  private resource: RankSVG | null = null;

  static get registry(): RanksRegistry {
    const registry = new Map<CardRank, Rank>();

    Object.values(CardRanks).forEach((rank) => {
      registry.set(rank, new Rank(rank));
    });

    return registry;
  }

  constructor(type: CardRank) {
    this.type = type;
  }

  async prepare(): Promise<void> {
    assert(!this.resource, "Should only be prepared once");

    const file = getAsset({ type: "rank", rank: this.type });
    const canRead = await file.exists();

    assert(canRead, `Cannot find ${file.name} asset`);

    const fileContent = await file.text();
    const svg = Svg.parse(fileContent);

    const result = schema.svg.safeParse(svg);

    assert(result.success, getParsingErrorMessage(result.error));

    this.resource = result.data;
  }

  get symbol(): RankSymbol {
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
        [svgConstants.AttributeNames.ID]: RankIDs[this.type],
        [svgConstants.AttributeNames.VIEW_BOX]:
          resourceAttributes[svgConstants.AttributeNames.VIEW_BOX],
        [svgConstants.AttributeNames.PRESERVE_ASPECT_RATIO]:
          svgConstants.AspectRatios.MIN_MID,
      },
      [svgConstants.ElementNames.PATH]: {
        [svgConstants.attributesGroupName]: {
          [svgConstants.AttributeNames.D]:
            resourcePathAttributes[svgConstants.AttributeNames.D],
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

export * as constants from "@/features/rank/data/constants";
export { default as schema, type RankSymbol } from "@/features/rank/schema";

export default Rank;
