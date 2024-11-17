import assert from "node:assert";
import { type CardSuit, type CardRank, type CourtCard } from "@/data/constants";
import Rank, { type RankSymbol, type RanksRegistry } from "@/features/rank";
import Suit, { type SuitSymbol, type SuitsRegistry } from "@/features/suit";
import Court, { type CourtSymbol, type CourtsRegistry } from "@/features/court";

interface ResourcesRegistry {
  suits: SuitsRegistry;
  ranks: RanksRegistry;
  courts: CourtsRegistry;
}

class Resources {
  private loaded = false;
  private readonly registry: ResourcesRegistry;

  constructor() {
    this.registry = {
      suits: Suit.registry,
      ranks: Rank.registry,
      courts: Court.registry,
    };
  }

  async load(): Promise<void> {
    assert(!this.loaded, "Should only be loaded once");

    const resourcePromises: Promise<void>[] = [];

    this.registry.suits.forEach((suit) => {
      resourcePromises.push(suit.prepare());
    });

    this.registry.ranks.forEach((suit) => {
      resourcePromises.push(suit.prepare());
    });

    this.registry.courts.forEach((court) => {
      resourcePromises.push(court.prepare());
    });

    await Promise.all(resourcePromises);

    this.loaded = true;
  }

  getSuit(type: CardSuit): SuitSymbol {
    assert(this.loaded, "Must be loaded before use");

    const resource = this.registry.suits.get(type);

    assert(resource, `Suit ${type} doesn't exist`);

    return resource.symbol;
  }

  getRank(type: CardRank): RankSymbol {
    assert(this.loaded, "Must be loaded before use");

    const resource = this.registry.ranks.get(type);

    assert(resource, `Rank ${type} doesn't exist`);

    return resource.symbol;
  }

  getCourt(type: CourtCard): CourtSymbol {
    assert(this.loaded, "Must be loaded before use");

    const resource = this.registry.courts.get(type);

    assert(resource, `Rank ${type} doesn't exist`);

    return resource.symbol;
  }
}

export default new Resources();
