import { z } from "zod";

import {
  AttributeNames,
  attributesGroupName,
  ElementNames,
} from "@/features/svg/data/constants";
import Attributes from "@/features/svg/schema/attributes";

const useAttributesSchema = z.object({
  [AttributeNames.XLINK_HREF]: Attributes[AttributeNames.XLINK_HREF],
  [AttributeNames.FILL]: Attributes[AttributeNames.FILL].optional(),
  [AttributeNames.WIDTH]: Attributes[AttributeNames.WIDTH].optional(),
  [AttributeNames.HEIGHT]: Attributes[AttributeNames.HEIGHT].optional(),
  [AttributeNames.X]: Attributes[AttributeNames.X].optional(),
  [AttributeNames.Y]: Attributes[AttributeNames.Y].optional(),
  [AttributeNames.TRANSFORM]: Attributes[AttributeNames.TRANSFORM].optional(),
});

const useContentSchema = z.object({
  [attributesGroupName]: useAttributesSchema,
});

const useElementSchema = z.object({
  [ElementNames.USE]: z.union([
    useContentSchema,
    useContentSchema.array().nonempty(),
  ]),
});

const rectAttributesSchema = z.object({
  [AttributeNames.WIDTH]: Attributes[AttributeNames.WIDTH],
  [AttributeNames.HEIGHT]: Attributes[AttributeNames.HEIGHT],
  [AttributeNames.FILL]: Attributes[AttributeNames.FILL].optional(),
  [AttributeNames.X]: Attributes[AttributeNames.X].optional(),
  [AttributeNames.Y]: Attributes[AttributeNames.Y].optional(),
  [AttributeNames.RX]: Attributes[AttributeNames.RX].optional(),
  [AttributeNames.RY]: Attributes[AttributeNames.RY].optional(),
});

const rectContentSchema = z.object({
  [attributesGroupName]: rectAttributesSchema,
});

const rectWithIDContentSchema = z.object({
  [attributesGroupName]: rectAttributesSchema.extend({
    [AttributeNames.ID]: Attributes[AttributeNames.ID],
  }),
});

const rectElementSchema = z.object({
  [ElementNames.RECT]: z.union([
    rectContentSchema,
    rectContentSchema.array().nonempty(),
  ]),
});

const rectWithIDElementSchema = z.object({
  [ElementNames.RECT]: z.union([
    rectWithIDContentSchema,
    rectWithIDContentSchema.array().nonempty(),
  ]),
});

const pathAttributesSchema = z.object({
  [AttributeNames.D]: Attributes[AttributeNames.D],
  [AttributeNames.FILL]: Attributes[AttributeNames.FILL].optional(),
  [AttributeNames.STROKE]: Attributes[AttributeNames.STROKE].optional(),
  [AttributeNames.STROKE_WIDTH]:
    Attributes[AttributeNames.STROKE_WIDTH].optional(),
  [AttributeNames.STROKE_LINECAP]:
    Attributes[AttributeNames.STROKE_LINECAP].optional(),
  [AttributeNames.STROKE_LINEJOIN]:
    Attributes[AttributeNames.STROKE_LINEJOIN].optional(),
});

const pathContentSchema = z.object({
  [attributesGroupName]: pathAttributesSchema,
});

const pathElementSchema = z.object({
  [ElementNames.PATH]: z.union([
    pathContentSchema,
    pathContentSchema.array().nonempty(),
  ]),
});

const gAttributesSchema = z.object({
  [AttributeNames.ID]: Attributes[AttributeNames.ID],
  [AttributeNames.TRANSFORM]: Attributes[AttributeNames.TRANSFORM].optional(),
});

const gContentSchema = z
  .object({
    [attributesGroupName]: gAttributesSchema,
  })
  .merge(useElementSchema.partial())
  .merge(rectElementSchema.partial())
  .merge(pathElementSchema.partial());

const gElementSchema = z.object({
  [ElementNames.G]: z.union([
    gContentSchema,
    gContentSchema.array().nonempty(),
  ]),
});

const symbolAttributesSchema = z.object({
  [AttributeNames.ID]: Attributes[AttributeNames.ID],
  [AttributeNames.VIEW_BOX]: Attributes[AttributeNames.VIEW_BOX],
  [AttributeNames.PRESERVE_ASPECT_RATIO]:
    Attributes[AttributeNames.PRESERVE_ASPECT_RATIO].optional(),
});

const symbolContentSchema = z
  .object({
    [attributesGroupName]: symbolAttributesSchema,
  })
  .merge(useElementSchema.partial())
  .merge(rectElementSchema.partial())
  .merge(pathElementSchema.partial())
  .merge(gElementSchema.partial());

const symbolElementSchema = z.object({
  [ElementNames.SYMBOL]: z.union([
    symbolContentSchema,
    symbolContentSchema.array().nonempty(),
  ]),
});

const defsContentSchema = symbolElementSchema
  .merge(rectWithIDElementSchema)
  .partial();

const defsElementSchema = z.object({
  [ElementNames.DEFS]: defsContentSchema,
});

const svgAttributesSchema = z.object({
  [AttributeNames.XMLNS]: Attributes[AttributeNames.XMLNS],
  [AttributeNames.XMLNS_XLINK]:
    Attributes[AttributeNames.XMLNS_XLINK].optional(),
  [AttributeNames.VIEW_BOX]: Attributes[AttributeNames.VIEW_BOX],
  [AttributeNames.FILL]: Attributes[AttributeNames.FILL].optional(),
});

const svgContentSchema = z
  .object({
    [attributesGroupName]: svgAttributesSchema,
  })
  .merge(useElementSchema.partial())
  .merge(rectElementSchema.partial())
  .merge(pathElementSchema.partial())
  .merge(gElementSchema.partial())
  .merge(defsElementSchema.partial());

const svgElementSchema = z.object({
  [ElementNames.SVG]: svgContentSchema,
});

export default {
  [ElementNames.SVG]: {
    attributes: svgAttributesSchema,
    content: svgContentSchema,
    element: svgElementSchema,
  },
  [ElementNames.DEFS]: {
    content: defsContentSchema,
    element: defsElementSchema,
  },
  [ElementNames.SYMBOL]: {
    attributes: symbolAttributesSchema,
    content: symbolContentSchema,
    element: symbolElementSchema,
  },
  [ElementNames.G]: {
    attributes: gAttributesSchema,
    content: gContentSchema,
    element: gElementSchema,
  },
  [ElementNames.RECT]: {
    attributes: rectAttributesSchema,
    content: rectContentSchema,
    element: rectElementSchema,
  },
  [ElementNames.PATH]: {
    attributes: pathAttributesSchema,
    content: pathContentSchema,
    element: pathElementSchema,
  },
  [ElementNames.USE]: {
    attributes: useAttributesSchema,
    content: useContentSchema,
    element: useElementSchema,
  },
};
