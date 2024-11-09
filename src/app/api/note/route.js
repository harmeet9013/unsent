import { cardModel } from "@/server";

export async function GET(req) {
    // const data = await req.json();
    const note_id = req.nextUrl.searchParams.get("note_id");

    const response = await cardModel.find({ key: note_id }).select("-_id -__v");

    if (!!response?.length) {
        return new Response({
            status: true,
            message: "Fetched cards",
            data: response?.at(0),
        });
    } else {
        return new Response({
            status: false,
            message: "Note not found",
            data: false,
        });
    }
}
