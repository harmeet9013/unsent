import { ENDPOINTS } from "@/config";
import { GET_REQUEST } from "@/lib";

export default async function ({ params }) {
    const { note } = params;

    const response = await GET_REQUEST(ENDPOINTS["single_note"](note));

    return <></>;
}
