import { GET_ALL_USERS_SPECIAL_FIELDS } from "../types/types";

const initialState = {
    usersSpecialFields: []
}

export const usersSpecialFieldsReducer=(state=initialState, action) => {
    switch (action.type) {
        case GET_ALL_USERS_SPECIAL_FIELDS:
            return {
                ...state, usersSpecialFields: [...state.usersSpecialFields, ...action.payload]
            }
        default:
            return state;
    }
}
