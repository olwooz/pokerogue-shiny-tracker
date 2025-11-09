import { memo } from 'react';
import { COLOR_MAP } from '../constants';

interface MissingStatProps {
  label: string;
  value: number;
  color: 'yellow' | 'sky' | 'pink';
}

function MissingStat({ label, value, color }: MissingStatProps) {
  const { text } = COLOR_MAP[color];

  return (
    <div className='text-center'>
      <p className='text-sm text-gray-600'>{label}</p>
      <p className={`text-2xl font-semibold ${text}`}>{value}</p>
    </div>
  );
}

export default memo(MissingStat);
