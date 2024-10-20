const prefix = "/api";

const append = (data = []) => {
    return data?.join("/");
};

export const ENDPOINTS = {
    list: append([prefix, "list"]),
    create: append([prefix, "create"]),
    single_note: (note_id) => append([prefix, "note", note_id]),
};
