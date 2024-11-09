"use client";

import { Header } from "@/components";
import { CARD_COLORS, PATHS } from "@/config";
import { ArrowBackRounded } from "@mui/icons-material";
import {
    Button,
    Card,
    Fade,
    Stack,
    Typography,
    alpha,
    useTheme,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useRouter } from "next/navigation";

export const SingleNoteView = ({ cardData }) => {
    const router = useRouter();
    const theme = useTheme();

    const pickedColor =
        theme.palette[
            cardData?.color ||
                CARD_COLORS[Math.floor(Math.random() * CARD_COLORS.length)]
        ];

    const handleHomeClick = () => {
        router.push(PATHS["home"]);
    };

    return (
        <Fade in={true}>
            <Stack gap={2} minHeight="90dvh">
                <Header />

                <Stack
                    m="auto"
                    width={1}
                    gap={2}
                    alignItems="center"
                    justifyContent="center"
                >
                    {cardData ? (
                        <Card
                            variant="outlined"
                            sx={{
                                width: 1,
                                minHeight: theme.spacing(20),
                                borderColor: pickedColor?.dark,
                                color: pickedColor?.contrastText,
                                backgroundColor: pickedColor?.main,
                                maxWidth: theme.spacing(50),
                            }}
                        >
                            <Stack direction="column" width={1}>
                                <Stack
                                    width={1}
                                    px={2}
                                    py={1}
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="space-between"
                                    borderBottom={`1px solid ${pickedColor?.dark}`}
                                    color="grey.700"
                                    bgcolor={pickedColor?.light}
                                >
                                    <Typography align="left" variant="body1">
                                        to:{" "}
                                        <Typography
                                            variant="inline"
                                            color={
                                                cardData?.to
                                                    ? pickedColor?.contrastText
                                                    : alpha(grey[900], 0.8)
                                            }
                                            fontWeight={600}
                                            sx={{
                                                wordBreak: "break-all",
                                            }}
                                        >
                                            {cardData?.to || "anonymous"}
                                        </Typography>
                                    </Typography>
                                </Stack>

                                <Typography
                                    p={1}
                                    align="left"
                                    variant="body1"
                                    fontWeight={600}
                                    color="grey.900"
                                    sx={{
                                        wordBreak: "break-all",
                                    }}
                                >
                                    {cardData?.message}
                                </Typography>
                            </Stack>
                        </Card>
                    ) : (
                        <Typography variant="h3">note not found</Typography>
                    )}

                    <Stack
                        justifyContent="flex-start"
                        direction="row"
                        alignItems="center"
                    >
                        <Button
                            variant="contained"
                            color="tertiary"
                            onClick={handleHomeClick}
                            startIcon={<ArrowBackRounded />}
                        >
                            go to home
                        </Button>
                    </Stack>
                </Stack>
            </Stack>
        </Fade>
    );
};
