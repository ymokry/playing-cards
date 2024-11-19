import { ResourceTypes } from "@/features/resources/data/constants";

export type ResourceType = (typeof ResourceTypes)[keyof typeof ResourceTypes];
