import { GET_ALL_TEAMS, GET_PARTICULAR_TEAM } from "../types/types";

const initialState = {
    teams: []
}

export const teamsReducer=(state=initialState, action) => {
    switch (action.type) {
        case GET_ALL_TEAMS:
            return {
                ...state, teams: [...state.teams, ...action.payload]
            }
        case GET_PARTICULAR_TEAM:
            return {
                ...state, teams: [state.teams, action.payload]
            }
        default:
            return state;
    }
}
