import React, { useState, useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

// COMPONENTS
import GifGrid from 'components/gifGrid/GifGrid';

// HOOKS
import { useGiphyPaginator } from 'hooks';

function Home() {
  const [gifs, setGifs] = useState([]);
  const  paginator = useGiphyPaginator({ limit: 20 });

  const onLoadMoreGifs = useCallback(
    async () => {
      const newGifs = await paginator();
      setGifs(newGifs);
    },
    [gifs]
  );

  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={onLoadMoreGifs}
      hasMore
      loader={<div className="loader" key={0}>Loading ...</div>}
    >
      <GifGrid gifs={gifs} columns={{ lg: 4, md: 3, sm: 2 }} />
    </InfiniteScroll>
  );
}

export default Home;
