// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: ['Roobert', 'sans-serif'].join(','), // Set as default font for the whole app
    },
    palette: {
        mode: 'light',
        primary: {
            main: '#ffc629',
        },
        secondary: {
            main: '#ff7a00',
        },
        notification: {
            main: '#EB5757',
        },
        error: {
            main: '#ff0000',
        },
    },
    shape: {
        borderRadius: 4,
    },
    props: {
        MuiButtonBase: {
            disableRipple: true,
        },
    },
    overrides: {
        MuiButton: {
            root: {
              backgroundColor: '#ffc629', // Replace with your desired background color
              color: '#000000', // Replace with your desired text color
              boxShadow: 'none',
              marginBottom: '10px',
              // Add more custom styles as needed
            },
        },
    },
    // Other theme configurations...
});

export default theme;
