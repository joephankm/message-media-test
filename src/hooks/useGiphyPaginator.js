import { useRef } from 'react';
import { GiphyFetch, gifPaginator } from '@giphy/js-fetch-api';

// CONSTANTS
import { GIPHY_API_KEY } from 'constants/giphy';

const gf = new GiphyFetch(GIPHY_API_KEY);

export const useGiphyPaginator = ({ limit = 10 }) => {
  const ref = useRef(null);

  if (!ref.current) {
    const fetchGifs = (offset) => gf.trending({ offset, limit })
    ref.current = gifPaginator(fetchGifs);
  }

  return ref.current;
};
