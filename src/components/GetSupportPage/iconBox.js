import React from 'react';
import Box from '@mui/material/Box';

const IconBox = ({ src }) => {
  const classes = {
    iconBox: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: '76.621px',
      height: '78.189px',
      flexShrink: 0,
      borderRadius: '12px',
      background: '#FFF',
      boxShadow: '0px 0px 16px 0px rgba(0, 0, 0, 0.12)',
      marginBottom: '10px',
    },
  };

  return (
    <Box sx={classes.iconBox}>
      <img src={src} alt="Icon" />
    </Box>
  );
};

export default IconBox;
