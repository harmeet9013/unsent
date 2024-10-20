export * from "./theme";
export * from "./common";

export const { MONGO_URI: DB_URI, NEXT_PUBLIC_BASE_URL: SERVER_URL } =
    process.env;
