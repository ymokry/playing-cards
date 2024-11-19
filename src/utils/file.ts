import path from "node:path";
import type { BunFile } from "bun";
import { type constants as RankConstants } from "@/features/rank";
import { type constants as SuitConstants } from "@/features/suit";
import { type constants as CourtConstants } from "@/features/court";
import { type constants as PatternConstants } from "@/features/pattern";
import paths from "@/data/paths";

type GetAssetOptions =
  | { type: "suit"; suit: SuitConstants.SuitType }
  | { type: "rank"; rank: RankConstants.RankType }
  | { type: "court"; court: CourtConstants.CourtCard }
  | { type: "pattern"; pattern: PatternConstants.PatternType };

export const getAsset = (options: GetAssetOptions): BunFile => {
  let assetPath: string;

  switch (options.type) {
    case "suit": {
      assetPath = path.resolve(paths.assets, "suits", `${options.suit}.svg`);
      break;
    }
    case "rank": {
      assetPath = path.resolve(paths.assets, "ranks", `${options.rank}.svg`);
      break;
    }
    case "court": {
      assetPath = path.resolve(paths.assets, "courts", `${options.court}.svg`);
      break;
    }
    case "pattern": {
      assetPath = path.resolve(
        paths.assets,
        "patterns",
        `${options.pattern}.svg`
      );
      break;
    }
  }

  return Bun.file(assetPath, { type: "image/svg+xml" });
};
