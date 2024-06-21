import React, { useMemo, Suspense } from 'react';
import { useStyle } from '@magento/venia-ui/lib/classify';
import { Link } from "react-router-dom";
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper'; // Import Swiper modules
import 'swiper/swiper-bundle.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import defaultClasses from './featuredCategories.module.css';
import { ErrorOutline } from '@mui/icons-material';
import IconMask from '../Icons/Mask_group.png';
import Skeleton from '@mui/material/Skeleton';
import GetDeviceType from '../GetDeviceType/getDeviceType';
import ImagePreview from '../ImagePreview/imagePreview';
import { useQuery } from '@apollo/client';
import { GET_FEATURED_CATEGORIES_DATA } from './featuredCategories.qql';

SwiperCore.use([Autoplay]);

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

const FeaturedCategories = props => {
    const classes = useStyle(defaultClasses, props.classes);
    const { isDesktop, isMobile, isTablet } = GetDeviceType();
    const swiperSlideClass = isDesktop ? classes.swiperSlideDesktop : classes.swiperSlide;
    const roundImgClass = isDesktop ? classes.roundImgDesktop : classes.roundImg;
    const catNameClass = isDesktop ? classes.catNameDesktop : classes.catName;


    const boxStyles = useStyle({
        common: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center'
        },
        desktop: {
            backgroundColor: 'transparent',
        },
        mobile: {
            justifyContent: 'space-between',
            backgroundColor: 'transparent',
        },
    });

    const boxStylesElement = useStyle({
        desktop: {
            margin: '0 10px',
        },
        mobile: {
            margin: '0 4px',
        }
    });

    const swiperConfig = {
        spaceBetween: 3,
        slidesPerView: 4.3,
        grabCursor: false,
        loop: false,
        autoplay: {
            delay: 5000,
        }
    };

    const { loading, error, data, refetch } = useQuery(GET_FEATURED_CATEGORIES_DATA, {
        fetchPolicy: "cache-and-network",
        nextFetchPolicy: "cache-first"
    });

    const getFeaturedCategories = useMemo(() => {
        if (data && data.getFeaturedCategories) {
            return data.getFeaturedCategories;
        }
        return null;
    }, [data]);

    let placeHolderContent = (
        <Swiper {...swiperConfig}>
            {Array.from({ length: 5 }, (_, index) => (
                <SwiperSlide key={index}>
                    <div className={swiperSlideClass}>
                        <Skeleton variant="circular" width={40} height={40} />
                        <Skeleton variant="text" height={10} width="40%" sx={{ fontSize: '1rem' }} />
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );

    // if (loading) {
    //     return <div className={classes.root}>{placeHolderContent}</div>;
    // }

    if (error) {
        return <ErrorContent errorMessage={error.message} />;
    }

    let sliderItems = (
        getFeaturedCategories && getFeaturedCategories.map(category => (
            <SwiperSlide key={category.uid}>
                <div className={swiperSlideClass}>
                    <Link
                        aria-label={category.name}
                        to={{
                            pathname: resourceUrl(`/expand/${category.pathKey}/${category.uid}`),
                            state: {
                                parentCatName: category.name,
                                categoryId: category.uid,
                                subCatName: '',
                                categoryDescp: category.catDescp,
                                imageUrl: category.imageUrl,
                                mobImageUrl: category.mobImageUrl
                            }
                        }}
                        className={roundImgClass}
                        data-cy="Fearured-Category"
                    >
                        {category.iconUrl ? (
                            <img
                                classes=""
                                src={category.iconUrl}
                                alt={category.name}
                                title={category.name}
                            />
                        ) : (
                            <img
                                src={IconMask}
                                alt="Icon Mask"
                            />
                        )}
                    </Link>
                    <Link
                        aria-label={category.name}
                        to={{
                            pathname: resourceUrl(`/expand/${category.pathKey}/${category.uid}`),
                            state: {
                                parentCatName: category.name,
                                categoryId: category.uid,
                                subCatName: '',
                                categoryDescp: category.catDescp,
                                imageUrl: category.imageUrl,
                                mobImageUrl: category.mobImageUrl
                            }
                        }}
                        className={catNameClass}
                        data-cy="Fearured-Category"
                    >
                        {category.name}
                    </Link>
                </div>
            </SwiperSlide>
        ))
    );

    let sliderContent = (
        <Suspense fallback={placeHolderContent}>
            <Swiper {...swiperConfig}>
                {sliderItems}
            </Swiper>
        </Suspense>
    );

    let sliderItemsFlex = (
        getFeaturedCategories && getFeaturedCategories.map(category => {
            
            let bannerImagePreview = {
                imageUrl: category.iconUrl,
                alt: category.name,
                type: 'image-category'
            };

            return (
                <Box key={category.uid} sx={{ ...boxStylesElement?.desktop, '@media (max-width: 767px)': boxStylesElement?.mobile }}>
                    <div className={swiperSlideClass}>
                        <Link
                            aria-label={category.name}
                            to={{
                                pathname: resourceUrl(`/expand/${category.pathKey}/${category.uid}`),
                                state: {
                                    parentCatName: category.name,
                                    categoryId: category.uid,
                                    subCatName: '',
                                    categoryDescp: category.catDescp,
                                    imageUrl: category.imageUrl,
                                    mobImageUrl: category.mobImageUrl
                                }
                            }}
                            className={roundImgClass}
                            data-cy="Featured-Category"
                        >
                            {category.iconUrl ? (
                                <ImagePreview {...bannerImagePreview} classes={classes} />
                            ) : (
                                <img
                                    src={IconMask}
                                    alt="Icon Mask"
                                />
                            )}
                        </Link>
                        <Link
                            aria-label={category.name}
                            to={{
                                pathname: resourceUrl(`/expand/${category.pathKey}/${category.uid}`),
                                state: {
                                    parentCatName: category.name,
                                    categoryId: category.uid,
                                    subCatName: '',
                                    categoryDescp: category.catDescp,
                                    imageUrl: category.imageUrl,
                                    mobImageUrl: category.mobImageUrl
                                }
                            }}
                            className={catNameClass}
                            data-cy="Featured-Category"
                        >
                            {category.name}
                        </Link>
                    </div>
                </Box>
            );
        })
    );


    let sliderContentFlex = (
        <Box sx={{ ...boxStyles.common, ...boxStyles.desktop, '@media (max-width: 767px)': boxStyles.mobile }}>
            {sliderItemsFlex}
        </Box>
    );

    return (
        <div className={classes.root}>
            {sliderContentFlex}
        </div>
    );
};

export default FeaturedCategories;
