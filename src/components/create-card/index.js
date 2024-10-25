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
import { grey } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import { CloseRounded, ShuffleOnRounded } from "@mui/icons-material";
//
import { POST_REQUEST } from "@/lib";
import { newCardSchema } from "@/schemas";
import { useGlobalContext } from "@/contexts";
import { CARD_COLORS, ENDPOINTS } from "@/config";
//
import { FormProvider, RHFTextField } from "../react-hook-form";
import { LoadingButton } from "@mui/lab";

export const CreateCard = () => {
    const theme = useTheme();
    const { openCreatePopup, closeDialog } = useGlobalContext();
    const methods = useForm(newCardSchema({ to: "", message: "", color: "" }));

    const [currentColor, setCurrentColor] = useState(0);

    const onSubmit = methods["handleSubmit"](async (data) => {
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

                <LoadingButton
                    variant="contained"
                    color="tertiary"
                    loading={methods["formState"]["isSubmitting"]}
                    onClick={onSubmit}
                >
                    submit
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
};
