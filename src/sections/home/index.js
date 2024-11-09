"use client";

import { useState } from "react";
import { Fade, Stack } from "@mui/material";
//
import { Footer, Header } from "@/components";
//
import { HomeListView } from "./list-view";

export const HomeView = ({ cards, pagination }) => {
    const [allCards, setAllCards] = useState([...cards]);
    const [updatedPagination, setUpdatedPagination] = useState({
        ...pagination,
    });

    return (
        <Fade in={true}>
            <Stack component="main">
                <Header />

                <HomeListView
                    allCards={allCards}
                    setAllCards={setAllCards}
                    pagination={updatedPagination}
                    setUpdatedPagination={setUpdatedPagination}
                />

                <Footer
                    setAllCards={setAllCards}
                    setUpdatedPagination={setUpdatedPagination}
                />
            </Stack>
        </Fade>
    );
};
