import { memo } from 'react';

import { COLOR_MAP } from '../constants';

interface StatCardProps {
  label: string;
  value: number | string;
  total?: number;
  color: 'blue' | 'green' | 'sky';
}

function StatCard({ label, value, total, color }: StatCardProps) {
  const { bg, text } = COLOR_MAP[color];

  return (
    <div className={`${bg} rounded-lg p-4`}>
      <p className='text-sm text-gray-600'>{label}</p>
      <p className={`text-3xl font-bold ${text}`}>
        {value}
        {typeof total === 'number' && (
          <span className='text-gray-500 text-lg font-medium ml-1'>
            /{total}
          </span>
        )}
      </p>
    </div>
  );
}

export default memo(StatCard);
