import React, { Suspense, Fragment } from 'react';
import { shape, string } from 'prop-types';
import { useAddressBook } from '../../../@amasty/one-step-checkout/src/talons/ShippingInformation/useAddressBook';
import GridView from './gridView';
import DropDownView from '../../../@amasty/one-step-checkout/src/components/ShippingInformation/AddressBook/dropDownView';
import GuestForm from '../guestForm';
import LoadingIndicator from '@magento/venia-ui/lib/components/LoadingIndicator';
import { FormattedMessage } from 'react-intl';
import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from './addressBook.css';

const EditModal = React.lazy(() => import('../editModal'));

const AddressBook = props => {
    const talonProps = useAddressBook();

    const {
        activeAddress,
        customerAddresses,
        handleSuccess,
        isDropDownView,
        isLoading
    } = talonProps;

    const classes = useStyle(defaultClasses, props.classes);

    if (isLoading) {
        return (
            <LoadingIndicator>
                <div className={classes.loadingText}>
                    <FormattedMessage
                        id={'amOsc.loadingCustomerAdresses'}
                        defaultMessage={'Fetching Customer Adresses...'}
                    />
                </div>
            </LoadingIndicator>
        );
    }

    // if (!customerAddresses.length && !isLoading) {
    //     return <GridView {...talonProps} />
    // }

    if (!customerAddresses.length && !isLoading) {
        return <GuestForm {...props} />;
    }

    const content = isDropDownView ? (
        <DropDownView {...talonProps} />
    ) : (
        <GridView {...talonProps} />
    );

    return (
        <Fragment>
            {content}
            <Suspense fallback={null}>
                <EditModal
                    onSuccess={handleSuccess}
                    shippingData={activeAddress}
                />
            </Suspense>
        </Fragment>
    );
};

AddressBook.propTypes = {
    classes: shape({
        root: string
    })
};

export default AddressBook;
