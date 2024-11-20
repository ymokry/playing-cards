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

class Resources {
  private loaded = false;
  private readonly registry: ResourcesRegistry;

  constructor() {
    this.registry = {
      [ResourceTypes.SUIT]: Suit.registry,
      [ResourceTypes.RANK]: Rank.registry,
      [ResourceTypes.COURT]: Court.registry,
      [ResourceTypes.PATTERN]: Pattern.registry,
      [ResourceTypes.RECT]: Rect.registry,
    };
  }

  async load(): Promise<void> {
    assert(!this.loaded, "Should only be loaded once");

    const resourcePromises: Promise<void>[] = [];

    this.registry[ResourceTypes.SUIT].forEach((suit) => {
      resourcePromises.push(suit.prepare());
    });

    this.registry[ResourceTypes.RANK].forEach((rank) => {
      resourcePromises.push(rank.prepare());
    });

    this.registry[ResourceTypes.COURT].forEach((court) => {
      resourcePromises.push(court.prepare());
    });

    this.registry[ResourceTypes.PATTERN].forEach((pattern) => {
      resourcePromises.push(pattern.prepare());
    });

    await Promise.all(resourcePromises);

    this.loaded = true;
  }

  getSuit(type: SuitType): SuitSymbol {
    assert(this.loaded, "Must be loaded before use");

    const resource = this.registry[ResourceTypes.SUIT].get(type);

    assert(resource, `Suit ${type} doesn't exist`);

    return resource.symbol;
  }

  getRank(type: RankType): RankSymbol {
    assert(this.loaded, "Must be loaded before use");

    const resource = this.registry[ResourceTypes.RANK].get(type);

    assert(resource, `Rank ${type} doesn't exist`);

    return resource.symbol;
  }

  getCourt(type: CourtCard): CourtSymbol {
    assert(this.loaded, "Must be loaded before use");

    const resource = this.registry[ResourceTypes.COURT].get(type);

    assert(resource, `Court ${type} doesn't exist`);

    return resource.symbol;
  }

  getPattern(type: PatternType): PatternDef {
    assert(this.loaded, "Must be loaded before use");

    const resource = this.registry[ResourceTypes.PATTERN].get(type);

    assert(resource, `Pattern ${type} doesn't exist`);

    return resource.pattern;
  }

  getRect(type: RectType): RectDef {
    const resource = this.registry[ResourceTypes.RECT].get(type);

    assert(resource, `Pattern ${type} doesn't exist`);

    return resource.rect;
  }
}

export * as constants from "@/features/resources/data/constants";

export default new Resources();
