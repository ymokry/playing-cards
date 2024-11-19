import { z } from "zod";

import attributes from "@/features/svg/schema/attributes";
import elements from "@/features/svg/schema/elements";

export type SVGElement = z.infer<typeof elements.svg.element>;
export type UseAttributes = z.infer<typeof elements.use.attributes>;
export type RectAttributes = z.infer<typeof elements.rect.attributes>;
export type SymbolContent = z.infer<typeof elements.symbol.content>;
export type RectWithIDContent = z.infer<typeof elements.rect.contentWithId>;

export default {
  attributes,
  elements,
};
