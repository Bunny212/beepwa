import React, { useMemo } from 'react';
import { shape, string, number, arrayOf } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { useOrderHistoryContext } from '@magento/peregrine/lib/talons/OrderHistoryPage/orderHistoryContext';

import { useStyle } from '@magento/venia-ui/lib/classify';
import Button from '@magento/venia-ui/lib/components/Button';
import ProductOptions from '@magento/venia-ui/lib/components/LegacyMiniCart/productOptions';
import Image from '@magento/venia-ui/lib/components/Image';
import Price from '@magento/venia-ui/lib/components/Price';
import PlaceholderImage from '@magento/venia-ui/lib/components/Image/placeholderImage';

const ItemTitle = props => {
    const {
        product_name,
        product_sale_price,
        product_url_key,
        quantity_ordered,
        selected_options,
        thumbnail
    } = props;
    const { currency, value: unitPrice } = product_sale_price;

    // const orderHistoryState = useOrderHistoryContext();
    // const { productURLSuffix } = orderHistoryState;
    // const itemLink = `${product_url_key}${productURLSuffix}`;
    const mappedOptions = useMemo(
        () =>
            selected_options.map(option => ({
                option_label: option.label,
                value_label: option.value
            })),
        [selected_options]
    );
    const classes = props.classes;

    const thumbnailProps = {
        alt: product_name,
        classes: { root: classes.thumbnail },
        width: 50
    };
    const thumbnailElement = thumbnail ? (
        <Image {...thumbnailProps} resource={thumbnail.url} />
    ) : (
        <PlaceholderImage {...thumbnailProps} />
    );

    return (
        <span className={classes.orderHistoryProductName}>{quantity_ordered}x {product_name}</span>
    );
};

export default ItemTitle;

ItemTitle.propTypes = {
    classes: shape({
        root: string,
        thumbnailContainer: string,
        thumbnail: string,
        name: string,
        options: string,
        quantity: string,
        price: string,
        buyAgainButton: string
    }),
    product_name: string.isRequired,
    product_sale_price: shape({
        currency: string,
        value: number
    }).isRequired,
    product_url_key: string.isRequired,
    quantity_ordered: number.isRequired,
    selected_options: arrayOf(
        shape({
            label: string,
            value: string
        })
    ).isRequired,
    thumbnail: shape({
        url: string
    })
};
