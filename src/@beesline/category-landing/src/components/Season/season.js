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
import Divider from '@mui/material/Divider';
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
import seasonImage from '../Images/season-image.jpg';
import prodImage from '../Images/prod-img.jpg';
import arrowIcon from '../Icons/title-icon-arrow.svg';
import prodImage2 from '../Images/prod-img2.jpg';

import defaultClasses from './index.css';
import { isNonEmptyArray } from '@apollo/client/utilities';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    boxShadow: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledLink = styled(Link)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
});

const StyledAvatar = styled(Avatar)(({ theme }) => ({
    width: 56,
    height: 56,
    borderRadius: '50%', // Rounded corners
    boxShadow: '0px 0px 16px rgba(0, 0, 0, 0.12)', // Box shadow
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '10px',
    backgroundColor: '#ffffff',
    borderRadius: '50%',
}));
  
const ImageWrapper = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});
  
const StyledImage = styled(Image)({
    height: 'auto',
    width: '100%',
    marginTop: '-5px',
});

const Season = props => {
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

    const [quantity, setQuantity] = useState(1);
    const [inCart, setInCart] = useState(false);
    const handleAddToCart = () => {
        setInCart(true);
    };
    
    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };
    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        } else {
            setInCart(false);
        }
    };
    const handleRemove = () => {
        setInCart(false);
        setQuantity(1);
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
                            image={seasonImage}
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
                        {subCatName} (16)
                    </Typography>
                )}
                <br />
                {categoryDescp && (
                    <Typography className={classes.robertFont} variant="body2">
                        {categoryDescp}
                    </Typography>
                )}
                <Box sx={{ margin: '30px 0 0' }}>
                    <Box sx={{ margin: '20px 0' }}>
                        <Swiper {...swiperConfig}>
                            <SwiperSlide>
                                <Box className={classes.imageContainer}>
                                <Typography variant="caption" className={classes.prodLabel}>
                                    New
                                </Typography>
                                    <Image src={prodImage} alt="Product" loading="eager" className={classes.image} maxWidth="100%" maxHeight="100%" />
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
                                    <Image src={prodImage} alt="Product" loading="eager" className={classes.image} maxWidth="100%" maxHeight="100%" />
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
                                    <Box sx={{ ml: 0, fontSize: 10 }}>1178 reviews</Box>
                                </Box> */}
                            </SwiperSlide>
                            <SwiperSlide>
                                <Box className={classes.imageContainer}>
                                <Typography variant="caption" className={classes.prodLabel}>
                                    New
                                </Typography>
                                    <Image src={prodImage} alt="Product" loading="eager" className={classes.image} maxWidth="100%" maxHeight="100%" />
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
                                    <Box sx={{ ml: 0, fontSize: 10 }}>1178 reviews</Box>
                                </Box> */}
                            </SwiperSlide>
                            <SwiperSlide>
                                <Box className={classes.imageContainer}>
                                <Typography variant="caption" className={classes.prodLabel}>
                                    New
                                </Typography>
                                    <Image src={prodImage} alt="Product" loading="eager" className={classes.image} maxWidth="100%" maxHeight="100%" />
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
                                    <Box sx={{ ml: 0, fontSize: 10 }}>1178 reviews</Box>
                                </Box> */}
                            </SwiperSlide>
                            <SwiperSlide>
                                <Box className={classes.imageContainer}>
                                <Typography variant="caption" className={classes.prodLabel}>
                                    New
                                </Typography>
                                    <Image src={prodImage} alt="Product" loading="eager" className={classes.image} maxWidth="100%" maxHeight="100%" />
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
                                    <Box sx={{ ml: 0, fontSize: 10 }}>1178 reviews</Box>
                                </Box> */}
                            </SwiperSlide>
                            <SwiperSlide>
                                <Box className={classes.imageContainer}>
                                <Typography variant="caption" className={classes.prodLabel}>
                                    New
                                </Typography>
                                    <Image src={prodImage} alt="Product" loading="eager" className={classes.image} maxWidth="100%" maxHeight="100%" />
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
                                    <Box sx={{ ml: 0, fontSize: 10 }}>1178 reviews</Box>
                                </Box> */}
                            </SwiperSlide>
                        </Swiper>
                    </Box>
                </Box>
            </div>
            <div className={classes.root}>
                {Array(2).fill().map((_, index) => (
                    <div key={index}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start', marginTop: '0px', marginBottom: '0px' }}>
                            <Item className={classes.hashNb} sx={{ marginRight: '0px' }}>
                                #<span>{index + 1}</span>
                            </Item>
                            <Typography className={classes.heading2Line} variant="h6">
                                Product Name <br/> On 2 Lines
                            </Typography>
                        </Box>
                        <Typography className={classes.subTitle2} variant="subtitle2" gutterBottom>
                            Sub title
                        </Typography>
                        {/* <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                            >
                            <Box className={classes.ratingVal} sx={{ ml: 0, fontSize: 18 }}>4.9</Box>
                            <Rating
                                className={classes.customRating}
                                name="product-feedback"
                                value={4}
                                precision={0.5}
                                size="small"
                                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" readOnly />}
                            />
                            <Box className={classes.ratingNb} sx={{ ml: 0, fontSize: 10 }}>1178 reviews</Box>
                        </Box> */}
                        <Box sx={{ marginTop: '10px', height: '345px' }}>
                            <Image
                                height='auto'
                                src={prodImage2}
                                alt='Top10'
                                title='Top10'
                                width='100%'
                            />
                        </Box>
                    </div>
                 ))}
            </div>
        </Fragment>
    );
}

Season.propTypes = {
    classes: shape({root: string})
};
Season.defaultProps = {};
export default Season;