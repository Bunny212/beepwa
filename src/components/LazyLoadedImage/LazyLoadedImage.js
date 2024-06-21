import React from 'react';
import LazyLoad from 'react-lazyload';

const LazyLoadedImage = ({ src, alt, width, height }) => {
    return (
        <LazyLoad height={height}>
            <img src={src} alt={alt} width={width} height={height} />
        </LazyLoad>
    );
};

export default LazyLoadedImage;
