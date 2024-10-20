import { GET_REQUEST } from "@/lib";
import { ENDPOINTS } from "@/config";
import { HomeView } from "@/sections";

export default async function Page() {
    const response = await GET_REQUEST(ENDPOINTS["list"]);

    return (
        <HomeView cards={response?.data} pagination={response?.pagination} />
    );
}
