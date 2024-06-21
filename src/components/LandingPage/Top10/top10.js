import React, { Fragment, useRef, useMemo } from 'react';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import { shape, string } from 'prop-types';
import { Link, useLocation } from "react-router-dom";
import Image from '@magento/venia-ui/lib/components/Image';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ListItemIcon from '@mui/material/ListItemIcon';
import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import CardMedia from '@mui/material/CardMedia';
import 'swiper/swiper-bundle.css';

import { styled } from '@mui/material/styles';
import Top10IconTitle from '../Icons/Top10IconTitle.svg';
import top10Image from '../Images/top10.jpg';
import prodImage from '../Images/prod-img.jpg';
import defaultClasses from './top10.module.css';
import { isNonEmptyArray } from '@apollo/client/utilities';
import { ErrorOutline } from '@mui/icons-material';
import Skeleton from '@mui/material/Skeleton';
import AddToCart from '../../AddToCart/addToCart';
import ProductLabel from '../../ProductLabel/productLabel';
import { useQuery } from '@apollo/client';
import { GET_CATEGORY_PRODUCTS_DATA } from '../queries/GetCategoryProductsData';

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
    const { parentCatName, categoryId, subCatName, categoryDescp, imageUrl } = location.state || {};

    const { loading, error, data, refetch } = useQuery(GET_CATEGORY_PRODUCTS_DATA, {
        fetchPolicy: "cache-and-network",
        nextFetchPolicy: "cache-first",
        variables: {
            id: parseInt(categoryId)
        },
    });

    const tabsData = useMemo(() => {
        if (data && data.getCategoryProducts) {
            return data.getCategoryProducts;
          }
          return null;
    }, [data]);

    // Use isLoading to track the loading state
    const isLoading = loading || !data;
    const isError = error;

    //const tabsData = data?.getCategoryProducts;

    // useEffect(() => {
    //     refetch();
    // }, []);

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

    const Top10GridHeader = ({ section, classes }) => {
        return (
            <>
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
                        {section.section_title}
                    </Typography>
                </Box>
                {categoryDescp && (
                    <Typography className={classes.subTitle} variant="subtitle1" gutterBottom>
                        {categoryDescp}
                    </Typography>
                )}
            </>
        );
    };

    const Top10GridHeaderItems = ({ section, classes }) => {
        return (
            <Box sx={{ flexGrow: 1, marginTop: '0px', padding: '10px 0', backgroundColor: '#ffffff' }}>
                <Grid container spacing={2} justifyContent="flex-start">
                    {isNonEmptyArray(section.items) &&
                        section.items.map((item, itemIndex) => (
                            <Grid sx={{ padding: '0px' }} item xs={2.4} key={itemIndex}>
                                {/* Replace the content below with your item's JSX */}
                                <Item>
                                    <StyledLink
                                        aria-label='New'
                                        data-cy="Category-Landing-quickAccess"
                                        onClick={() => handleItemClick(`item-${itemIndex}`)}
                                    >
                                        <StyledAvatar>
                                            {/* <Avatar alt="Remy Sharp" src={prodImage} /> */}
                                            <ImageWrapper>
                                                <StyledImage
                                                    src={item.imageUrl || prodImage}
                                                    alt={item.name}
                                                    title={item.name}
                                                />
                                            </ImageWrapper>
                                        </StyledAvatar>
                                        <Typography className={classes.numericTitle} variant="subtitle1" gutterBottom>
                                            #{itemIndex + 1}
                                        </Typography>
                                    </StyledLink>
                                </Item>
                            </Grid>
                        ))}
                </Grid>
            </Box>
        );
    }

    const Top10GridItemsList = ({ section, classes }) => {
        return (
            <div ref={secondGridRef}>
                {isNonEmptyArray(section.items) &&
                    section.items.map((item, itemIndex) => (
                        <div key={itemIndex} data-id={`item-${itemIndex}`} >
                            <Divider />
                            <br />
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start', marginTop: '0px', marginBottom: '0px' }}>
                                <Item className={classes.hashNb} sx={{ marginRight: '0px' }}>
                                    #<span>{itemIndex + 1}</span>
                                </Item>
                                <Link to={item.productPath}>
                                    <Typography className={classes.heading2Line} variant="h6">
                                        {item.name}
                                    </Typography>
                                </Link>
                            </Box>
                            {/* <Typography className={classes.subTitle2} variant="subtitle2" gutterBottom>
                            Our entire face care lineup is about immediate results and easy-to-use formulas. These products are the not-so-basic beauty basics designed to work together to instantly optimize your skin.
                        </Typography> */}
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
                            <Box className={classes.imageContainer} sx={{ marginTop: '10px' }}>
                                <ProductLabel item={item} />
                                <Link to={item.productPath}>
                                    <img
                                        className={classes.image}
                                        height='auto'
                                        src={item.imageUrl || prodImage}
                                        alt={item.name}
                                        title={item.name}
                                        width='100%'
                                        loading="eager"
                                    />
                                </Link>
                                <AddToCart product={item} />
                            </Box>
                        </div>
                    ))}
            </div>
        );
    }

    const PlaceholderContent = ({ classes }) => {
        return (
            <>
                <Box sx={{ display: 'flex', alignItems: 'start', justifyContent: 'start', marginTop: '20px', marginBottom: '10px' }}>
                    <ListItemIcon sx={{ marginRight: '0px' }}>
                        <Skeleton variant="rounded" width={31} height={34} />
                    </ListItemIcon>
                    <Typography className={classes.heading} variant="h6">
                        <Skeleton variant="text" width={100} height={20} />
                    </Typography>
                </Box>
                <Typography className={classes.subTitle} variant="subtitle1" gutterBottom>
                    <Skeleton variant="text" width="90%" height={10} />
                </Typography>
                <Box sx={{ flexGrow: 1, marginTop: '0px', padding: '10px 0', backgroundColor: '#ffffff' }}>
                    <Grid container spacing={2} justifyContent="center">
                        {Array(10).fill().map((_, index) => (
                            <Grid sx={{ padding: '0px' }} item xs={2.4} key={index}>
                                {/* Replace the content below with your item's JSX */}
                                <Item>
                                    <StyledAvatar>
                                        {/* <Avatar alt="Remy Sharp" src={prodImage} /> */}
                                        <ImageWrapper>
                                            <Skeleton variant="rounded" width={56} height={56} />
                                        </ImageWrapper>
                                    </StyledAvatar>
                                    <Typography className={classes.numericTitle} variant="subtitle1" gutterBottom>
                                        <Skeleton variant="text" height={10} width={15} />
                                    </Typography>
                                </Item>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                {Array(3).fill().map((_, index) => (
                    <div key={index} data-id={`item-${index}`} >
                        <Divider />
                        <br />
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start', marginTop: '0px', marginBottom: '0px' }}>
                            <Typography className={classes.heading2LineSkeleton} variant="h6">
                                <Skeleton variant="text" width="100%" height={30}/>
                            </Typography>
                        </Box>
                        <Box className={classes.imageContainer} sx={{ marginTop: '10px' }}>
                            <Skeleton variant="rounded" width="100%" height={250} />
                        </Box>
                    </div>
                ))}
            </>
        );
    }

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
                ) : (
                    <Card sx={{ maxWidth: '100%', boxShadow: 'none', borderRadius: '6px' }}>
                        <CardMedia
                            sx={{ height: 210 }}
                            image={top10Image}
                            title="Top 10"
                        />
                    </Card>
                )}
                {isLoading ? (
                    // Render placeholder content while loading
                    <PlaceholderContent classes={classes} />

                ) : (
                    // Render actual tab panels from data
                    <>
                        <Top10GridHeader section={tabsData} classes={classes} />
                        {isNonEmptyArray(tabsData.items) ? (
                            <>
                                <Top10GridHeaderItems section={tabsData} classes={classes} />
                                <Top10GridItemsList section={tabsData} classes={classes} />
                            </>
                        ) : (
                            <ErrorContent errorMessage="No data available" />
                        )}
                    </>
                )}
            </div>
        </Fragment>
    );
}

Top10.propTypes = {
    classes: shape({ root: string })
};
Top10.defaultProps = {};
export default Top10;