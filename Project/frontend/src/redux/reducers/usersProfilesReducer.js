import { GET_ALL_USERS_PROFILES } from "../types/types";

const initialState = {
    usersProfiles: []
}

export const usersProfilesReducer=(state=initialState, action) => {
    switch (action.type) {
        case GET_ALL_USERS_PROFILES:
            return {
                ...state, usersProfiles: [...state.usersProfiles, ...action.payload]
            }
        default:
            return state;
    }
}
