import { z } from "zod";
import { schema, constants } from "@/features/svg";

const pathAttributesSchema =
  schema.elements[constants.ElementNames.PATH].attributes;

const rankPathAttributesSchema = pathAttributesSchema
  .pick({
    [constants.AttributeNames.D]: true,
    [constants.AttributeNames.STROKE_LINECAP]: true,
    [constants.AttributeNames.STROKE_WIDTH]: true,
  })
  .required();

const rankSvgSchema = z.object({
  [constants.ElementNames.SVG]: z.object({
    [constants.attributesGroupName]: schema.elements[
      constants.ElementNames.SVG
    ].attributes
      .pick({
        [constants.AttributeNames.XMLNS]: true,
        [constants.AttributeNames.FILL]: true,
        [constants.AttributeNames.VIEW_BOX]: true,
      })
      .required(),
    [constants.ElementNames.PATH]: z.object({
      [constants.attributesGroupName]: rankPathAttributesSchema,
    }),
  }),
});
export type RankSVG = z.infer<typeof rankSvgSchema>;

const rankSymbolSchema = z.object({
  [constants.attributesGroupName]: schema.elements[
    constants.ElementNames.SYMBOL
  ].attributes
    .pick({
      [constants.AttributeNames.ID]: true,
      [constants.AttributeNames.VIEW_BOX]: true,
      [constants.AttributeNames.FILL]: true,
      [constants.AttributeNames.PRESERVE_ASPECT_RATIO]: true,
    })
    .required(),
  [constants.ElementNames.PATH]: z.object({
    [constants.attributesGroupName]: rankPathAttributesSchema,
  }),
});
export type RankSymbol = z.infer<typeof rankSymbolSchema>;

const rankUseSchema = z.object({
  [constants.attributesGroupName]: schema.elements[
    constants.ElementNames.USE
  ].attributes
    .pick({
      [constants.AttributeNames.XLINK_HREF]: true,
      [constants.AttributeNames.WIDTH]: true,
      [constants.AttributeNames.HEIGHT]: true,
      [constants.AttributeNames.X]: true,
      [constants.AttributeNames.Y]: true,
      [constants.AttributeNames.STROKE]: true,
    })
    .required(),
});
export type RankUse = z.infer<typeof rankUseSchema>;

export default {
  svg: rankSvgSchema,
  symbol: rankSymbolSchema,
  use: rankUseSchema,
};
