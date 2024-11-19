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

class SVG {
  private readonly parser: XMLParser;
  private readonly builder: XMLBuilder;

  constructor() {
    const options: SVGOptions = {
      attributesGroupName,
      ignoreAttributes: false,
      attributeNamePrefix: "",
      unpairedTags: [ElementNames.PATH, ElementNames.RECT, ElementNames.USE],
    };

    this.parser = new XMLParser(options);
    this.builder = new XMLBuilder({ suppressUnpairedNode: false, ...options });
  }

  parse(input: string): SVGElement {
    const content = this.parser.parse(input);
    const result = schema.elements[ElementNames.SVG].element.safeParse(content);

    assert(result.success, getParsingErrorMessage(result.error));

    return result.data;
  }

  stringify(input: SVGElement): string {
    const result = schema.elements[ElementNames.SVG].element.safeParse(input);

    assert(result.success, getParsingErrorMessage(result.error));

    return this.builder.build(result.data);
  }
}

export * as constants from "@/features/svg/data/constants";
export {
  default as schema,
  type RectAttributes,
  type UseAttributes,
} from "@/features/svg/schema";

export default new SVG();
