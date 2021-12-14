import { MAKE_BLUE, MAKE_RED } from "../types/types";

const initialState = {
    
    color: 'yellow'
}

export const colorReducer=(state=initialState, action) => {
    switch (action.type) {
        case MAKE_RED:
            return {
                ...state, color: "RED"
            }
        case MAKE_BLUE:
            return {
                ...state, color: "BLUE"
            }
        default:
            return state;
    }
}
