import { POKEMON_NAMES } from './pokemon-data';

import { SHINY_BITS, SHINY_VALUES } from '../constants';

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
  caughtAttr: number
): Omit<PokemonShinyStatus, 'id' | 'name' | 'caughtAttr'> {
  const hasRegularShiny =
    POKEMON_NAMES[pokemonId]?.shiny >= SHINY_VALUES.REGULAR;
  const hasRareShiny = POKEMON_NAMES[pokemonId]?.shiny >= SHINY_VALUES.RARE;
  const hasEpicShiny = POKEMON_NAMES[pokemonId]?.shiny >= SHINY_VALUES.EPIC;

  const caughtRegularShiny = caughtShinyVariant(caughtAttr, SHINY_BITS.REGULAR);
  const caughtRareShiny = caughtShinyVariant(caughtAttr, SHINY_BITS.RARE);
  const caughtEpicShiny = caughtShinyVariant(caughtAttr, SHINY_BITS.EPIC);

  const missingVariants: ShinyTier[] = [];
  if (hasRegularShiny && !caughtRegularShiny) missingVariants.push('regular');
  if (hasRareShiny && !caughtRareShiny) missingVariants.push('rare');
  if (hasEpicShiny && !caughtEpicShiny) missingVariants.push('epic');

  return {
    hasRegularShiny,
    hasRareShiny,
    hasEpicShiny,
    caughtRegularShiny,
    caughtRareShiny,
    caughtEpicShiny,
    missingVariants,
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

    const shinyStatus = parseShinyStatus(pokemonId, dexEntry.caughtAttr);

    if (shinyStatus.missingVariants.length > 0) {
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

  for (const [pokemonId, dexEntry] of Object.entries(saveData.dexData)) {
    if (dexEntry.caughtAttr > 0) {
      totalCaught++;

      const shinyStatus = parseShinyStatus(
        Number(pokemonId),
        dexEntry.caughtAttr
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
    }
  }

  const completionPercentage =
    totalCaught > 0 ? (totalWithAllShinies / totalCaught) * 100 : 0;

  return {
    totalCaught,
    totalWithAllShinies,
    totalMissingRegular,
    totalMissingRare,
    totalMissingEpic,
    completionPercentage,
  };
}
