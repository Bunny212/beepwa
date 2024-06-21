import React, { useMemo } from 'react';
import { PropTypes } from 'prop-types';
import { AsyncImage } from 'loadable-image';

const ImagePreview = ({ imageUrl, alt, classes, type, className, ratio = "1/1" }) => {
  const imagePreview = useMemo(() => {
    return imageUrl ? (
      <AsyncImage
        alt={alt}
        className={classes?.image || className}
        src={imageUrl}
        type={type}
        //sizes="100vw"
        style={{ width: "100%", height: "auto", aspectRatio: ratio }}
        loader={<div style={{ background: '#E0E0E0', borderRadius: '6px' }} />}
        error={<div style={{ background: '#eee', borderRadius: '6px' }} />}
        //Transition={Grow}
      />
    ) : (
      <span className={classes?.image_empty} />
    );
  }, [classes?.image, type, imageUrl, alt]);

  return <>{imagePreview}</>;
};

ImagePreview.propTypes = {
  image: PropTypes.string,
  alt: PropTypes.string,
  type: PropTypes.string,
  classes: PropTypes.objectOf(PropTypes.string),
  className: PropTypes.string,
};

export default ImagePreview;
