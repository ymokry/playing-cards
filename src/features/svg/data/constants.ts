export const attributesGroupName = "@";

export const AttributeNames = {
  XMLNS: "xmlns",
  XMLNS_XLINK: "xmlns:xlink",
  XLINK_HREF: "xlink:href",
  VIEW_BOX: "viewBox",
  WIDTH: "width",
  HEIGHT: "height",
  RX: "rx",
  RY: "ry",
  D: "d",
  X: "x",
  Y: "y",
  ID: "id",
  TRANSFORM: "transform",
  PRESERVE_ASPECT_RATIO: "preserveAspectRatio",
  FILL: "fill",
  FILL_RULE: "fill-rule",
  STROKE: "stroke",
  STROKE_LINECAP: "stroke-linecap",
  STROKE_LINEJOIN: "stroke-linejoin",
  STROKE_WIDTH: "stroke-width",
  PATTERN_UNITS: "patternUnits",
} as const;

export const AttributeDefaults = {
  [AttributeNames.XMLNS]: "http://www.w3.org/2000/svg",
  [AttributeNames.XMLNS_XLINK]: "http://www.w3.org/1999/xlink",
} as const;

export const AspectRatios = {
  MIN_MID: "xMinYMid",
} as const;

export const FillRules = {
  EVEN_ODD: "evenodd",
} as const;

export const StrokeTypes = {
  ROUND: "round",
} as const;

export const ElementNames = {
  SVG: "svg",
  DEFS: "defs",
  SYMBOL: "symbol",
  G: "g",
  RECT: "rect",
  PATH: "path",
  USE: "use",
} as const;

export const PatternUnits = {
  USER_SPACE: "userSpaceOnUse",
} as const;
