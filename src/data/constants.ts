export const CardRanks = {
  ACE: "A",
  TWO: "2",
  THREE: "3",
  FOUR: "4",
  FIVE: "5",
  SIX: "6",
  SEVEN: "7",
  EIGHT: "8",
  NINE: "9",
  TEN: "10",
  JACK: "J",
  QUEEN: "Q",
  KING: "K",
} as const;
export type CardRank = (typeof CardRanks)[keyof typeof CardRanks];

export const CardSuits = {
  SPADES: "S",
  HEARTS: "H",
  DIAMONDS: "D",
  CLUBS: "C",
} as const;
export type CardSuit = (typeof CardSuits)[keyof typeof CardSuits];

export const CourtRanks = [
  CardRanks.JACK,
  CardRanks.QUEEN,
  CardRanks.KING,
] as const;
export type CourtRank = (typeof CourtRanks)[number];

export const SpecialCards = {
  BACK: "Back",
  CUT: "Cut",
} as const;
export type SpecialCard = (typeof SpecialCards)[keyof typeof SpecialCards];

export type PlayingCard = `${CardSuit}_${CardRank}`;
export type CourtCard = `${CardSuit}_${CourtRank}`;

export const Palette = {
  BLACK: "#151515",
  BLUE: "#152AAB",
  NONE: "none",
  RED: "#AB2A15",
  WHITE: "#000",
} as const;
export type Color = (typeof Palette)[keyof typeof Palette];
