import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import markerIcon from '../Icons/marker.svg';

const Wrapper = styled(Paper)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  backgroundColor: 'transparent',
  boxShadow: 'none',
  transform: 'translate(-50%, -50%)'
}));


const Marker = ({ text, onClick }) => (
    <Wrapper
        alt={text}
        onClick={onClick}
    >
        <img src={markerIcon} />
    </Wrapper>
);

Marker.defaultProps = {
  onClick: null,
};

Marker.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
};

export default Marker;