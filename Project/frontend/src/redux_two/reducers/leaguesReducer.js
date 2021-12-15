import { GET_ALL_LEAGUES, GET_PARTICULAR_LEAGUE } from "../types/types";

const initialState = {
    leagues: []
}

export const leaguesReducer=(state=initialState, action) => {
    switch (action.type) {
        case GET_ALL_LEAGUES:
            return {
                ...state, leagues: [...state.leagues, ...action.payload]
            }
        case GET_PARTICULAR_LEAGUE:
            return {
                state
            }
        default:
            return state;
    }
}
