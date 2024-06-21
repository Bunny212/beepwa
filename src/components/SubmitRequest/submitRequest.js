import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { useStyle } from '@magento/venia-ui/lib/classify';
import { Link, useParams } from "react-router-dom";
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';

const SubmitRequest = () => {

    const iframeStyle = {
        width: '100%', // Adjust the width as needed
        height: '100vh', // Adjust the height as needed
        border: 'none', // Remove iframe border
    };

    return (
        <Fragment>
            <iframe
                src="https://beesline.zendesk.com/hc/en-us/requests/new" // Replace with the URL of the page you want to display
                style={iframeStyle}
                title="Page Without Header"
            />
        </Fragment>
    );
};

export default SubmitRequest;
