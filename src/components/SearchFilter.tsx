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
];

interface SearchFilterProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  filter: FilterOption;
  setFilter: React.Dispatch<React.SetStateAction<FilterOption>>;
  filteredPokemonCount: number;
  totalPokemonCount: number;
}

function SearchFilter({
  searchQuery,
  setSearchQuery,
  filter,
  setFilter,
  filteredPokemonCount,
  totalPokemonCount,
}: SearchFilterProps) {
  const handleSearchQueryChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    },
    [setSearchQuery]
  );

  const handleFilterChange = useCallback(
    (option: FilterOption) => {
      setFilter(option);
    },
    [setFilter]
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
            const isActive = filter === value;
            return (
              <button
                key={value}
                onClick={() => handleFilterChange(value)}
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
