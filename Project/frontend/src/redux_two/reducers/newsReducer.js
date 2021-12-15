import { GET_ALL_NEWS, GET_PARTICULAR_NEWS } from "../types/types";

const initialState = {
    news: []
}

export const newsReducer=(state=initialState, action) => {
    switch (action.type) {
        case GET_ALL_NEWS:
            return {
                ...state, news: [...state.news, ...action.payload]
            }
        case GET_PARTICULAR_NEWS:
            return {
                state
            }
        default:
            return state;
    }
}
