import { POKEMON_NAMES } from './pokemon-data';

import { ALL_EGG_MOVES, SHINY_BITS, SHINY_VALUES } from '../constants';

import type {
  PokemonShinyStatus,
  ShinyTier,
  Statistics,
  SystemSaveData,
} from '../types';

export function caughtShinyVariant(caughtAttr: number, bit: number): boolean {
  return (caughtAttr & (1 << bit)) !== 0;
}

export function parseShinyStatus(
  pokemonId: number,
  caughtAttr: number,
  eggMoves?: number
): Omit<PokemonShinyStatus, 'id' | 'name' | 'caughtAttr'> {
  const pokemonData = POKEMON_NAMES[pokemonId];
  const hasRegularShiny = pokemonData?.shiny >= SHINY_VALUES.REGULAR;
  const hasRareShiny = pokemonData?.shiny >= SHINY_VALUES.RARE;
  const hasEpicShiny = pokemonData?.shiny >= SHINY_VALUES.EPIC;

  const caughtRegularShiny = caughtShinyVariant(caughtAttr, SHINY_BITS.REGULAR);
  const caughtRareShiny = caughtShinyVariant(caughtAttr, SHINY_BITS.RARE);
  const caughtEpicShiny = caughtShinyVariant(caughtAttr, SHINY_BITS.EPIC);

  const missingVariants: ShinyTier[] = [];
  if (hasRegularShiny && !caughtRegularShiny) missingVariants.push('regular');
  if (hasRareShiny && !caughtRareShiny) missingVariants.push('rare');
  if (hasEpicShiny && !caughtEpicShiny) missingVariants.push('epic');

  const isStarter = pokemonData?.isStarter ?? false;
  const hasMissingEggMoves =
    isStarter && eggMoves !== undefined && eggMoves < ALL_EGG_MOVES;

  return {
    hasRegularShiny,
    hasRareShiny,
    hasEpicShiny,
    caughtRegularShiny,
    caughtRareShiny,
    caughtEpicShiny,
    missingVariants,
    hasMissingEggMoves,
  };
}

export function analyzeMissingShinies(
  saveData: SystemSaveData,
  pokemonNames: Record<number, string>
): PokemonShinyStatus[] {
  const results: PokemonShinyStatus[] = [];

  for (const [pokemonIdStr, dexEntry] of Object.entries(saveData.dexData)) {
    const pokemonId = Number(pokemonIdStr);
    const name = pokemonNames[pokemonId] ?? `Pokemon #${pokemonId}`;

    const eggMoves = saveData.starterData[Number(pokemonIdStr)]?.eggMoves;

    const shinyStatus = parseShinyStatus(
      pokemonId,
      dexEntry.caughtAttr,
      eggMoves
    );

    if (
      shinyStatus.missingVariants.length > 0 ||
      shinyStatus.hasMissingEggMoves
    ) {
      results.push({
        id: pokemonId,
        name,
        caughtAttr: dexEntry.caughtAttr,
        ...shinyStatus,
      });
    }
  }

  return results.sort((a, b) => a.id - b.id);
}

export function getShinyStatistics(saveData: SystemSaveData): Statistics {
  let totalCaught = 0;
  let totalWithAllShinies = 0;
  let totalMissingRegular = 0;
  let totalMissingRare = 0;
  let totalMissingEpic = 0;
  let totalStarters = 0;
  let totalWithAllEggMoves = 0;
  let totalMissingEggMoves = 0;

  for (const [pokemonId, dexEntry] of Object.entries(saveData.dexData)) {
    if (dexEntry.caughtAttr > 0) {
      totalCaught++;

      const eggMoves = saveData.starterData[Number(pokemonId)]?.eggMoves;
      const shinyStatus = parseShinyStatus(
        Number(pokemonId),
        dexEntry.caughtAttr,
        eggMoves
      );

      if (shinyStatus.missingVariants.length === 0) {
        totalWithAllShinies++;
      }

      if (shinyStatus.hasRegularShiny && !shinyStatus.caughtRegularShiny)
        totalMissingRegular++;
      if (shinyStatus.hasRareShiny && !shinyStatus.caughtRareShiny)
        totalMissingRare++;
      if (shinyStatus.hasEpicShiny && !shinyStatus.caughtEpicShiny)
        totalMissingEpic++;

      const pokemonData = POKEMON_NAMES[Number(pokemonId)];
      if (pokemonData.isStarter && eggMoves !== undefined) {
        totalStarters++;
        if (eggMoves === 15) {
          totalWithAllEggMoves++;
        } else {
          totalMissingEggMoves++;
        }
      }
    }
  }

  const completionPercentage =
    totalCaught > 0 ? (totalWithAllShinies / totalCaught) * 100 : 0;

  const eggMovesCompletionPercentage =
    totalStarters > 0 ? (totalWithAllEggMoves / totalStarters) * 100 : 0;

  return {
    totalCaught,
    totalWithAllShinies,
    totalMissingRegular,
    totalMissingRare,
    totalMissingEpic,
    completionPercentage,
    totalStarters,
    totalWithAllEggMoves,
    totalMissingEggMoves,
    eggMovesCompletionPercentage,
  };
}
