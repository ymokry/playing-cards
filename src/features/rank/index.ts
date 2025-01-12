import assert from "node:assert";
import { Palette } from "@/data/constants";
import Svg, {
  constants as svgConstants,
  type UseAttributes,
} from "@/features/svg";
import { getAsset } from "@/utils/file";
import { getParsingErrorMessage } from "@/utils/schema";

import { RankIDs, RanksTypes } from "@/features/rank/data/constants";
import schema, {
  type RankSVG,
  type RankSymbol,
  type RankUse,
} from "@/features/rank/schema";
import removeDefaultRankStroke from "@/features/rank/utils/removeDefaultRankStroke";
import { type RankType } from "@/features/rank/types";

export type RanksRegistry = Map<RankType, Rank>;
export type RankUseOptions = Required<
  Pick<
    UseAttributes,
    | typeof svgConstants.AttributeNames.X
    | typeof svgConstants.AttributeNames.Y
    | typeof svgConstants.AttributeNames.STROKE
  >
> & { size: number };

class Rank {
  private readonly type: RankType;
  private resource: RankSVG | null = null;

  static get registry(): RanksRegistry {
    const registry = new Map<RankType, Rank>();

    Object.values(RanksTypes).forEach((rank) => {
      registry.set(rank, new Rank(rank));
    });

    return registry;
  }

  static use(type: RankType, { size, ...attributes }: RankUseOptions): RankUse {
    const result = schema.use.safeParse({
      [svgConstants.attributesGroupName]: {
        [svgConstants.AttributeNames.XLINK_HREF]: `#${RankIDs[type]}`,
        [svgConstants.AttributeNames.WIDTH]: size,
        [svgConstants.AttributeNames.HEIGHT]: size,
        ...attributes,
      },
    });

    assert(result.success, getParsingErrorMessage(result.error));

    return result.data;
  }

  constructor(type: RankType) {
    this.type = type;
  }

  async prepare(): Promise<void> {
    assert(!this.resource, "Should only be prepared once");

    const file = getAsset({ type: "rank", rank: this.type });
    const canRead = await file.exists();

    assert(canRead, `Cannot find ${file.name} asset`);

    const fileContent = await file.text();
    const svg = Svg.parse(removeDefaultRankStroke(fileContent));

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
        [svgConstants.AttributeNames.FILL]: Palette.NONE,
        [svgConstants.AttributeNames.PRESERVE_ASPECT_RATIO]:
          svgConstants.AspectRatios.MIN_MID,
      },
      [svgConstants.ElementNames.PATH]: {
        [svgConstants.attributesGroupName]: {
          [svgConstants.AttributeNames.D]:
            resourcePathAttributes[svgConstants.AttributeNames.D],
          [svgConstants.AttributeNames.STROKE_LINECAP]:
            resourcePathAttributes[svgConstants.AttributeNames.STROKE_LINECAP],
          [svgConstants.AttributeNames.STROKE_WIDTH]:
            resourcePathAttributes[svgConstants.AttributeNames.STROKE_WIDTH],
        },
      },
    });

    assert(result.success, getParsingErrorMessage(result.error));

    return result.data;
  }
}

export * as constants from "@/features/rank/data/constants";
export * from "@/features/rank/types";
export { default as schema, type RankSymbol } from "@/features/rank/schema";

export default Rank;
