const prefix = "/api";

const append = (data = []) => {
    return data?.join("/");
};

export const ENDPOINTS = {
    list: append([prefix, "list"]),
    create: append([prefix, "create"]),
    note: append([prefix, "note"]),
};
