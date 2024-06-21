/**
 * Custom intercept file for the extension
 * By default you can only use target of @magento/pwa-buildpack.
 *
 * If do want extend @magento/peregrine or @magento/venia-ui
 * you should add them to peerDependencies to your package.json
 *
 * If you want to add overwrites for @magento/venia-ui components you can use
 * moduleOverrideWebpackPlugin and componentOverrideMapping
 */
module.exports = targets => {
    targets.of('@magento/pwa-buildpack').specialFeatures.tap(flags => {
        /**
         *  Wee need to activated esModules and cssModules to allow build pack to load our extension
         * {@link https://magento.github.io/pwa-studio/pwa-buildpack/reference/configure-webpack/#special-flags}.
         */
        flags[targets.name] = {esModules: true, cssModules: true};
    });

    targets.of('@magento/venia-ui').routes.tap(
        routesArray => {
            routesArray.push({
                name: 'CategoryLandingPage',
                pattern: '/categories',
                path: '@beesline/category-landing/src/components/Landing'
            });
            routesArray.push({
                name: 'AllCategoriesPage',
                pattern: '/categories/allcategories/:categoryId/:all',
                path: '@beesline/category-landing/src/components/Allcategories'
            });
            routesArray.push({
                name: 'CategoryInnerPage',
                pattern: '/categories/categoryinner/:name?',
                path: '@beesline/category-landing/src/components/Categoryinner'
            });
            routesArray.push({
                name: 'ExpandedPage',
                pattern: '/categories/expanded/:name?',
                path: '@beesline/category-landing/src/components/Expanded'
            });
            routesArray.push({
                name: 'Top10Page',
                pattern: '/categories/top10/',
                path: '@beesline/category-landing/src/components/Top10'
            });
            routesArray.push({
                name: 'SeasonPage',
                pattern: '/categories/season/',
                path: '@beesline/category-landing/src/components/Season'
            });
            return routesArray;
        }
    );
};
