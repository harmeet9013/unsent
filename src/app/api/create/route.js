import ShortUniqueId from "short-unique-id";
//
import { cardModel, connectDB, errorResponse, successResponse } from "@/server";

export async function POST(req) {
    const dbConnected = await connectDB();

    if (!!dbConnected) {
        const data = await req.json();

        const uid = new ShortUniqueId({ length: 10 });

        const { to, message, color } = data;

        const newCard = new cardModel({
            to: to,
            message: message,
            color: color,
            key: uid.rnd(),
        });

        try {
            const response = await newCard.save();

            return successResponse("Saved card!", {
                data: response,
            });
        } catch (error) {
            console.log(error);
            return errorResponse("Error saving card!", {
                data: [],
            });
        }
    } else {
        return errorResponse("Error saving card!", {
            data: [],
        });
    }
}
