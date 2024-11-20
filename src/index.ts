import Resources from "@/features/resources";

import { constants as suitConstants } from "@/features/suit";
import { constants as rankConstants } from "@/features/rank";
import Card from "@/features/card";
import { prepareDist, saveCard } from "@/utils/file";

await Resources.load();
await prepareDist();

const deckPromises: Promise<number>[] = [
  saveCard("cut", Card.get({ type: "cut" })),
  saveCard("back", Card.get({ type: "back" })),
];

Object.values(suitConstants.SuitTypes).forEach((suit) => {
  Object.values(rankConstants.RanksTypes).forEach((rank) => {
    deckPromises.push(
      saveCard(`${suit}_${rank}`, Card.get({ type: "playing", suit, rank }))
    );
  });
});

await Promise.all(deckPromises);
