import React, { useEffect, useState, useRef, useMemo, Suspense } from 'react';
import { useStyle } from '@magento/venia-ui/lib/classify';
import { Link } from 'react-router-dom';
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';
import 'swiper/swiper-bundle.css';
import defaultClasses from './middleSectionHomePage.module.css';
import { ErrorOutline } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import ProductBox from '../ProductBox/productBox';
import GetDeviceType from '../GetDeviceType/getDeviceType';
import ImagePreview from '../ImagePreview/imagePreview';
import { useQuery } from '@apollo/client';
import { GET_MIDDLE_SECTION_DATA } from './middleSectionHomePage.qql';

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

const BannerImage = ({ banner, classes }) => {
    // Initialize bannerImage variable
    let bannerImage;

    let bannerImagePreview = {
        imageUrl: banner.image,
        alt: banner.name,
        type: 'image-category'
    };

    if (banner.url_banner_type === 'product') {
        // Render Link for "product"
        bannerImage = (
            <Link to={banner.url_banner} className={classes.bannerLink}>
                <ImagePreview {...bannerImagePreview} classes={classes} ratio="3/4.3" />
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
                        categoryDescp: '',
                        imageUrl: banner.category_img,
                        mobImageUrl: banner.category_mob_img
                    },
                }}
                className={classes.bannerLink}
            >
                <ImagePreview {...bannerImagePreview} classes={classes} ratio="3/4.3" />
            </Link>
        );
    } else {
        // If url_banner_type is neither "product" nor "category", don't render a Link
        bannerImage = (
            <ImagePreview {...bannerImagePreview} classes={classes} ratio="3/4.3" />
        );
    }

    return bannerImage;
};

const MiddleSectionHomePage = (props) => {
    const classes = useStyle(defaultClasses, props.classes);
    const { isDesktop, isMobile, isTablet } = GetDeviceType();
    const swiperRef = useRef(null);

    const { loading, error, data, refetch } = useQuery(GET_MIDDLE_SECTION_DATA, {
        fetchPolicy: "cache-and-network",
        nextFetchPolicy: "cache-first",
        variables: {
            id: 2
        },
    });

    const tabsData = useMemo(() => {
        if (data && data.getMiddleSectionData) {
            return data.getMiddleSectionData;
        }
          return null;
    }, [data]);

    //const tabsData = data?.getMiddleSectionData;
    //const tabsDataItems = tabsData?.items;
    
    // Determine the number of slides per view
    //const slidesPerView = tabsDataItems && tabsDataItems.length > 1 ? 1.1 : 1;
    // Initialize slidesPerView with a default value
    const [slidesPerView, setSlidesPerView] = useState(1);

    const swiperConfig = {
        spaceBetween: 10,
        slidesPerView: isDesktop ? 4 : slidesPerView,
        centeredSlides: false,
        grabCursor: true,
        loop: false,
        autoplay: {
            delay: 5000,
        }
    };

    // Use isLoading to track the loading state
    const isLoading = loading || !tabsData;
    const isError = error;

    // Watch for changes in tabsDataItems and update slidesPerView
    useEffect(() => {
        if (tabsData) {
            //const newSlidesPerView = tabsData?.[0]?.items?.length > 1 ? 1.1 : 1;
            const newSlidesPerView = tabsData?.reduce(
                (maxItems, tab) =>
                  Math.max(maxItems, tab.items ? tab.items.length : 0),
                0
              ) > 1 ? 1.1 : 1;              
            setSlidesPerView(newSlidesPerView);
            if (swiperRef.current && swiperRef.current.swiper) {
                swiperRef.current.swiper.update(); // Use swiperRef.current.swiper.update() here
            }
        }
    }, [tabsData, isLoading]);

    // useEffect(() => {
    //     if (swiperRef.current && swiperRef.current.swiper) {
    //         swiperRef.current.swiper.update(); // Use swiperRef.current.swiper.update() here
    //     }
    // }, [sectionData]); // Update the Swiper when sectionData changes

    if (isError) {
        return <ErrorContent errorMessage={error.message} />;
    }

    let tabDataFallBack = (
        <Box sx={{ margin: '10px 0' }}>
            <Swiper {...swiperConfig}>
                {Array.from({ length: 5 }, (_, index) => (
                    <SwiperSlide key={index}>
                        <Skeleton variant="rounded" width="100%" height={250} />
                        <Skeleton height={10} style={{ marginTop: 6 }} />
                        <Skeleton height={10} width="60%" />
                    </SwiperSlide>
                ))}
            </Swiper>
        </Box>
    );

    let content = (
        <Box className={classes.box} sx={{ width: '100%' }}>
            <Suspense fallback={<Skeleton variant="text" />}>
                <Typography variant="caption" className={classes.sectionTitle}>
                    {/* {isLoading ? (
                        <Skeleton variant="text" />
                    ) : ( */}
                    {tabsData && tabsData.map((tab, index) => (
                        <span key={index}>{tab.title}</span>
                    ))}
                    {/* )} */}
                </Typography>
            </Suspense>
            {/* {isLoading ? (
                // Render placeholder content while loading
                <Box sx={{ margin: '10px 0' }}>
                    <Swiper {...swiperConfig}>
                        {Array.from({ length: 5 }, (_, index) => (
                            <SwiperSlide key={index}>
                                <Skeleton variant="rounded" width="100%" height={250} />
                                <Skeleton height={10} style={{ marginTop: 6 }} />
                                <Skeleton height={10} width="60%" />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </Box>
            ) : isError ? (
                // Render error content if there's an error
                <ErrorContent errorMessage={error.message} />
            ) : ( */}
            <Suspense fallback={tabDataFallBack}>
                {tabsData && tabsData.map((tab, index) => (
                    <Box key={index} sx={{ margin: '0', padding: "0px 0px 15px" }}>
                        <Swiper ref={swiperRef} {...swiperConfig}>
                            {tab.items.map((banner, tabIndex) => (
                                <>
                                    {banner.item && banner.item.length > 0 ? (
                                        banner.item.map((item, itemIndex) => (
                                            <SwiperSlide key={itemIndex} className={classes.swiperSlide}>
                                                <ProductBox item={item} ratio="3/3.8" />
                                            </SwiperSlide>
                                        ))
                                    ) : (
                                        <SwiperSlide key="fallback" className={classes.swiperBannerSlide}>
                                            <Box className={classes.imageBannerContainer}>
                                                <BannerImage banner={banner} classes={classes} />
                                            </Box>
                                        </SwiperSlide>
                                    )}
                                </>
                            ))}
                        </Swiper>
                    </Box>
                ))}
            </Suspense>
            {/* )} */}
        </Box>
    );

    return <div className={classes.root}>{content}</div>;
};

export default MiddleSectionHomePage;
