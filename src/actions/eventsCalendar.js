import { types } from "../types/types";

export const eventAddNew = (event) => ({    // para agregarlo en la base de datos
    type: types.eventAddNew,
    payload: event
});


export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
}); 



