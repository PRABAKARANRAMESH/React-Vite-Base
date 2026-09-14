// theme/components.ts
import type { Theme, Components } from '@mui/material/styles';
import { TickSquare,CloseSquare,Warning2 } from 'iconsax-react';
import { createElement } from 'react';


const components = (theme: Theme): Components => ({
  MuiCssBaseline: {
    styleOverrides: {
      '*': {
        boxSizing: 'border-box',
        margin: 0,
        padding: 0,
        scrollbarWidth: 'thin',
        scrollbarColor: `${theme.palette.divider} transparent`,
      },
      html: {
        height: '100%',
        width: '100%',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
      },
      body: {
        height: '100%',
        width: '100%',
        overflowX: 'hidden',
      },
      '#root': {
        height: '100%',
        width: '100%',
      },
      a: {
        textDecoration: 'none',
        color: 'inherit',
      },
      img: {
        maxWidth: '100%',
        height: 'auto',
      },
      // Global scrollbar styling
      '*::-webkit-scrollbar': {
        width: '4px',
        height: '4px',
      },
      '*::-webkit-scrollbar-track': {
        backgroundColor: 'transparent',
      },
      '*::-webkit-scrollbar-thumb': {
        backgroundColor: theme.palette.divider,
        borderRadius: '2px',
        '&:hover': {
          backgroundColor: theme.palette.primary.light,
        },
      },
      '*::-webkit-scrollbar-corner': {
        backgroundColor: 'transparent',
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: theme.shape.borderRadius,
        textTransform: 'none' as const,
        fontWeight: 500,
        boxShadow: 'none',
        '&:hover': {
          boxShadow: 'none',
        },
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        // borderRadius: theme.shape.borderRadius * 2,
        boxShadow: theme.shadows[1],
        '&:hover': {
          boxShadow: theme.shadows[4],
        },
      },
    },
  },
  MuiAutocomplete: {
    styleOverrides: {
      listbox: {
        maxHeight: 200,
        '&::-webkit-scrollbar': {
          width: 8,
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: theme.palette.divider,
          borderRadius: 4,
        },
        '& .MuiAutocomplete-option': {
          '&[aria-selected="true"]': {
            backgroundColor: `${theme.palette.action.selected} !important`,
          },
          '&.Mui-focused': {
            backgroundColor: `${theme.palette.action.hover} !important`,
          },
        },
      },
    },
  },
  
  MuiDrawer: {
    styleOverrides: {
      paper: {
        borderRight: `1px solid ${theme.palette.divider}`,
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        boxShadow: theme.shadows[1],
      },
    },
  },
  MuiDivider: {
    styleOverrides: {
      root: {
        borderColor: theme.palette.divider,
      },
    },
  },
  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        fontSize: '0.75rem',
        borderRadius: theme.shape.borderRadius,
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          borderRadius: theme.shape.borderRadius,
        },
      },
    },
  },
  MuiOutlinedInput: {
      styleOverrides: {
      input: {
        [theme.breakpoints.up("xl")]: {
          padding: "12px 12px !important",
        },
        [theme.breakpoints.down("xl")]: {
          padding: "8px 12px !important",
        },
        [theme.breakpoints.down("sm")]: {
          padding: "6px 6px !important",
        },
      },

      inputSizeSmall: {
        padding: "8px 12px",
      },
    },
  },
  MuiAlert: {
    defaultProps: {
      iconMapping: {
        error: createElement(CloseSquare, {
          variant: "Bulk",
          color: "currentColor",
          size: 20
        }),
        success: createElement(TickSquare, {
          variant: "Bulk",
          color: "currentColor",
          size: 20
        }),
        warning: createElement(Warning2, {
          variant: "Bulk",
          color: "currentColor",
          size: 20
        }),
        info: createElement(Warning2, {
          variant: "Bulk",
          color: "currentColor",
          size: 20
        }),
      },
    },
    styleOverrides: {
      root: {
      },
    },
  },
      MuiTableContainer: {
      styleOverrides: {
        root: {
          borderRadius: '4px !important',
           scrollbarWidth: 'thin', 
          scrollbarColor: `${theme.palette.primary.light} transparent`, // For Firefox
          '&::-webkit-scrollbar': {
            width: '8px', 
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.primary.light, 
            borderRadius: '4px', 
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'transparent', 
          },
        },
      },
    },
        MuiTable: {
      styleOverrides: {
        root: {
          borderBottom:1,
          border:`1px solid ${theme.palette.grey[200]} !important`
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          // backgroundColor: theme.palette.background.default,
          borderBottom:`1px solid ${theme.palette.grey[200]}`,
          padding:'8px 8px',
        },
        head:{
           backgroundColor:theme.palette.grey[200]
        },
        body:{
          backgroundColor: theme.palette.background.paper,
          
        }
      },
    },
    MuiSelect: {
      defaultProps: {
        MenuProps: {
          PaperProps: {
            style: {
              maxHeight: 200,
              width: 250,
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: theme.shape.borderRadius,
        },
      },
    },
});

export default components;