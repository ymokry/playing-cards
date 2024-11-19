import { type SuitType } from "@/features/suit";

import { CourtRanks } from "@/features/court/data/constants";

export type CourtRank = (typeof CourtRanks)[number];

export type CourtCard = `${SuitType}_${CourtRank}`;
