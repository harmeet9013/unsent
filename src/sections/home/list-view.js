"use client";

import { CARD_COLORS, PATHS } from "@/config";
import { Card, Grid2, Stack, Typography, alpha, useTheme } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useRouter } from "next/navigation";

export const HomeListView = ({ cards }) => {
    const theme = useTheme();
    const router = useRouter();

    const handleNoteClick = (note_id) => {
        console.log(PATHS["single_note"](note_id));
        router.push(PATHS["single_note"](note_id));
    };

    return (
        <Stack width={1} pt={12} pb={4}>
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
                                    minHeight: theme.spacing(20),
                                    width: 1,
                                    backgroundColor: pickedColor?.main,
                                    color: pickedColor?.contrastText,
                                    borderColor: pickedColor?.dark,
                                    cursor: "pointer",
                                }}
                                onClick={() => handleNoteClick(item?.key)}
                            >
                                <Stack direction="column" width={1}>
                                    <Typography
                                        align="left"
                                        variant="body1"
                                        px={2}
                                        py={1}
                                        borderBottom={`1px solid ${pickedColor?.dark}`}
                                        color="grey.700"
                                        bgcolor={pickedColor?.light}
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

                                    <Typography
                                        variant="body1"
                                        fontWeight={600}
                                        p={1}
                                        align="left"
                                        color="grey.900"
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
