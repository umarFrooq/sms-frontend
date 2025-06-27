import { createTheme } from '@mui/material/styles';
import '@fontsource/inter'; // Ensure the font is imported

// Define the custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976D2', // Calming and trustworthy blue
    },
    secondary: {
      main: '#26A69A', // Desaturated teal/green
    },
    error: {
      main: '#D32F2F', // Clear red for errors
    },
    warning: {
      main: '#FF9800', // Warm orange for warnings/accents
    },
    background: {
      default: '#F7F9FC', // Off-white for main background
      paper: '#FFFFFF',   // White for cards, modals, etc.
    },
    text: {
      primary: '#2F4F4F',   // Dark Slate Gray for primary text
      secondary: '#607D8B', // Medium Gray for secondary text
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    h1: {
      fontSize: '2rem', // 32px
      fontWeight: 700,
    },
    h2: {
      fontSize: '1.75rem', // 28px
      fontWeight: 700,
    },
    h3: {
      fontSize: '1.5rem', // 24px
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.25rem', // 20px
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.125rem', // 18px
      fontWeight: 600,
    },
    h6: {
      fontSize: '1rem', // 16px
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem', // 16px
      fontWeight: 400,
    },
    body2: {
      fontSize: '0.875rem', // 14px
      fontWeight: 400,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 4px 12px rgba(0,0,0,0.08)',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0px 2px 8px rgba(0,0,0,0.05)',
        }
      }
    }
  },
});

export default theme;
