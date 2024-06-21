import React, { Fragment, useState, useEffect } from 'react';
import {mergeClasses} from '@magento/venia-ui/lib/classify';
import {shape, string} from 'prop-types';
import { Link, useParams, useLocation } from "react-router-dom";
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';
import Image from '@magento/venia-ui/lib/components/Image';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import ListItemButton from '@mui/material/ListItemButton';
// import Button from '@mui/material/Button';
import { Button, InputAdornment, IconButton, TextField } from '@mui/material';
import { AddCircleOutline, RemoveCircleOutline, Delete } from '@mui/icons-material';
import { CSSTransition } from 'react-transition-group';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Navigation, Pagination, Scrollbar, A11y, SwiperCore, FreeMode } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

import StarIcon from '@mui/icons-material/Star';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import { styled } from '@mui/material/styles';
import NewIcon from '../Icons/NewIcon.svg';
import DealsIcon from '../Icons/DealsIcon.svg';
import RoutinesIcon from '../Icons/RoutinesIcon.svg';
import Top10Icon from '../Icons/Top10Icon.svg';
import CategoryIcon from '../Icons/CategoryIcon.svg';
import SkinIcon from '../Icons/SkinIcon.svg';
import IncIcon from '../Icons/IncIcon.svg';
import SeasonIcon from '../Icons/SeasonIcon.svg';
import categoryImage from '../Images/category-image.jpg';
import prodImage from '../Images/prod-img.jpg';
import arrowIcon from '../Icons/title-icon-arrow.svg';
import { Skeleton } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';

import defaultClasses from './index.css';
import { isNonEmptyArray } from '@apollo/client/utilities';

import { useQuery } from '@apollo/client';
//import { GET_PRODUCTS_LIST_BY_CATEGORY } from '../../queries/GetProductsListByCategory';

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

const Expanded = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const { name = "" } = useParams();
    const location = useLocation();
    const { parentCatName, subCatName, categoryDescp, imageUrl } = location.state || {};

    // Split the pathname by '/'
    const pathSegments = location.pathname.split('/');
    // Get the last two segments as parameters
    const categoryId = pathSegments[pathSegments.length - 2];

    // const { loading, error, data, refetch } = useQuery(GET_PRODUCTS_LIST_BY_CATEGORY, {
    //     variables: {
    //       categoryId: categoryId,
    //       offset: 0,
    //       limit: 3
    //     },
    // });

    // useEffect(() => {
    //     // Perform additional logic or data manipulation here on page load
    //     // You can also trigger a manual refetch if needed
    //     refetch();
    // }, []);
    
    // if (loading) {
    //     return (
    //         <div className={classes.root}>
    //             {/* Text Skeleton */}
    //             <Skeleton animation="wave" variant="text" width={100} height={25} />
        
    //             {/* Circular Skeletons */}
    //             <Box sx={{ flexGrow: 1 }}>
    //                 <Grid container spacing={2}>
    //                     {[...Array(9)].map((_, index) => (
    //                         <Grid item xs={4} key={index}>
    //                             <Item>
    //                                 <Skeleton animation="wave" variant="circular" width={55} height={55} />
    //                             </Item>
    //                         </Grid>
    //                     ))}
    //                 </Grid>
    //             </Box>
    //             {/* Text Skeleton */}
    //             <Skeleton animation="wave" variant="text" width={100} height={25} />
        
    //             {/* Circular Skeletons */}
    //             <Box sx={{ flexGrow: 1 }}>
    //                 <Grid container spacing={2}>
    //                     {[...Array(9)].map((_, index) => (
    //                         <Grid item xs={4} key={index}>
    //                             <Item>
    //                                 <Skeleton animation="wave" variant="circular" width={55} height={55} />
    //                             </Item>
    //                         </Grid>
    //                     ))}
    //                 </Grid>
    //             </Box>
    //         </div>
    //     );
    // }

    // if (error) {
    //     return <ErrorContent errorMessage={error.message} />;
    // }

    // const { getProductsListByCategory } = data;


    return (
        <Fragment>
            <div className={classes.root}>
                {imageUrl ? (
                    <Card sx={{ maxWidth: '100%', boxShadow: 'none', borderRadius: '6px' }}>
                        <CardMedia
                            sx={{ height: 210 }}
                            image={imageUrl}
                            title="green iguana"
                        />
                    </Card>
                ): (
                    <Card sx={{ maxWidth: '100%', boxShadow: 'none', borderRadius: '6px' }}>
                        <CardMedia
                            sx={{ height: 210 }}
                            image={categoryImage}
                            title="green iguana"
                        />
                    </Card>
                )}
                <br />
                {parentCatName && (
                    <Typography className={classes.robertFont} variant="h4">
                        {parentCatName}
                    </Typography>
                )}
                {subCatName && (
                    <Typography className={classes.robertFont} variant="h6">
                        {subCatName}
                    </Typography>
                )}
                <br />
                {categoryDescp && (
                    <Typography className={classes.robertFont} variant="body2">
                        {categoryDescp}
                    </Typography>
                )}
                {/* <div>
                    {getProductsListByCategory.map(product => (
                        <div key={product.id}>
                            <h2 className={classes.heading}>{product.name}</h2>
                        </div>
                    ))}
                </div> */}
                <Box sx={{ margin: '30px 0 0' }}>
                    <Grid sx={{ flexGrow: 1, padding: '0px' }} container spacing={2}>
                        <Grid item xs={6}>
                            <Box className={classes.imageContainer}>
                                <Typography variant="caption" className={classes.prodLabel}>
                                    New
                                </Typography>
                                <Link className={classes.produName} to="/lip-care-coolips-spf-22.html">
                                    <Image src={prodImage} alt="Product" loading="eager" className={classes.image} maxWidth="100%" maxHeight="100%" />
                                </Link>
                            </Box>
                            <Typography sx={{ marginBottom: '0px' }} variant="button" display="block" gutterBottom>
                                <Link className={classes.produName} to="/lip-care-coolips-spf-22.html">
                                    Lip Care - Coolips SPF 15
                                </Link>
                            </Typography>
                            <Box className={classes.priceContainer}>
                                <Typography variant="h6" component="span" className={classes.priceText}>
                                    $229
                                </Typography>
                            </Box>
                            {/* <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                                >
                                <Rating
                                    className={classes.customRating}
                                    name="product-feedback"
                                    value={4}
                                    precision={0.5}
                                    size="small"
                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" readOnly />}
                                />
                                <Box className={classes.robertFont} sx={{ ml: 0, fontSize: 10 }}>1178 reviews</Box>
                            </Box> */}
                        </Grid>
                        <Grid item xs={6}>
                            <Box className={classes.imageContainer}>
                                <Typography variant="caption" className={classes.prodLabel}>
                                    New
                                </Typography>
                                <Link className={classes.produName} to="/lip-care-coolips-spf-22.html">
                                    <Image src={prodImage} alt="Product" loading="eager" className={classes.image} maxWidth="100%" maxHeight="100%" />
                                </Link>
                            </Box>
                            <Typography sx={{ marginBottom: '0px' }} variant="button" display="block" gutterBottom>
                                <Link className={classes.produName} to="/lip-care-coolips-spf-22.html">
                                    Lip Care - Coolips SPF 15
                                </Link>
                            </Typography>
                            <Box className={classes.priceContainer}>
                                <Typography variant="h6" component="span" className={classes.priceText}>
                                    $229
                                </Typography>
                            </Box>
                            {/* <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                                >
                                <Rating
                                    className={classes.customRating}
                                    name="product-feedback"
                                    value={4}
                                    precision={0.5}
                                    size="small"
                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" readOnly />}
                                />
                                <Box className={classes.robertFont} sx={{ ml: 0, fontSize: 10 }}>1178 reviews</Box>
                            </Box> */}
                        </Grid>
                        <Grid item xs={6}>
                            <Box className={classes.imageContainer}>
                                <Typography variant="caption" className={classes.prodLabel}>
                                    New
                                </Typography>
                                <Link className={classes.produName} to="/lip-care-coolips-spf-22.html">
                                    <Image src={prodImage} alt="Product" loading="eager" className={classes.image} maxWidth="100%" maxHeight="100%" />
                                </Link>
                            </Box>
                            <Typography sx={{ marginBottom: '0px' }} variant="button" display="block" gutterBottom>
                                <Link className={classes.produName} to="/lip-care-coolips-spf-22.html">
                                    Lip Care - Coolips SPF 15
                                </Link>
                            </Typography>
                            <Box className={classes.priceContainer}>
                                <Typography variant="h6" component="span" className={classes.priceText}>
                                    $229
                                </Typography>
                            </Box>
                            {/* <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                                >
                                <Rating
                                    className={classes.customRating}
                                    name="product-feedback"
                                    value={4}
                                    precision={0.5}
                                    size="small"
                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" readOnly />}
                                />
                                <Box className={classes.robertFont} sx={{ ml: 0, fontSize: 10 }}>1178 reviews</Box>
                            </Box> */}
                        </Grid>
                        <Grid item xs={6}>
                            <Box className={classes.imageContainer}>
                                <Typography variant="caption" className={classes.prodLabel}>
                                    New
                                </Typography>
                                <Link className={classes.produName} to="/lip-care-coolips-spf-22.html">
                                    <Image src={prodImage} alt="Product" loading="eager" className={classes.image} maxWidth="100%" maxHeight="100%" />
                                </Link>
                            </Box>
                            <Typography sx={{ marginBottom: '0px' }} variant="button" display="block" gutterBottom>
                                <Link className={classes.produName} to="/lip-care-coolips-spf-22.html">
                                    Lip Care - Coolips SPF 15
                                </Link>
                            </Typography>
                            <Box className={classes.priceContainer}>
                                <Typography variant="h6" component="span" className={classes.priceText}>
                                    $229
                                </Typography>
                            </Box>
                            {/* <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                                >
                                <Rating
                                    className={classes.customRating}
                                    name="product-feedback"
                                    value={4}
                                    precision={0.5}
                                    size="small"
                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" readOnly />}
                                />
                                <Box className={classes.robertFont} sx={{ ml: 0, fontSize: 10 }}>1178 reviews</Box>
                            </Box> */}
                        </Grid>
                        <Grid item xs={6}>
                            <Box className={classes.imageContainer}>
                                <Typography variant="caption" className={classes.prodLabel}>
                                    New
                                </Typography>
                                <Link className={classes.produName} to="/lip-care-coolips-spf-22.html">
                                    <Image src={prodImage} alt="Product" loading="eager" className={classes.image} maxWidth="100%" maxHeight="100%" />
                                </Link>
                            </Box>
                            <Typography sx={{ marginBottom: '0px' }} variant="button" display="block" gutterBottom>
                                <Link className={classes.produName} to="/lip-care-coolips-spf-22.html">
                                    Lip Care - Coolips SPF 15
                                </Link>
                            </Typography>
                            <Box className={classes.priceContainer}>
                                <Typography variant="h6" component="span" className={classes.priceText}>
                                    $229
                                </Typography>
                            </Box>
                            {/* <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                                >
                                <Rating
                                    className={classes.customRating}
                                    name="product-feedback"
                                    value={4}
                                    precision={0.5}
                                    size="small"
                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" readOnly />}
                                />
                                <Box className={classes.robertFont} sx={{ ml: 0, fontSize: 10 }}>1178 reviews</Box>
                            </Box> */}
                        </Grid>
                        <Grid item xs={6}>
                            <Box className={classes.imageContainer}>
                                <Typography variant="caption" className={classes.prodLabel}>
                                    New
                                </Typography>
                                <Link className={classes.produName} to="/lip-care-coolips-spf-22.html">
                                    <Image src={prodImage} alt="Product" loading="eager" className={classes.image} maxWidth="100%" maxHeight="100%" />
                                </Link>
                            </Box>
                            <Typography sx={{ marginBottom: '0px' }} variant="button" display="block" gutterBottom>
                                <Link className={classes.produName} to="/lip-care-coolips-spf-22.html">
                                    Lip Care - Coolips SPF 15
                                </Link>
                            </Typography>
                            <Box className={classes.priceContainer}>
                                <Typography variant="h6" component="span" className={classes.priceText}>
                                    $229
                                </Typography>
                            </Box>
                            {/* <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                                >
                                <Rating
                                    className={classes.customRating}
                                    name="product-feedback"
                                    value={4}
                                    precision={0.5}
                                    size="small"
                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" readOnly />}
                                />
                                <Box className={classes.robertFont} sx={{ ml: 0, fontSize: 10 }}>1178 reviews</Box>
                            </Box> */}
                        </Grid>
                        <Grid item xs={6}>
                            <Box className={classes.imageContainer}>
                                <Typography variant="caption" className={classes.prodLabel}>
                                    New
                                </Typography>
                                <Link className={classes.produName} to="/lip-care-coolips-spf-22.html">
                                    <Image src={prodImage} alt="Product" loading="eager" className={classes.image} maxWidth="100%" maxHeight="100%" />
                                </Link>
                            </Box>
                            <Typography sx={{ marginBottom: '0px' }} variant="button" display="block" gutterBottom>
                                <Link className={classes.produName} to="/lip-care-coolips-spf-22.html">
                                    Lip Care - Coolips SPF 15
                                </Link>
                            </Typography>
                            <Box className={classes.priceContainer}>
                                <Typography variant="h6" component="span" className={classes.priceText}>
                                    $229
                                </Typography>
                            </Box>
                            {/* <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                                >
                                <Rating
                                    className={classes.customRating}
                                    name="product-feedback"
                                    value={4}
                                    precision={0.5}
                                    size="small"
                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" readOnly />}
                                />
                                <Box className={classes.robertFont} sx={{ ml: 0, fontSize: 10 }}>1178 reviews</Box>
                            </Box> */}
                        </Grid>
                        <Grid item xs={6}>
                            <Box className={classes.imageContainer}>
                                <Typography variant="caption" className={classes.prodLabel}>
                                    New
                                </Typography>
                                <Link className={classes.produName} to="/lip-care-coolips-spf-22.html">
                                    <Image src={prodImage} alt="Product" loading="eager" className={classes.image} maxWidth="100%" maxHeight="100%" />
                                </Link>
                            </Box>
                            <Typography sx={{ marginBottom: '0px' }} variant="button" display="block" gutterBottom>
                                <Link className={classes.produName} to="/lip-care-coolips-spf-22.html">
                                    Lip Care - Coolips SPF 15
                                </Link>
                            </Typography>
                            <Box className={classes.priceContainer}>
                                <Typography variant="h6" component="span" className={classes.priceText}>
                                    $229
                                </Typography>
                            </Box>
                            {/* <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                                >
                                <Rating
                                    className={classes.customRating}
                                    name="product-feedback"
                                    value={4}
                                    precision={0.5}
                                    size="small"
                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" readOnly />}
                                />
                                <Box className={classes.robertFont} sx={{ ml: 0, fontSize: 10 }}>1178 reviews</Box>
                            </Box> */}
                        </Grid>
                        <Grid item xs={6}>
                            <Box className={classes.imageContainer}>
                                <Typography variant="caption" className={classes.prodLabel}>
                                    New
                                </Typography>
                                <Link className={classes.produName} to="/lip-care-coolips-spf-22.html">
                                    <Image src={prodImage} alt="Product" loading="eager" className={classes.image} maxWidth="100%" maxHeight="100%" />
                                </Link>
                            </Box>
                            <Typography sx={{ marginBottom: '0px' }} variant="button" display="block" gutterBottom>
                                <Link className={classes.produName} to="/lip-care-coolips-spf-22.html">
                                    Lip Care - Coolips SPF 15
                                </Link>
                            </Typography>
                            <Box className={classes.priceContainer}>
                                <Typography variant="h6" component="span" className={classes.priceText}>
                                    $229
                                </Typography>
                            </Box>
                            {/* <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                                >
                                <Rating
                                    className={classes.customRating}
                                    name="product-feedback"
                                    value={4}
                                    precision={0.5}
                                    size="small"
                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" readOnly />}
                                />
                                <Box className={classes.robertFont} sx={{ ml: 0, fontSize: 10 }}>1178 reviews</Box>
                            </Box> */}
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </Fragment>
    );
}

Expanded.propTypes = {
    classes: shape({root: string})
};
Expanded.defaultProps = {};
export default Expanded;