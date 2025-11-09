import pokemonData from '../../pokemon_data.json';

export interface PokemonData {
  name: string;
  generation: number;
  sprite: string;
  shiny: number;
  isStarter: boolean;
}

export const POKEMON_NAMES: Record<number, PokemonData> =
  pokemonData as unknown as Record<number, PokemonData>;

export function getPokemonName(id: number): string {
  return POKEMON_NAMES[id]?.name ?? `Pokemon #${id}`;
}

export function getPokemonNamesMap(): Record<number, string> {
  const map: Record<number, string> = {};
  for (const [id, data] of Object.entries(POKEMON_NAMES)) {
    map[Number(id)] = data.name;
  }
  return map;
}

export function getPokemonByGeneration(
  generation: number
): Array<{ id: number; name: string }> {
  return Object.entries(POKEMON_NAMES)
    .filter(([, data]) => data.generation === generation)
    .map(([id, data]) => ({ id: Number(id), name: data.name }));
}

export function getPokemonSprite(id: number): string {
  return POKEMON_NAMES[id]?.sprite ?? '';
}
