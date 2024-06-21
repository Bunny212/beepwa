import React, { useMemo, Fragment, Suspense, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { FormattedMessage, useIntl } from 'react-intl';
import { arrayOf, bool, number, shape, string } from 'prop-types';
import { Form } from 'informed';
import { Info } from 'react-feather';
import { Link } from "react-router-dom";

import Price from '../Price';
import { useProductFullDetail } from './talons/useProductFullDetail';
import { isProductConfigurable } from '@magento/peregrine/lib/util/isProductConfigurable';

import { useStyle } from '@magento/venia-ui/lib/classify';
import Breadcrumbs from '@magento/venia-ui/lib/components/Breadcrumbs';
//import Button from '@magento/venia-ui/lib/components/Button';
import Button from '@mui/material/Button';
import FormError from '@magento/venia-ui/lib/components/FormError';
import QuantityStepperInner from '../QuantityStepperInner';
import RichContent from '@magento/venia-ui/lib/components/RichContent/richContent';
import { ProductOptionsShimmer } from '@magento/venia-ui/lib/components/ProductOptions';
import CustomAttributes from '@magento/venia-ui/lib/components/ProductFullDetail/CustomAttributes';
import defaultClasses from './productFullDetail.module.css';
import SwiperProductImageCarousel from '../SwiperProductImageCarousel';
import Image from '@magento/venia-ui/lib/components/Image';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Logo from '../Logo';
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';
import { useCartContext } from '@magento/peregrine/lib/context/cart';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import LoadingButton from '@mui/lab/LoadingButton';
import BottomNavigation from '@mui/material/BottomNavigation';
import 'swiper/swiper-bundle.css';
import WhatItDoesDisplay from './WhatItDoesDisplay';
import GetBundleProductOptions from './GetBundleProductOptions';
import CategoryName from './CategoryName';
import GetDeviceType from '../GetDeviceType/getDeviceType';
import { useAddToCart } from '../AddToCart/talons/useAddToCart';
import { useCart } from "react-use-cart";
import debounce from 'lodash.debounce';
import { useQuery, InMemoryCache } from '@apollo/client';
import { GET_CART_DETAILS_QUERY } from '../AddToCart/addToCart.qql';
import GtmViewItem from './GtmViewItem';
import { sendAddToCartEvent, sendRemoveFromCartEvent } from '../App/GTMEvents.js';

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

const cache = new InMemoryCache({
    typePolicies: {
        SimpleProduct: {
            keyFields: ['uid'], // Use 'uid' as the cache key for SimpleProduct
        },
    },
});

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
    justifyContent: 'space-between',
    fontFamily: 'inherit',
    whiteSpace: 'nowrap',
    padding: '8px 10px',
    '&:hover': {
        backgroundColor: '#FFC629',
        color: '#000000',
        boxShadow: 'none',
    },
    '&:focus': {
        backgroundColor: '#FFC629',
        color: '#000000',
        boxShadow: 'none',
    }
});

const CustomLoadingButton = styled(LoadingButton)({
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
    justifyContent: 'space-between',
    fontFamily: 'inherit',
    '&:hover': {
        backgroundColor: '#FFC629',
        color: '#000000',
        boxShadow: 'none',
    },
    '&:focus': {
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
    const location = useLocation();
    const [{ cartId }] = useCartContext();
    const { isDesktop, isMobile, isTablet } = GetDeviceType();
    const [value, setValue] = React.useState(0);
    const [value2, setValue2] = React.useState(0);
    const [isSlideChanged, setSlideChanged] = React.useState(false);
    const [isItemInCart, setIsItemInCart] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');
    console.log("-->>>> ", product);
    console.log("custom_attributes -->>>> ", product.custom_attributes);
    const talonProps = useProductFullDetail({ product });
    const talonAddToCartProps = useAddToCart({ product });
    const { dataGm } = location.state || {};
    const productAttributes = product.custom_attributes.map((item) => {
        const type = item.attribute_metadata.ui_input.ui_input_type;

        let valueToDisplay;

        switch (type) {
            case 'TEXTEDITOR':
            case 'TEXT':
            case 'TEXTAREA':
                valueToDisplay = item.entered_attribute_value.value;
                break;
            case 'SELECT':
            case 'BOOLEAN':
            case 'MULTISELECT':
                if (Array.isArray(item.selected_attribute_options.attribute_option)) {
                    // Extract and join only the labels from attribute_option
                    valueToDisplay = item.selected_attribute_options.attribute_option
                    .map(option => option.label)
                    .join(",");
                } else {
                    // Handle the case when only one option is selected
                    valueToDisplay = item.selected_attribute_options.attribute_option;
                }
                break;
            default:
                valueToDisplay = item.entered_attribute_value.value;
        }

        return {
            code: item.attribute_metadata.code,
            label: item.attribute_metadata.label,
            type: type,
            value: valueToDisplay,
        };
    });
    const what_is_it = productAttributes.find(
        (attribute) => attribute.code === "what_is_it"
    );
    const what_it_does = productAttributes.find(
        (attribute) => attribute.code === "what_it_does"
    );
    const why_is_it_special = productAttributes.find(
        (attribute) => attribute.code === "why_is_it_special"
    );
    const tags = productAttributes.find(
        (attribute) => attribute.code === "tags"
    );
    const how_to_use_instructions = productAttributes.find(
        (attribute) => attribute.code === "how_to_use_instructions"
    );
    const formulation_safety = productAttributes.find(
        (attribute) => attribute.code === "formulation_safety"
    );
    const active_ingredients = productAttributes.find(
        (attribute) => attribute.code === "active_ingredients"
    );
    const full_ingredients = productAttributes.find(
        (attribute) => attribute.code === "see_full_ingredients"
    );
    const real_results_clinical = productAttributes.find(
        (attribute) => attribute.code === "real_results_clinical"
    );
    const real_results_community = productAttributes.find(
        (attribute) => attribute.code === "real_results_community"
    );
    const product_label = productAttributes.find(
        (attribute) => attribute.code === "product_label"
    );
    const capacity_value = productAttributes.find(
        (attribute) => attribute.code === "capacity"
    );
    const capacity_unit = productAttributes.find(
        (attribute) => attribute.code === "capacity_unit"
    );
    const capacity = (capacity_unit && capacity_value) ? capacity_value.value + ' ' + capacity_unit.value : '';

    const regularPrice = product.price.regularPrice.amount.value;
    const price = product.price_range.maximum_price.final_price.value;
    const currency = product.price.regularPrice.amount.currency;

    const amountOff = product.price_range.maximum_price.discount.amount_off;
    const percentOff =  (amountOff / regularPrice) * 100
    const isDiscountGreaterThanZero = percentOff > 0;
    const formattedDiscount = '-' + Math.ceil(percentOff) + '%';
    const productSku = product.sku;

    console.log(" productAttributes = ", productAttributes);

    const [open, setOpen] = React.useState(false);
    const [dialogTitle, setDialogTitle] = React.useState('');
    const [dialogContent, setDialogContent] = React.useState('');
    const [currentQty, setCurrentQty] = React.useState(1);
    const [bundleProductOptions, setBundleProductOptions] = React.useState([]);
    const [isEditing, setIsEditing] = React.useState(false);
    const [localProduct, setLocalProduct] = React.useState(product);

    const totalPrice = price * currentQty;
    console.log("currentQty -->>>> ", currentQty);
    console.log("Price = ", price);
    console.log("Total = "+ totalPrice);

    const swiperChipConfig = {
        spaceBetween: 2,
        slidesPerView: 2.5,
        centeredSlides: false,
        grabCursor: true,
        loop: false
    };

    const swiperConfig = {
        spaceBetween: 10,
        slidesPerView: 1.5,
        centeredSlides: false,
        grabCursor: true,
        loop: false
    };

    const {
        addItem,
        isEmpty,
        totalItems,
        totalUniqueItems,
        items,
        cartTotal,
        inCart,
        emptyCart,
        updateItemQuantity,
        removeItem,
    } = useCart();

    const {
        breadcrumbCategoryId,
        handleSelectionChange,
        isOutOfStock,
        isEverythingOutOfStock,
        outOfStockVariants,
        isSupportedProductType,
        mediaGalleryEntries,
        productDetails,
        customAttributes,
        wishlistButtonProps
    } = talonProps;

    const {
        errorMessage,
        handleAddToCart,
        handleRemoveFromCart,
        handleUpdateItemQuantity,
        isAddToCartDisabled,
    } = talonAddToCartProps;

    const { data } = useQuery(GET_CART_DETAILS_QUERY, {
        variables: {
            cartId: cartId,
        },
        cache
    });

    const additionalParam = bundleProductOptions;

    const productInLocalCart = items && items.find(item => item.id === product.uid);
    //const itemQty = inCart(product.uid) ? productInLocalCart.quantity : currentQty;
    const [itemQty, setItemQty] = React.useState(currentQty);
    console.log("itemQty -->>>> ", itemQty);
    const handleRealAddToCart = (quantity) => {
        console.log("1111--->>>>>> quantity = ",quantity);
        handleAddToCart(quantity, additionalParam);
        if (dataGm) {
            const gtmAddToCartItem = {
                currency: dataGm.currency,
                country: dataGm.country,
                value: dataGm.value,
                items: dataGm.items.map((item, index) => ({
                    index: index + 1, // Index starts from 1
                    item_id: item.uid,
                    quantity: 1, // Assuming quantity is always 1
                    price: item.price,
                    discount: Math.ceil(item.discount), // Assuming no discount for now
                    item_name: item.item_name,
                    // Assuming other item details are not available in the provided data
                    item_brand: item.item_brand,
                    item_category: item.item_category,
                    item_list_id: item.item_list_id,
                    item_list_name: item.item_list_name,
                    item_variant: ''
                }))
            };
            //console.log("->>> Datalayer -> Prod Details gtmAddToCartItem = ", gtmAddToCartItem);
            sendAddToCartEvent(gtmAddToCartItem);
        }
    }

    const handleRealUpdateInCart = (quantity) => {
        const cartItem = data?.cart?.items?.find(item => item.product.uid === productInLocalCart.id);
        if (cartItem !== undefined && cartItem.uid) {
            handleUpdateItemQuantity(quantity, cartItem.uid);
            setIsEditing(false);
        }
    }

    const handleRealRemoveFromCart = () => {
        const cartItem = data?.cart?.items?.find(item => item.product.uid === productInLocalCart.id);
        if (cartItem !== undefined && cartItem.uid) {
            handleRemoveFromCart(cartItem.uid);
            if (dataGm) {
                const gtmRemoveFromCartItem = {
                    currency: dataGm.currency,
                    country: dataGm.country,
                    value: dataGm.value,
                    items: dataGm.items.map((item, index) => ({
                        index: index + 1, // Index starts from 1
                        item_id: item.uid,
                        quantity: 1, // Assuming quantity is always 1
                        price: item.price,
                        discount: Math.ceil(item.discount), // Assuming no discount for now
                        item_name: item.item_name,
                        // Assuming other item details are not available in the provided data
                        item_brand: item.item_brand,
                        item_category: item.item_category,
                        item_list_id: item.item_list_id,
                        item_list_name: item.item_list_name,
                        item_variant: ''
                    }))
                };
                //console.log("->>> Datalayer -> Prod Details gtmRemoveFromCartItem = ", gtmRemoveFromCartItem);
                sendRemoveFromCartEvent(gtmRemoveFromCartItem);
            }
        }
    }

    const debouncedHandleRealAddToCart = debounce(handleRealAddToCart, 200); // Adjust the delay as needed
    const debouncedHandleRealUpdateInCart = debounce(handleRealUpdateInCart, 200); // Adjust the delay as needed
    const debouncedHandleRealRemoveFromCart = debounce(handleRealRemoveFromCart, 200); // Adjust the delay as needed

    const addItemToCart = () => {
        addItem(localProduct, currentQty);
        debouncedHandleRealAddToCart(currentQty);
        disableLoading();
    }

    const updateParam = (paramName, newValue) => {
        setLocalProduct(prevObject => ({
          ...prevObject,
          [paramName]: newValue
        }));
      };
    
    const removeItemFromCart = () => {
        removeItem(productInLocalCart.id);
        debouncedHandleRealRemoveFromCart();
        setTimeout(() => {
            setIsLoading(false);
            setIsEditing(true);
            setItemQty(1);
        }, 500);
    }
    
    const updateCartItemQuantity = () => {
        updateItemQuantity(productInLocalCart.id, currentQty);
        debouncedHandleRealUpdateInCart(currentQty);
        disableLoading();
    }

    const handelAddAction = () => {
        enableLoading();
        if(!isItemInCart) {
            console.log("adding in cart");
            addItemToCart();
        }else{
            console.log("updating in cart");
            updateCartItemQuantity();
        }
    }

    const enableLoading = () => {
        setIsLoading(true);
        setIsEditing(true);
    }

    const disableLoading = () => {
        setTimeout(() => {
            setIsLoading(false);
            setIsEditing(false);
        }, 1000);
    }

    useEffect(() => {
        updateParam('id', product.uid);
        //setIsLoading(false);
    }, [product]);

    useEffect(() => {
        if(inCart(product.uid)) {
            setItemQty(inCart(product.uid) ? productInLocalCart.quantity : currentQty);
        }
    }, [product.uid, currentQty, productInLocalCart?.quantity]);

    useEffect(() => {
        // Set isItemInCart based on the value of itemQty
        setIsItemInCart(inCart(product.uid));
        //setCurrentQty(itemQty);
    }, [product.uid, itemQty, items]);

    useEffect(() => {
        if(isItemInCart) {
            setIsEditing(currentQty !== itemQty);
        }else{
            setIsEditing(true);
        }
    }, [itemQty, currentQty, isItemInCart]);

    const handleClick = () => {
        console.info('You clicked the Chip.');
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChange2 = (event, newValue) => {
        setValue2(newValue);
    };

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

    console.log("isEditing = ", isEditing);

    const cartCallToActionText = !isEverythingOutOfStock || !isOutOfStock
    ? isItemInCart
        ? (
            <FormattedMessage
            id="productFullDetail.updateItemToCart"
            defaultMessage={isEditing ? formatMessage({
                id: 'updateCart',
                defaultMessage: 'Update Cart'
            }) : formatMessage({
                id: 'inCart',
                defaultMessage: 'In Cart'
            })}
            />
        )
        : (
            <FormattedMessage
            id="productFullDetail.addItemToCart"
            defaultMessage="Add to Cart"
            />
        )
    : (
        <FormattedMessage
            id="productFullDetail.itemOutOfStock"
            defaultMessage="Out of Stock"
        />
    );
      
    console.log("-->>> isLoading = ", isLoading);
    // Error message for screen reader
    const cartActionContent = isSupportedProductType ? (
        <section className={isDesktop ? classes.desktopActButton : classes.actButton}>
            {isLoading ? (
                <CustomLoadingButton className={classes.nextBtn} disabled loading size="large" variant="outlined">
                    Submit
                </CustomLoadingButton>
            ) : (
                <AddToCartButton
                    data-cy="ProductFullDetail-addToCartButton"
                    // disabled={isAddToCartDisabled || !isEditing}
                    // aria-disabled={isAddToCartDisabled}
                    disabled={!isEditing || isLoading || isAddToCartDisabled}
                    aria-disabled={!isEditing || isLoading || isAddToCartDisabled}
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
                    //type="submit"
                    onClick={handelAddAction}
                    size="large"
                    variant="contained"
                >
                    {cartCallToActionText}
                    <Box className={classes.btnPrice}>
                        <Price
                            currencyCode={productDetails.price.currency}
                            value={totalPrice}
                        />
                    </Box>
                </AddToCartButton>
            )}
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

    let priceResult;
    if (price < regularPrice) {
        // Error message for screen reader
        priceResult = (
            <Box className={classes.priceContainer}>
                <Typography variant="h6" component="span" className={classes.priceText}>
                    <Price
                        currencyCode={currency}
                        value={price}
                    />
                </Typography>
                <Typography variant="h6" component="span" className={`${classes.priceText} ${classes.oldPrice}`}>
                    <Price
                        currencyCode={currency}
                        value={regularPrice}
                    />
                </Typography>
            </Box>
        );
    } else if (price === regularPrice) {
        priceResult = (
            <Box className={classes.priceContainer}>
                <Typography variant="h6" component="span" className={classes.priceText}>
                    <Price
                        currencyCode={currency}
                        value={regularPrice}
                    />
                </Typography>
            </Box>
        );
    }

    let mobileContent = (
        <>
            <GetBundleProductOptions setBundleProductOptions={setBundleProductOptions} sku={productSku} />
            <Form
                className={classes.root}
                data-cy="ProductFullDetail-root"
                //onSubmit={handleAddToCart}
                //onSubmit={event => handleAddToCart(event, additionalParam)}
            >
                <section className={classes.imageCarousel}>
                    {product_label && product_label.value && !isSlideChanged && (
                        <Typography variant="caption" className={classes.prodLabel}>
                            {product_label.value}
                        </Typography>
                    )}
                    {isDiscountGreaterThanZero > 0 && (
                        <Typography variant="caption" className={classes.prodSaleLabel}>
                            {formattedDiscount}
                        </Typography>
                    )}
                    <SwiperProductImageCarousel images={mediaGalleryEntries} setSlideChanged={setSlideChanged} />
                </section>
                <section className={classes.tags}>
                    <Grid className={classes.tagsGrid} container spacing={2}>
                        {/* {tags && (
                            <Grid item xs={6} sx={{ padding: '8px 0' }}>
                                <Box className={classes.chipContainer} sx={{ margin: '15px 0' }}>
                                    {tags.value.split(",").map((item, index) => (
                                        <Chip key={index} className={classes.chip} label={item} variant="outlined" onClick={handleClick} />
                                    ))}
                                </Box>
                            </Grid>
                        )} */}
                        <Grid item xs={6} sx={{ padding: '8px 0' }}>
                            <div className={classes.topPrice}>
                                    {priceResult}
                            </div>
                        </Grid>
                        {capacity && (
                            <Grid item xs={6} sx={{ padding: '8px 0', display: 'flex', justifyContent: 'flex-end' }}>
                                <Box className={classes.chipContainer} sx={{ margin: '15px 0' }}>
                                    <Chip className={classes.chip} label={capacity} variant="outlined" />
                                </Box>
                            </Grid>
                        )}
                    </Grid>
                </section>
                <section className={classes.title}>
                    <CategoryName sku={productDetails.sku} classes={classes} />
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start', marginTop: '0px', marginBottom: '0px' }}>
                        <Typography className={classes.heading2Line} aria-live="polite" data-cy="ProductFullDetail-productName" variant="h1">
                            {productDetails.name}
                        </Typography>
                    </Box>
                    {/* <Typography className={classes.subTitle2} variant="subtitle2" gutterBottom>
                        {shortDescription}
                    </Typography> */}
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
                    {what_is_it && (
                        <Box className={classes.informationBox}>
                            <span
                                data-cy="ProductFullDetail-whatIsIt"
                                className={classes.informationTitle}
                            >
                                <FormattedMessage
                                    id={'productFullDetail.whatIsIt'}
                                    defaultMessage={what_is_it.label}
                                />
                            </span>
                            <div className={classes.richContent}>
                                <RichContent html={what_is_it.value} />
                            </div>
                        </Box>
                    )}
                    {what_it_does && (
                        <Box className={classes.informationBox}>
                            <span
                                data-cy="ProductFullDetail-whatItDoes"
                                className={classes.informationTitle}
                            >
                                <FormattedMessage
                                    id={'productFullDetail.whatItDoes'}
                                    defaultMessage={what_it_does.label}
                                />
                            </span>
                            <div className={classes.richContent}>
                                <WhatItDoesDisplay sku={productDetails.sku} classes={classes} />
                            </div>
                        </Box>
                    )}
                    {why_is_it_special && (
                        <Box className={classes.informationBox}>
                            <span
                                data-cy="ProductFullDetail-whatIsIt"
                                className={classes.informationTitle}
                            >
                                <FormattedMessage
                                    id={'productFullDetail.whatIsSpecial'}
                                    defaultMessage={why_is_it_special.label}
                                />
                            </span>
                            <div className={classes.richContent}>
                                <RichContent html={why_is_it_special.value} />
                            </div>
                        </Box>
                    )}
                </section>
                {real_results_clinical && real_results_community ? (
                    <section className={classes.realResults}>
                        <Box className={classes.realResultsTitleContainer} sx={{ margin: '15px 0 0' }}>
                            <Typography className={classes.realResultsTitle} variant="h6" component="div">
                                <FormattedMessage
                                    id="realResults"
                                    defaultMessage="Real Results"
                                />
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
                                    {real_results_clinical && (
                                        <Tab disableRipple className={classes.tab} sx={{ '&.Mui-selected': { color: 'black' } }} label={real_results_clinical.label} {...a12yProps(0)} />
                                    )}
                                    {real_results_community && (
                                        <Tab disableRipple className={classes.tab} sx={{ '&.Mui-selected': { color: 'black' } }} label={real_results_community.label} {...a12yProps(1)} />
                                    )}
                                </Tabs>
                            </Box>
                            {real_results_clinical && (
                                <TabPanel2 value={value2} index={0}>
                                    <RichContent html={real_results_clinical.value} />
                                </TabPanel2>
                            )}
                            {real_results_community && (
                                <TabPanel2 value={value2} index={1}>
                                    <RichContent html={real_results_community.value} />
                                </TabPanel2>
                            )}
                        </Box>
                    </section>
                ) : null}
                <section className={classes.moreInformations}>
                    <Box className={classes.moreInfoChipContainer} sx={{ margin: '15px 0' }}>
                        {how_to_use_instructions && (
                            <Chip
                                className={classes.chip}
                                label={how_to_use_instructions.label}
                                variant="outlined"
                                onClick={() => handleChipClick(how_to_use_instructions.label, how_to_use_instructions.value)}
                            />
                        )}
                        {active_ingredients && (
                            <Chip className={classes.chip} label={active_ingredients.label} variant="outlined" onClick={() => handleChipClick(active_ingredients.label, active_ingredients.value)} />
                        )}
                        {full_ingredients && (
                            <Chip className={classes.chip} label={full_ingredients.label} variant="outlined" onClick={() => handleChipClick(full_ingredients.label, full_ingredients.value)} />
                        )}
                        {formulation_safety && (
                            <Chip className={classes.chip} label={formulation_safety.label} variant="outlined" onClick={() => handleChipClick(formulation_safety.label, formulation_safety.value)} />
                        )}
                        {/* <Chip className={classes.chip} label="Ingredients" variant="outlined" onClick={() => handleChipClick('Ingredients', 'This is the content for "Ingredients"')} /> */}
                        {/* <Chip className={classes.chip} label="Sustainablitiy" variant="outlined" onClick={() => handleChipClick('Sustainablitiy', 'This is the content for "Sustainablitiy"')} /> */}
                        {/* <Chip className={classes.chip} label="Texture" variant="outlined" onClick={() => handleChipClick('Texture', 'This is the content for "Texture"')} /> */}
                        {/* <Chip className={classes.chip} label="FAQ" variant="outlined" onClick={() => handleChipClick('FAQ', 'This is the content for "FAQ"')} /> */}
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
                                    sx={{ paddingLeft: "11px" }}
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
                {/* <section className={classes.relatedUpSell}>
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
                            </Swiper>
                        </TabPanel>
                    </Box>
                </section> */}
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
                        {isSupportedProductType ? (
                            <Box className={classes.stickyCart}>
                                <QuantityStepperInner
                                    classes={{ root: classes.quantityRoot }}
                                    min={1}
                                    message={errors.get('quantity')}
                                    setCurrentQty={setCurrentQty}
                                    isItemInCart={isItemInCart}
                                    itemQty={itemQty}
                                    removeItemFromCart={removeItemFromCart}
                                />
                                {cartActionContent}
                            </Box>
                        ) : (
                            cartActionContent // No need for curly braces here
                        )}
                    </BottomNavigation>
                </Paper>
            </Form>
        </>
    );

    let desktopContent = (
        <>
            <GetBundleProductOptions setBundleProductOptions={setBundleProductOptions} sku={productSku} />
            <Form
                className={classes.root}
                data-cy="ProductFullDetail-root"
                //onSubmit={handleAddToCart}
                //onSubmit={event => handleAddToCart(event, additionalParam)}
            >
                <Grid container spacing={2}>
                    <Grid sm={6} md={6} lg={6} xl={6}>
                        <section className={classes.imageCarousel}>
                            {product_label && product_label.value && !isSlideChanged && (
                                <Typography variant="caption" className={isDesktop ? classes.desktopProdLabel : classes.prodLabel}>
                                    {product_label.value}
                                </Typography>
                            )}
                            {isDiscountGreaterThanZero > 0 && (
                                <Typography variant="caption" className={isDesktop ? classes.desktopProdSaleLabel : classes.prodSaleLabel}>
                                    {formattedDiscount}
                                </Typography>
                            )}
                            <SwiperProductImageCarousel images={mediaGalleryEntries} setSlideChanged={setSlideChanged} isDesktop={isDesktop} />
                        </section>
                    </Grid>
                    <Grid sm={6} md={6} lg={6} xl={6}>
                    <section className={classes.tags}>
                        <Grid className={classes.tagsGrid} container spacing={2}>
                            <Grid item xs={6} sx={{ padding: '8px 0' }}>
                                <div className={classes.topPrice}>
                                        {priceResult}
                                </div>
                            </Grid>
                            {capacity && (
                                <Grid item xs={6} sx={{ padding: '8px 0', display: 'flex', justifyContent: 'flex-end' }}>
                                    <Box className={classes.chipContainer} sx={{ margin: '15px 0' }}>
                                        <Chip className={classes.chip} label={capacity} variant="outlined" />
                                    </Box>
                                </Grid>
                            )}
                        </Grid>
                    </section>
                    <section className={classes.desktopTitle}>
                        <CategoryName sku={productDetails.sku} classes={classes} isDesktop={isDesktop} />
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start', marginTop: '0px', marginBottom: '0px' }}>
                            <Typography className={classes.desktopHeading2Line} aria-live="polite" data-cy="ProductFullDetail-productName" variant="h1">
                                {productDetails.name}
                            </Typography>
                        </Box>
                        <BottomNavigation
                            showLabels
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                            sx={{ marginTop: '10px', justifyContent: 'flex-start' }}
                        >
                            {isSupportedProductType ? (
                                <Box className={classes.desktopStickyCart}>
                                    <QuantityStepperInner
                                        classes={{ root: classes.quantityRoot }}
                                        min={1}
                                        message={errors.get('quantity')}
                                        setCurrentQty={setCurrentQty}
                                    />
                                    {cartActionContent}
                                </Box>
                            ) : (
                                cartActionContent // No need for curly braces here
                            )}
                        </BottomNavigation>
                    </section>
                    <FormError
                        classes={{
                            root: classes.formErrors
                        }}
                        errors={errors.get('form') || []}
                    />
                    <section className={classes.options}>{options}</section>
                    <section className={classes.informations}>
                        {what_is_it && (
                            <Box className={classes.informationBox}>
                                <span
                                    data-cy="ProductFullDetail-whatIsIt"
                                    className={classes.informationTitle}
                                >
                                    <FormattedMessage
                                        id={'productFullDetail.whatIsIt'}
                                        defaultMessage={what_is_it.label}
                                    />
                                </span>
                                <div className={classes.richContent}>
                                    <RichContent html={what_is_it.value} />
                                </div>
                            </Box>
                        )}
                        {what_it_does && (
                            <Box className={classes.informationBox}>
                                <span
                                    data-cy="ProductFullDetail-whatItDoes"
                                    className={classes.informationTitle}
                                >
                                    <FormattedMessage
                                        id={'productFullDetail.whatItDoes'}
                                        defaultMessage={what_it_does.label}
                                    />
                                </span>
                                <div className={classes.richContent}>
                                    <WhatItDoesDisplay sku={productDetails.sku} classes={classes} />
                                </div>
                            </Box>
                        )}
                        {why_is_it_special && (
                            <Box className={classes.informationBox}>
                                <span
                                    data-cy="ProductFullDetail-whatIsIt"
                                    className={classes.informationTitle}
                                >
                                    <FormattedMessage
                                        id={'productFullDetail.whatIsSpecial'}
                                        defaultMessage={why_is_it_special.label}
                                    />
                                </span>
                                <div className={classes.richContent}>
                                    <RichContent html={why_is_it_special.value} />
                                </div>
                            </Box>
                        )}
                    </section>
                    {real_results_clinical && real_results_community ? (
                        <section className={classes.realResults}>
                            <Box className={classes.realResultsTitleContainer} sx={{ margin: '15px 0 0' }}>
                                <Typography className={classes.realResultsTitle} variant="h6" component="div">
                                    <FormattedMessage
                                        id="realResults"
                                        defaultMessage="Real Results"
                                    />
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
                                        {real_results_clinical && (
                                            <Tab disableRipple className={classes.tab} sx={{ '&.Mui-selected': { color: 'black' } }} label={real_results_clinical.label} {...a12yProps(0)} />
                                        )}
                                        {real_results_community && (
                                            <Tab disableRipple className={classes.tab} sx={{ '&.Mui-selected': { color: 'black' } }} label={real_results_community.label} {...a12yProps(1)} />
                                        )}
                                    </Tabs>
                                </Box>
                                {real_results_clinical && (
                                    <TabPanel2 value={value2} index={0}>
                                        <RichContent html={real_results_clinical.value} />
                                    </TabPanel2>
                                )}
                                {real_results_community && (
                                    <TabPanel2 value={value2} index={1}>
                                        <RichContent html={real_results_community.value} />
                                    </TabPanel2>
                                )}
                            </Box>
                        </section>
                    ) : null}
                    <section className={classes.moreInformations}>
                        <Box className={classes.moreInfoChipContainer} sx={{ margin: '15px 0' }}>
                            {how_to_use_instructions && (
                                <Chip
                                    className={classes.chip}
                                    label={how_to_use_instructions.label}
                                    variant="outlined"
                                    onClick={() => handleChipClick(how_to_use_instructions.label, how_to_use_instructions.value)}
                                />
                            )}
                            {active_ingredients && (
                                <Chip className={classes.chip} label={active_ingredients.label} variant="outlined" onClick={() => handleChipClick(active_ingredients.label, active_ingredients.value)} />
                            )}
                            {full_ingredients && (
                                <Chip className={classes.chip} label={full_ingredients.label} variant="outlined" onClick={() => handleChipClick(full_ingredients.label, full_ingredients.value)} />
                            )}
                            {formulation_safety && (
                                <Chip className={classes.chip} label={formulation_safety.label} variant="outlined" onClick={() => handleChipClick(formulation_safety.label, formulation_safety.value)} />
                            )}
                            {/* <Chip className={classes.chip} label="Ingredients" variant="outlined" onClick={() => handleChipClick('Ingredients', 'This is the content for "Ingredients"')} /> */}
                            {/* <Chip className={classes.chip} label="Sustainablitiy" variant="outlined" onClick={() => handleChipClick('Sustainablitiy', 'This is the content for "Sustainablitiy"')} /> */}
                            {/* <Chip className={classes.chip} label="Texture" variant="outlined" onClick={() => handleChipClick('Texture', 'This is the content for "Texture"')} /> */}
                            {/* <Chip className={classes.chip} label="FAQ" variant="outlined" onClick={() => handleChipClick('FAQ', 'This is the content for "FAQ"')} /> */}
                        </Box>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            scroll={scroll}
                            TransitionComponent={Transition}
                            className={classes.dialog}
                        >
                            <StyledAppBar sx={{ position: 'relative' }}>
                                <Toolbar>
                                    <IconButton
                                        edge="start"
                                        color="inherit"
                                        onClick={handleClose}
                                        aria-label="close"
                                        sx={{ paddingLeft: "11px" }}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                        {dialogTitle}
                                    </Typography>
                                </Toolbar>
                            </StyledAppBar>
                            <div className={classes.dialogRichContent}>
                                <RichContent html={dialogContent} />
                            </div>
                        </Dialog>
                    </section>
                    {pageBuilderAttributes}
                    </Grid>
                </Grid>
            </Form>
        </>
    );
    console.log("**** isItemInCart  = ", isItemInCart );
    return (
        <Fragment>
            <GtmViewItem sku={productDetails.sku} />
            {isDesktop ? desktopContent : mobileContent}
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
