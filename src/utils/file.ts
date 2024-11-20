import path from "node:path";
import { $, type BunFile } from "bun";
import { type RankType } from "@/features/rank";
import { type SuitType } from "@/features/suit";
import { type CourtCard } from "@/features/court";
import { type PatternType } from "@/features/pattern";
import paths from "@/data/paths";

type GetAssetOptions =
  | { type: "suit"; suit: SuitType }
  | { type: "rank"; rank: RankType }
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

export const prepareDist = async () => {
  await $`rm -rf ${paths.dist}`;

  return $`mkdir ${paths.dist}`;
};

export const saveCard = (
  cardName: string,
  cardContent: string
): Promise<number> => {
  const file = Bun.file(path.resolve(paths.dist, `${cardName}.svg`), {
    type: "image/svg+xml",
  });

  return Bun.write(file, cardContent);
};
