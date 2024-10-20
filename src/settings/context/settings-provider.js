"use client";

import { useMediaQuery } from "@mui/material";
import { getCookie, setCookie } from "cookies-next";
import { useState, useMemo, useEffect } from "react";
//
//
import { settingsContext } from "./settings-context";

export const SettingsProvider = ({ children }) => {
    const isMobile = useMediaQuery("(max-width: 900px");
    const systemTheme = useMediaQuery("(prefers-color-scheme: dark)");

    const [mode, setMode] = useState("dark");
    const [selectedPalette, setSelectedPalette] = useState(3);

    const toggleTheme = () => {
        const newTheme = mode === "light" ? "dark" : "light";

        setMode(newTheme);
        setCookie("theme", newTheme);
    };

    useEffect(() => {
        setMode(getCookie("theme") || systemTheme ? "dark" : "light");
    }, [systemTheme]);

    const providerValues = useMemo(
        () => ({
            isMobile,
            mode,
            setMode,
            toggleTheme,
            selectedPalette,
        }),
        [isMobile, mode, setMode, toggleTheme, selectedPalette]
    );

    return (
        <settingsContext.Provider value={providerValues}>
            {children}
        </settingsContext.Provider>
    );
};
