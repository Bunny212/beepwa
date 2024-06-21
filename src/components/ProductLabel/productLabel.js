import React, { Fragment } from "react";
import './productLabel.css';
import Typography from '@mui/material/Typography';

const ProductLabel = ({ item }) => {

    const percentOff = item.price_range.maximum_price.discount.percent_off;
    const isDiscountGreaterThanZero = percentOff > 0;
    const formattedDiscount = '-' + Math.ceil(percentOff) + '%';

    return (
        <Fragment>
            {item.label && (
                <Typography variant="caption" className="prodLabel">
                    {item.label}
                </Typography>
            )}
            {isDiscountGreaterThanZero > 0 && (
                <Typography variant="caption" className="prodSaleLabel">
                    {formattedDiscount}
                </Typography>
            )}
        </Fragment>
    );
};

export default ProductLabel;
