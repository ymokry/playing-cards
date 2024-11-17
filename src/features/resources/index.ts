import assert from "node:assert";
import { type CardSuit, type CardRank, type CourtCard } from "@/data/constants";
import Rank, { type RankSymbol, type RanksRegistry } from "@/features/rank";
import Suit, { type SuitSymbol, type SuitsRegistry } from "@/features/suit";
import Court, { type CourtSymbol, type CourtsRegistry } from "@/features/court";

import { ResourceTypes } from "@/features/resources/data/constants";

interface ResourcesRegistry {
  [ResourceTypes.SUIT]: SuitsRegistry;
  [ResourceTypes.RANK]: RanksRegistry;
  [ResourceTypes.COURT]: CourtsRegistry;
}

class Resources {
  private loaded = false;
  private readonly registry: ResourcesRegistry;

  constructor() {
    this.registry = {
      [ResourceTypes.SUIT]: Suit.registry,
      [ResourceTypes.RANK]: Rank.registry,
      [ResourceTypes.COURT]: Court.registry,
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

    await Promise.all(resourcePromises);

    this.loaded = true;
  }

  getSuit(type: CardSuit): SuitSymbol {
    assert(this.loaded, "Must be loaded before use");

    const resource = this.registry[ResourceTypes.SUIT].get(type);

    assert(resource, `Suit ${type} doesn't exist`);

    return resource.symbol;
  }

  getRank(type: CardRank): RankSymbol {
    assert(this.loaded, "Must be loaded before use");

    const resource = this.registry[ResourceTypes.RANK].get(type);

    assert(resource, `Rank ${type} doesn't exist`);

    return resource.symbol;
  }

  getCourt(type: CourtCard): CourtSymbol {
    assert(this.loaded, "Must be loaded before use");

    const resource = this.registry[ResourceTypes.COURT].get(type);

    assert(resource, `Rank ${type} doesn't exist`);

    return resource.symbol;
  }
}

export * as constants from "@/features/resources/data/constants";

export default new Resources();
