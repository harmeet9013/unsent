"use client";

import { searchSchema } from "@/schemas";
import { useSettingsContext } from "@/settings";
import { AppBar, Button, Stack, Typography, useTheme } from "@mui/material";
import { useForm } from "react-hook-form";
import { FormProvider } from "../react-hook-form";
import { AddRounded } from "@mui/icons-material";
import { useGlobalContext } from "@/contexts";

export const Header = () => {
    const theme = useTheme();
    const { openDialog } = useGlobalContext();
    const { toggleTheme } = useSettingsContext();

    const methods = useForm(searchSchema({ search: "" }));

    const onSubmit = methods["handleSubmit"](async (data) => {
        console.log(data);
    });

    return (
        <AppBar
            position="fixed"
            color="primary"
            sx={{
                margin: "auto",
                left: "auto",
                right: "auto",
                boxShadow: "none",
            }}
        >
            <FormProvider methods={methods} onSubmit={onSubmit}>
                <Stack direction="row">
                    <Stack
                        width={1}
                        py={2}
                        bgcolor="background.default"
                        border={`1px solid ${theme.palette.divider}`}
                    >
                        <Button onClick={toggleTheme}>Toggle Theme</Button>
                    </Stack>

                    <Stack
                        width={1}
                        py={2}
                        bgcolor="background.default"
                        border={`1px solid ${theme.palette.divider}`}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AddRounded />}
                            onClick={openDialog}
                        >
                            create
                        </Button>
                    </Stack>
                </Stack>
            </FormProvider>
        </AppBar>
    );
};
