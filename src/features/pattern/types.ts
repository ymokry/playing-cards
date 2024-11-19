import { PatternTypes } from "@/features/pattern/data/constants";

export type PatternType = (typeof PatternTypes)[keyof typeof PatternTypes];
