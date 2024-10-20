"use client";

import {
    AppBar,
    Container,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    Typography,
    useTheme,
} from "@mui/material";
import { SearchRounded, SendRounded } from "@mui/icons-material";
import { useForm } from "react-hook-form";
//
import { searchSchema } from "@/schemas";
import { FormProvider, RHFTextField } from "../react-hook-form";

export const Footer = () => {
    const theme = useTheme();

    const methods = useForm(searchSchema({ search: "" }));

    const onSubmit = methods["handleSubmit"](async (data) => {
        console.log(data);
    });

    return (
        <Stack
            width={1}
            height={20}
            position="relative"
            borderTop={`2px solid ${theme.palette.divider}`}
        >
            <Stack width={1} pb={8}>
                <Typography>Some text</Typography>
            </Stack>

            <FormProvider methods={methods} onSubmit={onSubmit}>
                <AppBar
                    position="fixed"
                    color="primary"
                    sx={{
                        bottom: 0,
                        top: "auto",
                        left: "auto",
                        right: "auto",
                        margin: "auto",
                        boxShadow: "none",
                        maxWidth: theme.breakpoints.values.lg,
                    }}
                >
                    <Stack direction="row">
                        <Stack
                            width={1}
                            py={1}
                            px={2}
                            justifyContent="center"
                            alignItems="center"
                            border={`1px solid ${theme.palette.divider}`}
                        >
                            <RHFTextField
                                name="search"
                                variant="outlined"
                                fullWidth
                                label="Search"
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchRounded />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton type="submit">
                                                    <SendRounded />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                        sx: {
                                            background:
                                                theme.palette.background
                                                    .default,
                                        },
                                    },
                                }}
                            />
                        </Stack>
                    </Stack>
                </AppBar>
            </FormProvider>
        </Stack>
    );
};
