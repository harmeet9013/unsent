import { GET_REQUEST } from "@/lib";
import { ENDPOINTS } from "@/config";
import { SingleNoteView } from "@/sections";

export default async function Page({ params }) {
    const { note } = params;

    const response = await GET_REQUEST(ENDPOINTS["note"], {
        note_id: note,
    });

    return <SingleNoteView cardData={response?.data} />;
}
