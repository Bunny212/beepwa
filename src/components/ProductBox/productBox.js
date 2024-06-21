import React, { Fragment, useEffect } from "react";
import './productBox.css';
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AddToCart from '../AddToCart/addToCart';
import prodImage from '../Images/prod-img.jpg';
import ProductLabel from '../ProductLabel/productLabel';
import ProductPrice from '../ProductPrice/productPrice';
import LazyLoadedImage from "../LazyLoadedImage /LazyLoadedImage";
import GetDeviceType from '../GetDeviceType/getDeviceType';
import ImagePreview from '../ImagePreview/imagePreview';

const ProductBox = ({ item, ratio = "1/1" }) => {
    const { isDesktop, isMobile, isTablet } = GetDeviceType();
    const productNameClass = isDesktop ? 'produNameDesktop' : 'produName';
    let bannerImagePreview = {
        imageUrl: item.imageUrl || prodImage,
        alt: item.name,
        type: 'image-product'
    };

    return (
        <Fragment>
            <Box className="imageContainer">
                <ProductLabel item={item} />
                <Link className={productNameClass} to={{
                    pathname: item.productPath,
                    state: { dataGm: item.data_layer }
                }}>
                    <ImagePreview {...bannerImagePreview} className="image" ratio={ratio} />
                    {/* <LazyLoadedImage
                        src={item.imageUrl || prodImage}
                        alt={item.name}
                        placeholder={prodImage}
                        width="100%"
                        height="100%"
                    /> */}
                </Link>
                <AddToCart key={item.uid} product={item} />
            </Box>
            <Typography variant="button" display="block" gutterBottom>
                <Link className={productNameClass} to={{
                    pathname: item.productPath,
                    state: { dataGm: item.data_layer }
                }}>
                    {item.name}
                </Link>
            </Typography>
            <ProductPrice item={item} />
        </Fragment>
    );
};

export default ProductBox;
