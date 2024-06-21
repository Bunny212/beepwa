import React from 'react';

import defaultClasses from './indicator.module.css';
import { useStyle } from '@magento/venia-ui/lib/classify';
import loadingBeeGif from '../Images/loading_bee.gif';

const LoadingIndicator = props => {
    const classes = useStyle(defaultClasses, props.classes);
    const className = props.global ? classes.global : classes.root;
    return (
        <div className={className}>
            <img
                alt="Beesline"
                className={classes.imageLoader}
                src={loadingBeeGif}
                type="image-product"
                style={{ width: '64px', height: 'auto' }}
            />
        </div>
    );
};

export default LoadingIndicator;
