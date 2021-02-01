import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

function ImageModal({ show, onClose, images }) {
  const renderContent = useCallback(() => {
    if (!show) return null;
    if (images.hd && images.hd.mp4) {
      return (
        <video autoPlay onClick={e => e.stopPropagation()} >
          <source src={images.hd.mp4} type="video/mp4" />
        </video>
      );
    }

    return <img src={images.original.url} alt="" onClick={e => e.stopPropagation()} />;
  }, [show, images]);

  if (!show) return null;

  return (
    <div className="image-modal" onClick={onClose}>
      <section>
        {renderContent()}
      </section>
    </div>
  );
}

ImageModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  images: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default ImageModal;
