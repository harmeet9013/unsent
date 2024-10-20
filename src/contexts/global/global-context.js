"use client";

import { useContext } from "react";
//
import { global_context } from "./global-context-provider";

export const useGlobalContext = () => {
    const context = useContext(global_context);

    if (!context) {
        throw new Error(
            "useGlobalContext must be used inside GlobalContextProvider!"
        );
    }

    return context;
};
