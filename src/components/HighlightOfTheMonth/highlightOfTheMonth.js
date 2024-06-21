import React, { useEffect, useRef, useMemo } from 'react';
import { useStyle } from '@magento/venia-ui/lib/classify';
import Image from '@magento/venia-ui/lib/components/Image';
import { Link } from 'react-router-dom';
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';
import 'swiper/swiper-bundle.css';
import defaultClasses from './highlightOfTheMonth.module.css';
import { ErrorOutline } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import AddToCart from '../AddToCart/addToCart';
import prodImage from '../Images/prod-img.jpg';
import { useQuery } from '@apollo/client';
import { GET_HOM_SLIDER_DATA } from './highlightOfTheMonth.qql';

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

    if (banner.url_banner_type === 'product') {
        // Render Link for "product"
        bannerImage = (
            <Link to={banner.url_banner} className={classes.bannerLink}>
                <img src={banner.image} alt={banner.name} loading="eager" className={classes.image} maxWidth="100%" maxHeight="100%" />
            </Link>
        );
    } else if (banner.url_banner_type === 'category') {
        // Render Link for "category"
        bannerImage = (
            <Link
                to={{
                    pathname: resourceUrl('/categories/expanded/'),
                    state: {
                        parentCatName: banner.category_name,
                        categoryId: banner.category_link,
                        subCatName: '',
                        categoryDescp: '',
                        imageUrl: '',
                        mobImageUrl: ''
                    },
                }}
                className={classes.bannerLink}
            >
                <img src={banner.image} alt={banner.name} loading="eager" className={classes.image} maxWidth="100%" maxHeight="100%" />
            </Link>
        );
    } else {
        // If url_banner_type is neither "product" nor "category", don't render a Link
        bannerImage = (
            <img src={banner.image} alt={banner.name} loading="eager" className={classes.image} maxWidth="100%" maxHeight="100%" />
        );
    }

    return bannerImage;
};

const HighlightOfTheMonth = (props) => {
    const classes = useStyle(defaultClasses, props.classes);
    const swiperRef = useRef(null);

    const { loading, error, data, refetch } = useQuery(GET_HOM_SLIDER_DATA, {
        fetchPolicy: "cache-and-network",
        nextFetchPolicy: "cache-first",
        variables: {
            id: 2
        },
    });

    const sliderData = useMemo(() => {
        if (data && data.getHomSliderData) {
            return data.getHomSliderData;
          }
          return null;
    }, [data]);

    //const sliderData = data?.getHomSliderData;

    // Determine the number of slides per view
    const slidesPerView = sliderData && sliderData.length > 1 ? 1.3 : 1;

    const swiperConfig = {
        spaceBetween: 10,
        slidesPerView: slidesPerView,
        centeredSlides: false,
        grabCursor: true,
        loop: false,
        autoplay: {
            delay: 5000,
        }
    };

    // Use isLoading to track the loading state
    const isLoading = loading || !data;
    const isError = error;

    useEffect(() => {
        refetch();
    }, []);

    // useEffect(() => {
    //     if (swiperRef.current && swiperRef.current.swiper) {
    //         swiperRef.current.swiper.update(); // Use swiperRef.current.swiper.update() here
    //     }
    // }, [sliderData]); // Update the Swiper when sliderData changes

    if (isError) {
        return <ErrorContent errorMessage={error.message} />;
    }

    let content = (
        <Box className={classes.box} sx={{ width: '100%' }}>
            <Typography variant="caption" className={classes.sectionTitle}>
                {isLoading ? (
                    <Skeleton variant="text" />
                ) : (
                    'Highlight of the month'
                )}
            </Typography>
            {isLoading ? (
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
            ) : (
                // Render actual slides from data
                <>
                    <Box sx={{ margin: '0', padding: "0px 0px 15px" }}>
                        <Swiper ref={swiperRef} {...swiperConfig}>
                            {sliderData.map((banner, index) => (
                                <>
                                    {banner.item && banner.item.length > 0 ? (
                                        banner.item.map((item, itemIndex) => (
                                            <SwiperSlide key={itemIndex} className={classes.swiperSlide}>
                                                <Box className={classes.imageContainer}>
                                                    <Link className={classes.produName} to={item.productPath}>
                                                        <img src={item.imageUrl || prodImage} alt="Product" loading="eager" className={classes.image} maxWidth="100%" maxHeight="100%" />
                                                    </Link>
                                                    <AddToCart product={item} />
                                                </Box>
                                                <Typography sx={{ marginBottom: '0px' }} variant="button" display="block" gutterBottom>
                                                    <Link className={classes.produName} to={item.productPath}>
                                                        {item.name}
                                                    </Link>
                                                </Typography>
                                                <Box className={classes.priceContainer}>
                                                    <Typography variant="h6" component="span" className={classes.priceText}>
                                                        {item.price}
                                                    </Typography>
                                                </Box>
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
                </>
            )}
        </Box>
    );

    return <div className={classes.root}>{content}</div>;
};

export default HighlightOfTheMonth;
