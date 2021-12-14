import { GET_ALL_TEAMS } from './types/types'

const initialState = {
    
    teams: []
}

export const teamReducer=(state=initialState, action) => {
    switch (action.type) {
        case GET_ALL_TEAMS:
            return {
                ...state, teams: [...state.teams, ...action.payload]
            }
        default:
            return state;
    }
}
