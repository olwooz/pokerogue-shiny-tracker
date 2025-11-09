import { memo, useCallback, useEffect, useState } from 'react';

import { debounce } from '../utils';

function ScrollUpButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = debounce(() => {
      setVisible(window.scrollY > 200);
    }, 100);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <button
      onClick={handleScrollToTop}
      className={`fixed bottom-4 right-4 bg-white text-gray-700 px-4 py-2 rounded-lg shadow hover:shadow-md transition-all font-medium duration-300 ${
        visible
          ? 'opacity-100 pointer-events-auto translate-y-0'
          : 'opacity-0 pointer-events-none translate-y-3'
      }`}
    >
      ↑ Scroll to Top
    </button>
  );
}

export default memo(ScrollUpButton);
