import { Analytics } from '@vercel/analytics/next';

import { useLoadSaveData } from './hooks/useLoadSaveData';
import SessionInput from './components/SessionInput';
import Result from './components/Result';
import ScrollUpButton from './components/ScrollUpButton';
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
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100'>
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
          <div className='max-w-6xl mx-auto px-6 mb-6'>
            <button
              onClick={handleReset}
              className='bg-white text-gray-700 px-4 py-2 rounded-lg shadow hover:shadow-md transition font-medium'
            >
              ← Analyze Another Session
            </button>
          </div>

          {results.length > 0 ? (
            <Result pokemon={results} statistics={statistics} />
          ) : (
            <div className='max-w-2xl mx-auto px-6'>
              <div className='bg-white rounded-lg shadow-lg p-8 text-center'>
                <div className='text-6xl mb-4'>🎉</div>
                <h2 className='text-2xl font-bold text-gray-900 mb-2'>
                  Congratulations!
                </h2>
                <p className='text-gray-600 mb-4'>
                  You've collected all shiny variants for every Pokemon you've
                  caught!
                </p>
                <div className='bg-green-50 border border-green-200 rounded-lg p-4'>
                  <p className='text-green-800 font-medium'>
                    Perfect Collection: {statistics.totalCaught} Pokemon with
                    complete shiny sets
                  </p>
                </div>
                <button
                  onClick={handleReset}
                  className='mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition'
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
