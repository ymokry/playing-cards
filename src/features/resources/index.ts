import assert from "node:assert";
import Rank, {
  type RankSymbol,
  type RanksRegistry,
  type constants as RankConstants,
} from "@/features/rank";
import Suit, {
  type SuitSymbol,
  type SuitsRegistry,
  type constants as SuitConstants,
} from "@/features/suit";
import Court, {
  type CourtSymbol,
  type CourtsRegistry,
  type constants as CourtConstants,
} from "@/features/court";
import Pattern, {
  type PatternDef,
  type PatternRegistry,
  type constants as PatternConstants,
} from "@/features/pattern";

import { ResourceTypes } from "@/features/resources/data/constants";

interface ResourcesRegistry {
  [ResourceTypes.SUIT]: SuitsRegistry;
  [ResourceTypes.RANK]: RanksRegistry;
  [ResourceTypes.COURT]: CourtsRegistry;
  [ResourceTypes.PATTERN]: PatternRegistry;
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

  getSuit(type: SuitConstants.SuitType): SuitSymbol {
    assert(this.loaded, "Must be loaded before use");

    const resource = this.registry[ResourceTypes.SUIT].get(type);

    assert(resource, `Suit ${type} doesn't exist`);

    return resource.symbol;
  }

  getRank(type: RankConstants.RankType): RankSymbol {
    assert(this.loaded, "Must be loaded before use");

    const resource = this.registry[ResourceTypes.RANK].get(type);

    assert(resource, `Rank ${type} doesn't exist`);

    return resource.symbol;
  }

  getCourt(type: CourtConstants.CourtCard): CourtSymbol {
    assert(this.loaded, "Must be loaded before use");

    const resource = this.registry[ResourceTypes.COURT].get(type);

    assert(resource, `Court ${type} doesn't exist`);

    return resource.symbol;
  }

  getPattern(type: PatternConstants.PatternType): PatternDef {
    assert(this.loaded, "Must be loaded before use");

    const resource = this.registry[ResourceTypes.PATTERN].get(type);

    assert(resource, `Pattern ${type} doesn't exist`);

    return resource.symbol;
  }
}

export * as constants from "@/features/resources/data/constants";

export default new Resources();
