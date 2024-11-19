import { RanksTypes } from "@/features/rank/data/constants";

export type RankType = (typeof RanksTypes)[keyof typeof RanksTypes];
