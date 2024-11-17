export const ResourceTypes = {
  COURT: "court",
  RANK: "rank",
  SUIT: "suit",
} as const;
export type ResourceType = (typeof ResourceTypes)[keyof typeof ResourceTypes];
