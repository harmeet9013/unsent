"use client";

import { Fade, Stack } from "@mui/material";
//
import { Footer, Header } from "@/components";
//
import { HomeListView } from "./list-view";

export const HomeView = ({ cards }) => {
    return (
        <Fade in={true}>
            <Stack component="main">
                <Header />
                <HomeListView cards={cards} />
                <Footer />
            </Stack>
        </Fade>
    );
};
