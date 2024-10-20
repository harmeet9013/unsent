"use client";

import {
    Stack,
    Button,
    Dialog,
    useTheme,
    IconButton,
    Typography,
    DialogTitle,
    DialogActions,
    DialogContent,
    Card,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { CloseRounded, ShuffleOnRounded } from "@mui/icons-material";
//
import { CARD_COLORS, ENDPOINTS } from "@/config";
import { useGlobalContext } from "@/contexts";
//
import { FormProvider, RHFTextField } from "../react-hook-form";
import { newCardSchema } from "@/schemas";
import { POST_REQUEST } from "@/lib";
import { grey } from "@mui/material/colors";
import { closeSnackbar, enqueueSnackbar } from "notistack";

export const CreateCard = () => {
    const theme = useTheme();
    const { openCreatePopup, closeDialog } = useGlobalContext();
    const methods = useForm(newCardSchema({ to: "", message: "", color: "" }));

    const [currentColor, setCurrentColor] = useState(0);
    const [isUpdating, setIsUpdating] = useState(false);

    const onSubmit = methods["handleSubmit"](async (data) => {
        setIsUpdating(true);

        const response = await POST_REQUEST(ENDPOINTS["create"], data);

        if (response?.status) {
            const note_url = window.location.href + response?.data?.key;

            enqueueSnackbar("note created!", {
                action: (
                    <>
                        <Button
                            onClick={() => {
                                closeSnackbar();
                                navigator.clipboard.writeText(note_url);
                                enqueueSnackbar("note copied");
                            }}
                        >
                            copy note
                        </Button>
                    </>
                ),
            });
            methods["reset"]();
            closeDialog();
        } else {
            console.log("error", response);
        }

        setIsUpdating(false);
    });

    const generateColor = () => {
        const newColor =
            currentColor === CARD_COLORS.length - 1 ? 0 : currentColor + 1;

        setCurrentColor(newColor);
        methods["setValue"]("color", CARD_COLORS[newColor]);
    };

    useEffect(() => {
        if (!!openCreatePopup) {
            generateColor();
        }
    }, [openCreatePopup]);

    return (
        <Dialog
            fullWidth
            maxWidth="sm"
            scroll="paper"
            open={openCreatePopup}
            onClose={() => closeDialog()}
            PaperProps={{
                elevation: 0,
                sx: {
                    padding: 0,
                    background: theme.palette.background.default,
                },
            }}
        >
            <DialogTitle>
                <Stack
                    width={1}
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Typography variant="h5" color="text.primary">
                        new note
                    </Typography>

                    <IconButton
                        onClick={closeDialog}
                        sx={{
                            background: theme.palette.tertiary.main,
                            color: theme.palette.tertiary.contrastText,
                            "&:hover": {
                                background: theme.palette.tertiary.dark,
                            },
                        }}
                    >
                        <CloseRounded />
                    </IconButton>
                </Stack>
            </DialogTitle>

            <DialogContent dividers>
                <FormProvider methods={methods} onSubmit={onSubmit}>
                    <Stack width={1} gap={2}>
                        <Card
                            variant="outlined"
                            sx={{
                                width: 1,
                                minHeight: theme.spacing(20),
                                borderColor:
                                    theme.palette[CARD_COLORS[currentColor]]
                                        ?.dark,
                                color: theme.palette[CARD_COLORS[currentColor]]
                                    ?.contrastText,
                                backgroundColor:
                                    theme.palette[CARD_COLORS[currentColor]]
                                        ?.main,
                                transition: theme.transitions.create([
                                    "background-color",
                                    "color",
                                    "border-color",
                                ]),
                            }}
                        >
                            <Stack direction="column" width={1}>
                                <Typography
                                    px={2}
                                    py={1}
                                    width={1}
                                    direction="row"
                                    variant="body1"
                                    component={Stack}
                                    gap={1}
                                    alignItems="center"
                                    borderBottom={`1px solid ${
                                        theme.palette[CARD_COLORS[currentColor]]
                                            ?.dark
                                    }`}
                                    color="grey.700"
                                    bgcolor={
                                        theme.palette[CARD_COLORS[currentColor]]
                                            ?.light
                                    }
                                    sx={{
                                        transition: theme.transitions.create([
                                            "background-color",
                                            "color",
                                        ]),
                                    }}
                                >
                                    to:
                                    <RHFTextField
                                        name="to"
                                        variant="standard"
                                        color={CARD_COLORS[currentColor]}
                                        placeholder=" leave blank for anonymous note"
                                        inputProps={{
                                            style: {
                                                color: theme.palette[
                                                    CARD_COLORS[currentColor]
                                                ]?.contrastText,
                                                fontWeight: 600,
                                                transition:
                                                    theme.transitions.create([
                                                        "background-color",
                                                        "color",
                                                    ]),
                                            },
                                        }}
                                    />
                                </Typography>

                                <RHFTextField
                                    multiline
                                    rows={10}
                                    name="message"
                                    variant="standard"
                                    inputProps={{
                                        style: {
                                            color: grey[900],
                                            fontWeight: 600,
                                            transition:
                                                theme.transitions.create([
                                                    "background-color",
                                                    "color",
                                                ]),
                                        },
                                    }}
                                    sx={{
                                        padding: theme.spacing(1),
                                    }}
                                    color="grey.900"
                                    placeholder=" what's on your mind?"
                                />
                            </Stack>
                        </Card>

                        <Button
                            fullWidth
                            variant="outlined"
                            color={CARD_COLORS[currentColor]}
                            startIcon={<ShuffleOnRounded />}
                            onClick={generateColor}
                        >
                            shuffle color
                        </Button>
                    </Stack>
                </FormProvider>
            </DialogContent>

            <DialogActions>
                <Button
                    variant="outlined"
                    color="tertiary"
                    onClick={closeDialog}
                >
                    close
                </Button>

                <Button variant="contained" color="tertiary" onClick={onSubmit}>
                    submit
                </Button>
            </DialogActions>
        </Dialog>
    );
};
