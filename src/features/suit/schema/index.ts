import { z } from "zod";
import { schema, constants } from "@/features/svg";

const svgAttributesSchema =
  schema.elements[constants.ElementNames.SVG].attributes;
const pathAttributesSchema =
  schema.elements[constants.ElementNames.PATH].attributes;

const suitBaseAttributesSchema = svgAttributesSchema.pick({
  [constants.AttributeNames.VIEW_BOX]: true,
});
const suitPathBaseAttributesSchema = pathAttributesSchema.pick({
  [constants.AttributeNames.D]: true,
});

const suitSvgSchema = z.object({
  [constants.ElementNames.SVG]: z.object({
    [constants.attributesGroupName]: suitBaseAttributesSchema
      .merge(
        svgAttributesSchema.pick({ [constants.AttributeNames.XMLNS]: true })
      )
      .required(),
    [constants.ElementNames.PATH]: z.object({
      [constants.attributesGroupName]: suitPathBaseAttributesSchema,
    }),
  }),
});
export type SuitSVG = z.infer<typeof suitSvgSchema>;

const suitSymbolSchema = z.object({
  [constants.ElementNames.SYMBOL]: z.object({
    [constants.attributesGroupName]: suitBaseAttributesSchema.extend({
      [constants.AttributeNames.ID]:
        schema.attributes[constants.AttributeNames.ID],
    }),
    [constants.ElementNames.PATH]: z.object({
      [constants.attributesGroupName]: suitPathBaseAttributesSchema.merge(
        pathAttributesSchema
          .pick({ [constants.AttributeNames.FILL]: true })
          .required()
      ),
    }),
  }),
});
export type SuitSymbol = z.infer<typeof suitSymbolSchema>;

export default { svg: suitSvgSchema, symbol: suitSymbolSchema };
