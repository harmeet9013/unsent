"use client";

import { AddRounded, SearchRounded } from "@mui/icons-material";
import {
    Container,
    Fab,
    IconButton,
    InputAdornment,
    Stack,
    Tooltip,
    useTheme,
} from "@mui/material";
//
import { useGlobalContext } from "@/contexts";
import { FormProvider, RHFTextField } from "../react-hook-form";
import { useForm } from "react-hook-form";
import { searchSchema } from "@/schemas";
import { GET_REQUEST } from "@/lib";
import { ENDPOINTS } from "@/config";

export const Footer = ({ setAllCards, setUpdatedPagination }) => {
    const theme = useTheme();
    const { openDialog } = useGlobalContext();

    const methods = useForm(searchSchema({ search: "" }));

    const onSubmit = methods["handleSubmit"](async (data) => {
        const response = await GET_REQUEST(ENDPOINTS["list"], {
            search: data?.search,
        });

        if (response?.status) {
            setAllCards(response?.data);
            setUpdatedPagination(response?.pagination);
        }
    });

    return (
        <Stack
            width={1}
            position="fixed"
            bottom={10}
            right={0}
            justifyContent="center"
            alignItems="center"
        >
            <FormProvider methods={methods} onSubmit={onSubmit}>
                <Container maxWidth="lg">
                    <Stack
                        width={1}
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <RHFTextField
                            fullWidth={false}
                            name="search"
                            variant="outlined"
                            color="tertiary"
                            placeholder="search here"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton type="submit">
                                            <SearchRounded />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                background: theme.palette.background.default,
                            }}
                        />
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
            </FormProvider>
        </Stack>
    );
};
