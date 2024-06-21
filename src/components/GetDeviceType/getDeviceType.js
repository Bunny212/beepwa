import React from "react";
import { useWindowSize } from '@magento/peregrine';

const GetDeviceType = () => {
    const windowSize = useWindowSize();
    const isDesktop = windowSize.innerWidth >= 1024;
    const isMobile = windowSize.innerWidth <= 767;
    const isTablet = windowSize.innerWidth >= 768 && windowSize.innerWidth <= 1023;

    return { isDesktop, isMobile, isTablet };
};

export default GetDeviceType;
