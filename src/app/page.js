import { ENDPOINTS } from "@/config";
import { GET_REQUEST } from "@/lib";
import { HomeView } from "@/sections";

export default async function () {
    const fetchData = async () => {
        const response = await GET_REQUEST(ENDPOINTS["list"]);

        if (response?.status) {
            return <HomeView cards={response?.data} />;
        } else {
            <>404</>;
        }
    };

    return fetchData();
}
