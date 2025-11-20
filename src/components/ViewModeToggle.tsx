import { memo } from 'react';

import { VIEW_MODE } from '../constants';
import type { ViewMode } from '../types';

interface ViewModeToggleProps {
  viewMode: ViewMode;
  setViewMode: (viewMode: ViewMode) => void;
}

function ViewModeToggle({ viewMode, setViewMode }: ViewModeToggleProps) {
  return (
    <div className='mb-4 flex justify-end'>
      <div className='bg-white dark:bg-gray-800 rounded-lg shadow p-1 flex gap-1'>
        <button
          onClick={() => setViewMode(VIEW_MODE.LARGE)}
          className={`px-2 py-1 rounded transition ${
            viewMode === VIEW_MODE.LARGE
              ? 'bg-blue-600 text-white'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
          aria-label='Large card view'
          title='Large card view'
        >
          <span className='align-middle material-icons text-xl'>
            view_agenda
          </span>
        </button>
        <button
          onClick={() => setViewMode(VIEW_MODE.SMALL)}
          className={`px-2 py-1 rounded transition ${
            viewMode === VIEW_MODE.SMALL
              ? 'bg-blue-600 text-white'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
          aria-label='Small card view'
          title='Small card view'
        >
          <span className='align-middle material-icons'>apps</span>
        </button>
      </div>
    </div>
  );
}

export default memo(ViewModeToggle);
