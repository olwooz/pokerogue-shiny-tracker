import { memo } from 'react';

import { getPokemonSprite } from '../lib/pokemon-data';
import { SHINY_TIER, VIEW_MODE } from '../constants';

import type { PokemonShinyStatus, ShinyTier, ViewMode } from '../types';

const SHINY_TIER_COLORS: Record<
  ShinyTier,
  { bg: string; dot: string; text: string; label: string }
> = {
  regular: {
    bg: 'bg-yellow-100',
    dot: 'bg-yellow-400',
    text: 'text-yellow-800',
    label: 'Regular',
  },
  rare: {
    bg: 'bg-sky-100',
    dot: 'bg-sky-400',
    text: 'text-sky-800',
    label: 'Rare',
  },
  epic: {
    bg: 'bg-pink-100',
    dot: 'bg-pink-400',
    text: 'text-pink-800',
    label: 'Epic',
  },
};

interface PokemonCardProps {
  pokemon: PokemonShinyStatus;
  viewMode?: ViewMode;
}

function PokemonCard({
  pokemon,
  viewMode = VIEW_MODE.LARGE,
}: PokemonCardProps) {
  const {
    id,
    name,
    missingVariants,
    hasRegularShiny,
    caughtRegularShiny,
    hasRareShiny,
    caughtRareShiny,
    hasEpicShiny,
    caughtEpicShiny,
    hasMissingEggMoves,
  } = pokemon;

  const ownedShinies: ShinyTier[] = [];
  if (hasRegularShiny && caughtRegularShiny)
    ownedShinies.push(SHINY_TIER.REGULAR);
  if (hasRareShiny && caughtRareShiny) ownedShinies.push(SHINY_TIER.RARE);
  if (hasEpicShiny && caughtEpicShiny) ownedShinies.push(SHINY_TIER.EPIC);

  const hasNoOwnedShinies = ownedShinies.length === 0;

  const renderMissingBadges = (tiers: ShinyTier[]) =>
    tiers.map((tier) => {
      const color = SHINY_TIER_COLORS[tier];
      return (
        <span
          key={tier}
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color.bg} ${color.text}`}
        >
          Missing: {color.label}
        </span>
      );
    });

  const renderOwnedShinies = () => {
    if (hasNoOwnedShinies) {
      return <span className='text-gray-400'>None</span>;
    }

    return ownedShinies.map((tier) => {
      const color = SHINY_TIER_COLORS[tier as ShinyTier];
      return (
        <span key={tier} className={`${color.text} mr-1`}>
          {color.label}
        </span>
      );
    });
  };

  if (viewMode === VIEW_MODE.SMALL) {
    return (
      <article className='w-fit bg-white rounded-lg shadow-md p-3 hover:shadow-lg transition flex flex-col items-center'>
        <div className='w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden mb-2'>
          <img
            src={getPokemonSprite(id)}
            alt={`${name} sprite`}
            className='w-20 h-20 object-contain'
            loading='lazy'
          />
        </div>

        <div className='flex gap-1 flex-wrap justify-center'>
          {missingVariants.map((tier) => {
            const color = SHINY_TIER_COLORS[tier];
            return (
              <div
                key={tier}
                className={`w-2 h-2 rounded-full ${color.dot}`}
                title={`Missing: ${color.label}`}
                aria-label={`Missing: ${color.label}`}
              />
            );
          })}
          {hasMissingEggMoves && (
            <div
              className='w-2 h-2 rounded-full bg-gray-400'
              title='Missing: Egg Moves'
              aria-label='Missing: Egg Moves'
            />
          )}
        </div>
      </article>
    );
  }

  return (
    <article className='bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition'>
      <div className='flex items-start justify-between'>
        <div className='flex-1'>
          <header className='flex items-center gap-2 mb-2'>
            <span className='text-gray-500 font-mono text-sm'>#{id}</span>
            <h3 className='text-lg font-semibold text-gray-900'>{name}</h3>
          </header>

          <div className='space-y-1 mb-3'>
            {renderMissingBadges(missingVariants)}
            {hasMissingEggMoves && (
              <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800'>
                Missing: Egg Moves
              </span>
            )}
          </div>

          <div className='text-xs text-gray-500'>
            <span>Owned Shinies: </span>
            {renderOwnedShinies()}
          </div>
        </div>

        <div className='w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden'>
          <img
            src={getPokemonSprite(id)}
            alt={`${name} sprite`}
            className='w-16 h-16 object-contain'
            loading='lazy'
          />
        </div>
      </div>
    </article>
  );
}

export default memo(PokemonCard);
