import { z } from "zod";
import { schema, constants } from "@/features/svg";

const rectAttributesSchema =
  schema.elements[constants.ElementNames.RECT].attributes;

const rectSchema = z.object({
  [constants.attributesGroupName]: rectAttributesSchema
    .pick({
      [constants.AttributeNames.ID]: true,
      [constants.AttributeNames.WIDTH]: true,
      [constants.AttributeNames.HEIGHT]: true,
    })
    .required()
    .merge(
      rectAttributesSchema.pick({
        [constants.AttributeNames.FILL]: true,
        [constants.AttributeNames.STROKE]: true,
        [constants.AttributeNames.RX]: true,
        [constants.AttributeNames.RY]: true,
      })
    ),
});
export type RectDef = z.infer<typeof rectSchema>;

const rectUseSchema = z.object({
  [constants.attributesGroupName]: schema.elements[
    constants.ElementNames.USE
  ].attributes.pick({
    [constants.AttributeNames.XLINK_HREF]: true,
    [constants.AttributeNames.X]: true,
    [constants.AttributeNames.Y]: true,
  }),
});
export type RectUse = z.infer<typeof rectUseSchema>;

export default { rect: rectSchema, use: rectUseSchema };
