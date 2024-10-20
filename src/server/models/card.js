import { Schema, model, models } from "mongoose";

const cardModel = new Schema(
    {
        to: { type: String, required: false },
        message: { type: String, required: true },
        color: { type: String, required: true },
        key: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

export default models.card || model("card", cardModel);
