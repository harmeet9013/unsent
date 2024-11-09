"use client";

import {
    Box,
    Fade,
    Stack,
    useTheme,
    Typography,
    LinearProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
//
import { GET_REQUEST } from "@/lib";
import { ENDPOINTS } from "@/config";
import { Footer, Header } from "@/components";
//
import { HomeListView } from "./list-view";

export const HomeView = () => {
    const theme = useTheme();

    const [allCards, setAllCards] = useState([]);
    const [isFetching, setIsFetching] = useState(true);

    const [pagination, setPagination] = useState({});
    const [updatedPagination, setUpdatedPagination] = useState(pagination);

    const fetchInitialData = async () => {
        setIsFetching(true);

        const response = await GET_REQUEST(ENDPOINTS["list"]);

        if (response?.status) {
            setAllCards([...response?.data]);
            setPagination(response?.pagination);
            setUpdatedPagination(response?.pagination);
        }

        setIsFetching(false);
    };

    useEffect(() => {
        fetchInitialData();
    }, []);

    return (
        <Fade in={true}>
            <Stack component="main">
                <Header />
                {isFetching ? (
                    <Box pt={10} width={theme.spacing(40)} mx="auto">
                        <Typography variant="h6">Loading...</Typography>
                        <LinearProgress color="tertiary" />
                    </Box>
                ) : (
                    <HomeListView
                        allCards={allCards}
                        setAllCards={setAllCards}
                        pagination={updatedPagination}
                        setUpdatedPagination={setUpdatedPagination}
                    />
                )}
                <Footer
                    isFetching={isFetching}
                    setAllCards={setAllCards}
                    setUpdatedPagination={setUpdatedPagination}
                />
            </Stack>
        </Fade>
    );
};
