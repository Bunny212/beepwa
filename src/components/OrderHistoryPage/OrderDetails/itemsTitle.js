import React from 'react';
import { shape, arrayOf, string, number } from 'prop-types';
import { useStyle } from '@magento/venia-ui/lib/classify';
import ItemTitle from './itemTitle';
import { FormattedMessage } from 'react-intl';

const ItemsTitle = props => {
    const classes = props.classes;
    const { items, imagesData } = props.data;

    const itemsComponent = items.map(item => (
        <ItemTitle classes={classes} key={item.id} {...item} {...imagesData[item.product_sku]} />
    ));

    return (
        <div className={classes.itemsContainer} data-cy="OrderDetails-Items-root">
            {itemsComponent}
        </div>
    );
};

export default ItemsTitle;

ItemsTitle.propTypes = {
    classes: shape({
        root: string
    }),
    data: shape({
        items: arrayOf(
            shape({
                id: string,
                product_name: string,
                product_sale_price: shape({
                    currency: string,
                    value: number
                }),
                product_sku: string,
                product_url_key: string,
                selected_options: arrayOf(
                    shape({
                        label: string,
                        value: string
                    })
                ),
                quantity_ordered: number
            })
        ),
        imagesData: arrayOf(
            shape({
                id: number,
                sku: string,
                thumbnail: shape({
                    url: string
                }),
                url_key: string,
                url_suffix: string
            })
        )
    })
};
