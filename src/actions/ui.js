import { types } from "../types/types";

export const setError = (err) => ({
    type: types.uiSetError,
    payload: err,
})

export const remError = (err) => ({
    type: types.uiRemoveError,
})

