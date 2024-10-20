"use client";

import { styled } from "@mui/material";
import { MaterialDesignContent } from "notistack";

export const StyledMaterialDesignContent = styled(MaterialDesignContent)(
    ({ theme }) => ({
        color: theme.palette.text.primary,
        transition: (theme) => `${theme.transitions.create()} !important`,
        "&.notistack-MuiContent-success": {
            borderRadius: theme.spacing(0),
        },
        "&.notistack-MuiContent-error": {
            borderRadius: theme.spacing(0),
        },
        "&.notistack-MuiContent-warning": {
            borderRadius: theme.spacing(0),
        },
        "&.notistack-MuiContent-info": {
            borderRadius: theme.spacing(0),
            backgroundColor: theme.palette.background.high,
        },
    })
);
