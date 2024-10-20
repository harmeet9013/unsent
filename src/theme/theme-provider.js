"use client";

import {
    createTheme,
    CssBaseline,
    ThemeProvider as MuiThemeProvider,
    responsiveFontSizes,
} from "@mui/material";
//
import { useSettingsContext } from "@/settings";
//
import palette from "./palette";
import { ComponentsOverrides } from "./components-overrides";

export const ThemeProvider = ({ children }) => {
    const { mode, selectedPalette } = useSettingsContext();

    const theme = createTheme({
        // cssVariables: true,
        // colorSchemes: {
        //     light: true,
        //     dark: true,
        // },
        typography: {
            fontFamily: "inherit",
        },
        palette: {
            ...palette(mode, selectedPalette),
        },
    });

    theme.components = ComponentsOverrides(theme);

    // theme.typography = responsiveFontSizes(theme);

    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline enableColorScheme />
            {children}
        </MuiThemeProvider>
    );
};
