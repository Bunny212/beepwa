// import { ContactLink } from '../ContactPage';

const accountLinks = new Map()
    .set('Account', null)
    .set('Sign In', '/sign-in')
    .set('Register', '/bee-create-account')

const aboutLinks = new Map()
    .set('Infomation', null)
    .set('Our Story', '/about-us')
    .set('Terms & Conditions', '/service-terms')
    .set('Returns & Exchanges', '/returns')
    .set('Privacy Policy', '/privacy-policy');

const helpLinks = new Map()
    .set('Help', null)
    .set('Contact Us', '/contacts')
    .set('Order Status', '/track-order');

export const DEFAULT_LINKS = new Map()
    .set('account', accountLinks)
    .set('about', aboutLinks)
    .set('help', helpLinks);

export const ABOUT_BEE_FOOTER =
    "We're available in stores across the Middle East, find one near you.";
