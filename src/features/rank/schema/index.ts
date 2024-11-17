import { z } from "zod";
import { schema, constants } from "@/features/svg";

const pathAttributesSchema =
  schema.elements[constants.ElementNames.PATH].attributes;

const rankPathAttributesSchema = pathAttributesSchema.pick({
  [constants.AttributeNames.D]: true,
  [constants.AttributeNames.FILL_RULE]: true,
});

const rankSvgSchema = z.object({
  [constants.ElementNames.SVG]: z.object({
    [constants.attributesGroupName]: schema.elements[
      constants.ElementNames.SVG
    ].attributes.pick({
      [constants.AttributeNames.XMLNS]: true,
      [constants.AttributeNames.VIEW_BOX]: true,
    }),
    [constants.ElementNames.PATH]: z.object({
      [constants.attributesGroupName]: rankPathAttributesSchema,
    }),
  }),
});
export type RankSVG = z.infer<typeof rankSvgSchema>;

const rankSymbolSchema = z.object({
  [constants.attributesGroupName]:
    schema.elements[constants.ElementNames.SYMBOL].attributes.required(),
  [constants.ElementNames.PATH]: z.object({
    [constants.attributesGroupName]: rankPathAttributesSchema,
  }),
});
export type RankSymbol = z.infer<typeof rankSymbolSchema>;

const rankUseSchema = z.object({
  [constants.attributesGroupName]: schema.elements[
    constants.ElementNames.USE
  ].attributes
    .omit({ [constants.AttributeNames.TRANSFORM]: true })
    .required(),
});
export type RankUse = z.infer<typeof rankUseSchema>;

export default {
  svg: rankSvgSchema,
  symbol: rankSymbolSchema,
  use: rankUseSchema,
};
