"use client";

import { createContext, useState } from "react";

export const global_context = createContext();

export const GlobalContextProvider = ({ children }) => {
    const [openCreatePopup, setOpenCreatePopup] = useState(false);

    const openDialog = () => setOpenCreatePopup(true);

    const closeDialog = () => setOpenCreatePopup(false);

    const toggleDialog = () => setOpenCreatePopup((prevState) => !prevState);

    return (
        <global_context.Provider
            value={{
                openDialog,
                closeDialog,
                toggleDialog,
                openCreatePopup,
            }}
        >
            {children}
        </global_context.Provider>
    );
};
