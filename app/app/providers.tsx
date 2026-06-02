"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import type { ReactNode } from "react";

export const theme = createTheme({
  palette: {
    mode: "light",

    primary: {
      main: "#ff8a00",
      light: "#ffa502",
      dark: "#e67e00",
      contrastText: "#ffffff",
    },

    secondary: {
      main: "#444444",
      light: "#666666",
      dark: "#111111",
      contrastText: "#ffffff",
    },

    background: {
      default: "#f3f3f3",
      paper: "#ffffff",
    },

    text: {
      primary: "#111111",
      secondary: "#444444",
    },

    grey: {
      100: "#f3f3f3",
      300: "#d9d9d9",
      500: "#999999",
      700: "#444444",
      900: "#111111",
    },
  },

  typography: {
    fontFamily: ["Inter", "Roboto", "Helvetica", "Arial", "sans-serif"].join(
      ",",
    ),

    h1: {
      fontSize: "60px",
      fontWeight: 700,
      lineHeight: 1.2,
      color: "#111111",
    },

    h2: {
      fontSize: "36px",
      fontWeight: 500,
      lineHeight: 1.3,
      color: "#111111",
    },

    h3: {
      fontSize: "28px",
      fontWeight: 500,
      lineHeight: 1.3,
      color: "#111111",
    },

    h4: {
      fontSize: "24px",
      fontWeight: 500,
      lineHeight: 1.3,
      color: "#111111",
    },

    h5: {
      fontSize: "20px",
      fontWeight: 500,
      lineHeight: 1.4,
      color: "#111111",
    },

    h6: {
      fontSize: "18px",
      fontWeight: 500,
      lineHeight: 1.4,
      color: "#111111",
    },

    body1: {
      fontSize: "16px",
      fontWeight: 400,
      lineHeight: 1.6,
      color: "#444444",
    },

    body2: {
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: 1.5,
      color: "#444444",
    },

    button: {
      textTransform: "none",
      fontWeight: 500,
      fontSize: "14px",
    },
  },

  shape: {
    borderRadius: 4,
  },

  spacing: 8,

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          minHeight: 40,
          boxShadow: "none",
        },

        containedPrimary: {
          backgroundColor: "#ff8a00",
          "&:hover": {
            backgroundColor: "#ffa502",
          },
          "&:active": {
            backgroundColor: "#e67e00",
          },
        },

        outlined: {
          borderColor: "#444444",
          color: "#444444",

          "&:hover": {
            backgroundColor: "#444444",
            color: "#ffffff",
          },

          "&:active": {
            backgroundColor: "#111111",
            color: "#ffffff",
          },
        },
      },

      variants: [
        {
          props: { size: "large" },
          style: {
            width: 300,
            height: 60,
          },
        },
        {
          props: { size: "medium" },
          style: {
            width: 220,
            height: 50,
          },
        },
        {
          props: { size: "small" },
          style: {
            width: 140,
            height: 40,
          },
        },
      ],
    },

    MuiLink: {
      styleOverrides: {
        root: {
          color: "#e67e00",
          textDecoration: "underline",

          "&:hover": {
            color: "#ff8a00",
          },
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
  },
});

export const LAYOUT_WIDTH_RESPONSIVE = {
  md: 768, // w-2xl in tailwindcss
  lg: 1152, // w-6xl in tailwindcss
  xl: 1280, //w-7xl
};

export function TripsProviders({ children }: { children: ReactNode }) {
  return (
    <AppRouterCacheProvider options={{ key: "mui", enableCssLayer: true }}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <CssBaseline />
          {children}
        </LocalizationProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
