import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { GetUserDataEvent } from './getUserDataEvent';

export const sendSearchEvent = (gtmSearchData) => {
    if (window.dataLayer && gtmSearchData) {
        //window.dataLayer = [];
        window.dataLayer.push({
            event: 'search',
            search_term: gtmSearchData && gtmSearchData.search_term ? gtmSearchData.search_term : "",
            country: gtmSearchData && gtmSearchData.country ? gtmSearchData.country : ""
        });
        console.log("dataLayer Search = ", dataLayer);
    }
};

export const sendPurchaseEvent = (gtmPurchaseData) => {
    if (window.dataLayer && gtmPurchaseData) {
        //window.dataLayer = [];
        window.dataLayer.push({
            event: 'purchase',
            ecommerce: {
                transaction_id: gtmPurchaseData && gtmPurchaseData.transaction_id ? gtmPurchaseData.transaction_id : "",
                coupon: gtmPurchaseData && gtmPurchaseData.coupon ? gtmPurchaseData.coupon : "",
                discount: gtmPurchaseData && gtmPurchaseData.discount ? gtmPurchaseData.discount : "",
                shipping: gtmPurchaseData && gtmPurchaseData.shipping ? gtmPurchaseData.shipping : "",
                tax: gtmPurchaseData && gtmPurchaseData.tax ? gtmPurchaseData.tax : "",
                currency: gtmPurchaseData && gtmPurchaseData.currency ? gtmPurchaseData.currency : "",
                value: gtmPurchaseData && gtmPurchaseData.value ? gtmPurchaseData.value : "",
                country: gtmPurchaseData && gtmPurchaseData.country ? gtmPurchaseData.country : "",
                items: gtmPurchaseData && gtmPurchaseData.items ? gtmPurchaseData.items : "",
            }
        });
        console.log("dataLayer purchase = ", dataLayer);
    }
};

export const sendBeginCheckoutEvent = (gtmBeginCheckoutData) => {
    if (window.dataLayer && gtmBeginCheckoutData) {
        //window.dataLayer = [];
        //window.dataLayer = dataLayer.filter(item => !item.ecommerce);
        window.dataLayer.push({
            event: 'begin_checkout',
            ecommerce: {
                currency: gtmBeginCheckoutData && gtmBeginCheckoutData.currency ? gtmBeginCheckoutData.currency : "",
                value: gtmBeginCheckoutData && gtmBeginCheckoutData.value ? gtmBeginCheckoutData.value : "",
                country: gtmBeginCheckoutData && gtmBeginCheckoutData.country ? gtmBeginCheckoutData.country : "",
                items: gtmBeginCheckoutData && gtmBeginCheckoutData.items ? gtmBeginCheckoutData.items : "",
            }
        });
        console.log("dataLayer begin_checkout = ", dataLayer);
    }
};

export const sendViewCartItemsEvent = (gtmViewCartItemsData) => {
    if (window.dataLayer && gtmViewCartItemsData) {
        //window.dataLayer = [];
        //window.dataLayer = dataLayer.filter(item => !item.ecommerce);
        window.dataLayer.push({
            event: 'view_cart',
            ecommerce: {
                currency: gtmViewCartItemsData && gtmViewCartItemsData.currency ? gtmViewCartItemsData.currency : "",
                value: gtmViewCartItemsData && gtmViewCartItemsData.value ? gtmViewCartItemsData.value : "",
                country: gtmViewCartItemsData && gtmViewCartItemsData.country ? gtmViewCartItemsData.country : "",
                items: gtmViewCartItemsData && gtmViewCartItemsData.items ? gtmViewCartItemsData.items : "",
            }
        });
        console.log("dataLayer view_cart = ", dataLayer);
    }
};

export const sendRemoveFromCartEvent = (gtmRemoveFromCartData) => {
    if (window.dataLayer && gtmRemoveFromCartData) {
        //window.dataLayer = [];
        window.dataLayer.push({
            event: 'remove_from_cart',
            ecommerce: {
                currency: gtmRemoveFromCartData && gtmRemoveFromCartData.currency ? gtmRemoveFromCartData.currency : "",
                value: gtmRemoveFromCartData && gtmRemoveFromCartData.value ? gtmRemoveFromCartData.value : "",
                country: gtmRemoveFromCartData && gtmRemoveFromCartData.country ? gtmRemoveFromCartData.country : "",
                items: gtmRemoveFromCartData && gtmRemoveFromCartData.items ? gtmRemoveFromCartData.items : "",
            }
        });
        console.log("dataLayer remove_from_cart = ", dataLayer);
    }
};

export const sendAddToCartEvent = (gtmAddToCartData) => {
    if (window.dataLayer && gtmAddToCartData) {
        //window.dataLayer = [];
        window.dataLayer.push({
            event: 'add_to_cart',
            ecommerce: {
                currency: gtmAddToCartData && gtmAddToCartData.currency ? gtmAddToCartData.currency : "",
                value: gtmAddToCartData && gtmAddToCartData.value ? gtmAddToCartData.value : "",
                country: gtmAddToCartData && gtmAddToCartData.country ? gtmAddToCartData.country : "",
                items: gtmAddToCartData && gtmAddToCartData.items ? gtmAddToCartData.items : "",
            }
        });
        console.log("dataLayer add_to_cart = ", dataLayer);
    }
};

export const sendViewItemEvent = (gtmItemListData) => {
    if (window.dataLayer && gtmItemListData) {
        //window.dataLayer = [];
        window.dataLayer.push({
            event: 'view_item',
            ecommerce: {
                currency: gtmItemListData && gtmItemListData.currency ? gtmItemListData.currency : "",
                value: gtmItemListData && gtmItemListData.value ? gtmItemListData.value : "",
                country: gtmItemListData && gtmItemListData.country ? gtmItemListData.country : "",
                items: gtmItemListData && gtmItemListData.items ? gtmItemListData.items : "",
            }
        });
        console.log("dataLayer view_item = ", dataLayer);
    }
};

export const sendViewItemListEvent = (gtmItemListData) => {
    if (window.dataLayer && gtmItemListData) {
        //window.dataLayer = [];
        window.dataLayer.push({
            event: 'view_item_list',
            ecommerce: {
                currency: gtmItemListData && gtmItemListData.currency ? gtmItemListData.currency : "",
                item_list_id: gtmItemListData && gtmItemListData.item_list_id ? gtmItemListData.item_list_id : "",
                item_list_name: gtmItemListData && gtmItemListData.item_list_name ? gtmItemListData.item_list_name : "",
                country: gtmItemListData && gtmItemListData.country ? gtmItemListData.country : "",
                items: gtmItemListData && gtmItemListData.items ? gtmItemListData.items : "",
            }
        });
        console.log("dataLayer view_item_list = ", dataLayer);
    }
};

export const sendLoginEvent = (gtmUserData) => {
    if (window.dataLayer && gtmUserData) {
        //window.dataLayer = [];
        window.dataLayer.push({
            event: 'login',
            customer: {
                id: gtmUserData && gtmUserData.id ? gtmUserData.id : "",
                first_name: gtmUserData && gtmUserData.firstname ? gtmUserData.firstname : "",
                last_name: gtmUserData && gtmUserData.lastname ? gtmUserData.lastname : "",
                full_name: gtmUserData && gtmUserData.firstname ? (gtmUserData.firstname + gtmUserData.lastname) : "",
                email: gtmUserData && gtmUserData.email ? gtmUserData.email : "",
                phone: gtmUserData && gtmUserData.phone ? gtmUserData.phone : "",
                address: {
                    address_summary: gtmUserData && gtmUserData.address ? gtmUserData.address.address_summary : "",
                    address1: gtmUserData && gtmUserData.address ? gtmUserData.address.address1 : "",
                    city: gtmUserData && gtmUserData.address ? gtmUserData.address.city : "",
                    zip_code: gtmUserData && gtmUserData.address ? gtmUserData.address.zipcode : "",
                    country: gtmUserData && gtmUserData.address ? gtmUserData.address.country : "",
                    country_code: gtmUserData && gtmUserData.address ? gtmUserData.address.country_id : "",
                    region: gtmUserData && gtmUserData.address ? gtmUserData.address.region : ""
                },
                hash_email: gtmUserData && gtmUserData.hash_email ? gtmUserData.hash_email : "",
                hash_phone: gtmUserData && gtmUserData.hash_phone ? gtmUserData.hash_phone : "",
                country: gtmUserData && gtmUserData.country ? gtmUserData.country : "",
            }
        });
        console.log("dataLayer Login = ", dataLayer);
    }
};

export const sendSignUpEvent = (gtmUserData) => {
    if (window.dataLayer && gtmUserData) {
        //window.dataLayer = [];
        window.dataLayer.push({
            event: 'sign_up',
            customer: {
                id: gtmUserData && gtmUserData.id ? gtmUserData.id : "",
                first_name: gtmUserData && gtmUserData.firstname ? gtmUserData.firstname : "",
                last_name: gtmUserData && gtmUserData.lastname ? gtmUserData.lastname : "",
                full_name: gtmUserData && gtmUserData.firstname ? (gtmUserData.firstname + gtmUserData.lastname) : "",
                email: gtmUserData && gtmUserData.email ? gtmUserData.email : "",
                phone: gtmUserData && gtmUserData.phone ? gtmUserData.phone : "",
                address: {
                    address_summary: gtmUserData && gtmUserData.address ? gtmUserData.address.address_summary : "",
                    address1: gtmUserData && gtmUserData.address ? gtmUserData.address.address1 : "",
                    city: gtmUserData && gtmUserData.address ? gtmUserData.address.city : "",
                    zip_code: gtmUserData && gtmUserData.address ? gtmUserData.address.zipcode : "",
                    country: gtmUserData && gtmUserData.address ? gtmUserData.address.country : "",
                    country_code: gtmUserData && gtmUserData.address ? gtmUserData.address.country_id : "",
                    region: gtmUserData && gtmUserData.address ? gtmUserData.address.region : ""
                },
                hash_email: gtmUserData && gtmUserData.hash_email ? gtmUserData.hash_email : "",
                hash_phone: gtmUserData && gtmUserData.hash_phone ? gtmUserData.hash_phone : "",
                country: gtmUserData && gtmUserData.country ? gtmUserData.country : "",
            }
        });
        console.log("dataLayer Sign Up = ", dataLayer);
    }
};

const GTMEvents = () => {
    const location = useLocation();
    const { loading, error, gtmUserData } = GetUserDataEvent();  
    useEffect(() => {
        // Function to push dataLayer event
        const sendUserDataEvent = () => {
            if (window.dataLayer) {
                //window.dataLayer = [];
                window.dataLayer = dataLayer.filter(item => !item.customer);
                window.dataLayer.push({
                    customer: {
                        id: gtmUserData && gtmUserData.id ? gtmUserData.id : "",
                        first_name: gtmUserData && gtmUserData.firstname ? gtmUserData.firstname : "",
                        last_name: gtmUserData && gtmUserData.lastname ? gtmUserData.lastname : "",
                        full_name: gtmUserData && gtmUserData.firstname ? (gtmUserData.firstname + gtmUserData.lastname) : "",
                        email: gtmUserData && gtmUserData.email ? gtmUserData.email : "",
                        phone: gtmUserData && gtmUserData.phone ? gtmUserData.phone : "",
                        address: {
                            address_summary: gtmUserData && gtmUserData.address ? gtmUserData.address.address_summary : "",
                            address1: gtmUserData && gtmUserData.address ? gtmUserData.address.address1 : "",
                            city: gtmUserData && gtmUserData.address ? gtmUserData.address.city : "",
                            zip_code: gtmUserData && gtmUserData.address ? gtmUserData.address.zipcode : "",
                            country: gtmUserData && gtmUserData.address ? gtmUserData.address.country : "",
                            country_code: gtmUserData && gtmUserData.address ? gtmUserData.address.country_id : "",
                            region: gtmUserData && gtmUserData.address ? gtmUserData.address.region : ""
                        },
                        hash_email: gtmUserData && gtmUserData.hash_email ? gtmUserData.hash_email : "",
                        hash_phone: gtmUserData && gtmUserData.hash_phone ? gtmUserData.hash_phone : ""
                    }
                });
                console.log("dataLayer = ", window.dataLayer);                                                      
            }
        };
        sendUserDataEvent();
    }, [loading, gtmUserData]);

  return null;
};

export default GTMEvents;
