import { GET_PARTICULAR_TEAM } from "../types/types";

const initialState = {
    team: ['carolina','ny']
}


export const particularTeamReducer = (state=initialState, action) => {
    switch (action.type) {
        case GET_PARTICULAR_TEAM:
            return state.team[action.payload]
        default:
            return state;
    }
}
