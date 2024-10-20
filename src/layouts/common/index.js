"use client";

import { CreateCard } from "@/components";
import { Container } from "@mui/material";

export const CommonLayout = ({ children }) => {
    return (
        <>
            <Container maxWidth="lg">{children}</Container>
            <CreateCard />
        </>
    );
};
