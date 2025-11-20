import { useCallback, useState, useEffect } from 'react';

import { analyzeMissingShinies, getShinyStatistics } from '../lib/shiny-parser';
import { getPokemonNamesMap } from '../lib/pokemon-data';
import { APP_STATE, ERROR_MESSAGES } from '../constants';
import { saveToLocalStorage, loadFromLocalStorage } from '../lib/local-storage';

import type { AppState, Statistics, PokemonShinyStatus } from '../types';

export function useLoadSaveData() {
  const [appState, setAppState] = useState<AppState>(APP_STATE.LOAD);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<PokemonShinyStatus[]>([]);
  const [statistics, setStatistics] = useState<Statistics | null>(null);

  useEffect(() => {
    const savedData = loadFromLocalStorage();
    if (savedData) {
      setResults(savedData.results);
      setStatistics(savedData.statistics);
      setAppState(APP_STATE.RESULTS);
    }
  }, []);

  const handleAnalyze = useCallback(async (saveDataString: string) => {
    setIsLoading(true);
    setError(null);

    try {
      let saveData;
      try {
        saveData = JSON.parse(saveDataString);
      } catch {
        throw new Error(ERROR_MESSAGES.INVALID_JSON);
      }

      if (!saveData || typeof saveData !== 'object') {
        throw new Error(ERROR_MESSAGES.INVALID_SAVE_DATA);
      }

      if (!saveData.dexData || typeof saveData.dexData !== 'object') {
        throw new Error(ERROR_MESSAGES.MISSING_DEX_DATA);
      }

      const pokemonNames = getPokemonNamesMap();
      const missingShinies = analyzeMissingShinies(saveData, pokemonNames);
      const stats = getShinyStatistics(saveData);

      setResults(missingShinies);
      setStatistics(stats);
      setAppState(APP_STATE.RESULTS);
      saveToLocalStorage(missingShinies, stats);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(ERROR_MESSAGES.UNEXPECTED_ERROR);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleReset = useCallback(() => {
    setAppState(APP_STATE.LOAD);
    setResults([]);
    setStatistics(null);
    setError(null);
  }, []);

  return {
    isLoading,
    error,
    results,
    statistics,
    appState,
    handleAnalyze,
    handleReset,
  };
}
