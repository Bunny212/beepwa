import React, { useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { PlusSquare } from 'react-feather';
import { useHistory, useLocation } from "react-router-dom";
import { useAddressBookPage } from './talons/AddressBookPage/useAddressBookPage';
import { useStyle } from '@magento/venia-ui/lib/classify';
import { StoreTitle } from '@magento/venia-ui/lib/components/Head';
import Icon from '@magento/venia-ui/lib/components/Icon';
import LinkButton from '@magento/venia-ui/lib/components/LinkButton';
import { fullPageLoadingIndicator } from '@magento/venia-ui/lib/components/LoadingIndicator';

import AddressCard from './addressCard';
import AddEditDialog from './addEditDialog';
import defaultClasses from './addressBookPage.module.css';
import Paper from '@mui/material/Paper';

const AddressBookPage = props => {
    const talonProps = useAddressBookPage();
    const {
        confirmDeleteAddressId,
        countryDisplayNameMap,
        customerAddresses,
        formErrors,
        formProps,
        handleAddAddress,
        handleCancelDeleteAddress,
        handleCancelDialog,
        handleConfirmDeleteAddress,
        handleConfirmDialog,
        handleDeleteAddress,
        handleEditAddress,
        isDeletingCustomerAddress,
        isDialogBusy,
        isDialogEditMode,
        isDialogOpen,
        isLoading
    } = talonProps;

    const { formatMessage } = useIntl();
    const classes = useStyle(defaultClasses, props.classes);
    const history = useHistory();
    const PAGE_TITLE = formatMessage({
        id: 'addressBookPage.addressBookText',
        defaultMessage: 'Address Book'
    });

    const handleAddCustomerAddress = () => {
        const targetPagePath = "/guest-form";
        const stateParams = {
            headerTitle: formatMessage({
                id: 'enterLocation',
                defaultMessage: 'Enter Location'
            }),
            isGuestCheckout: false,
            amAllowGuestCheckout: '',
            isUpdate: false,
            fromAddressBook: true,
            shippingData: '',
            addressBookCount: customerAddresses.length
        };
        // Redirect the user to the target page with state parameters
        history.push(targetPagePath, stateParams);
    }

    const addressBookElements = useMemo(() => {
        const defaultToBeginning = (address1, address2) => {
            if (address1.default_shipping) return -1;
            if (address2.default_shipping) return 1;
            return 0;
        };

        return Array.from(customerAddresses)
            .sort(defaultToBeginning)
            .map(addressEntry => {
                const countryName = countryDisplayNameMap.get(
                    addressEntry.country_code
                );

                const boundEdit = () => handleEditAddress(addressEntry);
                const boundDelete = () => handleDeleteAddress(addressEntry.id);
                const isConfirmingDelete =
                    confirmDeleteAddressId === addressEntry.id;

                return (
                    <AddressCard
                        address={addressEntry}
                        countryName={countryName}
                        isConfirmingDelete={isConfirmingDelete}
                        isDeletingCustomerAddress={isDeletingCustomerAddress}
                        key={addressEntry.id}
                        onCancelDelete={handleCancelDeleteAddress}
                        onConfirmDelete={handleConfirmDeleteAddress}
                        onDelete={boundDelete}
                        onEdit={boundEdit}
                        addressBookCount={customerAddresses.length}
                    />
                );
            });
    }, [
        confirmDeleteAddressId,
        countryDisplayNameMap,
        customerAddresses,
        handleCancelDeleteAddress,
        handleConfirmDeleteAddress,
        handleDeleteAddress,
        handleEditAddress,
        isDeletingCustomerAddress
    ]);

    if (isLoading) {
        return fullPageLoadingIndicator;
    }

    return (
        <div className={classes.root}>
            <StoreTitle>{PAGE_TITLE}</StoreTitle>
            <div className={classes.content} data-cy="AddressBookPage-content">
                <h1
                    aria-live="polite"
                    className={classes.heading}
                    data-cy="AddressBookPage-heading"
                >
                    <FormattedMessage id="deliveryLocation" defaultMessage="Where should we deliver" />
                </h1>
                {addressBookElements}
            </div>
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: "transparent", zIndex: "999", padding: '1rem' }} elevation={0}>
                <LinkButton
                    className={classes.addButton}
                    key="addAddressButton"
                    onClick={handleAddCustomerAddress}
                    data-cy="AddressBookPage-addButton"
                >
                    <span className={classes.addText}>
                        <FormattedMessage id="addNewAddress" defaultMessage="Add New Address" />
                    </span>
                </LinkButton>
            </Paper>
            <AddEditDialog
                formErrors={formErrors}
                formProps={formProps}
                isBusy={isDialogBusy}
                isEditMode={isDialogEditMode}
                isOpen={isDialogOpen}
                onCancel={handleCancelDialog}
                onConfirm={handleConfirmDialog}
            />
        </div>
    );
};

export default AddressBookPage;
