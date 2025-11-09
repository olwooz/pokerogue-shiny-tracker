import { memo } from 'react';

import MissingStat from './MissingStat';
import StatCard from './StatCard';

import { TOTAL_POKEMON_COUNT, TOTAL_STARTER_COUNT } from '../constants';

interface StatisticsOverviewProps {
  totalCaught: number;
  totalWithAllShinies: number;
  totalMissingRegular: number;
  totalMissingRare: number;
  totalMissingEpic: number;
  completionPercentage: number;
  totalStarters: number;
  totalWithAllEggMoves: number;
  totalMissingEggMoves: number;
  eggMovesCompletionPercentage: number;
}

function StatisticsOverview({
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
}: StatisticsOverviewProps) {
  return (
    <section className='bg-white rounded-lg shadow-lg p-6 mb-6'>
      <h2 className='text-xl font-bold text-gray-900 mb-4'>
        Shiny Collection Statistics
      </h2>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <StatCard
          label='Total Pokémon Caught'
          value={totalCaught}
          total={TOTAL_POKEMON_COUNT}
          color='blue'
        />
        <StatCard
          label='Complete Shiny Collections'
          value={totalWithAllShinies}
          total={TOTAL_POKEMON_COUNT}
          color='green'
        />
        <StatCard
          label='Completion Rate'
          value={`${completionPercentage.toFixed(1)}%`}
          color='sky'
        />
      </div>

      <div className='mt-4 grid grid-cols-3 gap-4'>
        <MissingStat
          label='Missing Regular'
          value={totalMissingRegular}
          color='yellow'
        />
        <MissingStat
          label='Missing Rare'
          value={totalMissingRare}
          color='sky'
        />
        <MissingStat
          label='Missing Epic'
          value={totalMissingEpic}
          color='pink'
        />
      </div>

      <hr className='my-4 border-gray-200' />

      <h3 className='text-xl font-bold text-gray-900 mb-4'>
        Egg Moves Collection Statistics
      </h3>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <StatCard
          label='Total Starters Caught'
          value={totalStarters}
          total={TOTAL_STARTER_COUNT}
          color='blue'
        />
        <StatCard
          label='Complete Egg Move Collections'
          value={totalWithAllEggMoves}
          total={TOTAL_STARTER_COUNT}
          color='green'
        />
        <StatCard
          label='Completion Rate'
          value={`${eggMovesCompletionPercentage.toFixed(1)}%`}
          color='sky'
        />
      </div>

      <div className='mt-4'>
        <MissingStat
          label='Missing Egg Moves'
          value={totalMissingEggMoves}
          color='yellow'
        />
      </div>
    </section>
  );
}

export default memo(StatisticsOverview);
