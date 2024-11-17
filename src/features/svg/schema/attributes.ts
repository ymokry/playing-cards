import { z } from "zod";
import { Palette } from "@/data/constants";

import {
  AspectRatios,
  AttributeDefaults,
  AttributeNames,
  FillRules,
  StrokeTypes,
} from "@/features/svg/data/constants";

const paletteValueSchema = z.enum([
  Palette.BLACK,
  Palette.RED,
  Palette.WHITE,
  Palette.NONE,
]);
const pxValueSchema = z.coerce.number().nonnegative();
const coordinateValueSchema = z.coerce.number();
const strokeTypeSchema = z.enum([StrokeTypes.ROUND]);

export default {
  [AttributeNames.XMLNS]: z.literal(AttributeDefaults[AttributeNames.XMLNS]),
  [AttributeNames.XMLNS_XLINK]: z.literal(
    AttributeDefaults[AttributeNames.XMLNS_XLINK]
  ),
  [AttributeNames.XLINK_HREF]: z.string().min(2).startsWith("#"),
  [AttributeNames.VIEW_BOX]: z
    .string()
    .regex(/^-?\d+(\.\d+)?\s-?\d+(\.\d+)?\s-?\d+(\.\d+)?\s-?\d+(\.\d+)?$/),
  [AttributeNames.WIDTH]: pxValueSchema,
  [AttributeNames.HEIGHT]: pxValueSchema,
  [AttributeNames.RX]: pxValueSchema,
  [AttributeNames.RY]: pxValueSchema,
  [AttributeNames.D]: z.string().min(1),
  [AttributeNames.X]: coordinateValueSchema,
  [AttributeNames.Y]: coordinateValueSchema,
  [AttributeNames.ID]: z.string().min(1),
  [AttributeNames.TRANSFORM]: z.string().min(1),
  [AttributeNames.PRESERVE_ASPECT_RATIO]: z.enum([AspectRatios.MIN_MID]),
  [AttributeNames.FILL]: paletteValueSchema,
  [AttributeNames.FILL_RULE]: z.enum([FillRules.EVEN_ODD]),
  [AttributeNames.STROKE]: paletteValueSchema,
  [AttributeNames.STROKE_LINECAP]: strokeTypeSchema,
  [AttributeNames.STROKE_LINEJOIN]: strokeTypeSchema,
  [AttributeNames.STROKE_WIDTH]: pxValueSchema,
};