import React, { useMemo, Fragment, Suspense } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { arrayOf, bool, number, shape, string } from 'prop-types';
import { Form } from 'informed';
import { Info } from 'react-feather';
import { Link, useParams, useLocation } from "react-router-dom";

import Price from '@magento/venia-ui/lib/components/Price';
import { useProductFullDetail } from '@magento/peregrine/lib/talons/ProductFullDetail/useProductFullDetail';
import { isProductConfigurable } from '@magento/peregrine/lib/util/isProductConfigurable';

import { useStyle } from '@magento/venia-ui/lib/classify';
import Breadcrumbs from '@magento/venia-ui/lib/components/Breadcrumbs';
//import Button from '@magento/venia-ui/lib/components/Button';
import Button from '@mui/material/Button';
import FormError from '@magento/venia-ui/lib/components/FormError';
import QuantityStepper from '../QuantityStepper';
import RichContent from '@magento/venia-ui/lib/components/RichContent/richContent';
import { ProductOptionsShimmer } from '@magento/venia-ui/lib/components/ProductOptions';
import CustomAttributes from '@magento/venia-ui/lib/components/ProductFullDetail/CustomAttributes';
import defaultClasses from './productFullDetail.module.css';
import SwiperProductImageCarousel from '../SwiperProductImageCarousel';
import Image from '@magento/venia-ui/lib/components/Image';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import StarIcon from '@mui/icons-material/Star';
import Typography from '@mui/material/Typography';
import prodImage2 from '../Images/prod-img2.jpg';
import BackIcon from '../Icons/BackIcon.svg';
import Logo from '../Logo';
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';

import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import prodImage from '../Images/prod-img.jpg';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

const WishlistButton = React.lazy(() => import('@magento/venia-ui/lib/components/Wishlist/AddToListButton'));
const Options = React.lazy(() => import('@magento/venia-ui/lib/components/ProductOptions'));

// Correlate a GQL error message to a field. GQL could return a longer error
// string but it may contain contextual info such as product id. We can use
// parts of the string to check for which field to apply the error.
const ERROR_MESSAGE_TO_FIELD_MAPPING = {
    'The requested qty is not available': 'quantity',
    'Product that you are trying to add is not available.': 'quantity',
    "The product that was requested doesn't exist.": 'quantity'
};

// Field level error messages for rendering.
const ERROR_FIELD_TO_MESSAGE_MAPPING = {
    quantity: 'The requested quantity is not available.'
};

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const AddToCartButton = styled(Button)({
    width: '100%',
    backgroundColor: '#FFC629',
    color: '#000000',
    boxShadow: 'none',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: '650',
    color: '#000000',
    textTransform: 'initial',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    fontFamily: 'inherit',
    '&:hover': {
        backgroundColor: '#FFC629',
        color: '#000000',
        boxShadow: 'none',
    }
});

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ padding: '8px 0' }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
}
  
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

function TabPanel2(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`real-results-simple-tabpanel-${index}`}
        aria-labelledby={`real-results-simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ padding: '8px 0' }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
}
  
TabPanel2.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a12yProps(index) {
    return {
      id: `real-results-simple-tab-${index}`,
      'aria-controls': `real-results-simple-tabpanel-${index}`,
    };
}

const ProductFullDetail = props => {
    const { product } = props;
    const [value, setValue] = React.useState(0);
    const [value2, setValue2] = React.useState(0);

    const talonProps = useProductFullDetail({ product });

    const swiperConfig = {
        spaceBetween: 10,
        slidesPerView: 1.5,
        centeredSlides: false,
        grabCursor: true,
        loop: false
    };

    const {
        breadcrumbCategoryId,
        errorMessage,
        handleAddToCart,
        handleSelectionChange,
        isOutOfStock,
        isEverythingOutOfStock,
        outOfStockVariants,
        isAddToCartDisabled,
        isSupportedProductType,
        mediaGalleryEntries,
        productDetails,
        customAttributes,
        wishlistButtonProps
    } = talonProps;

    const handleClick = () => {
        console.info('You clicked the Chip.');
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChange2 = (event, newValue) => {
        setValue2(newValue);
    };

    const [open, setOpen] = React.useState(false);
    const [dialogTitle, setDialogTitle] = React.useState('');
    const [dialogContent, setDialogContent] = React.useState('');

    const handleClickOpen = (title, content) => {
        setOpen(true);
        setDialogTitle(title);
        setDialogContent(content);
    };

    const handleChipClick = (title, content) => {
        handleClickOpen(title, content);
    };
    
    const handleClose = () => {
        setOpen(false);
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
        alignItems: 'start',
        justifyContent: 'start',
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
        height: '100%',
        width: '100%',
        marginTop: '-5px',
        aspectRatio: '1/1'
    });

    const StyledAppBar = styled(AppBar)(({ theme }) => ({
        backgroundColor: 'white',
        color: '#000000',
        boxShadow: 'none'
    }));

    const { formatMessage } = useIntl();
    const title = formatMessage({ id: 'logo.title', defaultMessage: 'Beesline' });

    const classes = useStyle(defaultClasses, props.classes);

    const options = isProductConfigurable(product) ? (
        <Suspense fallback={<ProductOptionsShimmer />}>
            <Options
                onSelectionChange={handleSelectionChange}
                options={product.configurable_options}
                isEverythingOutOfStock={isEverythingOutOfStock}
                outOfStockVariants={outOfStockVariants}
            />
        </Suspense>
    ) : null;

    const breadcrumbs = breadcrumbCategoryId ? (
        <Breadcrumbs
            categoryId={breadcrumbCategoryId}
            currentProduct={productDetails.name}
        />
    ) : null;

    // Fill a map with field/section -> error.
    const errors = new Map();
    if (errorMessage) {
        Object.keys(ERROR_MESSAGE_TO_FIELD_MAPPING).forEach(key => {
            if (errorMessage.includes(key)) {
                const target = ERROR_MESSAGE_TO_FIELD_MAPPING[key];
                const message = ERROR_FIELD_TO_MESSAGE_MAPPING[target];
                errors.set(target, message);
            }
        });

        // Handle cases where a user token is invalid or expired. Preferably
        // this would be handled elsewhere with an error code and not a string.
        if (errorMessage.includes('The current user cannot')) {
            errors.set('form', [
                new Error(
                    formatMessage({
                        id: 'productFullDetail.errorToken',
                        defaultMessage:
                            'There was a problem with your cart. Please sign in again and try adding the item once more.'
                    })
                )
            ]);
        }

        // Handle cases where a cart wasn't created properly.
        if (
            errorMessage.includes('Variable "$cartId" got invalid value null')
        ) {
            errors.set('form', [
                new Error(
                    formatMessage({
                        id: 'productFullDetail.errorCart',
                        defaultMessage:
                            'There was a problem with your cart. Please refresh the page and try adding the item once more.'
                    })
                )
            ]);
        }

        // An unknown error should still present a readable message.
        if (!errors.size) {
            errors.set('form', [
                new Error(
                    formatMessage({
                        id: 'productFullDetail.errorUnknown',
                        defaultMessage:
                            'Could not add item to cart. Please check required options and try again.'
                    })
                )
            ]);
        }
    }

    const customAttributesDetails = useMemo(() => {
        const list = [];
        const pagebuilder = [];
        const skuAttribute = {
            attribute_metadata: {
                uid: 'attribute_sku',
                used_in_components: ['PRODUCT_DETAILS_PAGE'],
                ui_input: {
                    ui_input_type: 'TEXT'
                },
                label: formatMessage({
                    id: 'global.sku',
                    defaultMessage: 'SKU'
                })
            },
            entered_attribute_value: {
                value: productDetails.sku
            }
        };
        if (Array.isArray(customAttributes)) {
            customAttributes.forEach(customAttribute => {
                if (
                    customAttribute.attribute_metadata.ui_input
                        .ui_input_type === 'PAGEBUILDER'
                ) {
                    pagebuilder.push(customAttribute);
                } else {
                    list.push(customAttribute);
                }
            });
        }
        list.unshift(skuAttribute);
        return {
            list: list,
            pagebuilder: pagebuilder
        };
    }, [customAttributes, productDetails.sku, formatMessage]);

    const cartCallToActionText =
        !isEverythingOutOfStock || !isOutOfStock ? (
            <FormattedMessage
                id="productFullDetail.addItemToCart"
                defaultMessage="Add to Cart"
            />
        ) : (
            <FormattedMessage
                id="productFullDetail.itemOutOfStock"
                defaultMessage="Out of Stock"
            />
        );
    // Error message for screen reader
    const cartActionContent = isSupportedProductType ? (
        <section className={classes.actButton}>
            <AddToCartButton
                data-cy="ProductFullDetail-addToCartButton"
                disabled={isAddToCartDisabled}
                aria-disabled={isAddToCartDisabled}
                aria-label={
                    isEverythingOutOfStock
                        ? formatMessage({
                              id: 'productFullDetail.outOfStockProduct',
                              defaultMessage:
                                  'This item is currently out of stock'
                          })
                        : ''
                }
                priority="high"
                type="submit"
                size="large"
                variant="contained"
            >
                {cartCallToActionText}
                {/* <Box className={classes.btnPrice}>
                    <Price
                        currencyCode={productDetails.price.currency}
                        value={productDetails.price.value}
                    />
                </Box> */}
            </AddToCartButton>
        </section>
    ) : (
        <div className={classes.unavailableContainer}>
            <Info />
            <p>
                <FormattedMessage
                    id={'productFullDetail.unavailableProduct'}
                    defaultMessage={
                        'This product is currently unavailable for purchase.'
                    }
                />
            </p>
        </div>
    );

    const shortDescription = productDetails.shortDescription ? (
        <RichContent html={productDetails.shortDescription.html} />
    ) : null;

    const pageBuilderAttributes = customAttributesDetails.pagebuilder.length ? (
        <section className={classes.detailsPageBuilder}>
            <CustomAttributes
                classes={{ list: classes.detailsPageBuilderList }}
                customAttributes={customAttributesDetails.pagebuilder}
                showLabels={false}
            />
        </section>
    ) : null;

    return (
        <Fragment>
            <Form
                className={classes.root}
                data-cy="ProductFullDetail-root"
                onSubmit={handleAddToCart}
            >
                <section className={classes.imageCarousel}>
                    <SwiperProductImageCarousel images={mediaGalleryEntries} />
                </section>
                <section className={classes.tags}>
                    <Grid className={classes.tagsGrid} container spacing={2}>
                        <Grid item xs={8} sx={{ padding: '8px 0' }}>
                            <Box className={classes.chipContainer} sx={{ margin: '15px 0' }}>
                                <Chip className={classes.chip} label="New" variant="outlined" onClick={handleClick} />
                                <Chip className={classes.chip} label="Routine" variant="outlined" onClick={handleClick} />
                                <Chip className={classes.chip} label="Oily Skin" variant="outlined" onClick={handleClick} />
                            </Box>
                        </Grid>
                        <Grid item xs={4} sx={{ padding: '8px 0' }}>
                            <div className={classes.topPrice}>
                                <Price
                                    currencyCode={productDetails.price.currency}
                                    value={productDetails.price.value}
                                />
                            </div>
                        </Grid>
                    </Grid>
                </section>
                <section className={classes.title}>
                        <Typography sx={{ marginBottom: '0px' }} className={classes.subTitle2} variant="subtitle2" gutterBottom>
                            Category
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start', marginTop: '0px', marginBottom: '0px' }}>
                            <Typography className={classes.heading2Line} aria-live="polite" data-cy="ProductFullDetail-productName" variant="h1">
                               {productDetails.name}
                            </Typography>
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
                    {/* {shortDescription} */}
                </section>
                <FormError
                    classes={{
                        root: classes.formErrors
                    }}
                    errors={errors.get('form') || []}
                />
                <section className={classes.options}>{options}</section>
                <section className={classes.informations}>
                    <Box className={classes.informationBox}>
                        <span
                            data-cy="ProductFullDetail-whatIsIt"
                            className={classes.informationTitle}
                        >
                            <FormattedMessage
                                id={'productFullDetail.whatIsIt'}
                                defaultMessage={'What is it?'}
                            />
                        </span>
                        <div className={classes.richContent}>
                            <RichContent html="<p>An innovative, safe & highly effective 48hr antiperspirant deodorant that works to fight body</p>" />
                        </div>
                    </Box>
                    <Box className={classes.informationBox}>
                        <span
                            data-cy="ProductFullDetail-whatItDoes"
                            className={classes.informationTitle}
                        >
                            <FormattedMessage
                                id={'productFullDetail.whatItDoes'}
                                defaultMessage={'What it does?'}
                            />
                        </span>
                        <div className={classes.richContent}>
                            <Box sx={{ flexGrow: 1 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={3}>
                                        <Item>
                                            <StyledLink
                                            aria-label='Soothes'
                                            data-cy="productFullDetail-whatItDoesItem"
                                            >
                                            <StyledAvatar>
                                                <ImageWrapper>
                                                <StyledImage
                                                    src={prodImage2}
                                                    alt="Soothes"
                                                    title="Soothes"
                                                />
                                                </ImageWrapper>
                                            </StyledAvatar>
                                            <Typography className={classes.subTitle3} variant="subtitle1" gutterBottom>
                                                Soothes
                                            </Typography>
                                            </StyledLink>
                                        </Item>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Item>
                                            <StyledLink
                                            aria-label='Soothes'
                                            data-cy="productFullDetail-whatItDoesItem"
                                            >
                                            <StyledAvatar>
                                                <ImageWrapper>
                                                <StyledImage
                                                    src={prodImage2}
                                                    alt="Soothes"
                                                    title="Soothes"
                                                />
                                                </ImageWrapper>
                                            </StyledAvatar>
                                            <Typography className={classes.subTitle3} variant="subtitle1" gutterBottom>
                                                Hydrates
                                            </Typography>
                                            </StyledLink>
                                        </Item>
                                    </Grid>
                                </Grid>
                            </Box>
                        </div>
                    </Box>
                    <Box className={classes.informationBox}>
                        <span
                            data-cy="ProductFullDetail-whatIsIt"
                            className={classes.informationTitle}
                        >
                            <FormattedMessage
                                id={'productFullDetail.whatIsSpecial'}
                                defaultMessage={'What is special?'}
                            />
                        </span>
                        <div className={classes.richContent}>
                            <RichContent html="<ul><li>Inspired by traditional hair pomade, it gives brows soft, flexible hold in one easy swipe, and doesn't stiffen or flake</li><li>Contains Oleic Acid, Lecithin, and Soluble Collagen to condition and moisturize brows</li></ul>" />
                        </div>
                    </Box>
                </section>
                <section className={classes.realResults}>
                    <Box className={classes.realResultsTitleContainer} sx={{ margin: '15px 0' }}>
                        <Typography className={classes.realResultsTitle} variant="h6" component="div">
                            Real Results
                        </Typography>
                    </Box>
                    <Box className={classes.box} sx={{ width: '100%', border: '1px solid #000', borderTop: '0px', padding: '10px', borderRadius: '0px 0px 6px 6px' }}>
                        <Box className={classes.tabBox} sx={{ borderBottom: 1, borderColor: 'divider', '&.MuiBox-root': { padding: '0' } }}>
                            <Tabs className={classes.tabs} value={value2} onChange={handleChange2} TabIndicatorProps={{
                                style: {
                                    backgroundColor: "#FFFFFF",
                                    top: 0,
                                    height: "100%",
                                    opacity: 1,
                                    zIndex: 0,
                                    borderRadius: "30px",
                                    boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.29)",
                                    maxHeight: "35px",
                                    minHeight: "35px"
                                }
                            }} aria-label="basic tabs example">
                                {/* {<BeeTab label="Skincare"/>} */}
                                <Tab disableRipple className={classes.tab} sx={{ '&.Mui-selected': { color: 'black' } }} label="Clinical" {...a12yProps(0)} />
                                <Tab disableRipple className={classes.tab} sx={{ '&.Mui-selected': { color: 'black' } }} label="Community" {...a12yProps(1)} />
                            </Tabs>
                        </Box>
                        <TabPanel2 value={value2} index={0}>
                            <p>→ Inspired by traditional hair pomade, it gives brows soft, flexible hold in one easy swipe, and doesn't stiffen or flake</p>
                            <br/>
                            <Divider/>
                            <br/>
                            <p>→ Contains Oleic Acid, Lecithin, and Soluble Collagen to condition and moisturize brows</p>
                        </TabPanel2>
                        <TabPanel2 value={value2} index={1}>
                            Community text
                        </TabPanel2>
                    </Box>
                </section>
                <section className={classes.moreInformations}>
                    <Box className={classes.moreInfoChipContainer} sx={{ margin: '15px 0' }}>
                    <Chip className={classes.chip} label="Formula facts" variant="outlined" onClick={() => handleChipClick('Formula facts', 'This is the content for "Formula"')} />
                        <Chip className={classes.chip} label="How to use" variant="outlined" onClick={() => handleChipClick('How to use', 'This is the content for "How to"')} />
                        {/* <Chip className={classes.chip} label="Ingredients" variant="outlined" onClick={() => handleChipClick('Ingredients', 'This is the content for "Ingredients"')} /> */}
                        <Chip className={classes.chip} label="Sustainablitiy" variant="outlined" onClick={() => handleChipClick('Sustainablitiy', 'This is the content for "Sustainablitiy"')} />
                        {/* <Chip className={classes.chip} label="Texture" variant="outlined" onClick={() => handleChipClick('Texture', 'This is the content for "Texture"')} /> */}
                        <Chip className={classes.chip} label="FAQ" variant="outlined" onClick={() => handleChipClick('FAQ', 'This is the content for "FAQ"')} />
                    </Box>
                    <Dialog
                        fullScreen
                        open={open}
                        onClose={handleClose}
                        TransitionComponent={Transition}
                        className={classes.dialog}
                        PaperProps={{
                            style: {
                              borderRadius: '0 0 0 0',
                            },
                        }}
                    >
                        <StyledAppBar sx={{ position: 'relative' }}>
                        <Toolbar>
                            <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                            sx={{ paddingLeft: "11px"}}
                            >
                            <CloseIcon />
                            </IconButton>
                            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                {dialogTitle}
                            </Typography>
                            <Link
                                aria-label={title}
                                to={resourceUrl('/')}
                                className={classes.logoContainer}
                                data-cy="Header-logoContainer"
                            >
                                <Logo width={42} classes={{ logo: classes.logo }} />
                            </Link>
                        </Toolbar>
                        </StyledAppBar>
                        <div className={classes.dialogRichContent}>
                            <RichContent html={dialogContent} />
                        </div>
                    </Dialog>
                </section>
                <section className={classes.relatedUpSell}>
                    <Box className={classes.box} sx={{ width: '100%' }}>
                        <Box className={classes.tabBox} sx={{ borderBottom: 1, borderColor: 'divider', '&.MuiBox-root': { padding: '0' } }}>
                            <Tabs className={classes.tabs} value={value} onChange={handleChange} TabIndicatorProps={{
                                style: {
                                    backgroundColor: "#FFFFFF",
                                    top: 0,
                                    height: "100%",
                                    opacity: 1,
                                    zIndex: 0,
                                    borderRadius: "30px",
                                    boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.29)",
                                    maxHeight: "35px",
                                    minHeight: "35px"
                                }
                            }} aria-label="basic tabs example">
                                {/* {<BeeTab label="Skincare"/>} */}
                                <Tab disableRipple className={classes.tab} sx={{ '&.Mui-selected': { color: 'black' } }} label="You may also like" {...a11yProps(0)} />
                                <Tab disableRipple className={classes.tab} sx={{ '&.Mui-selected': { color: 'black' } }} label="Goes well with" {...a11yProps(1)} />
                            </Tabs>
                        </Box>
                        <TabPanel value={value} index={0}>
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
                        </TabPanel>
                        <TabPanel value={value} index={1}>
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
                                            $329
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
                                            $429
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
                        </TabPanel>
                    </Box>
                </section>
                {/* <section className={classes.quantity}>
                    
                </section> */}
                {/* <section className={classes.actions}>
                    <Suspense fallback={null}>
                        <WishlistButton {...wishlistButtonProps} />
                    </Suspense>
                </section> */}
                {/* <section className={classes.details}>
                    <span
                        data-cy="ProductFullDetail-detailsTitle"
                        className={classes.detailsTitle}
                    >
                        <FormattedMessage
                            id={'productFullDetail.details'}
                            defaultMessage={'Details'}
                        />
                    </span>
                    <CustomAttributes
                        customAttributes={customAttributesDetails.list}
                    />
                </section> */}
                {pageBuilderAttributes}
                <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: '99999' }} elevation={3}>
                    <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    >
                        <Box className={classes.stickyCart}>
                            <QuantityStepper
                                classes={{ root: classes.quantityRoot }}
                                min={1}
                                message={errors.get('quantity')}
                            />
                            {cartActionContent}
                        </Box>
                    </BottomNavigation>
                </Paper>
            </Form>
        </Fragment>
    );
};

ProductFullDetail.propTypes = {
    classes: shape({
        cartActions: string,
        description: string,
        descriptionTitle: string,
        details: string,
        detailsPageBuilder: string,
        detailsPageBuilderList: string,
        detailsTitle: string,
        imageCarousel: string,
        options: string,
        productName: string,
        productPrice: string,
        quantity: string,
        quantityTitle: string,
        quantityRoot: string,
        root: string,
        title: string,
        unavailableContainer: string
    }),
    product: shape({
        __typename: string,
        id: number,
        stock_status: string,
        sku: string.isRequired,
        price: shape({
            regularPrice: shape({
                amount: shape({
                    currency: string.isRequired,
                    value: number.isRequired
                })
            }).isRequired
        }).isRequired,
        media_gallery_entries: arrayOf(
            shape({
                uid: string,
                label: string,
                position: number,
                disabled: bool,
                file: string.isRequired
            })
        ),
        description: string,
        short_description: shape({
            html: string,
            __typename: string
        })
    }).isRequired
};

export default ProductFullDetail;
