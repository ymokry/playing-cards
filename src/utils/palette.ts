import { Palette, type Color, type CardSuit } from "@/data/constants";
import { isRedSuit } from "@/utils/suit";

export const getColorBySuit = (suit: CardSuit): Color =>
  isRedSuit(suit) ? Palette.RED : Palette.BLACK;
