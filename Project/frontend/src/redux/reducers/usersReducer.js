import { GET_ALL_USERS } from "../types/types";

const initialState = {
    users: []
}

export const usersReducer=(state=initialState, action) => {
    switch (action.type) {
        case GET_ALL_USERS:
            return {
                ...state, users: [...state.users, action.payload]
            }
        default:
            return state;
    }
}
