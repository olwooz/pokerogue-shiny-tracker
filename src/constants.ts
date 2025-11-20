import type { FilterOption } from './types';

export const APP_STATE = {
  LOAD: 'load',
  RESULTS: 'results',
} as const;

export const ERROR_MESSAGES = {
  INVALID_JSON:
    'Invalid JSON format. Please copy the data exactly as shown in the instructions.',
  INVALID_SAVE_DATA:
    'Invalid save data format. Make sure you copied the complete system save data.',
  MISSING_DEX_DATA:
    'Save data is missing dexData. Make sure you copied the complete system save data.',
  UNEXPECTED_ERROR: 'An unexpected error occurred. Please try again.',
} as const;

export const INSTRUCTIONS = `To get your save data:

Method A: .prsv file
1. Open PokéRogue at https://pokerogue.net
2. Press ESC to open the menu
3. Select "Manage Data"
4. Select "Export Data" and save the file

Method B: API response
1. Open PokéRogue at https://pokerogue.net
2. Open Developer Tools (Press F12)
3. Go to the "Network" tab
4. Type "savedata" in the filter
5. Right click on "get?clientSessionId=..."
6. Click on "Copy > Copy response"
7. Paste it into the box above

If you don't see the "get?clientSessionId=..." request, you may need to refresh the page with the developer tools open.
`;

export const SHINY_BITS = {
  REGULAR: 1,
  RARE: 5,
  EPIC: 6,
} as const;

export const SHINY_VALUES = {
  REGULAR: 1,
  RARE: 2,
  EPIC: 3,
} as const;

export const SHINY_TIER = {
  REGULAR: 'regular',
  RARE: 'rare',
  EPIC: 'epic',
} as const;

export const FILTER_OPTIONS: Record<string, FilterOption> = {
  ALL: 'all',
  REGULAR: 'regular',
  RARE: 'rare',
  EPIC: 'epic',
  EGG_MOVES: 'egg-moves',
  STARTERS: 'starters',
} as const;

export const COLOR_MAP = {
  blue: { bg: 'bg-blue-50 dark:bg-blue-950/40', text: 'text-blue-600 dark:text-blue-400' },
  green: { bg: 'bg-green-50 dark:bg-green-950/40', text: 'text-green-600 dark:text-green-400' },
  sky: { bg: 'bg-sky-50 dark:bg-sky-950/40', text: 'text-sky-600 dark:text-sky-400' },
  yellow: { bg: 'bg-yellow-50 dark:bg-yellow-950/40', text: 'text-yellow-600 dark:text-yellow-400' },
  pink: { bg: 'bg-pink-50 dark:bg-pink-950/40', text: 'text-pink-600 dark:text-pink-400' },
};

export const VIEW_MODE = {
  SMALL: 'small',
  LARGE: 'large',
} as const;

export const TOTAL_POKEMON_COUNT = 1082;
export const TOTAL_STARTER_COUNT = 569;

export const ALL_EGG_MOVES = 15;
