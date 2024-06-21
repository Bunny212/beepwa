import React, { Fragment, useState, useRef } from 'react';
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
import Sticky from 'react-stickynode';

import StarIcon from '@mui/icons-material/Star';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import { styled } from '@mui/material/styles';
import NewIcon from '../Icons/NewIcon.svg';
import DealsIcon from '../Icons/DealsIcon.svg';
import RoutinesIcon from '../Icons/RoutinesIcon.svg';
import Top10Icon from '../Icons/Top10Icon.svg';
import Top10IconTitle from '../Icons/Top10IconTitle.svg';
import CategoryIcon from '../Icons/CategoryIcon.svg';
import SkinIcon from '../Icons/SkinIcon.svg';
import IncIcon from '../Icons/IncIcon.svg';
import SeasonIcon from '../Icons/SeasonIcon.svg';
import categoryImage from '../Images/category-image.jpg';
import top10Image from '../Images/top10.jpg';
import prodImage from '../Images/prod-img.jpg';
import prodImage2 from '../Images/prod-img2.jpg';
import arrowIcon from '../Icons/title-icon-arrow.svg';

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

const StyledLink = styled(Typography)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    cursor: 'pointer',
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

const Top10 = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const location = useLocation();
    const { name = "" } = useParams();
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

    const secondGridRef = useRef(null);
    const handleItemClick = (itemId) => {
        scrollToItem(itemId);
    };
    const scrollToItem = (itemId) => {
        // const element = secondGridRef.current.querySelector(`[data-id="${itemId}"]`);
        // if (element) {
        //element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // }
        const element = secondGridRef.current.querySelector(`[data-id="${itemId}"]`);
        if (element) {
          const topOffset = element.offsetTop - 56;
          const scrollContainer = document.documentElement || document.body;
          const scrollOptions = {
            top: topOffset,
            behavior: 'smooth'
          };
          scrollContainer.scrollTo(scrollOptions);
        }
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
                <Card sx={{ maxWidth: '100%', boxShadow: 'none', borderRadius: '6px' }}>
                    <CardMedia
                        sx={{ height: 210 }}
                        image={top10Image}
                        title="Top 10"
                    />
                </Card>
                <Box sx={{ display: 'flex', alignItems: 'start', justifyContent: 'start', marginTop: '20px', marginBottom: '10px' }}>
                    <ListItemIcon sx={{ marginRight: '0px' }}>
                        <Image
                            height='31px'
                            src={Top10IconTitle}
                            alt='Top10'
                            title='Top10'
                            width='34px'
                        />
                    </ListItemIcon>
                    <Typography className={classes.heading} variant="h6">
                        Top 10 products
                    </Typography>
                </Box>
                <Typography className={classes.subTitle} variant="subtitle1" gutterBottom>
                    The ten most popular products on sale right now.
                </Typography>
                <br/>
                {/* <Sticky enabled={true} top={0} innerZ={100}> */}
                <Box sx={{ flexGrow: 1, marginTop: '0px', paddingTop: '10px', backgroundColor: '#ffffff' }}>
                    <Grid container spacing={2} justifyContent="center">
                        {Array(10).fill().map((_, index) => (
                            <Grid sx={{ padding: '0px' }} item xs={2.4} key={index}>
                                {/* Replace the content below with your item's JSX */}
                                <Item>
                                <StyledLink
                                    aria-label='New'
                                    data-cy="Category-Landing-quickAccess"
                                    onClick={() => handleItemClick(`item-${index}`)}
                                >
                                    <StyledAvatar>
                                        {/* <Avatar alt="Remy Sharp" src={prodImage} /> */}
                                        <ImageWrapper>
                                            <StyledImage
                                            src={prodImage}
                                            alt=''
                                            title=''
                                            />
                                        </ImageWrapper>
                                    </StyledAvatar>
                                    <Typography className={classes.numericTitle} variant="subtitle1" gutterBottom>
                                        #{index + 1}
                                    </Typography>
                                </StyledLink>
                                </Item>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                {/* </Sticky> */}
            </div>
            <div className={classes.root} >
                <div ref={secondGridRef}>
                {Array(10).fill().map((_, index) => (
                    <div key={index} data-id={`item-${index}`} >
                        <Divider />
                        <br/>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start', marginTop: '0px', marginBottom: '0px' }}>
                            <Item className={classes.hashNb} sx={{ marginRight: '0px' }}>
                                #<span>{index + 1}</span>
                            </Item>
                            <Link to="/lip-care-coolips-spf-22.html">
                                <Typography className={classes.heading2Line} variant="h6">
                                    Lip Care - <br/>Coolips SPF 15
                                </Typography>
                            </Link>
                        </Box>
                        <Typography className={classes.subTitle2} variant="subtitle2" gutterBottom>
                            Our entire face care lineup is about immediate results and easy-to-use formulas. These products are the not-so-basic beauty basics designed to work together to instantly optimize your skin.
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
                            <Link to="/lip-care-coolips-spf-22.html">
                                <Image
                                    height='auto'
                                    src={prodImage2}
                                    alt='Top10'
                                    title='Top10'
                                    width='100%'
                                />
                            </Link>
                        </Box>
                    </div>
                 ))}
                 </div>
            </div>
        </Fragment>
    );
}

Top10.propTypes = {
    classes: shape({root: string})
};
Top10.defaultProps = {};
export default Top10;