export type DexEntry = {
  seenAttr: number;
  caughtAttr: number;
  natureAttr: number;
  seenCount?: number;
  caughtCount?: number;
  hatchedCount?: number;
  ivs?: number[];
};

export type StarterEntry = {
  abilityAttr: number;
  candyCount: number;
  classicWinCount: number;
  eggMoves: number;
  friendship: number;
  moveset: number[];
  passiveAttr: number;
  valueReduction: number;
};

export type SystemSaveData = {
  trainerId: number;
  secretId: number;
  dexData: {
    [pokemonId: string]: DexEntry;
  };
  starterData?: {
    [pokemonId: string]: StarterEntry;
  };
};
