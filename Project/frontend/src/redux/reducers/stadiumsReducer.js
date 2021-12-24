import { GET_ALL_STADIUMS, GET_PARTICULAR_STADIUM } from "../types/types";

const initialState = {
    stadiums: []
}

export const stadiumsReducer=(state=initialState, action) => {
    switch (action.type) {
        case GET_ALL_STADIUMS:
            return {
                ...state, stadiums: [...state.stadiums, ...action.payload]
            }
        case GET_PARTICULAR_STADIUM:
            return {
                state
            }
        default:
            return state;
    }
}
