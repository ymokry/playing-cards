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
    ].attributes.pick({
      [constants.AttributeNames.XMLNS]: true,
      [constants.AttributeNames.VIEW_BOX]: true,
    }),
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

export default { svg: suitSvgSchema, symbol: suitSymbolSchema };
