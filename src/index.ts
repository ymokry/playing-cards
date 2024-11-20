import Resources from "@/features/resources";

import { constants as suitConstants } from "@/features/suit";
import { constants as rankConstants } from "@/features/rank";
import getCard from "@/features/card";
import { prepareDist, saveCard } from "@/utils/file";

await Resources.load();
await prepareDist();

const deckPromises: Promise<number>[] = [
  saveCard("cut", getCard({ type: "cut" })),
  saveCard("back", getCard({ type: "back" })),
];

Object.values(suitConstants.SuitTypes).forEach((suit) => {
  Object.values(rankConstants.RanksTypes).forEach((rank) => {
    deckPromises.push(
      saveCard(`${suit}_${rank}`, getCard({ type: "playing", suit, rank }))
    );
  });
});

await Promise.all(deckPromises);
