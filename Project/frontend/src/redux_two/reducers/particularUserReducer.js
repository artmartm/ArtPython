import { GET_PARTICULAR_USER } from "../types/types";

const initialState = {
    user: {}
}


export const particularUserReducer = (state=initialState, action) => {
    switch (action.type) {
        case GET_PARTICULAR_USER:
            return {
                ...state, user: [state.user, action.payload]
            }
        default:
            return state;
    }
}

