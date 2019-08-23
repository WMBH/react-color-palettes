export default {
    Navbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '6vh'
    },

    logo: {
        marginRight: '15px',
        fontSize: '22px',
        padding: '0 13px',
        backgroundColor: '#eceff1',
        fontFamily: 'Roboto',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        '& a': {
            textDecoration: 'none',
            color: 'black'
        }
    },

    selectContainer: {
        marginRight: '1rem',
        marginLeft: 'auto'
    },

    slider: {
        width: '8vw',
        margin: '0 10px',
        display: 'inline-block',
        '& .rc-slider-track': {
            backgroundColor: 'transparent'
        },
        '& .rc-slider-rail': {
            height: '0.5rem'
        },
        '& .rc-slider-handle, .rc-slider-handle:focus, .rc-slider-handle:active, .rc-slider-handle:hover': {
            backgroundColor: 'green',
            outline: 'none',
            border: '2px solid green',
            boxShadow: 'none',
            width: '13px',
            height: '13px',
            marginLeft: '-7px',
            marginTop: '-3px'
        }
    }
};
