import { ADD_TEAM } from "./types"

const initialState = {
    teams: []
}

export const addTeamReducer=(state=initialState, action) => {
    switch(action.type) {
        case ADD_TEAM:
            return {
                ...state,
                teams: [...state.teams, action.payload]
            }
        default:
            return state;

    }
}