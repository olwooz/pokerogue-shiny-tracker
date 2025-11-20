import type { PokemonShinyStatus, Statistics } from '../types';

const STORAGE_KEY = 'pokerogue-shiny-tracker-data';

export type SavedData = {
  results: PokemonShinyStatus[];
  statistics: Statistics;
  timestamp: number;
  version: string;
};

export function saveToLocalStorage(
  results: PokemonShinyStatus[],
  statistics: Statistics
): void {
  try {
    const data: SavedData = {
      results,
      statistics,
      timestamp: Date.now(),
      version: '1.0',
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
    throw new Error(
      'Failed to save data. Your browser may have storage disabled.'
    );
  }
}

export function loadFromLocalStorage(): SavedData | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const data = JSON.parse(stored) as SavedData;

    if (!data.results || !data.statistics || !data.timestamp) {
      console.warn('Invalid stored data structure, clearing...');
      clearLocalStorage();
      return null;
    }

    return data;
  } catch (error) {
    console.error('Failed to load from localStorage:', error);
    clearLocalStorage();
    return null;
  }
}

export function clearLocalStorage(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear localStorage:', error);
  }
}

export function hasSavedData(): boolean {
  return localStorage.getItem(STORAGE_KEY) !== null;
}
