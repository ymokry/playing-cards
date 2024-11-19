import { z } from "zod";
import { schema, constants } from "@/features/svg";

const pathAttributesSchema =
  schema.elements[constants.ElementNames.PATH].attributes;

const patternPathAttributesSchema = pathAttributesSchema.pick({
  [constants.AttributeNames.D]: true,
  [constants.AttributeNames.FILL_RULE]: true,
});

const patternSvgSchema = z.object({
  [constants.ElementNames.SVG]: z.object({
    [constants.attributesGroupName]: schema.elements[
      constants.ElementNames.SVG
    ].attributes
      .pick({
        [constants.AttributeNames.XMLNS]: true,
        [constants.AttributeNames.HEIGHT]: true,
        [constants.AttributeNames.WIDTH]: true,
      })
      .required(),
    [constants.ElementNames.PATH]: z.object({
      [constants.attributesGroupName]: patternPathAttributesSchema,
    }),
  }),
});
export type PatternSVG = z.infer<typeof patternSvgSchema>;

const patternSchema = z.object({
  [constants.attributesGroupName]:
    schema.elements[constants.ElementNames.PATTERN].attributes,
  [constants.ElementNames.PATH]: z.object({
    [constants.attributesGroupName]: patternPathAttributesSchema.extend({
      [constants.AttributeNames.FILL]:
        schema.attributes[constants.AttributeNames.FILL],
    }),
  }),
});
export type PatternDef = z.infer<typeof patternSchema>;

const patternRectSchema = z.object({
  [constants.attributesGroupName]: schema.elements[
    constants.ElementNames.RECT
  ].attributes
    .omit({
      [constants.AttributeNames.RX]: true,
      [constants.AttributeNames.RY]: true,
    })
    .required()
    .merge(
      schema.elements[constants.ElementNames.RECT].attributes.pick({
        [constants.AttributeNames.RX]: true,
        [constants.AttributeNames.RY]: true,
      })
    ),
});
export type PatternRect = z.infer<typeof patternRectSchema>;

export default {
  svg: patternSvgSchema,
  pattern: patternSchema,
  rect: patternRectSchema,
};
