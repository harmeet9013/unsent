import { alpha } from "@mui/material";
import { blue, green, grey, orange, red } from "@mui/material/colors";
//
import { PALETTE_NAMES } from "@/config/theme";

const COLORS = (mode, theme) => {
    const isLightMode = true;

    const common = {
        blue: {
            main: blue[isLightMode ? 200 : 800],
            light: blue[isLightMode ? 100 : 700],
            dark: blue[isLightMode ? 300 : 900],
            contrastText: blue[isLightMode ? 900 : 50],
        },
        orange: {
            main: orange[isLightMode ? 200 : 800],
            light: orange[isLightMode ? 100 : 700],
            dark: orange[isLightMode ? 300 : 900],
            contrastText: orange[isLightMode ? 900 : 50],
        },
        red: {
            main: red[isLightMode ? 200 : 800],
            light: red[isLightMode ? 100 : 700],
            dark: red[isLightMode ? 300 : 900],
            contrastText: red[isLightMode ? 900 : 50],
        },
        green: {
            main: green[isLightMode ? 200 : 800],
            light: green[isLightMode ? 100 : 700],
            dark: green[isLightMode ? 300 : 900],
            contrastText: green[isLightMode ? 900 : 50],
        },
        grey_card: {
            main: grey[isLightMode ? 200 : 800],
            light: grey[isLightMode ? 100 : 700],
            dark: grey[isLightMode ? 400 : 900],
            contrastText: grey[isLightMode ? 900 : 50],
        },
    };

    const light = {
        primary: {
            main: PALETTE_NAMES[theme]["palettes"]["primary"][40],
            light: PALETTE_NAMES[theme]["palettes"]["primary"][30],
            dark: PALETTE_NAMES[theme]["palettes"]["primary"][50],
            contrastText: PALETTE_NAMES[theme]["palettes"]["primary"][100],
        },
        secondary: {
            main: PALETTE_NAMES[theme]["palettes"]["secondary"][40],
            light: PALETTE_NAMES[theme]["palettes"]["secondary"][30],
            dark: PALETTE_NAMES[theme]["palettes"]["secondary"][50],
            contrastText: PALETTE_NAMES[theme]["palettes"]["secondary"][100],
        },
        tertiary: {
            main: PALETTE_NAMES[theme]["palettes"]["tertiary"][40],
            light: PALETTE_NAMES[theme]["palettes"]["tertiary"][30],
            dark: PALETTE_NAMES[theme]["palettes"]["tertiary"][50],
            contrastText: PALETTE_NAMES[theme]["palettes"]["tertiary"][100],
        },
        text: {
            primary: PALETTE_NAMES[theme]["palettes"]["neutral"][0],
            secondary: PALETTE_NAMES[theme]["palettes"]["neutral"][40],
            disabled: PALETTE_NAMES[theme]["palettes"]["neutral"][60],
        },
    };

    const dark = {
        primary: {
            main: PALETTE_NAMES[theme]["palettes"]["primary"][80],
            light: PALETTE_NAMES[theme]["palettes"]["primary"][70],
            dark: PALETTE_NAMES[theme]["palettes"]["primary"][90],
            contrastText: PALETTE_NAMES[theme]["palettes"]["primary"][20],
        },
        secondary: {
            main: PALETTE_NAMES[theme]["palettes"]["secondary"][80],
            light: PALETTE_NAMES[theme]["palettes"]["secondary"][70],
            dark: PALETTE_NAMES[theme]["palettes"]["secondary"][90],
            contrastText: PALETTE_NAMES[theme]["palettes"]["secondary"][20],
        },
        tertiary: {
            main: PALETTE_NAMES[theme]["palettes"]["tertiary"][80],
            light: PALETTE_NAMES[theme]["palettes"]["tertiary"][70],
            dark: PALETTE_NAMES[theme]["palettes"]["tertiary"][90],
            contrastText: PALETTE_NAMES[theme]["palettes"]["tertiary"][20],
        },
        text: {
            primary: PALETTE_NAMES[theme]["palettes"]["neutral"][100],
            secondary: PALETTE_NAMES[theme]["palettes"]["neutral"][60],
            disabled: PALETTE_NAMES[theme]["palettes"]["neutral"][50],
        },
    };

    return {
        mode,
        ...(mode === "light" ? light : dark),
        ...common,
        background: {
            default:
                PALETTE_NAMES[theme]["schemes"][mode]["surfaceContainerLowest"],
            paper: PALETTE_NAMES[theme]["schemes"][mode]["surfaceContainer"],
        },
        divider: alpha(
            PALETTE_NAMES[theme]["schemes"][mode]["outlineVariant"],
            0.7
        ),
        grey: {
            ...PALETTE_NAMES[theme]["palettes"]["neutral"],
        },
    };
};

export default function palette(mode, theme) {
    return {
        mode,
        ...COLORS(mode, theme),
    };
}
