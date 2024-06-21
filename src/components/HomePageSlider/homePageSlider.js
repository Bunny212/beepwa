import React, { useMemo, useState, useEffect, Suspense } from 'react';
import { useStyle } from '@magento/venia-ui/lib/classify';
import { Link } from "react-router-dom";
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Autoplay } from 'swiper'; // Import Swiper modules
import 'swiper/swiper-bundle.css';
import defaultClasses from './homePageSlider.module.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import './homePageSlider.module.css';
import { ErrorOutline } from '@mui/icons-material';
import Skeleton from '@mui/material/Skeleton';
import GetDeviceType from '../GetDeviceType/getDeviceType';
import ImagePreview from '../ImagePreview/imagePreview';
import { useQuery } from '@apollo/client';
import { GET_SLIDER_DATA } from './homePageSlider.qql';

SwiperCore.use([Pagination, Autoplay]);

const ErrorContent = ({ errorMessage }) => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="300px"
        >
            <ErrorOutline sx={{ fontSize: 48, color: 'error.main' }} />
            <Typography variant="h6" component="div" align="center" mt={2}>
                {errorMessage}
            </Typography>
        </Box>
    );
};

const BannerImage = ({ banner, classes, isDesktop }) => {
    // Initialize bannerImage variable
    let bannerImage;

    let bannerImagePreview = {
        imageUrl: isDesktop ? banner.image : banner.image_mob,
        alt: banner.name,
        type: 'image-category'
    };

    if (banner.url_banner_type === 'product') {
        // Render Link for "product"
        bannerImage = (
            <Link to={banner.url_banner} className={classes.produName}>
                <ImagePreview {...bannerImagePreview} classes={classes} ratio="2/1.1" />
            </Link>
        );
    } else if (banner.url_banner_type === 'category') {
        // Render Link for "category"
        bannerImage = (
            <Link
                to={{
                    pathname: resourceUrl(`/expand/${banner.category_urlkey}/${banner.category_link}`),
                    state: {
                        parentCatName: banner.category_name,
                        categoryId: banner.category_link,
                        subCatName: '',
                        categoryDescp: banner.category_descp,
                        imageUrl: banner.category_img,
                        mobImageUrl: banner.category_mob_img
                    },
                }}
                className={classes.produName}
            >
                <ImagePreview {...bannerImagePreview} classes={classes} ratio={isDesktop ? "16/5" : "2/1.1"} />
            </Link>
        );
    } else {
        // If url_banner_type is neither "product" nor "category", don't render a Link
        bannerImage = (
            <ImagePreview {...bannerImagePreview} classes={classes} ratio={isDesktop ? "16/5" : "2/1.1"} />
        );
    }

    return bannerImage;
};

const HomePageSlider = props => {
    const classes = useStyle(defaultClasses, props.classes);

    const { isDesktop, isMobile, isTablet } = GetDeviceType();
    const swiperConfig = {
        spaceBetween: 0,
        slidesPerView: 1,
        centeredSlides: true,
        grabCursor: true,
        loop: true,
        autoplay: {
            delay: 5000,
        },
        pagination: {
            dynamicbullets: false,
            clickable: true, // Enable clickable pagination dots
            bulletActiveClass: `${classes.beeBulletActive}`, // Apply your custom active bullet class
            bulletClass: `${classes.beeBullet}`, // Apply your custom bullet class
        }
    };

    const { loading, error, data, refetch } = useQuery(GET_SLIDER_DATA, {
        fetchPolicy: "cache-and-network",
        nextFetchPolicy: "cache-first",
        variables: {
            id: 1
        },
    });

    const getSliderData = useMemo(() => {
        if (data && data.getSliderData) {
            return data.getSliderData;
        }
          return null;
    }, [data]);

    // if (loading) {
    //     return (
    //         <Box sx={{ margin: '10px 0' }}>
    //             <Swiper {...swiperConfig}>
    //                 {Array.from({ length: 2 }, (_, index) => (
    //                     <SwiperSlide key={index} className={classes.swiperSlide}>
    //                         <Skeleton variant="rounded" width="100%" height={isDesktop ? 500 : 167} />
    //                     </SwiperSlide>
    //                 ))}
    //             </Swiper>
    //         </Box>
    //     );
    // }

    let sliderFallback = (
        <Box sx={{ margin: '10px 0' }}>
            <Swiper {...swiperConfig}>
                {Array.from({ length: 2 }, (_, index) => (
                    <SwiperSlide key={index} className={classes.swiperSlide}>
                        <Skeleton variant="rounded" width="100%" height={isDesktop ? 500 : 167} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </Box>
    );

    if (error) {
        return <ErrorContent errorMessage={error.message} />;
    }

    let sliderItems = (
        getSliderData && getSliderData.map(banner => (
            <SwiperSlide key={banner.banner_id} className={classes.swiperSlide}>
                <Box className={classes.imageContainer}>
                    <BannerImage banner={banner} classes={classes} isDesktop={isDesktop} />
                </Box>
            </SwiperSlide>
        ))
    );

    let sliderContent = (
        <Suspense fallback={sliderFallback}>
            <Swiper {...swiperConfig}>
                {sliderItems}
            </Swiper>
        </Suspense>
    );

    return (
        <div className='root'>
            {sliderContent}
        </div>
    );
};

export default HomePageSlider;
