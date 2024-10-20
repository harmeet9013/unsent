"use client";

import { FormProvider as RHFFormProvider } from "react-hook-form";

export const FormProvider = ({
    children,
    methods,
    onSubmit,
    clasName = "",
}) => {
    return (
        <RHFFormProvider {...methods}>
            <form
                onSubmit={onSubmit}
                className={clasName}
                style={{
                    width: "100%",
                }}
            >
                {children}
            </form>
        </RHFFormProvider>
    );
};
