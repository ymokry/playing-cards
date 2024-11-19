import { SuitTypes } from "@/features/suit/data/constants";

export type SuitType = (typeof SuitTypes)[keyof typeof SuitTypes];
