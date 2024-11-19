export const ResourceTypes = {
  COURT: "court",
  RANK: "rank",
  SUIT: "suit",
  PATTERN: "pattern",
} as const;
export type ResourceType = (typeof ResourceTypes)[keyof typeof ResourceTypes];
