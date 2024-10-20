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
            console.log("Created");
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
            <FormProvider methods={methods} onSubmit={onSubmit}>
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
                                background: theme.palette.primary.main,
                                color: theme.palette.primary.contrastText,
                                "&:hover": {
                                    background: theme.palette.primary.dark,
                                },
                            }}
                        >
                            <CloseRounded />
                        </IconButton>
                    </Stack>
                </DialogTitle>

                <DialogContent dividers>
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
                </DialogContent>

                <DialogActions>
                    <Button variant="outlined" onClick={closeDialog}>
                        close
                    </Button>

                    <Button variant="contained" type="submit">
                        submit
                    </Button>
                </DialogActions>
            </FormProvider>
        </Dialog>
    );
};
