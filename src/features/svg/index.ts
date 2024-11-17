import { XMLParser, XMLBuilder, type X2jOptions } from "fast-xml-parser";
import assert from "node:assert";
import { getParsingErrorMessage } from "@/utils/schema";

import {
  attributesGroupName,
  ElementNames,
} from "@/features/svg/data/constants";
import { elements, type SVGElement } from "@/features/svg/schema";

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
    const result = elements[ElementNames.SVG].element.safeParse(content);

    assert(result.success, getParsingErrorMessage(result.error));

    return result.data;
  }

  stringify(input: SVGElement): string {
    return this.builder.build(input);
  }
}

export * as constants from "@/features/svg/data/constants";
export * as schema from "@/features/svg/schema";

export default new SVG();
