import React, { Suspense } from 'react';
import { useStyle } from '@magento/venia-ui/lib/classify';
import { useAddressBook } from '../../../@amasty/one-step-checkout/src/talons/ShippingInformation/useAddressBook';
import Button from '@magento/venia-ui/lib/components/Button';
import CheckoutMapIcon from '../../Icons/checkout_map.svg';
import { FormattedMessage } from 'react-intl';

const EditModal = React.lazy(() => import('../editModal'));

const AddAddress = props => {
    const talonProps = useAddressBook();

    const {
        activeAddress,
        handleSuccess,
        isDropDownView,
        isLoading,
        customerAddresses,
        handleChangeAddress,
        handleAddAddress,
        handleEditAddress,
        handleSelectAddress,
        selectedAddress,
        isUpdating
    } = talonProps;

    const classes = useStyle({}, props.classes);

    const MapIcon = (
        <img src={CheckoutMapIcon} alt="Map" />
    );

    const addAddressContent = (
        <div>
            {/* <Button onClick={handleAddAddress} className={classes.fullBtn} variant="contained" size="medium" startIcon={MapIcon}>Add Address</Button> */}
            <div className={classes.btn}>
                <Button type={'button'} onClick={handleAddAddress}>
                    <FormattedMessage
                        id={'amOsc.addNewAddresstext'}
                        defaultMessage={'New Address'}
                    />
                </Button>
            </div>
            <Suspense fallback={null}>
                <EditModal
                    onSuccess={handleSuccess}
                    shippingData={activeAddress}
                />
            </Suspense>
        </div>
    );

    return (
        <div className={classes.root}>
            {addAddressContent}
        </div>
    );
};

export default AddAddress;
