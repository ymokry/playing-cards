import { z } from "zod";
import { schema, constants } from "@/features/svg";

const pathAttributesSchema =
  schema.elements[constants.ElementNames.PATH].attributes;

const courtPathMinimalAttributesSchema = pathAttributesSchema.pick({
  [constants.AttributeNames.D]: true,
});

const courtPathAttributesSchema = z.union([
  courtPathMinimalAttributesSchema
    .merge(
      pathAttributesSchema
        .pick({ [constants.AttributeNames.FILL]: true })
        .required()
    )
    .merge(
      pathAttributesSchema.pick({ [constants.AttributeNames.FILL_RULE]: true })
    ),
  courtPathMinimalAttributesSchema
    .merge(
      pathAttributesSchema
        .pick({
          [constants.AttributeNames.STROKE]: true,
          [constants.AttributeNames.STROKE_LINECAP]: true,
          [constants.AttributeNames.STROKE_LINEJOIN]: true,
        })
        .required()
    )
    .merge(
      pathAttributesSchema.pick({
        [constants.AttributeNames.STROKE_WIDTH]: true,
      })
    ),
]);

const courtPathSchema = z
  .object({
    [constants.attributesGroupName]: courtPathAttributesSchema,
  })
  .array()
  .nonempty();

const courtSvgSchema = z.object({
  [constants.ElementNames.SVG]: z.object({
    [constants.attributesGroupName]: schema.elements[
      constants.ElementNames.SVG
    ].attributes
      .pick({
        [constants.AttributeNames.XMLNS]: true,
        [constants.AttributeNames.WIDTH]: true,
        [constants.AttributeNames.HEIGHT]: true,
        [constants.AttributeNames.FILL]: true,
      })
      .required(),
    [constants.ElementNames.PATH]: courtPathSchema,
  }),
});
export type CourtSVG = z.infer<typeof courtSvgSchema>;

const courtSymbolSchema = z.object({
  [constants.attributesGroupName]: schema.elements[
    constants.ElementNames.SYMBOL
  ].attributes
    .pick({
      [constants.AttributeNames.ID]: true,
      [constants.AttributeNames.FILL]: true,
      [constants.AttributeNames.WIDTH]: true,
      [constants.AttributeNames.HEIGHT]: true,
    })
    .required(),
  [constants.ElementNames.PATH]: courtPathSchema,
});
export type CourtSymbol = z.infer<typeof courtSymbolSchema>;

const courtUseSchema = z.object({
  [constants.attributesGroupName]: schema.elements[
    constants.ElementNames.USE
  ].attributes
    .pick({
      [constants.AttributeNames.XLINK_HREF]: true,
      [constants.AttributeNames.X]: true,
      [constants.AttributeNames.Y]: true,
    })
    .required(),
});
export type CourtUse = z.infer<typeof courtUseSchema>;

export default {
  svg: courtSvgSchema,
  symbol: courtSymbolSchema,
  use: courtUseSchema,
};
