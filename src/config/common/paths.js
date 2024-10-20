const prefix = "";

const append = (data = []) => {
    return data?.join("/");
};

export const PATHS = {
    home: append([prefix, "/"]),
    single_note: (note_id) => append([prefix, note_id]),
};
