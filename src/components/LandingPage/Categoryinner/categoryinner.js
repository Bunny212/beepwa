import React, { Fragment, useMemo } from 'react';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import { shape, string } from 'prop-types';
import { Link, useParams, useLocation } from "react-router-dom";
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import categoryImage from '../Images/category-image.jpg';
import arrowIcon from '../Icons/title-icon-arrow.svg';
import defaultClasses from './categoryinner.module.css';
import { isNonEmptyArray } from '@apollo/client/utilities';
import { ErrorOutline } from '@mui/icons-material';
import Skeleton from '@mui/material/Skeleton';
import ProductBox from '../../ProductBox/productBox';
import { useWindowSize } from '@magento/peregrine';
import { useQuery } from '@apollo/client';
import { GET_CATEGORY_PRODUCTS_SECTIONS_DATA } from '../queries/GetCategoryProductsSectionsData';

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


const CategoryInner = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const windowSize = useWindowSize();
    const isDesktop = windowSize.innerWidth >= 1024;
    const { name = "" } = useParams();
    const location = useLocation();
    const { parentCatName, categoryId, subCatName, categoryDescp, imageUrl, mobImageUrl } = location.state || {};

    const { loading, error, data, refetch } = useQuery(GET_CATEGORY_PRODUCTS_SECTIONS_DATA, {
        fetchPolicy: "cache-and-network",
        nextFetchPolicy: "cache-first",
        variables: {
            uid: categoryId
        },
    });

    const tabsData = useMemo(() => {
        if (data && data.getCategoryProductsSections) {
            return data.getCategoryProductsSections;
          }
          return null;
    }, [data]);

    // Use isLoading to track the loading state
    const isLoading = loading || !data;
    const isError = error;

    //const tabsData = data?.getCategoryProductsSections;

    // useEffect(() => {
    //     refetch();
    // }, []);

    const handleClick = () => {
        console.info('You clicked the Chip.');
    };

    const swiperConfig = {
        spaceBetween: 10,
        slidesPerView: 2.2,
        centeredSlides: false,
        grabCursor: true,
        loop: false
    };

    return (
        <Fragment>
            <div className={classes.root}>
                {imageUrl || mobImageUrl ? (
                    <Card sx={{ maxWidth: '100%', boxShadow: 'none', borderRadius: '6px' }}>
                        <CardMedia
                            sx={{ height: 210 }}
                            image={isDesktop ? imageUrl : mobImageUrl}
                            title="green iguana"
                        />
                    </Card>
                ) : (
                    <Card sx={{ maxWidth: '100%', boxShadow: 'none', borderRadius: '6px' }}>
                        <CardMedia
                            sx={{ height: 210 }}
                            image={categoryImage}
                            title="green iguana"
                        />
                    </Card>
                )}
                {parentCatName && (
                    <Typography className={classes.robertFont} variant="h4">
                        {parentCatName}
                    </Typography>
                )}
                {subCatName && (
                    <Typography className={classes.robertFont} variant="h6">
                        {subCatName} (16)
                    </Typography>
                )}
                {categoryDescp && (
                    <Typography className={classes.robertFont} variant="body2">
                        {categoryDescp}
                    </Typography>
                )}
                {isLoading ? (
                    // Render placeholder content while loading
                    Array.from({ length: 3 }, (_, index) => (
                        <Box key={index} sx={{ margin: '30px 0 0' }}>
                            <Box className={classes.flexBox} sx={{ margin: '20px 0' }}>
                                <Typography className={classes.categoryTitle} sx={{ fontWeight: '500' }} variant="h6">
                                    <Skeleton variant="text" height={20} width={80} />
                                </Typography>
                                <Link disabled><Skeleton variant="text" height={20} width={80} /></Link>
                            </Box>
                            <Box sx={{ margin: '10px 0' }}>
                                <Swiper {...swiperConfig}>
                                    {Array.from({ length: 5 }, (_, index) => (
                                        <SwiperSlide key={index}>
                                            <Skeleton variant="rounded" width="100%" height={200} />
                                            <Skeleton height={10} style={{ marginTop: 6 }} />
                                            <Skeleton height={10} width="60%" />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </Box>
                        </Box>
                    ))
                ) : isError ? (
                    // Render error content if there's an error
                    <ErrorContent errorMessage={error.message} />
                ) : isNonEmptyArray(tabsData) ? (
                    // Render actual tab panels from data
                    <>
                        {tabsData.map((section, index) => (
                            isNonEmptyArray(section.items) && (
                                <Box key={index} sx={{ margin: '30px 0 0' }}>
                                    <Box className={classes.flexBox} sx={{ margin: '20px 0' }}>
                                        <Typography className={classes.categoryTitle} sx={{ fontWeight: '500' }} variant="h6">
                                            <Link to={{
                                                pathname: resourceUrl(`/${section.category_urlkey}/${section.sub_category_uid}`),
                                                state: { parentCatName: section.section_title, categoryId: section.sub_category_uid, subCatName: subCatName, categoryDescp: '', imageUrl: '', mobImageUrl: '' }
                                            }}>{section.section_title}</Link>
                                            <Avatar
                                                alt={section.section_title}
                                                src={arrowIcon}
                                                sx={{ width: 16, height: 16, marginLeft: '5px' }}
                                                variant="square" />
                                        </Typography>
                                        <Link className={classes.link} to={{
                                            pathname: resourceUrl(`/${section.category_urlkey}/${section.sub_category_uid}`),
                                            state: { parentCatName: section.section_title, categoryId: section.sub_category_uid, subCatName: subCatName, categoryDescp: '', imageUrl: '', mobImageUrl: '' }
                                        }}>View all ({section.count})<ArrowForwardOutlinedIcon sx={{ fontSize: 14 }} /></Link>
                                    </Box>
                                    <Box sx={{ margin: '20px 0' }}>
                                        <Swiper {...swiperConfig}>
                                            {section.items.map((item, itemIndex) => (
                                                <SwiperSlide key={itemIndex}>
                                                    <ProductBox item={item}/>
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    </Box>
                                </Box>
                            )
                        ))}
                    </>
                ) : (
                    <ErrorContent errorMessage="No data available" />
                )}
            </div>
        </Fragment>
    );
}

CategoryInner.propTypes = {
    classes: shape({ root: string })
};
CategoryInner.defaultProps = {};
export default CategoryInner;