"use client";

import { AddRounded } from "@mui/icons-material";
import { Container, Fab, Stack, Tooltip } from "@mui/material";
//
import { useGlobalContext } from "@/contexts";

export const Footer = () => {
    const { openDialog } = useGlobalContext();

    return (
        <Stack
            width={1}
            position="fixed"
            bottom={10}
            right={0}
            justifyContent="center"
            alignItems="center"
        >
            <Container maxWidth="lg">
                <Stack width={1} justifyContent="center" alignItems="flex-end">
                    <Tooltip title="create new note" disableInteractive>
                        <Fab
                            color="tertiary"
                            onClick={openDialog}
                            sx={{
                                borderRadius: 0,
                            }}
                        >
                            <AddRounded />
                        </Fab>
                    </Tooltip>
                </Stack>
            </Container>
        </Stack>
    );
};
