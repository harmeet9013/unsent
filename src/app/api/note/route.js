import { cardModel, connectDB, errorResponse, successResponse } from "@/server";

export async function GET(req) {
    const dbConnected = await connectDB();

    if (!!dbConnected) {
        const note_id = req.nextUrl.searchParams.get("note_id");

        try {
            const response = await cardModel
                .find({ key: note_id })
                .select("-_id -__v");

            if (!!response?.length) {
                return successResponse("Fetched cards", {
                    data: response?.at(0),
                });
            } else {
                return errorResponse("Note not found", {
                    data: false,
                });
            }
        } catch (error) {
            return errorResponse("Error fetching data", {
                data: [],
            });
        }
    } else {
        return errorResponse("Error fetching data", {
            data: [],
        });
    }
}
