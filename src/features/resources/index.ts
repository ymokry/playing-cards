import assert from "node:assert";
import { type CardSuit, type CardRank } from "@/data/constants";
import Rank, { type RankSymbol, type RanksRegistry } from "@/features/rank";
import Suit, { type SuitSymbol, type SuitsRegistry } from "@/features/suit";

interface ResourcesRegistry {
  suits: SuitsRegistry;
  ranks: RanksRegistry;
}

class Resources {
  private loaded = false;
  private readonly registry: ResourcesRegistry;

  constructor() {
    this.registry = {
      suits: Suit.registry,
      ranks: Rank.registry,
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
}

export default new Resources();
