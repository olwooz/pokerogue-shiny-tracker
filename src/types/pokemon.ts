export type ShinyTier = 'regular' | 'rare' | 'epic';

export type PokemonShinyStatus = {
  id: number;
  name: string;
  caughtAttr: number;
  hasRegularShiny: boolean;
  hasRareShiny: boolean;
  hasEpicShiny: boolean;
  caughtRegularShiny: boolean;
  caughtRareShiny: boolean;
  caughtEpicShiny: boolean;
  missingVariants: ShinyTier[];
  hasMissingEggMoves: boolean;
  isStarter: boolean;
};
