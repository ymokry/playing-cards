import { Palette, type Color } from "@/data/constants";
import { type SuitType } from "@/features/suit";
import { isRedSuit } from "@/utils/suit";

export const getColorBySuit = (suit: SuitType): Color =>
  isRedSuit(suit) ? Palette.RED : Palette.BLACK;
