import React, { Fragment, useState } from 'react';
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

import defaultClasses from './index.css';
import { isNonEmptyArray } from '@apollo/client/utilities';

const CategoryInner = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const { name = "" } = useParams();
    const location = useLocation();
    const { parentCatName, subCatName, categoryDescp, imageUrl } = location.state || {};

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
                <Box className={classes.chipContainer} sx={{ margin: '15px 0' }}>
                    <Chip component={Link} to={{
                                    pathname: resourceUrl('/category-landing/expanded/'),
                                    state: { parentCatName: 'Cleansers + Toners', subCatName: subCatName, categoryDescp: 'Our entire face care lineup is about immediate results and easy-to-use formulas. These products are the not-so-basic beauty basics designed to work together to instantly optimize your skin.', imageUrl: '' }
                                }} className={classes.chip} label="Cleansers + Toners" variant="outlined" onClick={handleClick} />
                    <Chip component={Link} to={{
                                    pathname: resourceUrl('/category-landing/expanded/'),
                                    state: { parentCatName: 'Creams + Moisturizers', subCatName: subCatName, categoryDescp: 'Our entire face care lineup is about immediate results and easy-to-use formulas. These products are the not-so-basic beauty basics designed to work together to instantly optimize your skin.', imageUrl: '' }
                                }} className={classes.chip} label="Creams + Moisturizers" variant="outlined" onClick={handleClick} />
                    <Chip component={Link} to={{
                                    pathname: resourceUrl('/category-landing/expanded/'),
                                    state: { parentCatName: 'Serums', subCatName: subCatName, categoryDescp: 'Our entire face care lineup is about immediate results and easy-to-use formulas. These products are the not-so-basic beauty basics designed to work together to instantly optimize your skin.', imageUrl: '' }
                                }} className={classes.chip} label="Serums" variant="outlined" onClick={handleClick} />
                    <Chip component={Link} to={{
                                    pathname: resourceUrl('/category-landing/expanded/'),
                                    state: { parentCatName: 'SPF', subCatName: subCatName, categoryDescp: 'Our entire face care lineup is about immediate results and easy-to-use formulas. These products are the not-so-basic beauty basics designed to work together to instantly optimize your skin.', imageUrl: '' }
                                }} className={classes.chip} label="SPF" variant="outlined" onClick={handleClick} />
                    <Chip component={Link} to={{
                                    pathname: resourceUrl('/category-landing/expanded/'),
                                    state: { parentCatName: 'Masks + Scrubs', subCatName: subCatName, categoryDescp: 'Our entire face care lineup is about immediate results and easy-to-use formulas. These products are the not-so-basic beauty basics designed to work together to instantly optimize your skin.', imageUrl: '' }
                                }} className={classes.chip} label="Masks + Scrubs" variant="outlined" onClick={handleClick} />
                    <Chip component={Link} to={{
                                    pathname: resourceUrl('/category-landing/expanded/'),
                                    state: { parentCatName: 'Eye Contour', subCatName: subCatName, categoryDescp: 'Our entire face care lineup is about immediate results and easy-to-use formulas. These products are the not-so-basic beauty basics designed to work together to instantly optimize your skin.', imageUrl: '' }
                                }} className={classes.chip} label="Eye Contour" variant="outlined" onClick={handleClick} />
                    <Chip component={Link} to={{
                                    pathname: resourceUrl('/category-landing/expanded/'),
                                    state: { parentCatName: 'Lip Balms', subCatName: subCatName, categoryDescp: 'Our entire face care lineup is about immediate results and easy-to-use formulas. These products are the not-so-basic beauty basics designed to work together to instantly optimize your skin.', imageUrl: '' }
                                }} className={classes.chip} label="Lip Balms" variant="outlined" onClick={handleClick} />
                    <Chip component={Link} to={{
                                    pathname: resourceUrl('/category-landing/expanded/'),
                                    state: { parentCatName: 'Routines', subCatName: subCatName, categoryDescp: 'Our entire face care lineup is about immediate results and easy-to-use formulas. These products are the not-so-basic beauty basics designed to work together to instantly optimize your skin.', imageUrl: '' }
                                }} className={classes.chip} label="Routines" variant="outlined" onClick={handleClick} />
                </Box>
                <Box sx={{ margin: '30px 0 0' }}>
                    <Box className={classes.flexBox} sx={{ margin: '20px 0' }}>
                        <Typography className={classes.categoryTitle} sx={{ fontWeight: '500' }} variant="h6">
                            Cleansers + Toners
                            <Avatar
                                alt="Remy Sharp"
                                src={arrowIcon}
                                sx={{ width: 16, height: 16, marginLeft: '5px' }}
                                variant="square"/>
                        </Typography>
                        <Link className={classes.link} to={{
                                    pathname: resourceUrl('/category-landing/expanded/'),
                                    state: { parentCatName: 'Cleansers + Toners', subCatName: subCatName, categoryDescp: 'Our entire face care lineup is about immediate results and easy-to-use formulas. These products are the not-so-basic beauty basics designed to work together to instantly optimize your skin.', imageUrl: '' }
                                }}>View all (16)<ArrowForwardOutlinedIcon sx={{ fontSize: 14 }} /></Link>
                    </Box>
                    <Box sx={{ margin: '20px 0' }}>
                        <Swiper {...swiperConfig}>
                            <SwiperSlide>
                                <Box className={classes.imageContainer}>
                                <Typography variant="caption" className={classes.prodLabel}>
                                    New
                                </Typography>
                                    <Link className={classes.produName} to="/lip-care-coolips-spf-22.html">
                                        <Image src={prodImage} alt="Product" loading="eager" className={classes.image} maxWidth="100%" maxHeight="100%" />
                                    </Link>
                                </Box>
                                <Typography sx={{ marginBottom: '0px' }} variant="button" display="block" gutterBottom>
                                    <Link className={classes.produName} href="#">
                                        Lip Care - Coolips SPF 15
                                    </Link>
                                </Typography>
                                <Box className={classes.priceContainer}>
                                    <Typography variant="h6" component="span" className={classes.priceText}>
                                        $229
                                    </Typography>
                                </Box>
                                <Box
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
                                </Box>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Box className={classes.imageContainer}>
                                <Typography variant="caption" className={classes.prodLabel}>
                                    New
                                </Typography>
                                    <Link className={classes.produName} to="/lip-care-coolips-spf-22.html">
                                        <Image src={prodImage} alt="Product" loading="eager" className={classes.image} maxWidth="100%" maxHeight="100%" />
                                    </Link>
                                </Box>
                                <Typography sx={{ marginBottom: '0px' }} variant="button" display="block" gutterBottom>
                                    <Link className={classes.produName} href="#">
                                        Lip Care - Coolips SPF 15
                                    </Link>
                                </Typography>
                                <Box className={classes.priceContainer}>
                                    <Typography variant="h6" component="span" className={classes.priceText}>
                                        $229
                                    </Typography>
                                </Box>
                                <Box
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
                                    <Box sx={{ ml: 0, fontSize: 10 }}>1178 reviews</Box>
                                </Box>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Box className={classes.imageContainer}>
                                <Typography variant="caption" className={classes.prodLabel}>
                                    New
                                </Typography>
                                    <Link className={classes.produName} to="/lip-care-coolips-spf-22.html">
                                        <Image src={prodImage} alt="Product" loading="eager" className={classes.image} maxWidth="100%" maxHeight="100%" />
                                    </Link>
                                </Box>
                                <Typography sx={{ marginBottom: '0px' }} variant="button" display="block" gutterBottom>
                                    <Link className={classes.produName} href="#">
                                        Lip Care - Coolips SPF 15
                                    </Link>
                                </Typography>
                                <Box className={classes.priceContainer}>
                                    <Typography variant="h6" component="span" className={classes.priceText}>
                                        $229
                                    </Typography>
                                </Box>
                                <Box
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
                                    <Box sx={{ ml: 0, fontSize: 10 }}>1178 reviews</Box>
                                </Box>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Box className={classes.imageContainer}>
                                <Typography variant="caption" className={classes.prodLabel}>
                                    New
                                </Typography>
                                    <Link className={classes.produName} to="/lip-care-coolips-spf-22.html">
                                        <Image src={prodImage} alt="Product" loading="eager" className={classes.image} maxWidth="100%" maxHeight="100%" />
                                    </Link>
                                </Box>
                                <Typography sx={{ marginBottom: '0px' }} variant="button" display="block" gutterBottom>
                                    <Link className={classes.produName} href="#">
                                        Lip Care - Coolips SPF 15
                                    </Link>
                                </Typography>
                                <Box className={classes.priceContainer}>
                                    <Typography variant="h6" component="span" className={classes.priceText}>
                                        $229
                                    </Typography>
                                </Box>
                                <Box
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
                                    <Box sx={{ ml: 0, fontSize: 10 }}>1178 reviews</Box>
                                </Box>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Box className={classes.imageContainer}>
                                <Typography variant="caption" className={classes.prodLabel}>
                                    New
                                </Typography>
                                    <Link className={classes.produName} to="/lip-care-coolips-spf-22.html">
                                        <Image src={prodImage} alt="Product" loading="eager" className={classes.image} maxWidth="100%" maxHeight="100%" />
                                    </Link>
                                </Box>
                                <Typography sx={{ marginBottom: '0px' }} variant="button" display="block" gutterBottom>
                                    <Link className={classes.produName} href="#">
                                        Lip Care - Coolips SPF 15
                                    </Link>
                                </Typography>
                                <Box className={classes.priceContainer}>
                                    <Typography variant="h6" component="span" className={classes.priceText}>
                                        $229
                                    </Typography>
                                </Box>
                                <Box
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
                                    <Box sx={{ ml: 0, fontSize: 10 }}>1178 reviews</Box>
                                </Box>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Box className={classes.imageContainer}>
                                <Typography variant="caption" className={classes.prodLabel}>
                                    New
                                </Typography>
                                    <Link className={classes.produName} to="/lip-care-coolips-spf-22.html">
                                        <Image src={prodImage} alt="Product" loading="eager" className={classes.image} maxWidth="100%" maxHeight="100%" />
                                    </Link>
                                </Box>
                                <Typography sx={{ marginBottom: '0px' }} variant="button" display="block" gutterBottom>
                                    <Link className={classes.produName} href="#">
                                        Lip Care - Coolips SPF 15
                                    </Link>
                                </Typography>
                                <Box className={classes.priceContainer}>
                                    <Typography variant="h6" component="span" className={classes.priceText}>
                                        $229
                                    </Typography>
                                </Box>
                                <Box
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
                                    <Box sx={{ ml: 0, fontSize: 10 }}>1178 reviews</Box>
                                </Box>
                            </SwiperSlide>
                        </Swiper>
                    </Box>
                </Box>
                <Box sx={{ margin: '30px 0 0' }}>
                    <Box className={classes.flexBox} sx={{ margin: '20px 0' }}>
                        <Typography className={classes.categoryTitle} sx={{ fontWeight: '500' }} variant="h6">
                            Cleansers + Toners
                            <Avatar
                                alt="Remy Sharp"
                                src={arrowIcon}
                                sx={{ width: 16, height: 16, marginLeft: '5px' }}
                                variant="square"/>
                        </Typography>
                        <Link className={classes.link} to={{
                                    pathname: resourceUrl('/category-landing/expanded/'),
                                    state: { parentCatName: 'Cleansers + Toners', subCatName: subCatName, categoryDescp: 'Our entire face care lineup is about immediate results and easy-to-use formulas. These products are the not-so-basic beauty basics designed to work together to instantly optimize your skin.', imageUrl: '' }
                                }}>View all (16)<ArrowForwardOutlinedIcon sx={{ fontSize: 14 }} /></Link>
                    </Box>
                    <Box sx={{ margin: '20px 0' }}>
                        <Swiper {...swiperConfig}>
                            <SwiperSlide>
                                    <Box className={classes.imageContainer}>
                                    <Typography variant="caption" className={classes.prodLabel}>
                                        New
                                    </Typography>
                                        <Link className={classes.produName} to="/lip-care-coolips-spf-22.html">
                                            <Image src={prodImage} alt="Product" loading="eager" className={classes.image} maxWidth="100%" maxHeight="100%" />
                                        </Link>
                                    </Box>
                                    <Typography sx={{ marginBottom: '0px' }} variant="button" display="block" gutterBottom>
                                        <Link className={classes.produName} href="#">
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
                            </SwiperSlide>
                            <SwiperSlide>
                                    <Box className={classes.imageContainer}>
                                    <Typography variant="caption" className={classes.prodLabel}>
                                        New
                                    </Typography>
                                        <Link className={classes.produName} to="/lip-care-coolips-spf-22.html">
                                            <Image src={prodImage} alt="Product" loading="eager" className={classes.image} maxWidth="100%" maxHeight="100%" />
                                        </Link>
                                    </Box>
                                    <Typography sx={{ marginBottom: '0px' }} variant="button" display="block" gutterBottom>
                                        <Link className={classes.produName} href="#">
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
                            </SwiperSlide>
                            <SwiperSlide>
                                    <Box className={classes.imageContainer}>
                                    <Typography variant="caption" className={classes.prodLabel}>
                                        New
                                    </Typography>
                                        <Link className={classes.produName} to="/lip-care-coolips-spf-22.html">
                                            <Image src={prodImage} alt="Product" loading="eager" className={classes.image} maxWidth="100%" maxHeight="100%" />
                                        </Link>
                                    </Box>
                                    <Typography sx={{ marginBottom: '0px' }} variant="button" display="block" gutterBottom>
                                        <Link className={classes.produName} href="#">
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
                            </SwiperSlide>
                            <SwiperSlide>
                                    <Box className={classes.imageContainer}>
                                    <Typography variant="caption" className={classes.prodLabel}>
                                        New
                                    </Typography>
                                        <Link className={classes.produName} to="/lip-care-coolips-spf-22.html">
                                            <Image src={prodImage} alt="Product" loading="eager" className={classes.image} maxWidth="100%" maxHeight="100%" />
                                        </Link>
                                    </Box>
                                    <Typography sx={{ marginBottom: '0px' }} variant="button" display="block" gutterBottom>
                                        <Link className={classes.produName} href="#">
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
                            </SwiperSlide>
                            <SwiperSlide>
                                    <Box className={classes.imageContainer}>
                                    <Typography variant="caption" className={classes.prodLabel}>
                                        New
                                    </Typography>
                                        <Link className={classes.produName} to="/lip-care-coolips-spf-22.html">
                                            <Image src={prodImage} alt="Product" loading="eager" className={classes.image} maxWidth="100%" maxHeight="100%" />
                                        </Link>
                                    </Box>
                                    <Typography sx={{ marginBottom: '0px' }} variant="button" display="block" gutterBottom>
                                        <Link className={classes.produName} href="#">
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
                            </SwiperSlide>
                            <SwiperSlide>
                                    <Box className={classes.imageContainer}>
                                    <Typography variant="caption" className={classes.prodLabel}>
                                        New
                                    </Typography>
                                        <Link className={classes.produName} to="/lip-care-coolips-spf-22.html">
                                            <Image src={prodImage} alt="Product" loading="eager" className={classes.image} maxWidth="100%" maxHeight="100%" />
                                        </Link>
                                    </Box>
                                    <Typography sx={{ marginBottom: '0px' }} variant="button" display="block" gutterBottom>
                                        <Link className={classes.produName} href="#">
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
                            </SwiperSlide>
                        </Swiper>
                    </Box>
                </Box>
            </div>
        </Fragment>
    );
}

CategoryInner.propTypes = {
    classes: shape({root: string})
};
CategoryInner.defaultProps = {};
export default CategoryInner;