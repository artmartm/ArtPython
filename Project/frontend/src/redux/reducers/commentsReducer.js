import { GET_ALL_COMMENTS, GET_PARTICULAR_COMMENT } from "../types/types";

const initialState = {
    comments: []
}

export const commentsReducer=(state=initialState, action) => {
    switch (action.type) {
        case GET_ALL_COMMENTS:
            return {
                ...state, comments: [...state.comments, ...action.payload]
            }
        case GET_PARTICULAR_COMMENT:
            return {
                state
            }
        default:
            return state;
    }
}
