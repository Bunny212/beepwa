import React from 'react';
import { node, shape, string } from 'prop-types';
// import { Info as InfoIcon } from 'react-feather';
import { Link } from 'react-router-dom';
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';
import { useIntl } from 'react-intl';

import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from './infoIcon.module.css';
import InfoIcon from '../Icons/InfoIcon.svg';

/**
 * A component that show info icon.
 */
const InfoNavigationTrigger = props => {
    const { formatMessage } = useIntl();

    const classes = useStyle(defaultClasses, props.classes);
    return (
        <Link
            className={classes.root}
            data-cy="Header-InfoNavigationTrigger-root"
            aria-label={formatMessage({
                id: 'infoNavigationTrigger.ariaLabel',
                defaultMessage: 'Info'
            })}
            to={{
                pathname: resourceUrl('/about-us'),
                state: { headerTitle: formatMessage({
                    id: 'ourStory',
                    defaultMessage: 'Our Story'
                })}
            }}
        >
            <img
                height='26px'
                src={InfoIcon}
                alt='Search'
                title='Search'
                width='21px'
            />
            {/* <Icon src={InfoIcon} /> */}
        </Link>
    );
};

InfoNavigationTrigger.propTypes = {
    children: node,
    classes: shape({
        root: string
    })
};

export default InfoNavigationTrigger;
