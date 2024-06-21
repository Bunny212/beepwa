import React from 'react';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';

const CustomLink = ({ href, classes }) => {
  return (
    <Button
      component={RouterLink}
      to={href}  // Note: 'to' prop instead of 'href' for external links
      className={classes.fullBtn}
      variant="contained"
      size="medium"
      target="_self"
    >
      <FormattedMessage id="learnMore" defaultMessage="Learn More" />
    </Button>
  );
};

export default CustomLink;
