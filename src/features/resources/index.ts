import assert from "node:assert";
import Rank, {
  type RankSymbol,
  type RanksRegistry,
  type RankType,
} from "@/features/rank";
import Suit, {
  type SuitSymbol,
  type SuitsRegistry,
  type SuitType,
} from "@/features/suit";
import Court, {
  type CourtSymbol,
  type CourtsRegistry,
  type CourtCard,
} from "@/features/court";
import Pattern, {
  type PatternDef,
  type PatternRegistry,
  type PatternType,
} from "@/features/pattern";
import Rect, {
  type RectDef,
  type RectsRegistry,
  type RectType,
} from "@/features/rect";

import { ResourceTypes } from "@/features/resources/data/constants";

interface ResourcesRegistry {
  [ResourceTypes.SUIT]: SuitsRegistry;
  [ResourceTypes.RANK]: RanksRegistry;
  [ResourceTypes.COURT]: CourtsRegistry;
  [ResourceTypes.PATTERN]: PatternRegistry;
  [ResourceTypes.RECT]: RectsRegistry;
}

let loaded = false;
const registry: Readonly<ResourcesRegistry> = {
  [ResourceTypes.SUIT]: Suit.registry,
  [ResourceTypes.RANK]: Rank.registry,
  [ResourceTypes.COURT]: Court.registry,
  [ResourceTypes.PATTERN]: Pattern.registry,
  [ResourceTypes.RECT]: Rect.registry,
};

export * as constants from "@/features/resources/data/constants";

export default {
  load: async (): Promise<void> => {
    assert(!loaded, "Should only be loaded once");

    const resourcePromises: Promise<void>[] = [];

    registry[ResourceTypes.SUIT].forEach((suit) => {
      resourcePromises.push(suit.prepare());
    });

    registry[ResourceTypes.RANK].forEach((rank) => {
      resourcePromises.push(rank.prepare());
    });

    registry[ResourceTypes.COURT].forEach((court) => {
      resourcePromises.push(court.prepare());
    });

    registry[ResourceTypes.PATTERN].forEach((pattern) => {
      resourcePromises.push(pattern.prepare());
    });

    await Promise.all(resourcePromises);

    loaded = true;
  },
  getSuit: (type: SuitType): SuitSymbol => {
    assert(loaded, "Must be loaded before use");

    const resource = registry[ResourceTypes.SUIT].get(type);

    assert(resource, `Suit ${type} doesn't exist`);

    return resource.symbol;
  },
  getRank(type: RankType): RankSymbol {
    assert(loaded, "Must be loaded before use");

    const resource = registry[ResourceTypes.RANK].get(type);

    assert(resource, `Rank ${type} doesn't exist`);

    return resource.symbol;
  },
  getCourt: (type: CourtCard): CourtSymbol => {
    assert(loaded, "Must be loaded before use");

    const resource = registry[ResourceTypes.COURT].get(type);

    assert(resource, `Court ${type} doesn't exist`);

    return resource.symbol;
  },
  getPattern: (type: PatternType): PatternDef => {
    assert(loaded, "Must be loaded before use");

    const resource = registry[ResourceTypes.PATTERN].get(type);

    assert(resource, `Pattern ${type} doesn't exist`);

    return resource.pattern;
  },
  getRect: (type: RectType): RectDef => {
    const resource = registry[ResourceTypes.RECT].get(type);

    assert(resource, `Pattern ${type} doesn't exist`);

    return resource.rect;
  },
};
