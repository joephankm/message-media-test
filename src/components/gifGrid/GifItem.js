import React from 'react';
import PropTypes from 'prop-types';

import ImageBox from './ImageBox';
import Avatar from './Avatar';

function GifItem({ gif, gifWidth }) {
  return (
    <article className="gif-item">
      <ImageBox images={gif.images} url={gif.url} title={gif.title} gifWidth={gifWidth} />
      <Avatar user={gif.user} />
    </article>
  );
}

GifItem.propTypes = {
  gif: PropTypes.object.isRequired,
  gifWidth: PropTypes.number,
};

GifItem.defaultProps = {
  gifWidth: 0,
}

export default GifItem;
