import api from "axios";
//
import { SERVER_URL } from "@/config";

export const axios = api.create({
    baseURL: SERVER_URL,
    headers: {
        "Content-Type": "application/json",
    },
});
