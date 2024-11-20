import { z } from "zod";

import attributes from "@/features/svg/schema/attributes";
import elements from "@/features/svg/schema/elements";

export type RectAttributes = z.infer<typeof elements.rect.attributes>;
export type RectWithIDContent = z.infer<typeof elements.rect.contentWithId>;
export type SVGContent = z.infer<typeof elements.svg.content>;
export type SVGElement = z.infer<typeof elements.svg.element>;
export type SymbolContent = z.infer<typeof elements.symbol.content>;
export type UseAttributes = z.infer<typeof elements.use.attributes>;
export type UseContent = z.infer<typeof elements.use.content>;

export default {
  attributes,
  elements,
};
