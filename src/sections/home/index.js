"use client";

import { Stack } from "@mui/material";
//
import { Footer, Header } from "@/components";
//
import { HomeListView } from "./list-view";

export const HomeView = ({ cards }) => {
    return (
        <Stack
            minHeight="100dvh"
            justifyContent="space-between"
            alignItems="center"
        >
            <Header />
            <HomeListView cards={cards} />
            {/* <Footer /> */}
        </Stack>
    );
};
