import { Palette, type Color } from "@/data/constants";
import { type constants as SuitConstants } from "@/features/suit";
import { isRedSuit } from "@/utils/suit";

export const getColorBySuit = (suit: SuitConstants.SuitType): Color =>
  isRedSuit(suit) ? Palette.RED : Palette.BLACK;
