import path from "node:path";
import type { BunFile } from "bun";
import {
  type CardSuit,
  type CardRank,
  type CourtCard,
  type PatternType,
} from "@/data/constants";
import paths from "@/data/paths";

type GetAssetOptions =
  | { type: "suit"; suit: CardSuit }
  | { type: "rank"; rank: CardRank }
  | { type: "court"; court: CourtCard }
  | { type: "pattern"; pattern: PatternType };

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
