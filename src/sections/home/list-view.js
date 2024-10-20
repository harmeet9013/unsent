"use client";

import { grey } from "@mui/material/colors";
import { useRouter } from "next/navigation";
import {
    Card,
    Fade,
    Grid2,
    IconButton,
    Stack,
    Tooltip,
    Typography,
    alpha,
    useTheme,
} from "@mui/material";
//
import { CARD_COLORS, PATHS } from "@/config";
import {
    CopyAllRounded,
    LinkRounded,
    OpenInNewRounded,
} from "@mui/icons-material";
import { enqueueSnackbar } from "notistack";

export const HomeListView = ({ cards }) => {
    const theme = useTheme();

    const handleNoteClick = (note_id) => {
        const note_url = window.location.href + note_id;
        navigator.clipboard.writeText(note_url);
        enqueueSnackbar("copied");
    };

    return (
        <Stack width={1} pt={4} pb={12}>
            <Grid2 container spacing={2} alignItems="stretch">
                {cards?.map((item, index) => {
                    const pickedColor =
                        theme.palette[
                            item?.color ||
                                CARD_COLORS[index % CARD_COLORS.length]
                        ];

                    return (
                        <Grid2
                            key={index}
                            display="flex"
                            size={{ xs: 12, md: 6, lg: 4 }}
                        >
                            <Card
                                variant="outlined"
                                sx={{
                                    width: 1,
                                    minHeight: theme.spacing(20),
                                    borderColor: pickedColor?.dark,
                                    color: pickedColor?.contrastText,
                                    backgroundColor: pickedColor?.main,
                                    // transition: theme.transitions.create([
                                    //     "border-color",
                                    // ]),
                                    // "&:hover": {
                                    //     borderColor:
                                    //         pickedColor?.contrastText,
                                    // },
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
                                        <Typography
                                            align="left"
                                            variant="body1"
                                        >
                                            to:{" "}
                                            <Typography
                                                variant="inline"
                                                color={
                                                    item?.to
                                                        ? pickedColor?.contrastText
                                                        : alpha(grey[900], 0.8)
                                                }
                                                fontWeight={600}
                                            >
                                                {item?.to || "anonymous"}
                                            </Typography>
                                        </Typography>

                                        <Tooltip
                                            title="copy note url"
                                            disableInteractive
                                            placement="top"
                                        >
                                            <IconButton
                                                onClick={() =>
                                                    handleNoteClick(item?.key)
                                                }
                                                sx={{
                                                    color: alpha(
                                                        pickedColor?.contrastText,
                                                        0.6
                                                    ),
                                                }}
                                            >
                                                <CopyAllRounded />
                                            </IconButton>
                                        </Tooltip>
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
                                        {item?.message}
                                    </Typography>
                                </Stack>
                            </Card>
                        </Grid2>
                    );
                })}
            </Grid2>
        </Stack>
    );
};
