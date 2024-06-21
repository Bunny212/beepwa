import React from "react";

import { useStyle } from '@magento/venia-ui/lib/classify';
import { useProductImageCarousel } from '@magento/peregrine/lib/talons/ProductImageCarousel/useProductImageCarousel';
import defaultClasses from './swiperProductImageCarousel.css';

import Box from '@mui/material/Box';
import SwiperCore, { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

SwiperCore.use([Pagination]);
const IMAGE_WIDTH = 640;

const swiperProductImageCarousel = (props) => {
  const { images, setSlideChanged, isDesktop } = props;
  const talonProps = useProductImageCarousel({
      images,
      imageWidth: IMAGE_WIDTH
  });
  const {
    currentImage,
    activeItemIndex,
    altText,
    handleNext,
    handlePrevious,
    handleThumbnailClick,
    sortedImages
  } = talonProps;

  const slidesPerView = sortedImages.length === 1 ? 1 : 1.3;

  const swiperConfig = {
      spaceBetween: isDesktop ? 0 : 4,
      slidesPerView: isDesktop ? 1 : slidesPerView,
      centeredSlides: false,
      grabCursor: true,
      loop: isDesktop ? true : false,
      onBeforeInit: (swiper) => {
        swiper.on('slideChange', () => setSlideChanged(true));
      },
      onSlideChange: (swiper) => {
        if (swiper.activeIndex === 0) {
          setSlideChanged(false);
        }
      },
  };

  const resetSlideChanged = () => setSlideChanged(false);

  const classes = useStyle(defaultClasses, props.classes);

  const renderImage = (image) => {
    if (image.file) {
      return (
        // <Image
        //   alt={altText}
        //   resource={image.file}
        //   width={IMAGE_WIDTH}
        // />
        <img src={'/media/catalog/product'+image.file} alt={altText} />
      );
    } else {
      return (
        // <Image
        //   alt={altText}
        //   src={transparentPlaceholder}
        // />
        <img src={'/media/catalog/product'+image.file} alt={altText} />
      );
    }
  };

  return (
    <div className={classes.root}>
      <Box className={classes.box}>
        {isDesktop ? (
          <Swiper {...swiperConfig} pagination={{ clickable: true }}>
            {sortedImages.map((image, index) => (
              <SwiperSlide style={{ borderRadius: "6px", overflow: "hidden" }} key={index}>{renderImage(image)}</SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <Swiper {...swiperConfig}>
            {sortedImages.map((image, index) => (
              <SwiperSlide style={{ borderRadius: "6px", overflow: "hidden" }} key={index}>{renderImage(image)}</SwiperSlide>
            ))}
          </Swiper>
        )}
      </Box>
    </div>
  );
};

export default swiperProductImageCarousel;
