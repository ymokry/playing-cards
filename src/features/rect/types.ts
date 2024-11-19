import { RectTypes } from "@/features/rect/data/constants";

export type RectType = (typeof RectTypes)[keyof typeof RectTypes];
