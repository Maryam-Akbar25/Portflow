// Global styles for the dashboard
const globalStyles = {
  // Typography
  typography: {
    h1: {
      fontSize: '2.5rem !important',
      fontWeight: '600 !important',
    },
    h2: {
      fontSize: '2rem !important',
      fontWeight: '600 !important',
    },
    h3: {
      fontSize: '1.75rem !important',
      fontWeight: '600 !important',
    },
    h4: {
      fontSize: '1.5rem !important',
      fontWeight: '600 !important',
    },
    h5: {
      fontSize: '1.25rem !important',
      fontWeight: '600 !important',
    },
    h6: {
      fontSize: '1.1rem !important',
      fontWeight: '600 !important',
    },
    subtitle1: {
      fontSize: '1.1rem !important',
    },
    body1: {
      fontSize: '1.1rem !important',
    },
    body2: {
      fontSize: '1rem !important',
    },
    button: {
      fontSize: '1rem !important',
      textTransform: 'none',
    },
    caption: {
      fontSize: '0.9rem !important',
    },
    overline: {
      fontSize: '0.8rem !important',
    },
  },
  
  // Components
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          '& .MuiCardHeader-title': {
            fontSize: '1.25rem !important',
            fontWeight: '600 !important',
          },
          '& .MuiCardHeader-subheader': {
            fontSize: '0.95rem !important',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: '1.1rem !important',
          padding: '12px 16px',
        },
        head: {
          fontWeight: '600 !important',
          fontSize: '1.1rem !important',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '1rem !important',
          padding: '8px 16px',
          '&.MuiButton-contained': {
            fontWeight: '500',
          },
        },
      },
    },
  },
};

export default globalStyles;
