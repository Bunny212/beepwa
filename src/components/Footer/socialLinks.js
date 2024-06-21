import React from 'react';
import Link from '@mui/material/Link';
import { Facebook, Instagram } from 'react-feather';
import PropTypes from 'prop-types';

const SocialLinks = ({ classes }) => {
    return (
        <ul className={classes.socialLinks}>
            <li>
                <Link
                    data-cy="Social-link"
                    className={classes.link}
                    href="https://www.instagram.com/beeslineofficial/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Instagram size={20} stroke='black' />
                </Link>
            </li>
            <li>
                <Link
                    data-cy="Social-link"
                    className={classes.link}
                    href="https://www.facebook.com/BeeslineLebanon/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Facebook size={20} stroke='black' />
                </Link>
            </li>
        </ul>
    );
};

SocialLinks.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default SocialLinks;
