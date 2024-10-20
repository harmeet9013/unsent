"use client";

import {
    Card,
    Grid2,
    Stack,
    alpha,
    Button,
    Tooltip,
    useTheme,
    IconButton,
    Typography,
} from "@mui/material";
import { useState } from "react";
import { grey } from "@mui/material/colors";
import { enqueueSnackbar } from "notistack";
import { CopyAllRounded } from "@mui/icons-material";
//
import { GET_REQUEST } from "@/lib";
import { CARD_COLORS, ENDPOINTS } from "@/config";

export const HomeListView = ({
    allCards,
    setAllCards,
    pagination,
    setUpdatedPagination,
}) => {
    const theme = useTheme();

    const [isFetching, setIsFetching] = useState(false);

    const handleNoteClick = (note_id) => {
        const note_url = window.location.href + note_id;
        navigator.clipboard.writeText(note_url);
        enqueueSnackbar("copied");
    };

    const loadMoreCards = async () => {
        setIsFetching(true);

        const response = await GET_REQUEST(ENDPOINTS["list"], {
            page: pagination?.page + 1,
            limit: pagination?.limit,
        });

        console.log(response);

        if (response?.status) {
            setAllCards((prevState) => [...prevState, ...response?.data]);
            setUpdatedPagination(response?.pagination);
        }

        setIsFetching(false);
    };

    return (
        <Stack width={1} pt={4} pb={12} gap={2}>
            <Grid2 container spacing={2} alignItems="stretch">
                {allCards?.map((item, index) => {
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

            {pagination?.page < pagination?.total_pages && (
                <Stack width={1} justifyContent="center" alignItems="center">
                    <Button
                        disabled={isFetching}
                        onClick={loadMoreCards}
                        variant="contained"
                        color="tertiary"
                    >
                        load more
                    </Button>
                </Stack>
            )}
        </Stack>
    );
};
