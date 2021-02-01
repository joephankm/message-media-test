import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';

// COMPONENTS
import GifItem from './GifItem';

// CSS
import './GifGrid.css';

const calculateGifWidth = (containerWidth, columns) => {
  if (typeof columns === 'number') {
    return Math.floor(containerWidth / columns);
  }

  if (containerWidth > 992) {
    return Math.floor(containerWidth / (columns.lg || columns.md || columns.sm));
  }
  if (containerWidth > 768) {
    return Math.floor(containerWidth / (columns.md || columns.sm));
  }
  return Math.floor(containerWidth / columns.sm);
}

function GifGrid({ gifs, columns }) {
  const selfRef = useRef(null);
  const [gifWidth, setGifWidth] = useState(null);

  const handleResize = useCallback(() => {
    if (selfRef.current) {
      setGifWidth(calculateGifWidth(selfRef.current.getBoundingClientRect().width, columns));
    }
  }, [selfRef]);

  useEffect(() => {
    if (selfRef.current) {
      handleResize();
    }
  }, [selfRef])

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  const gridClassName = useMemo(() => {
    if (typeof columns === 'number') {
      return `columns-${columns}`;
    }

    return Object.keys(columns).map(size => `columns-${size}-${columns[size]}`).join(' ');
  });

  return (
    <div ref={selfRef} className={`gif-grid ${gridClassName}`}>
      {gifWidth && gifs.map(gif => (
        <GifItem gif={gif} key={gif.id} gifWidth={gifWidth} />
      ))}
    </div>
  );
}

GifGrid.propTypes = {
  gifs: PropTypes.arrayOf(PropTypes.object),
  columns: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      sm: PropTypes.number,
      md: PropTypes.number,
      lg: PropTypes.number,
    }),
  ]),
};

GifGrid.defaultProps = {
  gifs: [],
  columns: 3,
};

export default GifGrid;
