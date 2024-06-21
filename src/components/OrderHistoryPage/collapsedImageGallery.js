import React, { useMemo } from 'react';
import { arrayOf, object, shape, string } from 'prop-types';

import { useStyle } from '@magento/venia-ui/lib/classify';
import Image from '@magento/venia-ui/lib/components/Image';

import defaultClasses from './collapsedImageGallery.module.css';

const DISPLAY_COUNT = 4;
const IMAGE_SIZE = 43;

const CollapsedImageGallery = props => {
    const { items } = props;

    const classes = useStyle(defaultClasses, props.classes);
    const itemsLength = Object.keys(items).length;
    const remainderCount = itemsLength - DISPLAY_COUNT;
    const _remainderCount = items.length - DISPLAY_COUNT;
    const imageSize = useMemo(() => (items.length === 1 ? 150 : IMAGE_SIZE), [items]);
    const imageElements = useMemo(() => {
        if (items) {
            const baseImageElements = Object.values(items)
                .slice(0, DISPLAY_COUNT)
                .map((item, index) => {
                    const { thumbnail, name } = item;
                    const { url } = thumbnail;

                    return (
                        <Image
                            key={Object.keys(items)[index]}
                            alt={name}
                            src={url}
                            classes={{
                                root: classes.imageRoot,
                                image: itemsLength === 1 ? classes.orderSingleImage : classes.orderImage
                            }}
                            width={imageSize}
                        />
                    );
                });

            // If the order contains more than four products, render a remainder count in the last column.
            if (remainderCount === -1) {
                const remainderCountString = `+${remainderCount}`;
                baseImageElements.push(
                    <div
                        key={'remainder-column'}
                        className={classes.remainderCountEmptyImg}
                    ></div>
                );
            }

            return baseImageElements;
        }
    }, [classes.remainderCount, items, remainderCount]);

    return <div className={classes.root}>
                <div className={itemsLength === 1 ? classes.singleContainer : classes.multiContainer}>
                    {imageElements}
                </div>
            </div>;
};

export default CollapsedImageGallery;

CollapsedImageGallery.propTypes = {
    classes: shape({
        root: string,
        remainderCount: string
    }),
    items: arrayOf(object)
};
