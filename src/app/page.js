import { GET_REQUEST } from "@/lib";
import { ENDPOINTS } from "@/config";
import { HomeView } from "@/sections";

export default async function Page() {
    let cards = [];
    let pagination = {};

    const response = await GET_REQUEST(ENDPOINTS["list"]);

    if (response?.status) {
        cards = response?.data || [];
        pagination = response?.pagination || {};
    }

    return <HomeView cards={cards || []} pagination={pagination || {}} />;
}
