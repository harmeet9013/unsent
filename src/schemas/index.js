import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const returnObject = (schema, defaultValues) => {
    return {
        resolver: yupResolver(schema),
        defaultValues: defaultValues,
    };
};

export const searchSchema = (defaultValues) => {
    const schema = Yup.object().shape({
        search: Yup.string().notRequired(),
    });

    return returnObject(schema, defaultValues);
};

export const newCardSchema = (defaultValues) => {
    const schema = Yup.object().shape({
        to: Yup.string().max(50).notRequired(),
        message: Yup.string().min(20).max(250).required("Message is required!"),
        color: Yup.string().required(),
    });

    return returnObject(schema, defaultValues);
};
