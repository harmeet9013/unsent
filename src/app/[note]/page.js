import { ENDPOINTS } from "@/config";
import { GET_REQUEST } from "@/lib";
import { SingleNoteView } from "@/sections";

export default async function ({ params }) {
    const { note } = params;

    const response = await GET_REQUEST(ENDPOINTS["note"], {
        note_id: note,
    });

    return (
        <>
            <SingleNoteView cardData={response?.data} />
        </>
    );
}
