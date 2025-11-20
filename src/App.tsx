import { Analytics } from '@vercel/analytics/react';

import { useLoadSaveData } from './hooks/useLoadSaveData';
import SessionInput from './components/SessionInput';
import Result from './components/Result';
import ScrollUpButton from './components/ScrollUpButton';
import ThemeToggle from './components/ThemeToggle';
import { APP_STATE } from './constants';

function App() {
  const {
    appState,
    isLoading,
    error,
    results,
    statistics,
    handleAnalyze,
    handleReset,
  } = useLoadSaveData();

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800'>
      {appState === APP_STATE.LOAD && (
        <div className='flex items-center justify-center min-h-screen py-12'>
          <SessionInput
            onAnalyze={handleAnalyze}
            isLoading={isLoading}
            error={error}
          />
        </div>
      )}

      {appState === APP_STATE.RESULTS && statistics && (
        <div className='py-8'>
          <div className='max-w-6xl mx-auto px-6 mb-6 flex justify-between items-center gap-3'>
            <button
              onClick={handleReset}
              className='bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg shadow hover:shadow-md transition font-medium flex items-center gap-2'
            >
              <span className='material-icons text-xl'>upload_file</span>
              <span>Update Data</span>
            </button>
            <ThemeToggle />
          </div>

          {results.length > 0 ? (
            <Result pokemon={results} statistics={statistics} />
          ) : (
            <div className='max-w-2xl mx-auto px-6'>
              <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center'>
                <div className='text-6xl mb-4'>🎉</div>
                <h2 className='text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2'>
                  Congratulations!
                </h2>
                <p className='text-gray-600 dark:text-gray-300 mb-4'>
                  You've collected all shiny variants for every Pokemon you've
                  caught!
                </p>
                <div className='bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-lg p-4'>
                  <p className='text-green-800 dark:text-green-300 font-medium'>
                    Perfect Collection: {statistics.totalCaught} Pokemon with
                    complete shiny sets
                  </p>
                </div>
                <button
                  onClick={handleReset}
                  className='mt-6 bg-blue-600 dark:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition'
                >
                  Analyze Another Session
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      <ScrollUpButton />
      <Analytics />
    </div>
  );
}

export default App;
