import type { APP_STATE, VIEW_MODE } from '../constants';
import type { ShinyTier } from './pokemon';

export type AppState = (typeof APP_STATE)[keyof typeof APP_STATE];
export type FilterOption = 'all' | ShinyTier | 'egg-moves' | 'starters';
export type ViewMode = (typeof VIEW_MODE)[keyof typeof VIEW_MODE];
