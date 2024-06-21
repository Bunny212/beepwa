/* src/components/SearchPage/searchPage.js */
import React from "react";
import { useStyle } from '@magento/venia-ui/lib/classify';
import { Link, useParams } from "react-router-dom";
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';
import { useCartTrigger } from '@magento/peregrine/lib/talons/Header/useCartTrigger';
import { GET_ITEM_COUNT_QUERY } from '@magento/venia-ui/lib/components/Header/cartTrigger.gql';
import defaultClasses from './floatingCart.module.css';

const hi = {
  textAlign: "center",
  margin: "1rem",
};
const wave = {
  ...hi,
  fontSize: "5rem",
};

const FloatingCart = props => {
    const classes = useStyle(defaultClasses, props.classes);

    const {
        itemCount,
    } = useCartTrigger({
        queries: {
            getItemCountQuery: GET_ITEM_COUNT_QUERY
        }
    });

  return (
    <div className={classes.root}>
        {itemCount > 0 && (
        <Link
            aria-label="CheckoutLink"
            to={resourceUrl('/cart')}
            className={classes.cartHeader}
            data-cy="Header-cartHeader"
        >
        <div className={classes.floatingCartBox}>
            <h1 style={hi}>{itemCount} {itemCount > 1 ? 'items' : 'item'}</h1>
            <h1 style={hi}>Checkout</h1>
            <h1 style={hi}>LBP 283.000</h1>
        </div>
        </Link>
        )}
    </div>
  );
};

export default FloatingCart;
