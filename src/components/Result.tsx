import { memo, useDeferredValue, useMemo, useState } from 'react';

import PokemonCard from './PokemonCard';
import StatisticsOverview from './StatisticsOverview';
import SearchFilter from './SearchFilter';
import ViewModeToggle from './ViewModeToggle';

import { FILTER_OPTIONS, SHINY_TIER, VIEW_MODE } from '../constants';

import type {
  FilterOption,
  PokemonShinyStatus,
  Statistics,
  ViewMode,
} from '../types';

interface ResultProps {
  pokemon: PokemonShinyStatus[];
  statistics: Statistics;
}

function Result({ pokemon, statistics }: ResultProps) {
  const [filters, setFilters] = useState<Set<FilterOption>>(
    new Set([FILTER_OPTIONS.ALL])
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>(VIEW_MODE.LARGE);
  const deferredSearchQuery = useDeferredValue(searchQuery);

  const filteredPokemon = useMemo(
    () =>
      pokemon.filter((p) => {
        const matchesSearch =
          deferredSearchQuery === '' ||
          p.name.toLowerCase().includes(deferredSearchQuery.toLowerCase()) ||
          p.id.toString().includes(deferredSearchQuery);

        if (!matchesSearch) return false;

        if (filters.has(FILTER_OPTIONS.ALL)) return true;

        if (filters.size === 0) return false;

        const matchesAllFilters = Array.from(filters).every((filter) => {
          if (filter === FILTER_OPTIONS.REGULAR)
            return p.missingVariants.includes(SHINY_TIER.REGULAR);
          if (filter === FILTER_OPTIONS.RARE)
            return p.missingVariants.includes(SHINY_TIER.RARE);
          if (filter === FILTER_OPTIONS.EPIC)
            return p.missingVariants.includes(SHINY_TIER.EPIC);
          if (filter === FILTER_OPTIONS.EGG_MOVES) return p.hasMissingEggMoves;
          if (filter === FILTER_OPTIONS.STARTERS) return p.isStarter;
          return true;
        });

        return matchesAllFilters;
      }),
    [pokemon, filters, deferredSearchQuery]
  );

  return (
    <div className='w-full max-w-6xl mx-auto p-6'>
      <StatisticsOverview {...statistics} />

      <SearchFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filters={filters}
        setFilters={setFilters}
        filteredPokemonCount={filteredPokemon.length}
        totalPokemonCount={pokemon.length}
      />

      <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />

      <div
        className={`grid gap-4 ${
          viewMode === VIEW_MODE.SMALL
            ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-9'
            : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        }`}
      >
        {filteredPokemon.length > 0 ? (
          filteredPokemon.map((p) => (
            <PokemonCard key={p.id} pokemon={p} viewMode={viewMode} />
          ))
        ) : (
          <div className='col-span-full text-center py-12 text-gray-500'>
            No Pokemon found matching your filters.
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(Result);
