import { z } from "zod";
import { schema, constants } from "@/features/svg";

const pathAttributesSchema =
  schema.elements[constants.ElementNames.PATH].attributes;

const suitPathBaseAttributesSchema = pathAttributesSchema.pick({
  [constants.AttributeNames.D]: true,
});

const suitSvgSchema = z.object({
  [constants.ElementNames.SVG]: z.object({
    [constants.attributesGroupName]: schema.elements[
      constants.ElementNames.SVG
    ].attributes
      .pick({
        [constants.AttributeNames.XMLNS]: true,
        [constants.AttributeNames.VIEW_BOX]: true,
      })
      .required(),
    [constants.ElementNames.PATH]: z.object({
      [constants.attributesGroupName]: suitPathBaseAttributesSchema,
    }),
  }),
});
export type SuitSVG = z.infer<typeof suitSvgSchema>;

const suitSymbolSchema = z.object({
  [constants.attributesGroupName]: schema.elements[
    constants.ElementNames.SYMBOL
  ].attributes.omit({
    [constants.AttributeNames.PRESERVE_ASPECT_RATIO]: true,
  }),
  [constants.ElementNames.PATH]: z.object({
    [constants.attributesGroupName]: suitPathBaseAttributesSchema.merge(
      pathAttributesSchema
        .pick({ [constants.AttributeNames.FILL]: true })
        .required()
    ),
  }),
});
export type SuitSymbol = z.infer<typeof suitSymbolSchema>;

const useAttributesSchema =
  schema.elements[constants.ElementNames.USE].attributes;

const suitUseSchema = z.object({
  [constants.attributesGroupName]: useAttributesSchema
    .omit({
      [constants.AttributeNames.FILL]: true,
      [constants.AttributeNames.TRANSFORM]: true,
    })
    .required()
    .merge(
      useAttributesSchema.pick({ [constants.AttributeNames.TRANSFORM]: true })
    ),
});
export type SuitUse = z.infer<typeof suitUseSchema>;

export default {
  svg: suitSvgSchema,
  symbol: suitSymbolSchema,
  use: suitUseSchema,
};
