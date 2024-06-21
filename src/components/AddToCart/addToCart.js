// src/components/AddToCart.js
import React, { useEffect, useState, Fragment } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Form } from 'informed';
import { useCartContext } from '@magento/peregrine/lib/context/cart';
import { useAddToCart } from './talons/useAddToCart';
import Button from '@magento/venia-ui/lib/components/Button';
import 'swiper/swiper-bundle.css';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { InputAdornment, TextField, createSvgIcon } from '@mui/material';
import QuantityStepper from '../QuantityStepper';
import { useQuery, InMemoryCache } from '@apollo/client';
import { GET_CART_DETAILS_QUERY } from './addToCart.qql';
import './addToCart.css'; // Import your custom CSS
import Chip from '@mui/material/Chip';
import CustomIcon from '../CustomIcons/CustomIcons';
import LoadingButton from '@mui/lab/LoadingButton';
import { useCart } from "react-use-cart";
import debounce from 'lodash.debounce';
import { sendAddToCartEvent, sendRemoveFromCartEvent } from '../App/GTMEvents.js';

const OUT_OF_STOCK_CODE = 'OUT_OF_STOCK';

const cache = new InMemoryCache({
    typePolicies: {
        SimpleProduct: {
            keyFields: ['uid'], // Use 'uid' as the cache key for SimpleProduct
        },
    },
});

const CustomLoadingButton = styled(LoadingButton)({
    width: '100%',
    backgroundColor: '#FFFFFF',
    color: '#000000',
    boxShadow: 'none',
    fontSize: '14px',
    fontWeight: '650',
    color: '#000000',
    textTransform: 'initial',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontFamily: 'inherit',
    minWidth: '28px',
    maxWidth: '28px',
    minHeight: '28px',
    maxHeight: '28px',
    borderRadius: '50%',
    padding: '0',
    '&:hover': {
        backgroundColor: '#FFFFFF',
        color: '#000000',
        boxShadow: 'none',
    },
    '&:focus': {
        backgroundColor: '#FFFFFF',
        color: '#000000',
        boxShadow: 'none',
    }
});

const AddToCart = (props) => {
    //const { product, isScrolling, setIsScrolling } = props;
    const { product } = props;
    const { formatMessage } = useIntl();
    const [{ cartId }] = useCartContext();
    const talonProps = useAddToCart({ product });
    const [showDefault, setShowDefault] = useState(false);
    const [showDefaultAction, setShowDefaultAction] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isFirstTimeItemAddedToCart, setIsFirstTimeItemAddedToCart] = useState(false);

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

    const { data } = useQuery(GET_CART_DETAILS_QUERY, {
        variables: {
            cartId: cartId,
        },
        cache
    });
    const productInLocalCart = items && items.find(item => item.id === product.uid);

    const handleRealAddToCart = (quantity) => {
        handleAddToCart(quantity);
        disableLoading();
        if (product && product.data_layer) {
            const gtmAddToCartItem = {
                currency: product.data_layer.currency,
                country: product.data_layer.country,
                value: product.data_layer.value,
                items: product.data_layer.items.map((item, index) => ({
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
            //console.log("->>> Datalayer -> gtmAddToCartItem = ", gtmAddToCartItem);
            sendAddToCartEvent(gtmAddToCartItem);
        }
    }

    const handleRealUpdateInCart = (quantity) => {
        const cartItem = data?.cart?.items?.find(item => item.product.uid === productInLocalCart.id);
        if (cartItem !== undefined && cartItem.uid) {
            handleUpdateItemQuantity(quantity, cartItem.uid);
        }
        // else {
        //     console.log("--->>>>>> quantity = ",quantity);
        //     handleAddToCart(quantity);
        // }
    }

    const handleRealRemoveFromCart = () => {
        const cartItem = data?.cart?.items?.find(item => item.product.uid === productInLocalCart.id);
        if (cartItem !== undefined && cartItem.uid) {
            handleRemoveFromCart(cartItem.uid);
            if (product && product.data_layer) {
                const gtmRemoveFromCartItem = {
                    currency: product.data_layer.currency,
                    country: product.data_layer.country,
                    value: product.data_layer.value,
                    items: product.data_layer.items.map((item, index) => ({
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
                //console.log("->>> Datalayer -> gtmRemoveFromCartItem = ", gtmRemoveFromCartItem);
                sendRemoveFromCartEvent(gtmRemoveFromCartItem);
            }
        }
    }

    const debouncedHandleRealAddToCart = debounce(handleRealAddToCart, 200); // Adjust the delay as needed
    const debouncedHandleRealUpdateInCart = debounce(handleRealUpdateInCart, 200); // Adjust the delay as needed
    const debouncedHandleRealRemoveFromCart = debounce(handleRealRemoveFromCart, 200); // Adjust the delay as needed

    const addItemToCart = () => {
        //enableLoading();
        //setIsFirstTimeItemAddedToCart(true);
        addItem(product, 1);
        debouncedHandleRealAddToCart(1);
        setShowDefault(true);
        //useGtmData(product, 1);
        // Reset to false after a delay (e.g., 3000 milliseconds or 3 seconds)
        // setTimeout(() => {
        //     setIsFirstTimeItemAddedToCart(false);
        // }, 500);
    }
    
    const removeItemFromCart = () => {
        removeItem(productInLocalCart.id);
        debouncedHandleRealRemoveFromCart();
    }
    
    const incrementCartItemQuantity = (event) => {
        event.preventDefault();
        // if(!isFirstTimeItemAddedToCart) {
        //     // If item is First Time added to cart, disable the increment button
        //     return;
        // }
        let quantity = productInLocalCart.quantity + 1;
        updateItemQuantity(productInLocalCart.id, quantity);
        debouncedHandleRealUpdateInCart(quantity);
    }
    
    const decrementCartItemQuantity = (event) => {
        event.preventDefault();
        let quantity = productInLocalCart.quantity - 1;
        updateItemQuantity(productInLocalCart.id, quantity);
        debouncedHandleRealUpdateInCart(quantity);
    }

    const enableLoading = () => {
        setIsLoading(true);
        setIsEditing(true);
    }

    const disableLoading = () => {
        setTimeout(() => {
            setIsLoading(false);
            setIsEditing(false);
        }, 2500);
    }
    
    const getLocalCartItems = items;
    const itemQty = inCart(product.uid) ? productInLocalCart.quantity : 0;
    const __isItemInCart = inCart(product.uid) ? itemQty : 0;
    const [isItemInCart,setIsItemInCart] = useState(false);
    
    const {
        errorMessage,
        handleAddToCart,
        handleRemoveFromCart,
        handleUpdateItemQuantity,
        isAddToCartDisabled
    } = talonProps;

    const getIsItemOutOfStock = (product) => {
        const { stock_status } = product;
        return stock_status === OUT_OF_STOCK_CODE;
    };
    const isItemOutOfStock = getIsItemOutOfStock(product);

    const [animationClass, setAnimationClass] = useState('fade-in');
    const [quantity, setQuantity] = useState(1);
    const [uid, setUid] = useState('');
    //const [inCart, setInCart] = useState(false);
    const [isUpdatingQuantity, setIsUpdatingQuantity] = useState(false);

    
    // const _handleTouchScroll = () => {
    //     setIsScrolling(true);
    // };

    // const handleTouchScroll = (event) => {
    //     setIsScrolling(true);
    //     // Your touch scroll logic here
    //     console.log('Touch event detected');
    // };

    const handleShowActions = () => {
        setShowDefault(true);
    };

    // useEffect(() => {
    //     // This effect runs once after the component mounts
    //     setIsScrolling(false);
    //     setAnimationClass( isScrolling ? 'fade-in' : 'fade-out');
    // }, [product.id]); // Empty dependency array ensures the effect runs only once

    useEffect(() => {
        // Set isItemInCart based on the value of itemQty
        setIsItemInCart(inCart(product.uid) ? itemQty : 0);
    }, [product.uid, itemQty]);

    // useEffect(() => {
    //     setShowDefault(!isScrolling);
    //     setShowDefaultAction(!isScrolling);
    // }, [isScrolling]);

    useEffect(() => {
        setShowDefaultAction(!showDefault);
    }, [showDefault]);

    //  useEffect(() => {
    //     setIsItemAddedToCart(!isAddToCartDisabled);
    // }, [product.id, isAddToCartDisabled]);

    // useEffect(() => {
    //     //window.addEventListener('scroll', handleScroll);
    //     //window.addEventListener('touchmove', handleTouchScroll);
    //     //document.body.addEventListener('touchmove', handleBodyTouchMove);
    
    //     return () => {
    //       //window.removeEventListener('scroll', handleScroll);
    //       window.removeEventListener('touchmove', handleTouchScroll);
    //       //document.body.removeEventListener('touchmove', handleBodyTouchMove);
    //     };
    // }, []);
    //console.log("*** >> isScrolling = ", isScrolling);

    // useEffect(() => {
    //     if (data) {
    //         // Check if the product is in the cart based on SKU
    //         const cart = getLocalCartItems;
    //         if (cart?.items?.length > 0) {
    //             const productInCart = cart.items.find(item => item.product.id === product.id);
    //             setIsItemInCart(!!productInCart);
    //             // Update the quantity if the product is in the cart
    //             // if (productInCart) {
    //             //     setQuantity(productInCart.quantity);
    //             //     setUid(productInCart.uid);
    //             // } else {
    //             //     setInCart(false);
    //             //     setQuantity(1);
    //             //     setUid(''); // Set uid to an appropriate default value or leave it empty
    //             // }
    //         }

    //     }
    // }, [data, product.sku]);

    // useEffect(() => {
    //     // When 'inCart' changes, set the animation class accordingly
    //     setAnimationClass( isItemInCart ? 'fade-in' : 'fade-out');
    //     //setIsScrolling(true);
    // }, [product.id, isItemInCart]);

    // const handleOnChangeInput = () => {
    //     console.log("Input value changed:", quantity);
    // };

    // const handleIncrement = () => {
    //     setIsUpdatingQuantity(true); // Start updating quantity
    //     setQuantity(quantity + 1);
    // };

    // const handleDecrement = () => {
    //     setIsUpdatingQuantity(true); // Start updating quantity
    //     if (quantity > 1) {
    //         setQuantity(quantity - 1);
    //     } else {
    //         setInCart(false);
    //     }
    // };


    // useEffect(() => {
    //     // After updating quantity, set isUpdatingQuantity to false
    //     if (isUpdatingQuantity) {
    //         handleOnChangeInput();
    //         handleUpdateItemQuantity(quantity, uid);
    //         setIsUpdatingQuantity(false);
    //     }
    // }, [quantity, uid, isUpdatingQuantity]);



    const PlusIcon = createSvgIcon(
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#000"
            className="h-6 w-6"
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>,
        'Plus',
    );

    const MinusIcon = createSvgIcon(
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#000"
            className="h-6 w-6"
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
        </svg>,
        'Minus'
    );

    const StyledBasicTextField = styled(TextField)(() => ({
        "& .MuiOutlinedInput-root": {
            padding: "0",
            height: '30px',
            "& .MuiOutlinedInput-notchedOutline": {
                padding: "0",
            },
        },
        "& .MuiOutlinedInput-input.Mui-focused .MuiOutlinedInput-notchedOutline": {
            padding: "0",
        }
    }));

    const hiddenStyles = {
        display: 'none',
    };

    let defaultAction = (
        // <Form
        //     className="root"
        //     data-cy="AddToCart-root"
        //     onSubmit={handleAddToCart}
        // >
        isEditing && isLoading ? (
            <CustomLoadingButton disabled loading size="small" variant="outlined">
                Submit
            </CustomLoadingButton>
        ) : (
            <Button
                className="addBtn"
                onClick={addItemToCart}
                disabled={isAddToCartDisabled}
                aria-disabled={isAddToCartDisabled}
                type="submit"
            >
                <PlusIcon />
            </Button>
        )
            
        //     <div style={hiddenStyles}>
        //         <QuantityStepper
        //             classes=""
        //             min={1}
        //             message=""
        //         />
        //     </div>
        // </Form>
    );

    let currentQty = (
        <Chip className="current-qty" onClick={handleShowActions} label={itemQty} />
    );

    let inCartContent = (
        <div className="cartContainer">
            <div className="cartInput">
                <Form
                    className="root"
                    data-cy="AddToCart-root"
                    style={{ margin: 0, padding: 0 }}
                >
                    <StyledBasicTextField
                        className='custom-textfield'
                        type="text"
                        field="quantity"
                        inputMode="numeric"
                        value={itemQty}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment className="custom-input-adornment" position="start">
                                    {itemQty > 1 ? (
                                        <Button
                                            className="addBtn"
                                            disabled={isAddToCartDisabled}
                                            aria-disabled={isAddToCartDisabled}
                                            onClick={(event) => decrementCartItemQuantity(event)}
                                        >
                                            <MinusIcon />
                                        </Button>
                                    ) : (
                                        <Button
                                            className="trashBtn"
                                            disabled={isAddToCartDisabled}
                                            aria-disabled={isAddToCartDisabled}
                                            onClick={removeItemFromCart}
                                        >
                                            {/* <TrashIcon /> */}
                                            <CustomIcon className="trashIcon" name="trash" fontSize="15px" height="16px" color="#000" selectedColor="#000" selected={true} />
                                        </Button>
                                    )}
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment className="custom-input-adornment" position="end">
                                    <Button
                                        className="addBtn"
                                        disabled={isAddToCartDisabled}
                                        aria-disabled={isAddToCartDisabled}
                                        onClick={(event) => incrementCartItemQuantity(event)}
                                    >
                                        <PlusIcon />
                                    </Button>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Form>
            </div>
            {isItemOutOfStock && (
                <div className="error-message">{errorMessage}</div>
            )}
        </div>
    );
    
    const defaultContent = !isItemInCart ? (
        <Box key={product.uid} className="cartAction">
            {defaultAction}
        </Box>
    ) : (
        <Box key={product.uid} className={`cartAction ${animationClass}`}>
            {inCartContent}
        </Box>
    );

    const currentQtyContent = showDefaultAction ? null : (
        <Box key={product.uid} className="cartAction">
            {currentQty}
        </Box>
    );

    const inCartProdContent = showDefaultAction ? (
        <Box key={product.uid} className={`cartAction ${animationClass}`}>
            {inCartContent}
        </Box>
    ) : null;

    return (
        <Fragment key={product.uid}>
            <div className={isItemOutOfStock ? 'cartActionParentOOS' : isItemInCart ? 'cartActionParent' : 'cartActionParentDefault'}>
                {!isItemOutOfStock ? (
                    <>
                        {defaultContent}
                        {/* {currentQtyContent} */}
                        {/* {inCartProdContent} */}
                    </>
                ) : (
                    <Chip key={product.uid} className="oos-label" label={<FormattedMessage id="addToCartButton.itemOutOfStock" defaultMessage="Out of stock" />} />
                )}
            </div>
        </Fragment>
    );
};

export default AddToCart;
