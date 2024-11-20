import { XMLParser, XMLBuilder, type X2jOptions } from "fast-xml-parser";
import assert from "node:assert";
import { getParsingErrorMessage } from "@/utils/schema";

import {
  attributesGroupName,
  ElementNames,
} from "@/features/svg/data/constants";
import schema, { type SVGElement } from "@/features/svg/schema";

type SVGOptions = Required<
  Pick<
    X2jOptions,
    | "ignoreAttributes"
    | "attributesGroupName"
    | "attributeNamePrefix"
    | "unpairedTags"
  >
>;

const options: Readonly<SVGOptions> = {
  attributesGroupName,
  ignoreAttributes: false,
  attributeNamePrefix: "",
  unpairedTags: [ElementNames.PATH, ElementNames.RECT, ElementNames.USE],
};

const parser = new XMLParser(options);
const builder = new XMLBuilder({ suppressUnpairedNode: false, ...options });

export * as constants from "@/features/svg/data/constants";
export {
  default as schema,
  type RectAttributes,
  type RectWithIDContent,
  type SVGContent,
  type SVGElement,
  type SymbolContent,
  type UseAttributes,
  type UseContent,
} from "@/features/svg/schema";

export default {
  parse: (input: string): SVGElement => {
    const content = parser.parse(input);
    const result = schema.elements[ElementNames.SVG].element.safeParse(content);

    assert(result.success, getParsingErrorMessage(result.error));

    return result.data;
  },
  stringify: (input: SVGElement): string => {
    const result = schema.elements[ElementNames.SVG].element.safeParse(input);

    assert(result.success, getParsingErrorMessage(result.error));

    return builder.build(result.data);
  },
};
