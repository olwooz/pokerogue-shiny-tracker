import { memo, useCallback, useState } from 'react';
import { INSTRUCTIONS } from '../constants';
import FileDropZone from './FileDropZone';

interface SessionInputProps {
  onAnalyze: (saveData: string) => void;
  isLoading: boolean;
  error: string | null;
}

function SessionInput({ onAnalyze, isLoading, error }: SessionInputProps) {
  const [saveData, setSaveData] = useState('');
  const [showInstructions, setShowInstructions] = useState(false);

  const handleSaveDataChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setSaveData(e.target.value);
    },
    []
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = saveData.trim();
      if (!trimmed) return;
      onAnalyze(trimmed);
    },
    [saveData, onAnalyze]
  );

  const handleToggleInstructions = useCallback(() => {
    setShowInstructions((prev) => !prev);
  }, []);

  const handleClear = useCallback(() => {
    setSaveData('');
  }, []);

  const handleFileLoad = useCallback((content: string) => {
    setSaveData(content);
  }, []);

  return (
    <section className='w-full max-w-2xl mx-auto p-6'>
      <div className='bg-white rounded-lg shadow-lg p-8'>
        <header className='mb-6'>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>
            PokéRogue Shiny Tracker
          </h1>
          <p className='text-gray-600'>
            Discover which shiny variants you're still missing in PokeRogue!
          </p>
        </header>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <FileDropZone onFileLoad={handleFileLoad} isDisabled={isLoading} />

          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border-t border-gray-300'></div>
            </div>
            <div className='relative flex justify-center text-sm'>
              <span className='px-2 bg-white text-gray-500'>or</span>
            </div>
          </div>

          <div>
            <label
              htmlFor='saveData'
              className='block text-sm font-medium text-gray-700 mb-2'
            >
              Paste Your Save Data
            </label>

            <div className='relative'>
              <textarea
                id='saveData'
                value={saveData}
                onChange={handleSaveDataChange}
                placeholder='Paste your save data JSON here (see instructions below)'
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition font-mono text-sm'
                rows={8}
                disabled={isLoading}
                required
              />
              {saveData && !isLoading && (
                <button
                  type='button'
                  onClick={handleClear}
                  aria-label='Clear input'
                  className='absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition'
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {error && (
            <div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg'>
              <p className='font-medium'>Error</p>
              <p className='text-sm'>{error}</p>
            </div>
          )}

          <button
            type='submit'
            disabled={isLoading || !saveData.trim()}
            className='w-full bg-blue-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition'
          >
            {isLoading ? 'Analyzing...' : 'Analyze Shinies'}
          </button>
        </form>

        <div className='mt-6'>
          <button
            type='button'
            onClick={handleToggleInstructions}
            className='text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1'
          >
            <span>{showInstructions ? '▼' : '▶'}</span>
            How do I get my save data?
          </button>

          {showInstructions && (
            <div className='mt-3 p-4 bg-gray-50 rounded-lg border border-gray-200'>
              <pre className='text-sm text-gray-700 whitespace-pre-wrap font-mono'>
                {INSTRUCTIONS}
              </pre>
            </div>
          )}
        </div>

        <footer className='mt-6 p-4 bg-green-50 border border-green-200 rounded-lg'>
          <p className='text-sm text-green-800'>
            <strong>100% Private:</strong>
            <br />
            All data is processed locally in your browser. Nothing is sent to
            any server.
          </p>
        </footer>
      </div>
    </section>
  );
}

export default memo(SessionInput);
