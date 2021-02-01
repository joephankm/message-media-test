import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { getBestRendition, getGifHeight } from '@giphy/js-util';
import { ImAttachment } from 'react-icons/im';
import { FaComment, FaEye, FaHeart } from 'react-icons/fa';

import ImageModal from './ImageModal';

function ImageBox({ images, url, title, gifWidth }) {
  const [showModal, setShowModal] = useState(false);

  const renditionImage = useMemo(() => {
    const height = getGifHeight({ images }, gifWidth);
    const bestRendition = getBestRendition(images, gifWidth, height);
    return images[bestRendition.renditionName];
  }, [gifWidth]);

  const onModalClose = useCallback(() => setShowModal(false), []);

  return (
    <>
      <div className="image-container">
        <div className="image-box" onClick={() => setShowModal(true)}>
          <picture>
            <source type="image/webp" srcSet={renditionImage.webp} />
            <img src={renditionImage.url} alt={title} />
          </picture>
        </div>
        <footer>
          <section>
            {url && (
              <a href={url} className="gif-link" target="_blank"><ImAttachment /></a>
            )}
          </section>
          <section>
            <span>
              <FaEye animate="spin" /> 1024
            </span>
            <span>
                <FaComment /> 47
              </span>
            <span>
                <FaHeart /> 521
              </span>
          </section>
        </footer>
      </div>
      <ImageModal show={showModal} onClose={onModalClose} images={images} imageUrl={images.original.url} />
    </>
  );
}

ImageBox.propTypes = {
  images: PropTypes.objectOf(PropTypes.object).isRequired,
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  gifWidth: PropTypes.number,
};

ImageBox.defaultProps = {
  gifWidth: 0,
};

export default ImageBox;
