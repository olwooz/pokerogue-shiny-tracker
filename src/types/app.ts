import type { ShinyTier } from './pokemon';

export type AppState = 'load' | 'results';
export type FilterOption = 'all' | ShinyTier | 'egg-moves';
