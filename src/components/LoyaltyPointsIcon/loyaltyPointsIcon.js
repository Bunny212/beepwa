import React from 'react';
import { node, shape, string } from 'prop-types';
import { MessageSquare as MessageSquare } from 'react-feather';
import { useIntl } from 'react-intl';

import Icon from '@magento/venia-ui/lib/components/Icon';
import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from './loyaltyPointsIcon.module.css';

/**
 * A component that show info icon.
 */
const LoyaltyNavigationTrigger = props => {
    const { formatMessage } = useIntl();

    const classes = useStyle(defaultClasses, props.classes);
    return (
        <button
            className={classes.root}
            data-cy="Header-LoyaltyNavigationTrigger-root"
            aria-label={formatMessage({
                id: 'loyaltyNavigationTrigger.ariaLabel',
                defaultMessage: '400pts'
            })}
        >
            <span><strong>400</strong>pts</span>
        </button>
    );
};

LoyaltyNavigationTrigger.propTypes = {
    children: node,
    classes: shape({
        root: string
    })
};

export default LoyaltyNavigationTrigger;
