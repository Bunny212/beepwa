import React from 'react';

// Define an object that maps icon names to CSS classes
const iconMapping = {
    home: 'fi fi-rr-home',
    user: 'fi fi-rr-user',
    userRs: 'fi fi-rs-user',
    userCircle: 'fi fi-rr-circle-user',
    instagram: 'fi fi-brands-instagram',
    search: 'fi fi-rr-search',
    marker: 'fi fi-rr-marker',
    heart: 'fi fi-rr-heart',
    category: 'fi fi-rr-apps',
    calendar: 'fi fi-rr-calendar',
    star: 'fi fi-rr-star',
    trash: 'fi fi-rr-trash',
    plusCircle: 'fi fi-rr-add',
    minusCircle: 'fi fi-rr-minus-circle',
    arrowSmallLeft: 'fi fi-rr-arrow-small-left',
    arrowSmallRight: 'fi fi-rr-arrow-small-right',
    arrowRight: 'fi fi-rr-arrow-right',
    arrowLeft: 'fi fi-rr-arrow-left',
    angleLeft: 'fi fi-rr-angle-left',
    angleRight: 'fi fi-rr-angle-right',
    angleLeftSmall: 'fi fi-rr-angle-small-left',
    angleRightSmall: 'fi fi-rr-angle-small-right',
    questionMark: 'fi fi-rr-interrogation',
    list: 'fi fi-rr-list',
    cross: 'fi fi-rr-cross',
    crossSmall: 'fi fi-rr-cross-small',
    check: 'fi fi-rr-check',
    badgeCheck: 'fi fi-rr-menu-dots',
    exclamationMark: 'fi fi-rr-exclamation',
    menuDotsVertical: 'fi fi-rr-menu-dots-vertical',
    menuDots: 'fi fi-rr-menu-dots',
    headset: 'fi fi-rr-headset',
    plusSmall: 'fi fi-rr-plus-small',
    plus: 'fi fi-rr-plus',
    minus: 'fi fi-rr-map',
    minusSmall: 'fi fi-rr-minus-small',
    signOut: 'fi fi-rr-sign-out-alt',
    signIn: 'fi fi-rr-sign-in-alt',
    copy: 'fi fi-rr-copy',
    map: 'fi fi-rr-map',
    circle: 'fi fi-rr-circle',
    circleSmall: 'fi fi-rr-circle-small',
    qrCode: 'fi fi-rr-qrcode',
    copyright: 'fi fi-rr-copyright',
    filter: 'fi fi-rr-filters',
    hashtag: 'fi fi-rr-hastag',
    percentage: 'fi fi-rr-percentage',
    bag: 'fi fi-rr-shopping-bag',
    notification: 'fi fi-rr-bell',
    messages: 'fi fi-rr-messages'
};

// Create a custom Icon component
const Icon = ({ name, className = '', fontSize, color, selectedColor, height, selected, ...restProps }) => {
    const iconClass = iconMapping[name] || ''; // Get the corresponding CSS class

    const iconStyle = {
        fontSize: fontSize || 'inherit', // Use the specified font size or inherit from parent
        color: selected ? (selectedColor || 'inherit') : (color || 'inherit'), // Use selected color if selected, otherwise use the default color
        height: height || 'initial',
        display: height ? 'flex' : 'initial',
    };

    return (
        <i className={`${iconClass} ${className}`} style={iconStyle} {...restProps}></i>
    );
};
export default Icon;
