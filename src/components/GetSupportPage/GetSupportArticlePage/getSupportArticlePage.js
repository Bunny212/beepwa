import React, { Fragment } from 'react';
import { useStyle } from '@magento/venia-ui/lib/classify';
import { useLocation } from "react-router-dom";
import defaultClasses from './getSupportArticle.module.css';
import RichContent from '@magento/venia-ui/lib/components/RichContent/richContent';

import Typography from '@mui/material/Typography';
import GetSupportIcon from '../../Icons/getSupportIcon.svg';
import IconBox from '../iconBox';

const GetSupportArticlePage = props => {
    const classes = useStyle(defaultClasses, props.classes);
    const location = useLocation();
    const { articleTitle } = location.state || {};
    const { articleContent } = location.state || {};
    const { incrementId } = location.state || {};

    const faqContent = articleContent ? (
        <RichContent html={articleContent} />
    ) : null;

    let pageContent = (
        <Fragment>
            <IconBox src={GetSupportIcon} />
            <Typography sx={{ mt: 4, mb: 2 }} className={classes.pageTitle} component="div">
                {articleTitle}
            </Typography>
            <div className={classes.richContent}>{faqContent}</div>
        </Fragment>
    )

    return (
        <div className={classes.root}>
            {pageContent}
        </div>
    );
};

export default GetSupportArticlePage;
