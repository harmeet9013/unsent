import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export const RHFTextField = ({ name, ...other }) => {
    const { control } = useFormContext();

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => (
                <TextField
                    {...field}
                    fullWidth
                    variant="outlined"
                    {...other}
                    error={!!error}
                    helperText={error?.message}
                />
            )}
        />
    );
};
