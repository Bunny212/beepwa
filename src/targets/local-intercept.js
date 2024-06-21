const moduleOverridePlugin = require('./moduleOverrideWebpackPlugin');
const componentOverrideMapping = require('./componentOverrideMapping');

module.exports = (targets) => {

  targets.of('@magento/pwa-buildpack').webpackCompiler.tap(compiler => {
    new moduleOverridePlugin(componentOverrideMapping).apply(compiler);
  });

  targets.of("@magento/venia-ui").routes.tap((routes) => {
    routes.push({
      name: "HomePage",
      pattern: "/",
      exact: true,
      path: require.resolve("../components/HomePage/homePage.js"),
    });
    routes.push({
      name: "SearchPage",
      pattern: "/search/",
      path: require.resolve("../components/SearchPage/searchPage.js"),
    });
    routes.push({
      name: "CartPage",
      pattern: "/cart",
      exact: true,
      path: require.resolve("../components/CartPage/cartPage.js"),
    });
    routes.push({
      name: "AmastyCheckoutPage",
      pattern: "/checkout",
      exact: true,
      path: require.resolve("../components/CheckoutPage/checkoutPage.js"),
    });
    routes.push({
      name: "OrderSummaryPage",
      pattern: "/order-summary",
      exact: true,
      path: require.resolve("../components/OrderSummaryPage/orderSummaryPage.js"),
    });
    routes.push({
      name: "SignInPage",
      pattern: "/sign-in",
      exact: true,
      path: require.resolve("../components/LoginRegisterLanding/loginRegisterLanding.js"),
    });
    routes.push({
      name: "CreateAccountPage",
      pattern: "/bee-create-account",
      exact: true,
      path: require.resolve("../components/BeeCreateAccount/beeCreateAccount.js"),
    });
    routes.push({
      name: "SignInAccountPage",
      pattern: "/bee-signin-account",
      exact: true,
      path: require.resolve("../components/BeeSignInAccount/beeSignInAccount.js"),
    });
    routes.push({
      name: "GoogleMaps",
      pattern: "/googlemaps",
      path: require.resolve("../components/GoogleMaps/googleMaps.js"),
    });
    routes.push({
      name: "AccountInformationPage",
      pattern: "/account-information",
      exact: true,
      //path: "../AccountInformationPage",
      authed: true,
      redirectTo: "/sign-in",
      path: require.resolve("../components/AccountInformationPage/accountInformationPage.js"),
    });
    routes.push({
      name: "OrderHistory",
      pattern: "/order-history",
      exact: true,
      //path: "../OrderHistoryPage",
      authed: true,
      redirectTo: "/sign-in",
      path: require.resolve("../components/OrderHistoryPage/orderHistoryPage.js"),
    });
    routes.push({
      name: "OrderStatusPage",
      pattern: "/order-status",
      exact: true,
      //path: "../OrderStatusPage",
      authed: true,
      redirectTo: "/sign-in",
      path: require.resolve("../components/OrderHistoryPage/OrderStatusPage/orderStatusPage.js"),
    });
    routes.push({
      name: "ProfilePage",
      pattern: "/profile",
      exact: true,
      //path: "../ProfilePage",
      authed: true,
      redirectTo: "/sign-in",
      path: require.resolve("../components/ProfilePage/profilePage.js"),
    });
    routes.push({
      name: "OrderTrackPage",
      pattern: "/track-order",
      exact: true,
      //path: "../OrderTrackPage",
      //authed: true,
      //redirectTo: "/sign-in",
      path: require.resolve("../components/OrderTrackPage/orderTrackPage.js"),
    });
    routes.push({
      name: "OrderStatusPage",
      pattern: "/track-order/order-status",
      exact: true,
      //path: "../OrderTrackPage/OrderStatusPage",
      //authed: true,
      //redirectTo: "/sign-in",
      path: require.resolve("../components/OrderTrackPage/OrderStatusPage/orderStatusPage.js"),
    });
    routes.push({
      name: "AddressBookPage",
      pattern: "/address-book",
      exact: true,
      //path: "../AddressBookPage",
      authed: true,
      redirectTo: "/sign-in",
      path: require.resolve("../components/AddressBookPage/addressBookPage.js"),
    });
    routes.push({
      name: "FaqPage",
      pattern: "/faq",
      path: require.resolve("../components/FaqPage/faqPage.js"),
    });
    routes.push({
      name: "FaqCategoryPage",
      pattern: "/faq/:category",
      path: require.resolve("../components/FaqPage/FaqCategoryPage/faqCategoryPage.js"),
    });
    routes.push({
      name: "FaqArticlePage",
      pattern: "/faq/:category/:article",
      path: require.resolve("../components/FaqPage/FaqArticlePage/faqArticlePage.js"),
    });
    routes.push({
      name: "GuestFormPage",
      pattern: "/guest-form",
      path: require.resolve("../components/GuestFormPage/guestFormPage.js"),
    });
    routes.push({
      name: "UserFormPage",
      pattern: "/user-form",
      path: require.resolve("../components/UserFormPage/userFormPage.js"),
    });
    routes.push({
      name: "GetSupportPage",
      pattern: "/get-support",
      exact: true,
      // authed: true,
      // redirectTo: "/sign-in",
      path: require.resolve("../components/GetSupportPage/getSupportPage.js"),
    });
    routes.push({
      name: "GetSupportCategoryPage",
      pattern: "/get-support/:category",
      exact: true,
      // authed: true,
      // redirectTo: "/sign-in",
      path: require.resolve("../components/GetSupportPage/GetSupportCategoryPage/getSupportCategoryPage.js"),
    });
    routes.push({
      name: "GetSupportArticlePage",
      pattern: "/get-support/:category/:article",
      exact: true,
      // authed: true,
      // redirectTo: "/sign-in",
      path: require.resolve("../components/GetSupportPage/GetSupportArticlePage/getSupportArticlePage.js"),
    });
    routes.push({
      name: "GuestCheckoutInfoPage",
      pattern: "/guest-checkout-info",
      path: require.resolve("../components/GuestCheckoutInfoPage/guestCheckoutInfoPage.js"),
    });
    routes.push({
      name: "HelpPage",
      pattern: "/help",
      path: require.resolve("../components/HelpPage/helpPage.js"),
    });
    routes.push({
      name: "NotificationsPage",
      pattern: "/notifications",
      path: require.resolve("../components/NotificationsPage/notificationsPage.js"),
    });
    routes.push({
      name: 'CategoryLandingPage',
      pattern: '/product-categories',
      path: require.resolve("../components/LandingPage/landing.js"),
    });
    routes.push({
      name: 'AllCategoriesPage',
      pattern: '/all-categories/:uid/:all',
      path: require.resolve("../components/LandingPage/Allcategories/allcategories.js"),
    });
    routes.push({
      name: 'CategoryInnerPage',
      pattern: '/category-details/:uid',
      path: require.resolve("../components/LandingPage/Categoryinner/categoryinner.js"),
    });
    routes.push({
      name: 'ExpandedPage',
      pattern: '/expand/:categorypath+/:uid',
      path: require.resolve("../components/LandingPage/Expanded/expanded.js"),
    });
    routes.push({
      name: 'Top10Page',
      pattern: '/categories/top10',
      path: require.resolve("../components/LandingPage/Top10/top10.js"),
    });
    routes.push({
      name: 'SeasonPage',
      pattern: '/categories/season/',
      path: require.resolve("../components/LandingPage/Season/season.js"),
    });
    routes.push({
      name: 'SubmitRequest',
      pattern: '/submit-request/',
      path: require.resolve("../components/SubmitRequest/submitRequest.js"),
    });
    return routes;
  });
};
