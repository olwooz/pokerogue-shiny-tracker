import { memo, useCallback } from 'react';

import { FILTER_OPTIONS } from '../constants';

import type { FilterOption } from '../types';

const FILTER_BUTTONS = [
  {
    label: 'All',
    value: FILTER_OPTIONS.ALL,
    active: 'bg-blue-600',
    hover: 'hover:bg-blue-200',
  },
  {
    label: 'Regular',
    value: FILTER_OPTIONS.REGULAR,
    active: 'bg-yellow-500',
    hover: 'hover:bg-yellow-200',
  },
  {
    label: 'Rare',
    value: FILTER_OPTIONS.RARE,
    active: 'bg-sky-500',
    hover: 'hover:bg-sky-200',
  },
  {
    label: 'Epic',
    value: FILTER_OPTIONS.EPIC,
    active: 'bg-pink-500',
    hover: 'hover:bg-pink-200',
  },
  {
    label: 'Egg Moves',
    value: FILTER_OPTIONS.EGG_MOVES,
    active: 'bg-gray-600',
    hover: 'hover:bg-gray-200',
  },
  {
    label: 'Starters',
    value: FILTER_OPTIONS.STARTERS,
    active: 'bg-green-600',
    hover: 'hover:bg-green-200',
  },
];

interface SearchFilterProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  filters: Set<FilterOption>;
  setFilters: React.Dispatch<React.SetStateAction<Set<FilterOption>>>;
  filteredPokemonCount: number;
  totalPokemonCount: number;
}

function SearchFilter({
  searchQuery,
  setSearchQuery,
  filters,
  setFilters,
  filteredPokemonCount,
  totalPokemonCount,
}: SearchFilterProps) {
  const handleSearchQueryChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    },
    [setSearchQuery]
  );

  const handleFilterToggle = useCallback(
    (option: FilterOption) => {
      setFilters((prevFilters) => {
        const newFilters = new Set(prevFilters);

        if (option === FILTER_OPTIONS.ALL) {
          return new Set([FILTER_OPTIONS.ALL]);
        }

        if (newFilters.has(FILTER_OPTIONS.ALL)) {
          newFilters.delete(FILTER_OPTIONS.ALL);
        }

        if (newFilters.has(option)) {
          newFilters.delete(option);
          if (newFilters.size === 0) {
            newFilters.add(FILTER_OPTIONS.ALL);
          }
        } else {
          newFilters.add(option);
        }

        return newFilters;
      });
    },
    [setFilters]
  );

  return (
    <div className='bg-white rounded-lg shadow-lg p-6 mb-6'>
      <div className='flex flex-col md:flex-row gap-4'>
        <div className='flex-1'>
          <input
            type='text'
            placeholder='Search by name or ID...'
            value={searchQuery}
            onChange={handleSearchQueryChange}
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none'
          />
        </div>

        <div className='flex flex-wrap gap-2'>
          {FILTER_BUTTONS.map(({ label, value, active, hover }) => {
            const isActive = filters.has(value);
            return (
              <button
                key={value}
                onClick={() => handleFilterToggle(value)}
                className={`px-4 py-2 rounded-lg font-medium transition
                  ${
                    isActive
                      ? `${active} text-white`
                      : `bg-gray-100 text-gray-700 ${hover}`
                  }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <p className='mt-2 text-sm text-gray-600'>
        Showing {filteredPokemonCount} of {totalPokemonCount} Pokémon
      </p>
    </div>
  );
}

export default memo(SearchFilter);
