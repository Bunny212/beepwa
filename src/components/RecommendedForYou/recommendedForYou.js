import React, { useMemo } from 'react';
import { useStyle } from '@magento/venia-ui/lib/classify';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper'; // Import Swiper modules
import 'swiper/swiper-bundle.css';
import defaultClasses from './recommendedForYou.module.css';
import { ErrorOutline } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import ProductBox from '../ProductBox/productBox';
import { useQuery } from '@apollo/client';
import { GET_RECOMMENDED_FOR_YOU_DATA } from './recommendedForYou.qql';

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

const RecommendedForYou = props => {
    const classes = useStyle(defaultClasses, props.classes);

    const swiperConfig = {
        spaceBetween: 10,
        slidesPerView: 1,
        centeredSlides: true,
        grabCursor: true,
        loop: true,
        autoplay: {
            delay: 5000,
        }
    };

    const { loading, error, data, refetch } = useQuery(GET_RECOMMENDED_FOR_YOU_DATA, {
        fetchPolicy: "cache-and-network",
        nextFetchPolicy: "cache-first"
    });

    const tabsData = useMemo(() => {
        if (data && data.getHomeRecommendedForYou) {
            return data.getHomeRecommendedForYou;
          }
          return null;
    }, [data]);

    //const tabsData = data?.getHomeRecommendedForYou;

    if (!data) {
        // Handle loading state
        return <Box sx={{ margin: '10px 0' }}>
            <Swiper {...swiperConfig}>
                {Array.from({ length: 2 }, (_, index) => (
                    <SwiperSlide key={index}>
                        <Skeleton variant="rounded" width="100%" height={200} />
                        <Skeleton height={10} style={{ marginTop: 6 }} />
                        <Skeleton height={10} width="60%" />
                    </SwiperSlide>
                ))}
            </Swiper>
        </Box>
    }

    // useEffect(() => {
    //     refetch();
    // }, []);

    // Use isLoading to track the loading state
    const isLoading = loading || !data;
    const isError = error;

    if (isError) {
        return <ErrorContent errorMessage={error.message} />;
    }

    let content = (
        <Box className={classes.box} sx={{ width: '100%' }}>
            <Typography variant="caption" className={classes.sectionTitle}>
                {isLoading ? (
                    <Skeleton variant="text" />
                ) : (
                    // Render actual tabs from data
                    tabsData.map((tab, index) => (
                        <span key={index}>{tab.title}</span>
                    ))
                )}
            </Typography>
            {isLoading ? (
                // Render placeholder content while loading
                <Box sx={{ margin: '10px 0' }}>
                    <Swiper {...swiperConfig}>
                        {Array.from({ length: 2 }, (_, index) => (
                            <SwiperSlide key={index}>
                                <Skeleton variant="rounded" width="100%" height={200} />
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
                // Render actual tab panels from data
                <div>
                    {tabsData.map((tab, index) => (
                        <Box key={index} sx={{ margin: '0' }}>
                            <Swiper {...swiperConfig}>
                                {tab.items.map((item, itemIndex) => (
                                    <SwiperSlide key={itemIndex} className={classes.swiperSlide}>
                                        <ProductBox item={item} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </Box>
                    ))}
                </div>
            )}
        </Box>
    );

    return (
        <div className={classes.root}>
            {content}
        </div>
    );
};

export default RecommendedForYou;
