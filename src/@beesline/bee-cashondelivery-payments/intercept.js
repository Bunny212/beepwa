module.exports = targets => {
    const { specialFeatures } = targets.of('@magento/pwa-buildpack');
    specialFeatures.tap(flags => {
        /**
         *  Wee need to activate esModules, cssModules and GQL Queries to allow build pack to load our extension
         * {@link https://magento.github.io/pwa-studio/pwa-buildpack/reference/configure-webpack/#special-flags}.
         */
        flags[targets.name] = {
            esModules: true,
            cssModules: true,
            graphqlQueries: true
        };
    });

    const {
        checkoutPagePaymentTypes,
        editablePaymentTypes,
        summaryPagePaymentTypes
    } = targets.of('@magento/venia-ui');
    checkoutPagePaymentTypes.tap(payments =>
        payments.add({
            paymentCode: 'cashondelivery',
            importPath:
                '@beesline/bee-cashondelivery-payments/src/components/cashondelivery.js'
        })
    );
    editablePaymentTypes.tap(editablePaymentTypes => {
        editablePaymentTypes.add({
            paymentCode: 'cashondelivery',
            importPath:
                '@beesline/bee-cashondelivery-payments/src/components/edit.js'
        });
    });
    // summaryPagePaymentTypes.tap(paymentSummaries =>
    //     paymentSummaries.add({
    //         paymentCode: 'cashondelivery',
    //         importPath:
    //             '@beesline/bee-cashondelivery-payments/src/components/summary.js'
    //     })
    // );
};
