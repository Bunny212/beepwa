import React, { Fragment, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { Minus as MinusIcon, Plus as PlusIcon } from 'react-feather';
import { useFieldApi } from 'informed';
import { useQuantityStepper } from './talons/useQuantityStepper';
import useFieldState from '@magento/peregrine/lib/hooks/hook-wrappers/useInformedFieldStateWrapper';
import { useStyle } from '@magento/venia-ui/lib/classify';
import Icon from '@magento/venia-ui/lib/components/Icon';
import TextInput from '@magento/venia-ui/lib/components/TextInput';
import { Message } from '@magento/venia-ui/lib/components/Field';
import defaultClasses from './quantityStepperInner.module.css';
import CustomIcon from '../CustomIcons/CustomIcons';

const QuantityStepperInner = props => {
    const { initialValue, itemId, label, min, onChange, message, setCurrentQty, isItemInCart, itemQty, removeItemFromCart } = props;
    const { formatMessage } = useIntl();
    const classes = useStyle(defaultClasses, props.classes);
    const iconClasses = { root: classes.icon };

    const { value: quantity } = useFieldState('quantity');
    const talonProps = useQuantityStepper({
        initialValue,
        min,
        onChange,
        isItemInCart,
        itemQty
    });

    useEffect(() => {
        setCurrentQty(quantity);
    }, [quantity, isItemInCart]);

    const {
        isDecrementDisabled,
        isIncrementDisabled,
        handleBlur,
        handleDecrement,
        handleIncrement,
        maskInput
    } = talonProps;

    const errorMessage = message ? <Message>{message}</Message> : null;
    console.log("item qty ==>>> ", itemQty);
    console.log("qty qty ==>>> ", quantity);
    console.log("isItemInCart ==>>> ", isItemInCart);
    return (
        <Fragment>
            <div className={classes.root}>
                <label className={classes.label} htmlFor={itemId}>
                    {label}
                </label>
                {quantity >= 1 && !isItemInCart ? (
                    <button
                        aria-label={formatMessage({
                            id: 'quantity.buttonDecrement',
                            defaultMessage: 'Decrease Quantity'
                        })}
                        className={classes.button_decrement}
                        // disabled={isDecrementDisabled}
                        onClick={handleDecrement}
                        type="button"
                        data-cy="Quantity-decrementButton"
                    >
                        <Icon classes={classes.icon} src={MinusIcon} size={22} />
                    </button>
                ) : quantity === 1 && isItemInCart ? (
                    <button
                        aria-label={formatMessage({
                            id: 'quantity.buttonDecrement',
                            defaultMessage: 'Decrease Quantity'
                        })}
                        className={classes.button_decrement}
                        // disabled={isDecrementDisabled}
                        onClick={removeItemFromCart}
                        type="button"
                        data-cy="Quantity-decrementButton"
                    >
                        <CustomIcon className="trashIcon" name="trash" fontSize="15px" height="16px" color="#000" selectedColor="#000" selected={true} />
                    </button>
                ) : quantity > 1 && isItemInCart ? (
                        <button
                            aria-label={formatMessage({
                                id: 'quantity.buttonDecrement',
                                defaultMessage: 'Decrease Quantity'
                            })}
                            className={classes.button_decrement}
                            // disabled={isDecrementDisabled}
                            onClick={handleDecrement}
                            type="button"
                            data-cy="Quantity-decrementButton"
                        >
                            <Icon classes={classes.icon} src={MinusIcon} size={22} />
                        </button>
                ) : null}
                <TextInput
                    aria-label={formatMessage({
                        id: 'quantity.input',
                        defaultMessage: 'Item Quantity'
                    })}
                    data-cy="QuantityStepper-input"
                    classes={{ input: classes.input }}
                    field="quantity"
                    id={itemId}
                    inputMode="numeric"
                    mask={maskInput}
                    min={min}
                    onBlur={handleBlur}
                    pattern="[0-9]*"
                />
                <button
                    aria-label={formatMessage({
                        id: 'quantity.buttonIncrement',
                        defaultMessage: 'Increase Quantity'
                    })}
                    className={classes.button_increment}
                    disabled={isIncrementDisabled}
                    onClick={handleIncrement}
                    type="button"
                    data-cy="Quantity-incrementButton"
                >
                    <Icon classes={iconClasses} src={PlusIcon} size={20} />
                </button>
            </div>
            {errorMessage}
        </Fragment>
    );
};

QuantityStepperInner.defaultProps = {
    min: 0,
    initialValue: 1,
    onChange: () => {}
};

export default QuantityStepperInner;
