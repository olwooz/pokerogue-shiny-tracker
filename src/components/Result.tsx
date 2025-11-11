import { memo, useDeferredValue, useMemo, useState } from 'react';

import PokemonCard from './PokemonCard';
import StatisticsOverview from './StatisticsOverview';
import SearchFilter from './SearchFilter';

import { FILTER_OPTIONS } from '../constants';

import type {
  FilterOption,
  PokemonShinyStatus,
  ShinyTier,
  Statistics,
} from '../types';

interface ResultProps {
  pokemon: PokemonShinyStatus[];
  statistics: Statistics;
}

function Result({ pokemon, statistics }: ResultProps) {
  const [filter, setFilter] = useState<FilterOption>(FILTER_OPTIONS.ALL);
  const [searchQuery, setSearchQuery] = useState('');
  const deferredSearchQuery = useDeferredValue(searchQuery);

  const filteredPokemon = useMemo(
    () =>
      pokemon.filter((p) => {
        const matchesSearch =
          deferredSearchQuery === '' ||
          p.name.toLowerCase().includes(deferredSearchQuery.toLowerCase()) ||
          p.id.toString().includes(deferredSearchQuery);

        if (!matchesSearch) return false;

        if (filter === FILTER_OPTIONS.ALL) return true;
        if (filter === FILTER_OPTIONS.EGG_MOVES) return p.hasMissingEggMoves;
        if (filter === FILTER_OPTIONS.STARTERS) return p.isStarter;
        return p.missingVariants.includes(filter as ShinyTier);
      }),
    [pokemon, filter, deferredSearchQuery]
  );

  return (
    <div className='w-full max-w-6xl mx-auto p-6'>
      <StatisticsOverview {...statistics} />

      <SearchFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filter={filter}
        setFilter={setFilter}
        filteredPokemonCount={filteredPokemon.length}
        totalPokemonCount={pokemon.length}
      />

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {filteredPokemon.length > 0 ? (
          filteredPokemon.map((p) => <PokemonCard key={p.id} pokemon={p} />)
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
